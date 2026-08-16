---
name: build-prototype
description: Build or refresh the clickable static HTML/CSS prototype under prototype/ at the project root, styled per DESIGN.md's design tokens/components and derived from the Feature List, Backlog, Acceptance Criteria, and User Journey files. Use this whenever the user asks to build/create/update the prototype, wants clickable screens/mockups for a role or Feature, or wants to see what a specific flow would look like. Supports scoping to a specific role, FT-ID, or journey step — a full build across all roles/Features is large, so confirm scope before running unscoped.
---

# build-prototype

This skill is a thin dispatcher. All the real work — transcribing DESIGN.md into shared stylesheets, deriving a screen inventory from the User Journeys, building each HTML screen grounded in backlog/Acceptance Criteria content, linking screens together, and auditing/fixing existing screens against drift — lives in the `prototype-builder` subagent (`.claude/agents/prototype-builder.md`). Your job here is just to hand off cleanly and relay the result; don't duplicate the subagent's logic or try to build screens yourself.

## Step 1: Get today's date

Run `date +%Y%m%d` (Bash) to get today's date in `YYYYMMDD` format. Don't compute or guess this — always shell out for it, since the log entry needs it to be exact.

## Step 2: Identify scope, and check before a large unscoped build

Check whether the user named a specific role (เจ้าหน้าที่ รพ.สต. / เภสัชกร / ผู้บริหาร / Admin), `FT-ID`, Epic, or journey step.

- **Scope given:** pass it through verbatim to the subagent.
- **No scope given:** a full prototype spans 4 roles and up to 25 Features — before delegating, tell the user this is a large build and ask (in your own message, or let the subagent's own `AskUserQuestion` handle it — either is fine, don't ask twice) whether to build everything now, start with one role, or start with one Feature/Epic. Don't silently kick off a full build without this check.

## Step 3: Delegate to the subagent

Call the Agent tool with `subagent_type: "prototype-builder"`. Run it in the **foreground** (`run_in_background: false`) — this subagent may ask clarifying questions via `AskUserQuestion` (scope confirmation, an undocumented UI element, a genuinely new component DESIGN.md doesn't cover), so it needs to be synchronous, not fire-and-forget.

Pass a self-contained prompt including:
- Today's date (`YYYYMMDD`)
- A pointer to read `CLAUDE.md` and `DESIGN.md` at the project root for full context, since the subagent starts with no memory of this conversation
- The scope from Step 2 (a specific role/FT-ID/journey step, or "no scope — confirm build strategy with the user first")
- A note that `backlog.md`, `02-feature-list.md`, `03-user-journey/*.md`, and `04-test-design/acceptance-criteria.md` should be read fresh from disk as ground truth

## Step 4: Relay the result

The subagent's final report will state what it did. Pass that along to the user plainly — don't re-summarize it into something vaguer. At minimum, make sure the user walks away knowing:

- Which roles/screens under `prototype/` were built or updated, with their `FT-ID`/`BL-ID` traceability
- Whether the shared stylesheets (`prototype/assets/tokens.css`, `components.css`) were generated or regenerated
- How to preview it (open `prototype/index.html` directly in a browser — no server needed)
- What's still pending if the build was scoped down, or any open decision the subagent couldn't resolve on its own
- Where the log entry landed, under `log/`
