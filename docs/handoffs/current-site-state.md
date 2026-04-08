# 현재 사이트 상태

작성일: 2026-04-08

이 문서는 다음 세션의 Claude / Codex가 지금 사이트 상태를 빠르게 복구하도록 만든 압축 문서입니다.

## 현재 중심 주제

이 사이트의 큰 주제는 `agentic coding harness 엔지니어링` 입니다.

중요한 방향:
- `Karpathy` 는 전체 큰그림의 일부입니다.
- 사이트의 중심축은 특정 인물이나 선언문이 아니라 `하네스 엔지니어링 전체 그림` 이어야 합니다.
- 사내 개발자가 하네스를 이해하고 직접 설정해서 생산성을 올리는 것이 목표입니다.
- 문서는 감상문보다 `설정`, `운영`, `검증`, `문제 해결`, `자료 기반 설명`을 우선합니다.

## 지금 중요한 페이지

- `/`
  - 밝은 테마 기본
  - 홈은 안내형
  - 핵심 축은 `핸드북 / 아키텍처 / 실전 셋업`

- `/guide`
  - 사이트 전체를 어떻게 읽을지 설명하는 위키형 가이드
  - sticky 좌측 목차 + 우측 본문 구조

- `/handbook`
  - 가장 중요한 장문 페이지
  - 과거 발전사 → 현재 핫 스택 → 하네스 엔지니어링 → 운영 시스템 → 모델 레벨 → 사내 rollout → 미래 방향
  - section별 source link 포함

- `/playbook/setup-codex`
  - Codex 심화 설정 문서
  - AGENTS.md, config.toml, rules, hooks, subagents, 외부 확장 Top 10 포함

- `/reference`
  - 참고자료 인덱스

- `/reference/oh-my-claudecode`
  - `README.ko.md` 전체를 읽고 다시 정리한 내부 페이지
  - 빠른 시작 / Team 표준 / tmux CLI worker / 업데이트 절차를 분리해서 설명
  - 외부 README 복제본이 아니라 우리 정보구조에 맞춘 해설 페이지로 유지

- `/reference/codex-official`
  - Codex 공식 문서와 저장소를 한 번에 보는 자료 맵

- `/reference/codex-hooks`
  - hooks를 깊게 설명하는 상세 문서

- `/reference/codex-adoption`
  - 최소 설치 / 표준 설치 / 선택 설치 / 문제 해결 문서

- `/reference/profiles-subagents`
  - profiles 와 subagents 역할 설계 문서

- `/reference/mcp-landscape`
  - 최신 MCP 툴링 지형도

- `/reference/security-guardrails`
  - sandbox / rules / hooks / MCP governance 문서

- `/reference/debugging-playbook`
  - 실패 분류 / 재현 / root cause / 회귀 방지 문서

- `/reference/metrics-observability`
  - tracing / metrics / observability 문서

- `/reference/automation-patterns`
  - headless / structured output / CI 연동 패턴 문서

## 최근 추가된 시각 자료

- `public/infographics/agentic-handbook-timeline.svg`
  - 2017 → 2026 흐름 타임라인

- `public/infographics/agentic-harness-landscape.svg`
  - 모델 / 하네스 / 외부 확장 레이어 도식

- `public/landing/claude-workflow-cheatsheet.png`
- `public/landing/claude-folder-anatomy.png`

## 문서 구조에서 유지할 원칙

- 홈은 짧고 단정하게 유지
- 깊은 설명은 handbook / guide / playbook / reference 쪽으로 분리
- 각 상세 페이지는 GitBook/wiki 느낌의 구조를 유지
  - sticky 좌측 목차
  - 본문 카드형 섹션
  - topic별 상세 설명
  - source link

- `manifesto` 는 현재 중심 라우트가 아님
  - 메인 동선에서 적극적으로 밀지 않음
  - 현재 metadata robots noindex 처리됨
  - 사실상 appendix 성격으로 취급

## 지금까지 확인된 좋은 참고 패턴

### revfactory / claude-code-master

가져온 패턴:
- 설치 → 선택 도입 → 전체 예시 → 문제 해결 흐름
- hooks 같은 주제를 깊게 파는 상세 문서 구조
- copy-ready 예시와 운영 주의사항

### robbiecalvin / codexmaster

가져온 패턴:
- 하네스를 `운영 시스템` 으로 설명하는 구조
- `workflow / guardrails / metrics / debugging playbook` 분리
- 기능 모음보다 실행 파이프라인 중심 문서화

이미 handbook의 `운영 시스템으로서의 하네스` 섹션에 일부 반영함.

## 다음 작업 우선순위

1. `manifesto` 라우트 정리
   - 완전 제거할지
   - 참고용으로 유지할지
   - 홈/가이드/핸드북에서 노출을 더 줄일지 결정 필요

2. handbook 확장
   - 현재는 책의 목차 수준
   - 다음은 각 장을 더 길게 늘려 `책 1권 분량 느낌`으로 확장 가능

3. reference 정보 구조 재정리
   - 페이지 수가 많아졌으므로 묶음형 index 또는 category landing 검토 가능
   - 단, `oh-my-claudecode` 같은 외부 하네스 해설은 “공식 자료 맵”과 별도 층으로 유지하는 편이 읽기 좋음

## 검증 명령

```bash
npm run lint
npm run build
```

현재 두 명령 모두 통과하는 상태로 마무리됨.

추가 확인:

- `npm run spacing:ko`
  - 로컬에서 `kss` 필요
  - 현재는 저장소 로컬 가상환경 `.venv-kss/` 를 만들어 실행 가능하도록 맞춤

## 한국어 문장 점검 장치

- `npm run spacing:ko`
- 구현: `scripts/check_korean_spacing.py`
- 문서: `docs/development/korean-copy-check.md`

- `npm run readability:audit`
- 구현: `scripts/check_readability.py`
- 문서: `docs/development/readability-tooling.md`

의도:
- handbook / guide / reference 같은 한국어 장문 페이지의 띄어쓰기 점검 보조
- 자동 수정이 아니라 추천 보고서 방식
- 긴 제목/문단/작은 텍스트 이미지도 함께 점검
