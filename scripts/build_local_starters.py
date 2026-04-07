#!/usr/bin/env python3
"""
이 저장소에 실제로 들어 있는 starter 파일을 JSON으로 내보냅니다.

목적:
- 카탈로그에서 바로 복사/다운로드할 수 있는 tracked starter를 정적으로 제공
- 런타임 fs read를 없애 Turbopack 추적 경고를 줄임
"""

from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "data" / "catalog" / "local-starters.json"

STARTERS = {
    "skills": [
        {
            "id": "starter-codex-review-skill",
            "name": "review",
            "platform": "codex",
            "path": ".agents/skills/review/SKILL.md",
            "description": "문서/페이지 변경을 검토하는 최소 Codex skill starter",
        },
        {
            "id": "starter-codex-verify-skill",
            "name": "verify",
            "platform": "codex",
            "path": ".agents/skills/verify/SKILL.md",
            "description": "변경 후 최소 검증 절차를 정리한 Codex skill starter",
        },
        {
            "id": "starter-claude-review-skill",
            "name": "review",
            "platform": "claude-code",
            "path": ".claude/skills/review/SKILL.md",
            "description": "읽기 전용 변경 검토용 Claude skill starter",
        },
    ],
    "agents": [
        {
            "id": "starter-codex-reviewer-agent",
            "name": "reviewer",
            "platform": "codex",
            "path": ".codex/agents/reviewer.toml",
            "description": "읽기 전용 reviewer Codex subagent starter",
        },
        {
            "id": "starter-codex-verifier-agent",
            "name": "verifier",
            "platform": "codex",
            "path": ".codex/agents/verifier.toml",
            "description": "검증 전용 Codex subagent starter",
        },
        {
            "id": "starter-claude-content-reviewer-agent",
            "name": "content-reviewer",
            "platform": "claude-code",
            "path": ".claude/agents/content-reviewer.md",
            "description": "문서/가독성 검토용 Claude agent starter",
        },
    ],
    "hooks": [
        {
            "id": "starter-codex-hooks-config",
            "name": "codex hooks.json",
            "platform": "codex",
            "path": ".codex/hooks.json",
            "description": "SessionStart / PreToolUse 최소 Codex hooks starter",
        },
        {
            "id": "starter-codex-pre-bash-guard",
            "name": "pre_bash_guard.py",
            "platform": "codex",
            "path": ".codex/hooks/pre_bash_guard.py",
            "description": "위험한 bash 차단용 Codex hook script starter",
        },
        {
            "id": "starter-claude-settings-json",
            "name": "settings.json",
            "platform": "claude-code",
            "path": ".claude/settings.json",
            "description": "permissions + hooks를 함께 포함한 Claude starter",
        },
    ],
    "rules": [
        {
            "id": "starter-codex-default-rules",
            "name": "default.rules",
            "platform": "codex",
            "path": ".codex/rules/default.rules",
            "description": "forbidden / prompt 중심의 최소 Codex rules starter",
        },
        {
            "id": "starter-claude-security-rule",
            "name": "security.md",
            "platform": "claude-code",
            "path": ".claude/rules/security.md",
            "description": "보안과 위험 명령 규칙을 담은 Claude rule starter",
        },
    ],
}


def with_content(item: dict) -> dict:
    content = (ROOT / item["path"]).read_text(encoding="utf-8")
    return {**item, "content": content}


def main() -> int:
    result = {key: [with_content(item) for item in value] for key, value in STARTERS.items()}
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(result, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {OUTPUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
