# Test Cases — FT-032 ขอบเขต Scalability เฉพาะขนาดเครือข่ายปัจจุบัน

> อ้างอิงจาก [Feature List](../../02-feature-list.md), [Acceptance Criteria](../acceptance-criteria.md)
>
> หมายเหตุ: ข้อมูลทดสอบเป็น placeholder ทั่วไป ไม่ใช่ข้อมูลยา NCD จริง — ดู [test-plan.md](../test-plan.md) §4 — เชื่อมโยงกับการทดสอบ Performance ของ FT-004 (BL-007) และ Availability ของ FT-025 (BL-033)

| Test ID | Test Case Name | Pre-condition | Test Steps | Expected Result | Test Data | อ้างอิง |
|---|---|---|---|---|---|---|
| TC-129 | รองรับขนาดเครือข่ายปัจจุบันได้ตาม NFR อื่นที่เกี่ยวข้อง | สภาพแวดล้อมทดสอบจำลองขนาดเครือข่ายปัจจุบัน (29 รพ.สต. + 1 รพ.แม่ข่าย, ผู้ใช้งานพร้อมกันไม่เกินหลักสิบราย) | 1. จำลองผู้ใช้งานพร้อมกันตามขนาดเครือข่ายปัจจุบัน (load test) <br> 2. บันทึก/ดูยอดคงคลังพร้อมกันหลายหน่วย | ระบบทำงานได้ตาม NFR Performance (ยอดคงคลังอัปเดตภายใน 5 วินาที) และ NFR Availability ที่กำหนดไว้ครบถ้วน | บัญชีทดสอบครบ 30 หน่วยจำลอง | BL-041, AC Scenario 1, NFR Scalability |
| TC-130 | ไม่ต้องรองรับการขยายเครือข่ายในอนาคต | วางแผนการทดสอบ performance/load | 1. ตรวจสอบขอบเขตแผนการทดสอบ load ที่ใช้อยู่ | แผนการทดสอบไม่ครอบคลุมสถานการณ์ที่เกินขนาดเครือข่ายปัจจุบัน (เช่น ขยายไปยังอำเภอ/พื้นที่อื่น) — ไม่ถือเป็นข้อบกพร่องหากระบบไม่รองรับโหลดที่เกินขอบเขตนี้ | แผนทดสอบ load ปัจจุบัน | BL-041, AC Scenario 2 (scope-confirmation), NFR Scalability |

---

## บันทึกการอัปเดต (Changelog)

- **20260824 (test-design-writer, audit เต็มรูปแบบตามคำขอ `/check-backlog-sync`, หลังเพิ่ม BL-041/FT-032):** สร้าง Test Case ของ FT-032 ครั้งแรก — 2 test case (TC-129–TC-130) ครอบคลุมทั้ง 2 scenario ของ BL-041 ใน [acceptance-criteria.md](../acceptance-criteria.md) — TC-ID ต่อเนื่องจาก TC-128 (browser-compatibility.md)
