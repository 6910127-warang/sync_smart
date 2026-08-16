---
name: check-prototype-sync
description: Check whether prototype/ screens have been hand-edited since the last check, and whether they're still consistent with the full chain — spec, backlog, Feature List, User Journey, Acceptance Criteria, Test Cases, Test Plan. Use this whenever the user asks to check/audit the prototype against requirements, asks "prototype ตรงกับ requirement ไหม", "prototype สอดคล้องกับ backlog หรือยัง", or after prototype screens have been hand-edited outside of /build-prototype. Supports scoping to a specific role, FT-ID, or screen — a full check is large, so confirm scope before running unscoped.
---

# check-prototype-sync

This skill is a thin dispatcher. All the real work — detecting which screens changed via content hashing, comparing screen content against the full chain, classifying findings, applying unambiguous fixes, and asking before ever treating a prototype change as a confirmed new requirement — lives in the `prototype-consistency-checker` subagent (`.claude/agents/prototype-consistency-checker.md`). Your job here is just to hand off cleanly and relay the result; don't duplicate the subagent's logic or try to do the comparison yourself.

**Not part of `/check-backlog-sync`:** this check runs in the opposite direction from that chain (it treats prototype edits as a signal the *upstream* chain might need to catch up, not the other way around), so it stays a separate, explicitly-invoked skill — same reasoning as `/build-prototype`.

## Step 1: Get today's date

Run `date +%Y%m%d` (Bash) to get today's date in `YYYYMMDD` format. Don't compute or guess this — always shell out for it, since the log entry needs it to be exact.

## Step 2: Identify scope, and check before a large unscoped run

Check whether the user named a specific role, `FT-ID`, or screen.

- **Scope given:** pass it through verbatim to the subagent.
- **No scope given:** a full check spans every screen under `prototype/` — before delegating, tell the user this and ask (in your own message, or let the subagent's own `AskUserQuestion` handle it — either is fine, don't ask twice) whether to check everything, check only screens changed since the last run, or start with one role/Feature. Don't silently kick off a full check without this.

## Step 3: Delegate to the subagent

Call the Agent tool with `subagent_type: "prototype-consistency-checker"`. Run it in the **foreground** (`run_in_background: false`) — this subagent will very likely ask clarifying questions via `AskUserQuestion` (whether a screen's new behavior should become a real requirement or get reverted), so it needs to be synchronous, not fire-and-forget.

Pass a self-contained prompt including:
- Today's date (`YYYYMMDD`)
- A pointer to read `CLAUDE.md` and `DESIGN.md` at the project root for full context, since the subagent starts with no memory of this conversation
- The scope from Step 2 (a specific role/FT-ID/screen, or "no scope — confirm check strategy with the user first")
- A note that `backlog.md`, `02-feature-list.md`, `03-user-journey/*.md`, `04-test-design/*` should be read fresh from disk as ground truth, and that `prototype/consistency-check-log.md` (if it exists) records what was already checked and its content hash at that time

## Step 4: Relay the result

The subagent's final report will state what it did. Pass that along to the user plainly — don't re-summarize it into something vaguer. At minimum, make sure the user walks away knowing:

- Which screens changed since the last check and were actually audited (vs. skipped as unchanged)
- What was auto-fixed, with file paths
- Any finding that still needs the user's own decision — surfaced clearly, not buried
- What to run next if the subagent recommended it (`/new-requirement` with a drafted description, and/or `/build-prototype` scoped to specific screens)
- Where the log entry landed, under `log/`
