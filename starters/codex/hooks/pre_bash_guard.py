#!/usr/bin/env python3
"""
위험한 Bash 명령을 사전에 차단하는 Codex PreToolUse 훅입니다.

Exit 코드:
  0 = 통과
  2 = 차단 (Codex 가 해당 도구 호출을 거부합니다)

입력: stdin JSON — { "tool_input": { "command": "..." } }
"""

from __future__ import annotations

import json
import re
import sys


def main() -> int:
    try:
        payload = json.load(sys.stdin)
    except (json.JSONDecodeError, ValueError):
        return 0

    command = (payload.get("tool_input") or {}).get("command", "")
    if not command:
        return 0

    blocked_patterns = [
        r"\brm\s+-rf\b",
        r"\brm\s+-r\s+/",
        r"\bgit\s+reset\s+--hard\b",
        r"\bgit\s+push\s+--force\b",
        r"\bgit\s+push\s+-f\b",
        r"\bgit\s+clean\s+-fd\b",
        r"\bterraform\s+(apply|destroy)\b",
        r"\bkubectl\s+delete\b",
        r"\bhelm\s+uninstall\b",
        r"\bvercel\s+--prod\b",
        r"\bvercel\s+remove\b",
        r"\bDROP\s+TABLE\b",
        r"\bTRUNCATE\s+TABLE\b",
        r"\bsudo\b",
    ]

    for pattern in blocked_patterns:
        if re.search(pattern, command, re.IGNORECASE):
            print(
                f"BLOCKED: 위험 명령 감지 — `{pattern}`\n"
                f"차단된 명령: {command}",
                file=sys.stderr,
            )
            return 2

    return 0


if __name__ == "__main__":
    sys.exit(main())
