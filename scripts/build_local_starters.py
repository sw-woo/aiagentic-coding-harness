#!/usr/bin/env python3
"""
이 저장소가 제공하는 copy-ready starter source를 JSON으로 내보냅니다.

목적:
- 카탈로그에서 바로 복사/다운로드할 수 있는 tracked starter를 정적으로 제공
- 런타임 fs read를 없애 Turbopack 추적 경고를 줄임
- live runtime 설정과 copy-ready starter 예시가 서로 덮어쓰지 않게 분리
"""

from __future__ import annotations

import argparse
import json
from pathlib import Path
import sys

ROOT = Path(__file__).resolve().parent.parent
OUTPUT = ROOT / "data" / "catalog" / "local-starters.json"

STARTERS = {
    "skills": [
        {
            "id": "starter-codex-review-skill",
            "name": "review",
            "platform": "codex",
            "path": ".agents/skills/review/SKILL.md",
            "source_path": "starters/codex/skills/review/SKILL.md",
            "description": "문서/페이지 변경을 검토하는 최소 Codex skill starter",
        },
        {
            "id": "starter-codex-verify-skill",
            "name": "verify",
            "platform": "codex",
            "path": ".agents/skills/verify/SKILL.md",
            "source_path": "starters/codex/skills/verify/SKILL.md",
            "description": "변경 후 최소 검증 절차를 정리한 Codex skill starter",
        },
        {
            "id": "starter-claude-review-skill",
            "name": "review",
            "platform": "claude-code",
            "path": ".claude/skills/review/SKILL.md",
            "source_path": "starters/claude/skills/review/SKILL.md",
            "description": "읽기 전용 변경 검토용 Claude skill starter",
        },
    ],
    "agents": [
        {
            "id": "starter-codex-reviewer-agent",
            "name": "reviewer",
            "platform": "codex",
            "path": ".codex/agents/reviewer.toml",
            "source_path": "starters/codex/agents/reviewer.toml",
            "description": "읽기 전용 reviewer Codex subagent starter",
        },
        {
            "id": "starter-codex-verifier-agent",
            "name": "verifier",
            "platform": "codex",
            "path": ".codex/agents/verifier.toml",
            "source_path": "starters/codex/agents/verifier.toml",
            "description": "검증 전용 Codex subagent starter",
        },
        {
            "id": "starter-claude-content-reviewer-agent",
            "name": "content-reviewer",
            "platform": "claude-code",
            "path": ".claude/agents/content-reviewer.md",
            "source_path": "starters/claude/agents/content-reviewer.md",
            "description": "문서/가독성 검토용 Claude agent starter",
        },
    ],
    "hooks": [
        {
            "id": "starter-codex-hooks-config",
            "name": "codex hooks.json",
            "platform": "codex",
            "path": ".codex/hooks.json",
            "source_path": "starters/codex/hooks/hooks.json",
            "description": "SessionStart / PreToolUse 최소 Codex hooks starter",
        },
        {
            "id": "starter-codex-pre-bash-guard",
            "name": "pre_bash_guard.py",
            "platform": "codex",
            "path": ".codex/hooks/pre_bash_guard.py",
            "source_path": "starters/codex/hooks/pre_bash_guard.py",
            "description": "위험한 bash 차단용 Codex hook script starter",
        },
        {
            "id": "starter-claude-settings-json",
            "name": "settings.json",
            "platform": "claude-code",
            "path": ".claude/settings.json",
            "source_path": "starters/claude/settings.json",
            "description": "permissions + hooks를 함께 포함한 Claude starter",
        },
    ],
    "rules": [
        {
            "id": "starter-codex-default-rules",
            "name": "default.rules",
            "platform": "codex",
            "path": ".codex/rules/default.rules",
            "source_path": "starters/codex/rules/default.rules",
            "description": "forbidden / prompt 중심의 최소 Codex rules starter",
        },
        {
            "id": "starter-claude-security-rule",
            "name": "security.md",
            "platform": "claude-code",
            "path": ".claude/rules/security.md",
            "source_path": "starters/claude/rules/security.md",
            "description": "보안과 위험 명령 규칙을 담은 Claude rule starter",
        },
    ],
}


def with_content(item: dict) -> dict:
    source_path = item.get("source_path", item["path"])
    content = (ROOT / source_path).read_text(encoding="utf-8")
    return {key: value for key, value in {**item, "content": content}.items() if key != "source_path"}


def build_payload() -> dict:
    return {key: [with_content(item) for item in value] for key, value in STARTERS.items()}


def render_payload(payload: dict) -> str:
    return json.dumps(payload, ensure_ascii=False, indent=2) + "\n"


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(description="Build or verify local starter catalog data.")
    parser.add_argument(
        "--check",
        action="store_true",
        help="Exit non-zero when data/catalog/local-starters.json is out of date.",
    )
    args = parser.parse_args(argv)

    payload = build_payload()
    rendered = render_payload(payload)

    if args.check:
        current = OUTPUT.read_text(encoding="utf-8") if OUTPUT.exists() else ""
        if current != rendered:
            print(
                "local-starters.json is out of date. Run `python3 scripts/build_local_starters.py`.",
                file=sys.stderr,
            )
            return 1
        print(f"Verified {OUTPUT}")
        return 0

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(rendered, encoding="utf-8")
    print(f"Wrote {OUTPUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
