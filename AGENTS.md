# AGENTS.md

This is a Jekyll site documenting [Strom](https://github.com/Bloodwing1/Strom),
a smart-heating script. The Strom source lives at `~/Strom/`.

## Source of truth

The docs must describe what Strom actually does now. Strom evolves and these
pages drift behind it.

- Before writing or editing a page, read the relevant parts of `~/Strom/`:
  `README.md`, `pyproject.toml`, the `strom/` package, and `tests/`.
- Every command, flag, file name, and default value on a page must be
  verifiable in `~/Strom/`. If you notice drift on a page you are not otherwise
  editing, fix it.
- Do not invent parameters, defaults, or roadmap items. If the code does not
  show it, do not write it.

Done condition: every factual claim on the page you touched matches `~/Strom/`
as it exists now.

## Pages

- Doc pages are posts in `_posts/`, named `YYYY-MM-DD-slug.md`.
- Front matter: `layout: post`, a `title`, a `date` (past dates only — Jekyll
  silently hides future-dated posts), `categories: docs`.
- `permalink: /:slug` in `_config.yml` means a post's URL is
  `/strom-docs/<slug>`. Existing pages link to each other by slug.
- Site settings live in `_config.yml`, styling in `assets/`, the landing page
  in `index.md`.
- The build uses the `github-pages` gem, so only its whitelisted plugins are
  available.

## Checks

CI (`.github/workflows/ci.yml`) runs `script/check` on every push and pull
request: front matter and translation-pairing checks (`script/check-front-matter`),
a strict `jekyll build`, and html-proofer over the built site. Run
`script/check` locally before committing content or template changes. A page
rendering in `jekyll serve` does not catch a renamed slug, a future-dated post,
or a dead language-switch link.

## Preview

```sh
bundle exec jekyll serve
```

Open http://127.0.0.1:4000/strom-docs/ and confirm the page you changed
renders. This is the done condition for any edit.

`.mise.toml` pins Ruby 3.3 (the pinned `github-pages` gem set predates Ruby
4). With mise active, plain `bundle exec jekyll serve` just works; `webrick`
is in the Gemfile because it left the Ruby standard library.

## Writing style

Readers are Strom users, not control theorists.

- Short sentences, plain words. Explain jargon (e.g. "convex optimization",
  "day-ahead prices") the first time it appears.
- One idea per section, ordered as the reader will use it: install, then
  configure, then run.
- Concrete examples over abstract description: show the command, the file, the
  output.
- Prefer the simplest accurate explanation. If a detail needs caveats to stay
  true, leave it out rather than hedge.
