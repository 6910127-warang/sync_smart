# Test Cases — FT-024 System Access Log และการเก็บรักษาข้อมูลตามกฎหมาย (≥90 วัน)

> อ้างอิงจาก [Feature List](../../02-feature-list.md), [Acceptance Criteria](../acceptance-criteria.md), และ [admin-journey.md](../../03-user-journey/admin-journey.md)
>
> หมายเหตุ: ข้อมูลทดสอบเป็น placeholder ทั่วไป ไม่ใช่ข้อมูลยา NCD จริง — ดู [test-plan.md](../test-plan.md) §4

| Test ID | Test Case Name | Pre-condition | Test Steps | Expected Result | Test Data | อ้างอิง |
|---|---|---|---|---|---|---|
| TC-092 | บันทึก login/logout พร้อม IP Address | ผู้ใช้กำลัง login/logout | 1. Login ด้วยบัญชีทดสอบ <br> 2. Logout <br> 3. Login ด้วย Admin แล้วเปิด System Access Log | เห็นบันทึกผู้ใช้ วันเวลา และ IP Address ของทั้ง login/logout แยกจาก audit trail ทางธุรกิจ | บัญชีทดสอบ, IP address จำลอง | BL-028, AC Scenario 1, FR-6.1 |
| TC-093 | บันทึกความพยายาม login ที่ไม่สำเร็จ | ผู้ใช้กรอกรหัสผ่านผิด | 1. พยายาม login ด้วยรหัสผ่านผิด 1 ครั้ง <br> 2. Login ด้วย Admin แล้วตรวจสอบ System Access Log | ระบบบันทึกความพยายาม login ที่ไม่สำเร็จไว้พร้อม IP Address | บัญชีทดสอบ, รหัสผ่านผิด | BL-028, AC Scenario 2, FR-6.1 |
| TC-094 | บันทึกเวลา logout แยกจากเวลา login | ผู้ใช้ login แล้วใช้งานระยะหนึ่ง | 1. Login <br> 2. ใช้งานระบบ <br> 3. Logout <br> 4. ตรวจสอบ System Access Log | เห็นเวลา login และเวลา logout แยกกันของ session เดียวกัน | บัญชีทดสอบ | BL-028, AC Scenario 3, FR-6.1 |
| TC-095 | เก็บรักษา audit trail/access log อย่างน้อย 90 วัน | มี audit trail และ access log สะสมมานานกว่า 90 วัน | 1. ตรวจสอบข้อมูล log ที่มีอายุ 90 วันย้อนหลัง | ข้อมูลย้อนหลังอย่างน้อย 90 วันยังคงอยู่ครบถ้วน | log ย้อนหลัง ≥ 90 วัน (จำลอง) | BL-029, AC Scenario 1, FR-6.2 |
| TC-096 | ไม่ลบข้อมูลอัตโนมัติหลังพ้น 90 วัน | มีข้อมูลที่อายุพ้น 90 วันแล้ว | 1. ตรวจสอบข้อมูล log ที่มีอายุมากกว่า 90 วัน | ระบบไม่ลบข้อมูลอัตโนมัติ (เก็บต่อเนื่องไม่มีกำหนด) | log อายุ 100 วัน (จำลอง) | BL-029, AC Scenario 2, FR-6.2 |
| TC-097 | ข้อมูลอายุครบ 90 วันพอดี | มีข้อมูล log ที่อายุครบ 90 วันพอดี | 1. ตรวจสอบข้อมูล log ที่อายุครบ 90 วันพอดี ณ วันที่ทดสอบ | ข้อมูลยังคงอยู่ในระบบ (ไม่ถูกลบ ณ วันที่ครบ 90 วันพอดี) | log อายุ 90 วันพอดี (จำลอง) | BL-029, AC Scenario 3, FR-6.2 |

---

## บันทึกการอัปเดต (Changelog)

- **20260816:** สร้าง Test Case ของ FT-024 ครั้งแรก — 6 test case (TC-092–TC-097) ครอบคลุมทั้ง 6 scenario ของ BL-028/BL-029 ใน acceptance-criteria.md
