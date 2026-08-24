# Detailed Design (Conceptual) — แนวโน้มการเบิก-จ่ายแยกตามหน่วย/รายการยา (FT-015)

> เอกสารนี้เป็น detailed design ระดับแนวคิด (conceptual) เท่านั้น **ยังไม่ผูกมัดกับ technology stack, protocol, หรือเทคนิคการ implement ใดๆ** — ตาม CLAUDE.md เฟสปัจจุบันของโปรเจกต์คือการทำเอกสาร ยังไม่เข้าสู่เฟสพัฒนา เอกสารนี้จะถูกทบทวนอีกครั้งเมื่อเข้าสู่เฟสพัฒนาจริง
>
> อ้างอิงจาก [backlog.md](../backlog.md), [Feature List](../02-feature-list.md), [User Journey](../03-user-journey/), [Acceptance Criteria](../04-test-design/acceptance-criteria.md), [High-Level Architecture](../05-architecture.md), [Data Model](../06-data-model.md), [API Spec](../07-api-spec.md) — ดูนโยบาย granularity/exception/state-diagram ที่ใช้ร่วมกันทุกไฟล์ใน [README.md](README.md)

**วันที่สร้าง/อัปเดตล่าสุด:** 20260823
**Feature:** FT-015 — แนวโน้มการเบิก-จ่ายแยกตามหน่วย/รายการยา
**Backlog item ที่เกี่ยวข้อง:** BL-018

## 1. ภาพรวม (Overview)

ผู้บริหารดูแนวโน้มการเบิก-จ่ายยาแยกตามหน่วยและ/หรือรายการยา ตาม [executive-journey.md](../03-user-journey/executive-journey.md) step 4 — 1 BL-ID, 1 ไดอะแกรม happy path พร้อม inline `alt` สำหรับช่วงเวลาที่ยังไม่มีข้อมูล

## 2. Sequence Diagram(s)

### 2.1 BL-018 — แสดงแนวโน้มเบิก-จ่าย

**อ้างอิง:** Acceptance Criteria BL-018 Scenario 1-3

```mermaid
sequenceDiagram
    actor EXEC as ผู้บริหาร รพ./สสอ.
    participant REPORT as บริการรายงานและภาพรวมผู้บริหาร

    EXEC->>REPORT: เลือกดูแนวโน้ม (ตัวกรองหน่วย/รายการยา/ช่วงเวลา)
    alt มีข้อมูลเบิก-จ่ายในช่วงเวลาที่เลือก (happy path)
        REPORT-->>EXEC: กราฟ/ตารางแยกตามหน่วยและ/หรือรายการยาที่เลือกเท่านั้น
    else ช่วงเวลาที่เลือกยังไม่มีข้อมูล (edge)
        REPORT-->>EXEC: แสดงสถานะ "ไม่มีข้อมูล" แทนกราฟว่างที่ทำให้สับสน
    end
```

## 3. Lifecycle / State Diagram

ไม่เกี่ยวข้อง

## 4. องค์ประกอบและ Operation ที่เกี่ยวข้อง (Cross-reference)

| องค์ประกอบ/Entity/Operation | มาจากเอกสาร | บทบาทใน Feature นี้ |
|---|---|---|
| บริการรายงานและภาพรวมผู้บริหาร | 05-architecture.md §3 | สรุปแนวโน้มจาก Requisition/GoodsReceiptRecord |
| Requisition, GoodsReceiptRecord | 06-data-model.md §3.4/3.10 | แหล่งข้อมูลของแนวโน้ม |
| ดูแนวโน้มการเบิก-จ่ายแยกตามหน่วย/รายการยา | 07-api-spec.md §3.8 | operation หลักของ Feature นี้ |

## 5. สิ่งที่ยังไม่ตัดสินใจ / Assumption ที่ต้องยืนยัน

- ไม่มี open item ใหม่ — AC ของ BL-018 resolved ครบ

---

## บันทึกการอัปเดต (Changelog)

- **20260823:** สร้างไฟล์ครั้งแรก — 1 ไดอะแกรม happy path พร้อม inline `alt` สำหรับ "ไม่มีข้อมูล"
