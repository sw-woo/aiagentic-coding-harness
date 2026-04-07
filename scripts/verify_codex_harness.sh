#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "[verify] codex harness files"
test -f .codex/config.toml
test -f .codex/hooks.json
test -f .codex/rules/default.rules
test -f .codex/agents/reviewer.toml
test -f .codex/agents/docs-researcher.toml
test -f .codex/agents/verifier.toml
test -f .codex/agents/content-editor.toml
test -f .agents/skills/review/SKILL.md
test -f .agents/skills/verify/SKILL.md
test -f .agents/skills/site-content/SKILL.md
test -f .agents/skills/source-research/SKILL.md

echo "[verify] lint"
npm run lint

echo "[verify] build (webpack fallback for local reproducibility)"
npx next build --webpack

echo "[verify] done"
