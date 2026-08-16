# Test Cases — FT-012 ช่องทางแจ้งเตือนผ่านอีเมลและ LINE OA

> อ้างอิงจาก [Feature List](../../02-feature-list.md), [Acceptance Criteria](../acceptance-criteria.md)
>
> หมายเหตุ: ข้อมูลทดสอบเป็น placeholder ทั่วไป ไม่ใช่ข้อมูลยา NCD จริง — ดู [test-plan.md](../test-plan.md) §4 — ต้องมี SMTP/LINE OA sandbox พร้อมใช้งานก่อนทดสอบ integration จริง

| Test ID | Test Case Name | Pre-condition | Test Steps | Expected Result | Test Data | อ้างอิง |
|---|---|---|---|---|---|---|
| TC-045 | ส่งแจ้งเตือนพร้อมกันทั้งอีเมลและ LINE OA | มีเหตุการณ์ที่ต้องแจ้งเตือน (เช่น สต็อกต่ำ), SMTP/LINE OA sandbox พร้อมใช้งาน | 1. Trigger เหตุการณ์แจ้งเตือน (เช่น สต็อกต่ำกว่าเกณฑ์) <br> 2. ตรวจสอบกล่องอีเมลและ LINE OA ปลายทาง | ส่งทั้งทางอีเมลและ LINE OA พร้อมกัน | เหตุการณ์: ยา A ต่ำกว่า safety stock | BL-014, AC Scenario 1, FR-2.3 |
| TC-046 | ช่องทางหนึ่งส่งไม่สำเร็จชั่วคราว | จำลอง SMTP ล่ม/ไม่ตอบสนอง | 1. ปิดการใช้งาน SMTP sandbox ชั่วคราว <br> 2. Trigger เหตุการณ์แจ้งเตือน | LINE OA ยังคงส่งได้ตามปกติ และระบบบันทึกความล้มเหลวของอีเมลไว้เพื่อการตรวจสอบ | เหตุการณ์: ยา A ต่ำกว่า safety stock, SMTP down | BL-014, AC Scenario 2, FR-2.3 |
| TC-047 | ยังไม่ได้ตั้งค่า SMTP/LINE OA API | ยังไม่ได้ตั้งค่า SMTP หรือ LINE OA API/Webhook ในสภาพแวดล้อมทดสอบ | 1. Trigger เหตุการณ์แจ้งเตือนโดยไม่มีการตั้งค่าช่องทางใดเลย | ระบบไม่ล้มเหลวแบบ silent — บันทึกข้อผิดพลาดของการตั้งค่าให้ผู้ดูแลระบบตรวจสอบได้ | เหตุการณ์: ยา A ต่ำกว่า safety stock, ไม่มีการตั้งค่าช่องทางใดเลย | BL-014, AC Scenario 3, FR-2.3 |

---

## บันทึกการอัปเดต (Changelog)

- **20260816:** สร้าง Test Case ของ FT-012 ครั้งแรก — 3 test case (TC-045–TC-047) ครอบคลุมทั้ง 3 scenario ของ BL-014 ใน acceptance-criteria.md
