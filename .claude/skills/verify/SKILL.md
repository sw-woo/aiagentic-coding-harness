---
name: verify
description: 이 저장소의 전체 회귀 검증을 한 번에 실행합니다. 사용자가 "검증", "verify", "lint", "build", "회귀 검증" 같은 표현을 쓰면 자동 활성화됩니다.
allowed-tools:
  - Bash
  - Read
model: haiku
---

# /verify — 전체 회귀 검증

이 스킬은 이 저장소의 표준 회귀 검증을 한 번에 실행합니다. 22개 정적 페이지가 모두 녹색으로
prerender 되어야 통과입니다.

## 절차

1. 먼저 `pnpm install` 이 최근 실행됐는지 확인합니다 (node_modules/ 존재 여부).
2. `pnpm lint` 를 실행합니다. 실패하면 ESLint 오류를 그대로 출력하고 중단합니다.
3. `pnpm build` 를 실행합니다. 실패하면 Next.js 빌드 오류를 그대로 출력하고 중단합니다.
4. 빌드 출력에서 "Generating static pages (22/22)" 확인합니다.
5. 모두 통과하면 "검증 통과" 한 줄로 마무리합니다.

## 실행 명령

```bash
pnpm lint && pnpm build 2>&1 | tail -40
```

## 출력 계약

- 마지막 줄은 반드시 다음 중 하나:
  - `검증 통과 — 22개 페이지 prerender 완료`
  - `검증 실패: lint (<오류 요약>)`
  - `검증 실패: build (<오류 요약>)`

## 자주 마주치는 실패 원인

- **`renderCard` 타입 에러** — Server Component 가 Client Component 에 function prop 을 넘기는 경우.
  해결: render 로직을 Client Component 내부로 옮기고, discriminator prop 으로 분기합니다.
- **`Module not found`** — 새 import 가 package.json 에 없는 경우. `pnpm add <pkg>` 로 해결.
- **Tailwind v4 `@theme` 파싱 오류** — `src/app/globals.css` 에서 `--color-xxx` 변수 정의가 잘못된 경우.

## 회귀 검증 통과 기준 체크리스트

- [ ] `pnpm lint` 종료 코드 0
- [ ] `pnpm build` 종료 코드 0
- [ ] 빌드 출력에 "Compiled successfully" 포함
- [ ] 빌드 출력에 "Generating static pages (22/22)" 포함
- [ ] 빌드 결과 라우트 목록에 다음이 모두 있어야 함:
  - `/`, `/handbook`, `/guide`, `/manifesto`, `/manifesto/[slug]`,
  - `/methodology/[slug]`, `/methodology/codex-best-practices`,
  - `/architecture/overview`, `/architecture/claude-vs-codex`,
  - `/catalog/[type]`, `/playbook/[slug]`, `/reference`, `/reference/[slug]`
