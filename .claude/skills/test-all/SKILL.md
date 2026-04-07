---
name: test-all
description: 저장소 전체 품질 파이프라인을 한 번에 실행합니다 — 타입 체크 + lint + build + content audit. 사용자가 "전체 테스트", "test all", "전체 검증", "모두 검사" 같은 표현을 쓰면 자동 활성화됩니다.
allowed-tools:
  - Bash
  - Grep
model: haiku
---

# /test-all — 전체 품질 파이프라인

이 저장소에는 별도 unit/integration 테스트 스위트가 없습니다(세미나 준비 모드). 대신 정적 페이지
prerender 성공 + lint + type-check + 콘텐츠 규칙 점검을 "테스트" 로 정의합니다.

## 절차

```bash
# 1. 타입 체크 (Next.js build 가 자체적으로 수행하지만 명시적 확인)
pnpm exec tsc --noEmit 2>&1 | tail -20

# 2. ESLint
pnpm lint 2>&1 | tail -20

# 3. Production 빌드 (22개 정적 페이지)
pnpm build 2>&1 | tail -40

# 4. 콘텐츠 규칙 점검 (영어 일반어 잔존)
rg -n "discipline|rationale|framing|guardrail|rollout(?![-_])|primitive" src/app/ src/components/ \
  | rg -v '//.*' \
  | head -20 || echo "OK: 영어 일반어 잔존 없음"
```

## 출력 계약

```
## 전체 품질 파이프라인 결과

| 단계 | 결과 | 비고 |
|---|---|---|
| TypeScript | ✅ | 0 errors |
| ESLint | ✅ | 0 warnings |
| Build | ✅ | 22/22 static pages |
| 콘텐츠 규칙 | ⚠️ | 2건 영어 일반어 의심 (handbook/page.tsx:123, 456) |

**Verdict**: 빌드는 통과, 콘텐츠 2건 확인 필요
```

## 실패 시 복구

- TypeScript 오류: 해당 파일을 열어 타입 문제를 고칩니다.
- ESLint 경고: 대부분 unused imports / missing deps 입니다. autofix 가능하면 `pnpm lint --fix`.
- Build 실패: `/verify` 스킬의 "자주 마주치는 실패 원인" 섹션을 참고하십시오.
- 콘텐츠 규칙 위반: `/content-audit` 스킬로 더 자세히 점검합니다.
