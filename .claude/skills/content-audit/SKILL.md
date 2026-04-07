---
name: content-audit
description: 한국어 존댓말 일관성, 영어 일반어 잔존, 출처 누락, AI 의인화 표현을 자동 감사합니다. 사용자가 "한국어 점검", "존댓말 점검", "영어 잔존 체크", "출처 점검" 같은 표현을 쓰면 자동 활성화됩니다.
allowed-tools:
  - Bash
  - Grep
  - Read
model: haiku
---

# /content-audit — 콘텐츠 규칙 자동 감사

이 스킬은 `.claude/rules/content.md` 의 5가지 원칙을 grep 기반으로 자동 점검합니다.

## 점검 항목

### 1. 영어 일반어 잔존

다음 패턴이 `src/app/**/*.tsx` 에 남아 있는지 확인합니다:

```bash
rg -n "discipline|rationale|framing|guardrail|rollout(?!:)|primitive|grounding" src/app/ src/components/
```

기술 용어(workflow, runtime, agent, skill, hook, MCP, context engineering)는 허용됩니다.

### 2. 평어 사용 (존댓말 원칙 위반)

한국어 문장 끝이 `습니다`, `십시오`, `입니다`, `예요`, `해요` 외의 평어로 끝나는지 점검합니다.
완벽한 regex 는 어려우므로 휴리스틱으로 찾고 사람이 확인합니다:

```bash
rg -n '[가-힣](다|까|자|해|해라|어|야)(\.|"|\s|\<)' src/app/ src/components/ --type=tsx
```

### 3. 출처 누락

"~에 따르면", "~가 보고했", "연구에 따르면" 같은 표현 뒤에 URL 이 없는 경우:

```bash
rg -n '(에 따르면|보고했|연구에 따르면|조사에서|발표했)' src/app/ src/components/ --type=tsx -A 2 \
  | rg -v 'https?://' \
  | head -30
```

### 4. AI 의인화

"AI 가 생각", "모델이 원한", "Claude 가 느낀" 같은 의인화 표현:

```bash
rg -ni '(AI|Claude|Codex|GPT|모델)(이|가)\s*(생각|원|느|알|이해|의도|판단)' src/app/ src/components/
```

### 5. 디자인 토큰 raw hex

`#0042FF`, `#68CAFF` 외의 raw hex 값이 `.tsx` 에 박혀 있는지:

```bash
rg -n '#[0-9a-fA-F]{6}\b' src/app/ src/components/ --type=tsx \
  | rg -v '#0042[Ff][Ff]|#68[Cc][Aa][Ff][Ff]' \
  | head -20
```

## 출력 계약

각 항목별로 발견된 개수와 파일:위치 목록을 출력합니다.

```
## Content Audit 결과

- 영어 일반어 잔존: 3개 (handbook/page.tsx:123, manifesto/page.tsx:45, guide/page.tsx:8)
- 평어 의심: 1개 (methodology/[slug]/page.tsx:200) — 사람 확인 필요
- 출처 누락 의심: 0개
- AI 의인화 의심: 2개 (manifesto/what-ai-actually-is.tsx:15, 34)
- Raw hex 색상: 0개

## 다음 단계

- 영어 일반어 3개를 content.md 표 기준으로 치환해 주십시오.
- 평어 의심 1개는 직접 확인 후 존댓말로 바꿔 주십시오.
- AI 의인화 2개는 "모델이 다음 토큰 확률을 계산한다" 형태로 다시 쓰십시오.
```

## 참고

이 스킬은 **발견만 합니다**. 자동 수정은 하지 않습니다 — 거짓 양성이 많을 수 있어서 사람이 판단해야
합니다. 수정은 `/review` 결과를 보고 사용자 또는 content-editor 서브에이전트에게 맡기십시오.
