Audit all components and pages for WCAG 2.2 AA accessibility:

Check for:
1. All images have meaningful alt text (decorative images use alt="")
2. All form inputs have associated labels (htmlFor or aria-label)
3. Form error messages use aria-describedby
4. Interactive elements are keyboard focusable
5. Focus indicators are visible (focus-visible:ring-*)
6. Color contrast meets 4.5:1 minimum for text
7. Skip-to-main-content link exists in layout
8. html lang attribute is set
9. Heading hierarchy is correct (h1 → h2 → h3, no skips)
10. Buttons have accessible names
11. Links have descriptive text
12. Animations respect prefers-reduced-motion
13. ARIA attributes are used correctly (not duplicating native semantics)

Report issues grouped by severity (Critical / Major / Minor).

