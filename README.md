# Two Tail Technologies website

The public website for Two Tail Technologies, served by GitHub Pages at
https://two-tail-technologies.github.io/Website/

Plain HTML, CSS and JavaScript. No build step, no frameworks.

## Layout

```
index.html                  Home: hero, what we do, products, method, founders, contact band
projects.html               Products (#products) and the research pipeline (#research) with a topic filter
projects/<name>.html        One page per project
projects/howell.html        Redirect to chartered.html (old URL)
projects/stock-trader.html  Redirect to stock-trader-bot.html (old URL)
about.html                  Full method (#how-we-work) and both founders' profiles
contact.html                Contact routes; the contact form appears once both Web3Forms keys are set
privacy.html                What the site collects and which outside services it uses
404.html                    Not-found page (noindex)
sitemap.xml                 Every indexable page, for search engines
assets/css/tokens.css       Colors, fonts (self-hosted @font-face) and spacing
assets/css/components.css   Shared pieces: header, footer, buttons, cards, tags, stages
assets/css/site.css         Page layout
assets/js/site.js           Research topic filter; opens collapsed sections on the Chartered page from # links
assets/js/contact.js        Contact form (Web3Forms)
assets/js/downloads.js      Download counter on the Chartered page (GitHub release download counts)
assets/fonts/               IBM Plex Sans and Mono (WOFF2, Latin subset) and their OFL licenses
assets/img/                 Logos, favicon and the default social preview image
assets/img/chartered/       Chartered screenshots and the Chartered social preview image
assets/img/placeholders/    Placeholder images to replace (see below)
projects/chartered-latest.json  The newest Chartered version, read by the game to offer updates
tools/check_site.py         Consistency checks to run before each push
.nojekyll                   Tells GitHub Pages to serve files as-is
```

Every page repeats the same header (Products / Research / About / Contact) and footer. A change to either
must be made in all pages; `tools/check_site.py` reports any page that differs from `index.html`.

## Preview locally

Any static file server works. From this folder:

- Python: `python -m http.server 8000`, then open http://localhost:8000/
- R: `servr::httd(".")`

## Before each push

```
python tools/check_site.py
```

It checks that headers and footers match, every internal link and #anchor resolves, no `NEEDS:` or
`[FILL` markers remain, every indexable page has a correct canonical URL and is in `sitemap.xml`, and the
Chartered version in `projects/chartered-latest.json` matches the pages.

## Adding a project

1. Copy an existing page in `projects/` and rename it (lowercase, hyphenated).
2. Edit the title, stage, summary and sections, plus the head: `<title>`, description, canonical,
   `og:url` and the other `og:` / `twitter:` tags.
3. Add it to `sitemap.xml`.
4. Add a card for it on `projects.html`:
   - A product goes in the Products section as a feature block (image beside text).
   - A research project goes in the Research pipeline grid with `data-topic="markets"`, `"policy"` or
     `"science"`; the topic drives the filter.
5. Stages are only Idea, Under development and Released (classes `tt-status-idea`, `tt-status-dev`,
   `tt-status-released`). A released project's stage line names the version, for example
   "Released 1.0.1: out now, free".
6. If the research count changes, update "nine scoped studies" and "See all 9 research projects" on
   `index.html` and the description on `projects.html`.
7. Run `python tools/check_site.py`.

When removing a page, remove it from `sitemap.xml` and consider a redirect page like `projects/howell.html`.

## Replacing placeholder images

Placeholders show their own file name and target size. Replace each with a real image and update the
`src`, `width`, `height` and `alt` where it is used.

| Placeholder | Used on | Target |
| --- | --- | --- |
| `assets/img/placeholders/founder-aaron-scott.svg` | Home founders, About | Square photo, 800 x 800, WebP or JPG |
| `assets/img/placeholders/founder-mark-scott.svg` | Home founders, About | Square photo, 800 x 800, WebP or JPG |
| `assets/img/placeholders/consulto-bot-diagram.svg` | Home and Projects product card, Consulto Bot page | 1600 x 900, WebP |
| `assets/img/placeholders/chartered-agents-screen.svg` | Chartered page gallery | 1600 x 900, WebP |

Use the same crop and size for both founder photos.

## Contact form

The form sends through Web3Forms, so neither of our email addresses appears on the site.
Each of us gets a free access key at https://web3forms.com and pastes it into
`CONTACT_KEYS` in `assets/js/contact.js`. Until both keys are in, the form stays hidden and the
contact page shows a notice with our LinkedIn links instead. Once both keys are in, the form appears
automatically. Then restrict each key to the site's domain in the Web3Forms dashboard.

## Releasing a new Chartered version

In this order, so the game never offers a download that isn't there yet:

1. Create a release on this repository, tag `chartered-v<version>`, with `Chartered-Setup-<version>.exe` attached.
2. Download it once from GitHub and check `certutil -hashfile Chartered-Setup-<version>.exe SHA256` against the
   `sha256` in the game's `build/chartered-latest.json` (made by `tools/update_manifest.py`).
3. Copy that file over `projects/chartered-latest.json`, update the version, links, size and SHA-256 on
   `projects/chartered.html` (download section and the "Verifying your download" section), the stage line
   ("Released <version>: out now, free") on `index.html`, `projects.html` and `projects/chartered.html`, and the
   `softwareVersion` and `downloadUrl` in the Chartered page's structured data. Run `python tools/check_site.py`,
   then commit and push.

## Publishing

GitHub Pages settings: Source "Deploy from a branch", branch `main`, folder `/ (root)`.
Pushing to `main` publishes the site within a minute or two.

## Later: moving to a custom domain

Planned after the current changes, together with a Chartered updater update. Replace the base URL
`https://two-tail-technologies.github.io/Website/` everywhere (canonicals, `og:` tags, structured data,
`sitemap.xml`, `tools/check_site.py`), add a `CNAME` file and a root `robots.txt`, and confirm shipped
Chartered builds still find `chartered-latest.json` through GitHub's redirect.
