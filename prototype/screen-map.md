# Prototype Screen Map — SmartSync

> ทะเบียนหน้าจอทั้งหมดของ Prototype ภายใต้ `prototype/` — map กลับไปยัง Journey step / FT-ID / BL-ID ที่มาของแต่ละหน้าจอ ดูแลโดย `/build-prototype`, ไม่ต้องแก้มือ
>
> **สร้างล่าสุดโดยอ้างอิง DESIGN.md วันที่:** 20260820 (รีเฟรช assets เพื่อรองรับ Responsive เต็มรูปแบบ — เนื้อหา/หน้าจอเดิมสร้างอ้างอิง DESIGN.md วันที่ 20260816)
>
> **สถานะ Responsive:** ทุกหน้าจอทั้ง 49 หน้า (4 role) รองรับ Mobile (320–767px) / Tablet (768–1023px) / Desktop (1024px+) ตาม DESIGN.md §2.3/§3.1/§3.2/§3.3/§3.5/§3.6 แล้ว — ใช้งานผ่าน media query ร่วมใน `assets/tokens.css` + `assets/components.css` เป็นหลัก (ดู breakdown ในหัวข้อ Changelog ด้านล่าง) เนื้อหา/ฟีเจอร์ในแต่ละหน้าจอไม่เปลี่ยนแปลงจากก่อนหน้านี้ มีแต่ layout/behavior ที่ปรับตาม breakpoint

## เจ้าหน้าที่ รพ.สต. (staff-hph)

| Screen Slug | ไฟล์ | Journey Step | FT-ID | BL-ID | สถานะ |
|---|---|---|---|---|---|
| login | staff-hph/login.html | 1 | FT-020 | BL-024 | สร้างแล้ว |
| consent | staff-hph/consent.html | 1 | FT-023 | BL-027, BL-030, BL-031 | สร้างแล้ว |
| stock-dashboard | staff-hph/stock-dashboard.html | 10 | FT-004 | BL-007 | สร้างแล้ว |
| requisition-new | staff-hph/requisition-new.html | 2, 3, 4 | FT-001, FT-008 | BL-001, BL-002, BL-032 | สร้างแล้ว |
| requisition-consult-sent | staff-hph/requisition-consult-sent.html | 5 | FT-001 | BL-003 | สร้างแล้ว |
| requisition-confirm | staff-hph/requisition-confirm.html | 6 | FT-001 | BL-002 | สร้างแล้ว |
| requisition-submitted | staff-hph/requisition-submitted.html | 6 | FT-001 | BL-002 | สร้างแล้ว |
| requisition-list | staff-hph/requisition-list.html | 7 | FT-002 | BL-004, BL-005 | สร้างแล้ว |
| requisition-detail | staff-hph/requisition-detail.html | 8 | FT-017 | BL-020b | สร้างแล้ว |
| receive-confirm | staff-hph/receive-confirm.html | 9 | FT-003 | BL-006 | สร้างแล้ว |
| receive-confirmed | staff-hph/receive-confirmed.html | 9, 10 | FT-003, FT-004 | BL-006, BL-007 | สร้างแล้ว |
| notifications | staff-hph/notifications.html | 11 | FT-011, FT-007, FT-012 | BL-013, BL-009b, BL-014 | สร้างแล้ว |
| emergency-requisition | staff-hph/emergency-requisition.html | 12 | FT-006 | BL-009 | สร้างแล้ว |
| emergency-requisition-confirm | staff-hph/emergency-requisition-confirm.html | 12 | FT-006 | BL-009 | สร้างแล้ว |
| emergency-requisition-submitted | staff-hph/emergency-requisition-submitted.html | 12 | FT-006 | BL-009 | สร้างแล้ว |

## เภสัชกร (pharmacist)

| Screen Slug | ไฟล์ | Journey Step | FT-ID | BL-ID | สถานะ |
|---|---|---|---|---|---|
| login | pharmacist/login.html | 1 | FT-020 | BL-024 | สร้างแล้ว |
| consent | pharmacist/consent.html | 1 | FT-023 | BL-027, BL-030, BL-031 | สร้างแล้ว |
| approval-queue-level1 | pharmacist/approval-queue-level1.html | 2, 3, 13 | FT-002, FT-001, FT-006 | BL-004, BL-003, BL-009 | สร้างแล้ว |
| approval-review-level1 | pharmacist/approval-review-level1.html | 4, 5 | FT-002, FT-013 | BL-004, BL-015 | สร้างแล้ว |
| approval-level1-confirm | pharmacist/approval-level1-confirm.html | 4 | FT-002 | BL-004 | สร้างแล้ว |
| approval-level1-approved | pharmacist/approval-level1-approved.html | 6 | FT-002 | BL-004, BL-005 | สร้างแล้ว |
| approval-level1-reject | pharmacist/approval-level1-reject.html | 4 | FT-002 | BL-004 | สร้างแล้ว |
| approval-level1-rejected | pharmacist/approval-level1-rejected.html | 4 | FT-002, FT-005 | BL-004, BL-008 | สร้างแล้ว |
| approval-queue-level2 | pharmacist/approval-queue-level2.html | 7 | FT-002 | BL-004 | สร้างแล้ว |
| approval-review-level2 | pharmacist/approval-review-level2.html | 7, 8 | FT-002 | BL-004 | สร้างแล้ว |
| approval-level2-confirm | pharmacist/approval-level2-confirm.html | 7 | FT-002 | BL-004, BL-005 | สร้างแล้ว |
| approval-level2-approved | pharmacist/approval-level2-approved.html | 9 | FT-002 | BL-004, BL-005 | สร้างแล้ว |
| ready-to-export | pharmacist/ready-to-export.html | 9 | FT-002, FT-017 | BL-005, BL-020 | สร้างแล้ว |
| export-confirm | pharmacist/export-confirm.html | 10 | FT-017 | BL-020, BL-021 | สร้างแล้ว |
| export-confirmed | pharmacist/export-confirmed.html | 10, 11 | FT-017 | BL-020, BL-005 | สร้างแล้ว |
| audit-trail | pharmacist/audit-trail.html | 12 | FT-005 | BL-008 | สร้างแล้ว |

## ผู้บริหาร (executive)

| Screen Slug | ไฟล์ | Journey Step | FT-ID | BL-ID | สถานะ |
|---|---|---|---|---|---|
| login | executive/login.html | 1 | FT-020 | BL-024 | สร้างแล้ว |
| consent | executive/consent.html | 1 | FT-023 | BL-027, BL-030, BL-031 | สร้างแล้ว |
| dashboard | executive/dashboard.html | 2 | FT-014 | BL-016 | สร้างแล้ว |
| unit-detail | executive/unit-detail.html | 3 | FT-014 | BL-017 | สร้างแล้ว |
| trend-analysis | executive/trend-analysis.html | 4 | FT-015 | BL-018 | สร้างแล้ว |
| report-filter | executive/report-filter.html | 5 | FT-016 | BL-019b | สร้างแล้ว |
| export-result | executive/export-result.html | 6 | FT-016 | BL-019 `[รอยืนยัน รูปแบบไฟล์]` | สร้างแล้ว |

## ผู้ดูแลระบบ (admin)

| Screen Slug | ไฟล์ | Journey Step | FT-ID | BL-ID | สถานะ |
|---|---|---|---|---|---|
| login | admin/login.html | 1 | FT-020 | BL-024 | สร้างแล้ว |
| consent | admin/consent.html | 1 | FT-023 | BL-027, BL-030, BL-031 | สร้างแล้ว |
| rbac-user-list | admin/rbac-user-list.html | 2 | FT-020 | BL-024 | สร้างแล้ว |
| rbac-user-edit | admin/rbac-user-edit.html | 2 | FT-020 | BL-024 | สร้างแล้ว |
| access-log | admin/access-log.html | 3 | FT-024 | BL-028 | สร้างแล้ว |
| emergency-correction | admin/emergency-correction.html | 4 | FT-021 | BL-025 | สร้างแล้ว |
| emergency-correction-confirm | admin/emergency-correction-confirm.html | 4 | FT-021 | BL-025 | สร้างแล้ว |
| emergency-correction-saved | admin/emergency-correction-saved.html | 4 | FT-021, FT-005 | BL-025, BL-008 | สร้างแล้ว |
| audit-log-retention | admin/audit-log-retention.html | 5 | FT-024 | BL-029 | สร้างแล้ว |
| system-status | admin/system-status.html | ไม่ปรากฏเป็น step แยกใน admin-journey.md (NFR เชิงระบบ) | FT-025 | BL-033 | สร้างแล้ว |

---

## บันทึกการอัปเดต (Changelog)

- **20260816:** สร้าง Prototype ครั้งแรกสำหรับบทบาทเจ้าหน้าที่ รพ.สต. (staff-hph) เท่านั้น ตามขอบเขตที่ผู้ใช้ยืนยัน (เริ่มทีละ role) — สร้าง shared assets (`assets/tokens.css`, `assets/components.css`) ครั้งแรกโดยยึด DESIGN.md วันที่ 20260816 ทั้งหมด, สร้าง 15 หน้าจอครอบคลุมทุก journey step ของ `03-user-journey/staff-hph-journey.md` (BL-024/BL-030 login+consent, BL-001/BL-002/BL-032/BL-003 สร้างคำขอ, BL-004/BL-005 ติดตามสถานะอนุมัติ, BL-020b ดาวน์โหลดไฟล์, BL-006/BL-007 รับยา+คงคลัง, BL-013/BL-009b/BL-014 แจ้งเตือน, BL-009 เบิกฉุกเฉิน) และสร้าง `prototype/index.html` (landing page 4 บทบาท เปิดใช้งานได้เฉพาะ staff-hph รอบนี้) — บทบาทเภสัชกร/ผู้บริหาร/ผู้ดูแลระบบยังไม่สร้าง รอการเรียกใช้รอบถัดไป
- **20260816 (รอบ 2):** สร้าง Prototype สำหรับบทบาทเภสัชกร (pharmacist) ครบทั้ง Journey เดียว (รวมผู้อนุมัติระดับ 1 และผู้ตรวจสอบระดับ 2 ตามที่ `03-user-journey/pharmacist-journey.md` ระบุว่าเป็นบทบาทที่สลับกันได้ ไม่ใช่คนละ Journey) — reuse shared assets (`assets/tokens.css`, `assets/components.css`) เดิมทั้งหมด ไม่มีการเปลี่ยนแปลงเพราะ DESIGN.md ไม่มีการแก้ไขค่าตั้งแต่รอบแรก สร้าง 16 หน้าจอครอบคลุมทั้ง 13 journey step: login/consent (FT-020/FT-023, BL-024/BL-030/BL-027/BL-031), รับแจ้งเตือนขอปรึกษา+เห็นคิวรออนุมัติระดับ 1+แยกแยะคำขอฉุกเฉิน (FT-002/FT-001/FT-006, BL-004/BL-003/BL-009) ในหน้าเดียว, พิจารณา/ปรับจำนวน/ระบุจำนวนคาดการณ์เคสใหม่จาก รพศ. (FT-002/FT-013, BL-004/BL-015), อนุมัติระดับ 1 พร้อม confirm dialog และผลลัพธ์ (BL-004), ปฏิเสธคำขอพร้อมเหตุผลและผลลัพธ์ (BL-004 Scenario 2), คิว+ตรวจสอบระดับ 2 พร้อมตัวอย่างประกอบกรณีระบบปฏิเสธคนเดียวกันอนุมัติซ้ำสองระดับ (BL-004 Scenario 4 — แสดงเป็น state ตัวอย่างในหน้าเดียวกันตามคำสั่ง ไม่ใช่ validation แบบ interactive จริง), อนุมัติระดับ 2 พร้อม confirm dialog และผลลัพธ์สถานะ "พร้อมส่งออก" อัตโนมัติ (BL-005), คิวพร้อมส่งออก+คอนเฟิร์มส่งออกไฟล์+ผลลัพธ์สถานะ "จ่ายแล้ว" (FT-017, BL-020/BL-021/BL-005), และ Audit Trail แบบ end-to-end ของคำขอหนึ่งรายการ (FT-005, BL-008) — อัปเดต `prototype/index.html` เปิดใช้งาน role card เภสัชกร ข้อมูลยา/ชื่อผู้อนุมัติ/รหัสคำขอทั้งหมดเป็น placeholder illustrative สอดคล้องกับที่ใช้ในบทบาท staff-hph เดิม (ยา A-D, รพ.สต. ตัวอย่าง A/B/C, รหัสคำขอ REQ-2569-XX-XXX) — บทบาทผู้บริหาร/ผู้ดูแลระบบยังไม่สร้าง รอการเรียกใช้รอบถัดไป
- **20260816 (รอบ 3):** สร้าง Prototype สำหรับบทบาทผู้บริหาร (executive) ครบทั้ง Journey เดียว ตาม `03-user-journey/executive-journey.md` (6 journey step) — reuse shared assets (`assets/tokens.css`, `assets/components.css`) เดิมทั้งหมด ไม่มีการเปลี่ยนแปลงเพราะ DESIGN.md ไม่มีการแก้ไขค่าตั้งแต่รอบแรก สร้าง 7 หน้าจอ: login/consent (FT-020/FT-023, BL-024/BL-027/BL-030/BL-031), Dashboard ภาพรวมคงคลังทั้งเครือข่ายพร้อม KPI card + ตารางสถานะรายหน่วย รวมตัวอย่างหน่วยที่ยังไม่มีข้อมูล (FT-014, BL-016 Scenario 1/3), Drill-down รายละเอียดหน่วยแบบ read-only พร้อมโน้ตยืนยันว่าแก้ไขไม่ได้ (FT-014, BL-017 Scenario 1/2/3), แนวโน้มการเบิก-จ่ายแยกตามหน่วย/รายการยาแบบตาราง (AC ระบุ "กราฟ/ตาราง" จึงเลือกตารางเพื่อไม่ต้องประดิษฐ์ chart component ที่ DESIGN.md ไม่ได้กำหนดไว้) พร้อมตัวอย่างหน่วยที่ยังไม่มีข้อมูล (FT-015, BL-018 Scenario 1/2/3), กรอง/เลือกช่วงเวลาและหน่วยงานก่อนส่งออกรายงาน พร้อมตัวอย่าง validation error ช่วงเวลาไม่ถูกต้อง (FT-016, BL-019b), และผลลัพธ์ส่งออกรายงาน (FT-016, BL-019) — **หมายเหตุสำคัญ:** หน้า export-result.html แสดงรูปแบบไฟล์เป็น `[รอยืนยัน]` อย่างชัดเจน (ไม่ใส่นามสกุลไฟล์จริง) เพราะ BL-019 ยังไม่ยืนยันรูปแบบไฟล์ (Excel/PDF/ทั้งสอง) จากเภสัชกรเจ้าของข้อกำหนด ทุกหน้าจอเป็น read-only ตาม RBAC ของบทบาทนี้ ไม่มีปุ่มอนุมัติ/แก้ไขใดๆ ปรากฏ — อัปเดต `prototype/index.html` เปิดใช้งาน role card ผู้บริหาร ข้อมูลหน่วยงาน/จำนวนทั้งหมดเป็น placeholder illustrative (จำนวนหน่วย 29 แห่งอ้างอิงข้อเท็จจริงโครงการจริงใน CLAUDE.md เท่านั้น ตัวเลขอื่นเป็นตัวอย่างประกอบ) — บทบาทผู้ดูแลระบบยังไม่สร้าง รอการเรียกใช้รอบถัดไป
- **20260816 (รอบ 4):** สร้าง Prototype สำหรับบทบาทผู้ดูแลระบบ (admin) ครบทั้ง Journey เดียว ตาม `03-user-journey/admin-journey.md` (5 journey step) — เป็น role สุดท้ายในทั้ง 4 role — reuse shared assets (`assets/tokens.css`, `assets/components.css`) เดิมทั้งหมด ไม่มีการเปลี่ยนแปลงเพราะ DESIGN.md ไม่มีการแก้ไขค่าตั้งแต่รอบแรก สร้าง 10 หน้าจอ: login/consent (FT-020/FT-023, BL-024/BL-027/BL-030/BL-031), กำหนดสิทธิ์ผู้ใช้ตาม Role — รายชื่อผู้ใช้พร้อม Role/หน่วยงานที่สังกัด + ฟอร์มแก้ไขสิทธิ์รายคน พร้อมตัวอย่างประกอบกรณีปฏิเสธการเข้าถึงข้ามหน่วย (FT-020, BL-024 Scenario 1/2/3/4), System Access Log แสดง login/logout + IP Address (placeholder ในช่วง IP สงวนไว้สำหรับเครือข่ายภายใน ไม่ใช่ IP จริง) รวมตัวอย่าง login ไม่สำเร็จและ logout แยกเวลา (FT-024, BL-028 Scenario 1/2/3), แก้ไขข้อมูลธุรกิจกรณีฉุกเฉิน 3 หน้าจอ (ฟอร์มค้นหา+ค่าที่แก้ไข → ยืนยันผ่าน confirm dialog ที่ระบุชัดว่าจะบันทึก audit log ตาม DESIGN.md §4.3 พร้อมตัวอย่างประกอบกรณีไม่ระบุเหตุผล → ผลลัพธ์บันทึกสำเร็จพร้อม entry ใหม่ใน Audit Log) (FT-021/FT-005, BL-025/BL-008), Audit Trail ทางธุรกิจ + Access Log ย้อนหลังแสดงการเก็บรักษาข้อมูลอย่างน้อย 90 วันรวมตัวอย่าง boundary (อายุครบ 90 วันพอดี) และตัวอย่างข้อมูลเกิน 90 วันที่ยังไม่ถูกลบ (FT-024, BL-029 Scenario 1/2/3), และหน้าการตั้งค่าระบบแสดงสถานะ/ช่วงเวลาพร้อมใช้งานเฉพาะเวลาราชการ (FT-025, BL-033 — ไม่ปรากฏเป็น step แยกใน admin-journey.md เนื่องจากเป็น NFR เชิงระบบตามที่ changelog ของไฟล์นั้นระบุไว้ แต่สร้างหน้าจอเสริมตามที่ Feature List กำหนด) — FT-022 (Desktop-first) ไม่มีหน้าจอเฉพาะตามคำสั่ง เนื่องจากครอบคลุมอยู่แล้วโดย shared layout (`.app-shell`/`.main` ที่ยืดหดได้ถึง 1024px) — อัปเดต `prototype/index.html` เปิดใช้งาน role card ผู้ดูแลระบบ ทำให้ไม่มี role ใดเหลือสถานะ "ยังไม่สร้าง — รอรอบถัดไป" อีกต่อไป — ครบทั้ง 4 role แล้ว ชื่อผู้ใช้/IP Address/รหัสคำขอทั้งหมดเป็น placeholder illustrative
- **20260820 (รอบ 5 — Responsive retrofit):** อัปเดตหน้าจอทั้งหมด 49 หน้า (4 role) + shared assets ให้รองรับ Responsive เต็มรูปแบบ ตามมติที่เปลี่ยนจาก Desktop-first เดิม ([spec 006](../01-requirements/01-spec/20260816-006-rbac-and-security-nfr.md) หัวข้อ "เพิ่มเติม 20260820" + [spec 001](../01-requirements/01-spec/20260816-001-project-scope-and-problem-background.md)) และ DESIGN.md ที่อัปเดตตามมติดังกล่าว (§2.3, §3.1, §3.2, §3.3, §3.5, §3.6) — **ไม่มีการเปลี่ยนเนื้อหา/ฟีเจอร์/flow ของหน้าจอใดๆ เปลี่ยนเฉพาะ layout/behavior ตาม breakpoint เท่านั้น:**
  - `assets/tokens.css`: อัปเดตคอมเมนต์อ้างอิง DESIGN.md เป็น 20260820, เอา `--container-min` (เดิมใช้บังคับ desktop-only min-width) ออก, เพิ่มคอมเมนต์อธิบาย breakpoint (Mobile 320-767px / Tablet 768-1023px / Desktop 1024px+) — ค่าสี/ฟอนต์/spacing เดิมไม่เปลี่ยน
  - `assets/components.css`: เขียนใหม่แบบ mobile-first ทั้งไฟล์ (ฐาน = mobile, ขยายด้วย `min-width` media query ที่ 768px และ 1024px) — `.app-shell`/`.sidebar` กลายเป็น off-canvas drawer (fixed + `transform: translateX(-100%)`, เปิดด้วย class `.drawer-open`) พร้อม `.hamburger-btn` และ `.drawer-scrim` ใหม่, กลับเป็น sidebar ซ้ายคงที่ที่ >=1024px (§3.5); `.btn-primary`/`.btn-danger` เต็มความกว้างที่ < 768px คืนเป็น auto-width ที่ >= 768px, `.btn-secondary`/`.btn-text` ไม่เปลี่ยน (§3.1); เพิ่ม `.form-grid-2col` (1 คอลัมน์ที่ < 1024px, 2 คอลัมน์ที่ >= 1024px, §3.2); `.data-table` แปลงเป็น card แนวตั้งที่ < 768px ผ่าน `data-label` attribute + `::before` (label ซ้าย : value ขวา, แถบเตือนขอบซ้ายยังอยู่, badge สถานะคงเดิม) กลับเป็นตารางปกติที่ >= 768px (§3.3); เพิ่ม `.kpi-grid` responsive (1 card/แถวที่ mobile, 2/แถวที่ tablet, หลาย card/แถวที่ desktop, §3.6); `.modal`/`.modal-actions` ปรับ padding + ปุ่มเรียงแนวตั้งที่ mobile กลับแนวนอนที่ >= 768px (§3.7)
  - `assets/nav.js` (ใหม่): JS ล้วนๆ ขั้นต่ำสุด (ไม่มี framework) มีหน้าที่เดียวคือ toggle class เปิด/ปิด drawer เมนูบน mobile/tablet — ไม่มี logic ทางธุรกิจใดๆ, ผูกกับทุกหน้าจอที่มี sidebar (40 จาก 49 ไฟล์)
  - **หน้าจอทั้ง 49 ไฟล์:** เพิ่ม `<meta name="viewport" content="width=device-width, initial-scale=1">` ทุกไฟล์ (จำเป็นสำหรับ responsive บนอุปกรณ์จริง, เดิมไม่มี); 40 ไฟล์ที่มี sidebar เพิ่ม markup hamburger button + `.topbar-left` wrapper + `.drawer-scrim` + `<script src="../assets/nav.js">`; 19 ไฟล์ที่มี `.data-table` เพิ่ม `data-label` attribute ในทุก `<td>` (คู่กับ header คอลัมน์ที่ตรงกัน) เพื่อรองรับการแปลงเป็น card บน mobile — ไม่แตะ colspan cell (เช่น แถว "ไม่มีข้อมูล" ใน trend-analysis.html) เพราะเป็น exception state ที่มีข้อความบรรยายอยู่แล้ว; ย้าย inline `.kpi-grid`/`.filter-grid` (executive/dashboard.html, executive/report-filter.html) ออกจาก inline `<style>` ไปใช้ shared class ใน components.css แทน (`.kpi-grid`, `.form-grid-2col`); ปรับ `.login-card` (4 ไฟล์ login.html) จาก `width:400px` คงที่ เป็น `width:100%; max-width:400px` พร้อม padding บน `.login-wrap` กันชนขอบจอมือถือ; ปรับ `index.html` (`.landing`/`.role-grid`) เป็น mobile-first เช่นกัน (1 คอลัมน์ที่ mobile, 2 ที่ tablet, padding ขยายตาม breakpoint)
  - **ไม่มีการเพิ่ม/ลบหน้าจอหรือฟิลด์ใดๆ** — เนื้อหา/ฟีเจอร์/ปุ่ม/ข้อความในทุกหน้าจอเหมือนเดิมทุกประการ มีแต่การจัดวาง (layout) ที่ปรับตาม breakpoint
  - เครื่องมือช่วยแก้ไขแบบ script (`_add_data_labels.py`, `_add_hamburger.py`, `_add_viewport.py`) ใช้ครั้งเดียวระหว่างการทำงานแล้วลบทิ้ง ไม่ได้เป็นส่วนหนึ่งของ prototype ที่ commit ไว้
