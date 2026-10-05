# Realiteez Custom Creations

The storefront for Realiteez Custom Creations: custom tees, hoodies, memorial shirts, event packs, brand merch, and one-of-one pieces.

It's a fast static site with no build step and no server to maintain. It's ready to deploy on Vercel, Netlify, Cloudflare Pages, or GitHub Pages.

## Edit the business content

Everything a business owner changes lives in **`config/site.js`**:

| What | Field |
|---|---|
| Products, prices, specs | `products[]` |
| "Buy now" checkout | `products[].paymentLink`: paste a Stripe Payment Link (`https://buy.stripe.com/...`) |
| Where order requests go | `formEndpoint`: paste a Formspree/Basin/Getform URL |
| Email, phone, city, socials | `contact` (empty fields stay hidden) |
| Steps, print methods, FAQ | `steps`, `methods`, `faq` |
| Sample-content banner | `isSampleContent`: set to `false` when the real catalog is in |

A product with no `paymentLink` shows a **Customize** button that opens the order form with that item preselected. If `formEndpoint` is empty, the form builds a request the visitor can copy and send to you.

## Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy (Vercel)

1. Import this repo at vercel.com/new. Framework preset: **Other**. No build command.
2. Add your domain under Project → Settings → Domains.
3. `vercel.json` sets security headers and a Content-Security-Policy. If you switch form providers, add the provider's host to `connect-src`.

## Going live checklist

- [ ] Real products, prices, and photos in `config/site.js`
- [ ] Stripe Payment Links created for fixed-price items
- [ ] `formEndpoint` set and a test request received
- [ ] Contact email, phone, and social links filled in
- [ ] `brand.url` set to the final domain
- [ ] `isSampleContent: false`

## Shareable preview

`python3 scripts/build_preview.py` writes a single self-contained `preview/index.html`.
