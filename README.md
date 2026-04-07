# Agentic Coding Harness — Showcase Site

Information showcase + living catalog of an agentic coding harness applied to a Kotlin/JVM AIOps/MLOps project. Built with Next.js 16 + Fumadocs + shadcn/ui + Tailwind v4 + Vercel.

## 이것은 무엇인가요? (What This Is)

이 저장소는 Kotlin/JVM 기반 AIOps/MLOps 프로젝트에 적용된 agentic coding harness를 소개하는 정보 쇼케이스이자 살아있는 카탈로그입니다. 방법론, 아키텍처, 운영 규칙, 그리고 실제 도입 맥락을 한곳에서 정리해 두는 것을 목표로 합니다.

시각 정체성은 Innogrid CI를 기준으로 잡고, 문서 경험은 Next.js 16과 Fumadocs를 기반으로 구성합니다. 브랜드 컬러 참고 자료는 Innogrid PR/CI 페이지를 기준으로 삼습니다.

- Innogrid CI: https://www.innogrid.com/pr/ci

## 빠른 시작 (Quick Start)

병렬 스캐폴딩 트랙이 `package.json`과 애플리케이션 파일을 준비한 뒤 아래 순서로 실행해 주시면 됩니다.

```bash
pnpm install
pnpm dev
```

개발 서버가 준비되면 일반적으로 `http://localhost:3000`에서 사이트를 확인하실 수 있습니다.

## 배포 (Deployment)

### Vercel CLI

로컬에서 직접 배포하실 때는 Vercel CLI를 사용하시면 됩니다.

```bash
pnpm dlx vercel login
pnpm dlx vercel link
pnpm dlx vercel
pnpm dlx vercel --prod
```

실제 운영 배포에서는 `SITE_URL`, `NEXT_PUBLIC_SITE_URL`, `LAST_COMMIT_HASH` 같은 환경 값을 함께 관리해 주시는 편이 좋습니다.

### GitHub Actions

이 저장소에는 `.github/workflows/deploy.yml`이 포함되어 있으며, 다음 흐름으로 동작합니다.

- `push` to `main`: production deployment
- `pull_request`: preview deployment + PR comment
- 공통 build-check: `pnpm install`과 `pnpm build`를 수행하되, 아직 스캐폴딩이 끝나지 않아 `package.json`이 없으면 안전하게 skip합니다.

필수 GitHub Secrets는 아래 세 가지입니다.

- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

공식 배포 문서는 아래를 기준으로 유지해 주십시오.

- Vercel Docs: https://vercel.com/docs

## 스택 (Stack)

- Next.js 16: https://nextjs.org
- Fumadocs: https://fumadocs.dev
- shadcn/ui: https://ui.shadcn.com
- Vercel: https://vercel.com/docs
- Tailwind CSS v4, pnpm 10, GitHub Actions

## 콘텐츠 원칙 (Content Principles)

이 사이트의 모든 산문과 문서 콘텐츠는 아래 다섯 가지 원칙을 따릅니다.

1. No fabrication: 모든 사실 주장에는 출처 URL 또는 1차 자료를 붙이고, 없으면 `[출처 미확인]`으로 표시합니다.
2. 존댓말 유지: 한국어 산문은 일관되게 존댓말로 작성합니다.
3. AI = computation: AI를 인격체가 아니라 계산 시스템으로 설명합니다.
4. Speed and scale matter: 모델 크기, 학습 토큰, 컴퓨트, 하드웨어 세대 같은 측정 가능한 변수로 설명합니다.
5. Evidence-based forecasting: 미래 예측은 출처가 검증되는 자료에 한해 인용합니다.

## 기여 (Contributing)

기여해 주실 때는 사실 주장에 반드시 1차 출처를 연결해 주시고, 한국어 본문은 존댓말로 유지해 주십시오. 과장된 AI 마케팅 표현보다는 검증 가능한 구현 맥락, 운영 경험, 실패 사례, 제약 조건을 우선해 주시면 됩니다.

배포나 문서 구조를 바꾸실 때는 Vercel 설정 파일과 GitHub Actions 워크플로를 함께 검토해 주시는 편이 안전합니다.
