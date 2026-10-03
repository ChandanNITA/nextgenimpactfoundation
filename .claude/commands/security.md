Perform a security audit of the project:

1. Check security headers in next.config.ts:
   - X-Frame-Options
   - X-Content-Type-Options
   - Referrer-Policy
   - Permissions-Policy
   - Strict-Transport-Security
   - Content-Security-Policy (if present)

2. Check environment variables:
   - No secrets in NEXT_PUBLIC_ variables
   - .env.local is in .gitignore
   - No hardcoded API keys in source code

3. Run `npm audit` and report vulnerabilities

4. Check API routes for:
   - Input validation (Zod)
   - Rate limiting considerations
   - Error messages don't leak internal details

5. Check for XSS vectors:
   - No dangerouslySetInnerHTML with user input
   - Proper escaping in dynamic content

Report findings grouped by severity (Critical / High / Medium / Low).

