---
name: build-architecture
description: Build or refresh the High-Level Architecture document (01-requirements/05-architecture.md) — a conceptual system-context view, logical building blocks, per-role data-flow diagrams, external-integration boundaries, and NFR-driven cross-cutting concerns, deliberately not tied to any technology stack. Use this whenever the user asks to create/update/refresh the high-level architecture, wants a system context or data-flow diagram, or wants to check that the architecture doc is still in sync with the backlog/feature-list/user-journey/specs.
---

# build-architecture

This skill is a thin dispatcher. All the real work — drawing the system-context diagram, grouping logical components, building per-role data-flow diagrams from the User Journeys, tracking external-integration boundaries, and staying strictly technology-agnostic — lives in the `architecture-writer` subagent (`.claude/agents/architecture-writer.md`). Your job here is just to hand off cleanly and relay the result; don't duplicate the subagent's logic or try to draw the architecture yourself.

## Step 1: Get today's date

Run `date +%Y%m%d` (Bash) to get today's date in `YYYYMMDD` format. Don't compute or guess this — the log entry needs it to be exact.

## Step 2: Delegate to the subagent

Call the Agent tool with `subagent_type: "architecture-writer"`. Run it in the **foreground** (`run_in_background: false`) — this subagent will very likely ask the user clarifying questions interactively via `AskUserQuestion` (e.g. conceptual granularity of the logical components, whether to include a deployment view, how to represent the RBAC boundary), so it needs to be synchronous, not fire-and-forget.

Pass a self-contained prompt including:
- Today's date (`YYYYMMDD`)
- A pointer to read `CLAUDE.md` at the project root for full context, since the subagent starts with no memory of this conversation
- Whether the user asked for the full document or named a specific section/concern to focus on (e.g. "just the data-flow diagrams", "just the external-integration section") — default: the whole document
- A reminder that this document must stay conceptual and technology-agnostic — if the user's own request named a specific technology/stack, flag that back rather than passing it through silently, since stack decisions require an explicit "เข้าสู่เฟสพัฒนา" signal per `CLAUDE.md`

## Step 3: Relay the result

The subagent's final report will state what it did. Pass that along to the user plainly — don't re-summarize it into something vaguer. At minimum, make sure the user walks away knowing:

- Whether `01-requirements/05-architecture.md` was created or updated, and which sections changed
- Any architectural decisions the subagent asked about and how they were answered (granularity, deployment view, RBAC representation, etc.)
- Any findings that still need the user's own decision, stated clearly, not buried
- Where the log entry landed, under `log/`

If the subagent surfaced open decisions it couldn't resolve on its own, make sure those are visible to the user rather than glossed over.
