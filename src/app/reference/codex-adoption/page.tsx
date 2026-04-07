import type { Metadata } from "next";
import Link from "next/link";
import {
  Prose,
  ProseEyebrow,
  ProseHeading,
  ProseParagraph,
} from "@/components/content/prose";
import { CodeBlock } from "@/components/content/code-block";
import { Callout } from "@/components/content/callout";

const SOURCE_LINKS = [
  { label: "OpenAI Codex 홈", href: "https://developers.openai.com/codex/" },
  { label: "Config Basics", href: "https://developers.openai.com/codex/config-basic" },
  { label: "Config Reference", href: "https://developers.openai.com/codex/config-reference" },
  { label: "Hooks", href: "https://developers.openai.com/codex/hooks" },
  { label: "Subagents", href: "https://developers.openai.com/codex/subagents" },
  { label: "MCP", href: "https://developers.openai.com/codex/mcp" },
] as const;

export const metadata: Metadata = {
  title: "Codex 도입 패턴과 설치 가이드",
  description:
    "Codex 하네스를 새 저장소에 어떻게 들여와야 하는지, 최소 설치부터 표준 설치, 전체 예시, 문제 해결까지 실무형으로 정리한 가이드입니다.",
};

export default function CodexAdoptionPage() {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose size="wide">
        <ProseEyebrow>참고자료 · Codex Setup</ProseEyebrow>
        <ProseHeading level={1}>Codex 도입 패턴과 설치 가이드</ProseHeading>
        <ProseParagraph>
          좋은 문서는 “기능이 있다”에서 끝나지 않고 “그래서 내 저장소에는 무엇을 어디에 넣으면 되는가”까지 내려와야 합니다.
          이 페이지는 그런 관점에서, Codex 하네스를 새 저장소에 들여올 때 가장 실용적인 설치 패턴만 추려 정리한 가이드입니다.
        </ProseParagraph>

        <Callout tone="note" title="이 페이지의 관점">
          <p>
            모든 기능을 한 번에 넣는 것이 목표가 아닙니다. <strong>최소 설치 → 표준 설치 → 팀 확장</strong> 순서로 가는 것이 목표입니다.
          </p>
        </Callout>

        <div className="mt-6 flex flex-wrap gap-3">
          {SOURCE_LINKS.map((source) => (
            <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline">
              {source.label} ↗
            </a>
          ))}
        </div>

        <ProseHeading level={2}>1. 어떤 설치 패턴이 있나</ProseHeading>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">최소 설치</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              AGENTS.md + config.toml + 기본 verify 명령만 먼저 둡니다. 개인 실험이나 작은 저장소에 적합합니다.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">표준 설치</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              rules, hooks, reviewer/verifier subagent, 2~3개 skill을 추가합니다. 팀 공통 기본값으로 가장 무난합니다.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">확장 설치</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              MCP, 팀별 subagent, rollout 가드레일, 관측성까지 붙입니다. 플랫폼 저장소나 멀티모듈 저장소에 적합합니다.
            </p>
          </div>
        </div>

        <ProseHeading level={2}>2. 최소 설치</ProseHeading>
        <ProseParagraph>
          처음에는 두 파일만 있어도 충분합니다. 핵심은 모델보다 검증 명령을 먼저 고정하는 것입니다.
        </ProseParagraph>
        <CodeBlock filename="최소 구조" language="text">
{`my-project/
├── AGENTS.md
└── .codex/
    └── config.toml`}
        </CodeBlock>

        <CodeBlock filename="AGENTS.md" language="markdown">
{`# AGENTS.md

- 작업 전 README 와 docs/ 를 먼저 읽습니다.
- 완료 기준은 빌드, 테스트, 린트 결과를 확인한 뒤 요약하는 것입니다.
- 위험 명령과 외부 반영 작업은 사용자 확인을 거칩니다.

## 검증
- Kotlin: source ~/.zshrc >/dev/null 2>&1 && export GRADLE_USER_HOME="$PWD/.gradle-user" && ./gradlew ktlintCheck test --no-daemon`}
        </CodeBlock>

        <CodeBlock filename=".codex/config.toml" language="toml">
{`model = "gpt-5.4"
model_reasoning_effort = "high"
sandbox_mode = "workspace-write"
approval_policy = "on-request"

[sandbox_workspace_write]
network_access = false`}
        </CodeBlock>

        <ProseHeading level={2}>3. 표준 설치</ProseHeading>
        <ProseParagraph>
          팀에서 계속 쓰려면 여기까지는 올리는 편이 좋습니다. 특히 rules 와 hooks 가 들어와야 “실수 방지”가 생깁니다.
        </ProseParagraph>
        <CodeBlock filename="표준 구조" language="text">
{`my-project/
├── AGENTS.md
├── .codex/
│   ├── config.toml
│   ├── hooks.json
│   ├── hooks/
│   │   ├── session_start_context.py
│   │   ├── pre_bash_guard.py
│   │   └── post_kt_lint.sh
│   ├── rules/
│   │   └── default.rules
│   ├── agents/
│   │   ├── reviewer.toml
│   │   └── gradle-verifier.toml
│   └── skills/
│       ├── review/SKILL.md
│       └── gradle/SKILL.md
└── scripts/
    └── verify_codex_harness.sh`}
        </CodeBlock>

        <ProseHeading level={2}>4. 필요한 것만 선택 설치하는 방법</ProseHeading>
        <ProseParagraph>
          참고 사이트에서 가장 좋았던 점 중 하나가 “전체 복사” 대신 “필요한 것만 가져오기”를 강조한다는 점입니다.
          우리도 같은 방식으로 보는 것이 좋습니다.
        </ProseParagraph>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">reviewer만 먼저</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              코드 리뷰와 post-change validation 니즈가 가장 먼저 있으면 reviewer subagent와 review skill만 먼저 넣습니다.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">hooks만 먼저</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              파괴 명령 차단과 수정 직후 ktlintCheck 같은 guardrail이 급하면 hooks와 rules부터 넣습니다.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">MCP만 먼저</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              문서 grounding이나 브라우저 검증이 급하면 Context7, Playwright MCP부터 먼저 붙입니다.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">verify 스크립트만 먼저</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              팀의 공통 신뢰 기반이 약하면 verify 스크립트를 먼저 표준화한 뒤 나머지 하네스를 얹는 편이 좋습니다.
            </p>
          </div>
        </div>

        <ProseHeading level={2}>5. copy-ready 전체 예시</ProseHeading>
        <CodeBlock filename=".codex/config.toml" language="toml">
{`model = "gpt-5.4"
model_reasoning_effort = "high"
sandbox_mode = "workspace-write"
approval_policy = "on-request"

[sandbox_workspace_write]
network_access = false

[features]
codex_hooks = true
multi_agent = true
experimental_use_rmcp_client = true

[profiles.review]
model = "gpt-5.4-mini"
sandbox_mode = "read-only"

[agents.reviewer]
config_file = ".codex/agents/reviewer.toml"

[mcp_servers.context7]
url = "https://mcp.context7.com/mcp"

[mcp_servers.playwright]
command = "npx"
args = ["@playwright/mcp@latest", "--headless"]`}
        </CodeBlock>

        <CodeBlock filename=".codex/rules/default.rules" language="text">
{`prefix_rule(["git", "reset", "--hard"], "forbidden")
prefix_rule(["rm", "-rf"], "forbidden")
prefix_rule(["terraform", "destroy"], "forbidden")
prefix_rule(["kubectl", "delete"], "forbidden")
prefix_rule(["git", "push"], "prompt")
prefix_rule(["gh", "pr", "create"], "prompt")`}
        </CodeBlock>

        <CodeBlock filename=".codex/hooks.json" language="json">
{`{
  "hooks": {
    "SessionStart": [
      {
        "command": "/usr/bin/python3 $(git rev-parse --show-toplevel)/.codex/hooks/session_start_context.py"
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "command": "/usr/bin/python3 $(git rev-parse --show-toplevel)/.codex/hooks/pre_bash_guard.py"
      }
    ]
  }
}`}
        </CodeBlock>

        <ProseHeading level={2}>6. 문제 해결 패턴</ProseHeading>
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">설정이 적용되지 않는 것 같을 때</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              먼저 작업 디렉터리가 프로젝트 루트인지 확인하고, 그다음 <code className="rounded bg-background px-1 py-0.5 font-mono text-sm">.codex/config.toml</code> 위치와 문법을 봅니다.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">hooks가 안 도는 것 같을 때</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              <code className="rounded bg-background px-1 py-0.5 font-mono text-sm">[features] codex_hooks = true</code>, hooks.json 위치, matcher, stdin payload 파싱을 순서대로 봅니다.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">MCP가 연결되지 않을 때</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              원격 MCP는 OAuth나 네트워크 문제일 수 있고, stdio MCP는 command/args 오류일 가능성이 큽니다. 두 경우를 분리해서 봐야 합니다.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">Gradle이 자꾸 환경 문제를 낼 때</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              저장소 로컬 캐시와 셸 초기화를 명시적으로 맞춥니다. 보통 <code className="rounded bg-background px-1 py-0.5 font-mono text-sm">source ~/.zshrc</code> 와 <code className="rounded bg-background px-1 py-0.5 font-mono text-sm">GRADLE_USER_HOME</code> 고정으로 해결됩니다.
            </p>
          </div>
        </div>

        <Callout tone="tip" title="실무 권장 순서">
          <p>1. verify 스크립트부터 고정합니다.</p>
          <p>2. AGENTS.md 와 config.toml 을 넣습니다.</p>
          <p>3. rules 와 hooks 를 추가합니다.</p>
          <p>4. reviewer / verifier 를 붙입니다.</p>
          <p>5. 마지막에 MCP를 붙입니다.</p>
        </Callout>

        <ProseHeading level={2}>7. 같이 읽으면 좋은 페이지</ProseHeading>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <Link href="/reference/automation-patterns" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">에이전트 자동화 패턴</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              headless 실행, 구조화된 출력, CI/CD 연동 패턴을 같이 보려면 이 페이지가 맞습니다.
            </p>
          </Link>
          <Link href="/reference/codex-official" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">Codex 공식 자료 맵</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              설치 뒤에 어떤 공식 문서를 어떤 순서로 읽어야 하는지 정리한 페이지입니다.
            </p>
          </Link>
          <Link href="/reference/codex-hooks" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">Codex Hooks 심화</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              hooks와 dynamic guardrail을 더 깊게 보려면 이 페이지로 이어집니다.
            </p>
          </Link>
          <Link href="/playbook/setup-codex" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">Codex 심화 플레이북</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              전체 하네스를 설계하고 운영하는 장문형 문서를 보려면 여기로 이어집니다.
            </p>
          </Link>
        </div>
      </Prose>
    </div>
  );
}
