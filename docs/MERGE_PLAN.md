# Merge Plan: old site + new site

**Decision (operator, 2026-10-05):** keep the new site's design and structure, and bring in all of the old site's real content.

- Old site: https://realiteez-custom-creations.deangelohaywood.chatgpt.site/ (hosted by ChatGPT, no source repo)
- New site: this repo

## Keep from the new site
Layout, design, order form, Stripe "Buy now" support, SEO and share setup, security headers, and the single config file (`config/site.js`).

## Bring in from the old site (status: waiting on content)
- [ ] Every product: name, price, sizes and colors, description
- [ ] Product and portfolio photos (go in `assets/products/`)
- [ ] About / story text and the Realiteez voice (headline, slogans)
- [ ] Logo and brand colors (if they differ, update the tokens in `assets/styles.css`)
- [ ] Contact: email, phone, city
- [ ] Social links: Instagram, TikTok, Facebook
- [ ] Policies: turnaround, shipping, refunds, minimums
- [ ] Reviews and testimonials (real ones only)
- [ ] Any section on the old site the new one lacks; rebuild it in the new style

## How content arrives
Screenshots of each old page, pasted text, or an export of the ChatGPT site code. If this session's network allowlist ever includes `*.chatgpt.site`, read the old site directly.

## When the merge is done
- [ ] Sample products removed and `isSampleContent: false`
- [ ] Checked at desktop and phone widths
- [ ] Deployed to Vercel and the custom domain connected
- [ ] Old ChatGPT site retired only after the new one is live and the operator approves
