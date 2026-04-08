# 50분 발표 데모 안전망

발표 중 dev 서버 또는 Vercel 이 죽었을 때를 대비한 fallback 가이드입니다. 50분 발표 흐름 문서
(`docs/talks/2026-04-08-agentic-coding-harness-50m-flow.md`) 와 함께 책상에 띄워 두십시오.

---

## 1. 1차 (Primary) — Vercel production

가장 정상적인 경로입니다. 발표 시작 5분 전에 한 번 새로고침해서 캐시를 데우십시오.

| 페이지 | URL |
|---|---|
| 홈 | https://aiagentic-coding-harness.vercel.app |
| 핸드북 | https://aiagentic-coding-harness.vercel.app/handbook |
| 핸드북 #past | https://aiagentic-coding-harness.vercel.app/handbook#past |
| 핸드북 #present | https://aiagentic-coding-harness.vercel.app/handbook#present |
| 핸드북 #future | https://aiagentic-coding-harness.vercel.app/handbook#future |
| 5-레이어 아키텍처 | https://aiagentic-coding-harness.vercel.app/architecture/overview |
| Claude Code 셋업 | https://aiagentic-coding-harness.vercel.app/playbook/setup-claude-code |
| Codex 셋업 | https://aiagentic-coding-harness.vercel.app/playbook/setup-codex |
| 스킬 카탈로그 | https://aiagentic-coding-harness.vercel.app/catalog/skills |
| 룰 카탈로그 | https://aiagentic-coding-harness.vercel.app/catalog/rules |
| Zero Trust | https://aiagentic-coding-harness.vercel.app/reference/zero-trust-plugins |
| Token 절감 | https://aiagentic-coding-harness.vercel.app/reference/token-economics |
| /ultraplan | https://aiagentic-coding-harness.vercel.app/reference/ultraplan |
| Claude Code 자료 맵 | https://aiagentic-coding-harness.vercel.app/reference/claude-code-official |
| Codex 자료 맵 | https://aiagentic-coding-harness.vercel.app/reference/codex-official |

---

## 2. 2차 (Secondary) — 로컬 dev 서버

Vercel 이 응답이 느리거나 502 가 뜨는 경우, 사전에 켜둔 로컬 dev 서버를 사용합니다.

```bash
# 발표 30분 전에 미리 실행
cd ~/innogrid-prj/agentic-coding-harness
npm run dev
# http://localhost:3000 에서 확인
```

위 1차 표의 URL 호스트만 `http://localhost:3000` 으로 바꾸면 됩니다.

**주의**: 발표장의 와이파이가 막혀서 NPM 설치가 필요해지면 안 됩니다. 발표 전날 밤에
`node_modules/` 가 채워져 있는지 한 번 확인하십시오.

---

## 3. 3차 (Tertiary) — 정적 빌드 결과물

dev 서버가 죽었지만 와이파이가 살아 있는 경우, 사전에 만들어 둔 production 빌드 결과를
로컬 정적 서버로 띄울 수 있습니다.

```bash
# 발표 직전에 한 번 빌드
cd ~/innogrid-prj/agentic-coding-harness
npm run build
npx serve .next/standalone -l 4000
# http://localhost:4000 에서 확인
```

---

## 4. 4차 (Last resort) — GitHub raw 저장소

위 세 가지가 모두 막히면, GitHub 저장소의 source 파일을 직접 보여 줄 수 있습니다.
페이지 자체는 못 띄우지만 **발표 내용의 사실성** 은 입증됩니다.

| 보여줄 것 | URL |
|---|---|
| 저장소 메인 | https://github.com/sw-woo/aiagentic-coding-harness |
| 핸드북 source | https://github.com/sw-woo/aiagentic-coding-harness/blob/main/src/app/handbook/page.tsx |
| .codex/config.toml | https://github.com/sw-woo/aiagentic-coding-harness/blob/main/.codex/config.toml |
| .claude/settings.json | https://github.com/sw-woo/aiagentic-coding-harness/blob/main/.claude/settings.json |
| 발표 흐름 문서 | https://github.com/sw-woo/aiagentic-coding-harness/blob/main/docs/talks/2026-04-08-agentic-coding-harness-50m-flow.md |

---

## 5. 발표 시작 전 5분 체크리스트

- [ ] Vercel 1차 URL 새로고침으로 캐시 워밍 (홈 + 핸드북 + 카탈로그 + zero-trust)
- [ ] 로컬 dev 서버 백그라운드로 켜져 있고 `localhost:3000` 응답 확인
- [ ] 노트북 절전 모드 해제, 화면 잠금 비활성화
- [ ] 브라우저에서 위 1차 표의 12개 URL 모두 새 탭으로 미리 열기
- [ ] 글자 크기 cmd + 두 번 (Mac) 또는 ctrl + 두 번 으로 한 단계 키워 두기 (뒷줄 가독성)
- [ ] 화면 미러링 또는 외부 모니터 연결 확인, 비율 1280×720 이상
- [ ] 카탈로그 페이지 검색창에 미리 `forbidden` 한 번 쳐 보고 결과 카운터가 뜨는지 확인
- [ ] 다크/라이트 토글이 작동하는지 확인 (dark 가 발표장 조명에 더 잘 맞음)

## 6. 발표 중 자주 쓸 단축 흐름

| 흐름 | 키 |
|---|---|
| 새 탭 | `cmd + t` |
| 탭 전환 | `cmd + 1` ~ `cmd + 9` |
| 주소창 포커스 | `cmd + l` |
| 화면 새로고침 | `cmd + r` |
| 강제 새로고침 (캐시 무시) | `cmd + shift + r` |
| 글자 키우기 | `cmd + +` |
| 글자 줄이기 | `cmd + -` |
| 글자 원래대로 | `cmd + 0` |

## 7. 발표 중 사고 발생 시 멘트 (한국어 존댓말)

- (페이지가 안 뜸) **"잠시만요. 캐시 새로고침 한 번 하겠습니다. 그동안 한 가지만 말씀드리면…"** —
  같은 말을 길게 늘리지 말고, 다음 슬라이드의 핵심 한 줄을 미리 던져 두십시오.
- (1차가 안 뜸) **"Vercel 응답이 늦어서 로컬에서 같은 페이지를 띄우겠습니다."** — 즉시 2차로
  전환합니다. 청중에게는 사이트가 “두 곳에서 같이 돌아간다” 는 인상을 줍니다.
- (2차도 안 뜸) **"코드 자체로 보여드리겠습니다. 사실 이게 더 정직할 수도 있습니다."** — 4차의
  GitHub source 로 전환하면서 발표 톤을 잃지 마십시오.

---

**마지막 한 줄**: 데모가 한 번 멈춰도 세미나가 망하지 않습니다. 청중은 발표자의 평정심을
보면서 “이 사람이 자기 시스템을 잘 알고 있구나” 를 느낍니다. 사고가 나면 사고 자체보다
대처를 보고 평가합니다.
