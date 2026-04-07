# 배포 규칙

## 배포 파이프라인

이 저장소는 **Vercel GitHub 연동** 으로 자동 배포됩니다.

- `main` 브랜치에 push → Vercel 이 자동으로 production 빌드 시작
- PR → Vercel 이 자동으로 preview 빌드 생성
- 수동 `vercel --prod` / `vercel deploy` 는 사용하지 않습니다 (settings.json deny / ask)

## Vercel 프로젝트 정보

- 팀: `sungwoowoos-projects` (slug) / `team_KmwpNc1DgVXyb4tkJtETzuBq`
- 프로젝트: `aiagentic-coding-harness` / `prj_VcpLBeYJUjsBva7FWxRMoEg9PBBq`
- Region: `icn1` (Seoul) — `vercel.json` 에 고정됨
- Framework preset: `nextjs`
- Build command: `pnpm build`
- Install command: `pnpm install --no-frozen-lockfile`

## Git 작성자 규칙 (중요)

**Vercel 팀 빌드 권한은 GitHub 작성자 기준으로 검증됩니다.**

- ✅ 허용: `sw-woo <62142688+sw-woo@users.noreply.github.com>`
- ❌ 차단: `sungwoo <sungwoo@innogrid.com>` → Vercel 이 deployment 를 즉시 ERROR 로 만듦

이 저장소의 `.git/config` 는 local user 로 sw-woo noreply 이메일이 고정돼 있지만, 병렬 에이전트가
global config 로 커밋하면 실패합니다. 따라서 모든 커밋은 반드시 다음 형태로 실행합니다:

```bash
git -c user.name="sw-woo" \
    -c user.email="62142688+sw-woo@users.noreply.github.com" \
    commit -m "..."
```

과거 잘못된 작성자 커밋은 다음으로 rewrite 합니다:

```bash
git rebase --exec 'GIT_COMMITTER_NAME=sw-woo \
  GIT_COMMITTER_EMAIL=62142688+sw-woo@users.noreply.github.com \
  git commit --amend --no-edit --reset-author' <root-commit>
git push --force-with-lease origin main
```

## 빌드 검증 순서

push 전에 반드시:

```bash
pnpm install            # lockfile 동기화
pnpm lint               # ESLint 통과
pnpm build              # 22개 정적 페이지 prerender 성공
```

빌드 실패 시 절대 push 하지 마십시오.

## 브랜치 정책

- 단일 브랜치 `main` 기반. 브랜치 전략을 복잡하게 가져가지 않습니다.
- 큰 변경은 PR 생성 후 Vercel preview 로 확인 → 머지.
- 작은 콘텐츠 수정은 main 직접 push 허용 (세미나 준비 모드).

## Vercel Speed Insights / Analytics

- `@vercel/analytics` 와 `@vercel/speed-insights` 가 설치돼 있습니다.
- Hobby 플랜에서 월 10,000 이벤트 무료 — 이 사이트는 트래픽이 적어 한도 내에서 운영됩니다.
- 상업적 사용 시 Pro 플랜 필요 (약관 기준).

## 롤백 전략

- Vercel 대시보드 → Deployments → 원하는 과거 deployment 의 "Promote to Production"
- 또는 git revert 후 main push (자동 재배포)
- `vercel rollback` CLI 는 settings.json deny 에 있습니다 (사고 방지).

## 환경 변수

`.env.example` 이 템플릿입니다. 실제 값은:

- `NEXT_PUBLIC_SITE_URL` — 사이트 URL (기본값 site-config.ts 에 내장)
- 현재 외부 API 키는 사용하지 않습니다 (live model 호출 없는 정적 사이트)

새 env var 가 필요하면 Vercel 대시보드 → Project Settings → Environment Variables 에 추가하십시오.
커밋에는 절대 실제 값 넣지 마십시오.

## CI 상태 확인

```bash
# 최근 배포 상태 (Vercel MCP 또는 CLI 사용)
vercel list --scope=sungwoowoos-projects

# 또는 Vercel 대시보드
# https://vercel.com/sungwoowoos-projects/aiagentic-coding-harness
```
