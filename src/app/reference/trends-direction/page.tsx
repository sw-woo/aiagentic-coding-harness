import type { Metadata } from "next";
import Link from "next/link";
import {
  Prose,
  ProseEyebrow,
  ProseHeading,
  ProseParagraph,
} from "@/components/content/prose";
import { Callout } from "@/components/content/callout";

const SOURCES = [
  { label: "Anthropic: Building Effective Agents", href: "https://www.anthropic.com/engineering/building-effective-agents" },
  { label: "Anthropic eBook: Building Effective AI Agents", href: "https://resources.anthropic.com/building-effective-ai-agents" },
  { label: "Anthropic: Subagents", href: "https://docs.anthropic.com/en/docs/claude-code/sub-agents" },
  { label: "Anthropic: Measuring AI agent autonomy in practice", href: "https://www.anthropic.com/news/measuring-agent-autonomy" },
  { label: "Anthropic: Writing effective tools for agents", href: "https://www.anthropic.com/engineering/writing-tools-for-agents" },
  { label: "OpenAI Agents SDK Tracing", href: "https://openai.github.io/openai-agents-python/tracing/" },
  { label: "GitHub MCP Registry Governance", href: "https://docs.github.com/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-mcp-registry" },
  { label: "Obsidian Core plugins", href: "https://help.obsidian.md/plugins" },
  { label: "Obsidian Vault Agent (community)", href: "https://forum.obsidian.md/t/new-plugin-obsidian-vault-agent-terminal-with-claude-code-codex/110024" },
  { label: "Agent Client for Obsidian (community)", href: "https://forum.obsidian.md/t/new-plugin-agent-client-bring-claude-code-codex-gemini-cli-inside-obsidian/108448" },
] as const;

export const metadata: Metadata = {
  title: "최신 트렌드와 방향",
  description:
    "agent teams, autonomy, tool quality, MCP governance, tracing 같은 최신 흐름을 공식 자료 기준으로 정리한 페이지입니다.",
};

export default function TrendsDirectionPage() {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose size="wide">
        <ProseEyebrow>참고자료 · Trends</ProseEyebrow>
        <ProseHeading level={1}>최신 트렌드와 방향</ProseHeading>
        <ProseParagraph>
          최근 agentic coding의 흐름은 “모델이 더 똑똑해졌다” 하나로 설명되지 않습니다. 실제로는
          멀티에이전트 구조, 도구 품질, 자율성 수준, tracing, MCP governance 같은 운영 요소가 빠르게 중요해지고 있습니다.
          이 페이지는 확인된 공식 자료만으로 그 방향을 정리합니다.
        </ProseParagraph>

        <div className="mt-6 flex flex-wrap gap-3">
          {SOURCES.map((source) => (
            <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline">
              {source.label} ↗
            </a>
          ))}
        </div>

        <ProseHeading level={2}>1. 단일 에이전트보다 “구조화된 agent teams”가 더 현실적인 흐름입니다</ProseHeading>
        <ProseParagraph>
          Anthropic의 2024년 글과 후속 eBook은 공통적으로 “복잡한 작업일수록 single prompt보다 구조화된 패턴이 중요하다”고 설명합니다.
          다만 핵심은 무작정 agent를 늘리는 것이 아니라, <strong>sequential</strong>, <strong>parallel</strong>,
          <strong>evaluator-optimizer</strong>, <strong>subagent specialization</strong> 같이 문제에 맞는 구조를 고르는 것입니다.
        </ProseParagraph>
        <Callout tone="note" title="실무 해석">
          <p>
            지금의 흐름은 “Agent Teams를 쓴다” 자체보다, 언제 단일 agent로 충분하고 언제 reviewer/verifier 같은 역할을 분리해야 하는지 판단하는 방향으로 가고 있습니다.
          </p>
        </Callout>

        <ProseHeading level={2}>2. 자율성은 길어지고 있지만, 그만큼 가드레일이 더 중요해집니다</ProseHeading>
        <ProseParagraph>
          Anthropic의 2026년 `Measuring AI agent autonomy in practice`는 실제 사용 환경에서 agent가 더 오래 자율적으로 작업하고 있음을 보여 줍니다.
          해당 글은 Claude Code 세션에서 더 긴 자율 작업이 관찰되고 있음을 사례와 함께 설명합니다.
          이런 방향은 agent 활용도가 커졌다는 뜻이기도 하지만, 동시에 중간에 멈추게 할 조건과 human checkpoint가 더 중요해진다는 뜻이기도 합니다.
        </ProseParagraph>

        <ProseHeading level={2}>3. 앞으로는 도구 품질이 모델 품질만큼 중요해집니다</ProseHeading>
        <ProseParagraph>
          Anthropic의 2025년 `Writing effective tools for agents`는 agent 성능이 모델 하나로 정해지지 않고,
          도구 이름, 설명, 평가, namespacing, tool contract 품질에 크게 좌우된다고 강조합니다.
          즉 MCP나 함수 툴을 많이 붙이는 것이 중요한 게 아니라, 각 도구가 얼마나 명확하고 검증 가능하게 정의되어 있는지가 중요합니다.
        </ProseParagraph>

        <ProseHeading level={2}>4. tracing과 observability는 기본값이 되고 있습니다</ProseHeading>
        <ProseParagraph>
          OpenAI Agents SDK tracing 문서는 tracing이 기본 활성 상태이며, LLM generations, tool calls, handoffs, guardrails까지 trace에 포함한다고 설명합니다.
          이건 중요한 변화입니다. 이제 agent 시스템은 “결과만 보는 도구”가 아니라, 실행 기록을 남기고 다시 개선하는 운영 시스템으로 설계되는 방향으로 가고 있습니다.
        </ProseParagraph>

        <ProseHeading level={2}>5. MCP는 단순 연결이 아니라 governance 문제로 이동하고 있습니다</ProseHeading>
        <ProseParagraph>
          GitHub가 MCP registry governance 문서를 따로 두는 것만 봐도, 이제 MCP는 개발자 개인의 편의 기능이 아니라
          조직 차원의 allowlist, registry, policy 문제로 이동하고 있음을 알 수 있습니다. 앞으로 팀 표준 하네스는
          “무슨 MCP를 쓸까”를 넘어서 “누가 어떤 MCP를 연결할 수 있고, 어떤 registry를 신뢰할 것인가”까지 다루게 될 가능성이 큽니다.
        </ProseParagraph>

        <ProseHeading level={2}>6. 지식베이스형 memory도 하나의 흐름입니다</ProseHeading>
        <ProseParagraph>
          또 하나 눈에 띄는 흐름은 agent를 코드 에디터 안에만 두지 않고, 개인 지식베이스나 팀 문서 공간과 붙이는 방향입니다.
          Obsidian 공식 코어 플러그인 자체가 AI agent를 제공하는 것은 아니지만, Bases, Canvas, Properties 같은 코어 기능은
          지식 구조를 정리하는 기반으로 작동합니다. 그 위에 커뮤니티 플러그인들이 Claude Code, Codex, Gemini CLI, local agent를 연결하려는 시도가 빠르게 늘고 있습니다.
        </ProseParagraph>
        <ProseParagraph>
          중요한 점은 이 흐름을 “Obsidian이 agent 플랫폼이 됐다”로 과장하면 안 된다는 것입니다. 현재 확인된 것은
          <strong>커뮤니티 플러그인 생태계가 빠르게 붙고 있다</strong>는 사실이고, 이걸 통해 memory layer를 더 풍부하게 만들 수 있다는 방향성입니다.
          즉, 코드 저장소 바깥의 note vault, runbook, handoff 문서를 agent의 장기 기억층으로 다루려는 시도가 늘고 있다고 보는 편이 정확합니다.
        </ProseParagraph>

        <ProseHeading level={2}>7. paperclip식 안전 프레이밍은 여전히 살아 있습니다</ProseHeading>
        <ProseParagraph>
          “paperclip maximizer” 자체는 오래된 사고실험이지만, agent 자율성이 길어질수록 그 비유는 다시 실무적인 의미를 갖습니다.
          오늘날 이 비유가 뜻하는 바는 단순합니다. 목표를 잘못 주거나, 중간 가드레일 없이 agent를 오래 돌리면,
          시스템은 우리가 원하지 않는 방향으로도 매우 성실하게 최적화할 수 있다는 점입니다.
        </ProseParagraph>
        <ProseParagraph>
          그래서 최신 트렌드가 autonomy 강화로 갈수록, 동시에 stop condition, human checkpoint, rules, hooks, sandbox, MCP governance 같은
          운영 제약이 같이 강조됩니다. 이 사이트의 관점에서도 paperclip은 철학적 비유가 아니라, 왜 하네스가 필요한지를 설명하는 안전 프레임으로 계속 유효합니다.
        </ProseParagraph>

        <ProseHeading level={2}>8. 방향 정리</ProseHeading>
        <ul className="mt-5 list-disc space-y-2 pl-6 text-[16px] leading-8 text-foreground">
          <li>단일 프롬프트보다 구조화된 workflow와 subagent 분리가 중요해짐</li>
          <li>자율성 증가와 함께 stop condition, human checkpoint, rollback이 더 중요해짐</li>
          <li>도구 품질과 tool contract 설계가 성능의 핵심이 됨</li>
          <li>trace, spans, metrics, replay가 사실상 기본 운영 요소가 됨</li>
          <li>MCP는 연결 기술에서 governance 문제로 확장되고 있음</li>
          <li>코드 저장소 밖의 note vault / knowledge base를 memory layer로 활용하려는 흐름이 커지고 있음</li>
          <li>paperclip식 안전 프레임은 autonomy 시대에 다시 실무적 의미를 얻고 있음</li>
        </ul>

        <ProseHeading level={2}>9. 이 사이트에서 같이 읽으면 좋은 페이지</ProseHeading>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Link href="/handbook" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">핸드북</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              큰그림과 조직 적용 관점에서 이 흐름을 더 넓게 읽습니다.
            </p>
          </Link>
          <Link href="/reference/security-guardrails" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">보안과 가드레일</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              자율성 증가가 왜 가드레일 강화로 이어지는지 같이 볼 수 있습니다.
            </p>
          </Link>
          <Link href="/reference/metrics-observability" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">Metrics / Observability</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              tracing과 observability 흐름을 운영 관점에서 더 깊게 봅니다.
            </p>
          </Link>
        </div>
      </Prose>
    </div>
  );
}
