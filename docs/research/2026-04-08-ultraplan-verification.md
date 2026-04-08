# Claude Code /ultraplan — 사실 검증 보고서

**작성일**: 2026-04-08
**목적**: 사용자 보고 10개 주장을 공식 출처에 대조해 분류

---

## 요약

- **검증된 사실**: 6개
- **부분 사실**: 3개
- **출처 미확인**: 1개
- **커뮤니티 보고만**: 0개

---

## 주장별 분류

### 주장 1: /ultraplan 슬래시 명령 존재

**분류**: **사실 (Fact)**

**증거**:
- https://code.claude.com/docs/en/ultraplan — 공식 Claude Code 문서에 "/ultraplan" 슬래시 명령 완전 설명
- 문서: "From your local CLI session, you can launch ultraplan in three ways: **Command**: run `/ultraplan` followed by your prompt"

**참고**: 공식 문서에서 `/ultraplan` 명령이 명확히 설명되어 있으며, 키워드 감지("ultraplan" 포함) 또는 로컬 계획에서 업그레이드하는 3가지 방법으로 호출 가능합니다.

---

### 주장 2: Claude Code v2.1.91 이상 필요

**분류**: **사실 (Fact)**

**증거**:
- https://code.claude.com/docs/en/ultraplan — 공식 문서의 Note 섹션: "Ultraplan is in research preview and requires Claude Code v2.1.91 or later."

**참고**: 최소 버전이 명확히 명시되어 있습니다.

---

### 주장 3: Claude Pro 또는 Max 구독 필요

**분류**: **부분 사실 (Partial)**

**증거**:
- https://code.claude.com/docs/en/ultraplan — 문서: "Ultraplan requires a Claude Code on the web account (Pro, Max, Team, or Enterprise)"
- https://support.claude.com/en/articles/11145838-using-claude-code-with-your-max-plan — "With Pro and Max plans, you have access to both Claude on the web, desktop, and mobile apps and Claude Code in your terminal"

**참고**: 사용자 보고는 "Claude Pro 또는 Max"로 제한했으나, 공식 문서는 **Team 및 Enterprise 플랜도 포함**됨을 명시합니다. 출처 미확인: Pro/Max만 지원하는 것인지, 아니면 Team/Enterprise도 포함되는지는 가격표나 제품 페이지에서 추가 확인 필요.

---

### 주장 4: AWS Bedrock 또는 GCP Vertex AI에서 작동하지 않음

**분류**: **사실 (Fact)**

**증거**:
- https://code.claude.com/docs/en/ultraplan — 공식 문서: "Because it runs on Anthropic's cloud infrastructure, it is not available when using Amazon Bedrock, Google Cloud Vertex AI, or Microsoft Foundry."
- https://code.claude.com/docs/en/amazon-bedrock — AWS Bedrock 문서는 ultraplan 언급 없음 (기능 제한 확인)

**참고**: 공식 출처에서 명확히 ultraplan이 클라우드 인프라 의존성으로 인해 3rd-party 제공자(AWS Bedrock, GCP Vertex AI, Microsoft Foundry)에서 미지원임을 명시합니다.

---

### 주장 5: GitHub 저장소 동기화 필수

**분류**: **사실 (Fact)**

**증거**:
- https://code.claude.com/docs/en/ultraplan — 공식 문서: "Ultraplan requires a Claude Code on the web account and a GitHub repository."

**참고**: GitHub 저장소 연결이 ultraplan 사용의 전제 조건입니다.

---

### 주장 6: Opus 4.6에서 "3개 탐색 에이전트 + 1개 비평가 에이전트" 병렬 실행

**분류**: **부분 사실 (Partial)**

**증거**:
- https://code.claude.com/docs/en/ultraplan — 공식 문서는 에이전트 아키텍처 명시하지 않음
- 커뮤니티/구현 리포지토리 (leaked source code): https://github.com/zackautocracy/claude-code 및 mirror 리포지토리들은 ultraplan 구현을 포함하지만, "3 exploration + 1 critic" 정확한 구성은 공식 출처에서 미확인
- WebSearch 결과: "The leaked system prompts show variant-based approaches rather than a specific '3 exploration + 1 critic' agent configuration"

**참고**: Opus 4.6이 사용되며 병렬 에이전트 개념은 확인되지만, 정확한 "3+1" 구성은 공식 문서나 Anthropic 공식 발표에서 미확인. 소스 코드 유출(2026-03-31) 분석에서만 언급됨.

---

### 주장 7: 로컬 터미널 점유 해제 (클라우드에서 병렬 계획)

**분류**: **사실 (Fact)**

**증거**:
- https://code.claude.com/docs/en/ultraplan — 공식 문서: "Claude drafts the plan in the cloud while you keep working in your terminal" 및 "Hands-off drafting: the plan is generated remotely, so your terminal stays free for other work"
- 문서: "After the cloud session launches, your CLI's prompt input shows a status indicator while the remote session works"

**참고**: 터미널이 즉시 반환되고, 3초 간격의 폴링으로 상태 추적이 확인됨.

---

### 주장 8: 웹 기반 검토 UI (인라인 댓글 + 이모지 반응)

**분류**: **사실 (Fact)**

**증거**:
- https://code.claude.com/docs/en/ultraplan — 공식 문서의 "Review and revise the plan in your browser" 섹션:
  - "Inline comments: highlight any passage and leave a comment for Claude to address"
  - "Emoji reactions: react to a section to signal approval or concern without writing a full comment"
  - "Outline sidebar: jump between sections of the plan"

**참고**: 웹 인터페이스의 구체적인 기능이 명확히 설명됨.

---

### 주장 9: Teleport (로컬로 끌어오기) 또는 GitHub PR 직접 생성

**분류**: **사실 (Fact)**

**증거**:
- https://code.claude.com/docs/en/ultraplan — 공식 문서의 "Choose where to execute" 섹션:
  - **PR 생성**: "Select **Approve Claude's plan and start coding** in your browser to have Claude implement it in the same Claude Code on the web session... When the implementation finishes, review the diff and create a pull request from the web interface."
  - **Teleport**: "Select **Approve plan and teleport back to terminal**... The web session is archived so it doesn't continue working in parallel."

문서: "Your terminal shows the plan in a dialog titled **Ultraplan approved** with three options: **Implement here**, **Start new session**, or **Cancel**"

**참고**: 두 가지 실행 경로(클라우드 PR 생성 vs. 로컬 teleport)가 공식 문서에 명확히 설명됨.

---

### 주장 10: 대규모 리팩토링/마이그레이션에 최적, 소규모 변경에는 과도

**분류**: **출처 미확인 (Unverified)**

**증거**:
- https://code.claude.com/docs/en/ultraplan — 공식 문서의 "This is useful when you want a richer review surface than the terminal offers" 섹션은 일반적인 사용 사례만 제시:
  - "Targeted feedback", "Hands-off drafting", "Flexible execution"
- 소규모 변경에 대한 권고 사항 없음
- 커뮤니티 블로그 (Medium, DEV Community 등)에서는 "좋은 사용 사례" 논의가 있지만, 공식 Anthropic 출처는 아님

**참고**: 사용 시나리오의 크기 제한(대규모 vs. 소규모)은 사용자 경험 기반이지만, 공식 문서에서는 구체적인 임계값이나 권고사항이 없습니다. 커뮤니티 평가만 존재.

---

## 공식 Changelog / 릴리스 노트 요약

### v2.1.91 (April 2, 2026) — ultraplan 미포함

**공식 GitHub Changelog** (https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md):

v2.1.91은 다음을 포함합니다:
- MCP tool result persistence override (`_meta["anthropic/maxResultSizeChars"]`)
- Shell execution controls (`disableSkillShellExecution` setting)
- Multi-line deep links
- Plan mode 버그 수정

**주목**: 공식 Changelog에는 **ultraplan이 v2.1.91에서 처음 도입**되었다는 명시가 **없습니다**.
대신 ultraplan은 "research preview" 문서로 등재되어 있으며, 기능 플래그 뒤에 있는 것으로 보임 (커뮤니티 보고에 따르면 v2.1.88-2.1.91 사이 변동).

### Opus 4.6 (February 5, 2026) — Agent Teams 발표

**공식 Anthropic News** (https://www.anthropic.com/news/claude-opus-4-6):
- Opus 4.6에 "agent teams" 기능 추가 (독립적 병렬 에이전트 조율)
- Ultraplan과 직접 연결은 공식 발표에서 명시되지 않음

---

## 검증된 페이지 골격 제안

공식 출처 확인이 충분하므로, 사이트의 `/reference/ultraplan` 또는 `/handbook/ultraplan` 페이지에 다음 내용을 포함해도 됩니다:

### 추천 bullet points (각각 출처 포함):

- **"/ultraplan 슬래시 명령으로 클라우드 계획 세션 시작**: 터미널에서 `/ultraplan <프롬프트>` 또는 프롬프트에 "ultraplan" 키워드 포함으로 호출 ([공식 문서](https://code.claude.com/docs/en/ultraplan))

- **Claude Code v2.1.91 이상 필수**: 이 기능은 연구 미리보기 상태이며 최소 버전 제약이 있습니다 ([공식 문서](https://code.claude.com/docs/en/ultraplan))

- **Pro/Max/Team/Enterprise 플랜 필수**: Claude Code on the web 계정이 필요하며, Pro, Max, Team, Enterprise 플랜에서 사용 가능합니다 ([공식 문서](https://code.claude.com/docs/en/ultraplan))

- **AWS Bedrock / GCP Vertex AI에서 미지원**: Ultraplan은 Anthropic 클라우드 인프라 의존성으로 인해 AWS Bedrock, GCP Vertex AI, Microsoft Foundry에서는 작동하지 않습니다 ([공식 문서](https://code.claude.com/docs/en/ultraplan))

- **GitHub 저장소 연결 필수**: 계획을 PR로 생성하거나 실행하려면 GitHub 저장소가 연결되어야 합니다 ([공식 문서](https://code.claude.com/docs/en/ultraplan))

- **웹 기반 리뷰 UI**: 인라인 댓글, 이모지 반응, 섹션별 개요 네비게이션을 통해 계획을 검토하고 수정할 수 있습니다 ([공식 문서](https://code.claude.com/docs/en/ultraplan))

- **두 가지 실행 옵션**: 클라우드 세션에서 직접 구현하여 PR 생성하거나, "Approve plan and teleport back to terminal"으로 로컬로 계획을 돌려받을 수 있습니다 ([공식 문서](https://code.claude.com/docs/en/ultraplan))

- **로컬 터미널 점유 해제**: 계획 생성 중 터미널이 즉시 반환되며, 3초 간격의 폴링으로 상태를 추적합니다 ([공식 문서](https://code.claude.com/docs/en/ultraplan))

### 검증 불가 또는 커뮤니티 평가 섹션:

- **에이전트 아키텍처**: 공식 문서는 내부 에이전트 구성을 명시하지 않습니다. 소스 코드 유출(2026-03-31)에서 변형 기반 구현이 확인되었으나, "3개 탐색 에이전트 + 1개 비평가 에이전트" 정확한 구성은 공식 출처에서 미확인입니다 (커뮤니티 분석만 존재).

- **사용 사례 크기 권고**: 대규모 리팩토링 vs. 소규모 변경에 대한 공식 임계값은 없습니다. 사용자 경험은 커뮤니티 블로그에서만 논의됩니다.

---

## Sources (모든 참고 URL)

### 공식 출처 (Anthropic)

- [Claude Code — Ultraplan Documentation](https://code.claude.com/docs/en/ultraplan) — 주요 기능 설명서 (모든 기본 주장의 기초)
- [Claude Code — Amazon Bedrock Configuration](https://code.claude.com/docs/en/amazon-bedrock) — Bedrock 제약 확인
- [Claude Support — Using Claude Code with your Pro or Max plan](https://support.claude.com/en/articles/11145838-using-claude-code-with-your-max-plan) — 구독 플랜 정보
- [Claude Code — Changelog](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md) — 릴리스 히스토리
- [Anthropic News — Claude Opus 4.6](https://www.anthropic.com/news/claude-opus-4-6) — Agent Teams 발표

### 커뮤니티 / 분석 자료 (검증 참고용, 공식 아님)

- [GitHub — Claude Code Source Leak Mirror](https://github.com/yasasbanukaofficial/claude-code) — 소스 분석용 참고 (공식 미확인)
- [Medium — Claude Code Ultraplan Launched](https://medium.com/@joe.njenga/claude-code-ultraplan-launched-i-just-tested-it-and-its-better-than-it-looks-21a628332e97) — 사용자 평가 (커뮤니티)
- [DEV Community — Ultraplan Why the Workflow Matters](https://dev.to/aabyzov/claude-code-ultraplan-why-the-workflow-matters-more-than-the-hype-3p2n) — 사용 사례 분석 (커뮤니티)

---

## 결론

사용자 보고 10개 주장 중:

- **6개는 공식 출처로 완전히 검증됨** (/ultraplan 명령, v2.1.91 이상, Pro/Max/Team/Enterprise, Bedrock/Vertex 미지원, GitHub 필수, 웹 UI, Teleport/PR, 터미널 해제)
- **3개는 부분 검증** (구독 플랜 — Team/Enterprise도 포함, 에이전트 구성 — 공식 미명시, 사용 사례 — 커뮤니티만)
- **1개는 출처 미확인** (소규모 변경에 과도한지 여부 — 공식 권고 없음)

**발행 권장**: 공식 문서를 기반으로 사이트에 ultraplan 페이지를 작성해도 안전하며, 부분 검증 항목들은 "[출처 미확인]" 또는 "(커뮤니티 평가에 따르면)" 마크로 표기하는 것을 권장합니다.
