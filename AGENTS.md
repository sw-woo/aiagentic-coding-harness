# Agentic Coding Harness — Codex Project Guide

이 파일은 Codex 세션 시작 시 자동으로 읽힙니다. 이 저장소는 agentic coding harness 엔지니어링을 설명하는 문서 사이트이자,
최소한의 실제 `.codex/`, `.claude/`, `.agents/skills/` 예시를 함께 포함하는 레포입니다.

## 목표

- 한국어 문서형 사이트를 안정적으로 유지합니다.
- 내용은 사실 기반으로만 씁니다.
- 저장소 안의 Codex 하네스 표면이 실제로 존재하고, README / playbook / catalog 설명과 서로 모순되지 않아야 합니다.

## 먼저 읽을 것

작업 전에 필요하면 아래를 우선 봅니다.

- `README.md`
- `docs/handoffs/current-site-state.md`
- `docs/architecture/site-content-map.md`

문서 구조를 바꿀 때는 handbook / guide / reference / catalog 의 역할을 먼저 확인합니다.

## 편집 원칙

- 한국어 산문은 모두 존댓말로 작성합니다.
- 과장된 표현, 단정적 미래 예측, 검증되지 않은 설명은 피합니다.
- 최신성이 중요한 내용은 공식 문서나 1차 자료를 확인한 뒤만 반영합니다.
- 작은 수정으로 해결할 수 있으면 큰 구조 변경을 하지 않습니다.
- 저해상도 이미지의 가독성 문제는 렌더링보다 자산 문제일 수 있으므로, 필요하면 원본 보기나 확대 조각을 사용합니다.

## 검증 명령

기본 검증:

```bash
npm run lint
npm run build
```

Codex 하네스 검증:

```bash
bash scripts/verify_codex_harness.sh
```

한국어 문장 점검:

```bash
npm run spacing:ko
npm run readability:audit
```

## Codex 하네스 구조

- `.codex/config.toml` — 모델, 샌드박스, 프로필, 서브에이전트 등록
- `.codex/hooks.json` — SessionStart / PreToolUse
- `.codex/hooks/*` — 동적 guardrail 스크립트
- `.codex/rules/default.rules` — 위험 명령 정책
- `.codex/agents/*.toml` — reviewer / docs_researcher / verifier / content_editor
- `.agents/skills/*/SKILL.md` — review / verify / site-content / source-research

이 저장소는 “설명만 있는 사이트”가 아니라, 위 최소 하네스 표면을 실제로 포함하는 저장소로 유지합니다.

## 금지 / 주의

- `git reset --hard`, `rm -rf`, 강제 푸시 같은 파괴 명령은 실행하지 않습니다.
- `.env*`, `*.pem`, 비밀정보 파일은 읽지 않습니다.
- 문서에서 `이 저장소가 완전한 견본`이라고 과장하지 않습니다. 현재 저장소에는 최소 하네스 표면이 포함되어 있다고 설명합니다.

## 배포

- 프로덕션 URL: `https://agentic-coding-harness.vercel.app`
- 프로덕션 배포는 `vercel --prod --yes`
- 배포 전에는 최소 `npm run lint && npm run build` 를 통과해야 합니다.
- 하네스 검증 스크립트는 로컬 재현성을 위해 `npx next build --webpack` 경로를 사용합니다.
