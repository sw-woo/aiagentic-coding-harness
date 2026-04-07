import type { Metadata } from "next";
import Link from "next/link";
import {
  Prose,
  ProseEyebrow,
  ProseHeading,
  ProseParagraph,
} from "@/components/content/prose";
import { Callout } from "@/components/content/callout";
import { CodeBlock } from "@/components/content/code-block";

const MCP_SERVERS = [
  {
    name: "OpenAI Codex MCP",
    category: "호스트 / 런타임",
    detail:
      "Codex는 MCP를 stdio와 remote HTTP로 공식 지원합니다. project config와 login 흐름을 함께 설계해야 합니다.",
    source: "https://developers.openai.com/codex/mcp",
  },
  {
    name: "Playwright MCP",
    category: "브라우저 자동화",
    detail:
      "구조화된 accessibility snapshot 기반으로 브라우저를 조작합니다. 공식 문서 기준 현재 기본은 headed이고, --headless 옵션으로 내릴 수 있습니다.",
    source: "https://playwright.dev/docs/next/getting-started-mcp",
  },
  {
    name: "Context7 MCP",
    category: "문서 grounding",
    detail:
      "라이브러리/API 문서를 최신으로 끌어오는 대표 서버입니다. 공식 문서 기준 SSE transport는 제거되었고 HTTP 또는 stdio를 사용해야 합니다.",
    source: "https://context7.com/docs/installation",
  },
  {
    name: "Figma MCP",
    category: "디자인 → 코드",
    detail:
      "원격 MCP와 desktop MCP를 모두 제공하며, 최신 문서 기준 원격 서버가 권장됩니다. write-to-canvas 같은 최신 기능도 원격 쪽이 더 넓습니다.",
    source: "https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server",
  },
  {
    name: "Linear MCP",
    category: "이슈 / 프로젝트",
    detail:
      "공식 문서 기준 현재 endpoint는 https://mcp.linear.app/mcp 이고, Codex 설정 예시도 직접 제공합니다.",
    source: "https://linear.app/docs/mcp",
  },
  {
    name: "Slack MCP",
    category: "팀 커뮤니케이션",
    detail:
      "Slack은 2026년 2월 17일 MCP server와 Real-time Search API를 같이 발표했습니다. 검색과 메시지 전송 같은 Slack 작업을 agent 용도로 제공합니다.",
    source: "https://docs.slack.dev/ai/slack-mcp-server/",
  },
  {
    name: "Atlassian Rovo MCP",
    category: "Jira / Confluence / Compass",
    detail:
      "공식 문서 기준 beta이며, 2026년 6월 30일 이후 /sse endpoint는 중단되고 /mcp endpoint로 이동해야 합니다.",
    source: "https://support.atlassian.com/atlassian-rovo-mcp-server/docs/getting-started-with-the-atlassian-remote-mcp-server/",
  },
  {
    name: "GitHub MCP",
    category: "리포지토리 / PR / 이슈",
    detail:
      "GitHub가 직접 유지하는 MCP server를 문서화하고 있으며, repository, issue, pull request 작업에 유용합니다.",
    source: "https://docs.github.com/en/copilot/customizing-copilot/using-model-context-protocol/using-the-github-mcp-server",
  },
] as const;

export const metadata: Metadata = {
  title: "최신 MCP 툴링 지형도",
  description:
    "2026년 기준 agentic coding harness에서 실제 가치가 큰 MCP 서버들을 최신 공식 자료 기준으로 정리한 페이지입니다.",
};

export default function McpLandscapePage() {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose size="wide">
        <ProseEyebrow>참고자료 · MCP</ProseEyebrow>
        <ProseHeading level={1}>최신 MCP 툴링 지형도</ProseHeading>
        <ProseParagraph>
          지금 agentic coding에서 가장 빠르게 변하는 층 중 하나가 MCP입니다. 문제는 문서가 서버별로 흩어져 있고,
          endpoint 변화나 transport 변화가 잦아서 예전 블로그 글만 따라가면 쉽게 낡는다는 점입니다.
          이 페이지는 2026년 기준으로 실제 가치가 큰 MCP 서버를 공식 자료 기준으로 다시 묶은 정리본입니다.
        </ProseParagraph>

        <Callout tone="warning" title="최신성 포인트">
          <p>Context7는 공식 문서 기준 SSE transport가 제거됐습니다.</p>
          <p>Linear는 현재 <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">https://mcp.linear.app/mcp</code> 를 씁니다.</p>
          <p>Atlassian은 2026년 6월 30일 이후 <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">/sse</code> 를 중단하고 <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">/mcp</code> 로 옮기라고 안내합니다.</p>
          <p>Slack MCP는 2026년 2월 17일 공식 발표됐습니다.</p>
        </Callout>

        <ProseHeading level={2}>1. 지금 가장 가치가 큰 MCP 서버들</ProseHeading>
        <div className="mt-6 space-y-4">
          {MCP_SERVERS.map((server) => (
            <div key={server.name} className="rounded-xl border border-border bg-surface p-5">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-foreground-subtle">{server.category}</p>
              <h3 className="mt-2 text-xl font-semibold text-foreground">{server.name}</h3>
              <p className="mt-2 text-sm leading-7 text-foreground-muted">{server.detail}</p>
              <a href={server.source} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm text-accent hover:underline">
                공식 문서 ↗
              </a>
            </div>
          ))}
        </div>

        <ProseHeading level={2}>2. 실무 권장 도입 순서</ProseHeading>
        <ProseParagraph>
          모든 MCP를 한 번에 붙이면 문맥이 오히려 지저분해집니다. 실무에서는 아래 순서가 안정적입니다.
        </ProseParagraph>
        <CodeBlock filename="권장 도입 순서" language="text">
{`1. Context7
   - 코드 생성과 설정 질문에서 최신 문서 grounding 확보

2. Playwright MCP
   - UI 작업과 브라우저 검증 자동화 확보

3. GitHub / Linear
   - 코드와 이슈/PR 맥락 연결

4. Figma
   - 디자인 맥락이 중요한 팀에서 추가

5. Slack / Atlassian
   - 팀 협업과 내부 문서 맥락이 꼭 필요할 때 추가`}
        </CodeBlock>

        <ProseHeading level={2}>3. Codex에서 바로 쓰는 예시</ProseHeading>
        <CodeBlock filename=".codex/config.toml" language="toml">
{`[features]
codex_hooks = true
multi_agent = true
experimental_use_rmcp_client = true

[mcp_servers.context7]
url = "https://mcp.context7.com/mcp"

[mcp_servers.playwright]
command = "npx"
args = ["@playwright/mcp@latest", "--headless"]

[mcp_servers.linear]
url = "https://mcp.linear.app/mcp"

[mcp_servers.figma]
url = "https://mcp.figma.com/mcp"

[mcp_servers.atlassian]
url = "https://mcp.atlassian.com/v1/mcp"`}
        </CodeBlock>

        <CodeBlock filename="CLI 추가 예시" language="bash">
{`codex mcp add linear --url https://mcp.linear.app/mcp
codex mcp add github --url <github-server-url>
codex mcp login linear`}
        </CodeBlock>

        <ProseHeading level={2}>4. 참고 사이트에서 배울 점</ProseHeading>
        <ProseParagraph>
          참고하신 Claude Code 마스터 류 사이트의 장점은 “MCP가 뭔가요”가 아니라 “무엇부터 붙이고, 무엇은 나중에 붙이고,
          어디서 실패하는가”를 문서화한다는 점입니다. 이 페이지도 같은 원칙으로 구성했습니다. 즉,
          기능 소개보다 <strong>도입 순서</strong>, <strong>최신 endpoint</strong>, <strong>운영 포인트</strong> 를 더 강조합니다.
        </ProseParagraph>

        <ProseHeading level={2}>5. 같이 읽으면 좋은 페이지</ProseHeading>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Link href="/reference/codex-adoption" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">Codex 도입 패턴</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              최소 설치, 표준 설치, 선택 설치, 문제 해결 순서로 정리한 페이지입니다.
            </p>
          </Link>
          <Link href="/reference/codex-hooks" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">Codex Hooks 심화</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              동적 guardrail 관점에서 hooks를 더 깊게 다룬 페이지입니다.
            </p>
          </Link>
          <Link href="/reference/codex-official" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">Codex 공식 자료 맵</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              OpenAI 공식 문서와 저장소를 설정·운영·학습·모델 축으로 다시 묶은 페이지입니다.
            </p>
          </Link>
        </div>
      </Prose>
    </div>
  );
}
