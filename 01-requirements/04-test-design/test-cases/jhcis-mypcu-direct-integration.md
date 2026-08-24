# Test Cases — FT-019 เชื่อมต่อ JHCIS/myPCU โดยตรง (พิจารณาภายหลัง)

> อ้างอิงจาก [Feature List](../../02-feature-list.md), [Acceptance Criteria](../acceptance-criteria.md)
>
> **หมายเหตุ:** FT-019/BL-023 มี Priority **Won't (เฟสนี้)** — resolved 20260823 (เภสัชกรเจ้าของระบบยืนยันโดยตรงว่าไม่เชื่อมต่อโดยตรงในเฟสนี้ คงตามเดิม ดู [005](../../01-spec/20260816-005-legacy-system-integration.md) FR-4.4/FR-4.4a) ไม่มีการพัฒนาฟังก์ชันจริง Test Case ด้านล่างจึงเป็นเพียง scope-confirmation test (ยืนยันขอบเขตว่าไม่มี integration เกิดขึ้นจริง) ไม่ใช่การทดสอบฟังก์ชัน — **หมายเหตุขอบเขต:** ข้อมูลย้อนหลัง 3 ปีสำหรับ FT-009/BL-010 ได้มาจากการขอไฟล์ด้วยมือจาก รพ.สต. ทุกแห่ง (29 แห่ง) ตาม FR-4.4a ใหม่ — เป็นกิจกรรมตั้งต้นครั้งเดียวของ FT-009 (ดู [historical-data-migration.md](historical-data-migration.md)) ไม่ใช่ scope การทดสอบของ FT-019 นี้เอง จึงไม่มี test case เพิ่มในไฟล์นี้สำหรับประเด็นนั้น

| Test ID | Test Case Name | Pre-condition | Test Steps | Expected Result | Test Data | อ้างอิง |
|---|---|---|---|---|---|---|
| TC-073 | ยืนยันว่าไม่มีการเชื่อมต่อ JHCIS/myPCU โดยตรงในเฟสนี้ | ระบบ SmartSync ทำงานตามปกติ (ยอดคงเหลือ/การเบิกได้จากการกรอกในระบบเอง) | 1. ตรวจสอบ system integration/API endpoint ทั้งหมดของระบบ <br> 2. ตรวจสอบว่าไม่มีการเรียก API หรือแลกเปลี่ยนข้อมูลกับ JHCIS/myPCU โดยตรง | ไม่พบ integration/API เรียกไปยัง JHCIS/myPCU ใดๆ ในเฟสนี้ — ยืนยันว่ายอดคงเหลือทั้งหมดมาจากการกรอกในระบบ SmartSync เอง (FR-1.1a) | ไม่มี (negative test — ตรวจสอบว่าไม่มีสิ่งที่ไม่ควรมี) | BL-023, AC Scenario 1, FR-4.4, FR-4.4a |

---

## บันทึกการอัปเดต (Changelog)

- **20260816:** สร้าง Test Case ของ FT-019 ครั้งแรก — 1 test case (TC-073) ตาม scenario เดียวของ BL-023 ใน acceptance-criteria.md — เป็น scope-confirmation test เนื่องจาก Priority Won't ในเฟสนี้ ยัง `[รอยืนยัน]` ว่าการไม่เชื่อมต่อนี้ถูกต้องหรือไม่
- **20260823 (test-design-writer, audit stage 3 ของ /check-backlog-sync, หลังยืนยัน BL-023):** เภสัชกรเจ้าของระบบยืนยันแล้วว่าไม่เชื่อมต่อโดยตรงในเฟสนี้ (คงตามเดิม) พร้อมรายละเอียดใหม่ FR-4.4a ว่าข้อมูลย้อนหลัง 3 ปีสำหรับ FT-009/BL-010 มาจากการขอไฟล์ด้วยมือแทน — แก้หมายเหตุหัวไฟล์ให้สะท้อนสถานะ resolved และชี้แจงว่ารายละเอียดการขอไฟล์ด้วยมือเป็น scope ของ FT-009 ไม่ใช่ของ FT-019 นี้ (จึงไม่เพิ่ม test case ใหม่ในไฟล์นี้) — เพิ่มการอ้างอิง FR-4.4a ให้ TC-073
