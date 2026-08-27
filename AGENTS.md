<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Cursor Rules Front_AI_Intership

## Stack

- **Framework:** Next.js (App Router)
- **UI:** React + TypeScript
- **Styling:** Tailwind CSS (ALWAYS use the variables defined in `tailwind.config.ts` for colors and typography — no hardcoded values like `#FF0000` and no arbitrary classes outside the defined palette)
- **Testing:** Jest + React Testing Library
- **Linting:** ESLint (integrated with Next.js)

## Folder structure

- `app/`: routes and pages (App Router). Each folder name defines a URL.
- `app/[route]/_hooks/` and `app/[route]/_services/`: logic specific to that page (the underscore prevents Next.js from treating them as routes).
- `components/`: UI components reusable across the app. Each component lives next to its test file (e.g. `Button.tsx` + `Button.test.tsx`).
- `hooks/`: hooks shared across the whole app (e.g. `useAuth`, `useLocalStorage`).
- `services/`: business logic / API calls shared across the whole app.
- `styles/`: global design configuration (color palette, typography).

## Code conventions

- **Strict TypeScript:** avoid `any`. Type props, function returns, and API data.
- **Documented functions:** every non-trivial function should have a comment explaining its purpose, parameters, and return value.

## Clean Code Principles

1. **Descriptive names:** variables, functions, components, and classes should clearly reflect their purpose. Avoid ambiguous abbreviations.
2. **Small functions/components:** each function or component should be short and do one thing.
3. **Single Responsibility Principle (SRP):** avoid mixing responsibilities in a single function or component.
4. **DRY (Don't Repeat Yourself):** centralize reusable logic in a hook or function instead of copy-pasting code.
5. **Self-explanatory code:** write code that's understandable without relying on comments.
6. **Avoid magic values:** use named constants instead of hardcoded numbers or strings.
7. **Reduce complexity:** avoid deeply nested `if` statements; use early returns when appropriate.
8. **Limit parameters:** if a function/component receives too many props/parameters, group them into an object.
9. **High cohesion, low coupling:** each component/module should have a clear purpose and depend as little as possible on others.
10. **Remove unnecessary code:** delete dead code, unused variables, and outdated comments.
11. **Handle async errors properly:** catch and handle errors from API calls/fetches, provide meaningful context (not just "Error"), and use Error Boundaries for rendering failures.
12. **Stay consistent:** follow the same naming, formatting, and structure conventions throughout the project.
13. **Prefer composition over inheritance:** build UI by composing small components together (e.g. via `children` or props) rather than creating component hierarchies.
14. **Write testable code:** design decoupled components that are easy to cover with unit tests.
15. **Refactor continuously:** use every change as an opportunity to improve code quality without altering behavior.
16. **KISS (Keep It Simple, Stupid):** always choose the simplest solution that solves the problem.
17. **YAGNI (You Aren't Gonna Need It):** don't implement functionality that isn't needed yet.
18. **Apply SOLID where relevant:** use these principles to write more maintainable, extensible, and decoupled code.
19. **Prefer pure functions:** avoid side effects whenever possible; a function should depend only on its inputs.
20. **Prioritize readability:** code is read far more often than it's written — optimize for whoever maintains it later.

## Testing

- Every new component in `components/` must have a matching test in the same folder.
- Use React Testing Library, prioritizing queries by role/visible text (not by implementation details).

## Commits

Follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <message in lowercase, imperative mood>
```

Allowed types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`, `style`

## What NOT to do

- Don't use inline styles or CSS-in-JS: Tailwind only.
- Don't hardcode colors or typography outside the Tailwind configuration.
- Don't mix business logic inside UI components — extract it into `services/` or `hooks/`.
