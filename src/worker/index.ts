import { createApiApp } from './app'

/*
  Cloudflare Worker (and `vite dev`) entry: the shared API plus static assets.
  Vercel uses api/[...path].ts with the same API instead of this file.
*/
type Env = { ASSETS: Fetcher }

const app = createApiApp<Env>()

// Everything that is not an API route is a static asset; the SPA fallback is
// configured in wrangler.jsonc (not_found_handling: single-page-application).
app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export default app
