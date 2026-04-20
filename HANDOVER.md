# Handover Notes

Date: 20 April 2026

## Project Snapshot

- Monorepo: React shell + React MFE + Vue MFE
- Package manager: pnpm workspace
- Dev ports:
  - shell: 3000
  - react-mfe: 3001
  - vue-mfe: 3002

## Recent Updates Completed

- Added agent customization docs for the repo:
  - .github/agents/portfolio-mfe.agent.md
- Enhanced react-mfe Projects page:
  - Added useMemo project summary stats
  - Added useEffect document title sync
  - Added staleTime logic in useQuery
- Updated project cards in react-mfe/src/services/projects.ts with:
  - Backbase Case Manager details
  - Avaya Workspaces details
  - Simple Offset app details

## Current Build Status

Last verified command:

pnpm build

Result: failed (exit code 1)

### Blocking error 1 (shell build hard fail)

- Package: shell
- Error: Top-level await is not available in current target environment
- Triggered in generated MF share chunk during Vite build
- Symptom: shell build stops and pnpm build exits 1

Likely fix path:

- Set shell build target to esnext in shell/vite.config.ts
- Re-run pnpm --filter shell build
- Re-run pnpm build

### Blocking error 2 (Vue MF DTS generation)

- Package: vue-mfe
- Module Federation DTS plugin reports TYPE-001 during type generation
- Build artifacts are still emitted, but this indicates type declaration generation is failing

Repro command from diagnostics:

npx tsc --project vue-mfe/node_modules/.federation/tsconfig.<hash>.json

Likely fix path:

- Validate exposed module typing in vue-mfe
- Check federation type generation compatibility for current vue-tsc/typescript versions
- If needed, disable DTS generation temporarily for production builds until resolved

## Important Files

- shell/vite.config.ts
- react-mfe/vite.config.ts
- vue-mfe/vite.config.ts
- react-mfe/src/ProjectsPage.tsx
- react-mfe/src/services/projects.ts
- TODO-github-repos-api.md

## In-Progress / Next Work

### 1) GitHub Repos API feature

Source plan is tracked in TODO-github-repos-api.md.

Top next actions:

- Add react-mfe/src/services/github.ts
- Add typed fetch function for GitHub repos
- Integrate with React Query in ProjectsPage or a dedicated component
- Add loading/error UI states for GitHub repos

### 2) GitHub Pages hosting setup

Recommended deployment shape:

- shell at /my-portfolio-react-vue/
- react-mfe at /my-portfolio-react-vue/react-mfe/
- vue-mfe at /my-portfolio-react-vue/vue-mfe/

Needed changes:

- Add base paths to each Vite config
- Make shell remote entries env-aware (localhost in dev, GitHub Pages URLs in prod)
- Add a GitHub Actions Pages workflow that builds all packages and publishes a combined deploy folder

## Quick Resume Checklist

1. Fix shell build target for top-level await compatibility.
2. Confirm pnpm --filter shell build passes.
3. Investigate Vue MF TYPE-001 diagnostics if still present.
4. Re-run pnpm build from repo root.
5. Start GitHub Repos API TODO implementation.
6. Add GitHub Pages workflow and validate production remote URLs.

## Useful Commands

- Install: pnpm install
- Start all apps: pnpm dev
- Build all: pnpm build
- Build remotes only: pnpm build:remotes
- Build shell only: pnpm --filter shell build
- Build react-mfe only: pnpm --filter react-mfe build
- Build vue-mfe only: pnpm --filter vue-mfe build
