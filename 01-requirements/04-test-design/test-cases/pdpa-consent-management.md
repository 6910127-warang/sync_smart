# Test Cases — FT-023 มาตรการคุ้มครองข้อมูลตาม PDPA (Consent + บันทึกเวลายินยอม)

> อ้างอิงจาก [Feature List](../../02-feature-list.md), [Acceptance Criteria](../acceptance-criteria.md), และทุก User Journey ใน [03-user-journey/](../../03-user-journey/) (step "Login + Consent Banner")
>
> หมายเหตุ: ข้อมูลทดสอบเป็น placeholder ทั่วไป ไม่ใช่ข้อมูลยา NCD จริง — ดู [test-plan.md](../test-plan.md) §4

| Test ID | Test Case Name | Pre-condition | Test Steps | Expected Result | Test Data | อ้างอิง |
|---|---|---|---|---|---|---|
| TC-084 | มาตรการ PDPA ระดับพื้นฐานครบถ้วน | มีข้อมูลที่เชื่อมโยงถึงผู้ป่วยทางอ้อมในระบบ | 1. ตรวจสอบว่าระบบมี Consent Banner และประกาศ Privacy Policy ที่เข้าถึงได้จากทุกหน้าจอ | มีมาตรการป้องกันระดับพื้นฐาน (Basic compliance): Consent Banner + ประกาศ Privacy Policy | ไม่มี (ตรวจสอบโครงสร้างระบบ) | BL-027, AC Scenario 1, NFR Data Privacy |
| TC-085 | ยืนยันไม่ต้องมี DPO/DPIA เป็นทางการ | ระบบอยู่ในระดับ PDPA พื้นฐาน (resolved) | 1. ตรวจสอบเอกสาร/กระบวนการ compliance ของระบบ | ไม่มีกระบวนการ DPO/DPIA อย่างเป็นทางการที่จำเป็นสำหรับระบบนี้ | ไม่มี | BL-027, AC Scenario 2, NFR Data Privacy |
| TC-086 | แสดง Consent Banner ตอน login ครั้งแรก | ผู้ใช้ยังไม่เคยกดยินยอม Consent | 1. Login เข้าระบบครั้งแรกด้วยบัญชีใหม่ | ระบบแสดง Consent Banner ก่อนเข้าใช้งาน | บัญชีผู้ใช้ใหม่ (ทุก Role) | BL-030, AC Scenario 1, FR-6.3 |
| TC-087 | ไม่แสดง Consent Banner ซ้ำหลังยินยอมแล้ว | ผู้ใช้กดยินยอมไปแล้วในการ login ครั้งก่อน | 1. Logout แล้ว login ใหม่ด้วยบัญชีเดิม | ระบบไม่แสดง Consent Banner ซ้ำ | บัญชีผู้ใช้ที่เคยยินยอมแล้ว | BL-030, AC Scenario 2, FR-6.3 |
| TC-088 | เนื้อหา Consent ต้องไม่มีข้อความ Google Analytics | Consent Banner แสดงอยู่ (ต่อจาก TC-086) | 1. อ่านเนื้อหา Consent Banner ทั้งหมด | เนื้อหาระบุว่าเก็บ IP Address แต่ไม่มีข้อความเกี่ยวกับ Google Analytics/เครื่องมือวิเคราะห์เว็บใดๆ | เนื้อหา Consent Banner | BL-030, AC Scenario 3, FR-6.3 |
| TC-089 | ผู้ใช้ไม่กดยินยอม (ปิดหน้าต่าง) | ผู้ใช้ login ครั้งแรกและเห็น Consent Banner | 1. ปิดหน้าต่าง Consent Banner โดยไม่กดยินยอม <br> 2. พยายามเข้าใช้งานส่วนอื่นของระบบ | ระบบไม่อนุญาตให้เข้าใช้งานส่วนอื่นจนกว่าจะกดยินยอม | บัญชีผู้ใช้ใหม่ | BL-030, AC Scenario 4, FR-6.3 |
| TC-090 | บันทึกวันเวลาที่กดยินยอม | ผู้ใช้กำลังกดยินยอม Consent | 1. กดยินยอมบน Consent Banner <br> 2. ตรวจสอบ System Access Log | ระบบบันทึกวันเวลาที่ยินยอมลง System Access Log | บัญชีผู้ใช้ใหม่ | BL-031, AC Scenario 1, FR-6.4 |
| TC-091 | ไม่สร้างบันทึกยินยอมซ้ำ | ผู้ใช้เคยกดยินยอมไปแล้ว | 1. Logout แล้ว login ใหม่ (ไม่แสดง Consent Banner ซ้ำ) <br> 2. ตรวจสอบ System Access Log | ไม่มีการสร้างบันทึกเวลายินยอมใหม่ซ้ำ (มีเพียง 1 รายการจากครั้งแรก) | บัญชีผู้ใช้ที่เคยยินยอมแล้ว | BL-031, AC Scenario 2, FR-6.4 |

---

## บันทึกการอัปเดต (Changelog)

- **20260816:** สร้าง Test Case ของ FT-023 ครั้งแรก — 8 test case (TC-084–TC-091) ครอบคลุมทั้ง 8 scenario ของ BL-027/BL-030/BL-031 ใน acceptance-criteria.md
