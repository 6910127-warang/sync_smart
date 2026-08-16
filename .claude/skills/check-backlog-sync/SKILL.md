---
name: check-backlog-sync
description: Check whether 01-requirements/backlog.md is up to date with all requirement spec files under 01-requirements/01-spec/, and fix it if not. Use this whenever the user asks to verify/audit the backlog against requirements, asks "backlog ตรงกับ spec ไหม", "backlog up to date หรือยัง", "เช็ค backlog", "ตรวจสอบ requirement กับ backlog", after a batch of spec edits, or as a periodic health check.
---

# check-backlog-sync

This skill is a thin dispatcher. All the real work — reading every spec file, cross-checking against the backlog, fixing what's safely fixable, and asking about the rest — lives in the `backlog-sync-checker` subagent (`.claude/agents/backlog-sync-checker.md`). Your job here is just to hand off cleanly and relay the result; don't duplicate the subagent's logic or try to do the cross-check yourself.

## Step 1: Get today's date

Run `date +%Y%m%d` (Bash) to get today's date in `YYYYMMDD` format. Don't compute or guess this — always shell out for it, since the log entry needs it to be exact.

## Step 2: Delegate to the subagent

Call the Agent tool with `subagent_type: "backlog-sync-checker"`. Run it in the **foreground** (`run_in_background: false`) — this subagent may ask the user clarifying questions interactively via `AskUserQuestion` when a finding is ambiguous, so it needs to be synchronous, not fire-and-forget.

Pass a self-contained prompt including:
- Today's date (`YYYYMMDD`)
- A pointer to read `CLAUDE.md` at the project root for full context, since the subagent starts with no memory of this conversation
- Any specific spec file(s) the user mentioned focusing on, if they named one — otherwise the subagent audits all of them

## Step 3: Relay the result

The subagent's final report will state what it did. Pass that along to the user plainly — don't re-summarize it into something vaguer. At minimum, make sure the user walks away knowing:

- How many sync issues were found and how many were auto-fixed (with `BL-XXX` IDs)
- Any issues left that need the user's own decision, stated clearly, not buried
- Where the log entry landed, under `log/`

If the subagent surfaced open decisions it couldn't resolve on its own, make sure those are visible to the user rather than glossed over — that's exactly what this workflow exists to catch before the backlog silently drifts from the specs.
