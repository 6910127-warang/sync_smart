# Test Cases — FT-020 กำหนดสิทธิ์การเข้าถึงตาม Role (RBAC)

> อ้างอิงจาก [Feature List](../../02-feature-list.md), [Acceptance Criteria](../acceptance-criteria.md), และ [admin-journey.md](../../03-user-journey/admin-journey.md)
>
> หมายเหตุ: ข้อมูลทดสอบเป็น placeholder ทั่วไป ไม่ใช่ข้อมูลยา NCD จริง — ดู [test-plan.md](../test-plan.md) §4

| Test ID | Test Case Name | Pre-condition | Test Steps | Expected Result | Test Data | อ้างอิง |
|---|---|---|---|---|---|---|
| TC-074 | เจ้าหน้าที่ รพ.สต. เห็นเฉพาะหน่วยตนเอง | มีบัญชีเจ้าหน้าที่ รพ.สต. ของหน่วย A | 1. Login ด้วยบัญชีเจ้าหน้าที่หน่วย A <br> 2. เข้าใช้งานทุกเมนูที่มีสิทธิ์ | เห็น/แก้ไขได้เฉพาะข้อมูลของหน่วย A เท่านั้น | บัญชีเจ้าหน้าที่หน่วย A | BL-024, AC Scenario 1, NFR Security |
| TC-075 | ผู้บริหาร read-only ทั้งเครือข่าย | มีบัญชีผู้บริหาร | 1. Login ผู้บริหาร <br> 2. เข้าดูข้อมูลทุกหน่วยรวม drill-down <br> 3. พยายามแก้ไขข้อมูล | เห็นข้อมูลได้แบบ read-only ทั้งเครือข่าย แต่แก้ไขไม่ได้ | บัญชีผู้บริหาร | BL-024, AC Scenario 2, NFR Security |
| TC-076 | Admin สิทธิ์เต็มด้านระบบ | มีบัญชี Admin | 1. Login Admin <br> 2. เข้าหน้าตั้งค่าระบบ/จัดการผู้ใช้ <br> 3. พยายามแก้ไขข้อมูลธุรกิจนอกกรณีฉุกเฉิน | มีสิทธิ์เต็มด้านตั้งค่าระบบ/ผู้ใช้ แต่แก้ไขข้อมูลธุรกิจได้เฉพาะกรณีฉุกเฉินเท่านั้น (BL-025) | บัญชี Admin | BL-024, AC Scenario 3, NFR Security |
| TC-077 | พยายามเข้าถึงข้อมูลหน่วยอื่นผ่าน URL โดยตรง | Login ด้วยบัญชีเจ้าหน้าที่หน่วย A | 1. แก้ไข parameter ใน URL ให้ชี้ไปยังข้อมูล/คำขอของหน่วย B <br> 2. พยายามเข้าถึง | ระบบปฏิเสธการเข้าถึง | บัญชีเจ้าหน้าที่หน่วย A, URL ของหน่วย B | BL-024, AC Scenario 4, NFR Security |

---

## บันทึกการอัปเดต (Changelog)

- **20260816:** สร้าง Test Case ของ FT-020 ครั้งแรก — 4 test case (TC-074–TC-077) ครอบคลุมทั้ง 4 scenario ของ BL-024 ใน acceptance-criteria.md
