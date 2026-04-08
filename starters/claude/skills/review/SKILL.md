---
name: review
description: 읽기 전용으로 변경 사항을 검토합니다. 한국어 존댓말, 사실 기반, 영어 일반어 사용, 디자인 토큰 준수, 보안 규칙 위반, 회귀 가능성을 중점으로 봅니다. 사용자가 "리뷰", "review", "검토", "점검" 같은 표현을 쓰면 자동 활성화됩니다.
allowed-tools:
  - Read
  - Grep
  - Glob
  - Bash
model: sonnet
---

# /review — 변경 사항 리뷰

이 스킬은 현재 세션의 변경 사항 또는 특정 커밋/브랜치의 변경 사항을 읽기 전용으로 검토합니다.
파일을 절대 수정하지 않습니다. 문제점을 찾아서 사람에게 보고합니다.

## 실행 순서

1. `git status --short` 와 `git diff` (또는 `git diff <base>..HEAD`) 로 변경 범위를 파악합니다.
2. 변경된 각 파일을 열어서 아래 6개 축으로 검토합니다.
3. 문제점을 "심각도 × 축" 표로 요약합니다.
4. 마지막에 한 줄 verdict 를 내립니다: "통과" 또는 "수정 필요: <가장 중요한 항목>".

## 검토 축

### 1. 한국어 존댓말 (Content)

- 평어(해요/해, 반말) 가 있는가?
- 기술 용어가 한국어 설명과 자연스럽게 섞이는가?
- 대명사 과다 사용(이것은, 그것은) 이 있는가?

### 2. 사실 기반 (Content)

- 수치, 날짜, 버전, 인용문에 출처 URL 이 있는가?
- 확인 안 된 주장이 `[출처 미확인]` 마커로 표시됐는가?
- 인용문이 verbatim 인지, 아니면 "(요약)" 라벨이 붙었는가?

### 3. 영어 일반어 (Content)

- `discipline`, `rationale`, `framing`, `guardrail`, `rollout`, `primitive` 같은 단어가 한국어 본문에
  그대로 남아 있는가? (한국어로 풀어야 함)
- 기술 용어(workflow, runtime, MCP, hook 등)는 그대로 둬도 OK.

### 4. 디자인 토큰 (Code)

- `.tsx` 파일에서 임의의 hex 색상 코드(`#abcdef`)가 박혀 있는가?
- `bg-accent`, `text-foreground-muted` 같은 semantic 클래스 대신 raw hex 를 썼는가?
- `lucide-react` 외의 아이콘 라이브러리를 import 했는가?

### 5. 보안 (Code)

- API 키, 토큰, 비밀번호가 하드코딩됐는가?
- `.env`, `*.pem`, `secrets/**` 파일을 읽거나 쓰는 코드가 있는가?
- `rm -rf`, `git push --force`, `vercel --prod` 같은 위험 명령이 문서/주석에 예시로라도 들어갔는가?

### 6. 회귀 가능성 (Code)

- 기존 import 를 제거했는데 다른 파일에서 계속 사용 중인가?
- Server Component 에서 function prop 을 Client Component 로 넘기는가? (Next.js 16 제약)
- `pnpm build` 가 여전히 통과할 확률이 높은가?

## 출력 형식

```text
## 리뷰 결과

| 심각도 | 축 | 위치 | 문제 | 제안 |
|---|---|---|---|---|
| 🔴 High | 사실 기반 | handbook/page.tsx:123 | "METR 연구에 따르면 50% 라고" 출처 없음 | metr.org 링크 추가 또는 [출처 미확인] 마커 |
| 🟡 Med | 영어 일반어 | manifesto/page.tsx:45 | "이것은 discipline 입니다" | "독립된 공학 분야" |
| 🟢 Low | 디자인 토큰 | card.tsx:12 | `bg-[#0042FF]` hex | `bg-accent` 사용 |

## Verdict

**수정 필요: 3개 high, 2개 medium**
```

## 주의

- 이 스킬은 **읽기 전용** 입니다. 절대 파일을 수정하지 않습니다. 수정은 사용자에게 맡깁니다.
- 스타일 취향이 아니라 rules/*.md 에 명시된 규칙 위반만 지적합니다.
- 의심되는 경우 "확인 필요" 로 표시하고, 함부로 단정하지 않습니다.
