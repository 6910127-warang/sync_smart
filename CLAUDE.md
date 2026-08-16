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

**โฟกัสหลักตอนนี้คือการทำเอกสาร ไม่ใช่การเขียนโค้ด** — อย่าเริ่มออกแบบ schema ฐานข้อมูล เขียนโค้ด หรือเลือก framework จริงจัง จนกว่าจะมีคำสั่งชัดเจนว่าจะเข้าสู่เฟสพัฒนา **ข้อยกเว้นเดียว:** Prototype แบบ static HTML/CSS ภายใต้ `prototype/` (ดูด้านล่าง) — เป็น mockup คลิกดูได้เพื่อตรวจสอบความเข้าใจร่วมกับผู้ใช้จริงก่อนเข้าเฟสพัฒนา ไม่ใช่แอปที่ใช้งานจริง (ไม่มี framework/backend/state จริง) จึงไม่ถือว่าขัดกับกฎ "ไม่เขียนโค้ด" ข้อนี้

**วิธีสร้าง/อัปเดต Prototype:** ใช้ skill `/build-prototype` (`.claude/skills/build-prototype/`) ซึ่งจะส่งต่อให้ subagent `prototype-builder` (`.claude/agents/prototype-builder.md`) โดยตรง — สร้างหน้าจอ static HTML/CSS ภายใต้ `prototype/{role-slug}/{screen-slug}.html` (คลิกไปมาระหว่างหน้าได้ตาม happy path) โดยยึด DESIGN.md เป็น source of truth ของสี/ฟอนต์/spacing/component ทั้งหมด และดึงเนื้อหาหน้าจอจาก `02-feature-list.md`, `backlog.md`, `04-test-design/acceptance-criteria.md`, และ `03-user-journey/*.md` — ห้ามใช้ข้อมูลยา NCD จริงในหน้าจอตัวอย่าง (ใช้ placeholder เท่านั้น) รองรับการระบุเจาะจง (role, FT-ID, หรือ journey step เดียว) เนื่องจาก Prototype เต็มรูปแบบ (4 role × สูงสุด 25 Feature) มีขนาดใหญ่มาก ถ้าไม่ระบุขอบเขต skill จะถามยืนยันกลยุทธ์การสร้างก่อนเริ่มเสมอ ทะเบียนหน้าจอทั้งหมดดูที่ `prototype/screen-map.md`

**หมายเหตุการดู Prototype:** เปิดไฟล์ HTML ตรงๆ (`file://`) ในบาง preview tool อาจไม่โหลด CSS ให้ (relative path ของ `<link>` resolve ไม่ได้เมื่อ tool อ่านไฟล์เป็น static snapshot) — ให้รันผ่าน local static server แทน มี config พร้อมใช้แล้วที่ `.claude/launch.json` (ชื่อ config: `prototype`, serve โฟลเดอร์ `prototype/` ที่ port 4173)

**วิธีตรวจสอบว่า Prototype ยังสอดคล้องกับทั้ง chain หรือไม่ (โดยเฉพาะหลังมีคนแก้ไขหน้าจอ Prototype เอง นอกเหนือจาก `/build-prototype`):** ใช้ skill `/check-prototype-sync` (`.claude/skills/check-prototype-sync/`) ซึ่งจะส่งต่อให้ subagent `prototype-consistency-checker` (`.claude/agents/prototype-consistency-checker.md`) โดยตรง — ตรวจจับว่าหน้าจอไหนถูกแก้ไขตั้งแต่ตรวจครั้งก่อน (เทียบ content hash เก็บไว้ที่ `prototype/consistency-check-log.md`) แล้วเทียบเนื้อหาหน้าจอกับ spec/backlog/feature-list/journey/AC/test-case/test-plan ทั้งหมด — แก้ไขจุดที่ชัดเจนให้อัตโนมัติ (เอกสารตกยุคเทียบกับสิ่งที่ตัดสินใจไปแล้ว) แต่ **ห้ามสรุปเองว่าพฤติกรรมใหม่ที่เห็นใน Prototype คือ requirement จริง** — ต้องถามผู้ใช้ก่อนเสมอว่าจะ formalize เป็น requirement จริง (แนะนำให้ใช้ `/new-requirement`) หรือเป็นการแก้ไข Prototype เองที่ยังไม่ตั้งใจ (แนะนำให้รัน `/build-prototype` ทับกลับ) ทำงานคนละทิศทางจาก `/check-backlog-sync` (เช็คนี้ถือว่า Prototype อาจสะท้อนการตัดสินใจใหม่ที่ยังไม่ถูกบันทึกขึ้นไปด้านบน แทนที่จะถือว่า spec/backlog เป็นความจริงเสมอ) จึงไม่ถูก chain รวมกับ `/check-backlog-sync` เหมือนกับ `/build-prototype`

**วิธีทำทั้ง chain รวดเดียวตั้งแต่ raw requirement ถึง Test Design (ไม่ต้องเรียกทีละ skill):** ใช้ skill `/build-requirement-chain` (`.claude/skills/build-requirement-chain/`) — เป็น orchestrator ล้วนๆ ไม่มี logic เขียนเอกสารเอง แค่เรียก subagent ที่มีอยู่แล้ว 3 ตัวต่อกันตามลำดับบังคับ: (1) `requirement-writer` (raw requirement → spec + backlog) → (2) `feature-journey-builder` (backlog → feature-list + user-journey) → (3) `test-design-writer` (→ acceptance-criteria + test-plan + test-case) โดยแต่ละขั้นต้องรอให้เสร็จก่อนเริ่มขั้นถัดไป (เหมือนกับที่ `/check-backlog-sync` เรียงลำดับ subagent เดิม 2 ใน 3 ตัวนี้อยู่แล้ว) ใช้เมื่อมี raw requirement ใหม่และต้องการให้ผลไล่ลงไปถึง test design ในคำสั่งเดียว — ถ้าต้องการหยุดตรวจสอบระหว่างทางแต่ละขั้น ให้ใช้ `/new-requirement` ตามด้วย `/check-backlog-sync` (หรือ `/build-feature-journey`/`/build-test-design` แยก) แทน

**วิธีสร้าง/แก้ไข requirement ใหม่ (หยุดที่ spec+backlog เท่านั้น):** ใช้ skill `/new-requirement` (`.claude/skills/new-requirement/`) ซึ่งจะส่งต่อให้ subagent `requirement-writer` (`.claude/agents/requirement-writer.md`) เป็นผู้สัมภาษณ์ผู้ใช้ (ถามคำถามพร้อมตัวเลือกอย่างน้อย 3 แนวทางเสมอ), เขียน spec, อัปเดต backlog และ log ให้ครบตาม convention ด้านล่าง — ใช้ workflow นี้แทนการแก้ไฟล์เองตรงๆ ทุกครั้งที่มี raw requirement ใหม่จากผู้ใช้

**วิธีตรวจสอบว่าทั้ง chain sync กันหรือไม่ (Requirement → Backlog → Feature List → User Journey → Test Design):** ใช้ skill `/check-backlog-sync` (`.claude/skills/check-backlog-sync/`) — เรียก 3 subagent ต่อกันเป็นลำดับ: (1) `backlog-sync-checker` (`.claude/agents/backlog-sync-checker.md`) ตรวจสอบทุกไฟล์ spec เทียบกับ `01-requirements/backlog.md` ก่อน แก้ไขจุดที่ชัดเจนให้อัตโนมัติและถามผู้ใช้เมื่อพบจุดที่ต้องตัดสินใจ แล้ว (2) `feature-journey-builder` (`.claude/agents/feature-journey-builder.md`) ตรวจ `02-feature-list.md` และ `03-user-journey/*.md` เทียบกับ `backlog.md` เวอร์ชันล่าสุด (หลังขั้นที่ 1 แก้ไปแล้ว) แล้ว (3) `test-design-writer` (`.claude/agents/test-design-writer.md`) ตรวจ `04-test-design/` (acceptance-criteria.md, test-plan.md, test-cases/*.md) เทียบกับผลลัพธ์ของขั้นที่ 1-2 — ทำให้แก้ spec/backlog/feature-list/journey ที่จุดไหนก็ตาม แล้ว sync ไล่ลงไปจนถึง test-design ได้ในคำสั่งเดียว เรียกใช้เป็นระยะหลังแก้ spec/backlog หลายจุด หรือเมื่อสงสัยว่าจุดไหนใน chain นี้อาจไม่ตรงกันแล้ว

**วิธีสร้าง/อัปเดตเฉพาะ Feature List และ User Journey (ไม่ต้องตรวจ spec↔backlog ใหม่):** ใช้ skill `/build-feature-journey` (`.claude/skills/build-feature-journey/`) ซึ่งจะส่งต่อให้ subagent `feature-journey-builder` โดยตรง — สร้าง `01-requirements/02-feature-list.md` (จัดกลุ่ม backlog item เป็น Feature พร้อม MoSCoW ที่ roll-up จาก priority ของ backlog item) และ `01-requirements/03-user-journey/{role}-journey.md` (Mermaid diagram ต่อ role พร้อมคำอธิบาย mapping กลับไปยัง FR/US/BL-ID) ถ้ายังไม่มีไฟล์จะสร้างใหม่ ถ้ามีอยู่แล้วจะตรวจ+แก้ส่วนที่ไม่ตรงกับ backlog ปัจจุบัน — subagent ตัวนี้ถูกเรียกโดยอัตโนมัติเป็นขั้นที่ 2 ของ `/check-backlog-sync` อยู่แล้วด้วย ใช้ `/build-feature-journey` ตรงๆ เฉพาะเมื่อต้องการรีเฟรชแค่ feature-list/journey เร็วๆ โดยไม่ต้องตรวจ spec↔backlog ใหม่ทั้งหมด

**วิธีสร้าง/อัปเดต Acceptance Criteria, Test Plan, และ Test Case:** ใช้ skill `/build-test-design` (`.claude/skills/build-test-design/`) ซึ่งจะส่งต่อให้ subagent `test-design-writer` (`.claude/agents/test-design-writer.md`) โดยตรง — สร้าง `01-requirements/04-test-design/acceptance-criteria.md` (ขยาย AC แบบย่อใน backlog.md เป็น Given-When-Then หลาย scenario ต่อ BL-ID), `01-requirements/04-test-design/test-plan.md` (ภาพรวมกลยุทธ์ทดสอบ 1 ไฟล์ต่อโปรเจกต์: scope, ประเภทการทดสอบ, environment, risk management, entry/exit criteria) และ `01-requirements/04-test-design/test-cases/{feature-slug}.md` (test case แบบ step-by-step ต่อ Feature พร้อม test id, pre-condition, test steps, expected result, test data, และอ้างอิงกลับไปยัง requirement/AC) — รองรับการระบุเจาะจง (เฉพาะ BL-ID, FT-ID, Epic, หรือ artifact เดียว) ถ้าไม่ระบุจะครอบคลุมทั้งหมด ถ้ายังไม่มีไฟล์จะสร้างใหม่ ถ้ามีอยู่แล้วจะตรวจ+แก้ส่วนที่ไม่ตรงกับ backlog/feature-list/journey ปัจจุบัน — subagent ตัวนี้ถูกเรียกโดยอัตโนมัติเป็นขั้นที่ 3 ของ `/check-backlog-sync` อยู่แล้วด้วย ใช้ `/build-test-design` ตรงๆ เฉพาะเมื่อต้องการรีเฟรช/สร้างเฉพาะ test-design เร็วๆ โดยไม่ต้องตรวจทั้ง chain ใหม่

## โครงสร้างเอกสาร (Document Structure)

- **`DESIGN.md`** — Design System หลักของโปรเจกต์ (สี/ฟอนต์/spacing/component/UX rules) — source of truth ของ Prototype ทั้งหมด แก้ไขได้ตรงๆ ตามที่ผู้ใช้ต้องการ (ไม่มี skill ดูแลอัตโนมัติ)
- **`01-requirements/01-spec/{YYYYMMDD}-{RUNNING_NO}-{topic-slug}.md`** — เอกสาร requirement แยกตามหัวข้อ/Epic หนึ่งไฟล์ต่อหนึ่งเรื่อง (ไม่ใช่ไฟล์รวมเดียวเหมือนเดิม) โดย `RUNNING_NO` นับต่อเนื่องทั้งโปรเจกต์ (ไม่รีเซ็ต) และ `topic-slug` เป็น kebab-case ภาษาอังกฤษ
- **`01-requirements/backlog.md`** — Product Backlog หลัก อ้างอิงกลับไปยัง spec แต่ละไฟล์
- **`01-requirements/02-feature-list.md`** — Feature List (มุมมองระดับ feature ที่จัดกลุ่มมาจาก backlog item พร้อม MoSCoW roll-up) — ดูแลโดย `/build-feature-journey`, ไม่ต้องแก้มือ
- **`01-requirements/03-user-journey/{role}-journey.md`** — User Journey แยกไฟล์ต่อ role (Mermaid diagram + คำอธิบาย mapping กลับ FR/US/BL-ID) — ดูแลโดย `/build-feature-journey`, ไม่ต้องแก้มือ
- **`01-requirements/04-test-design/acceptance-criteria.md`** — Acceptance Criteria แบบ Given-When-Then เต็มรูปแบบต่อ backlog item (ขยายจาก AC แบบย่อใน backlog.md) — ดูแลโดย `/build-test-design`, ไม่ต้องแก้มือ
- **`01-requirements/04-test-design/test-plan.md`** — Test Plan ภาพรวมกลยุทธ์ทดสอบ 1 ไฟล์ต่อโปรเจกต์ (scope, ประเภทการทดสอบ, environment, risk management, entry/exit criteria) — ดูแลโดย `/build-test-design`, ไม่ต้องแก้มือ
- **`01-requirements/04-test-design/test-cases/{feature-slug}.md`** — Test Case แบบ step-by-step ต่อ Feature (test id, pre-condition, test steps, expected result, test data, อ้างอิง requirement/AC) — ดูแลโดย `/build-test-design`, ไม่ต้องแก้มือ
- **`prototype/{role-slug}/{screen-slug}.html`** — หน้าจอ Prototype แบบ static HTML/CSS ต่อ role (คลิกไปมาได้ตาม happy path, สไตล์ตาม DESIGN.md) พร้อม `prototype/screen-map.md` เป็นทะเบียนหน้าจอทั้งหมด — ดูแลโดย `/build-prototype`, ไม่ต้องแก้มือ
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
