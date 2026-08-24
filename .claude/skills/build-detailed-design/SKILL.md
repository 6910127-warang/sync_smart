---
name: build-detailed-design
description: Build or refresh the conceptual Detailed Design artifacts under 01-requirements/08-detailed-design/ — one file per Feature (08-detailed-design/{feature-slug}.md) with sequence diagrams (at minimum) per key scenario, plus an index registry (08-detailed-design/README.md) — deliberately not tied to any technology stack or protocol. Use this whenever the user asks to create/update/refresh the detailed design, wants a sequence diagram or interaction flow for a feature/scenario, or wants to check that the detailed design is still in sync with the backlog/feature-list/user-journey/architecture/data-model/API-spec/test-design. Supports scoping to a specific FT-ID, BL-ID, or Epic — a full build across every Feature is large, so confirm scope before running unscoped.
---

# build-detailed-design

This skill is a thin dispatcher. All the real work — drawing sequence diagrams per scenario, adding lifecycle/state diagrams where warranted, cross-referencing components/entities/operations from the architecture/data-model/API-spec docs, and staying strictly technology-agnostic — lives in the `detailed-design-writer` subagent (`.claude/agents/detailed-design-writer.md`). Your job here is just to hand off cleanly and relay the result; don't duplicate the subagent's logic or try to draw the diagrams yourself.

## Step 1: Get today's date

Run `date +%Y%m%d` (Bash) to get today's date in `YYYYMMDD` format. Don't compute or guess this — the log entry needs it to be exact.

## Step 2: Identify any scope the user gave

Check whether the user named a specific `FT-ID`, `BL-ID`, or Epic number. If so, pass that scope through verbatim to the subagent. If nothing specific was named (including a bare `/build-detailed-design` with no args), say so explicitly in the prompt — the subagent will confirm a build strategy with the user before committing to a full unscoped build, since a full build across every Feature (up to ~25) is large.

## Step 3: Delegate to the subagent

Call the Agent tool with `subagent_type: "detailed-design-writer"`. Run it in the **foreground** (`run_in_background: false`) — this subagent will very likely ask the user clarifying questions interactively via `AskUserQuestion` (e.g. scenario coverage granularity, how to represent participants when the architecture doc is thin or missing, whether to include lifecycle/state diagrams, how to represent exception paths, and — if unscoped — which build strategy to start with), so it needs to be synchronous, not fire-and-forget.

Pass a self-contained prompt including:
- Today's date (`YYYYMMDD`)
- A pointer to read `CLAUDE.md` at the project root for full context, since the subagent starts with no memory of this conversation
- The scope from Step 2 (a specific `FT-ID`/`BL-ID`/Epic, or "no scope — confirm a build strategy with the user first")
- A note that `backlog.md`, `02-feature-list.md`, `03-user-journey/*.md`, and `04-test-design/acceptance-criteria.md` should be read fresh from disk as ground truth (they may have changed since any earlier conversation turn), and that `05-architecture.md`/`06-data-model.md`/`07-api-spec.md` may or may not exist yet — the subagent should adapt (it has its own fallback rule for that)
- A reminder that this artifact must stay conceptual and technology-agnostic (no protocol, product, or implementation technique in any diagram or narrative) — if the user's own request named a specific technology, flag that back rather than passing it through silently, since stack decisions require an explicit "เข้าสู่เฟสพัฒนา" signal per `CLAUDE.md`
- A reminder never to invent clinical/policy detail (e.g. alert thresholds, approval rules not already written down) — those need the user's (เภสัชกร) confirmation

## Step 4: Relay the result

The subagent's final report will state what it did. Pass that along to the user plainly — don't re-summarize it into something vaguer. At minimum, make sure the user walks away knowing:

- Which Feature(s) were covered, and whether each `01-requirements/08-detailed-design/{feature-slug}.md` was created or updated
- Whether `01-requirements/08-detailed-design/README.md` was updated to match
- Any design decisions the subagent asked about and how they were answered (scenario granularity, participant representation, lifecycle diagrams, exception-path style, etc.)
- Any findings that still need the user's own decision, stated clearly, not buried
- Where the log entry landed, under `log/`

If the subagent surfaced open decisions it couldn't resolve on its own, make sure those are visible to the user rather than glossed over.
