# CanvasCourseVault

## Project goal

CanvasCourseVault turns Canvas course content that a user is authorized to access into a structured, searchable archive that can be retained and used with study, note-taking, and AI tools.

The product should prioritize:

- reliable course-content capture
- understandable organization
- reproducible exports
- user control over stored course material
- clear separation between deterministic software and AI-assisted interpretation

## Current state

The repository currently contains a working public landing page in `LandingPage/`.

The actual CourseVault application is still being developed.

The first product milestone is a `/vault` workspace that can display a course archive from structured fixture data.

## Technology

Frontend:

- React
- TypeScript
- Vite
- Tailwind CSS

Package manager:

- Bun

Deployment:

- Vercel

## Important files

- `LandingPage/src/App.tsx` — landing-page application
- `LandingPage/src/routes.tsx` — application routes
- `LandingPage/src/sections/` — landing-page sections
- `LandingPage/package.json` — frontend dependencies and scripts

## Development commands

From `LandingPage/`:

```bash
bun install
bun run dev
bun run build
```

## Agent-development rules

Before changing code, follow these in order

    * Inspect the relevant existing files.
    * Explain the intended change briefly.
    * Make the smallest change that satisfies the task.
    * Do not introduce new frameworks or infrastructure unless required.
    * Prefer deterministic code for behavior that can be specified exactly.
    * Use AI/agent behavior only when the product requires interpretation or reasoning under uncertainty.
    * Do not modify unrelated landing-page behavior.
    * Do not commit changes unless explicitly instructed.

## Verification

For frontend changes:
`bun run build`

The build must succeed before the task is considered complete.

When practical, verify the changed feature manually in the browser.

## Definition of done

A task is done when:

    * the requested behavior works
    * unrelated behavior still works
    * the build succeeds
    * changed files have been reviewed
    * no unnecessary dependencies or abstractions were added

### Why this matters

This is our first real **agent-context** lesson.

When you later tell Claude Code:

> Build the `/vault` workspace.

the model does **not** inherently know your repo philosophy. `AGENTS.md` becomes part of the context supplied to the **[DEV-AGENT]**.

Mental model:

```text
Your prompt
   +
AGENTS.md
   +
files the agent reads
   +
tool outputs
   ↓
MODEL CONTEXT
   ↓
model decides what to do
```
