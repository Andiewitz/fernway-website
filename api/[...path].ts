import { api } from '../src/worker/app'

/*
  Vercel Function: Vercel serves the built SPA from dist/vercel and routes
  every /api/* request here (see vercel.json). This is the same Hono app the
  Cloudflare Worker uses, so both hosts answer identically.
*/
export default {
  fetch(request: Request) {
    return api.fetch(request)
  },
}
