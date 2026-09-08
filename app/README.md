# SmartSync — Firebase App (เริ่มพัฒนาจริง 20260901)

โฟลเดอร์นี้คือโค้ดจริงที่เชื่อมกับ **Firebase (Cloud Firestore)** — แยกจาก `../prototype/` (static mockup ที่ยังดูแลโดย `/build-prototype` ตามเดิม) และแยกจาก `../01-requirements/` (เอกสารเชิงแนวคิด ไม่ผูกเทคโนโลยี)

ฟีเจอร์ที่ทำจริงแล้ว:
- **หน้ารายการคำขอเบิกของหน่วยฉัน** (`staff-hph/requisition-list.html`) — อ้างอิง FT-002, BL-004, BL-005
- **หน้าสร้างคำขอเบิกยาประจำเดือน** (`staff-hph/requisition-new.html`, เพิ่ม 20260901) — อ้างอิง FT-001, BL-001, BL-002
- **หน้ารออนุมัติระดับ 1** (`pharmacist/approval-queue-level1.html`, เพิ่ม 20260907) — อ้างอิง FT-002, BL-004
- **หน้าพิจารณาคำขอ/อนุมัติ-ปฏิเสธระดับ 1** (`pharmacist/approval-review-level1.html`, เพิ่ม 20260907) — อ้างอิง FT-002, BL-004, BL-036 (เฉพาะขอบเขตระดับ 1 — ระดับ 2/ส่งออก/audit-trail ยังไม่ทำ)
- **Firebase Authentication (email/password) จริง** ทั้งสอง role ข้างต้น (เพิ่ม 20260907, BL-024)
- **หน้า Login กลางจุดเดียว** (`login.html`, เพิ่ม 20260908) — login แล้ว redirect ไปหน้าแรกของ role อัตโนมัติ แทนฟอร์ม login ที่เคยฝังซ้ำอยู่ใน 4 หน้าจอข้างต้น

ทั้งหมดอ้างอิง [`../01-requirements/backlog.md`](../01-requirements/backlog.md)

## วิธีเริ่มใช้งาน

1. เปิด [`firebase-config.js`](firebase-config.js) แล้วแทนที่ค่า placeholder ด้วย config จริงจาก Firebase Console → Project settings → General → Your apps → SDK setup and configuration
2. เปิด Firestore Database ในโปรเจกต์ (โหมด Native mode) ถ้ายังไม่ได้เปิด
3. รัน local server (ดูหัวข้อ "การรันดู" ด้านล่าง) แล้วเปิด `seed.html` เพื่อสร้างข้อมูลตัวอย่างไว้ทดสอบ (ลบทิ้งได้ภายหลัง — ไม่ใช่ส่วนหนึ่งของแอปจริง)
4. ตรวจสอบว่า Firebase Console → Authentication → Sign-in method เปิดใช้งาน provider **Email/Password** แล้ว (โปรเจกต์ `syncsmart-98d1e` ปัจจุบันเปิดอยู่แล้ว — ยืนยันจากการทดสอบจริง 20260907 แต่ถ้าย้ายไปโปรเจกต์ Firebase อื่นต้องเปิดเองก่อน ไม่มีเครื่องมือทำแทนได้)
5. เปิด `login.html` แล้วเข้าสู่ระบบด้วยอีเมล/รหัสผ่านของบัญชีทดสอบที่สร้างจาก `seed.html` (เช่น `staff-hph-a@smartsync.test` หรือ `pharmacist-a@smartsync.test`) — ระบบจะ redirect ไปหน้าแรกของ role นั้นให้เองตาม `role` ใน `users/{uid}` ไม่ต้องรู้ล่วงหน้าว่าต้องเปิดหน้าไหน — ดูหัวข้อ "Firebase Authentication" ด้านล่าง

## การรันดู (local server)

config อยู่ใน `.claude/launch.json` (ชื่อ `app`, port 4174) — รันผ่าน [`.claude/no-cache-server.py`](../.claude/no-cache-server.py) (เพิ่ม 20260908) แทน `py -m http.server` ตรงๆ เพราะ `http.server` เดิมไม่ส่ง cache header ทำให้ browser แคชไฟล์ `.js`/`.html` เก่าไว้เงียบๆ (เจอปัญหาจริงตอนทดสอบ BL-024 — แก้โค้ดแล้ว refresh/hard refresh บางครั้งก็ยังเห็นพฤติกรรมเก่าค้างอยู่) wrapper นี้เพิ่มแค่ header `Cache-Control: no-store` ไม่ใช่ build tool

## Firestore Schema — collection/subcollection ที่ใช้จริงตอนนี้

Field name ฝั่ง Firestore ใช้ `camelCase` ภาษาอังกฤษ (มาตรฐาน Firestore) แปลตรงจากฟิลด์เชิงแนวคิดใน [`../01-requirements/06-data-model.md`](../01-requirements/06-data-model.md) — วงเล็บคือชื่อฟิลด์เชิงแนวคิดต้นทางเพื่อ trace กลับได้

### `units/{unitId}` — หน่วยงาน (Unit, data-model §3.1)

| Field | ชนิด | จำเป็น | หมายเหตุ |
|---|---|---|---|
| `name` (ชื่อหน่วยงาน) | string | ใช่ | |
| `type` (ประเภทหน่วยงาน) | string enum: `"hph"` \| `"main"` | ใช่ | รพ.สต. / รพ.แม่ข่าย |
| `active` (สถานะการใช้งาน) | boolean | ใช่ | ใช้กรอง dropdown |
| `code` (รหัสหน่วยงานย่อ, เพิ่ม 20260901) | string | ใช่ | เช่น `"HPH01"`, `"MAIN01"` — รูปแบบ `{prefix ตามประเภท}{เลข 2 หลัก}` (`HPH` สำหรับ รพ.สต., `MAIN` สำหรับ รพ.แม่ข่าย) รองรับได้ถึง 99 หน่วยต่อประเภท — ใช้ประกอบ "รหัสคำขอ" ที่อ่านง่าย (ดูฟิลด์ `requisitionCode` ด้านล่าง) ไม่ใช่ field เชิงแนวคิดใน `06-data-model.md` §3.1 เดิม เป็น field implementation-only ที่เพิ่มตอนทำ requisitionCode |

Document ID: ตัวระบุหน่วยงานเอง (เช่น `hph-sample-a`) — ไม่ใช้ auto-id เพื่อให้ reference อ่านง่าย

### `users/{uid}` — บัญชีผู้ใช้ (User Account, data-model §3.2)

> **ใช้จริงแล้วทั้งสอง role** (อัปเดต 20260907, BL-024) — doc id คือ Firebase Auth UID จริง อ่านโดย `lib/auth.js` (`fetchUserProfile`) ทุกครั้งที่สถานะ login เปลี่ยน เพื่อดึง `role`/`unitId`/`active` มาตัดสินใจแสดงหน้าจอ — ดูหัวข้อ "Firebase Authentication" ด้านล่าง

| Field | ชนิด | จำเป็น | หมายเหตุ |
|---|---|---|---|
| `displayName` | string | ใช่ | |
| `role` | string enum: `"staff_hph"` \| `"pharmacist"` \| `"executive"` \| `"admin"` | ใช่ | |
| `unitId` | string (ref → `units`) \| null | บังคับเฉพาะ `staff_hph` | |
| `email` | string | ใช่ | ใช้โดยบริการแจ้งเตือน |
| `active` | boolean | ใช่ | |
| `mustChangePassword` | boolean | ใช่ | default `true` ตอนสร้างบัญชี |
| `twoFactorEnabled` | boolean | ใช่ | default `true` เฉพาะ role เภสัชกร |

Document ID: Firebase Auth UID

### `drugItems/{drugItemId}` — รายการยา (Drug/Item Master, data-model §3.3)

**หน้า `requisition-new.html` query collection นี้** (`where active==true`, เรียงชื่อฝั่ง client — ไม่ใช้ `orderBy` ใน query เพื่อเลี่ยงต้องสร้าง composite index เพิ่ม)

| Field | ชนิด | จำเป็น | หมายเหตุ |
|---|---|---|---|
| `name` | string | ใช่ | placeholder เช่น "ยา A" — ห้ามใช้ชื่อยา NCD จริง |
| `active` | boolean | ใช่ | |
| `workingCode` | string (7 หลัก) | ใช่ | unique — คีย์จับคู่ไฟล์ INVC |
| `hospitalCode` | string (4-6 ตัวอักษร) \| null | ไม่บังคับ | อนุญาตว่างได้ |
| `physicianAccountCategory` | boolean | ใช่ (default false) | หมวดบัญชีแพทย์ |
| `sourceWarehouse` | string enum: `"production"` \| `"underground"` | ใช่ | ตึกผลิต / คลังใต้ดิน |

### `requisitions/{requisitionId}` — คำขอเบิกยา (Requisition, data-model §3.4)

**Collection หลักที่หน้า `requisition-list.html` query ตรงๆ**

| Field | ชนิด | จำเป็น | หมายเหตุ |
|---|---|---|---|
| `unitId` (หน่วยงานที่เบิก) | string (ref → `units`) | ใช่ | ใช้ filter `where("unitId","==",...)` |
| `createdBy` (ผู้สร้างคำขอ) | string (ref → `users`, uid) | ใช่ | uid จริงจาก Firebase Auth แล้ว (อัปเดต 20260907, BL-024) — เขียนโดย `requisition-new.html` |
| `type` (ประเภทคำขอ) | string enum: `"normal"` \| `"emergency"` | ใช่ | ปกติ (รายเดือน) / ฉุกเฉิน (นอกรอบ) |
| `period` (รอบเดือนที่เบิก) | string `"YYYY-MM"` (พ.ศ.) \| null | บังคับเฉพาะ `type="normal"` | คำขอฉุกเฉินใช้ `createdAt` แทน |
| `status` (สถานะคำขอ) | string enum: `"pending_level1"` \| `"pending_level2"` \| `"approved"` \| `"ready_to_export"` \| `"dispensed"` \| `"rejected"` | ใช่ | ดูหมายเหตุ "รับแล้ว" ด้านล่าง |
| `createdAt` (วันที่-เวลาที่สร้างคำขอ) | Firestore Timestamp | ใช่ | ใช้ `orderBy` หลักของหน้ารายการ |
| `confirmedByStaffAt` (วันที่-เวลาที่ยืนยันคำขอ) | Timestamp \| null | ไม่บังคับ | แสดงเป็นคอลัมน์ "วันที่ยื่นคำขอ" ในหน้ารายการ |
| `dispensedAt` (วันที่-เวลาที่เปลี่ยนเป็น "จ่ายแล้ว") | Timestamp \| null | ไม่บังคับ | ตั้งทันทีที่เภสัชกรระดับ 2 กดคอนเฟิร์ม |
| `recordVersion` (เวอร์ชันของบันทึก) | integer | ใช่ | เริ่ม 1, ใช้ Optimistic Concurrency Check (BL-036) — หน้ารายการยังไม่ต้องใช้ แต่หน้าอนุมัติต้องใช้ |
| `requisitionCode` (รหัสคำขอที่อ่านง่าย, เพิ่ม 20260901) | string | ใช่ | เช่น `"REQ-256908-HPH01-001"` — รูปแบบ `REQ-{ปีพ.ศ.4หลัก}{เดือน2หลัก}-{รหัสหน่วย}-{เลขรันประจำเดือนของหน่วยนั้น 3 หลัก}` สร้างครั้งเดียวตอนสร้างคำขอผ่าน [`lib/requisition-code.js`](lib/requisition-code.js) (ใช้ Firestore transaction กันเลขรันซ้ำ) — เป็น field แสดงผลเพิ่มเติม **ไม่ใช่** document ID จริง (ดูหมายเหตุด้านล่าง) และไม่ใช่ field เชิงแนวคิดใน `06-data-model.md` §3.4 เดิม |

> **หมายเหตุสถานะ "รับแล้ว":** enum `status` ของ Requisition (ตาม data-model §5) หยุดที่ `"dispensed"` — ไม่มีค่า "received" แยก เพราะการยืนยันรับยาเก็บเป็น transaction แยกใน `goodsReceiptRecords` (ไม่ overwrite สถานะคำขอ) หน้ารายการจึงเช็คว่ามี `goodsReceiptRecords` อ้างคำขอนี้หรือยัง เพื่อตัดสินใจแสดง "จ่ายแล้ว" หรือ "รับแล้ว" แทนการเพิ่ม enum ใหม่ที่ยังไม่มีใน spec

Document ID: auto-id ของ Firestore (`addDoc`) — คงเป็นตัวระบุหลักทางเทคนิค (ใช้ทำ reference จาก subcollection/collection อื่น) ส่วนรหัสที่แสดงในตาราง/เอกสารจริงคือ `requisitionCode` ด้านบน (ยืนยันรูปแบบกับผู้ใช้ 20260901)

### `counters/{unitId}_{ปีพ.ศ.4หลัก}{เดือน2หลัก}` — ตัวนับรหัสคำขอต่อหน่วยต่อเดือน (เพิ่ม 20260901, implementation-only)

> ไม่ใช่ entity เชิงแนวคิดใน `06-data-model.md` — เป็นกลไก implementation ล้วนๆ สำหรับ generate เลขรันของ `requisitionCode` แบบ atomic (กันเลขซ้ำเมื่อสร้างคำขอพร้อมกันหลายคำขอในหน่วย+เดือนเดียวกัน) ดูโค้ดที่ [`lib/requisition-code.js`](lib/requisition-code.js)

| Field | ชนิด | จำเป็น | หมายเหตุ |
|---|---|---|---|
| `count` | integer | ใช่ | เลขรันล่าสุดที่ออกไปแล้วของหน่วย+เดือนนั้น |
| `unitId` | string (ref → `units`) | ใช่ | ใช้ query ตอน seed/ล้างข้อมูลทดสอบ |
| `yearMonthBE` | string | ใช่ | เก็บซ้ำไว้เพื่อ debug อ่านง่าย (ไม่ได้ใช้ query) |

#### Subcollection: `requisitions/{requisitionId}/lineItems/{lineItemId}` — รายการยาที่เบิก (data-model §3.5)

**`requisition-new.html` เขียนข้อมูลจริงตอนสร้างคำขอ** (ยังไม่มีหน้าอ่าน/แสดงรายละเอียดคำขอจริง — ดู "ขั้นต่อไป")

| Field | ชนิด | จำเป็น | หมายเหตุ |
|---|---|---|---|
| `drugItemId` (รายการยา) | string (ref → `drugItems`) | ใช่ | |
| `suggestedQuantity` (ยอดแนะนำเบิก) | integer | ใช่ | คำนวณตอนยืนยันคำขอ = `max(safetyStockThresholds.thresholdValue - selfReportedBalance, 0)` — ถ้าหน่วย/รายการยานั้นยังไม่มี threshold ของเดือนนี้ ใช้ `0` (แสดงผล "— (ยังไม่ตั้งเกณฑ์)" ในฟอร์ม) |
| `selfReportedBalance` (ยอดคงเหลือปัจจุบันที่แจ้งเอง) | integer | ใช่ | เก็บไว้ไม่ถูกเขียนทับแม้กระทบยอดภายหลัง |
| `pharmacistConfirmedBalance` (ยอดคงเหลือที่เภสัชกรยืนยัน/แก้ไข) | integer \| null | ไม่บังคับ | มีค่า = ยอดที่ถูกต้อง/มีผลผูกพันแทนยอดเดิม (FR-1.9b) — เขียนจริงแล้วโดย `pharmacist/approval-review-level1.html` (เพิ่ม 20260907) แต่เป็นช่องกรอก **manual/สมัครใจ** เท่านั้น ไม่มี auto-detect ยอดไม่ตรงกัน (BL-032 เต็มรูปแบบต้องรอ `inventoryBalances`/Epic 2) |
| `approvedQuantity` (ยอดที่อนุมัติจริง) | integer \| null | ไม่บังคับ | ว่างจนผ่านอนุมัติระดับ 1 — `requisition-new.html` เขียนเป็น `null` เสมอตอนสร้าง, เขียนค่าจริงโดย `pharmacist/approval-review-level1.html` (เพิ่ม 20260907) |

#### Subcollection: `requisitions/{requisitionId}/approvalRecords/{approvalRecordId}` — บันทึกการอนุมัติ (data-model §3.6)

> ใช้จริงแล้ว (เพิ่ม 20260907) โดย `pharmacist/approval-review-level1.html` — เขียนเฉพาะ `decision: "approved"` (level 1) และ `"rejected"` เท่านั้นในรอบนี้ ยังไม่มี `"adjusted"` และยังไม่มี record ของ level 2 (รอทำหน้าอนุมัติระดับ 2)

| Field | ชนิด | จำเป็น | หมายเหตุ |
|---|---|---|---|
| `level` (ระดับการอนุมัติ) | integer: `1` \| `2` | ใช่ | |
| `approverId` (ผู้อนุมัติ) | string (ref → `users`, uid) | ใช่ | ต้องไม่ใช่ uid เดียวกับระดับอื่นของคำขอเดียวกัน — บังคับที่ชั้น business logic ตอนเขียนจริง ไม่ใช่ Firestore rule เพียงอย่างเดียว |
| `decision` (ผลการพิจารณา) | string enum: `"approved"` \| `"rejected"` \| `"adjusted"` | ใช่ | |
| `reason` (เหตุผล) | string \| null | บังคับเฉพาะ `rejected`/`adjusted` | |
| `decidedAt` (วันที่-เวลาที่พิจารณา) | Timestamp | ใช่ | |

### `safetyStockThresholds/{thresholdId}` — เกณฑ์ Safety Stock (data-model §3.8, เพิ่ม 20260901)

**หน้า `requisition-new.html` query collection นี้** (`where unitId==...` — กรอง `referenceMonth` ตรงกับเดือนปัจจุบันฝั่ง client แทนการเพิ่ม equality filter ที่สองใน query) เพื่อคำนวณ "ยอดแนะนำเบิก" — **ยังไม่มีหน้าจอเขียนข้อมูลนี้จริง** (Epic 2 พยากรณ์สต็อก/BL-010/BL-011 ยังไม่ implement) ตอนนี้มีเฉพาะข้อมูลตัวอย่างจาก `seed.html`

| Field | ชนิด | จำเป็น | หมายเหตุ |
|---|---|---|---|
| `unitId` (หน่วยงาน) | string (ref → `units`) | ใช่ | |
| `drugItemId` (รายการยา) | string (ref → `drugItems`) | ใช่ | |
| `referenceMonth` (เดือนอ้างอิง) | string `"YYYY-MM"` (พ.ศ.) | ใช่ | เก็บเป็น string รูปแบบเดียวกับ `requisitions.period` (data-model ระบุเป็น "Date เดือน-ปี" เชิงแนวคิด) |
| `thresholdValue` (ค่าเกณฑ์ Safety Stock) | integer | ใช่ | |
| `calculationSource` (ที่มาของค่า) | string enum: `"คำนวณเริ่มต้น (Year-over-year)"` \| `"ปรับปรุงต่อเนื่องอัตโนมัติ"` | ใช่ | ข้อมูลตัวอย่างจาก `seed.html` ใช้ค่าแรกเสมอ |
| `latestActualUsage` (ยอดใช้จริงล่าสุด) | integer \| null | ไม่บังคับ | ยังไม่มีการเขียนจริง (ต้องรอ BL-012) |
| `lastCalculatedAt` (วันที่คำนวณล่าสุด) | Timestamp | ใช่ | ยังไม่ได้เขียนใน seed script รอบนี้ — ต้องเพิ่มเมื่อ Epic 2 ทำจริง |

Document ID: `{unitId}_{drugItemId}_{referenceMonth}` (deterministic — เขียนทับได้ปลอดภัยเมื่อ re-seed)

### `goodsReceiptRecords/{receiptId}` — รายการรับยา (Goods Receipt Record, data-model §3.10)

**หน้ารายการ query collection นี้เพื่อตัดสินใจแสดง "รับแล้ว"**

| Field | ชนิด | จำเป็น | หมายเหตุ |
|---|---|---|---|
| `requisitionId` (คำขอเบิกยาที่อ้างอิง) | string (ref → `requisitions`) | ใช่ | ต้องเป็นคำขอสถานะ `"dispensed"` เท่านั้น |
| `drugItemId` (รายการยา) | string (ref → `drugItems`) | ใช่ | |
| `receivingUnitId` (หน่วยงานผู้รับ) | string (ref → `units`) | ใช่ | |
| `receivedQuantity` (จำนวนที่รับจริง) | integer | ใช่ | |
| `confirmedBy` (ผู้ยืนยันรับ) | string (ref → `users`, uid) | ใช่ | |
| `confirmedAt` (วันที่-เวลาที่ยืนยันรับ) | Timestamp | ใช่ | |

## Collection อื่นที่ยังไม่ต้องสร้าง (สำรอง — ใช้ตอนทำหน้าจอถัดไป)

อ้างอิงจาก `06-data-model.md` §3.7, §3.9, §3.12–§3.19 (`manualForecastAdjustments`, `historicalUsageRecords`, `inventoryBalances`, `notificationEvents`, `exportFiles`, `businessAuditLog`, `systemAccessLog`, `printableRequisitionDocuments`) — ยังไม่สร้างในรอบนี้เพราะยังไม่มีหน้าจอที่ต้องใช้ ให้ออกแบบ field ตอนถึงหน้าจอที่ต้องใช้จริง (คงรูปแบบ camelCase + trace กลับ field เชิงแนวคิดเดียวกับหัวข้อบนนี้)

## Firebase Authentication (BL-024, เพิ่ม 20260907; login กลาง + แก้บั๊ก cross-tab เพิ่ม 20260908)

เข้าสู่ระบบด้วย **email/password จริง** ผ่าน Firebase Authentication แทนกลไกล็อก session ชั่วคราวผ่าน `localStorage` เดิมทั้งสองแบบแล้ว (`lib/session.js` ของ staff-hph และ `lib/pharmacist-session.js`/`lib/pharmacists.js` ของเภสัชกร — **ลบทั้งสามไฟล์ทิ้งแล้ว**)

- **`login.html`** (เพิ่ม 20260908) — จุดเข้า login เดียวสำหรับทั้งสอง role แทนฟอร์ม login ที่เคยฝังซ้ำอยู่ใน 4 หน้าจอ กรอกอีเมล/รหัสผ่านแล้ว redirect ไปหน้าแรกของ role นั้นอัตโนมัติ (`ROLE_HOME` map ในไฟล์นี้) ตาม `role` ที่อ่านจาก `users/{uid}` — ถ้า login สำเร็จแต่ role ยังไม่มีหน้าจอรองรับ หรือ staff_hph ที่ไม่มี `unitId` จะค้างอยู่หน้านี้พร้อมข้อความ + ปุ่ม "ออกจากระบบ" แทนการ redirect ไปที่ที่ไม่มีอยู่จริง
- **`lib/auth.js`** — ไฟล์เดียวที่ทั้งสอง role ใช้ร่วมกัน:
  - `getAuthForApp(app)`, `signIn(auth, email, password)`, `signOutUser(auth)` — ห่อ Firebase Auth SDK ตรงๆ
  - `fetchUserProfile(db, uid)` — อ่าน `users/{uid}`, คืน `null` ถ้าไม่พบ doc หรือ `active !== true`
  - `watchAuth(auth, db, expectedRole, callbacks)` — ห่อ `onAuthStateChanged` ให้เรียก `onSignedIn(profile)`/`onSignedOut(message?)`/`onWrongRole(profile)` อัตโนมัติทุกครั้งที่สถานะ login เปลี่ยน (รวมถึงตอนโหลดหน้าครั้งแรกและตอน login/logout จากแท็บอื่น — Firebase sync สถานะข้ามแท็บให้เองอยู่แล้ว ไม่ต้องฟัง `storage` event เพิ่มเหมือนกลไกเดิม)
  - `authErrorMessage(err)` — แปล error code ของ Firebase Auth เป็นข้อความไทย
- **สำคัญ — ไม่ sign out อัตโนมัติเมื่อ role ไม่ตรง (แก้บั๊ก 20260908):** ตอนแรก `watchAuth` เรียก `signOutUser()` ทันทีที่เจอ role ไม่ตรง แต่ Firebase Auth ใช้ persistence เดียวกันข้ามทุกแท็บของ origin เดียวกัน — ถ้าเปิดหน้า staff-hph ค้างไว้อีกแท็บระหว่างที่ login หน้าเภสัชกรถูกต้องอยู่แล้วในอีกแท็บ การ sign out อัตโนมัติในแท็บที่ role ไม่ตรงจะไปเตะแท็บที่ login ถูกต้องอยู่แล้วให้หลุดไปด้วย (วนกลับมาหน้า login ไม่จบ) ตอนนี้แก้แล้วโดยไม่ sign out อัตโนมัติ — แค่เรียก `onWrongRole`/`onSignedOut` ให้หน้าจอ redirect ไป `login.html` เฉยๆ ผู้ใช้ต้องกด "ออกจากระบบ" เองถ้าต้องการเปลี่ยนบัญชี (ปุ่มนี้โชว์เสมอเมื่อมี `auth.currentUser`)
- แต่ละหน้าจอ (`requisition-list.html`, `requisition-new.html`, `approval-queue-level1.html`, `approval-review-level1.html`) เรียก `watchAuth(auth, db, "staff_hph" | "pharmacist", {...})` เพื่อ **guard** เท่านั้น (ไม่มีฟอร์ม login ฝังอยู่แล้ว) — ถ้าไม่ login/role ไม่ตรง/ไม่มี `unitId` จะ `location.replace("../login.html")` กลับไปที่จุดเดียว
- `requisition-list.html`/`requisition-new.html`: "หน่วยของฉัน" มาจาก `profile.unitId` เสมอ (ไม่มีการเลือกหน่วยเองอีกต่อไป — เจ้าหน้าที่ รพ.สต. สังกัด 1 หน่วยเท่านั้น ตาม [ACL.md](../ACL.md))
- `approval-queue-level1.html`/`approval-review-level1.html`: ตัวตนเภสัชกรมาจาก `profile.uid`/`profile.displayName` ตรงๆ — ใช้แยกแยะรายบุคคลจริงสำหรับกฎ "ห้ามอนุมัติซ้ำทั้ง 2 ระดับ" (BL-004)
- `lib/units.js` (`fetchActiveUnits`) ยังใช้อยู่ — แต่เฉพาะแสดงชื่อหน่วยในตาราง (เช่น คอลัมน์ "หน่วย รพ.สต." ของ `approval-queue-level1.html`) ไม่ใช้ทำ dropdown login แล้ว
- **สร้างบัญชีทดสอบผ่าน `seed.html`** (dev only) — ดูหัวข้อ "วิธีเริ่มใช้งาน" ด้านบน ยังไม่มีหน้าจอ admin สร้างบัญชีจริง (`mustChangePassword`/`twoFactorEnabled` เป็นแค่ field ที่เก็บไว้ ยังไม่มี logic บังคับใช้งานจริงในรอบนี้)

## Firestore Composite Index ที่ต้องสร้าง (ครั้งเดียว)

Query ของหน้า `requisition-list.html` รวม equality filter กับ `orderBy` บนคนละฟิลด์ ซึ่ง Firestore ไม่สร้าง index ให้อัตโนมัติ ต้องกดสร้างเองครั้งเดียวต่อโปรเจกต์ (ลิงก์ด้านล่างสร้างจาก error จริงของโปรเจกต์ `syncsmart-98d1e` — ถ้าย้ายไปโปรเจกต์อื่นต้องสร้างใหม่ หรือกดลิงก์ที่ error message แจ้งตอนรันจริง):

1. **`units`**: `active` (equality) + `name` (order) — [สร้าง index นี้](https://console.firebase.google.com/v1/r/project/syncsmart-98d1e/firestore/indexes?create_composite=Ck1wcm9qZWN0cy9zeW5jc21hcnQtOThkMWUvZGF0YWJhc2VzLyhkZWZhdWx0KS9jb2xsZWN0aW9uR3JvdXBzL3VuaXRzL2luZGV4ZXMvXxABGgoKBmFjdGl2ZRABGggKBG5hbWUQARoMCghfX25hbWVfXxAB)
2. **`requisitions`**: `unitId` (equality) + `createdAt` (order, descending) — [สร้าง index นี้](https://console.firebase.google.com/v1/r/project/syncsmart-98d1e/firestore/indexes?create_composite=ClRwcm9qZWN0cy9zeW5jc21hcnQtOThkMWUvZGF0YWJhc2VzLyhkZWZhdWx0KS9jb2xsZWN0aW9uR3JvdXBzL3JlcXVpc2l0aW9ucy9pbmRleGVzL18QARoKCgZ1bml0SWQQARoNCgljcmVhdGVkQXQQAhoMCghfX25hbWVfXxAC)

หลังกดแต่ละลิงก์ Firebase Console จะเปิดหน้า "Add index" ให้ตรงตามที่ query ต้องการอยู่แล้ว แค่กด "Create" แล้วรอสถานะเปลี่ยนเป็น "Enabled" (ปกติไม่กี่นาที) ก่อนกลับมารีเฟรชหน้า `requisition-list.html`

**หมายเหตุ (เพิ่ม 20260907):** หน้า `pharmacist/approval-queue-level1.html` query `requisitions` ด้วย `where status=="pending_level1"` **โดยตั้งใจไม่ใส่ `orderBy`** แล้วเรียง `createdAt` ฝั่ง client แทน (เหมือน pattern ของ `drugItems`/`units`) เพื่อเลี่ยงต้องสร้าง composite index ที่ 3 — อย่าเผลอเพิ่ม `orderBy` เข้าไปตรงๆ เพราะจะทำให้ query พังจนกว่าจะสร้าง index ใหม่

## ความปลอดภัย (สำคัญ — Security Rules ยังไม่ deploy)

**Firestore Security Rules ฉบับร่างอยู่ที่ [`../firestore.rules`](../firestore.rules) แล้ว แต่ยังไม่ได้ deploy** — ตอนนี้มีกฎเดียว (`allow read, write: if request.auth != null;`) คือบังคับแค่ "ต้อง login แล้ว" เท่านั้น ยังไม่ได้กรองตาม `unitId`/`role` — ก่อนใช้กับข้อมูลจริง/หน่วยงานจริงต้องขยายเป็นอย่างน้อย:
- อ่าน/เขียน `requisitions` เฉพาะผู้ใช้ที่ login แล้วและ `unitId` ตรงกับหน่วยของตนเอง (ตาม RBAC)
- ห้ามเขียนตรงจาก client ทับ field ที่ควรถูกกำหนดจาก server-side logic เท่านั้น (เช่น `status`, `recordVersion`, `approvalRecords`)
- ห้ามเภสัชกรคนเดียวกันอนุมัติทั้ง 2 ระดับของคำขอเดียวกัน (BL-004) — ปัจจุบันบังคับแค่ฝั่ง client (`approval-review-level1.html`) เท่านั้น ยังไม่มี Security Rule คุ้มกัน

**อย่า deploy ให้หน่วยงานจริงใช้ก่อนขยาย Security Rules ตามข้างต้น** — ตอนนี้ยังเป็น local prototype-to-real ขั้นทดสอบเท่านั้น (แม้ Firebase Authentication จะเป็นของจริงแล้วก็ตาม — ดูหัวข้อด้านบน)

## ขั้นต่อไป (ยังไม่ทำในรอบนี้ — รอคำสั่งเจาะจง)

1. ขยาย Firestore Security Rules ให้กรองตาม `role`/`unitId` จริง ตามหัวข้อ "ความปลอดภัย" (ตอนนี้มีแค่กฎ "ต้อง login" ใน `../firestore.rules`) แล้ว deploy
2. ทำหน้ารายละเอียดคำขอ (`requisition-detail.html`) เชื่อม `lineItems` subcollection จริง แทนลิงก์ที่ปิดใช้งานไว้ใน `requisition-list.html`
3. ทำหน้าอนุมัติระดับ 2 (BL-004 — ระดับ 1 เสร็จแล้ว 20260907 ที่ `pharmacist/approval-review-level1.html`) ต้องเพิ่มการเช็ค `approvalRecords where level==1` เทียบ `approverId` กับ uid ของเภสัชกรระดับ 2 ที่ login อยู่ (กฎห้ามคนเดียวกันอนุมัติซ้ำ) และทำหน้าส่งออก Excel + แจ้งเตือนอีเมล/LINE OA (BL-020) ต่อจากนั้น
4. ทำ Epic 2 (พยากรณ์สต็อก, BL-010/011/012) เพื่อให้ `safetyStockThresholds` มีค่าจริงแทนข้อมูลตัวอย่างจาก `seed.html` — เมื่อทำแล้วจึงค่อยเพิ่ม auto-discrepancy warning เต็มรูปแบบ (BL-032) และช่องกรอกจำนวนคาดการณ์เคสใหม่ (BL-015, FT-013) ในหน้าอนุมัติระดับ 1 ที่ตอนนี้ตัดออกไปก่อน
5. ทำหน้าสร้างคำขอเบิกฉุกเฉิน (BL-009, นอกรอบเดือน) — แยกจาก `requisition-new.html` ที่ทำเฉพาะคำขอปกติ
6. ทำปุ่ม "ขอปรึกษา" จริง (BL-003) — ต้องรอ BL-014 (ช่องทางแจ้งเตือน LINE OA)
7. ทำหน้า audit-trail และเขียน `businessAuditLog` จริง (BL-008) — ยังไม่มีหน้าจอใช้งานจึงยังไม่สร้าง collection นี้
8. ทำหน้า admin สร้าง/จัดการบัญชีผู้ใช้จริง แทน `seed.html` (dev only) — รวมถึงบังคับใช้งานจริงของ `mustChangePassword`/`twoFactorEnabled`
