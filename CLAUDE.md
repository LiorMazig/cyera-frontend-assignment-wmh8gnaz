# Project rules — Cyera Scans Heatmap

Fullstack skeleton: `client/` (React + Vite), `server/` (Express), `common/` (shared DTOs).
The assignment spec lives in `ASSIGNMENT.md` — treat it as the source of truth for behavior.

## Language

- **TypeScript only.** No `.js`/`.jsx` source files, no new plain-JS config.
- No `any`. Prefer explicit types on exported functions, props, and hook return values.
- Reuse the shared DTOs in `common/dtos/` for anything crossing the client/server boundary;
  do not redeclare a server shape inside the client.

## Client folder structure

Logic never lives in a component. Split it:

```
client/src/
  api/          the whole api layer — http calls, react-query hooks, api types
  components/   presentation only — JSX, props, styling
  hooks/        React-coupled logic that is not api access (derived state)
  utils/        pure functions — no React, no side effects, independently testable
  types/        client-only types (view models, not api shapes)
```

Rules:

- **`utils/`** — pure, deterministic, no React imports. Date math, grid building, bucketing,
  level/threshold calculation belong here.
- **`api/`** — everything that talks to the server: `api.ts` (axios calls), one `useX` query
  hook per endpoint, and `types.ts` for request/response-adjacent types. Nothing else may
  import `http-client` directly.
- **`hooks/`** — one concern per hook, named `useX`, returns a typed object. Composes
  `utils/` functions and `api/` hooks. No JSX.
- **`components/`** — read props, render markup, wire callbacks. A component should not contain
  date math, reduce chains, or fetch logic. If a component needs it, extract to a util or hook.
- One primary export per file, named after the file.

## Data fetching

- **All API access goes through react-query** (`@tanstack/react-query`) — `useQuery` for reads,
  `useMutation` for writes. No `useEffect` + `useState` fetching, no manual loading/error flags.
- Raw axios calls stay confined to `api/api.ts`; the `api/useX` hooks call it, components call hooks.
- Give every query a stable, explicit key including its inputs, e.g. `['scans', year, providerIds]`.
- Consume `isPending` / `isError` / `refetch` from react-query for loading, error, and retry UI
  rather than re-implementing them.
- Keep the `QueryClientProvider` at the app root (`main.tsx`).

## Conventions

- Keep diffs minimal and scoped; preserve existing behavior, names, and API contracts.
- Reuse the existing `color1`…`color5` classes in `styles.css` — do not restyle or rename them.
- Centralize magic numbers and repeated strings in `constants.ts`.
- Never edit `server/src/api/scan/scan.repository.ts` (marked DO NOT EDIT).
- Do not touch lockfiles. Adding a dependency needs an explicit ask first.
