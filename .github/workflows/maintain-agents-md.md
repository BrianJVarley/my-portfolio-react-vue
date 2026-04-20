---
name: Maintain AGENTS.md
description: Weekly maintenance to keep AGENTS.md accurate from merged PRs and source changes since the prior run.
on:
  schedule: weekly
  workflow_dispatch:
permissions:
  contents: read
  pull-requests: read
  actions: read
strict: true
timeout-minutes: 20
tools:
  github:
    toolsets: [default, actions, search]
  edit: true
  bash: true
safe-outputs:
  create-pull-request:
    title-prefix: "[agents] "
    draft: false
    if-no-changes: warn
---
# Maintain AGENTS.md

You maintain the repository's `AGENTS.md` so it reflects the latest project reality.

## Goal

On each run, review what changed **since the previous successful run of this workflow**, then update `AGENTS.md` so it remains accurate and current, and open a pull request with those updates.

## Required process

1. Determine a `since` timestamp:
   - Use GitHub Actions data to find the previous successful run of this workflow in this repository.
   - If none exists, use a conservative fallback window of the last 30 days.

2. Collect merged pull requests since `since`:
   - Find PRs merged after `since`.
   - For each merged PR, gather key metadata and changed files.

3. Collect direct source changes since `since`:
   - Review default-branch commits after `since`.
   - Capture changed files that were not represented in merged PR summaries.

4. Read the current `AGENTS.md` (if it exists). If it does not exist, create it.

5. Update `AGENTS.md` with concise, factual content that reflects current repository reality:
   - What changed recently (merged PR highlights)
   - Material source/config/docs changes relevant to contributors or agents
   - Any updated conventions, commands, or architecture notes that are now true

6. Keep updates deterministic and minimal:
   - Preserve useful existing sections that are still valid.
   - Remove or correct stale information.
   - Avoid speculative statements.

7. If there are meaningful content changes, emit a safe output to create exactly one pull request that includes:
   - A clear title indicating AGENTS.md maintenance
   - A short body summarizing what was refreshed and the time window used

8. If no meaningful content changes are needed, do not force edits.

## Scope constraints

- Focus on `AGENTS.md` maintenance only.
- Do not modify unrelated files unless strictly needed to keep `AGENTS.md` accurate.
- Prefer repository facts derived from merged PRs and actual file diffs over assumptions.
