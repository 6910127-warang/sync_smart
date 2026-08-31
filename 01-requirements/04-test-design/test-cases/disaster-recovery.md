# Test Cases — FT-033 Disaster Recovery (RTO ≤ 4 ชั่วโมง + ขั้นตอนสำรองแบบ Manual)

> อ้างอิงจาก [Feature List](../../02-feature-list.md), [Acceptance Criteria](../acceptance-criteria.md)
>
> หมายเหตุ: ข้อมูลทดสอบเป็น placeholder ทั่วไป ไม่ใช่ข้อมูลยา NCD จริง — ดู [test-plan.md](../test-plan.md) §4 — TC-131/TC-132 เป็นการทดสอบเชิง infrastructure/operational process (ทีมผู้ดูแลระบบกู้คืนระบบ, ขั้นตอน manual fallback นอกแอป) มากกว่า functional test ในตัวแอป SmartSync เอง แต่ **TC-133 (ยืนยันแล้ว 20260825) เป็น functional test ในแอปจริง** — ต้องมีบัญชีทดสอบ Admin และไฟล์ Excel ตัวอย่างสำหรับทดสอบหน้าจอ Bulk Import

| Test ID | Test Case Name | Pre-condition | Test Steps | Expected Result | Test Data | อ้างอิง |
|---|---|---|---|---|---|---|
| TC-131 | กู้คืนระบบภายในเป้าหมาย RTO | ระบบล่มในเวลาราชการ (จำลองสถานการณ์) | 1. จับเวลาเริ่มต้นสถานการณ์ระบบล่ม <br> 2. ทีมผู้ดูแลระบบดำเนินการกู้คืนตามแผน DR <br> 3. บันทึกเวลาที่ระบบกลับมาใช้งานได้ | ระบบกลับมาใช้งานได้ภายใน 4 ชั่วโมง (RTO ≤ 4 ชั่วโมงในเวลาราชการ) | สถานการณ์จำลองระบบล่ม, แผน DR ของทีมผู้ดูแลระบบ | BL-042, AC Scenario 1, NFR Disaster Recovery |
| TC-132 | มีขั้นตอนสำรองแบบ Manual ระหว่างรอกู้คืน | ระบบยังไม่สามารถใช้งานได้ระหว่างรอกู้คืน (สถานการณ์เดียวกับ TC-131) | 1. เจ้าหน้าที่/เภสัชกรดำเนินงานเบิก-จ่ายยาต่อโดยไม่รอระบบ <br> 2. ตรวจสอบว่ามีขั้นตอน/เอกสารสำรองแบบ manual ให้ใช้งานได้ทันที | มีขั้นตอนสำรองแบบ manual (เช่น บันทึกด้วยมือ/Excel ชั่วคราว) ที่นำมาใช้งานได้ทันทีโดยไม่ต้องรอระบบกลับมา | เอกสาร/แบบฟอร์ม manual fallback | BL-042, AC Scenario 2, NFR Disaster Recovery |
| TC-133 | นำข้อมูล Manual Fallback กลับเข้าระบบผ่านหน้าจอ Bulk Import | ระบบกลับมาใช้งานได้แล้วหลังกู้คืน (ต่อจาก TC-132), Login ด้วยบัญชี Admin | 1. รวบรวมข้อมูลที่บันทึกด้วยมือ/Excel ระหว่างระบบล่ม (จาก TC-132) ให้อยู่ในรูปแบบไฟล์ Excel <br> 2. เข้าหน้าจอ Bulk Import <br> 3. อัปโหลดไฟล์ Excel นั้น | ระบบนำเข้าข้อมูลเป็นชุด (bulk) เข้าสู่ระบบสำเร็จครบถ้วน ไม่มีข้อมูลตกหล่น ไม่ต้องกรอกซ้ำทีละรายการ | บัญชี Admin, ไฟล์ Excel ตัวอย่างที่มีข้อมูล manual fallback จาก TC-132 | BL-042, AC Scenario 3, NFR Disaster Recovery |

---

## บันทึกการอัปเดต (Changelog)

- **20260824 (test-design-writer, audit เต็มรูปแบบตามคำขอ `/check-backlog-sync`, หลังเพิ่ม BL-042/FT-033):** สร้าง Test Case ของ FT-033 ครั้งแรก — 3 test case (TC-131–TC-133) ครอบคลุมทั้ง 3 scenario ของ BL-042 ใน [acceptance-criteria.md](../acceptance-criteria.md) — TC-ID ต่อเนื่องจาก TC-130 (network-scale-scalability.md)
- **20260825 (scope change — ปิด `[ถือว่า]` ของ TC-133):** ผู้ใช้ยืนยันผ่าน `AskUserQuestion` ว่าการนำข้อมูล Manual Fallback กลับเข้าระบบมีหน้าจอ Bulk Import จาก Excel จริงในแอป ดำเนินการโดยผู้ดูแลระบบ (Admin) — เขียน TC-133 ใหม่เป็น functional test ที่ทดสอบได้จริงในแอป (ไม่ใช่ infrastructure/operational process แบบ TC-131/TC-132) แก้หมายเหตุหัวไฟล์ให้สะท้อนความแตกต่างนี้
