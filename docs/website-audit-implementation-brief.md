# Two Tail Technologies Website: Audit Summary and Implementation Brief

Prepared: 2026-11-27 (last updated after final batch approval; home hero image removed at Mark's request 2026-11-27)

Implementation status: all approved items implemented locally on 2026-11-27 in the audit chat; awaiting Mark's local preview, review, commit and push. FUNC-002 not implemented (not approved). TECH-001 deferred.
Audit report and live decision tracker (source of truth for decisions): https://claude.ai/artifact/V6mcVjutBfGmNiYXt1xWa4
Repository: https://github.com/Two-Tail-Technologies/Website (local clone: `C:\Users\markg\Documents\TTT\Website`)
Live site: https://two-tail-technologies.github.io/Website/

This document is the hand-off for the implementation chat. It summarizes the Phase 1 audit, records every decision made so far, and specifies exactly what is approved for implementation.

---

## 1. Rules for the implementing chat (mandatory)

1. **Implement only items with status APPROVED** (Sections 3, 4 and 4B). FUNC-002 is NOT APPROVED. TECH-001 is approved but deferred (Section 4A).
2. **Do not expand scope.** If an approved change reveals a need for another change, stop and ask Mark first.
3. **Never commit, push, publish or deploy.** Make local file changes only. At the end, give Mark the Git commands in chat so he can review, commit and push himself.
4. **Do not install software or dependencies without asking.** ffmpeg and Python 3 are already available in the device shell.
5. **Preserve existing functionality** unless an approved item changes it (project filter behavior, Chartered download counter script, update manifest `projects/chartered-latest.json`, 404 page base-href script).
6. **Never invent facts.** Anything a founder must supply is marked `[FILL: ...]`. Do not publish text containing `[FILL` or `NEEDS:` markers (see CONTENT-003 condition). If a fact is missing at implementation time, ask Mark.
7. **Do not touch `projects/chartered-latest.json`.** Shipped game builds read it to offer updates.
8. **Keep the architecture:** plain HTML, CSS and JS, no build step, no framework, served by GitHub Pages from `main` / root.
9. **Writing conventions for anything new:** American English; only characters on a standard US keyboard in documentation. New code: variables camelCase, functions snake_case, classes PascalCase, constants UPPER_CASE, folders and non-Python files kebab-case.
10. **After implementing,** run the Phase 4 checks in Section 7 and report results, unresolved items and the Git commands.

---

## 2. Audit summary

**Overall score: 6.0 / 10.** The site is honest, technically clean, fast and accessible, but reads like a research notebook rather than a company a visitor can do business with, and its only contact mechanism did not work.

| Category | Score | Weight |
| --- | --- | --- |
| Branding and positioning | 5 | 15% |
| Content and messaging | 6 | 15% |
| Visual design | 6 | 10% |
| User experience | 6 | 10% |
| Technical implementation | 8 | 10% |
| Performance | 9 | 5% |
| SEO | 4 | 10% |
| Accessibility | 8 | 10% |
| Functionality | 4 | 10% |
| Mobile experience | 7 | 5% |

**Strengths to preserve:** honest status and testing language on every project; a real shipped product (Chartered 1.0.1) with checksum, privacy statement and roadmap; clean semantic markup; skip link and focus outlines; all text colors pass WCAG AA; very small, fast pages; a coherent "Lab Notebook" visual system (IBM Plex Sans/Mono, ink #1B1F24, paper #F6F5EF, sheet #FFFFFF, signal orange #C2410C, square cards, graph-paper background).

**Key facts verified during the audit:**

- 16 public pages; all 25 internal URLs and assets return HTTP 200; no console errors.
- Contact form: `CONTACT_KEYS` in `assets/js/contact.js` are empty on the live site, so messages cannot send.
- Visible placeholder `[NEEDS: python or r]` on `projects.html` line 73 and `projects/company-profitability.html` line 39.
- 4 px horizontal scroll at 320 px wide (card grids use a 300 px minimum column).
- No canonical tags, no `og:url`, no `sitemap.xml`, no structured data; root `robots.txt` returns 404 (GitHub Pages project-site limitation).
- Google Fonts loaded via `@import` in `assets/css/components.css` line 1.
- No secrets in Git history. Personal email addresses appear in commit metadata.
- Lighthouse was not run (not installed). LinkedIn links could not be verified automatically.

---

## 3. Decision status at a glance

| ID | Recommendation | Priority | Decision |
| --- | --- | --- | --- |
| FUNC-001 | Contact form: hide until keys exist | Critical | APPROVED (option B) |
| CONTENT-001 | Remove visible placeholder | Critical | APPROVED (option B) |
| BRAND-001 | Positioning around data, modeling and AI tools | High | APPROVED (option 2) |
| CONTENT-002 | Rewrite home hero | High | APPROVED |
| UX-001 | "What we do" section, 4 columns, specific CTAs | High | APPROVED |
| UX-002 | Split Projects into Products and Research | High | APPROVED (filter b + stage shown, nav ii) |
| DESIGN-001 | Real imagery with named placeholders | High | APPROVED (all parts) |
| CONTENT-003 | Equal, parallel founder profiles | High | APPROVED |
| CONTENT-005 | Reorder Chartered page | High | APPROVED (privacy line surfaced) |
| SEO-001 | Canonical, og:url, sitemap, Search Console | High | APPROVED (github.io now; domain notes in 4A) |
| SEO-002 | Titles and descriptions with topic terms | High | APPROVED |
| TECH-001 | Custom domain and email | High | APPROVED, DEFERRED (not this round; see Section 4A) |
| BRAND-002 | Replace "Est. November 2026" | Medium | APPROVED (batch, 2026-11-27; see 4B) |
| BRAND-003 | Client-benefit line on method | Medium | APPROVED (batch, 2026-11-27; see 4B) |
| CONTENT-004 | Reduce method repetition | Medium | APPROVED (batch, 2026-11-27; see 4B) |
| CONTENT-007 | Frame sensitive research topics | Medium | APPROVED (batch, 2026-11-27; see 4B) |
| DESIGN-002 | Feature blocks instead of uniform cards | Medium | APPROVED (batch, 2026-11-27; see 4B) |
| DESIGN-003 | Founder names at heading size | Medium | APPROVED (batch, 2026-11-27; see 4B) |
| UX-003 | Contact inquiry types and response time | Medium | APPROVED (batch, 2026-11-27; see 4B) |
| RESP-001 | Fix 320 px horizontal scroll | Medium | APPROVED (batch, 2026-11-27; see 4B) |
| ACCESS-001 | Per-field form errors, visible required | Medium | APPROVED (batch, 2026-11-27; see 4B) |
| PERF-001 | Self-host IBM Plex fonts | Medium | APPROVED (batch, 2026-11-27; see 4B) |
| SEO-003 | JSON-LD structured data | Medium | APPROVED (batch, 2026-11-27; see 4B) |
| PRIV-001 | Website privacy page | Medium | APPROVED (batch, 2026-11-27; see 4B) |
| SEC-001 | GitHub noreply emails (Mark does this) | Medium | APPROVED (batch, 2026-11-27; see 4B) |
| TECH-002 | Local consistency check script | Medium | APPROVED (batch, 2026-11-27; see 4B) |
| FUNC-002 | Hide or remove download counter | Medium | NOT APPROVED (keep counter) |
| CONTENT-006 | Minor copy fixes | Low | APPROVED (batch, 2026-11-27; see 4B) |
| DESIGN-004 | Distinct Released vs In progress styling | Low | APPROVED (batch, 2026-11-27; see 4B) |
| UX-004 | Fuller footer | Low | APPROVED (batch, 2026-11-27; see 4B) |
| RESP-002 | Tighter mobile header | Low | APPROVED (batch, 2026-11-27; see 4B) |
| TECH-003 | CSS cleanup | Low | APPROVED (batch, 2026-11-27; see 4B) |
| TECH-004 | Script flags markers and broken links | Low | APPROVED (batch, 2026-11-27; see 4B) |
| SEO-004 | Redirects for removed project URLs | Low | APPROVED (batch, 2026-11-27; see 4B) |
| SEO-005 | Chartered social image | Low | APPROVED (batch, 2026-11-27; see 4B) |
| ACCESS-002 | Darken orange if palette revisited | Low | APPROVED (batch, 2026-11-27; see 4B) |
| PERF-002 | Run PageSpeed Insights once | Low | APPROVED (batch, 2026-11-27; see 4B) |
| SEC-002 | Keep installer disclosure; sign in 1.1 | Low | APPROVED (batch, 2026-11-27; see 4B) |

Before starting, re-check the live tracker (link at top). If it shows more items APPROVED than this table, ask Mark whether to include them; this file is the specification only for items detailed in Section 4.

---

## 4. Approved items: specifications

Suggested implementation order: FUNC-001, CONTENT-001, BRAND-001 with CONTENT-002, UX-002 (navigation change touches every page), UX-001, CONTENT-003, CONTENT-005, DESIGN-001, SEO-001 (last, once all page URLs and titles are final).

### FUNC-001: Contact form, option B now (option A later)

**Decision:** Hide the form until both Web3Forms keys exist; show working contact routes instead. Option A (adding keys) will be a later, separate change, so keep all form code in place.

**Current:** `contact.html` lines 37-61 show the form; `assets/js/contact.js` lines 5-8 hold empty `CONTACT_KEYS`; the "not switched on" message appears only after submit (lines 41-43).

**Implement:**

1. In `contact.html`, add a notice block above the form, visible by default:
   "Our contact form is being set up. In the meantime, reach us on LinkedIn:" followed by links to both founders' LinkedIn profiles (URLs already in the "Elsewhere" section of the same page).
2. Give the form the `hidden` attribute by default.
3. In `contact.js`, at start-up: if every value in `CONTACT_KEYS` is non-empty, remove `hidden` from the form and hide the notice; otherwise leave the form hidden. Keep the existing submit-time check as a safety net.
4. Update the page lede so it does not promise a working form while it is hidden (for example: "Questions about a product, a pilot or a collaboration? Reach either of us directly below.").
5. Update the `<noscript>` message to match (LinkedIn below).
6. Update the "Contact form" section of `README.md` to describe the new behavior: the form appears automatically once both keys are filled in.

**Result for option A later:** pasting both keys into `CONTACT_KEYS` is the only change needed; then restrict each key to the site domain in the Web3Forms dashboard (Mark does this).

**Acceptance:** with empty keys the form is not visible and the LinkedIn notice is; temporarily filling dummy keys locally shows the form (do not submit it, and revert the dummy keys); no console errors.

### CONTENT-001: Remove visible placeholder, option B

**Implement:** delete the `<span class="needs">[NEEDS: python or r]</span>` and the separator before it in:
- `projects.html` line 73
- `projects/company-profitability.html` line 39

The tag line should read "panel forecasting" and "sec filings" with the site's existing separator between them. Leave the `.needs` CSS rule in place (harmless; cleanup belongs to TECH-003, which is pending).

**Acceptance:** `grep -rn "NEEDS" --include=*.html .` returns nothing.

### BRAND-001: Positioning, option 2 (Balanced)

**Approved positioning statement:**
"Two Tail Technologies builds data analytics, modeling and AI tools, and holds every one of them to a research-grade standard of testing."

**Engagement model (from Mark):** a mix of products, pilots and client work.

**Implement (only these places; title and meta rewrites site-wide are specified under SEO-002):**

1. `index.html`: meta description, `og:description` and `twitter:description` become the positioning statement above.
2. `index.html` `<title>`, `og:title`, `twitter:title`: "Two Tail Technologies | Data analytics, modeling and AI tools, rigorously tested".
3. `about.html` line 37 lede: replace "an applied research venture" framing. Proposed: "Two Tail Technologies builds data analytics, modeling and AI tools, and holds every one of them to a research-grade standard of testing. It was founded in 2026 by twins Aaron and Mark Scott."
4. `about.html` meta description and its OG/Twitter copies: "Two Tail Technologies builds data analytics, modeling and AI tools. Founded in 2026 by twins Aaron and Mark Scott."
5. `index.html` "Who we are" paragraph (line 89): replace "is an applied research venture founded in November 2026" with "builds data analytics, modeling and AI tools. It was founded in 2026"; keep the rest of the sentence.

Do not use "LLC", "Inc." or "Est." anywhere: the LLC is not yet formed.

### CONTENT-002: Home hero rewrite

**Current (`index.html` lines 35-41):** eyebrow "Est. November 2026"; h1 "Built for real decisions. Tested like it matters."; lede "We build tools for real problems and test them rigorously before we call them done."; buttons "See the work" and "Get in touch".

**Implement:**
- Eyebrow: `Data analytics / Modeling / AI` (the eyebrow CSS already uppercases it).
- H1: unchanged.
- Lede: "Two Tail Technologies builds data, modeling and AI tools, then tests them against simple baselines and unseen data before we call them done. Founded in 2026 by twins Aaron and Mark Scott."
- Primary button: "Explore our products", linking to `projects.html#products`.
- Secondary button: "Discuss a project", linking to `contact.html`.
- Desktop hero image: handled by DESIGN-001 (Chartered still or loop on the right side).

Note: changing the eyebrow also removes "Est. November 2026". That is approved here as part of CONTENT-002. BRAND-002 (pending) only covers any other use of "Est.", and there is none elsewhere.

### UX-001: "What we do" section with 4 columns and specific CTAs

**Implement in `index.html`, directly after the hero:**

Section eyebrow "What we do", h2 "Where we can help", then four columns using the existing principle-grid styling (or a new `.tt-capabilities` grid in `site.css`). Each column: h3, one sentence, then "See it in" with links to the proof projects.

1. **Data analytics.** "Turning public and operational data into answers you can check, from SEC filings to labor statistics." Proof: Company Profitability, NJ Minimum Wage.
2. **Modeling and forecasting.** "Forecasts and simulations scored on data they never saw, against the simple rule they would replace." Proof: Conflict Forecasting, Economic Planning Bot.
3. **AI systems.** "Agents and assistants that work within the same limits a person would, with every answer traceable." Proof: Chartered, Consulto Bot.
4. **Operations tools.** "Software that fits how frontline teams actually work, built by someone who has run the floor." Proof: Consulto Bot.

**Closing CTA band** (new section before the footer, using `.tt-band`): heading "Have a problem worth testing properly?", one line "We take on products, pilots and client work.", primary button "Get in touch" to `contact.html`.

**Responsive:** four columns at desktop, two at tablet, one on phones. Use `minmax(min(220px, 100%), 1fr)` so the new grid does not overflow at 320 px.

### UX-002: Products and Research split

**Decisions:** approved; filter option (b) topic filter on the research pipeline; every card keeps showing its development stage; navigation option (ii).

**Navigation (all 16 HTML files, including `404.html` and every page in `projects/`):**
`Products` / `Research` / `About` / `Contact`, linking to `projects.html#products`, `projects.html#research`, `about.html`, `contact.html` (relative paths `../` inside `projects/`). Set `aria-current="page"` on Products when on `projects.html`. Keep the nav usable at 320 px (it may wrap; check no overflow).

**`projects.html`:**
- h1 "Products and research"; lede: "Products are things you can use or pilot now. The research pipeline is scoped studies; each page says honestly what is built and what is not."
- Update `<title>` to "Products and research | Two Tail Technologies" and the meta/OG/Twitter descriptions to "Chartered, Consulto Bot and nine scoped research projects in forecasting, markets, policy and science, each with an honest status." (Removes the hardcoded "eleven".)
- `<section id="products">` with h2 "Products": Chartered (status "1.0.1: out now, free") and Consulto Bot (status "In progress") as wider cards with an image slot (DESIGN-001).
- `<section id="research">` with h2 "Research pipeline": the nine remaining projects, each card still showing its stage line (currently "Idea" for all nine).
- Card headings become h3 inside these sections (heading order h1, h2, h3). Remove the now-unneeded `.tt-card h2` styling only if nothing else uses it.
- Replace the Released / In progress / Idea filter with a topic filter on the research section only: buttons All / Markets / Policy / Science, using `data-topic` on each research card. Keep the existing progressive-enhancement pattern (filter bar `hidden` without JS) and `aria-pressed` handling in `assets/js/site.js`.
- **Proposed topic assignment (confirm with Mark before finalizing):**
  - Markets: Stock Trader Bot, Company Profitability, Economic Planning Bot
  - Policy: NJ Minimum Wage, NJ Political Contributions, NJ Affordable Housing, Development Likelihood, Conflict Forecasting
  - Science: Fly Connectome
- **Stage wording:** keep the existing words (Released with version, In progress, Idea) unless Mark decides otherwise. Mark mentioned stages such as "under development" and "finished"; any renaming of the stage vocabulary belongs to DESIGN-004 (pending), so ask before renaming.

**`index.html`:** the "Current work" preview shows only the two product cards (Chartered, Consulto Bot), under eyebrow "Products". Replace "See all eleven projects" with a "Research pipeline" line: "Nine scoped studies in markets, policy and science." and a link "See all 9 research projects" to `projects.html#research`.

**Project page URLs do not change.** Update every project page's "Back to all projects" links to point to `../projects.html#products` (Chartered, Consulto Bot) or `../projects.html#research` (the other nine), text "Back to products" or "Back to research".

**README.md:** update the Layout table and "Adding a project" steps (products vs research sections, `data-topic`, the home-page count line).

### DESIGN-001: Real imagery, with named placeholders

**Decisions:** all four parts approved. Use clearly named placeholders that Mark and Aaron will replace with real images. For Chartered, use real frames from existing recordings.

**Placeholders:**
- Folder: `assets/img/placeholders/`.
- Format: SVG, so the label text stays sharp. Each placeholder shows its own file name, the intended content and the target size, on the site's paper color with a 1 px rule border.
- Names (kebab-case): `founder-aaron-scott.svg`, `founder-mark-scott.svg` (square, 800 x 800), `consulto-bot-diagram.svg` (1600 x 900), `chartered-agents-screen.svg`, and any other Chartered shot the recordings cannot supply (1600 x 900).
- Add a short "Replacing placeholder images" section to `README.md`: where each placeholder is used, the target size, preferred format (WebP, or JPG for photos), and to update the `src`, `width`, `height` and `alt` when swapping.

**Chartered source footage:** `C:\Users\markg\Documents\TTT\Chartered\game-stages\v5\build\clips\` (this folder must be connected to the session; it is outside the repo; read only, never modify it):

| File | Size | Video | Length |
| --- | --- | --- | --- |
| `title-colony-1.avi` | 269 MB | MJPEG 1600x900, 30 fps, PCM audio | 56.7 s |
| `title-colony-2.avi` | 278 MB | MJPEG 1600x900, 30 fps, PCM audio | 54.7 s |
| `title-monmouth.avi` | 240 MB | MJPEG 1600x900, 30 fps, PCM audio | 65.3 s |

**Process:**
1. Extract candidate stills with ffmpeg (for example one every 5 seconds) to a scratch location outside the repo, and **show them to Mark before choosing**.
2. From the chosen frames, write to `assets/img/chartered/`: a hero still (WebP, 1600 px wide), card thumbnails (WebP, about 800 px wide), and 3 to 5 gallery stills for the Chartered page (WebP, 1600 px wide).
3. Hero loop (only if Mark approves a segment): 6 to 8 seconds, no audio track, H.264 MP4 (`-preset veryfast`, CRF around 28) plus WebM, 1280 px wide, target under 2.5 MB each, with the hero still as `poster`. Use `autoplay muted loop playsinline`. Under `prefers-reduced-motion: reduce`, show only the poster (no autoplay).
4. Never commit the source AVI files.

**Placement:**
- Home hero, right side on desktop (hidden or placed below the buttons on phones): Chartered hero still or loop, caption "Chartered 1.0.1, our free colony-survival game and AI testbed."
- Product cards on Home and Projects: Chartered thumbnail; Consulto Bot uses `consulto-bot-diagram.svg`.
- Chartered page: a gallery of 3 to 5 stills near the top, after the lede (position defined in CONTENT-005, step 2).
- Founders: `founder-aaron-scott.svg` and `founder-mark-scott.svg` on the About profiles and the home founders section, same size and crop for both.
- Style: images on white sheets with the 1 px rule border used by cards; square corners. No stock photos, no AI illustrations.
- Every image: `width` and `height` attributes, descriptive `alt` text, `loading="lazy"` for anything below the first screen.

### CONTENT-005: Reorder the Chartered page

**Decision:** approved as proposed, including surfacing the privacy sentence next to the download button.

**Current (`projects/chartered.html` lines 34-113):** status, h1, download link, lede, tags; then Download (installer details, SHA-256, certutil), System requirements, Getting past SmartScreen, Privacy, License and mods, Installing and updating, Known issues, New in 1.0.1, What's in Chartered, What's missing and what's coming, The question, How it's tested. About 7,900 px tall at 375 px.

**Implement this order:**
1. Back link, status line, h1, existing lede, tags (unchanged text). Keep the existing `page-meta` download link line or fold it into step 3; do not lose the GitHub Release link.
2. Screenshot gallery (DESIGN-001).
3. Download block: the existing primary "Download Chartered 1.0.1" button, then one line: "Free for Windows 10 and 11, about 427 MB. Not yet code-signed: see Getting past SmartScreen below." and one line: "No accounts, no analytics; one optional update check." Keep the `#chartered-downloads` paragraph in place so `downloads.js` still works (FUNC-002 was not approved; do not change the counter).
4. What's in Chartered (existing list, unchanged).
5. The question, then How it's tested (existing text, unchanged; stays visible).
6. What's missing, and what's coming (existing roadmap, unchanged).
7. A "Technical details" h2, followed by one native `<details>` element per section, each with a `<summary>` holding the old heading text, in this order: System requirements; Verifying your download (the existing installer filename/size/version paragraph, SHA-256 and certutil text); Getting past SmartScreen; Privacy; License and mods; Installing and updating; Known issues; New in 1.0.1.

**Rules:**
- Move existing sentences only; do not rewrite them (except the two new lines in step 3).
- Keep every existing `id` (`download`, `requirements`, `smartscreen`, `privacy`, `license`, `installing`, `known-issues`, `whats-new`, `whats-in`, `coming`, `question`) on the matching `<details>` or heading, so old anchor links still land correctly.
- In-page links to `#smartscreen` (and any URL arriving with a hash that targets a `<details>`) must open that section: add a few lines to a small script on this page (or `site.js`) that, on load and on `hashchange`, sets `open` on the targeted `<details>`. Without JavaScript the sections stay closed but fully readable on click.
- Style `<details>`/`<summary>` in `site.css` with existing tokens (rule-colored border between items, summary in the h2-detail size, visible focus outline, a plain marker). No animation.
- Version strings, SHA-256, download URLs and `projects/chartered-latest.json` stay unchanged, so the README release steps still apply.

**Acceptance:** all original text present exactly once; all old anchors still resolve and open their section; page height at 375 px is clearly shorter with sections closed; keyboard users can open and close each section; no console errors.

### SEO-001: Indexing basics (canonical, og:url, sitemap, Search Console)

**Decision:** approved, on the current GitHub Pages address. How it changes after the custom domain move is recorded in Section 4A under TECH-001.

**Base URL for this round:** `https://two-tail-technologies.github.io/Website/` (use this exact string everywhere so it can be replaced in one pass later).

**Implement:**
1. Canonical and `og:url` in the `<head>` of the 15 indexable pages, each pointing to its own full URL:
   - Home: `https://two-tail-technologies.github.io/Website/` (not `index.html`).
   - Others: `.../about.html`, `.../projects.html`, `.../contact.html`, `.../projects/<name>.html`.
   - Place `<link rel="canonical" href="...">` and `<meta property="og:url" content="...">` next to the existing OG tags.
2. `404.html`: no canonical, no `og:url`; add `<meta name="robots" content="noindex">`.
3. New `sitemap.xml` in the repo root (standard sitemaps.org format), listing the 15 indexable pages with `<loc>` (full URL) and `<lastmod>` (date of this change, YYYY-MM-DD). Do not list `404.html`, anchors (`#products`, `#research`), `projects/chartered-latest.json`, placeholder images or `docs/`.
4. `README.md`: in "Adding a project", add a step: add the new page to `sitemap.xml` (and give it a canonical and `og:url`); when removing a page, remove it from `sitemap.xml`.
5. Search engine verification (Mark does this in Google Search Console and Bing Webmaster Tools): if Mark supplies a Google or Bing verification file or meta tag, add it exactly as given (file in the repo root, or tag in the `index.html` head). Do not invent one. Then Mark submits `https://two-tail-technologies.github.io/Website/sitemap.xml`.

**Do not:** add `robots.txt` in the repo (it would live at `/Website/robots.txt`, which search engines ignore on a project site; it belongs to the domain move).

**Acceptance:** every indexable page has exactly one canonical and one `og:url` matching its real URL; `sitemap.xml` is valid XML, lists exactly 15 URLs that all return 200; `404.html` has `noindex`.

### SEO-002: Titles and descriptions with topic terms

**Decision:** approved as proposed. Home (BRAND-001) and Projects (UX-002) titles are already specified; this covers the rest. Do these edits in the same pass as SEO-001.

**Titles** (keep the " | Two Tail Technologies" suffix):
- About: "About the founders"
- Contact: unchanged ("Contact")
- Chartered: "Chartered: a free city-builder and AI testbed"
- Consulto Bot: "Consulto Bot: cited answers from company procedures"
- Economic Planning Bot: "Economic Planning Bot: planner vs. market simulation"
- Stock Trader Bot: "Stock Trader Bot: ML strategy vs. index fund backtest"
- Company Profitability: "Company Profitability: forecasting from SEC filings"
- Development Likelihood: "Development Likelihood: predicting land development"
- Fly Connectome: "Fly Connectome: analyzing a complete brain wiring map"
- NJ Minimum Wage: "NJ Minimum Wage: effects on fast-food jobs and wages"
- NJ Political Contributions: "NJ Political Contributions: do donations predict contracts?"
- NJ Affordable Housing: "NJ Affordable Housing: forecasting town compliance"
- Conflict Forecasting: "Conflict Forecasting: news data and armed conflict"

**Descriptions:**
- Project pages: keep the existing research-question description and "A Two Tail Technologies project."; add the stage (for example "Idea stage." or, for Chartered, keep "Chartered 1.0.1 is out now for Windows, free.").
- About: "Two Tail Technologies was founded in 2026 by twins Aaron and Mark Scott, combining client-facing operations experience with development and data work."
- Contact: "Contact Aaron and Mark Scott of Two Tail Technologies about products, pilots, client work or collaboration."
- Update `og:title`, `og:description`, `twitter:title` and `twitter:description` to match on every changed page.

**Rules:** visible h1s do not change; no claims beyond what each page says; if DESIGN-004 renames stages, descriptions follow.

### CONTENT-003: Equal, parallel founder profiles

**Decisions from Mark:**
- Aaron is client and front facing; Mark is development and back-end facing.
- Project leads: Mark leads Chartered; Aaron leads Consulto Bot; the others are not yet assigned.
- Do not name Mark's employer.
- Include dates in Aaron's bio.
- Aaron has signed off on his bio changing.

**Proposed role labels (derived from Mark's description; confirm wording with Mark at implementation):**
- Aaron Scott: "Co-founder / client relations and operations"
- Mark Scott: "Co-founder / development and data"

Replace the current labels ("co-founder, business + politics" and "co-founder, academia + machine learning") on `index.html`, `about.html` and `contact.html`.

**Structure (both profiles, same order, about 90 to 120 words each):** name; role label; role at Two Tail (one line); background (2 to 3 sentences); what they bring (1 sentence); selected work (project links); LinkedIn / GitHub / website links (unchanged URLs).

**Draft: Aaron Scott**
> Role at Two Tail: Aaron leads client relationships and operations, and is the first point of contact for products, pilots and client work.
> Background: Aaron spent nearly a decade in restaurant operations ([FILL: years, e.g. 20XX to 20XX]), rising from crew member to new-restaurant opening trainer and multi-unit general manager, and trained district and general managers in Toyota Production System and Training Within Industry methods. He founded Backhouse Group, a restaurant operations consulting practice, in [FILL: year], and brings a background in political science, public policy and campaign work [FILL: dates if wanted].
> Brings to the work: [FILL: one sentence in Aaron's words, e.g. turning how frontline teams actually work into tools they will use].
> Selected work: Consulto Bot.

**Draft: Mark Scott**
> Role at Two Tail: Mark leads development and data work, from model design and testing to the software that ships.
> Background: Mark's research covers conflict, legislatures, forecasting and machine learning. He holds a Bachelor's in Political Science, with a minor in Policy Studies, from Montclair State University (2024), and has worked as a research assistant at Montclair State and at APPRISE. He works as a systems engineer in the home energy industry and is completing a Master's in Data Analytics at the University of Massachusetts, expected in May 2027.
> Brings to the work: [FILL: one sentence in Mark's words].
> Selected work: Chartered.

**Condition:** do not publish any `[FILL` text. Fill every marker from Mark and Aaron before the change is considered complete; if any remain, list them in the final report and tell Mark not to push until they are filled.

**Home page founders section:** two equal columns (photo placeholder, name, role label, the one-line "Role at Two Tail", link to the About profile), replacing the current narrow side box. Keep the existing "Who we are" paragraph (as edited by BRAND-001).

Note: DESIGN-003 (larger founder name styling) is pending. Keep the current name styling unless Mark approves DESIGN-003, but the new layout must not make one founder more prominent than the other.

---

## 4A. Approved but deferred (do NOT implement in this round)

### TECH-001: Custom domain and matching email

**Decision:** approved, but sequenced for later. This round improves the site on the current GitHub Pages address (`https://two-tail-technologies.github.io/Website/`). The custom domain move happens afterward, together with an update to the Chartered updater.

**For this round:**
- Do not create a `CNAME` file and do not change any absolute URLs to a new domain.
- Anything that needs an absolute URL (for example `og:image`, and the SEO-001 canonical, `og:url` and sitemap URLs) uses the current github.io address.
- Keep absolute URLs easy to find and replace later (one consistent base string).

**Later, in this order (separate future task):**
1. Mark updates the Chartered updater so new builds read the manifest from the new domain, and confirms the updater follows HTTP 301 redirects so already-shipped 1.0.x builds keep finding updates after the move.
2. Mark buys the domain and sets up email (forwarding first is fine).
3. Add `CNAME`, set DNS at the registrar, set the custom domain in GitHub Pages settings, enforce HTTPS (Mark does DNS and settings).
4. Replace the github.io base URL across the site, README, structured data and sitemap; restrict Web3Forms keys to the new domain when FUNC-001 option A happens.
5. Add a real `robots.txt` at the domain root.

**How SEO-001 changes after the move:**
- Replace the base URL `https://two-tail-technologies.github.io/Website/` with the new domain (for example `https://<domain>/`) in every canonical, `og:url`, `og:image`, `twitter:image` and in every `<loc>` in `sitemap.xml`; update `<lastmod>`.
- Add `robots.txt` at the domain root (repo root, now served at the domain root) containing `User-agent: *`, `Allow: /` and `Sitemap: https://<domain>/sitemap.xml`.
- Search Console: add the new domain as a property (a Domain property verified by a DNS TXT record covers http, https and www). If the github.io property was set up earlier, use Search Console's "Change of address" tool from the old property to the new one, then submit the new sitemap. Do the same in Bing Webmaster Tools (it can import from Search Console).
- GitHub's automatic 301 redirect from github.io to the custom domain covers old links and keeps search ranking signals; keep the redirect in place permanently (do not remove the custom domain setting).
- If a Google or Bing verification file or meta tag was added for the github.io property, it can be removed once the new property is verified.
- Check that old project URLs (including SEO-004 redirect stubs, if approved) still resolve through the redirect.

---

## 4B. Batch approval (2026-11-27) and answers to final questions

Mark approved every remaining recommendation with the option recommended in the audit report (Deliverables 2 and 4, same IDs), except FUNC-002, which is NOT APPROVED (keep the download counter as it is). Implementation is being done in the audit chat itself. Where earlier sections call an item "pending", this section supersedes them.

Answers that refine the approved items:
- Role labels confirmed: Aaron "Co-founder / client relations and operations"; Mark "Co-founder / development and data".
- Aaron's dates: restaurant operations 2016 to 2026; founded Backhouse Group in 2026; political and campaign work since 2024.
- "Brings to the work" lines: drafted by Claude, marked for Mark's and Aaron's sign-off.
- UX-003: "We usually reply within two business days." Add an optional "What is this about?" select to the (currently hidden) form.
- PRIV-001: retention wording "We keep messages only as long as needed to reply and follow up." New page `privacy.html`, linked from the footer and the contact page; add it to the sitemap.
- UX-002 topics confirmed as listed in Section 4.
- DESIGN-004: stages are Idea / Under development / Released. Styling: Released orange, Under development ink, Idea muted.
- DESIGN-001: Chartered hero is a still only (no loop for now). Candidate frames go to an untracked `_frames/` folder in the repo, deleted afterward.
- ACCESS-002: darken the signal color to #A8380A now (Aaron signed off). DESIGN-002: no slate accent and no texture change.
- RESP-002: symbol-only logo below 480 px so the four nav links fit.
- README: update wherever behavior changes.
- TECH-002/TECH-004: add `tools/check_site.py` (standard library only).
- SEO-001: Search Console and Bing after the domain move.
- PERF-002: run PageSpeed Insights after the push (needs the live site).
- SEC-001: Mark's own GitHub setting. SEC-002: no site change.
- CONTENT-004: full method on About; compact method plus link on Home; project pages keep their project-specific testing text.

---

## 5. Pending items

None. Every recommendation now has a decision.

---

## 6. Open questions to resolve with Mark during implementation

1. Confirm the role label wording for both founders (CONTENT-003).
2. Supply all `[FILL]` facts for both bios, including Aaron's dates (CONTENT-003).
3. Confirm the research topic assignment (UX-002).
4. Choose Chartered frames and whether to use a hero loop (DESIGN-001).
5. Whether the stage vocabulary should change (Released / In progress / Idea): that is DESIGN-004, pending.
6. Search Console and Bing verification: set up now on github.io (then use Change of address later), or wait for the custom domain? If Mark provides a verification file or tag, add it (SEO-001 step 5).

---

## 7. Phase 4 testing checklist (after implementation)

- [ ] Every page loads locally with no console errors (`python -m http.server 8000` from the repo root, then open http://localhost:8000/).
- [ ] All internal links resolve, including the new `#products` and `#research` anchors and every "Back to" link.
- [ ] Navigation is identical on all 16 pages, with correct relative paths inside `projects/` and correct `aria-current`.
- [ ] No horizontal scroll at 320, 375, 768, 1024 and 1440 px on Home, Projects, About and Contact.
- [ ] The topic filter works, updates `aria-pressed`, and all cards are visible without JavaScript.
- [ ] The contact page shows the LinkedIn notice and hides the form with empty keys.
- [ ] `grep -rn "NEEDS\|\[FILL" --include=*.html .` returns nothing (or every remaining item is listed for Mark).
- [ ] Every new image has `width`, `height` and meaningful `alt`; the hero loop respects reduced motion.
- [ ] Heading order is h1, h2, h3 on every changed page.
- [ ] `projects/chartered-latest.json` and the Chartered download links are unchanged.
- [ ] Report: summary of modifications per ID, anything unresolved, and the Git commands below.

**Git commands for Mark (run these yourself after reviewing).** The `git restore --staged` line keeps this brief out of the commit (see Section 8); drop it if you want the brief published.

```
cd C:\Users\markg\Documents\TTT\Website
git status
git diff
git add -A
git restore --staged docs/website-audit-implementation-brief.md
git commit -m "Website: approved audit changes (FUNC-001, CONTENT-001, BRAND-001, CONTENT-002, UX-001, UX-002, DESIGN-001, CONTENT-003, CONTENT-005, SEO-001, SEO-002)"
git push origin main
```

---

## 8. Note about this file

GitHub Pages serves every file in this repository publicly. If this file is committed and pushed, it will be readable at https://two-tail-technologies.github.io/Website/docs/website-audit-implementation-brief.md. Leave it uncommitted, or add `docs/` to a `.gitignore`, if it should stay private.
