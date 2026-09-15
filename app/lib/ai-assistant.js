// SmartSync — Client-side helper สำหรับผู้ช่วย AI ของเภสัชกรผู้อนุมัติระดับ 1 (FT-036/BL-047)
// เรียกผ่าน Cloudflare Worker proxy ("/api/ai-assist") เท่านั้น — ไม่เรียก OpenRouter ตรงจาก browser
// (ต่างจาก ../ai-test.html ที่ตั้งใจให้รัน local เท่านั้น เพราะ OpenRouter key เป็น secret จริง)
// ดู ../_worker.js สำหรับ implementation ฝั่งเซิร์ฟเวอร์ และ README.md หัวข้อ "ผู้ช่วย AI" สำหรับขอบเขต/ข้อจำกัดที่ตัดออกในรอบนี้

async function callAiAssist(auth, body) {
  if (!auth.currentUser) throw new Error("ยังไม่ได้เข้าสู่ระบบ — กรุณาเข้าสู่ระบบใหม่");
  const idToken = await auth.currentUser.getIdToken();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);
  let res;
  try {
    res = await fetch("/api/ai-assist", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${idToken}` },
      body: JSON.stringify(body),
      signal: controller.signal
    });
  } catch (err) {
    if (err.name === "AbortError") throw new Error("เรียกผู้ช่วย AI ไม่สำเร็จ: หมดเวลารอ กรุณาลองใหม่");
    throw new Error("เรียกผู้ช่วย AI ไม่สำเร็จ: " + err.message);
  } finally {
    clearTimeout(timeoutId);
  }

  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error((data && data.error) || `เรียกผู้ช่วย AI ไม่สำเร็จ (${res.status})`);
  if (!data || typeof data.text !== "string") throw new Error("ผู้ช่วย AI ตอบกลับไม่ถูกต้อง");
  return data.text;
}

/**
 * ความสามารถ (ก) — สรุปเหตุผลความเบี่ยงเบนระหว่างยอดขอเบิกกับยอดแนะนำเบิก (FR-8.3/US-8.1)
 * หมายเหตุ: รอบนี้ไม่มีข้อมูลประวัติย้อนหลัง 3 ปีให้ AI อ้างอิง (collection historicalUsageRecords
 * ยังไม่ถูกสร้างจริง) — สรุปจากตัวเลขของคำขอปัจจุบันเท่านั้น (ยอดขอเบิก/ยอดแนะนำ/ยอดคงเหลือ/เกณฑ์ Safety Stock)
 * @param {{requisitionCode: string, unitName: string, lineItems: Array<object>}} payload
 */
export function requestDeviationSummary(auth, payload) {
  return callAiAssist(auth, { kind: "deviation-summary", ...payload });
}

/**
 * ความสามารถ (ข) — ช่วยร่างข้อความเหตุผลตอนปฏิเสธคำขอ (FR-8.6/US-8.2)
 * ขอบเขตรอบนี้จำกัดเฉพาะฟอร์มปฏิเสธเท่านั้น (หน้าจอปัจจุบันไม่มีช่องกรอกเหตุผลสำหรับ "ปรับยอด")
 * @param {{requisitionCode: string, unitName: string, lineItems: Array<object>}} payload
 */
export function requestDraftReason(auth, payload) {
  return callAiAssist(auth, { kind: "draft-reason", ...payload });
}
