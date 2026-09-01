// SmartSync — สร้าง "รหัสคำขอ" ที่อ่านง่ายสำหรับแสดงผล (Requisition.requisitionCode)
// รูปแบบ (ยืนยันกับผู้ใช้ 20260901): REQ-{ปีพ.ศ.4หลัก}{เดือน2หลัก}-{รหัสหน่วย}-{เลขรันประจำเดือนของหน่วยนั้น 3 หลัก}
// ตัวอย่าง: REQ-256908-HPH01-001
//
// หมายเหตุ: นี่คือฟิลด์แสดงผลเพิ่มเติม ไม่ใช่ document ID จริงของ requisitions/{requisitionId}
// (document ID ยังเป็น Firestore auto-id ตามเดิม — ดู README.md หัวข้อ Firestore Schema)
//
// ใช้ Firestore transaction เพิ่มค่าตัวนับใน counters/{unitId}_{ปีพ.ศ.}{เดือน} แบบ atomic
// เพื่อป้องกันเลขรันซ้ำกันเมื่อมีการสร้างคำขอพร้อมกันหลายคำขอในหน่วย+เดือนเดียวกัน

import { doc, runTransaction } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/**
 * @param {import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js").Firestore} db
 * @param {{ unitId: string, unitCode: string, codeDate: Date }} params
 *   codeDate: วันที่ใช้คำนวณปี-เดือนในรหัส — ใช้วันที่ของ "รอบเดือนที่เบิก" (period) สำหรับคำขอปกติ
 *   หรือ "วันที่สร้างคำขอ" (createdAt) สำหรับคำขอฉุกเฉิน (ตาม data-model.md §3.4)
 * @returns {Promise<string>} เช่น "REQ-256908-HPH01-001"
 */
export async function generateRequisitionCode(db, { unitId, unitCode, codeDate }) {
  const yearBE = codeDate.getFullYear() + 543;
  const month = String(codeDate.getMonth() + 1).padStart(2, "0");
  const counterId = `${unitId}_${yearBE}${month}`;
  const counterRef = doc(db, "counters", counterId);

  const nextCount = await runTransaction(db, async (tx) => {
    const snap = await tx.get(counterRef);
    const current = snap.exists() ? snap.data().count : 0;
    const next = current + 1;
    tx.set(counterRef, { count: next, unitId, yearMonthBE: `${yearBE}${month}` });
    return next;
  });

  const runningNumber = String(nextCount).padStart(3, "0");
  return `REQ-${yearBE}${month}-${unitCode}-${runningNumber}`;
}
