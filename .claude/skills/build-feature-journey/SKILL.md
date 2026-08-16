---
name: build-feature-journey
description: Build or refresh the Feature List (01-requirements/02-feature-list.md) and per-role User Journey diagrams (01-requirements/03-user-journey/) from the current backlog and specs. Use this whenever the user asks to generate/create a feature list, wants a MoSCoW-prioritized feature summary, asks for user journey diagrams/mapping, or wants to check that either is still in sync with the backlog after spec/backlog changes.
---

# build-feature-journey

This skill is a thin dispatcher. All the real work — grouping backlog items into Features, rolling up MoSCoW priority, deriving actors from spec 001, drawing the Mermaid journeys, and auditing/fixing existing files against backlog drift — lives in the `feature-journey-builder` subagent (`.claude/agents/feature-journey-builder.md`). Your job here is just to hand off cleanly and relay the result; don't duplicate the subagent's logic or try to build the feature list/journeys yourself.

## Step 1: Get today's date

Run `date +%Y%m%d` (Bash) to get today's date in `YYYYMMDD` format. Don't compute or guess this — always shell out for it, since the log entry needs it to be exact.

## Step 2: Delegate to the subagent

Call the Agent tool with `subagent_type: "feature-journey-builder"`. Run it in the **foreground** (`run_in_background: false`) — this subagent may ask the user clarifying questions interactively via `AskUserQuestion` (e.g. an ambiguous feature grouping, a priority conflict, a journey gap), so it needs to be synchronous, not fire-and-forget.

Pass a self-contained prompt including:
- Today's date (`YYYYMMDD`)
- A pointer to read `CLAUDE.md` at the project root for full context, since the subagent starts with no memory of this conversation
- Whether the user asked for just the Feature List, just the User Journeys, or both (default: both, since they're kept in sync together) — and any specific role/Epic they mentioned focusing on, if named

## Step 3: Relay the result

The subagent's final report will state what it did. Pass that along to the user plainly — don't re-summarize it into something vaguer. At minimum, make sure the user walks away knowing:

- Whether `01-requirements/02-feature-list.md` was created or updated, and which `FT-ID`s were touched
- Which files under `01-requirements/03-user-journey/` were created or updated
- Any findings that still need the user's own decision, stated clearly, not buried
- Where the log entry landed, under `log/`

If the subagent surfaced open decisions it couldn't resolve on its own, make sure those are visible to the user rather than glossed over.
