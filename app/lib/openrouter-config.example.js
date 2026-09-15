// เทมเพลตสำหรับสร้าง openrouter-config.js ของตัวเอง (ไฟล์นั้นไม่ถูก commit ขึ้น git — ดู .gitignore)
// คัดลอกไฟล์นี้เป็น openrouter-config.js แล้ววางคีย์จริงจาก https://openrouter.ai/keys ของตัวเอง
// คีย์ OpenRouter เป็น secret จริง (มีผลต่อการเรียกเก็บเงิน) ต่างจาก Firebase apiKey — ห้าม commit เด็ดขาด
export const openRouterConfig = {
  apiKey: "sk-or-v1-...",
  model: "google/gemini-2.5-flash-lite",
};
