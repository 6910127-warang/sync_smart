// SmartSync — Firebase project config
// วางค่าจริงจาก Firebase Console > Project settings > General > Your apps > SDK setup and configuration
// ค่าพวกนี้เป็น client-side identifier (ไม่ใช่ secret) — ปลอดภัยที่จะฝังในโค้ดฝั่ง browser ได้ตามปกติของ Firebase
// แต่ยังต้องตั้ง Firestore Security Rules ให้เหมาะสมก่อนใช้งานจริงกับข้อมูลจริง (ดู README.md หัวข้อ "ความปลอดภัย")
export const firebaseConfig = {
  apiKey: "AIzaSyCoMYm-FIZdJZq-ysUfbV3WwIOXQLoQS5g",
  authDomain: "syncsmart-98d1e.firebaseapp.com",
  projectId: "syncsmart-98d1e",
  storageBucket: "syncsmart-98d1e.firebasestorage.app",
  messagingSenderId: "580068790174",
  appId: "1:580068790174:web:e9cb7ae1c467b3214cd08f"
};
