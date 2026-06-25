# CineScroll — React State & Suspense Demo

A Netflix-style movie browser that serves as a hands-on demo of building
**custom React state management from scratch** — no Redux, no Zustand, no
React Query. The UI makes the state mechanics tangible.

Live: https://jtrishmawi.github.io/react-state-n-suspense/

---

## What this demos

| Concept | Where to look |
|---|---|
| Custom `useReducer` + context | `src/state/index.tsx` |
| Discriminated union action types | `src/state/types.ts` (`ActionMap`) |
| RxJS epics for async side-effects | `src/state/movies/epics.ts` |
| `withData` HOC pattern | `src/state/index.tsx` |
| React Suspense + lazy components | `src/App.tsx`, `src/pages/Home/index.tsx` |
| Throw-a-promise resource pattern | `src/helpers/api/index.ts` (`configResource`) |
| Staggered CSS animation via custom properties | `src/components/PostersRow.tsx`, `src/components/Poster.tsx` |
| Dark / light theme (class-based) | `src/hooks/useTheme.ts`, `src/index.css` |

---

## Tech stack

| Layer | Choice |
|---|---|
| UI | React 19.2 |
| Bundler | Vite 8 |
| Styling | Tailwind CSS v4 (CSS-first config) |
| Async orchestration | RxJS 7 |
| Data | TMDB API (auto-generated TypeScript client) |
| Language | TypeScript 6 |
| Deploy | GitHub Pages via `gh-pages` |

---

## Setup

### 1. Get a TMDB API key

1. Create a free account at https://www.themoviedb.org/
2. Go to Settings → API → copy the **Read Access Token** (not the API key)

### 2. Configure the env var

```bash
cp .env.example .env.local
# then edit .env.local:
VITE_TMDB_API_KEY=<your Read Access Token>
```

### 3. Install and run

```bash
yarn        # install dependencies
yarn dev    # dev server → http://localhost:3000
```

---

## Commands

```bash
yarn dev        # start dev server (port 3000)
yarn build      # production build → dist/
yarn preview    # preview production build locally
yarn generate   # regenerate TMDB API client from scripts/oas.json
```

---

## Architecture

```
App (withData HOC)
 ├─ Navbar          (theme toggle, always visible)
 └─ Main
      └─ HomeErrorBoundary
           └─ Suspense (fallback: Spinner)
                └─ ConfigGate            ← suspends until TMDB config ready
                     └─ Home             ← fires all 8 fetches in useEffect
                          ├─ HeroBanner  ← first item of first ROWS entry
                          └─ PostersRow × 8
                               └─ Suspense × n
                                    └─ Poster (lazy) + SuspenseImage
```

### State flow

```
component calls action/epic
  → epic calls TMDB API
  → epic dispatches result
  → reducer updates state
  → component re-renders with new data
```

### Config / image boot sequence

1. `Api` constructor fires `loadConfig()` async (TMDB `/configuration`)
2. `ConfigGate` calls `configResource.read()` → suspends (shows Spinner)
3. Config arrives → `configResource.settle()` → promise resolves
4. `Home` mounts → `useEffect` fires all 8 fetches in parallel
5. Each epic calls `getImagePathFor()` → correct TMDB image URLs built

This eliminates the first-load race condition where images would load before
the TMDB base URL was known.

---

## Adding a category

1. Add an epic to `src/state/movies/epics.ts` (TMDB genre IDs:
   https://developer.themoviedb.org/reference/genre-movie-list)
2. Add action + reducer case in `src/state/movies/` following the existing
   pattern (actions.ts, types.ts, `src/state/movies/index.ts`)
3. Add an entry to `ROWS` in `src/pages/Home/index.tsx` — reorder freely,
   the first entry always gets the hero banner + big poster row

---

## Customisation

### Change category order / hero

Edit the `ROWS` array at the top of `src/pages/Home/index.tsx`. The first
entry automatically becomes the hero banner and big-poster row.

### Theme tokens

All custom design tokens are in `src/index.css` under `@theme { ... }`:
- `--color-cinema-red: #e50914` — brand red
- `--animate-fade-in: fade-in 0.35s ease-out both` — poster fade
- `html` / `html.dark` — page background colours (prevents white strip)
- `.hero-title-shadow` — text shadow only in dark mode

### Dark mode

Toggle the `dark` class on `<html>`. The theme hook (`src/hooks/useTheme.ts`)
persists the preference to `localStorage`.

---

## Generating API types

The TMDB OpenAPI spec lives at `scripts/oas.json`. To regenerate the
TypeScript client after updating the spec:

```bash
yarn generate
# outputs → src/helpers/api/__generated__/Api.ts
```
