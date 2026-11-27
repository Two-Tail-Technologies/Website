"""Consistency checks for the Two Tail Technologies website.

Run from the repository root before each push:

    python tools/check_site.py

Checks:
  - every page has the same header and footer as index.html (ignoring ../ prefixes)
  - every internal link and asset resolves to a file, and every #anchor exists
  - no "NEEDS:" or "[FILL" markers remain in any HTML page
  - every indexable page has a canonical URL that matches its path, and is listed in sitemap.xml
  - the Chartered version in projects/chartered-latest.json appears on the pages that mention it

Standard library only. Exits with status 1 if any check fails.
"""
import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
BASE_URL = "https://two-tail-technologies.github.io/Website/"
MARKERS = ("NEEDS:", "[FILL")
NOINDEX_PAGES = {"404.html"}


class LinkCollector(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.ids = set()
        self.isRedirect = False

    def handle_starttag(self, tag, attrs):
        attrMap = dict(attrs)
        if "id" in attrMap:
            self.ids.add(attrMap["id"])
        if tag == "meta" and attrMap.get("http-equiv", "").lower() == "refresh":
            self.isRedirect = True
        for name in ("href", "src", "srcset"):
            if name in attrMap and attrMap[name]:
                self.links.append(attrMap[name].split()[0])


def list_pages():
    return sorted([p for p in REPO_ROOT.glob("*.html")] + [p for p in (REPO_ROOT / "projects").glob("*.html")])


def parse_page(path):
    collector = LinkCollector()
    collector.feed(path.read_text(encoding="utf-8"))
    return collector


def block(text, start, end):
    match = re.search(re.escape(start) + r".*?" + re.escape(end), text, re.S)
    return match.group(0) if match else ""


def normalize_shared(text):
    text = text.replace("../", "")
    return re.sub(r' aria-current="page"', "", text)


def main():
    problems = []
    pages = list_pages()
    parsed = {p: parse_page(p) for p in pages}
    contentPages = [p for p in pages if not parsed[p].isRedirect]

    indexText = (REPO_ROOT / "index.html").read_text(encoding="utf-8")
    refHeader = normalize_shared(block(indexText, "<header", "</header>"))
    refFooter = normalize_shared(block(indexText, "<footer", "</footer>"))

    for page in contentPages:
        rel = page.relative_to(REPO_ROOT).as_posix()
        text = page.read_text(encoding="utf-8")
        if normalize_shared(block(text, "<header", "</header>")) != refHeader:
            problems.append(f"{rel}: header differs from index.html")
        if normalize_shared(block(text, "<footer", "</footer>")) != refFooter:
            problems.append(f"{rel}: footer differs from index.html")
        for marker in MARKERS:
            if marker in text:
                problems.append(f"{rel}: contains placeholder marker {marker!r}")

        for link in parsed[page].links:
            if re.match(r"^(https?:|mailto:|tel:|data:|//)", link):
                continue
            target, _, anchor = link.partition("#")
            target = target.split("?")[0]
            targetPath = page if not target else (page.parent / target).resolve()
            if rel == "404.html" and target:
                targetPath = (REPO_ROOT / target).resolve()  # 404 uses a <base> at the site root
            if not targetPath.exists():
                problems.append(f"{rel}: broken link {link}")
                continue
            if anchor and targetPath.suffix == ".html":
                targetIds = parsed.get(targetPath, parse_page(targetPath)).ids
                if anchor not in targetIds:
                    problems.append(f"{rel}: missing anchor #{anchor} in {targetPath.relative_to(REPO_ROOT).as_posix()}")

    sitemapText = (REPO_ROOT / "sitemap.xml").read_text(encoding="utf-8")
    sitemapUrls = set(re.findall(r"<loc>(.*?)</loc>", sitemapText))
    for page in contentPages:
        rel = page.relative_to(REPO_ROOT).as_posix()
        if rel in NOINDEX_PAGES:
            continue
        expectedUrl = BASE_URL + ("" if rel == "index.html" else rel)
        text = page.read_text(encoding="utf-8")
        canonical = re.search(r'<link rel="canonical" href="([^"]+)">', text)
        if not canonical or canonical.group(1) != expectedUrl:
            problems.append(f"{rel}: canonical missing or not {expectedUrl}")
        if expectedUrl not in sitemapUrls:
            problems.append(f"{rel}: not listed in sitemap.xml")
    for url in sitemapUrls:
        rel = url.replace(BASE_URL, "") or "index.html"
        if not (REPO_ROOT / rel).exists():
            problems.append(f"sitemap.xml: lists missing page {url}")

    manifest = json.loads((REPO_ROOT / "projects" / "chartered-latest.json").read_text(encoding="utf-8"))
    version = manifest["version"]
    for rel, needle in (("index.html", f"Released {version}"), ("projects.html", f"Released {version}"),
                        ("projects/chartered.html", f"Released {version}"),
                        ("projects/chartered.html", f"chartered-v{version}/Chartered-Setup-{version}.exe")):
        if needle not in (REPO_ROOT / rel).read_text(encoding="utf-8"):
            problems.append(f"{rel}: does not mention {needle!r} (chartered-latest.json says {version})")

    if problems:
        print(f"{len(problems)} problem(s) found:")
        for problem in problems:
            print("  - " + problem)
        return 1
    print(f"All checks passed ({len(contentPages)} pages, {len(sitemapUrls)} sitemap URLs, Chartered {version}).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
