Add a new program to the website.

Arguments: $ARGUMENTS (program name)

Steps:
1. Generate a slug from the program name (lowercase, hyphens)
2. Add a new entry to data/programs.ts with all required fields from the Program type
3. Use placeholder image paths: /images/programs/{slug}.jpg
4. Set status to 'active'
5. Include at least 3 impact metrics
6. Ensure the sitemap.ts will pick it up via generateStaticParams
7. Verify TypeScript compiles: npm run typecheck

