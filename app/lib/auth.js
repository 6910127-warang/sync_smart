// SmartSync — Firebase Authentication ร่วม (staff-hph และ pharmacist ใช้ไฟล์เดียวกัน)
// เพิ่ม 20260907 (BL-024) แทนที่กลไกล็อก session ชั่วคราวผ่าน localStorage
// (lib/session.js ของ staff-hph, lib/pharmacist-session.js + lib/pharmacists.js ของเภสัชกร — ลบทั้งสามไฟล์แล้ว)
// อ่าน role/unitId จริงจาก users/{uid} (doc id = Firebase Auth UID) แทนค่าที่เก็บไว้ในเบราว์เซอร์เดิม
//
// สำคัญ: ยังไม่ได้ตั้ง Firestore Security Rules ตาม role/unitId (ดู README.md หัวข้อ "ความปลอดภัย")
// — ต้องตั้งก่อน deploy ให้หน่วยงานจริงใช้งาน

import {
  getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

/** @param {import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js").FirebaseApp} app */
export function getAuthForApp(app) {
  return getAuth(app);
}

export function signIn(auth, email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function signOutUser(auth) {
  return signOut(auth);
}

/**
 * อ่านโปรไฟล์ users/{uid} ของผู้ใช้ที่ระบุ — คืน null ถ้าไม่พบ doc หรือ active !== true
 * @returns {Promise<{uid: string, displayName: string, role: string, unitId: string|null, email: string, active: boolean} | null>}
 */
export async function fetchUserProfile(db, uid) {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) return null;
  const data = snap.data();
  if (data.active !== true) return null;
  return { uid, ...data };
}

/**
 * ผูก callback กับสถานะ login ของ Firebase Auth — เรียกทุกครั้งที่สถานะเปลี่ยน
 * (ตอนโหลดหน้าครั้งแรก, หลัง sign-in/sign-out, และเมื่อ sign-in/sign-out จากแท็บอื่น
 * เพราะ Firebase Auth sync สถานะข้ามแท็บให้เองอยู่แล้ว ไม่ต้องฟัง "storage" event เพิ่ม)
 *
 * สำคัญ: ถ้า role ของบัญชีไม่ตรงกับ expectedRole (หรือ profile หายไป) **จะไม่ sign out ให้อัตโนมัติ**
 * เพราะ Firebase Auth ใช้ persistence เดียวกันข้ามทุกแท็บของ origin เดียวกัน — ถ้า sign out อัตโนมัติที่นี่
 * จะไปเตะแท็บอื่นที่ login ถูกต้องอยู่แล้วให้หลุดไปด้วย (เคยเกิดจริง 20260908: เปิดหน้าเภสัชกรค้างไว้ในแท็บหนึ่ง
 * แล้วเปิดหน้า staff-hph ในอีกแท็บ ทำให้แท็บเภสัชกรที่ login ถูกต้องอยู่ถูกเตะกลับไปหน้า login ไปด้วย)
 * แทนที่ด้วยการเรียก onWrongRole/onSignedOut พร้อมข้อความ แล้วให้หน้าจอโชว์ปุ่ม "ออกจากระบบ" ให้ผู้ใช้กดเองแทน
 * @param {string} expectedRole "staff_hph" | "pharmacist"
 * @param {{onSignedIn: (profile: object) => void, onSignedOut: (message?: string) => void, onWrongRole?: (profile: object) => void}} callbacks
 */
export function watchAuth(auth, db, expectedRole, { onSignedIn, onSignedOut, onWrongRole }) {
  return onAuthStateChanged(auth, async (user) => {
    if (!user) { onSignedOut(); return; }
    try {
      const profile = await fetchUserProfile(db, user.uid);
      if (!profile) {
        onSignedOut("บัญชีนี้ไม่พร้อมใช้งานแล้ว — กรุณากด \"ออกจากระบบ\" แล้วเข้าสู่ระบบใหม่");
        return;
      }
      if (profile.role !== expectedRole) {
        if (onWrongRole) onWrongRole(profile);
        else onSignedOut("บัญชีนี้ไม่มีสิทธิ์เข้าหน้านี้ — กรุณากด \"ออกจากระบบ\" แล้วเข้าสู่ระบบด้วยบัญชีที่ถูกต้อง");
        return;
      }
      onSignedIn(profile);
    } catch (err) {
      console.error("watchAuth: fetchUserProfile failed", err);
      onSignedOut("เชื่อมต่อ Firestore ไม่ได้ — กรุณาลองใหม่");
    }
  });
}

/** แปลง error code ของ Firebase Auth เป็นข้อความภาษาไทยที่อ่านเข้าใจง่าย */
export function authErrorMessage(err) {
  const map = {
    "auth/invalid-email": "รูปแบบอีเมลไม่ถูกต้อง",
    "auth/user-disabled": "บัญชีนี้ถูกระงับการใช้งาน",
    "auth/user-not-found": "ไม่พบบัญชีนี้ในระบบ",
    "auth/wrong-password": "รหัสผ่านไม่ถูกต้อง",
    "auth/invalid-credential": "อีเมลหรือรหัสผ่านไม่ถูกต้อง",
    "auth/missing-password": "กรุณากรอกรหัสผ่าน",
    "auth/too-many-requests": "พยายามเข้าสู่ระบบผิดหลายครั้งเกินไป กรุณารอสักครู่แล้วลองใหม่"
  };
  return map[err.code] || err.message;
}
