# Two Tail Technologies website

The public website for Two Tail Technologies, served by GitHub Pages at
https://two-tail-technologies.github.io/Website/

Plain HTML, CSS and JavaScript. No build step, no frameworks.

## Layout

```
index.html                  Home: headline, method, current work, who we are
projects.html               Every project as a card, with a status filter
projects/<name>.html        One page per project
about.html                  The company, how we work and both founders' profiles
contact.html                Contact form (sends to Aaron, Mark or both) and links
404.html                    Not-found page
assets/css/tokens.css       Colors, fonts and spacing
assets/css/components.css   Shared pieces: header, footer, buttons, cards, tags
assets/css/site.css         Page layout
assets/js/site.js           Status filter on projects.html
assets/js/contact.js        Contact form (Web3Forms)
assets/js/downloads.js      Download counter on the Chartered page (GitHub release download counts)
projects/chartered-latest.json  The newest Chartered version, read by the game to offer updates
assets/img/                 Logos, favicon and the social preview image
.nojekyll                   Tells GitHub Pages to serve files as-is
```

## Preview locally

Any static file server works. From this folder:

- Python: `python -m http.server 8000`, then open http://localhost:8000/
- R: `servr::httd(".")`

## Adding a project

1. Copy an existing page in `projects/` and rename it (lowercase, hyphenated).
2. Edit the title, status, summary and sections, plus the description tags in the page head.
3. Add a card for it in `projects.html`. The card's `data-status` (`released`, `progress` or
   `idea`) drives the filter. Status words are only Released, In progress and Idea; a released
   project's card and page name the version, for example "1.0.0: out now, free".
4. To feature it on the home page, add the same card to the current work list in `index.html`,
   and update the project count in the "See all projects" link.

## Contact form

The form sends through Web3Forms, so neither of our email addresses appears on the site.
Each of us gets a free access key at https://web3forms.com and pastes it into
`CONTACT_KEYS` in `assets/js/contact.js`. Until both keys are in, the form tells
visitors it isn't switched on yet and points them to LinkedIn.

## Releasing a new Chartered version

In this order, so the game never offers a download that isn't there yet:

1. Create a release on this repository, tag `chartered-v<version>`, with `Chartered-Setup-<version>.exe` attached.
2. Download it once from GitHub and check `certutil -hashfile Chartered-Setup-<version>.exe SHA256` against the
   `sha256` in the game's `build/chartered-latest.json` (made by `tools/update_manifest.py`).
3. Copy that file over `projects/chartered-latest.json`, update the version, links, size and SHA-256 on
   `projects/chartered.html` and the status line on `index.html` and `projects.html`, then commit and push.

## Publishing

GitHub Pages settings: Source "Deploy from a branch", branch `main`, folder `/ (root)`.
Pushing to `main` publishes the site within a minute or two.
