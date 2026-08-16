---
name: new-requirement
description: Turn a raw, informal requirement description for the SmartSync project into a formal, structured requirement spec document under 01-requirements/01-spec/, with the backlog and daily log kept in sync automatically. Use this whenever the user describes a new feature, a change to existing behavior, a bug that implies a missing requirement, or anything they want formally documented as a requirement — even if they don't explicitly say "requirement" or "spec." Trigger on phrases like "เพิ่ม requirement", "อยากได้ฟีเจอร์...", "มีความต้องการเพิ่มเติม", "ช่วยเขียน spec ให้หน่อย", or any description of desired system behavior for SmartSync that hasn't been written up yet.
---

# new-requirement

This skill is a thin dispatcher. All the real work — deciding whether to create a new spec file or amend an existing one, asking clarifying questions, writing the document, updating the backlog, and logging — lives in the `requirement-writer` subagent (`.claude/agents/requirement-writer.md`). Your job here is just to hand off cleanly and relay the result; don't duplicate the subagent's logic or try to write the spec yourself.

## Step 1: Get the raw requirement

If the user already gave you the raw requirement text (in their message, or as args to this skill), use it verbatim — don't paraphrase or clean it up before handing it off; the subagent needs the original wording to judge what's ambiguous.

If nothing concrete was given (e.g. the user just said "/new-requirement" with no content), ask them directly what they want documented before proceeding. Don't guess at a requirement from context alone.

## Step 2: Get today's date

Run `date +%Y%m%d` (Bash) to get today's date in `YYYYMMDD` format. Don't compute or guess this — always shell out for it, since it has to be exact for the filename convention.

## Step 3: Delegate to the subagent

Call the Agent tool with `subagent_type: "requirement-writer"`. Run it in the **foreground** (`run_in_background: false`) — this subagent asks the user clarifying questions interactively via `AskUserQuestion`, so it needs to be synchronous, not fire-and-forget.

Pass a self-contained prompt including:
- The raw requirement text, verbatim, clearly delimited
- Today's date (`YYYYMMDD`)
- A pointer to read `CLAUDE.md` at the project root for full context, since the subagent starts with no memory of this conversation

## Step 4: Relay the result

The subagent's final report will state what it did. Pass that along to the user plainly — don't re-summarize it into something vaguer. At minimum, make sure the user walks away knowing:

- The spec file path that was created or amended, under `01-requirements/01-spec/`
- Which backlog items (`BL-XXX`) were added or changed in `01-requirements/backlog.md`
- Where the log entry landed, under `log/`
- Anything still open/unresolved that needs the user's input later

If the subagent surfaced open items it couldn't resolve on its own, make sure those are visible to the user rather than buried — they're exactly the kind of thing this whole workflow exists to catch before it gets silently assumed.
