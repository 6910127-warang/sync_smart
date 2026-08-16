# Test Cases — FT-019 เชื่อมต่อ JHCIS/myPCU โดยตรง (พิจารณาภายหลัง)

> อ้างอิงจาก [Feature List](../../02-feature-list.md), [Acceptance Criteria](../acceptance-criteria.md)
>
> **หมายเหตุ:** FT-019/BL-023 มี Priority **Won't (เฟสนี้)** — ไม่มีการพัฒนาฟังก์ชันจริง Test Case ด้านล่างจึงเป็นเพียง scope-confirmation test (ยืนยันขอบเขตว่าไม่มี integration เกิดขึ้นจริง) ไม่ใช่การทดสอบฟังก์ชัน

| Test ID | Test Case Name | Pre-condition | Test Steps | Expected Result | Test Data | อ้างอิง |
|---|---|---|---|---|---|---|
| TC-073 | ยืนยันว่าไม่มีการเชื่อมต่อ JHCIS/myPCU โดยตรงในเฟสนี้ | ระบบ SmartSync ทำงานตามปกติ (ยอดคงเหลือ/การเบิกได้จากการกรอกในระบบเอง) | 1. ตรวจสอบ system integration/API endpoint ทั้งหมดของระบบ <br> 2. ตรวจสอบว่าไม่มีการเรียก API หรือแลกเปลี่ยนข้อมูลกับ JHCIS/myPCU โดยตรง | ไม่พบ integration/API เรียกไปยัง JHCIS/myPCU ใดๆ ในเฟสนี้ — ยืนยันว่ายอดคงเหลือทั้งหมดมาจากการกรอกในระบบ SmartSync เอง (FR-1.1a) | ไม่มี (negative test — ตรวจสอบว่าไม่มีสิ่งที่ไม่ควรมี) | BL-023, AC Scenario 1, FR-4.4 |

---

## บันทึกการอัปเดต (Changelog)

- **20260816:** สร้าง Test Case ของ FT-019 ครั้งแรก — 1 test case (TC-073) ตาม scenario เดียวของ BL-023 ใน acceptance-criteria.md — เป็น scope-confirmation test เนื่องจาก Priority Won't ในเฟสนี้ ยัง `[รอยืนยัน]` ว่าการไม่เชื่อมต่อนี้ถูกต้องหรือไม่
