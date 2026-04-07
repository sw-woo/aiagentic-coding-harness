@AGENTS.md

# Claude Code 추가 메모

이 파일은 `CLAUDE.md` 이지만 본체는 `@AGENTS.md` 를 그대로 가져옵니다. Anthropic Claude Code 가
이 저장소에서 작업할 때만 추가로 적용되는 사항만 아래에 둡니다.

## 권한과 훅

- 모든 권한과 훅은 `.claude/settings.json` 한 파일에 있습니다.
- 평가 순서는 **deny > ask > allow** 입니다.
- 위험 명령 차단은 `.claude/settings.json` deny 매처와 `.claude/hooks/pre_bash_guard.py` 두 층으로 보호됩니다.
- PostToolUse 훅은 `.tsx` 수정 후 ESLint 를 비차단 방식으로 실행합니다.

## 스킬

- `/verify` — `npm run lint && npm run build` 를 한 번에 실행하고 22개 정적 페이지 prerender 를 확인합니다.
- `/review` — 변경 사항을 읽기 전용으로 검토합니다 (존댓말, 사실 기반, 영어 일반어, 디자인 토큰, 보안, 회귀).
- `/content-audit` — 한국어 존댓말, 영어 일반어 잔존, 출처 누락, AI 의인화 표현을 grep 으로 감사합니다.
- `/deploy-check` — Vercel 배포 상태를 확인하고 실패 원인을 진단합니다.
- `/test-all` — 타입 체크 + lint + build + 콘텐츠 규칙을 한 파이프라인으로 실행합니다.

## 서브에이전트

- `content-editor` — 한국어 존댓말 편집과 영어 일반어 다듬기 전용 (Sonnet).
- `nextjs-reviewer` — Next.js 16 App Router · RSC · Turbopack 패턴 리뷰 (Sonnet).
- `harness-auditor` — `.claude/`, `.codex/`, `.agents/skills/` 의 하네스 설정 자체를 감사하는 메타 에이전트 (Sonnet).
- `content-reviewer` — 문서/페이지 변경 읽기 전용 검토 (기존).

## 세부 규칙

파일별 세부 규칙은 `.claude/rules/` 아래에 있습니다.

@.claude/rules/content.md
@.claude/rules/security.md
@.claude/rules/design-system.md
@.claude/rules/deployment.md
