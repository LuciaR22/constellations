# WORKFLOW.md — Round 1 (vague) vs Round 2 (precise) comparison

## Context

Round 1 used the prompt "make me the CRUD for nodes" in normal agentic
mode, fresh session, with no project context or file references. Round 2
used a prompt with explicit constraints (DAO pattern, validation rules,
exact error messages, example behavior) and a verification step (write
tests and run them), referencing `ProjectContext.md`, using an
explore-plan-code flow (Plan Mode in GitHub Copilot).

## Correctness

Round 1 has **no tests at all** for the business logic (DAO, hooks,
services) — it only generated tests for UI components (`Button.test.tsx`,
`Input.test.tsx`, etc.), meaning the part that handles data and
validation was never verified. Round 2 has 9 tests covering the full DAO
(1 success case and 1 error case per CRUD operation, plus one extra
failed-read case). Both rounds had bugs: Round 1 mixed
interfaces/types inside logic files (e.g. `useNodes.ts` declaring types
and functions together) and named the DAO generically (`nodeDAO.ts`)
without indicating the storage type used. Round 2 had duplicated code
(`.trim()` on tags repeated in `validateTags` and `create`, ignoring the
already-normalized value the validation returned) and an initial
configuration error (deprecated `moduleResolution`).

## Accessibility

Round 1 generated UI components (`Button`, `Input`, `Select`, `NodeForm`,
etc.) without being asked to — their accessibility attributes weren't
reviewed in depth, but since they were never requested or verified, they
represent unevaluated risk surface. Round 2 doesn't generate UI (it
stayed within the explicitly requested logic-only scope), so this doesn't
apply.

## Edge cases

Round 2 handles the edge cases explicitly requested: empty title, empty
tags, and delete on a non-existent id, all with specific error messages
verified by tests. Round 1 didn't clearly declare equivalent validations
in its data layer, and since it has no tests, there's no evidence those
cases are covered.

## Review effort

Round 1 generated ~25 files that weren't requested (full UI: components,
styles, API routes, hooks) versus Round 2's 5 pure-logic files. The total
diff was +2533/-10170 lines between branches. Reviewing Round 1 took
longer due to its volume and the lack of tests to guide verification;
Round 2, although slower to write the initial prompt, was faster to
review because the process itself (explore-plan-code + tests) had already
validated much of the behavior before manual review.

## AI mistake caught

In Round 2, the `validateTags` function normalized and returned the
cleaned tags (`.trim()`), but the DAO's `create` method ignored that
result and re-applied `.trim()` on its own — duplicated code that a good
prompt should have prevented from the start, but which was only caught
during manual review of the generated code.

## Conclusion

The vague prompt produced more code but with fewer guarantees: zero logic
tests, unrequested scope, and less consistent structure with the
project's rules. The precise prompt produced less code but verified,
aligned to the requested scope, and with quality findings (even though it
had its own bug) that were detectable thanks to the tests and the
review process guided by plan mode.
