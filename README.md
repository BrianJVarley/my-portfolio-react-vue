# Portfolio · Micro-Frontend Shell

A portfolio site built as a **micro-frontend monorepo**. The shell orchestrates two independent apps loaded at runtime via Module Federation 2.0 — one in React, one in Vue.

```
shell      React 19.2 + React Router v7   → localhost:3000
react-mfe  React 19.2                     → localhost:3001   exposes: ProjectsPage
vue-mfe    Vue 3.5                        → localhost:3002   exposes: AboutPage
```

---

## Architecture

```
portfolio-mfe/
├── pnpm-workspace.yaml
├── package.json                 ← root: dev / build / preview scripts
│
├── shell/                       ← MF Host (React 19.2)
│   ├── src/
│   │   ├── App.tsx              ← router + lazy remote imports
│   │   ├── main.tsx
│   │   ├── index.css            ← global design tokens + layout
│   │   └── remotes.d.ts         ← TS type stubs for federated modules
│   ├── vite.config.ts           ← declares remotes + shared deps
│   └── package.json
│
├── react-mfe/                   ← MF Remote (React 19.2)
│   ├── src/
│   │   ├── ProjectsPage.tsx     ← exposed as reactMfe/ProjectsPage
│   │   └── main.tsx             ← standalone dev entry
│   ├── vite.config.ts           ← exposes ProjectsPage
│   └── package.json
│
└── vue-mfe/                     ← MF Remote (Vue 3.5)
    ├── src/
    │   ├── AboutPage.vue           ← Vue SFC (the real component)
    │   ├── AboutPageWrapper.tsx    ← exposed as vueMfe/AboutPage
    │   ├── App.vue                 ← standalone dev wrapper
    │   └── main.ts                 ← standalone dev entry
    ├── vite.config.ts              ← exposes AboutPageWrapper
    └── package.json
```

### How the cross-framework bridge works

The Vue MFE can't export a `.vue` SFC directly to a React shell. The bridge is a two-step wrapper in `AboutPageWrapper.tsx`:

1. **`defineCustomElement()`** (Vue 3 built-in) converts the Vue SFC into a Web Component class
2. **`customElements.define('about-page', ...)`** registers it in the browser's custom element registry
3. The wrapper exports a thin React function component that renders `<about-page />` as a native DOM element

```
Shell (React)
  └─ lazy(() => import('vueMfe/AboutPage'))
       └─ AboutPageWrapper.tsx
            ├─ defineCustomElement(AboutPage.vue)   ← Vue → Custom Element
            ├─ customElements.define('about-page')  ← register once
            └─ export default () => <about-page />  ← React renders DOM element
```

Zero adapter libraries needed. Supported natively by Vue 3 and all modern browsers.

### Shared dependencies

| Package | Scope | Strategy |
|---|---|---|
| `react` / `react-dom` | shell + react-mfe | `singleton: true` — one copy at runtime |
| `react-router-dom` | shell + react-mfe | `singleton: true` — shared router instance |
| `vue` | vue-mfe only | not shared (isolated inside the Custom Element) |

---

## Tech stack

| | Version | Notes |
|---|---|---|
| **React** | 19.2.1 | Latest stable (Dec 2025). `<Suspense>` for MFE loading states |
| **Vue** | 3.5.26 | Latest stable 3.5.x. Vue 3.6 (Vapor mode) is in beta |
| **React Router** | v7.1 | |
| **Vite** | 6.3 | Build tool for all three packages |
| **Module Federation** | `@module-federation/vite` 0.1 | MF 2.0 — official Vite plugin from the MF team |
| **TypeScript** | 5.7 | Strict mode throughout |
| **pnpm** | 9+ | Workspace manager |

---

## Prerequisites

- **Node 20+** (see `.nvmrc`)
- **pnpm 9+**

```bash
npm install -g pnpm
```

---

## Getting started

```bash
# 1. Install all workspaces from repo root
pnpm install

# 2. Start all three apps in parallel
pnpm dev
```

Open **http://localhost:3000**.

> All three ports must be running for the shell to load the remotes.
> `pnpm dev` starts them all in parallel automatically.

- `/projects` → loads the React MFE
- `/about` → loads the Vue MFE (via Custom Element bridge)

---

## Scripts

### Root

| Command | What it does |
|---|---|
| `pnpm dev` | Start all three apps in parallel |
| `pnpm build` | Build remotes first, then shell (correct order) |
| `pnpm preview` | Preview all three production builds |

### Per-package (standalone)

```bash
pnpm --filter shell      dev
pnpm --filter react-mfe  dev
pnpm --filter vue-mfe    dev
```

---

## Customising

### Your projects — `react-mfe/src/ProjectsPage.tsx`

Replace the `projects` array at the top of the file:

```ts
const projects = [
  {
    id: 1,
    title: 'Your Project',
    tech: ['React', 'TypeScript'],
    description: 'What it does.',
    year: '2025',
    tag: 'Category',
  },
]
```

### Your bio — `vue-mfe/src/AboutPage.vue`

Edit `skills`, `roles`, and `values` in the `<script setup>` block.

### Your name — `shell/src/App.tsx`

```tsx
<span className="wordmark__first">your</span>
<span className="wordmark__last">name</span>
```

### Design tokens — `shell/src/index.css`

```css
:root {
  --bg:      #0c0c0e;   /* page background          */
  --accent:  #d4ff5c;   /* highlight — change this  */
  --font-display: 'DM Serif Display', Georgia, serif;
  --font-mono:    'DM Mono', 'Fira Code', monospace;
}
```

---

## Production deployment

Each MFE deploys independently. The shell fetches their `mf-manifest.json` at runtime.

**1. Build and deploy remotes** to any static host (Netlify, Vercel, S3+CDN):

```bash
pnpm build:remotes
# → react-mfe/dist/  and  vue-mfe/dist/
```

**2. Update remote URLs** in `shell/vite.config.ts`:

```ts
remotes: {
  reactMfe: { entry: 'https://react-mfe.your-domain.com/mf-manifest.json' },
  vueMfe:   { entry: 'https://vue-mfe.your-domain.com/mf-manifest.json' },
},
```

**3. Build and deploy the shell:**

```bash
pnpm --filter shell build
# → shell/dist/
```

After this initial setup, redeploy any remote independently without touching the shell.

---

## Adding a new MFE section

1. Scaffold: `pnpm create vite contact-mfe --template react-ts`
2. Add to `pnpm-workspace.yaml`
3. Configure `exposes` in its `vite.config.ts`
4. Register as a remote in `shell/vite.config.ts`
5. Add `lazy()` import + `<Route>` in `shell/src/App.tsx`
6. Add type stub in `shell/src/remotes.d.ts`

---

## Troubleshooting

**Remote doesn't load / blank page**
Make sure both remotes are running (`:3001`, `:3002`). Check the browser console for federation errors.

**`customElements already defined` warning in dev**
Harmless HMR artefact. The guard in `AboutPageWrapper.tsx` prevents double-registration.

**TypeScript errors on federated imports**
Add stubs to `shell/src/remotes.d.ts` for any new exposed modules.

**Shell build fails with missing `mf-manifest.json`**
Always build remotes before the shell. Use `pnpm build` from the root — it handles the order.
