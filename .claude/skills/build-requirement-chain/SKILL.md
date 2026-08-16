---
name: build-requirement-chain
description: Turn one raw, informal requirement description into the full requirement chain in a single command — spec + backlog (requirement-writer), then Feature List + User Journey (feature-journey-builder), then Acceptance Criteria + Test Plan + Test Cases (test-design-writer) — running all three stages back-to-back without stopping in between. Use this whenever the user wants a new/changed requirement carried all the way through to test design in one go, instead of invoking /new-requirement, then /build-feature-journey, then /build-test-design separately. Trigger on phrases like "ทำทั้ง chain ให้เลย", "ไม่ต้องเรียกทีละขั้น", "จบในคำสั่งเดียวตั้งแต่ requirement ถึง test case".
---

# build-requirement-chain

This skill is an **orchestrator only** — it has no artifact-writing logic of its own. All the real work already lives in three existing subagents, each already responsible for one stage of the chain:

1. `requirement-writer` (`.claude/agents/requirement-writer.md`) — raw requirement → spec file (new or amended) + `01-requirements/backlog.md` rows.
2. `feature-journey-builder` (`.claude/agents/feature-journey-builder.md`) — `backlog.md` → `01-requirements/02-feature-list.md` + `01-requirements/03-user-journey/*.md`.
3. `test-design-writer` (`.claude/agents/test-design-writer.md`) — the above → `01-requirements/04-test-design/acceptance-criteria.md`, `test-plan.md`, `test-cases/*.md`.

This mirrors exactly how `/check-backlog-sync` already chains multiple subagents in one command (its own stages 2 and 3 are these same two agents) — no new subagent was created for this skill, since sequencing already-existing agents doesn't need new artifact-writing logic, only call ordering, and that's exactly what `/check-backlog-sync`'s skill layer already does. Your job here is purely to hand off cleanly, **in strict order**, and relay all three results — don't duplicate any subagent's logic or try to write spec/backlog/feature-list/journey/test-design content yourself.

**The order is mandatory and each stage must fully finish before the next starts:** stage 2 reads `backlog.md` as ground truth, which stage 1 just wrote or amended; stage 3 reads stages 1-2's output. Running them in parallel or out of order means a later stage audits against stale data.

## Step 1: Get the raw requirement

If the user already gave you the raw requirement text (in their message, or as args to this skill), use it verbatim — don't paraphrase or clean it up before handing it off; `requirement-writer` needs the original wording to judge what's ambiguous.

If nothing concrete was given (e.g. the user just typed `/build-requirement-chain` with no content), ask them directly what they want documented before proceeding. Don't guess at a requirement from context alone.

## Step 2: Get today's date

Run `date +%Y%m%d` (Bash) to get today's date in `YYYYMMDD` format. Don't compute or guess this — always shell out for it, since every stage's log entry needs it to be exact.

## Step 3: Delegate to `requirement-writer` first

Call the Agent tool with `subagent_type: "requirement-writer"`. Run it in the **foreground** (`run_in_background: false`) — this subagent asks clarifying questions interactively via `AskUserQuestion`, so it needs to be synchronous, not fire-and-forget. **Wait for it to fully finish before starting Step 4** — its edits to `backlog.md` (and the spec file) are exactly what Step 4 needs to build from.

Pass a self-contained prompt including:
- The raw requirement text, verbatim, clearly delimited
- Today's date (`YYYYMMDD`)
- A pointer to read `CLAUDE.md` at the project root for full context, since the subagent starts with no memory of this conversation

## Step 4: Delegate to `feature-journey-builder` next

Call the Agent tool with `subagent_type: "feature-journey-builder"`, again in the **foreground**. Pass a self-contained prompt including:
- Today's date (`YYYYMMDD`)
- A pointer to read `CLAUDE.md` at the project root for full context
- A summary of what `requirement-writer` just added/amended (spec file, `BL-ID`s) and a note that this pass should reflect the **current** on-disk state of `backlog.md`, not assume anything from this conversation

Run this even if the new requirement seems small — a new/changed backlog item always needs its Feature List/Journey coverage checked, never assumed fine.

## Step 5: Delegate to `test-design-writer` last

Call the Agent tool with `subagent_type: "test-design-writer"`, again in the **foreground**. Pass a self-contained prompt including:
- Today's date (`YYYYMMDD`)
- A pointer to read `CLAUDE.md` at the project root for full context
- A summary of what Steps 3-4 added/amended (`BL-ID`s, `FT-ID`s, journey files touched) and a note that this pass should audit/build `01-requirements/04-test-design/` against the **current** on-disk state of everything upstream
- No narrowed scope — cover whatever backlog items/Features this new requirement touched; let the subagent work out the exact scope from what actually changed

## Step 6: Relay all three results

All three subagents' final reports state what they did. Pass all three along to the user plainly, clearly separated by stage — don't merge them into one vague summary. At minimum, make sure the user walks away knowing:

- **Requirement → Backlog:** which spec file was created/amended (path), and which `BL-ID`s were added/changed
- **Backlog → Feature List / User Journey:** which `FT-ID`s were touched, and which journey files changed
- **→ Test Design:** which sections of `acceptance-criteria.md`/`test-plan.md`/`test-cases/*.md` changed, and which `TC-ID`s were added
- Any open question any stage couldn't resolve on its own — surfaced clearly, not buried, regardless of which stage it came from
- Where each stage's log entry landed, under `log/` (each subagent appends its own dated section)

If any stage surfaced open decisions it couldn't resolve, make sure those are visible to the user — that's exactly what running the whole chain in one command should never bury, even though it skips the manual stop-and-check-in between each skill.
