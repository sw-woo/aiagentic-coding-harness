#!/usr/bin/env python3
"""
Codex 세션 시작 시 짧은 저장소 컨텍스트를 출력합니다.
"""

from __future__ import annotations

print(
    "\n".join(
        [
            "Site harness context:",
            "- Read AGENTS.md before editing code.",
            "- Prefer handbook / guide / playbook for site information architecture context.",
            "- Verify with `npm run lint` and `npm run build` after meaningful changes.",
            "- This repository now includes minimal tracked `.codex/` harness files for demonstration and real use.",
        ]
    )
)
