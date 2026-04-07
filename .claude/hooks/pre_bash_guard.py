#!/usr/bin/env python3
"""
PreToolUse hook for Claude Code — blocks dangerous Bash commands before execution.

Exit codes:
  0 = allow (normal)
  2 = block (Claude Code will refuse the tool call)

Payload shape (stdin JSON):
  {
    "tool_name": "Bash",
    "tool_input": { "command": "..." }
  }

We also fall back to the legacy $CLAUDE_TOOL_INPUT env var for older Claude Code
versions, just in case.
"""
from __future__ import annotations

import json
import os
import re
import sys

DENY_PATTERNS = [
    # Destructive filesystem
    r"\brm\s+-rf\b",
    r"\brm\s+-r\s+/",
    r"\bshutil\.rmtree\b",
    # Git destructive
    r"\bgit\s+push\s+--force\b",
    r"\bgit\s+push\s+-f\b",
    r"\bgit\s+reset\s+--hard\b",
    r"\bgit\s+clean\s+-fd\b",
    r"\bgit\s+checkout\s+--\s+",
    # Vercel production
    r"\bvercel\s+--prod\b",
    r"\bvercel\s+remove\b",
    r"\bvercel\s+rollback\b",
    # Infra
    r"\bkubectl\s+delete\b",
    r"\bterraform\s+apply\b",
    r"\bterraform\s+destroy\b",
    r"\bhelm\s+uninstall\b",
    # SQL
    r"\bDROP\s+TABLE\b",
    r"\bTRUNCATE\s+TABLE\b",
    # Privilege
    r"\bsudo\b",
]


def read_payload() -> dict:
    """Read tool payload from stdin (preferred) or env var (legacy fallback)."""
    # Preferred: Claude Code current protocol sends JSON on stdin.
    try:
        if not sys.stdin.isatty():
            raw = sys.stdin.read()
            if raw.strip():
                return json.loads(raw)
    except (json.JSONDecodeError, OSError):
        pass

    # Legacy fallback: some older setups used the TOOL_INPUT env var.
    legacy = os.environ.get("CLAUDE_TOOL_INPUT") or os.environ.get("TOOL_INPUT")
    if legacy:
        try:
            return {"tool_input": json.loads(legacy)}
        except json.JSONDecodeError:
            return {}

    return {}


def extract_command(payload: dict) -> str:
    """Extract the Bash command string from the payload."""
    tool_input = payload.get("tool_input") or payload.get("input") or payload
    if isinstance(tool_input, dict):
        return str(tool_input.get("command", ""))
    return str(tool_input or "")


def main() -> int:
    payload = read_payload()
    command = extract_command(payload)
    if not command:
        return 0

    for pattern in DENY_PATTERNS:
        if re.search(pattern, command, re.IGNORECASE):
            print(
                f"BLOCKED: 위험한 명령 감지 — pattern `{pattern}`\n"
                f"차단된 명령: {command}\n"
                f"실행하려면 사용자 확인을 직접 받으십시오.",
                file=sys.stderr,
            )
            return 2  # 2 = Claude Code blocks the tool call

    return 0


if __name__ == "__main__":
    sys.exit(main())
