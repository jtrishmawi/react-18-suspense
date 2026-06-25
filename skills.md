# Claude Code Skills — react-state-n-suspense

Skills available in this project (invoke with `/skill-name`):

---

## `/code-review`

Multi-agent code review of uncommitted changes or a branch.

```
/code-review              # reviews current branch vs upstream
/code-review ultra        # cloud review of current local branch (billed)
/code-review ultra <PR#>  # cloud review of a GitHub PR number
```

**How it works:**
1. 8 parallel finder agents scan the diff from different angles
   (line-by-line, removed-behavior, cross-file, reuse, simplification,
   efficiency, altitude, CLAUDE.md conventions)
2. Dedup pass removes near-duplicates
3. Up to 10 verifier agents (CONFIRMED / PLAUSIBLE / REFUTED)
4. Final output: ≤10 findings ranked by severity as JSON

**When to use:** before merging to master, after large refactors, or when
the diff touches multiple files across layers.

---

## `/ultrareview` (deprecated alias)

Same as `/code-review ultra`. Use the latter instead.

---

## Accessibility hook (automatic — not a slash command)

A `PostToolUse:Write` hook fires `accessibility-agents:accessibility-lead`
automatically every time a `.tsx` file is written or edited. The lead agent
coordinates specialist sub-agents:

- `keyboard-navigator` — tab order, focus management, arrow keys
- `screen-reader-specialist` — ARIA labels, roles, live regions
- `contrast-checker` — WCAG AA colour contrast (4.5:1 text, 3:1 UI)
- `live-region-controller` — `role="status"`, `role="alert"`, announcements

Verdict is **APPROVED** or flagged with specific issues to fix. UI code is
not considered complete until APPROVED.

---

## Notes

- Always use `yarn` for package manager commands, never `npm`.
- TypeScript check: `yarn tsc --noEmit` — run before every commit.
- Dev server: `yarn dev` (port 3000).
- API type generation: `yarn generate` (reads `scripts/oas.json`, outputs
  `src/helpers/api/__generated__/Api.ts` via swagger-typescript-api).
