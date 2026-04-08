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

const SOURCE_LINKS = [
  { label: "OpenAI Sandboxing", href: "https://developers.openai.com/codex/sandboxing" },
  { label: "OpenAI Rules", href: "https://developers.openai.com/codex/rules" },
  { label: "OpenAI Hooks", href: "https://developers.openai.com/codex/hooks" },
  { label: "GitHub MCP Registry Governance", href: "https://docs.github.com/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-mcp-registry" },
  { label: "codexmaster guardrails", href: "https://github.com/robbiecalvin/codexmaster/tree/main/docs/security" },
] as const;

export const metadata: Metadata = {
  title: "하네스 보안과 가드레일",
  description:
    "sandbox, rules, hooks, MCP governance를 한 층으로 묶어 agentic coding harness의 보안과 운영 가드레일을 설명하는 페이지입니다.",
};

export default function SecurityGuardrailsPage() {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose size="wide">
        <ProseEyebrow>참고자료 · Security</ProseEyebrow>
        <ProseHeading level={1}>하네스 보안과 가드레일</ProseHeading>
        <ProseParagraph>
          좋은 하네스는 모델이 똑똑한지보다 먼저, 위험한 행동을 어떻게 제한하는지 설명해야 합니다.
          이 페이지는 agentic coding에서 실제로 중요한 보안 경계를 sandbox, rules, hooks, MCP governance 네 층으로 나눠 설명합니다.
        </ProseParagraph>

        <div className="mt-6 flex flex-wrap gap-3">
          {SOURCE_LINKS.map((source) => (
            <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline">
              {source.label} ↗
            </a>
          ))}
        </div>

        <Callout tone="warning" title="핵심 원칙">
          <p>하나의 안전 장치만 믿지 않습니다.</p>
          <p>Sandbox는 실행 범위를, Rules는 선언형 정책을, Hooks는 동적 차단을, MCP governance는 외부 연결 표준을 맡습니다.</p>
        </Callout>

        <ProseHeading level={2}>1. Sandbox는 가장 바깥 경계입니다</ProseHeading>
        <ProseParagraph>
          sandbox는 런타임이 어느 범위까지 파일을 읽고 쓰고 시스템에 접근할 수 있는지 정합니다. 일반적인 코딩 저장소에서는
          <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">workspace-write</code> 가 가장 현실적입니다.
          읽기 전용 분석은 <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">read-only</code>, 완전 개방은 정말 예외적인 경우만 허용해야 합니다.
        </ProseParagraph>

        <ProseHeading level={2}>2. Rules는 선언형 정책입니다</ProseHeading>
        <ProseParagraph>
          Rules는 “무엇이 금지인지”, “무엇이 승인 대상인지”를 문서가 아니라 실행 정책으로 고정합니다.
          destructive command, 배포, 외부 쓰기, 모델 삭제 같은 명령은 rules에 먼저 걸어 두는 편이 좋습니다.
        </ProseParagraph>
        <CodeBlock filename=".codex/rules/default.rules" language="text">
{`prefix_rule(["git", "reset", "--hard"], "forbidden")
prefix_rule(["rm", "-rf"], "forbidden")
prefix_rule(["terraform", "destroy"], "forbidden")
prefix_rule(["kubectl", "delete"], "forbidden")
prefix_rule(["git", "push"], "prompt")
prefix_rule(["gh", "pr", "create"], "prompt")`}
        </CodeBlock>

        <ProseHeading level={2}>3. Hooks는 실행 순간의 guardrail입니다</ProseHeading>
        <ProseParagraph>
          Hooks는 보안 경계의 전부가 아니라, 실행 시점의 빠른 차단기입니다. 예를 들어 위험한 bash를 실행 직전에 막고,
          Kotlin 파일 수정 직후 자동 lint를 돌리는 식입니다.
        </ProseParagraph>

        <ProseHeading level={2}>4. MCP는 연결 자체가 권한입니다</ProseHeading>
        <ProseParagraph>
          MCP를 붙인다는 것은 모델에게 새로운 도구와 데이터 접근권을 주는 것입니다. 그래서 조직 수준에서는
          “어떤 MCP 서버를 허용할 것인가”, “누가 추가할 수 있는가”, “registry를 어떻게 운영할 것인가”가 중요합니다.
          GitHub 문서도 조직/엔터프라이즈 단위 MCP registry 관리 문서를 별도로 둡니다.
        </ProseParagraph>

        <ProseHeading level={2}>5. 실무 체크리스트</ProseHeading>
        <ul className="mt-5 list-disc space-y-2 pl-6 text-[16px] leading-8 text-foreground">
          <li>기본 sandbox는 `workspace-write + on-request` 에서 시작</li>
          <li>destructive command 는 rules에서 먼저 금지</li>
          <li>빠른 차단은 PreToolUse hook 로 보조</li>
          <li>MCP는 업무 가치가 분명한 것만 allowlist 기반으로 추가</li>
          <li>새로운 MCP는 팀 공통 설정에 넣기 전에 별도 검증</li>
        </ul>

        <ProseHeading level={2}>6. 더 깊게 들어가려면</ProseHeading>
        <ProseParagraph>
          이 페이지는 기본 수준의 보안 경계를 다룹니다. 실제 플러그인 보안 사고를 가정하고 4계층
          방어 원칙을 훨씬 자세히 정리한 새 페이지들이 있으니, 운영 환경을 만들 때는 함께 봐
          주십시오.
        </ProseParagraph>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Link href="/reference/zero-trust-plugins" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">Zero Trust 플러그인 (우산)</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              Allowlist · Sandbox · Credential Proxy · I/O Guardrails 네 층을 한 페이지에 정리한
              우산 문서. 도구 오염과 간접 프롬프트 인젝션 위협 모델 포함.
            </p>
          </Link>
          <Link href="/reference/agent-sandboxing" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">에이전트 샌드박싱</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              Vercel Sandbox · isolated-vm · Docker · gVisor · E2B 다섯 솔루션을 격리 수준·시작
              시간·언어·비용으로 비교하고 상황별 권장 기준을 정리했습니다.
            </p>
          </Link>
          <Link href="/reference/token-economics" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">토큰 경제학</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              CLI 출력 압축(RTK), prompt caching, 모델 라우팅, observability 도구를 한 페이지에
              정리. 보안 이후에는 운영 비용이 다음 운영 축입니다.
            </p>
          </Link>
        </div>

        <ProseHeading level={2}>7. 이어서 볼 기본 자료</ProseHeading>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Link href="/reference/codex-hooks" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">Codex Hooks 심화</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              hooks를 동적 guardrail로 더 자세히 설명합니다.
            </p>
          </Link>
          <Link href="/reference/mcp-landscape" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">MCP 지형도</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              최신 MCP 서버와 endpoint 변화까지 정리한 페이지입니다.
            </p>
          </Link>
          <Link href="/reference/codex-adoption" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">Codex 도입 패턴</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              실제 설치 순서와 기본 안전선 정리입니다.
            </p>
          </Link>
        </div>
      </Prose>
    </div>
  );
}
