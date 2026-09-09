# includebrake.com

Static site for IncludeBrake LLC. No build step, no dependencies, no framework.
Plain HTML + one CSS file + one JS file. Deploys to Vercel, Netlify, Cloudflare
Pages or GitHub Pages as-is.

---

## ⚠️ Do these three things before going live

### 1. Wire up the forms

Both forms currently have `action="REPLACE_WITH_FORM_ENDPOINT"`. Until that is
replaced, submitting shows the visitor a message telling them to call or email
instead — it does **not** silently swallow the message. Fix it in two files:

- `contact.html`
- `car-studio.html`

**Formspree (works on any host):** create a form, then replace the placeholder with
`https://formspree.io/f/YOUR_FORM_ID`.

**Netlify Forms:** replace the `action` with `/thanks` (make that page), and add
`netlify` plus `name="contact"` to the `<form>` tag.

**Vercel:** you need your own serverless function at e.g. `/api/contact`, then
point the `action` at it.

### 2. Add real contact details

There is currently **no phone number or email address anywhere on the site**, on
purpose — nothing was invented. Add them to the footer in all five pages
(`index`, `blueprint`, `automation`, `our-stand`, `contact`) and to the "What to
expect" block in `contact.html`. Search for `footer-meta`.

### 3. Confirm the service-area claim

`contact.html` and the footer say Spartanburg / Greenville / Upstate SC. The
`ProfessionalService` schema in `index.html` lists Spartanburg, Greenville and
Anderson. Change if that's wrong — schema claims get quoted back by search engines.

---

## Pages

| File | URL | In nav? | Indexed? |
|---|---|---|---|
| `index.html` | `/` | — | yes |
| `blueprint.html` | `/blueprint.html` | yes | yes |
| `automation.html` | `/automation.html` | yes | yes |
| `our-stand.html` | `/our-stand.html` | yes | yes |
| `contact.html` | `/contact.html` | yes (CTA) | yes |
| `car-studio.html` | `/car-studio.html` | **no** | **no** |

### Car Studio is deliberately isolated

`car-studio.html` is a standalone asset shared by direct link only. It is:

- absent from the main nav and every footer
- absent from `sitemap.xml`
- `Disallow`ed in `robots.txt`
- tagged `<meta name="robots" content="noindex, nofollow">`
- has its own header/footer that never links back to the main site

**Do not add a link to it from any other page.** Mixing industrial workflow
consulting with dealership media work on one linked site fractures the
positioning of both.

**Before sharing it:** the page has no sample video or stills. It needs at least
one real example before it goes to a lot owner.

---

## Deploy

### Vercel
```bash
npm i -g vercel
vercel          # preview
vercel --prod   # production
```
No config needed — Vercel serves the repo root as static.

### Netlify
Drag the folder into the Netlify dashboard, or connect the repo with:
- Build command: *(leave empty)*
- Publish directory: `.`

### GitHub Pages
Settings → Pages → Deploy from branch → `main` / `root`.
Note: Pages serves from a subpath unless you attach the custom domain. All
internal links are relative, so it works either way.

### Push to GitHub
```bash
git init
git add .
git commit -m "New positioning: Blueprint & Roadmap + Single Process Fix"
git branch -M main
git remote add origin git@github.com:YOUR_USER/includebrake-site.git
git push -u origin main
```

---

## Brand system

Tokens are locked in `assets/css/site.css` under `:root`, matching
`brand-guidelines-includebrake`:

| Token | Value |
|---|---|
| `--ib-bg` | `#080808` |
| `--ib-lime` | `#C8F230` (only accent — do not add a second) |
| `--ib-off-white` | `#F2F2EE` |
| Display font | Syne |
| Body font | Inter |
| Mono font | JetBrains Mono |

## Motion

Five patterns, all disabled under `prefers-reduced-motion`:

1. Hero line reveal (staged rise, load)
2. Scroll reveals — `[data-animate]`, `[data-stagger]`
3. Blur-to-focus on the stall list — `[data-focus]`
4. Industry ticker marquee
5. FAQ accordion

No scroll-jacking, no autoplay media, no layout shift. The site is fully
readable with JavaScript disabled.

---

## Content rules baked into this build

These were deliberate. Breaking them undoes the repositioning:

- **No prices anywhere.** Every path ends at the 15-minute call.
- **No tool or platform names.** No vendor, model or framework is named.
- **No testimonials, client names, logos or statistics.** There is no delivered
  case study yet. The proof section sells the *measurement method* instead.
- **No chatbot or voicebot products.** Removed entirely.
- **No "Authority Blueprint".** Removed entirely — it collided with
  Blueprint & Roadmap.
- **No "we don't replace your staff" defensive framing** in the hero. Ownership
  and staff control are stated as mechanics, not denials.

The one illustrative element — the before/after comparison in the proof section
on `index.html` — is explicitly captioned as an illustration of the method, not a
client result. Keep that caption.

---

## Known gaps

- No phone number or email (see #2 above)
- No Car Studio sample media
- No 404 page
- No favicon / og image
- Form endpoints not connected
