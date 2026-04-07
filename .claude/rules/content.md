---
glob:
  - "src/app/**/*.tsx"
  - "src/app/**/*.mdx"
  - "src/components/**/*.tsx"
  - "docs/**/*.md"
  - "README.md"
  - "CLAUDE.md"
  - "AGENTS.md"
---

# 콘텐츠 작성 규칙

이 저장소의 모든 사용자 대면 콘텐츠는 다음 다섯 가지 원칙을 반드시 지킵니다.

## 1. 존댓말 (Honorifics)

- 한국어 산문은 예외 없이 존댓말(습니다/습니다/십시오) 로 작성합니다.
- 평어(해요/해, 반말)는 허용되지 않습니다.
- 기술 용어, 코드, 명령어는 번역하지 않고 그대로 둡니다.
- 슬래시 명령 설명, UI 레이블, 경고 메시지도 존댓말입니다.

## 2. 사실 기반 (No Fabrication)

- 수치, 날짜, 버전, 인용문은 반드시 1차 출처 또는 공식 문서 URL 을 동반합니다.
- 출처를 확인하지 못한 경우 `[출처 미확인]` 마커를 명시합니다.
- 인용문은 verbatim 으로만 사용합니다. 확인되지 않은 paraphrase 는 "(요약)" 으로 표시합니다.
- 벤치마크 순위, 모델 파라미터 수, 학습 토큰량 같은 숫자는 절대 추측하지 않습니다.

## 3. AI = 계산 framing

- LLM 을 "행렬 곱셈 + 어텐션 + 그래디언트 디센트 + 하드웨어 속도" 로 설명합니다.
- "마음", "의도", "이해", "알고 있다" 같은 의인화 표현을 피하고, "출력", "확률 분포", "매칭" 같은
  계산 용어로 대체합니다.
- "AI 가 생각했다" → "모델이 다음 토큰 확률을 계산했다"
- "Claude 가 원한다" → "모델이 해당 출력을 생성한다"

## 4. 영어 일반어 금지 (Anglicism)

다음 단어들은 한국어로 풉니다:

| 영어 | 한국어 |
|---|---|
| discipline | 공학 분야 / 분야 |
| rationale | 근거 / 이유 |
| framing | 관점 / 시각 |
| guardrail | 안전 장치 / 보호막 |
| rollout | 도입 / 도입 순서 |
| primitive | 기본 요소 |
| grounding | 문서 인용 / 문맥 연결 |
| memory discipline | 메모리 운영 원칙 |
| verify loop | 검증 루프 (이건 허용 — "루프"는 외래어 정착) |
| runtime engineering | 런타임 설계 |

**유지해야 하는 기술 용어** (그대로 영어 사용): workflow, runtime, agent, skill, hook, subagent,
MCP, context engineering, vibe coding, plan mode, ralph loop, eval-driven, observability,
governance, token, prompt, frontier.

## 5. 미래 예측은 사실 기반으로만

근거 없는 1년·3년·5년 예측은 어디에도 쓰지 않습니다. 미래에 대한 진술은 다음 출처에서만:

- METR "Measuring AI Ability to Complete Long Tasks" (https://metr.org)
- Epoch AI compute scaling (https://epoch.ai)
- Dario Amodei "Machines of Loving Grace" (https://darioamodei.com/machines-of-loving-grace)
- Sam Altman "Three Observations" (https://blog.samaltman.com)
- Anthropic Responsible Scaling Policy (https://www.anthropic.com/news)

## 6. 링크와 참고

- 모든 외부 링크에는 `target="_blank"` + `rel="noreferrer"` 를 붙입니다.
- 출처 표기는 문장 끝 `(domain.com)` 스타일을 사용합니다. 각주 번호 스타일도 가능합니다.
- 공식 문서 URL 을 우선하고, 블로그 / 뉴스 기사는 secondary 로만 인용합니다.

## 점검 스킬

`/content-audit` 스킬은 이 규칙을 자동으로 검사합니다. 새 페이지를 작성한 뒤에 실행하십시오.
