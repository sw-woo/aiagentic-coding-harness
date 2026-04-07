#!/usr/bin/env python3
"""
SessionStart hook for Claude Code — injects repository context at session start.

Output goes into the Claude Code context window. Keep it short and high-signal.
"""
from __future__ import annotations

import os
import subprocess
import sys


def git(*args: str, cwd: str) -> str:
    try:
        result = subprocess.run(
            ["git", "-C", cwd, *args],
            capture_output=True,
            text=True,
            check=False,
            timeout=3,
        )
        return result.stdout.strip()
    except (OSError, subprocess.TimeoutExpired):
        return ""


def main() -> int:
    root = os.environ.get("CLAUDE_PROJECT_DIR", os.getcwd())
    last_commit = git("log", "-1", "--format=%h %s", cwd=root) or "(unknown)"
    branch = git("rev-parse", "--abbrev-ref", "HEAD", cwd=root) or "(unknown)"
    status_short = git("status", "--short", cwd=root)
    dirty_count = len([line for line in status_short.splitlines() if line.strip()]) if status_short else 0

    lines = [
        "## 세션 컨텍스트 (자동 주입)",
        "",
        "이 저장소는 **Agentic Coding Harness Showcase Site** 입니다.",
        "Next.js 16 + Tailwind v4 + Vercel + Innogrid CI 디자인 토큰을 사용합니다.",
        "",
        f"- 저장소 루트: `{root}`",
        f"- 브랜치: `{branch}`",
        f"- 최근 커밋: {last_commit}",
        f"- 변경된 파일: {dirty_count}개",
        "",
        "### 필수 준수 사항",
        "- 모든 한국어 산문은 존댓말입니다.",
        "- 사실 주장에는 출처 URL 또는 `[출처 미확인]` 마커가 필요합니다.",
        "- AI 를 인격체가 아닌 계산(행렬 곱셈 + 어텐션 + 스케일)으로 framing 합니다.",
        "- 영어 일반어(discipline, rationale, framing, guardrail, rollout)는 한국어로 풉니다.",
        "",
        "### 검증 명령",
        "```bash",
        "pnpm lint && pnpm build",
        "```",
        "",
        "### 차단되는 명령",
        "- `rm -rf *`, `git push --force`, `git reset --hard`",
        "- `vercel --prod`, `vercel remove`, `kubectl delete`, `terraform apply|destroy`",
        "- `.env*`, `*.pem`, `**/secrets/**` 읽기",
        "",
        "### Git 작성자",
        "반드시 `sw-woo <62142688+sw-woo@users.noreply.github.com>` 로 커밋합니다.",
        "`sungwoo@innogrid.com` 로 커밋하면 Vercel 이 배포를 거부합니다 (이미 확인됨).",
        "",
        "### 자세한 규칙",
        "- `CLAUDE.md`, `AGENTS.md` 를 먼저 읽으십시오.",
        "- `.claude/rules/content.md`, `.claude/rules/security.md`, `.claude/rules/design-system.md`, `.claude/rules/deployment.md` 를 확인하십시오.",
    ]
    print("\n".join(lines))
    return 0


if __name__ == "__main__":
    sys.exit(main())
