import Link from "next/link";
import {
  Prose,
  ProseEyebrow,
  ProseHeading,
  ProseParagraph,
} from "@/components/content/prose";
import { Callout } from "@/components/content/callout";
import { Infographic } from "@/components/content/infographic";

export const metadata = {
  title: "Claude Code vs Codex CLI",
  description:
    "Anthropic 의 Claude Code 와 OpenAI 의 Codex CLI 를 같은 항목으로 사실 기반 비교합니다.",
};

type Row = {
  feature: string;
  claude: string;
  codex: string;
  shared?: string;
};

const ROWS: Row[] = [
  {
    feature: "프로젝트 메모리 파일",
    claude: "CLAUDE.md (선택적 @import)",
    codex: "AGENTS.md (계층적 override)",
    shared: "세션 시작 시 자동 로드",
  },
  {
    feature: "런타임 설정",
    claude: ".claude/settings.json",
    codex: ".codex/config.toml + 프로필",
    shared: "모델, 추론 강도, 샌드박스, 승인 정책",
  },
  {
    feature: "스킬 / 슬래시 명령",
    claude: ".claude/skills/<name>/SKILL.md (frontmatter)",
    codex: ".agents/skills/<name>/SKILL.md",
    shared: "재사용 워크플로의 짧은 진입점",
  },
  {
    feature: "서브에이전트",
    claude: ".claude/agents/<name>.md (Markdown)",
    codex: ".codex/agents/<name>.toml",
    shared: "좁은 역할·격리 컨텍스트·병렬 실행",
  },
  {
    feature: "권한 / 규칙",
    claude: ".claude/settings.json permissions",
    codex: ".codex/rules/default.rules (execpolicy)",
    shared: "forbidden / prompt / allow 결정",
  },
  {
    feature: "훅",
    claude: ".claude/settings.json hooks + .claude/hooks/",
    codex: ".codex/hooks.json + .codex/hooks/",
    shared: "SessionStart / PreToolUse / PostToolUse 등 라이프사이클",
  },
  {
    feature: "MCP 서버",
    claude: "플러그인 기반 (다수 서버)",
    codex: ".codex/config.toml MCP 섹션",
    shared: "외부 도구·데이터 소스 연결",
  },
  {
    feature: "샌드박스",
    claude: "Anthropic 자체 샌드박스",
    codex: "workspace-write / read-only / danger-full-access 모드",
    shared: "기본은 보수적, 확장은 명시적",
  },
  {
    feature: "Agent Teams (멀티 에이전트)",
    claude: "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1 (실험)",
    codex: "OpenAI Swarm 별도 라이브러리",
    shared: "공식 지원은 양쪽 모두 실험 단계",
  },
  {
    feature: "메모리 영속성",
    claude: "~/.claude/projects/.../memory/ 디렉터리",
    codex: "AGENTS.md 계층 (코드 외부 영속 메모리는 별도)",
    shared: "세션 너머 사실만 적도록 권장",
  },
];

export default function ClaudeVsCodexPage() {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose size="wide">
        <ProseEyebrow>아키텍처 · 비교</ProseEyebrow>
        <ProseHeading level={1}>Claude Code vs Codex CLI</ProseHeading>
        <ProseParagraph>
          Anthropic 의 Claude Code 와 OpenAI 의 Codex CLI 는 서로 다른 기업의 제품이지만,
          “하네스” 라는 관점에서 보면 같은 추상화의 두 가지 구현입니다. 아래 표는 두 제품의 같은 개념을
          한 행에 나란히 두고 비교한 것입니다.
        </ProseParagraph>
        <Callout tone="note" title="정확성 안내">
          이 표는 본 사이트의 docs/research/03 / 07 / 08 source pack 을 기반으로 작성됩니다. 일부 항목은 자료조사가
          진행 중이며 verbatim 출처가 더 추가될 예정입니다. 잘못된 정보를 발견하시면 GitHub 저장소의 issue 로 알려 주십시오.
        </Callout>
      </Prose>

      <div className="mx-auto mt-12 max-w-6xl overflow-x-auto px-4 sm:px-6">
        <table className="w-full min-w-[720px] border-separate border-spacing-0 overflow-hidden rounded-lg border border-border bg-surface">
          <thead className="bg-surface-2">
            <tr>
              <th className="border-b border-border px-4 py-3 text-left font-mono text-xs uppercase tracking-[0.18em] text-foreground-muted">
                항목
              </th>
              <th className="border-b border-border px-4 py-3 text-left font-mono text-xs uppercase tracking-[0.18em] text-foreground-muted">
                Claude Code (Anthropic)
              </th>
              <th className="border-b border-border px-4 py-3 text-left font-mono text-xs uppercase tracking-[0.18em] text-foreground-muted">
                Codex CLI (OpenAI)
              </th>
              <th className="border-b border-border px-4 py-3 text-left font-mono text-xs uppercase tracking-[0.18em] text-foreground-muted">
                공유 개념
              </th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row, i) => (
              <tr key={row.feature} className={i % 2 === 0 ? "bg-background" : "bg-surface/60"}>
                <td className="border-b border-border px-4 py-4 align-top font-sans text-sm font-medium text-foreground">
                  {row.feature}
                </td>
                <td className="border-b border-border px-4 py-4 align-top font-mono text-[13px] text-foreground-muted">
                  {row.claude}
                </td>
                <td className="border-b border-border px-4 py-4 align-top font-mono text-[13px] text-foreground-muted">
                  {row.codex}
                </td>
                <td className="border-b border-border px-4 py-4 align-top font-serif text-[14px] text-foreground-muted">
                  {row.shared ?? "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mx-auto mt-16 max-w-5xl px-4 sm:px-6">
        <Infographic
          src="/infographics/claude-vs-codex.png"
          alt="Claude Code 와 Codex CLI 의 핵심 기능 비교 인포그래픽"
          caption="Claude Code (Anthropic) vs Codex CLI (OpenAI) — 프로젝트 메모리, 런타임 설정, 스킬, 서브에이전트, 권한, 훅, MCP, 샌드박스, 멀티 에이전트까지 한 페이지로 비교한 자료입니다."
          source={{
            label: "Google NotebookLM (사이트 source pack 기반 자동 생성)",
            href: "https://notebooklm.google.com",
          }}
          width={2752}
          height={1536}
        />
      </div>

      <Prose className="mt-16">
        <ProseHeading level={2}>다음 글</ProseHeading>
        <ul className="mt-3 list-disc space-y-2 pl-6 font-serif text-foreground">
          <li><Link href="/architecture/overview" className="text-accent-2 hover:underline">5-레이어 하네스 아키텍처</Link></li>
          <li><Link href="/playbook/setup-claude-code" className="text-accent-2 hover:underline">Claude Code 설정 플레이북</Link></li>
          <li><Link href="/playbook/setup-codex" className="text-accent-2 hover:underline">Codex CLI 설정 플레이북</Link></li>
        </ul>
      </Prose>
    </div>
  );
}
