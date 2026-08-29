# Patakeja

## Run it locally

```bash
npm install
npm run dev
```

Opens at http://localhost:5173

## Build for production

```bash
npm run build
```

This creates a `dist/` folder — that's the entire deployable website.

## Deploy

**Vercel (recommended)**
1. Push this folder to a GitHub repo
2. Go to vercel.com → New Project → import the repo
3. Vercel auto-detects Vite. Leave defaults, click Deploy.
4. Every push to the repo auto-redeploys.

**Netlify**
1. `npm run build` locally
2. Go to netlify.com → drag the `dist/` folder onto the deploy area
Or connect the GitHub repo the same way as Vercel (build command `npm run build`, publish directory `dist`).

## Important: `window.storage` won't work here

`src/App.jsx` calls `window.storage` in 13 places to persist listings, agents, admin accounts, and usage stats. That API only exists inside Claude.ai's artifact preview — it does not exist in a real browser.

Every call is wrapped in try/catch, so nothing will crash. But once deployed:
- Nothing persists across a page reload
- Nothing is shared between visitors — everyone gets a fresh, disconnected copy

The site still works fine for browsing, searching, and viewing listings. The admin console UI still works — it just won't save anything. Wiring in a real backend (Supabase or Firebase are the least-friction options) is a separate follow-up task.
