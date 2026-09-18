Read `AGENTS.md` first, then inspect the existing repository before making any changes.

We are building the first real product slice of CanvasCourseVault.

## Architectural boundary

This repository is intended to contain multiple parts of the same CanvasCourseVault product under one Git repository.

For this iteration:

* `LandingPage/` is the existing public-facing marketing website.
* Treat `LandingPage/` as stable and do not modify it.
* The actual authenticated/user-facing CanvasCourseVault application should live in a separate sibling directory named `App/`.
* Do not place product application code inside `LandingPage/`.
* Do not move or rename `LandingPage/` in this task.
* Do not introduce a full monorepo toolchain, workspace manager, shared-package system, backend, or deployment restructuring yet.
* Keep the repository structure simple and product-first.

The intended high-level separation is:

```text
APP-CanvasCourseVault/
├── AGENTS.md
├── LandingPage/   # public marketing site
├── App/           # actual CourseVault web application
├── Flyer/
└── z-arc/
```

Additional backend services, ingestion workers, shared packages, and product-agent infrastructure may be added later when they are actually needed.

## Goal

Create the first standalone CourseVault application inside `App/`.

Within that application, create a `/vault` route that displays a single mock course archive using structured typed fixture data rather than hard-coded UI-specific data.

## Scope for this iteration

1. Inspect the existing repository first.

2. Inspect `LandingPage/` only as a reference for:

   * existing visual style
   * React/Vite/TypeScript conventions
   * reusable design ideas

   Do not edit files inside `LandingPage/`.

3. Create a new standalone frontend application in:

```text
App/
```

4. Prefer:

   * React
   * TypeScript
   * Vite
   * Tailwind CSS
   * Bun as the package manager

5. Keep the new application minimal. Do not copy the entire landing-page project or all of its dependencies unless they are actually needed.

6. Add a `/vault` route within the new `App/` application.

7. Define a small TypeScript data model for a course archive.

8. Create fixture data for one sample course, such as `ASL-201`, containing:

   * syllabus
   * modules
   * assignments
   * announcements
   * resources

9. Build a basic vault workspace that:

   * displays the course name
   * displays folders/content in a navigable tree or list
   * allows selecting a content item
   * displays that item's content in a preview pane

10. The vault UI should render from the typed fixture data rather than having course-specific folder names or file names embedded directly throughout the UI components.

11. Keep this entirely deterministic.

Do not add:

* AI
* LLM calls
* Canvas crawling
* database
* authentication
* backend API
* ingestion workers
* queues
* MCP
* agent frameworks
* product-agent infrastructure

12. Do not add new dependencies unless genuinely necessary.

13. Do not modify `LandingPage/`.

14. Do not commit anything.

## Before editing

Briefly tell me:

* which existing files/directories you inspected
* what architectural boundary you observed between `LandingPage/` and the new `App/`
* what files/directories you plan to create or modify
* what dependencies you plan to use
* your implementation approach in a few sentences

Stop and show me this plan before making edits.

## Verification

After implementation:

* run the appropriate build verification using Bun
* report whether the build passed
* report any environment/build problems separately rather than silently changing unrelated infrastructure
* verify that `LandingPage/` has not been modified
* list every changed or created file
* summarize what changed

Also run or report the equivalent of:

```bash
git status
git diff --stat
```

so I can review the scope of the change.

## Definition of done

This task is complete when:

* `App/` exists as a separate frontend application
* `/vault` works inside `App/`
* the sample course renders from typed fixture data
* selecting content changes the preview pane
* the build succeeds
* `LandingPage/` remains untouched
* no unnecessary architecture or dependencies were added
* nothing has been committed

Stop after that so I can inspect the diff myself.
