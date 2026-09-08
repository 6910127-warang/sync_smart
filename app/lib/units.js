// SmartSync — ดึงรายชื่อหน่วยงาน (units) ที่ active เพื่อใช้ในหน้า sign-in
// แยกออกมาจาก requisition-list.html/requisition-new.html เพราะ query เดิมซ้ำกันทุกตัวอักษร

import {
  collection, query, where, orderBy, getDocs
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

function withTimeout(promise, ms, timeoutMessage) {
  return Promise.race([
    promise,
    new Promise((_, reject) => setTimeout(() => reject(new Error(timeoutMessage)), ms))
  ]);
}

/**
 * @param {import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js").Firestore} db
 * @returns {Promise<Array<{id: string, name: string, code: string}>>}
 */
export async function fetchActiveUnits(db) {
  const q = query(collection(db, "units"), where("active", "==", true), orderBy("name"));
  const snap = await withTimeout(getDocs(q), 10000, "เชื่อมต่อ Firestore ไม่ได้ภายใน 10 วินาที — ตรวจสอบค่าใน firebase-config.js");
  return snap.docs.map((d) => ({ id: d.id, name: d.data().name, code: d.data().code || "" }));
}
