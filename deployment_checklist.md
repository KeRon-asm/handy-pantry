1. File & Project Structure

 Keep your app inside the /src/app or /app directory if you’re using the Next.js App Router.

Don’t use absolute paths to local files outside your project directory — Vercel’s build runs in an isolated environment.

Make sure the entry point matches your framework (for Next.js: next.config.js should exist).

2. Environment Variables

Add environment variables in Vercel Dashboard → Project Settings → Environment Variables.

Access them with process.env.MY_KEY, but remember:

Keys prefixed with NEXT_PUBLIC_ are visible to the browser.

Keys without that prefix are server-only.

 Don’t commit .env files to GitHub.

 3. Database & APIs

 Open only one database connection per request in serverless functions, or better, use a connection pooler (Supabase and Prisma handle this well).

 Use fetch or supabase-js client for API/database calls — they’re Vercel-safe.

 Don’t use long-running connections (like WebSockets or persistent DB connections) unless you use Vercel Edge Functions or Realtime Services.

 4. Dependencies & Builds

 List everything in package.json (Vercel installs dependencies during build).

 Use the correct Node.js version (set "engines": { "node": "20.x" }" if needed).

 Don’t rely on OS-level tools (like curl or psql) — only what’s in npm.

 Ensure npm run build actually works locally before pushing.

 5. TypeScript & ESLint

 Don’t use any — Vercel’s ESLint rules can block deployments if strict mode is on.

 Catch errors with unknown instead.

 Make sure tsconfig.json doesn’t exclude server routes unintentionally.

 6. API Routes (Next.js)

 Return Response objects (not JSON directly).

return new Response(JSON.stringify({ message: "ok" }), { status: 200 })


 Avoid importing large modules into routes — they get bundled per endpoint.

 Don’t log sensitive info to console.log — Vercel logs are public in team projects.

 7. GitHub Integration

 Vercel automatically deploys the branch you linked (usually main).

 You can switch branches in Vercel → Deployments → Settings → Git → Production Branch.

 Every push triggers a new build. Use preview deployments to test changes safely.

 8. Performance & Cleanliness

 Remove unused imports or files — Vercel’s bundler (Turbopack) can fail on orphaned code.

 Keep components small and mark client components explicitly ('use client').

 Avoid console.log spam — it can fill your Vercel logs and slow debugging.