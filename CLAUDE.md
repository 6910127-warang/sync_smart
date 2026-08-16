# SmartSync

**ไทย:** ระบบสนับสนุนการเบิกยา SmartSync เครือข่าย รพ.สต. อำเภอเมือง จังหวัดเชียงราย
**English:** SmartSync — A Requisition Support System for Inventory Balance in HPH Networks, Mueang Chiang Rai

## บริบทโครงการ (Project Context)

- **หน่วยงานเจ้าของระบบ:** กลุ่มงานเภสัชกรรม โรงพยาบาลเชียงรายประชานุเคราะห์ (รพ.แม่ข่าย)
- **หน่วยงานที่ใช้งาน (Network):** โรงพยาบาลส่งเสริมสุขภาพตำบล (รพ.สต.) 29 แห่งในอำเภอเมือง จังหวัดเชียงราย
- **เจ้าของข้อกำหนด (Requirement Owner):** เภสัชกร รพ.เชียงรายประชานุเคราะห์ (ผู้ใช้งาน Claude Code ในโปรเจกต์นี้)
- **Repository:** [github.com/warang-6910127/SmartSync](https://github.com/warang-6910127/SmartSync) (branch: `main`) — commit/push เฉพาะเมื่อผู้ใช้ขอเท่านั้น

**ปัญหาที่ต้องการแก้ไข และ KPI ของโครงการ** อยู่ใน spec หลักที่ [01-requirements/01-spec/20260816-001-project-scope-and-problem-background.md](01-requirements/01-spec/20260816-001-project-scope-and-problem-background.md) — สรุปสั้นๆ: ผู้เบิก (เจ้าหน้าที่ รพ.สต.) และผู้คัดกรอง (เภสัชกร) ใช้เกณฑ์คำนวณยอดเบิกคนละมาตรฐานกัน ทำให้อัตราหมุนเวียนคงคลังสูงถึง 3 เดือน (เป้าหมาย ≤ 1.5 เดือน) **อย่าสัมภาษณ์ผู้ใช้ซ้ำเรื่องนี้** — อ่านไฟล์นั้นก่อนถ้าต้องการบริบทปัญหา

## เฟสปัจจุบัน (Current Phase)

**โฟกัสหลักตอนนี้คือการทำเอกสาร ไม่ใช่การเขียนโค้ด** — อย่าเริ่มออกแบบ schema ฐานข้อมูล เขียนโค้ด หรือเลือก framework จริงจัง จนกว่าจะมีคำสั่งชัดเจนว่าจะเข้าสู่เฟสพัฒนา

**วิธีสร้าง/แก้ไข requirement ใหม่:** ใช้ skill `/new-requirement` (`.claude/skills/new-requirement/`) ซึ่งจะส่งต่อให้ subagent `requirement-writer` (`.claude/agents/requirement-writer.md`) เป็นผู้สัมภาษณ์ผู้ใช้ (ถามคำถามพร้อมตัวเลือกอย่างน้อย 3 แนวทางเสมอ), เขียน spec, อัปเดต backlog และ log ให้ครบตาม convention ด้านล่าง — ใช้ workflow นี้แทนการแก้ไฟล์เองตรงๆ ทุกครั้งที่มี raw requirement ใหม่จากผู้ใช้

## โครงสร้างเอกสาร (Document Structure)

- **`01-requirements/01-spec/{YYYYMMDD}-{RUNNING_NO}-{topic-slug}.md`** — เอกสาร requirement แยกตามหัวข้อ/Epic หนึ่งไฟล์ต่อหนึ่งเรื่อง (ไม่ใช่ไฟล์รวมเดียวเหมือนเดิม) โดย `RUNNING_NO` นับต่อเนื่องทั้งโปรเจกต์ (ไม่รีเซ็ต) และ `topic-slug` เป็น kebab-case ภาษาอังกฤษ
- **`01-requirements/backlog.md`** — Product Backlog หลัก อ้างอิงกลับไปยัง spec แต่ละไฟล์
- **`log/{YYYYMMDD}-log.md`** — บันทึกสรุปงานที่ทำในแต่ละวัน (สร้าง/แก้ spec ไหน, ถามอะไรไปบ้าง, backlog เปลี่ยนอะไร)

**Spec ปัจจุบันทั้งหมด** (แตกจาก Epic ตามขอบเขต — เรียงตามความสำคัญ):

| #   | หัวข้อ                                                          | ไฟล์                                                                                                                                 |
| --- | --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| 001 | ภาพรวมโครงการ/ที่มาปัญหา/glossary/stakeholder                   | [20260816-001-project-scope-and-problem-background.md](01-requirements/01-spec/20260816-001-project-scope-and-problem-background.md) |
| 002 | เบิก-จ่ายยา NCD (Core)                                          | [20260816-002-ncd-drug-requisition-core.md](01-requirements/01-spec/20260816-002-ncd-drug-requisition-core.md)                       |
| 003 | พยากรณ์สต็อก / แจ้งเตือนยาใกล้หมด                               | [20260816-003-stock-forecast-alerts.md](01-requirements/01-spec/20260816-003-stock-forecast-alerts.md)                               |
| 004 | รายงาน/Dashboard ผู้บริหาร                                      | [20260816-004-management-dashboard.md](01-requirements/01-spec/20260816-004-management-dashboard.md)                                 |
| 005 | เชื่อมต่อระบบเดิม (JHCIS/myPCU ที่ รพ.สต., INVC ที่ รพ.แม่ข่าย) | [20260816-005-legacy-system-integration.md](01-requirements/01-spec/20260816-005-legacy-system-integration.md)                       |
| 006 | ระบบและความปลอดภัย (RBAC, NFR)                                  | [20260816-006-rbac-and-security-nfr.md](01-requirements/01-spec/20260816-006-rbac-and-security-nfr.md)                               |

**สิ่งที่ยังไม่ยืนยัน (Open Items) ต้องดูในแต่ละไฟล์ spec โดยตรง** (หัวข้อ "สิ่งที่ยังไม่ยืนยัน" ท้ายไฟล์) — **อย่าเก็บรายการ open questions ซ้ำไว้ใน CLAUDE.md** เพราะจะหลุด sync กับความจริงเมื่อมีการตอบคำถามไปแล้ว (เคยเกิดขึ้นมาแล้วครั้งหนึ่งกับไฟล์นี้เอง) จุดที่ควรรู้ไว้ตอนนี้ (สำคัญที่สุด, ณ วันที่ปรับโครงสร้างเอกสารนี้):
- รูปแบบคอลัมน์ไฟล์ที่ INVC รองรับการนำเข้า ([005](01-requirements/01-spec/20260816-005-legacy-system-integration.md)) — **บล็อกการพัฒนา Epic 4** ควรติดต่อฝ่ายดูแล INVC ก่อน

## แนวทางการเขียนเอกสาร (Document Conventions)

- ใช้ภาษาไทยเป็นหลัก คำศัพท์เทคนิค/ตัวย่อภาษาอังกฤษที่วงการใช้ทั่วไป (SRS, User Story, Backlog, Sprint) คงไว้ตามเดิมได้
- **User Story format:** `ในฐานะ [role] ฉันต้องการ [ความต้องการ] เพื่อ [เหตุผล/คุณค่า]` พร้อม Acceptance Criteria แบบ Given/When/Then หรือ checklist
- **Backlog item ควรมี:** ID (`BL-XXX` ต่อเนื่อง ไม่มีวันรีเซ็ต), Epic/หมวดหมู่, User Story, Acceptance Criteria, Priority (MoSCoW: Must/Should/Could/Won't), หมายเหตุด้าน dependency
- **คำศัพท์เฉพาะ (Glossary):** เก็บรวมไว้ที่เดียวใน spec 001 ([20260816-001-project-scope-and-problem-background.md](01-requirements/01-spec/20260816-001-project-scope-and-problem-background.md)) ไม่ต้องซ้ำในไฟล์อื่น — เพิ่มคำใหม่ที่อาจกำกวมทันทีที่พบ
- **แก้ไข vs. สร้างไฟล์ spec ใหม่:** เป็นการวิเคราะห์ต่อครั้ง ไม่ใช่กฎตายตัว — ดูตรรกะเต็มใน `.claude/agents/requirement-writer.md` (แก้ไฟล์เดิมถ้าเป็นการต่อยอด/แก้ไขเรื่องเดิม, สร้างไฟล์ใหม่ถ้าเป็นหัวข้อ/Epic ใหม่จริงๆ)
- Versioning ของแต่ละไฟล์ spec เก็บผ่าน git log และหัวข้อ "บันทึกการอัปเดต" ในตัวไฟล์เอง ไม่ใช่ชื่อไฟล์ (ห้ามตั้งชื่อ `..._v2_final.md`)

## กฎการทำงานร่วมกับ Claude ในโปรเจกต์นี้

- **ห้ามสมมติข้อมูลทางคลินิก/นโยบายยา NCD เอง** — เรื่องเกณฑ์ยา, ปริมาณสำรอง (safety stock), เกณฑ์แจ้งเตือน ต้องถามผู้ใช้ (เภสัชกรเจ้าของระบบ) เสมอ เพราะเป็นความรู้เฉพาะทางที่ผู้ใช้มีอำนาจตัดสินใจ
- **ห้ามสมมติข้อมูลระบบภายนอกเอง** (ชื่อ/เวอร์ชัน/รูปแบบการเชื่อมต่อของ HOSxP, INVC, JHCIS, myPCU หรือระบบอื่นที่ยังไม่เคยถูกยืนยัน) — เคยเกิดขึ้นมาแล้วครั้งหนึ่งในโปรเจกต์นี้ที่สมมติผิดว่า รพ.แม่ข่ายใช้ HOSxP ทั้งที่จริงใช้ INVC ต้องถามให้ชัดก่อนเขียนลงเอกสารเป็นข้อสรุปเสมอ
- เมื่อเขียน requirement หรือ backlog แล้วเจอจุดที่ขอบเขตไม่ชัด ให้ **หยุดถามก่อน** แทนที่จะเดาแล้วเขียนลงเอกสารเป็นข้อสรุป — และเมื่อถาม ให้เสนอตัวเลือกอย่างน้อย 3 แนวทางเสมอ (ไม่ใช่คำถามปลายเปิด)
- ไม่ต้องสร้างโค้ด, ไม่ต้อง setup โปรเจกต์ซอฟต์แวร์ (package.json, framework ฯลฯ) ในเฟสนี้ เว้นแต่ผู้ใช้ขอเจาะจง
- เอกสาร spec แต่ละไฟล์ที่แก้ไข ให้แก้ไฟล์เดิมแทนสร้างไฟล์ใหม่ซ้ำซ้อนเมื่อเป็นเรื่องเดียวกัน (ดูตรรกะ new-vs-amend ด้านบน)
