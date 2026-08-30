---
layout: post
title:  "Contributing"
date:   2025-03-09 12:57:47 +0100
categories: docs
lang: en
ref: contributing
---
Contributions to Strom are welcome! Please first open an issue to discuss the idea/change you have in mind.

After that you can propose changes by:
1. Fork the repository
2. Create a feature branch
3. Submit a pull request with a clear description of your changes

## Development setup

```bash
git clone https://github.com/Bloodwing1/Strom.git
cd Strom
mise run install   # creates the venv, installs Strom with dev tooling, sets up git hooks
```

If you don't use [mise](https://mise.jdx.dev/): create a Python 3.12.8 virtual environment and run `pip install -e ".[dev]"`.

The most useful commands (all defined in `.mise.toml`):

- `mise run check` — lint, type-check and deterministic tests; this is what CI blocks on
- `mise run test-integration` — live provider canaries (requires API keys)
- `mise run mutation` — mutation testing of the safety-critical modules (slow)

Git hooks (via [husky](https://typicode.github.io/husky/)) run the linter on commit and the full check on push; enable them with `mise run hooks`. The tests in `tests/` run without network access or API keys, so they are safe to run locally at any time.
