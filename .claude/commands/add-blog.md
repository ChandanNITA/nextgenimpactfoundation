Add a new blog post.

Arguments: $ARGUMENTS (blog post title)

Steps:
1. Generate a slug from the title (lowercase, hyphens)
2. Create a new BlogPost entry. If data/blog-posts.ts exists, add to it. Otherwise create the file following the BlogPost type from types/index.ts.
3. Include all required fields: title, slug, excerpt, content, author, image, publishedAt, category, tags, readingTime, featured
4. Use today's date for publishedAt
5. Set featured to false
6. Use placeholder image: /images/blog/{slug}.jpg
7. Verify TypeScript compiles: npm run typecheck

