# Two Tail Technologies website

The public website for Two Tail Technologies, served by GitHub Pages at
https://two-tail-technologies.github.io/Website/

Plain HTML, CSS and JavaScript. No build step, no frameworks.

## Layout

```
index.html            Home and About
projects.html         Sortable, filterable project grid
projects/<name>.html  One page per project
contact.html          Contact details for Mark and Aaron
404.html              Not-found page
assets/css/site.css   All styles
assets/js/site.js     Mobile menu, project sorting and filtering
assets/img/           Favicon and images
.nojekyll             Tells GitHub Pages to serve files as-is
```

## Preview locally

Any static file server works. From this folder:

- Python: `python -m http.server 8000`, then open http://localhost:8000/
- R: `servr::httd(".")`

## Adding a project

1. Copy an existing page in `projects/` and rename it (lowercase, hyphenated).
2. Edit the title, status, summary and sections.
3. Add a card for it in `projects.html`. The card's `data-status`, `data-rank`
   (0 in progress, 1 idea, 2 shelved) and `data-started` (YYYY-MM-DD) attributes drive sorting.
4. To feature it on the home page, add the same card to the "Current projects" list in `index.html`.

## Publishing

GitHub Pages settings: Source "Deploy from a branch", branch `main`, folder `/ (root)`.
