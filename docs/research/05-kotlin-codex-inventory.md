# Source Repository Inventory (Catalog Source-of-Truth)

**Generated**: 2026-04-07  
**Repository**: `[internal source repository]`  
**Harness Status**: Active (Claude Code + Codex dual support)

---

## 1. Skills (Claude Code)

Claude Code skills are defined in `.claude/skills/*/SKILL.md` with frontmatter metadata.

| Skill | Description | Allowed-Tools | Model | File Path | First Paragraph |
|-------|-------------|---|---|---|---|
| bootstrap | 새 Kotlin 모듈 또는 기능을 프로젝트 컨벤션에 따라 스캐폴딩. 모듈명을 인자로 받는다. | (none) | (default) | `.claude/skills/bootstrap/SKILL.md` | `/bootstrap <이름>` |
| verify | 하네스와 제품의 전체 검증 파이프라인 실행. Kotlin 린트+테스트, Python 테스트, 프론트엔드 빌드, E2E를 모두 통과해야 성공. | (none) | (default) | `.claude/skills/verify/SKILL.md` | 절차 |
| deploy | staging 배포 준비. 빌드 검증 후 브랜치 생성 및 배포 체크리스트 실행. | (none) | (default) | `.claude/skills/deploy/SKILL.md` | 절차 |
| document | 현재 코드 상태 기반으로 모듈 맵, API 표면, 모델 카탈로그, 테스트 커버리지 문서를 자동 생성/갱신. | (none) | (default) | `.claude/skills/document/SKILL.md` | 범위 |
| test-all | 전체 테스트 스위트 실행. Kotlin(Gradle), Python(unittest), 프론트엔드(npm build), E2E를 순서대로 실행하고 결과를 요약한다. | (none) | (default) | `.claude/skills/test-all/SKILL.md` | 실행 순서 |
| deploy-check | 프로젝트가 staging 배포 준비가 되었는지 8항목 체크리스트로 검증. | (none) | (default) | `.claude/skills/deploy-check/SKILL.md` | 체크리스트 |
| review | 현재 변경사항의 코드 리뷰. git diff 기반으로 Kotlin/Python/Frontend/인프라 변경을 검토하고 품질, 안전성, 누락 테스트를 보고한다. | (none) | (default) | `.claude/skills/review/SKILL.md` | 현재 커밋되지 않은 변경사항의 품질, 안전성, 정확성을 검토한다. |
| refactor | 지정된 코드 영역의 중복, 복잡도, 네이밍, 아키텍처 경계 위반을 분석하고 리팩토링을 제안. 즉시 수정하지 않고 사용자 확인 후 진행. | (none) | (default) | `.claude/skills/refactor/SKILL.md` | `/refactor <경로>` |

**Claude Code Skills Total**: 8

---

## 2. Skills (Codex)

Codex custom skills are defined in `.agents/skills/*/SKILL.md` without frontmatter.

| Name | Title | First Paragraph (Description) | File Path |
|------|-------|---|---|
| aiops-kotlin-service | AIOps Kotlin Service | Use this skill for Kotlin backend work in an AIOps-style platform. | `.agents/skills/aiops-kotlin-service/SKILL.md` |
| codex-sandbox-shell | Codex Sandbox Shell | 이 스킬은 이 저장소에서 `aiops sh`나 검증용 shell script를 만들 때 사용합니다. | `.agents/skills/codex-sandbox-shell/SKILL.md` |
| gradle-codex | Gradle Codex | Use this skill whenever the task needs Gradle commands in this repository. | `.agents/skills/gradle-codex/SKILL.md` |
| kotlin-review | Kotlin Review | Use this skill for code review or post-change validation in this repository. | `.agents/skills/kotlin-review/SKILL.md` |
| mlops-python-platform | MLOps Python Platform | Use this skill for Python-side MLOps work in a mixed Kotlin/Python platform. | `.agents/skills/mlops-python-platform/SKILL.md` |
| platform-safety | Platform Safety | Use this skill when tasks touch deployment, orchestration, runbooks, clusters, or registry promotion workflows. | `.agents/skills/platform-safety/SKILL.md` |
| ralphup-codex | Ralphup Codex | Use this skill when the user wants semi-automated scaffolding in this repository. | `.agents/skills/ralphup-codex/SKILL.md` |

**Codex Skills Total**: 7

---

## 3. Subagents (Claude Code)

Claude Code subagents are defined in `.claude/agents/*.md` with frontmatter metadata.

| Name | Description | Model | Tools | File Path |
|------|---|---|---|---|
| kotlin-reviewer | Kotlin 코드 리뷰 전문가. 코드 변경 후 행동 회귀, 누락 테스트, API 계약 변경, 동시성 문제를 검사한다. 코드 변경 후 자동으로 사용. | sonnet | Read, Grep, Glob, Bash | `.claude/agents/kotlin-reviewer.md` |
| python-mlops-reviewer | Python MLOps 코드 리뷰. 타입 인터페이스, 모델 라이프사이클 안전, 임계값 드리프트, 프로덕션 변이를 검사한다. | sonnet | Read, Grep, Glob, Bash | `.claude/agents/python-mlops-reviewer.md` |
| ops-safety-auditor | 운영 안전 감사. 파괴적 명령, 프로덕션 변이 경로, 롤아웃 리스크, dry-run 누락을 검사한다. 인프라 변경 시 자동 사용. | sonnet | Read, Grep, Glob | `.claude/agents/ops-safety-auditor.md` |

**Claude Code Subagents Total**: 3

---

## 4. Subagents (Codex)

Codex subagents are defined in `.codex/agents/*.toml` with TOML configuration.

| Name | Model | Sandbox Mode | Description | System Prompt (First 2 Lines) | File Path |
|------|---|---|---|---|---|
| reviewer | gpt-5.4-mini | read-only | Read-only Kotlin and Gradle reviewer focused on regressions, risky edits, and missing tests. | Review changes without editing files. / Prioritize behavioral regressions, missing tests, Gradle misuse, and JDK compatibility. | `.codex/agents/reviewer.toml` |
| gradle_verifier | gpt-5.4-mini | workspace-write | Verification worker for this repository's Codex-safe Gradle workflow. | You verify Kotlin and Gradle changes in this repository. / Always load shell setup first and keep Gradle state inside the repository: | `.codex/agents/gradle-verifier.toml` |
| docs_researcher | gpt-5.4-mini | read-only | Read-only documentation specialist for official API, Gradle, and Kotlin behavior checks. | Use official documentation and primary sources when verifying behavior. / Prefer concise answers with links or exact references. | `.codex/agents/docs-researcher.toml` |
| kotlin_platform_reviewer | gpt-5.4-mini | read-only | Read-only reviewer for Kotlin services, APIs, orchestration, and operational backend changes. | Review Kotlin backend and service-layer changes in an AIOps platform. / Prioritize behavioral regressions, operational safety, missing tests, API contract drift, and concurrency issues. | `.codex/agents/kotlin-platform-reviewer.toml` |
| python_mlops_reviewer | gpt-5.4-mini | read-only | Read-only reviewer for Python MLOps pipelines, registry interactions, drift detection, and offline evaluation code. | Review Python MLOps changes with attention to typed interfaces, threshold/config drift, unsafe production mutations, and missing offline validation. / Prefer findings about model lifecycle safety, reproducibility, and regression risk. | `.codex/agents/python-mlops-reviewer.toml` |
| ops_safety_auditor | gpt-5.4-mini | read-only | Read-only auditor for deployment, runbook, infra, and cluster-safety risks in an AIOps/MLOps platform. | Audit changes for operational safety. / Focus on destructive commands, production mutation paths, rollout risk, missing dry-run or diff steps, and unsafe remediation behavior. | `.codex/agents/ops-safety-auditor.toml` |
| ralphup_builder | gpt-5.4-mini | workspace-write | Workspace-write semi-automated builder for repetitive, low-risk scaffolding in this repository. Defers policy, RBAC, approval, audit, and operational safety decisions to human review. | Use the repository Ralphup skill and the following documents as the source of truth: / - docs/handoffs/ralphup-work-split.md | `.codex/agents/ralphup-builder.toml` |

**Codex Subagents Total**: 7

---

## 5. Hooks (Claude Code)

### Settings Configuration
**File**: `.claude/settings.json`

**Hooks Section** (3 events):

| Event | Matcher | Command |
|-------|---------|---------|
| SessionStart | (empty) | `/usr/bin/python3 "$CLAUDE_PROJECT_DIR/.claude/hooks/session_start_context.py"` |
| PreToolUse | Bash | `/usr/bin/python3 "$CLAUDE_PROJECT_DIR/.claude/hooks/pre_bash_guard.py"` |
| PostToolUse | Write\|Edit | `bash "$CLAUDE_PROJECT_DIR/.claude/hooks/post_kt_lint.sh"` |

### Hook Scripts

| Script | File Path | First Comment Block |
|--------|---|---|
| session_start_context.py | `.claude/hooks/session_start_context.py` | 세션 시작 시 저장소 컨텍스트를 주입하는 SessionStart 훅. 공식 문서 참고: https://code.claude.com/docs/en/hooks#sessionstart - SessionStart는 모든 세션에서 실행 — 빠르게 유지할 것 |
| pre_bash_guard.py | `.claude/hooks/pre_bash_guard.py` | 위험한 Bash 명령을 실행 전에 차단하는 PreToolUse 훅. 공식 문서 참고: https://code.claude.com/docs/en/hooks |
| post_kt_lint.sh | `.claude/hooks/post_kt_lint.sh` | Kotlin 파일 수정 후 자동 ktlint 검사하는 PostToolUse 훅. Write 또는 Edit 도구로 .kt 파일 수정 시 자동 실행 |

**Claude Code Hooks Total**: 3 events, 3 scripts

---

## 6. Hooks (Codex)

### Hooks Configuration
**File**: `.codex/hooks.json`

**Hooks Section** (3 events):

| Event | Matcher | Command |
|-------|---------|---------|
| SessionStart | startup\|resume | `/usr/bin/python3 "$(git rev-parse --show-toplevel)/.codex/hooks/session_start_context.py"` |
| PreToolUse | Bash | `/usr/bin/python3 "$(git rev-parse --show-toplevel)/.codex/hooks/pre_bash_guard.py"` |
| PostToolUse | Write\|Edit\|MultiEdit\|ApplyPatch | `bash "$(git rev-parse --show-toplevel)/.codex/hooks/post_kt_lint.sh"` |

### Hook Scripts

| Script | File Path | First Comment Block |
|--------|---|---|
| session_start_context.py | `.codex/hooks/session_start_context.py` | Emit repository-specific startup context for Codex sessions. |
| pre_bash_guard.py | `.codex/hooks/pre_bash_guard.py` | Block obviously destructive Bash commands before execution. |
| post_kt_lint.sh | `.codex/hooks/post_kt_lint.sh` | Codex PostToolUse hook for Kotlin edits. Reads stdin JSON payload, extracts file path, and runs Gradle ktlint when a .kt file was touched. |

**Codex Hooks Total**: 3 events, 3 scripts

---

## 7. Permissions (Claude Code)

**File**: `.claude/settings.json`

### Allow Rules (24 rules)

```
Bash(source ~/.zshrc*)
Bash(./gradlew *)
Bash(make *)
Bash(cd frontend && npm *)
Bash(PYTHONPATH=python-mlops python3 *)
Bash(cd python-mlops && *)
Bash(git status*)
Bash(git diff*)
Bash(git log*)
Bash(git branch*)
Bash(git stash*)
Bash(docker compose ps*)
Bash(docker compose logs*)
Bash(docker compose up*)
Bash(docker compose down)
Bash(mkdir *)
Bash(python3 -m unittest *)
Bash(python3 -m pytest *)
Bash(npx playwright *)
Bash(wc *)
Bash(grep *)
Bash(find *)
Bash(head *)
Bash(tail *)
```

### Deny Rules (18 rules)

```
Bash(git reset --hard*)
Bash(git push --force*)
Bash(git push -f *)
Bash(rm -rf /*)
Bash(rm -rf .*)
Bash(terraform apply*)
Bash(terraform destroy*)
Bash(kubectl delete*)
Bash(helm uninstall*)
Bash(helm delete*)
Bash(mlflow models delete*)
Bash(docker system prune*)
Read(.env)
Read(.env.*)
Read(**/*.pem)
Read(**/*.key)
Read(**/*.p12)
Read(secrets/**)
```

---

## 8. Path-Specific Rules (Claude Code)

Claude Code rules are defined in `.claude/rules/*.md` with frontmatter path matching.

| Filename | First Heading | One-Sentence Summary | File Path |
|----------|---|---|---|
| kotlin.md | Kotlin 규칙 | Enforce .editorconfig, ktlint compliance, immutability, coroutines for async work, JDK 21 targeting, and Gradle setup prelude. | `.claude/rules/kotlin.md` |
| python-mlops.md | Python MLOps 규칙 | Restrict to offline-safe logic, enforce type hints and deterministic config, separate experiment from production serving, and use repository test commands. | `.claude/rules/python-mlops.md` |
| frontend.md | 프론트엔드 규칙 | Use Next.js 15.4 + React 19 + TypeScript with @innogrid/ui, support both server and mock mode, and run build/E2E commands. | `.claude/rules/frontend.md` |
| infra-safety.md | 인프라 안전 규칙 | Prioritize read/diff/validate/plan operations; forbid destructive/state-changing commands without explicit user request and approval. | `.claude/rules/infra-safety.md` |
| kotlin-patterns.md | Kotlin/Ktor 코드 패턴 (localdocs/09 기준) | Implement all features with 4-Layer structure (api → service → repository → DSLContext), use Application extensions for routes, Koin for DI, and suspend functions for async. | `.claude/rules/kotlin-patterns.md` |
| database.md | 데이터베이스 규칙 (localdocs/03 기준) | Follow DDL-first workflow with jOOQ code generation, use pgvector with TEXT→vector(N) migration pattern and /* [jooq ignore] */ guards, and apply soft-delete with partial unique indexes. | `.claude/rules/database.md` |
| python-integration.md | Python-Kotlin 통합 규칙 (localdocs/06, 08 기준) | Integrate via RabbitMQ using rabbitRpc() for <10s sync tasks and rabbitPublish()+callback for async; correlate requests with correlationId; classify Python features as Type A (passthrough), Type B (progress callback), or Type C (persist result). | `.claude/rules/python-integration.md` |
| api-security.md | API 인증/보안 규칙 (localdocs/07 기준) | Implement browser UI with OIDC Authorization Code Flow+PKCE, internal clients with Password Grant, protect /api/v1/* with JWT+role verification, and forbid UI-only authorization. | `.claude/rules/api-security.md` |

**Claude Code Rules Total**: 8

---

## 9. Execpolicy Rules (Codex)

**File**: `.codex/rules/default.rules`

All rules use `prefix_rule()` syntax with `pattern`, `decision`, and `justification` fields.

| Pattern | Decision | Justification |
|---------|----------|---|
| ["git", "reset", "--hard"] | forbidden | Hard resets are destructive and should not run outside the sandbox. |
| ["rm", "-rf"] | forbidden | Recursive forced deletes are destructive and should not run outside the sandbox. |
| ["terraform", "apply"] | forbidden | Infrastructure apply commands require a human-controlled workflow. |
| ["terraform", "destroy"] | forbidden | Infrastructure destroy commands require a human-controlled workflow. |
| ["kubectl", "apply"] | prompt | Cluster apply commands should be deliberate in an AIOps/MLOps platform. |
| ["kubectl", "delete"] | forbidden | Cluster delete commands require a human-controlled workflow. |
| ["helm", "upgrade"] | prompt | Helm upgrade commands can mutate running platform workloads and should be confirmed. |
| ["helm", "uninstall"] | forbidden | Helm uninstall commands are destructive and should not run outside a human-controlled workflow. |
| ["mlflow", "models", "delete"] | forbidden | Model deletion commands are destructive and should not run outside a human-controlled workflow. |
| ["git", "push"] | prompt | Publishing commits outside the local repository should always be deliberate. |
| ["gh", "pr", "create"] | prompt | Opening pull requests should be confirmed explicitly. |
| ["brew", "install"] | prompt | Installing system packages should always be confirmed explicitly. |

**Codex Execpolicy Rules Total**: 12 rules (16 prefix_rule entries including not_match variants)

---

## 10. Slash Commands (Claude Code Legacy)

Legacy slash commands are defined in `.claude/commands/*.md` for backward compatibility.

| Filename |
|----------|
| review.md |
| test-all.md |
| verify.md |
| bootstrap.md |
| deploy-check.md |
| document.md |
| deploy.md |
| refactor.md |

**Claude Code Slash Commands Total**: 8

---

## 11. Project Memory Files

### CLAUDE.md
- **File Path**: `[internal source repository]/CLAUDE.md`
- **Line Count**: 139
- **Has @import**: No (imports `@AGENTS.md` which is in same directory)
- **Purpose**: Primary project memory for Claude Code. Contains tech stack, module structure, architecture boundaries, coding conventions, Gradle commands, Python commands, frontend commands, validation bar, local infra, security rules, Git workflow, subagent patterns, PRD contract, and slash command reference.

### AGENTS.md
- **File Path**: `[internal source repository]/AGENTS.md`
- **Line Count**: 156
- **Purpose**: Primary project guidelines for Codex. References harness documentation, product-complete verification bar, development loop orchestration keywords, escalation criteria, Python MLOps section, and includes all module documentation alongside instruction sets.

---

## 12. Verification Scripts

**File Path**: `[internal source repository]/scripts/`

| Script | Purpose |
|--------|---------|
| verify_codex_harness.sh | Primary harness verification script (identified as verification harness) |
| setup-claude-code-harness.sh | Claude Code harness initialization setup |
| setup-codex-harness.sh | Codex harness initialization setup |
| run_local_ct_approval_e2e.sh | CT approval end-to-end test (product verification) |
| run_local_admin_control_plane_e2e.sh | Admin control plane E2E test |
| run_local_portal_e2e.sh | Portal E2E test |
| run_local_product_e2e.sh | Product-wide E2E test |
| run_frontend_server_mode.sh | Frontend server mode launcher |
| run_frontend_review_mode.sh | Frontend review mode launcher |
| start_frontend_server_mode.sh | Frontend server startup |
| reset_local_product_state.sh | State reset utility |

**Verification Scripts Total**: 11 (2 harness setup + 1 harness verify + 8 E2E/mode scripts)

---

## 13. Sample Modules

From `CLAUDE.md` section "모듈 구조" (lines 13-22):

| Module | Responsibility |
|--------|---|
| platform-common | 공유 도메인 모델, enum, DTO |
| mlops-orchestrator | 드리프트 감지, 오케스트레이션 정책, 학습 리포트 |
| aiops-api | Ktor API 서버 — 인증, RBAC, CT 실행, 승인, 배포 |
| python-mlops | 오프라인 CT worker, 드리프트 분석, 콜백 (비동기 실행) |
| frontend | Next.js 운영자 포털 — 대시보드, 위저드, 이력, 승인 |
| infra | Docker/k8s 샘플, Keycloak realm, staging 가드레일 |

---

## 14. Counts Summary

| Category | Count |
|----------|-------|
| **Skills (Claude Code)** | 8 |
| **Skills (Codex)** | 7 |
| **Subagents (Claude Code)** | 3 |
| **Subagents (Codex)** | 7 |
| **Hooks Events (Claude Code)** | 3 |
| **Hooks Scripts (Claude Code)** | 3 |
| **Hooks Events (Codex)** | 3 |
| **Hooks Scripts (Codex)** | 3 |
| **Permissions Allow Rules** | 24 |
| **Permissions Deny Rules** | 18 |
| **Path-Specific Rules (Claude Code)** | 8 |
| **Execpolicy Rules (Codex)** | 12 unique patterns |
| **Slash Commands (Legacy)** | 8 |
| **Project Memory Files** | 2 |
| **Verification Scripts** | 11 |
| **Sample Modules** | 6 |
| **Total Skills** | 15 (8 Claude Code + 7 Codex) |
| **Total Agents** | 10 (3 Claude Code + 7 Codex) |
| **Total Rules** | 20 (8 Claude Code + 12 Codex) |
| **Total Hooks** | 6 scripts (3 Claude Code + 3 Codex) |

---

## Manifest Summary

This source harness implements a **dual-agent, dual-rules, single-verification** architecture:

- **Claude Code** uses frontmatter-based SKILL.md, path-specific rules (.md), and hooks in settings.json
- **Codex** uses TOML agents, prefix_rule() policy language, and separate hooks.json
- **Shared verification** across both platforms via identical bash/python commands in CLAUDE.md and AGENTS.md
- **Integrated scaffolding** through Ralphup (claude-code) and ralphup-builder (Codex)
- **Production safety** enforced via 12+ policy rules and dual pre-execution guards in hooks

All metadata extracted 2026-04-07 from live repository state.
