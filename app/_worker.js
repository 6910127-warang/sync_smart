// SmartSync — Cloudflare Worker: serve static assets ตามเดิม + proxy ผู้ช่วย AI (FT-036/BL-047)
// เพิ่ม 20260915 เป็น backend component แรกของโปรเจกต์ (จากเดิม static file + Firestore ล้วน)
// เหตุผล: ถ้าเรียก OpenRouter ตรงจาก browser (แบบ ai-test.html) คีย์จะฝังอยู่ในเว็บสาธารณะที่ deploy จริงแล้ว
// (ต่าง จาก ai-test.html ที่ตั้งใจให้รัน local เท่านั้น) — ดู README.md หัวข้อ "ผู้ช่วย AI" สำหรับขั้นตอนตั้งค่า
// secret OPENROUTER_API_KEY บน Cloudflare (ต้องทำเองผ่าน dashboard/wrangler — ไม่มีอยู่ใน repo นี้)
//
// ทุก request ที่ไม่ใช่ POST /api/ai-assist จะ fallback ไป env.ASSETS.fetch() เพื่อ serve static ตามเดิมทุกประการ

const MODEL = "google/gemini-2.5-flash-lite";

// Firebase apiKey เป็น client-side identifier ไม่ใช่ secret (เหมือนใน firebase-config.js) — ใช้ยืนยันแค่ว่า
// ID token ที่ส่งมาถูกออกโดย Firebase project นี้จริงและยังไม่หมดอายุ (กันคนนอกยิง endpoint ตรงๆ)
// ไม่ได้เช็ค role ลึกกว่านั้น (ทุก role ที่ login สำเร็จเรียกได้ — เพียงพอสำหรับขนาดการใช้งานปัจจุบัน)
const FIREBASE_API_KEY = "AIzaSyCoMYm-FIZdJZq-ysUfbV3WwIOXQLoQS5g";

const GUARDRAIL = `คุณเป็นผู้ช่วยของเภสัชกรผู้อนุมัติคำขอเบิกยาในระบบ SmartSync ทำหน้าที่ "ผู้ช่วยเชิงข้อมูล" เท่านั้น
กฎเคร่งครัดที่ต้องทำตามทุกครั้ง (ห้ามฝ่าฝืนไม่ว่ากรณีใด):
- ห้ามแนะนำหรือฟันธงว่าควรอนุมัติ ปฏิเสธ หรือควรปรับยอดเท่าไร
- ห้ามกำหนดหรืออ้างอิงเกณฑ์ทางคลินิกหรือนโยบายยาใหม่ใดๆ ที่ไม่ได้อยู่ในข้อมูลที่ให้มา
- ใช้เฉพาะตัวเลข/ข้อมูลที่ให้มาในคำถามนี้เท่านั้น ห้ามสมมติข้อมูลเพิ่มเติม
- ตอบเป็นภาษาไทย กระชับ ไม่เกิน 5 ประโยค ไม่ใช้ bullet point`;

// กันไม่ให้ "undefined"/"null" หลุดเป็นข้อความจริงเข้าไปใน prompt (เจอจริง 20260915: เอกสาร lineItems เก่าก่อน
// FR-1.1c ไม่มีฟิลด์ requestedQuantity ทำให้ AI เห็นคำว่า "undefined" แล้วพูดถึงมันตรงๆ ในคำตอบ — แก้ต้นตอที่
// client แล้ว (default = ยอดแนะนำเบิกตาม FR-1.1c) แต่กันไว้อีกชั้นที่นี่ด้วยเผื่อ caller อื่นในอนาคต)
function num(v) {
  return (v === null || v === undefined) ? "ไม่ระบุ" : v;
}

function formatLine(li) {
  const parts = [`ยอดขอเบิก ${num(li.requestedQuantity)}`, `ยอดแนะนำเบิก ${num(li.suggestedQuantity)}`];
  if (li.selfReportedBalance != null) parts.push(`ยอดคงเหลือที่แจ้ง ${li.selfReportedBalance}`);
  if (li.approvedQuantity != null) parts.push(`จำนวนที่กำลังจะอนุมัติ ${li.approvedQuantity}`);
  if (li.safetyStockThreshold != null) parts.push(`เกณฑ์ Safety Stock ${li.safetyStockThreshold}`);
  return `- ${li.drugName}: ${parts.join(", ")}`;
}

function buildDeviationPrompt({ requisitionCode, unitName, lineItems }) {
  const rows = lineItems.map(formatLine).join("\n");
  return `${GUARDRAIL}

งาน: ตั้งข้อสังเกตทั่วไปว่าทำไม "ยอดขอเบิก" ของคำขอ ${requisitionCode || "-"} (หน่วย ${unitName || "-"}) อาจต่างจาก "ยอดแนะนำเบิก" โดยอ้างอิงเฉพาะตัวเลขด้านล่างเท่านั้น (หมายเหตุ: รอบนี้ไม่มีข้อมูลประวัติการเบิกย้อนหลังให้ใช้เปรียบเทียบ):
${rows}`;
}

function buildDraftReasonPrompt({ requisitionCode, unitName, lineItems }) {
  const rows = lineItems.map(formatLine).join("\n");
  return `${GUARDRAIL}

งาน: ร่างข้อความเหตุผลสั้นๆ (1-3 ประโยค) ในมุมมองบุคคลที่หนึ่งราวกับเภสัชกรเขียนเอง สำหรับใช้ตอนปฏิเสธคำขอเบิก ${requisitionCode || "-"} (หน่วย ${unitName || "-"}) โดยอ้างอิงเฉพาะตัวเลขด้านล่าง ไม่ต้องขึ้นต้นด้วยคำทักทาย ไม่ต้องลงชื่อท้ายข้อความ:
${rows}`;
}

async function verifyFirebaseIdToken(idToken) {
  const res = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken })
  });
  if (!res.ok) return null;
  const data = await res.json().catch(() => null);
  return data && Array.isArray(data.users) && data.users[0] ? data.users[0] : null;
}

function jsonResponse(obj, status) {
  return new Response(JSON.stringify(obj), { status, headers: { "Content-Type": "application/json" } });
}

async function handleAiAssist(request, env) {
  const authHeader = request.headers.get("Authorization") || "";
  const idToken = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!idToken) return jsonResponse({ error: "ไม่พบสิทธิ์การใช้งาน — กรุณาเข้าสู่ระบบใหม่" }, 401);

  const firebaseUser = await verifyFirebaseIdToken(idToken);
  if (!firebaseUser) return jsonResponse({ error: "เซสชันหมดอายุ — กรุณาเข้าสู่ระบบใหม่" }, 401);

  let body;
  try { body = await request.json(); } catch { return jsonResponse({ error: "รูปแบบคำขอไม่ถูกต้อง" }, 400); }

  const { kind, requisitionCode, unitName, lineItems } = body || {};
  if (!Array.isArray(lineItems) || lineItems.length === 0) {
    return jsonResponse({ error: "ไม่มีรายการยาให้สรุป" }, 400);
  }

  let prompt;
  if (kind === "deviation-summary") prompt = buildDeviationPrompt({ requisitionCode, unitName, lineItems });
  else if (kind === "draft-reason") prompt = buildDraftReasonPrompt({ requisitionCode, unitName, lineItems });
  else return jsonResponse({ error: "ไม่รู้จักประเภทคำขอนี้" }, 400);

  if (!env.OPENROUTER_API_KEY) {
    return jsonResponse({ error: "ระบบยังไม่ได้ตั้งค่าผู้ช่วย AI (ไม่มี OPENROUTER_API_KEY) — ติดต่อผู้ดูแลระบบ" }, 500);
  }

  let aiRes;
  try {
    aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ model: MODEL, messages: [{ role: "user", content: prompt }] })
    });
  } catch (err) {
    return jsonResponse({ error: "เรียกผู้ช่วย AI ไม่สำเร็จ: " + err.message }, 502);
  }

  const aiData = await aiRes.json().catch(() => null);
  if (!aiRes.ok || !aiData) return jsonResponse({ error: `ผู้ช่วย AI ตอบกลับผิดพลาด (${aiRes.status})` }, 502);

  const text = aiData.choices && aiData.choices[0] && aiData.choices[0].message && aiData.choices[0].message.content;
  if (!text) return jsonResponse({ error: "ผู้ช่วย AI ไม่ส่งเนื้อหากลับมา" }, 502);

  return jsonResponse({ text: text.trim() }, 200);
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/ai-assist" && request.method === "POST") {
      return handleAiAssist(request, env);
    }
    return env.ASSETS.fetch(request);
  }
};
