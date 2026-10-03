Run the test suite and report results:

1. Run `npm run typecheck` — report any TypeScript errors
2. Run `npm run lint` — report any ESLint issues
3. Run `npm test -- --coverage` if Jest is configured — report pass/fail and coverage
4. Run `npx playwright test` if Playwright is configured — report E2E results

Summarize:
- Total tests passed / failed
- Coverage percentage (if available)
- Specific failing test details with fix suggestions

