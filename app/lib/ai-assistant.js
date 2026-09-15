// SmartSync — Client-side helper สำหรับผู้ช่วย AI ของเภสัชกรผู้อนุมัติระดับ 1 (FT-036/BL-047)
// เรียกผ่าน Cloudflare Worker proxy ("/api/ai-assist") เท่านั้น — ไม่เรียก OpenRouter ตรงจาก browser
// (ต่างจาก ../ai-test.html ที่ตั้งใจให้รัน local เท่านั้น เพราะ OpenRouter key เป็น secret จริง)
// ดู ../_worker.js สำหรับ implementation ฝั่งเซิร์ฟเวอร์ และ README.md หัวข้อ "ผู้ช่วย AI" สำหรับขอบเขต/ข้อจำกัดที่ตัดออกในรอบนี้

import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// บันทึกการใช้งานผู้ช่วย AI (BL-048/FR-8.7-FR-8.11) — เขียนจากฝั่ง client หลังได้รับผลลัพธ์สำเร็จเสมอ (FR-8.11)
// ตั้งใจไม่ throw ถ้าเขียน log ไม่สำเร็จ — ต้องไม่กระทบการแสดงผลลัพธ์ผู้ช่วย AI ให้เภสัชกรเห็น ซึ่งเป็นฟีเจอร์หลัก
// หมายเหตุ: `capability`/`callerRole` ใช้ค่าภาษาอังกฤษ (English enum) แทนป้ายภาษาไทยที่ spec 008 ใช้บรรยาย
// เพื่อให้สอดคล้องกับ convention enum จริงที่ใช้อยู่แล้วทั้งไฟล์นี้ (kind) และ firestore.rules (role/status/decision/type)
async function logAiAssistantUsage(db, auth, capability, requisitionId, payload, outputText) {
  try {
    await addDoc(collection(db, "aiAssistantUsageLogs"), {
      callerId: auth.currentUser.uid,
      callerRole: "pharmacist",
      requisitionId,
      capability,
      inputPayload: JSON.stringify(payload),
      outputText,
      calledAt: new Date()
    });
  } catch (err) {
    console.error("บันทึกการใช้งานผู้ช่วย AI ไม่สำเร็จ (ไม่กระทบผลลัพธ์ที่แสดง):", err);
  }
}

async function callAiAssist(auth, db, capability, requisitionId, payload) {
  if (!auth.currentUser) throw new Error("ยังไม่ได้เข้าสู่ระบบ — กรุณาเข้าสู่ระบบใหม่");
  const idToken = await auth.currentUser.getIdToken();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 20000);
  let res;
  try {
    res = await fetch("/api/ai-assist", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${idToken}` },
      body: JSON.stringify({ kind: capability, ...payload }),
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

  logAiAssistantUsage(db, auth, capability, requisitionId, payload, data.text);
  return data.text;
}

/**
 * ความสามารถ (ก) — สรุปเหตุผลความเบี่ยงเบนระหว่างยอดขอเบิกกับยอดแนะนำเบิก (FR-8.3/US-8.1)
 * หมายเหตุ: รอบนี้ไม่มีข้อมูลประวัติย้อนหลัง 3 ปีให้ AI อ้างอิง (collection historicalUsageRecords
 * ยังไม่ถูกสร้างจริง) — สรุปจากตัวเลขของคำขอปัจจุบันเท่านั้น (ยอดขอเบิก/ยอดแนะนำ/ยอดคงเหลือ/เกณฑ์ Safety Stock)
 * @param {{requisitionCode: string, unitName: string, lineItems: Array<object>}} payload
 */
export function requestDeviationSummary(auth, db, requisitionId, payload) {
  return callAiAssist(auth, db, "deviation-summary", requisitionId, payload);
}

/**
 * ความสามารถ (ข) — ช่วยร่างข้อความเหตุผลตอนปฏิเสธคำขอ (FR-8.6/US-8.2)
 * ขอบเขตรอบนี้จำกัดเฉพาะฟอร์มปฏิเสธเท่านั้น (หน้าจอปัจจุบันไม่มีช่องกรอกเหตุผลสำหรับ "ปรับยอด")
 * @param {{requisitionCode: string, unitName: string, lineItems: Array<object>}} payload
 */
export function requestDraftReason(auth, db, requisitionId, payload) {
  return callAiAssist(auth, db, "draft-reason", requisitionId, payload);
}
