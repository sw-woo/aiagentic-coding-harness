#!/usr/bin/env bash
# PostToolUse hook for Claude Code — runs ESLint on modified .tsx/.ts files.
#
# Matches: Write | Edit | MultiEdit
# Reads payload from stdin JSON and extracts the modified file path.
# Only runs `pnpm exec eslint` if the file is under src/ and ends in .tsx|.ts|.mdx.
# Silent on success, prints errors on lint failure (non-blocking — exit 0 always,
# because post-edit lint failures should surface as advice, not block the edit).

set -u

if ! command -v pnpm >/dev/null 2>&1; then
  exit 0
fi

ROOT="${CLAUDE_PROJECT_DIR:-$(git rev-parse --show-toplevel 2>/dev/null || pwd)}"
cd "$ROOT" || exit 0

# Read stdin JSON payload and extract file path
PAYLOAD="$(cat 2>/dev/null || true)"
if [ -z "$PAYLOAD" ]; then
  exit 0
fi

# Extract tool_input.file_path or tool_input.path via python (already a dep for other hooks)
FILE_PATH="$(printf '%s' "$PAYLOAD" | /usr/bin/python3 -c '
import json, sys
try:
    data = json.loads(sys.stdin.read())
    ti = data.get("tool_input", {}) or {}
    print(ti.get("file_path") or ti.get("path") or "")
except Exception:
    print("")
' 2>/dev/null || echo "")"

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Only lint source files we care about
case "$FILE_PATH" in
  *src/*.tsx|*src/*.ts|*src/*.mdx)
    ;;
  *)
    exit 0
    ;;
esac

# Normalize to relative path
REL_PATH="${FILE_PATH#"$ROOT/"}"
if [ ! -f "$REL_PATH" ]; then
  exit 0
fi

# Run eslint quietly; only print if there are errors
if ! pnpm exec eslint --no-warn-ignored "$REL_PATH" >/tmp/claude-post-lint.log 2>&1; then
  echo "⚠️  ESLint 경고 발생 — $REL_PATH"
  cat /tmp/claude-post-lint.log
fi

exit 0
