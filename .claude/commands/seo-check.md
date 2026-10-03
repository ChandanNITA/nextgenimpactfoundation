Audit all pages for SEO completeness:

For every page file in app/, check:
1. Has `metadata` export or `generateMetadata` function
2. Has unique title (not generic)
3. Has description (120-160 chars ideal)
4. Has Open Graph tags (via generatePageMetadata)
5. Has canonical URL
6. Uses semantic HTML (`<h1>` once per page, proper heading hierarchy)
7. Images have alt text
8. Links use descriptive text (not "click here")

Also check:
- app/sitemap.ts includes all routes
- app/robots.ts exists and is correct
- Structured data (JSON-LD) is present on key pages
- No duplicate title tags across pages

Report a checklist of all issues found.

