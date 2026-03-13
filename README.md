# IncludeBrake — Website

Production site for [includebrake.com](https://includebrake.com).

## Pages

| File | URL | Offer |
|------|-----|-------|
| `index.html` | `/` | AI Chatbot Automation — $1,000 DFY build |
| `authority.html` | `/authority` | 90-Day Authority Blueprint — $1,500 day rate |
| `tractionbuild.html` | `/validate` | TractionBuild — AI idea validation platform |

## Deployment

Hosted on Vercel. Auto-deploys on push to `main`.

## Updating content

1. Edit the relevant HTML file
2. `git add . && git commit -m "Update: [what changed]"`
3. `git push origin main`
4. Live in ~30 seconds.

## Stripe links

CTAs use `buy.stripe.com/xxx` links. To update a payment link, find and replace
the relevant `href` in the HTML file and push.
