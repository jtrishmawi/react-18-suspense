# CLAUDE.md — CineScroll / react-state-n-suspense

## Purpose of this repo

Educational demo of a **custom React state management system** built from
scratch with `useReducer` + RxJS epics + a `withData` HOC — no Redux, no
Zustand, no React Query. The state layer is intentionally kept simple so
learners can read every line.

**The UI** is a Netflix-style movie browser (CineScroll) powered by the TMDB
API — it exists to make the state demo tangible and visually appealing.

---

## Hard constraints

### 1 — Never touch `src/state/`

The files under `src/state/` are the demo's core subject matter. They must
not be refactored, reorganised, or "improved". If a bug or feature request
seems to require a state change, find a way to solve it at the component or
helper layer instead.

Off-limits files:
- `src/state/index.tsx` — `withData` HOC + context
- `src/state/reducer.ts` — root reducer
- `src/state/actions.ts` — action creators
- `src/state/epics.ts` — RxJS epic wiring
- `src/state/types.ts` — `ActionMap` utility type
- `src/state/movies/` — all files inside (actions, epics, reducer, types)

### 2 — yarn only

Always use `yarn`, never `npm` or `npx`. The lock file is `yarn.lock`.

```bash
yarn         # install
yarn dev     # dev server on :3000
yarn build   # production build → dist/
yarn tsc --noEmit  # type check (run before every commit)
yarn generate      # regenerate TMDB API types from OAS
```

### 3 — Accessibility review is mandatory for UI changes

A PostToolUse hook fires `accessibility-agents:accessibility-lead` every time
a `.tsx` file is written. Do not skip or work around it. If a review is
APPROVED, proceed. If issues are flagged, fix them before committing.

### 4 — Git workflow

```
git checkout -b feat/<name>   # create branch
# ... edit, tsc --noEmit ...
git add <files>               # stage specifically, not -A
git commit                    # with co-author trailer
git push origin feat/<name>
git checkout master
git rebase feat/<name>        # fast-forward master
git push origin master
```

---

## Architecture

### State layer (read-only for Claude)

```
withData(Component)
  └─ AppContextProvider
       ├─ useReducer(reducer, { movies: {} })
       ├─ useMemo(() => new Api(), [])     ← single Api instance
       ├─ actions(dispatch, api)           ← plain sync dispatches
       └─ epics(dispatch, api)             ← RxJS async side-effects ($ prefix)
```

Components consume via:
```tsx
const { state, actions, $actions } = useData();
// state.movies.netflix, state.movies.trending, ...
// actions.movies.getTrending()       ← plain action
// $actions.movies.$getNetflix({ page: 1 })  ← epic (RxJS)
```

### TMDB config / image loading

`Api.loadConfig()` fires in the `Api` constructor and fetches
`/configuration`. It settles a module-level `configResource` (Suspense
throw-a-promise pattern) exported from `src/helpers/api/index.ts`.

`ConfigGate` in `App.tsx` calls `configResource.read()` — suspending the
entire `<Home>` subtree until config is ready. This ensures
`getImagePathFor()` always has `_config` set when epics call it.

**Do not call `getImagePathFor` before `configResource` has settled.** The
`!_config` guard in `getImagePathFor` is a safety net only.

### Image pipeline

```
epic → api.getImagePathFor(rawPath, size) → full TMDB URL
  → dispatched into state as poster_path
  → SuspenseImage reads resource (throw-a-promise for each img)
  → <img loading="lazy" />
```

`SuspenseImage` uses `loadImage` + `createResource` from
`src/components/SuspenseImage/`. Each image suspends its `<Poster>` until
loaded. Stagger animation: `--i` CSS custom property on `<li>` in
`PostersRow`, inherited by `<article>` in `Poster` via
`animationDelay: calc(var(--i, 0) * 60ms)`.

---

## Key files

| File | Role |
|---|---|
| `src/App.tsx` | Root — `withData` HOC, `ConfigGate`, `HomeErrorBoundary`, `Suspense` |
| `src/pages/Home/index.tsx` | All 8 categories in one component; edit `ROWS` to reorder |
| `src/components/HeroBanner.tsx` | Hero section — always applied to first ROWS entry |
| `src/components/PostersRow.tsx` | Horizontal scroll row with stagger animation |
| `src/components/Poster.tsx` | Individual poster card with `SuspenseImage` |
| `src/helpers/api/index.ts` | `Api` class + `configResource` export |
| `src/index.css` | Tailwind v4 CSS-first config (`@theme`, `@variant dark`) |

---

## Tailwind v4 specifics

- Config is **CSS-first**: no `tailwind.config.js`. All tokens live in
  `src/index.css` inside `@theme { ... }`.
- Custom tokens defined: `--color-cinema-red: #e50914`,
  `--color-cinema-red-light: #b91c1c`, `--animate-fade-in: fade-in 0.35s ease-out both`
- Dark mode variant: `@variant dark (&:where(.dark, .dark *))` — class-based,
  toggle the `dark` class on `<html>`.
- Use `text-cinema-red` / `bg-cinema-red` etc. (Tailwind generates these from
  the `--color-*` token).
- `bg-linear-to-r` is Tailwind v4's gradient syntax (not `bg-gradient-to-r`).

---

## Env vars

```
VITE_TMDB_API_KEY=<Bearer token from TMDB developer account>
```

Copy `.env.example` to `.env.local` and fill in the key. The API client
sends it as `Authorization: Bearer <key>`.

---

## Adding a new movie category

1. Add an epic in `src/state/movies/epics.ts` (TMDB genre IDs:
   https://developer.themoviedb.org/reference/genre-movie-list)
2. Add action + reducer case in `src/state/movies/` (follow existing pattern)
3. Add the key to `ROWS` in `src/pages/Home/index.tsx`
4. Run `yarn tsc --noEmit` to verify

---

## Accessibility baseline

- WCAG 2.1 AA target throughout.
- Dark mode navbar gradient is always dark — use `text-white` and
  `text-cinema-red` on Navbar, never `text-neutral-800`.
- `HeroBanner` uses `.hero-title-shadow` CSS class for theme-aware text shadow
  (defined in `src/index.css`).
- `prefers-reduced-motion`: covered by `animation-delay: 0ms !important` in
  `index.css` — stagger delays collapse to zero.
- `SuspenseImage` passes `alt=""` for decorative posters; meaningful label is
  on the wrapping `<button>` in `Poster`.
- `PostersRow` scroll container has `tabIndex={-1}` (not in tab order but
  programmatically focusable) with arrow-key keyboard scrolling.
