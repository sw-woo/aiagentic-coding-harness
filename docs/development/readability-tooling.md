# 가독성 점검 도구

작성일: 2026-04-07

이 문서는 이 프로젝트에서 가독성을 높이기 위해 사용할 수 있는 장치들을 정리합니다.

## 현재 프로젝트에 적용한 장치

### 1. CSS 타이포그래피 장치

`src/app/globals.css`

- `.balanced-korean-heading`
  - `text-wrap: balance`
  - `word-break: keep-all`

- `.pretty-korean-copy`
  - `text-wrap: pretty`
  - `word-break: keep-all`

용도:
- 긴 한글 제목 줄바꿈 균형
- 본문 문단의 자연스러운 줄바꿈

### 2. 한국어 띄어쓰기 점검

```bash
npm run spacing:ko
```

구현:
- `scripts/check_korean_spacing.py`

### 3. 가독성 점검

```bash
npm run readability:audit
```

구현:
- `scripts/check_readability.py`

이 스크립트는 다음을 점검합니다.

- 긴 제목 후보
- 긴 문장/문단 후보
- 작은 텍스트 PNG 이미지 후보

자동 수정은 하지 않고 검토 후보만 보고합니다.

## 외부 장치 조사 결과

### textlint

- 공식: https://textlint.org/
- 역할:
  - 문장 품질 / 문체 규칙 점검
  - Markdown/텍스트 문서 품질 관리
- 현재 판단:
  - 구조상 유용하지만, 한국어 가독성 규칙을 바로 강하게 걸기엔 별도 rule 설계가 필요
  - 이 프로젝트에서는 우선 로컬 스크립트 방식이 더 현실적

### KSS

- 저장소: https://github.com/hyunwoongko/kss
- 역할:
  - 한글 띄어쓰기 추천
- 현재 상태:
  - 프로젝트에 이미 적용

### korean-language-server

- 저장소: https://github.com/aca/korean-language-server
- 역할:
  - 에디터 안에서 맞춤법/문법 보조
- 현재 판단:
  - 개인 작성 환경 보조 도구로 추천

### py-hanspell

- 저장소: https://github.com/ssut/py-hanspell
- 역할:
  - 한글 맞춤법/띄어쓰기 교정
- 현재 판단:
  - 수동 점검용으로는 좋음
  - 자동 파이프라인 기본값으로 두기엔 외부 의존이 있음

### MCP

이번 조사 기준으로는, 한국어 가독성 자체를 직접 고도화하는 성숙한 MCP 서버는 확인하지 못했습니다.

즉 현재 권장 조합은:

- 프로젝트 공통: CSS + 로컬 점검 스크립트
- 개인 작성 보조: 에디터용 language server
- 수동 교정: KSS / py-hanspell

## 권장 사용 시점

- handbook 장문을 크게 수정한 뒤
- methodology / guide 문구를 다듬은 뒤
- 이미지 교체나 인포그래픽 추가 후

## 운영 원칙

- 자동 수정은 최소화
- 점검 결과는 후보 목록으로만 본다
- 한국어 문장 품질은 최종적으로 사람이 판단한다
