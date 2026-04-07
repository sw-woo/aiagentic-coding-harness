# 사이트 정보 구조와 편집 원칙

작성일: 2026-04-07

이 문서는 현재 사이트의 정보 구조를 설명합니다.
다음 세션에서 Claude / Codex가 새 문서를 추가하거나 구조를 바꿀 때 기준으로 사용합니다.

## 최상위 정보 구조

### 1. 안내 층

- `/`
- `/guide`

역할:
- 사이트가 무엇인지 설명
- 어떤 순서로 읽어야 하는지 안내
- 깊은 설명은 다른 페이지로 보내기

원칙:
- 홈은 짧고 명확해야 함
- hero는 큰 주제만 말하고 장문 설명은 하지 않음

### 2. 서사 / 설명 층

- `/handbook`
- `/methodology/*`

역할:
- 과거 발전사
- 현재 핫한 흐름
- 미래 방향
- 방법론과 사상 정리

원칙:
- 특정 인물 중심이 아니라 큰 흐름 중심
- Karpathy, Ralph, eval-driven, context engineering, MCP는 전체 그림의 일부

### 3. 구조 / 설계 층

- `/architecture/overview`
- `/architecture/claude-vs-codex`

역할:
- 하네스의 5-레이어 구조 설명
- 도구별 구현 차이 설명

### 4. 실전 운영 층

- `/playbook/setup-codex`
- `/playbook/setup-claude-code`

역할:
- 실제 설정 파일
- rollout 순서
- rules, hooks, subagents, skills, MCP 구성

원칙:
- copy-ready 예시 포함
- 실제 파일 경로 기준 설명
- 한 주제를 깊게 파는 상세 설명 허용

### 5. 레퍼런스 층

- `/reference`
- `/reference/codex-official`
- `/reference/codex-hooks`
- `/reference/codex-adoption`
- `/reference/mcp-landscape`
- `/reference/harness-100`

역할:
- 공식 문서와 외부 컬렉션을 묶는 층
- 깊은 설정 상세 문서를 두는 층

원칙:
- 가능한 한 공식 자료 기반
- 최신성이 중요한 내용은 source link 포함

## 편집 스타일 원칙

- 블로그보다 위키에 가깝게 쓴다
- 한 페이지는 한 주제를 깊게 파야 한다
- 설치 / 구조 / 예시 / 문제 해결 / source 흐름이 좋다
- 카드와 목차가 있어도 결국 내용 밀도가 핵심이다

## 앞으로 문서를 늘릴 때 추천 분기

### Codex 쪽

- `profiles`
- `rules`
- `subagents`
- `debugging`
- `mcp security`

### 공통 하네스 쪽

- `evaluation loops`
- `team rollout`
- `organizational adoption`
- `metrics and observability`
- `failure and recovery`

## 문서 작성 시 체크리스트

- 이 문서가 안내용인지 심화용인지 먼저 정했는가
- 특정 인물보다 큰 흐름이 먼저 보이는가
- 실제 설정 파일 또는 실제 자료 링크가 있는가
- 다음 세션의 Claude / Codex가 읽고 바로 이어서 작업할 수 있는가
- 홈에 넣어야 할 내용과 handbook/reference로 내려야 할 내용을 구분했는가
