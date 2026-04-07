import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Prose,
  ProseEyebrow,
  ProseHeading,
  ProseParagraph,
} from "@/components/content/prose";
import { CodeBlock } from "@/components/content/code-block";
import { Callout } from "@/components/content/callout";

type Slug = "setup-claude-code" | "setup-codex";
const SLUGS: readonly Slug[] = ["setup-claude-code", "setup-codex"] as const;

const META: Record<Slug, { title: string; eyebrow: string; description: string }> = {
  "setup-claude-code": {
    title: "Claude Code 설정 플레이북",
    eyebrow: "플레이북 · 01",
    description:
      "Anthropic Claude Code 의 프로젝트 메모리·스킬·훅·권한을 처음 셋업하는 가장 짧은 경로입니다.",
  },
  "setup-codex": {
    title: "Codex CLI 설정 플레이북",
    eyebrow: "플레이북 · 02",
    description:
      "OpenAI Codex CLI 의 config.toml·프로필·서브에이전트·execpolicy 를 처음 셋업하는 가장 짧은 경로입니다.",
  },
};

export const dynamicParams = false;
export function generateStaticParams() {
  return SLUGS.map((slug) => ({ slug }));
}
export function generateMetadata({ params }: { params: { slug: string } }) {
  if (!SLUGS.includes(params.slug as Slug)) return {};
  return {
    title: META[params.slug as Slug].title,
    description: META[params.slug as Slug].description,
  };
}

export default async function PlaybookPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!SLUGS.includes(slug as Slug)) notFound();
  const meta = META[slug as Slug];

  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose>
        <ProseEyebrow>{meta.eyebrow}</ProseEyebrow>
        <ProseHeading level={1}>{meta.title}</ProseHeading>
        <p className="mt-4 font-serif text-lg text-foreground-muted">{meta.description}</p>

        {slug === "setup-claude-code" && <ClaudePlaybook />}
        {slug === "setup-codex" && <CodexPlaybook />}

        <hr className="my-12 border-border" />
        <p className="font-mono text-sm text-foreground-muted">
          ←{" "}
          <Link href="/architecture/overview" className="text-accent-2 hover:underline">
            5-레이어 아키텍처로 돌아가기
          </Link>
        </p>
      </Prose>
    </div>
  );
}

function ClaudePlaybook() {
  return (
    <>
      <ProseHeading level={2}>1. 프로젝트 메모리부터 적습니다</ProseHeading>
      <ProseParagraph>
        프로젝트 루트에 <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">CLAUDE.md</code> 파일을 두십시오.
        모든 Claude Code 세션이 시작 시점에 자동으로 읽습니다. 짧고 검증 가능한 문장만 적으십시오.
      </ProseParagraph>
      <CodeBlock filename="CLAUDE.md">
{`# 프로젝트 메모리 (사이트 견본)
- 빌드: pnpm build
- 검증: pnpm lint && pnpm build
- 보안: 운영 계정에 직접 영향이 가는 명령은 반드시 사용자 확인 후 실행
- 한국어 콘텐츠는 모두 존댓말로 작성
- @AGENTS.md
`}
      </CodeBlock>

      <ProseHeading level={2}>2. 권한과 훅을 한 파일에 묶습니다</ProseHeading>
      <ProseParagraph>
        <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">.claude/settings.json</code> 한 파일에
        permissions 와 hooks 를 함께 정의합니다. 위험 명령은 deny, 자주 쓰는 명령은 allow.
      </ProseParagraph>
      <CodeBlock filename=".claude/settings.json" language="json">
{`{
  "permissions": {
    "allow": [
      "Bash(pnpm *)",
      "Bash(git status)",
      "Bash(git log *)"
    ],
    "deny": [
      "Bash(rm -rf *)",
      "Bash(git push --force *)",
      "Read(.env)"
    ]
  },
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "command": "/usr/bin/python3 \\"$CLAUDE_PROJECT_DIR/.claude/hooks/pre_bash_guard.py\\""
      }
    ]
  }
}`}
      </CodeBlock>

      <ProseHeading level={2}>3. 스킬과 서브에이전트는 천천히 추가합니다</ProseHeading>
      <ProseParagraph>
        스킬은 진짜 반복되는 워크플로에만 만드십시오 — <code>/review</code>, <code>/test-all</code>, <code>/verify</code> 정도가 보통 충분합니다.
        서브에이전트는 좁은 read-only 역할(reviewer, gradle_verifier, docs_researcher) 부터 시작합니다.
      </ProseParagraph>

      <Callout tone="tip" title="이 사이트의 견본을 그대로 가져가시려면">
        본 저장소의 <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">.claude/</code> 디렉터리 전체를 복사해서
        시작하시는 것이 가장 빠릅니다. 카탈로그 페이지의 각 항목 좌하단에 정확한 파일 경로가 표시되어 있습니다.
      </Callout>
    </>
  );
}

function CodexPlaybook() {
  return (
    <>
      <ProseHeading level={2}>1. AGENTS.md 와 config.toml 두 파일이면 시작됩니다</ProseHeading>
      <ProseParagraph>
        Codex CLI 는 두 파일만 있어도 동작합니다. <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">AGENTS.md</code> 는
        프로젝트 지침이고, <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">.codex/config.toml</code> 은 런타임 설정입니다.
      </ProseParagraph>
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

[profiles.review]
model = "gpt-5.4"
sandbox_mode = "read-only"
approval_policy = "on-request"

[agents.reviewer]
config_file = ".codex/agents/reviewer.toml"
`}
      </CodeBlock>

      <ProseHeading level={2}>2. 위험 명령은 execpolicy 로 선언합니다</ProseHeading>
      <CodeBlock filename=".codex/rules/default.rules">
{`# 위험 명령은 forbidden, 운영 영향 명령은 prompt
prefix_rule("git reset --hard", "forbidden")
prefix_rule("rm -rf", "forbidden")
prefix_rule("kubectl delete", "forbidden")
prefix_rule("git push", "prompt")
prefix_rule("kubectl apply", "prompt")
`}
      </CodeBlock>

      <ProseHeading level={2}>3. 훅 한두 개만 시작합니다</ProseHeading>
      <ProseParagraph>
        SessionStart 로 컨텍스트를 주입하고, PreToolUse 로 위험 Bash 를 차단하면 90% 의 사고가 사라집니다.
      </ProseParagraph>
      <CodeBlock filename=".codex/hooks.json" language="json">
{`{
  "hooks": {
    "SessionStart": [
      { "command": "/usr/bin/python3 .codex/hooks/session_start_context.py" }
    ],
    "PreToolUse": [
      { "matcher": "Bash", "command": "/usr/bin/python3 .codex/hooks/pre_bash_guard.py" }
    ]
  }
}`}
      </CodeBlock>

      <Callout tone="tip" title="이 사이트의 카탈로그가 그대로 견본입니다">
        카탈로그 페이지에서 “Codex” 플랫폼만 필터링하시면 본 저장소의 실제 Codex 설정 모두를 한 곳에서 보실 수 있습니다.
      </Callout>
    </>
  );
}
