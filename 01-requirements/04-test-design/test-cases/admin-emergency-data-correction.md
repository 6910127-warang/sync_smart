# Test Cases — FT-021 Admin แก้ไขข้อมูลธุรกิจกรณีฉุกเฉิน

> อ้างอิงจาก [Feature List](../../02-feature-list.md), [Acceptance Criteria](../acceptance-criteria.md), และ [admin-journey.md](../../03-user-journey/admin-journey.md)
>
> หมายเหตุ: ข้อมูลทดสอบเป็น placeholder ทั่วไป ไม่ใช่ข้อมูลยา NCD จริง — ดู [test-plan.md](../test-plan.md) §4

| Test ID | Test Case Name | Pre-condition | Test Steps | Expected Result | Test Data | อ้างอิง |
|---|---|---|---|---|---|---|
| TC-078 | Admin แก้ไขข้อมูลธุรกิจกรณีฉุกเฉินพร้อมบันทึก audit log | มีข้อมูลธุรกิจที่ต้องแก้ไขกรณีฉุกเฉิน (เช่น ยอดคงคลังผิดพลาด) | 1. Login Admin <br> 2. เปิดฟังก์ชันแก้ไขข้อมูลฉุกเฉิน <br> 3. แก้ไขข้อมูลพร้อมระบุเหตุผล | ระบบบันทึกลง audit log ทันทีพร้อมเหตุผลการแก้ไข | ยอดคงคลังยา A ที่ต้องแก้จาก 60 เป็น 55 หน่วย พร้อมเหตุผล | BL-025, AC Scenario 1, NFR Security |
| TC-079 | พยายามแก้ไขโดยไม่ระบุเหตุผล | Admin กำลังแก้ไขข้อมูลธุรกิจฉุกเฉิน | 1. แก้ไขข้อมูลโดยเว้นว่างช่องเหตุผล <br> 2. กดยืนยัน | ระบบปฏิเสธจนกว่าจะระบุเหตุผล | ช่องเหตุผลว่างเปล่า | BL-025, AC Scenario 2, NFR Security |
| TC-080 | ผู้ใช้ role อื่นพยายามแก้ไขข้อมูลธุรกิจ | Login ด้วยบัญชีที่ไม่ใช่ Admin (เช่น เจ้าหน้าที่ รพ.สต.) | 1. พยายามแก้ไขข้อมูลธุรกิจนอกกระบวนการอนุมัติปกติ | ระบบปฏิเสธ (สิทธิ์นี้เฉพาะ Admin เท่านั้น) | บัญชีเจ้าหน้าที่ รพ.สต. | BL-025, AC Scenario 3, NFR Security |

---

## บันทึกการอัปเดต (Changelog)

- **20260816:** สร้าง Test Case ของ FT-021 ครั้งแรก — 3 test case (TC-078–TC-080) ครอบคลุมทั้ง 3 scenario ของ BL-025 ใน acceptance-criteria.md
