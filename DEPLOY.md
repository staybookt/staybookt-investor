# StayBookt Investor Site — Deploy

## Quick deploy (Vercel CLI, 60 seconds)

From this folder on your machine:

```bash
cd staybookt-investor
npm install
npx vercel --prod
```

Follow the Vercel CLI prompts:
- Set up and deploy? **Y**
- Scope? **Your account or staybookt team**
- Project name? **staybookt-investor**
- Directory? **./** (current)
- Override? **N**

Vercel prints a live URL. Done.

## Then map to a real domain

In Vercel dashboard → Project Settings → Domains:
- Add `invest.staybookt.com` (subdomain)
- Update DNS at your registrar: CNAME `invest` → `cname.vercel-dns.com`
- Vercel issues the SSL cert automatically (~2 min)

## Sections shipped

1. Hero — animated gradient orbs, fade-in wordmark, "Operating layer."
2. The Why — "Trades stall at $1M." editorial layout
3. Photography — full-bleed parallax of Tim's Newmarket install
4. Five Problems — numbered editorial rows with vertical-color stats
5. Flywheel — rotating ring with StayBookt OS center, 5 stage labels
6. TAM — animated counter $0 → $135M on scroll
7. The Ask — "Talk to us." with pulsing gradient orbs

## Still to build (post-launch v1)

- The Moat (3 columns with vertical-color gradient bars)
- How it works (3 pillars: Growth / Operations / Back Office)
- Pricing (3-tier with featured middle dark)
- Pipeline (Tim live, Janbar warm, We Fix HVAC warm)
- Competition 2x2 (StayBookt quadrant in tri-vertical gradient)
- Team (Jacob + Richard with placeholders for outcomes)
- Calendly embed at the bottom (replace mailto link)

## Notes

- All real photography in `public/photos/` (Tim's actual work shots)
- Brand tokens in `app/globals.css` (--ink, --hvac, --plumb, --elec)
- Wordmark component renders the gradient sweep automatically
- robots noindex/nofollow is on (private investor brief, not indexed)

## Tech

- Next.js 15 App Router · TypeScript · Tailwind v4 · Framer Motion
- Static export ready (no server functions needed for v1)
