# Half Day Cafe · 浮生半日

A small ordering app: customers pick a drink, submit an order, get a
number (01–99). A separate Barista Queue screen shows pending orders
and lets staff tap one to mark it done.

This version uses **Supabase** (free tier) as the backend instead of
`window.storage`, so it works once deployed to a real URL — not just
inside Claude.

## 1. Create the Supabase project (free)

1. Go to supabase.com → New project (pick any name/region, free tier)
2. Once it's ready, open the **SQL Editor** and run the entire contents
   of `supabase-schema.sql` from this folder. This creates the
   `orders` table, the order-number counter, and the permissions
   that let the app read/write without a login system.
3. Open **Project Settings → API**. Copy:
   - **Project URL** → this is `VITE_SUPABASE_URL`
   - **anon public key** → this is `VITE_SUPABASE_ANON_KEY`
4. Optional but nice: **Database → Replication**, turn on Realtime for
   the `orders` table. The Barista Queue will then update instantly
   instead of polling every 3 seconds (the polling still works fine
   without this — it's just a bit slower).

## 2. Run it locally (optional, to test first)

```bash
npm install
cp .env.example .env
# paste your Project URL and anon key into .env
npm run dev
```

Open the printed localhost URL. Place a test order, then open the
same URL in a second tab and switch to the Barista tab — your order
should show up there.

## 3. Deploy it for free

**Option A — Cloudflare Pages** (recommended: unlimited bandwidth, free commercial use)
1. Push this folder to a GitHub repo
2. cloudflare.com → Pages → Connect to Git → pick the repo
3. Build command: `npm run build` — Output directory: `dist`
4. Add environment variables `VITE_SUPABASE_URL` and
   `VITE_SUPABASE_ANON_KEY` (same values as your `.env`)
5. Deploy — you'll get a `*.pages.dev` URL immediately, or attach
   your own domain in Custom Domains

**Option B — Netlify**
1. Push to GitHub, then netlify.com → Add new site → Import from Git
2. Build command: `npm run build` — Publish directory: `dist`
3. Add the same two environment variables under Site settings →
   Environment variables
4. Deploy

Either way: build once, get a real URL, share it with customers and
keep the Barista tab open on a tablet or laptop behind the counter.

## Notes

- Order numbers wrap 01→99 and are assigned atomically in the
  database (via the `next_order_number()` function), so two people
  submitting at the same instant won't collide.
- The barista card's "TAP WHEN READY" marks that order `done` in the
  database — it disappears from the queue but stays in the table if
  you ever want order history.
- If you want customers to see delivery/pickup style options later,
  or add real product photos, the drink and background image data
  lives near the top of `src/App.jsx` (`DRINKS` and `BG`).
