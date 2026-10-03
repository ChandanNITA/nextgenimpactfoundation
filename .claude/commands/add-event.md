Add a new event.

Arguments: $ARGUMENTS (event name)

Steps:
1. Generate a slug from the event name (lowercase, hyphens)
2. Add a new entry to data/events.ts with all required fields from the NGOEvent type
3. Set status to 'upcoming'
4. Set date to a future date
5. Use placeholder image: /images/events/{slug}.jpg
6. Include registration URL placeholder
7. Verify TypeScript compiles: npm run typecheck

