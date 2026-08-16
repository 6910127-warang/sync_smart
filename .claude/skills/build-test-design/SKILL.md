---
name: build-test-design
description: Build or refresh the QA test-design artifacts under 01-requirements/04-test-design/ — Acceptance Criteria (acceptance-criteria.md, Given-When-Then per backlog item), Test Plan (test-plan.md, one project-level file), and Test Cases (test-cases/{feature-slug}.md, one file per Feature). Use this whenever the user asks to generate/update test cases, a test plan, or acceptance criteria, or wants to check any of them against the current backlog/feature-list/user-journey. Supports scoping to a specific BL-ID, FT-ID, Epic, or a single artifact type (e.g. "just the test plan", "test cases for FT-001", "acceptance criteria for BL-005") — otherwise covers everything.
---

# build-test-design

This skill is a thin dispatcher. All the real work — expanding backlog AC into full Given-When-Then scenarios, drafting the project Test Plan, writing step-by-step Test Cases per Feature, and auditing/fixing existing files against backlog/feature-list/journey drift — lives in the `test-design-writer` subagent (`.claude/agents/test-design-writer.md`). Your job here is just to hand off cleanly and relay the result; don't duplicate the subagent's logic or try to build the test artifacts yourself.

## Step 1: Get today's date

Run `date +%Y%m%d` (Bash) to get today's date in `YYYYMMDD` format. Don't compute or guess this — always shell out for it, since the log entry needs it to be exact.

## Step 2: Identify any scope the user gave

Check whether the user named a specific `BL-ID`, `FT-ID`, Epic number, or a single artifact ("only the test plan", "only test cases", "only acceptance criteria for BL-005"). If so, pass that scope through verbatim to the subagent. If nothing specific was named (including a bare `/build-test-design` with no args), the subagent should cover everything — say so explicitly in the prompt rather than leaving it ambiguous.

## Step 3: Delegate to the subagent

Call the Agent tool with `subagent_type: "test-design-writer"`. Run it in the **foreground** (`run_in_background: false`) — this subagent may ask the user clarifying questions interactively via `AskUserQuestion` (e.g. an ambiguous scenario, an unclear risk, a release-gating threshold), so it needs to be synchronous, not fire-and-forget.

Pass a self-contained prompt including:
- Today's date (`YYYYMMDD`)
- A pointer to read `CLAUDE.md` at the project root for full context, since the subagent starts with no memory of this conversation
- The scope from Step 2 (a specific ID/Epic/artifact, or "no scope — cover everything")
- A note that `backlog.md`, `02-feature-list.md`, and `03-user-journey/*.md` should be read fresh from disk as ground truth (they may have changed since any earlier conversation turn)

## Step 4: Relay the result

The subagent's final report will state what it did. Pass that along to the user plainly — don't re-summarize it into something vaguer. At minimum, make sure the user walks away knowing:

- Whether `01-requirements/04-test-design/acceptance-criteria.md` was created or updated, and which `BL-ID`s were touched
- Whether `01-requirements/04-test-design/test-plan.md` was created or updated
- Which files under `01-requirements/04-test-design/test-cases/` were created or updated, and which `TC-ID`s were added
- Any findings that still need the user's own decision, stated clearly, not buried
- Where the log entry landed, under `log/`

If the subagent surfaced open decisions it couldn't resolve on its own, make sure those are visible to the user rather than glossed over.
