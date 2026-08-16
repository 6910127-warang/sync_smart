---
name: check-backlog-sync
description: Check that the full requirement chain is in sync — spec files (01-requirements/01-spec/) → backlog (01-requirements/backlog.md) → Feature List (01-requirements/02-feature-list.md) → User Journey (01-requirements/03-user-journey/) — and fix what's fixable at every layer. Use this whenever the user asks to verify/audit the backlog against requirements, asks "backlog ตรงกับ spec ไหม", "backlog up to date หรือยัง", "เช็ค backlog", "ตรวจสอบ requirement กับ backlog", "เช็คทั้งหมดว่า sync กันไหม", after a batch of spec/backlog edits, or as a periodic health check. Runs both `backlog-sync-checker` and `feature-journey-builder` in sequence so a change anywhere in the chain propagates all the way down to the User Journey diagrams.
---

# check-backlog-sync

This skill is a thin dispatcher over **two** subagents run in sequence, one per layer of the chain:

1. `backlog-sync-checker` (`.claude/agents/backlog-sync-checker.md`) — reconciles spec ↔ backlog.
2. `feature-journey-builder` (`.claude/agents/feature-journey-builder.md`) — reconciles backlog ↔ Feature List ↔ User Journey.

All the real cross-checking/fixing logic lives in those two agents. Your job here is just to hand off cleanly, **in the right order**, and relay both results — don't duplicate either subagent's logic or try to do any of the cross-checking yourself. The order matters: `feature-journey-builder` reads `backlog.md` as its source of truth, so it must run **after** `backlog-sync-checker` has finished (and applied any fixes), never before or in parallel — otherwise it would audit against a stale backlog.

## Step 1: Get today's date

Run `date +%Y%m%d` (Bash) to get today's date in `YYYYMMDD` format. Don't compute or guess this — always shell out for it, since both subagents' log entries need it to be exact.

## Step 2: Delegate to `backlog-sync-checker` first

Call the Agent tool with `subagent_type: "backlog-sync-checker"`. Run it in the **foreground** (`run_in_background: false`) — this subagent may ask the user clarifying questions interactively via `AskUserQuestion` when a finding is ambiguous, so it needs to be synchronous, not fire-and-forget. **Wait for it to fully finish before starting Step 3** — its edits to `backlog.md` are exactly what Step 3 needs to audit against.

Pass a self-contained prompt including:
- Today's date (`YYYYMMDD`)
- A pointer to read `CLAUDE.md` at the project root for full context, since the subagent starts with no memory of this conversation
- Any specific spec file(s) the user mentioned focusing on, if they named one — otherwise the subagent audits all of them

## Step 3: Delegate to `feature-journey-builder` next

Call the Agent tool with `subagent_type: "feature-journey-builder"`, again in the **foreground**. Pass a self-contained prompt including:
- Today's date (`YYYYMMDD`)
- A pointer to read `CLAUDE.md` at the project root for full context
- A note that `backlog.md` may have just changed (list what `backlog-sync-checker` added/edited, if anything, from Step 2's result) and that this pass should audit `01-requirements/02-feature-list.md` and `01-requirements/03-user-journey/*.md` against the **current** on-disk state of `backlog.md` — not generate anything fresh unless a file genuinely doesn't exist yet

Run this step even if Step 2 found nothing to fix — a spec/backlog edit isn't the only way Feature List/Journey files can drift (e.g. someone could have hand-edited one directly), so this layer always gets its own independent check.

## Step 4: Relay both results

Both subagents' final reports state what they did. Pass both along to the user plainly, clearly separated by layer — don't merge them into one vague summary. At minimum, make sure the user walks away knowing, **for each layer**:

- **Spec ↔ Backlog:** how many sync issues were found and auto-fixed (with `BL-XXX` IDs), and any left needing the user's own decision
- **Backlog ↔ Feature List / User Journey:** how many drift issues were found and auto-fixed (with `FT-XXX` IDs and/or journey filenames), and any left needing the user's own decision
- Where each log entry landed, under `log/` (each subagent appends its own dated section)

If either subagent surfaced open decisions it couldn't resolve on its own, make sure those are visible to the user rather than glossed over — that's exactly what this workflow exists to catch before drift compounds silently down the chain from spec all the way to the journey diagrams.
