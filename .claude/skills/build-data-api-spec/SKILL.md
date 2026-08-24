---
name: build-data-api-spec
description: Build or refresh the conceptual Data Model / Database Schema document (01-requirements/06-data-model.md — ER Diagram plus per-table field detail) and the conceptual API Spec document (01-requirements/07-api-spec.md — operations grouped by resource or by journey), deliberately not tied to any database engine, API style, or auth mechanism. Use this whenever the user asks to create/update/refresh the data model, database schema, ER diagram, table design, or API spec, or wants to check that either is still in sync with the backlog/feature-list/user-journey/architecture/specs.
---

# build-data-api-spec

This skill is a thin dispatcher. All the real work — drawing the ER diagram, detailing per-table fields, choosing an operation-organizing principle, cross-referencing operations to entities, and staying strictly technology-agnostic — lives in the `data-api-designer` subagent (`.claude/agents/data-api-designer.md`). Your job here is just to hand off cleanly and relay the result; don't duplicate the subagent's logic or try to design the schema/API yourself.

## Step 1: Get today's date

Run `date +%Y%m%d` (Bash) to get today's date in `YYYYMMDD` format. Don't compute or guess this — the log entry needs it to be exact.

## Step 2: Delegate to the subagent

Call the Agent tool with `subagent_type: "data-api-designer"`. Run it in the **foreground** (`run_in_background: false`) — this subagent will very likely ask the user clarifying questions interactively via `AskUserQuestion` (e.g. table granularity, reference-data modeling, entity/field naming convention, how to organize API operations, where RBAC gets documented), so it needs to be synchronous, not fire-and-forget.

Pass a self-contained prompt including:
- Today's date (`YYYYMMDD`)
- A pointer to read `CLAUDE.md` at the project root for full context, since the subagent starts with no memory of this conversation
- Whether the user asked for both documents or named just one (e.g. "just the ER diagram / data model", "just the API spec") — default: both, data model first since the API spec references it
- Whether the user named a specific scope (a BL-ID, FT-ID, or Epic) rather than the full chain — default: the whole chain
- A reminder that both documents must stay conceptual and technology-agnostic (no database engine, SQL type, API protocol/style, or auth mechanism) — if the user's own request named a specific technology, flag that back rather than passing it through silently, since stack decisions require an explicit "เข้าสู่เฟสพัฒนา" signal per `CLAUDE.md`
- A reminder never to invent clinical/policy field shapes (e.g. drug-master attributes, safety-stock formula inputs) — those need the user's (เภสัชกร) confirmation

## Step 3: Relay the result

The subagent's final report will state what it did. Pass that along to the user plainly — don't re-summarize it into something vaguer. At minimum, make sure the user walks away knowing:

- Whether `01-requirements/06-data-model.md` and `01-requirements/07-api-spec.md` were created or updated, and which sections changed
- Any design decisions the subagent asked about and how they were answered (table granularity, naming convention, API organizing principle, RBAC placement, etc.)
- Any findings that still need the user's own decision, stated clearly, not buried
- Where the log entry landed, under `log/`

If the subagent surfaced open decisions it couldn't resolve on its own, make sure those are visible to the user rather than glossed over.
