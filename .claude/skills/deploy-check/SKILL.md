---
name: deploy-check
description: Vercel 배포 상태를 확인하고 실패 원인을 진단합니다. 사용자가 "배포 상태", "deploy status", "vercel 확인", "배포 실패" 같은 표현을 쓰면 자동 활성화됩니다.
allowed-tools:
  - Bash
  - Read
model: haiku
---

# /deploy-check — Vercel 배포 상태 점검

이 스킬은 현재 저장소의 Vercel 배포 상태를 확인하고, 실패가 있으면 원인을 진단합니다.

## 확인 순서

### 1. Git 작성자 확인 (가장 자주 발생하는 원인)

```bash
git log --format='%h %an <%ae>' -n 5
```

마지막 5개 커밋의 모든 이메일이 `62142688+sw-woo@users.noreply.github.com` 인지 확인합니다.
`sungwoo@innogrid.com` 이 하나라도 섞여 있으면 Vercel 이 즉시 ERROR 로 거부합니다.

**해결**: rules/deployment.md 의 rebase 명령으로 작성자를 rewrite 한 뒤 force-push.

### 2. 로컬 빌드 검증

```bash
pnpm lint && pnpm build 2>&1 | tail -40
```

로컬에서 실패하면 Vercel 에서도 당연히 실패합니다. 로컬부터 고치십시오.

### 3. vercel.json 검증

```bash
cat vercel.json
```

확인 포인트:
- `framework: "nextjs"` 명시돼 있는가
- `installCommand` 가 `pnpm install --no-frozen-lockfile` 인가 (`--frozen-lockfile=false` 는 잘못된 pnpm 문법)
- `functions: {}` 빈 객체가 없는가 (스키마 검증 실패 원인)

### 4. 최근 배포 상태 (Vercel MCP 가 가능한 경우)

Vercel MCP 도구를 사용해 최근 배포 상태를 확인합니다:

```
mcp__claude_ai_Vercel__list_deployments
  teamId: team_KmwpNc1DgVXyb4tkJtETzuBq
  projectId: prj_VcpLBeYJUjsBva7FWxRMoEg9PBBq
```

가장 최신 deployment 의 `state` 가 `READY` 인지 확인합니다:
- `READY` → 정상
- `BUILDING` → 대기 (30초 정도 더 기다려 봅니다)
- `ERROR` → 아래 진단 단계로

### 5. 에러 상태일 때 진단

```
mcp__claude_ai_Vercel__get_deployment
  idOrUrl: dpl_<id>
  teamId: team_KmwpNc1DgVXyb4tkJtETzuBq
```

`meta.githubCommitAuthorEmail` 과 `meta.githubCommitAuthorLogin` 을 확인합니다.
`inno-sungwoo` 로 보이면 작성자 문제이므로 rebase 가 필요합니다.

```
mcp__claude_ai_Vercel__get_deployment_build_logs
  idOrUrl: dpl_<id>
  teamId: team_KmwpNc1DgVXyb4tkJtETzuBq
```

`events: []` 빈 배열이 돌아오면 빌드가 시작도 못 했다는 뜻 — 작성자 또는 vercel.json 문제입니다.
실제 빌드 로그가 있으면 거기서 오류를 찾습니다.

## 출력 계약

```
## 배포 상태

- 마지막 커밋 작성자: sw-woo <62142688+sw-woo@users.noreply.github.com> ✅
- 로컬 빌드: 통과 ✅
- vercel.json: 유효 ✅
- 최근 production 배포:
  - dpl_3xiVQdx8... → READY ✅
  - 빌드 시간: 26초
  - 라이브 URL: https://aiagentic-coding-harness.vercel.app

## 결론: 정상
```

## 라이브 URL

- 메인: https://aiagentic-coding-harness.vercel.app
- 팀 alias: https://aiagentic-coding-harness-sungwoowoos-projects.vercel.app
- git main alias: https://aiagentic-coding-harness-git-main-sungwoowoos-projects.vercel.app

세 URL 모두 같은 최신 READY deployment 를 가리킵니다.
