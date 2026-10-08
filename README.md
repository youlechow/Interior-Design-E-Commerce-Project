# Haven & Co. – Interior Design E-Commerce MVP
Next.js 14 + Supabase + Vercel

## Setup
1. Create a Supabase project → SQL Editor → run `supabase.sql`.
2. Authentication → Users → Add user (admin email + password, auto-confirm).
3. Copy `.env.local.example` to `.env.local`, fill in URL + anon key (Settings → API).
4. Replace `public/netspay-qr.svg` with the client's real NETSPay QR (update the filename in `app/payment/[id]/page.js` if you use .png).
5. `npm install && npm run dev`
## Deploy
Push to GitHub → import in Vercel → add the 2 env vars → Deploy.
