import type { Metadata } from "next";
import Link from "next/link";
import {
  Prose,
  ProseEyebrow,
  ProseHeading,
  ProseParagraph,
} from "@/components/content/prose";
import { Callout } from "@/components/content/callout";

const AGENTS = [
  {
    name: "OpenCode",
    href: "https://github.com/sst/opencode",
    summary:
      "SST가 유지하는 오픈소스 코딩 에이전트입니다. provider-agnostic, built-in agents, TUI 중심, desktop beta를 제공합니다.",
    fit:
      "오픈소스 에이전트 런타임을 바로 써 보고 싶을 때 가장 먼저 검토할 만한 후보입니다.",
  },
  {
    name: "OpenHands",
    href: "https://github.com/OpenHands/OpenHands",
    summary:
      "AI-driven development를 목표로 하는 대형 오픈소스 프로젝트입니다. 코드 작업과 소프트웨어 에이전트 실험을 폭넓게 다룹니다.",
    fit:
      "터미널 pair programming보다 더 넓은 autonomous development 축을 보고 싶을 때 적합합니다.",
  },
  {
    name: "Aider",
    href: "https://github.com/Aider-AI/aider",
    summary:
      "터미널 pair programming에 강한 오픈소스 도구입니다. 다양한 클라우드/로컬 LLM을 연결할 수 있습니다.",
    fit:
      "가볍고 빠른 pair programming 워크플로를 원할 때 여전히 강한 선택지입니다.",
  },
] as const;

const BUILDING_BLOCKS = [
  {
    name: "AgentAPI",
    href: "https://github.com/coder/agentapi",
    summary:
      "Claude Code, Codex, OpenCode, Aider 등 여러 에이전트를 HTTP API로 감싸는 프로젝트입니다.",
  },
  {
    name: "OpenSkills",
    href: "https://github.com/BandarLabs/open-skills",
    summary:
      "Claude Skills 스타일의 스킬을 로컬에서 여러 LLM과 함께 실행하는 오픈소스 도구입니다.",
  },
  {
    name: "Vercel Coding Agent Template",
    href: "https://github.com/vercel-labs/coding-agent-template",
    summary:
      "여러 코딩 에이전트를 선택적으로 붙일 수 있는 Vercel 기반 템플릿입니다.",
  },
  {
    name: "OpenWork",
    href: "https://github.com/different-ai/openwork",
    summary:
      "OpenCode 위에 더 제품화된 인터페이스와 워크플로 공유를 얹으려는 오픈소스 앱입니다.",
  },
] as const;

const MODELS = [
  {
    name: "Gemma 4 31B",
    href: "https://huggingface.co/google/gemma-4-31B",
    summary:
      "강한 오픈 30B 모델로, 코드 보조와 구조화된 reasoning 보조에 실전적으로 검토할 수 있는 구간입니다.",
  },
  {
    name: "Qwen3-Coder-30B-A3B-Instruct",
    href: "https://huggingface.co/Qwen/Qwen3-Coder-30B-A3B-Instruct",
    summary:
      "agentic coding과 browser-use 쪽을 전면에 내세운 오픈 coder 모델입니다.",
  },
  {
    name: "Qwen3-Coder",
    href: "https://qwenlm.github.io/blog/qwen3-coder/",
    summary:
      "공식 블로그에서 SWE-Bench Verified open-source SOTA를 강조하는 오픈 coder 계열입니다.",
  },
] as const;

export const metadata: Metadata = {
  title: "오픈소스 에이전트와 모델 스택",
  description:
    "OpenCode, OpenHands, Aider 같은 오픈소스 에이전트 런타임과 Gemma 4, Qwen3-Coder 같은 오픈 모델을 최신 기준으로 정리한 페이지입니다.",
};

export default function OpenSourceStackPage() {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose size="wide">
        <ProseEyebrow>참고자료 · Open Source</ProseEyebrow>
        <ProseHeading level={1}>오픈소스 에이전트와 모델 스택</ProseHeading>
        <ProseParagraph>
          요즘의 중요한 흐름 중 하나는 폐쇄형 런타임만 보는 것이 아니라, 오픈소스 에이전트 런타임과 오픈 모델로 어디까지 구축할 수 있는지를 같이 보는 것입니다.
          이 페이지는 실제로 검증 가능한 프로젝트만 추려, “무엇이 있고 어디까지 가능한가” 관점으로 정리한 요약입니다.
        </ProseParagraph>

        <Callout tone="warning" title="확인되지 않은 이름은 넣지 않았습니다">
          <p>
            이번 정리에서는 실제 저장소와 활동이 확인되는 프로젝트만 넣었습니다. 이름만 비슷하거나 관계가 불분명한 프로젝트는 제외했습니다.
          </p>
        </Callout>

        <Callout tone="note" title="성능 수치 해석">
          <p>
            공식 문서가 직접 제공하는 것은 주로 모델 카드, 배포 대상, 최소 하드웨어, 벤치마크 점수입니다.
            정확한 <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">tokens/sec</code> 는 백엔드, 양자화, 배치, 컨텍스트 길이에 크게 좌우되므로
            이 페이지에서는 공식 자료가 확인해 주는 범위까지만 단정하고, 나머지는 실사용 구간으로만 설명합니다.
          </p>
        </Callout>

        <ProseHeading level={2}>1. 오픈소스 코딩 에이전트 런타임</ProseHeading>
        <div className="mt-6 space-y-4">
          {AGENTS.map((item) => (
            <div key={item.name} className="rounded-xl border border-border bg-surface p-5">
              <a href={item.href} target="_blank" rel="noreferrer" className="text-xl font-semibold text-foreground hover:text-accent">
                {item.name}
              </a>
              <p className="mt-2 text-sm leading-7 text-foreground-muted">{item.summary}</p>
              <p className="mt-3 text-sm leading-7 text-foreground">{item.fit}</p>
            </div>
          ))}
        </div>

        <ProseHeading level={2}>2. 그 위에 올릴 수 있는 오픈 빌딩 블록</ProseHeading>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {BUILDING_BLOCKS.map((item) => (
            <div key={item.name} className="rounded-xl border border-border bg-surface p-5">
              <a href={item.href} target="_blank" rel="noreferrer" className="text-lg font-semibold text-foreground hover:text-accent">
                {item.name}
              </a>
              <p className="mt-2 text-sm leading-7 text-foreground-muted">{item.summary}</p>
            </div>
          ))}
        </div>

        <ProseHeading level={2}>3. 같이 볼 만한 오픈 모델 축</ProseHeading>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {MODELS.map((item) => (
            <div key={item.name} className="rounded-xl border border-border bg-surface p-5">
              <a href={item.href} target="_blank" rel="noreferrer" className="text-lg font-semibold text-foreground hover:text-accent">
                {item.name}
              </a>
              <p className="mt-2 text-sm leading-7 text-foreground-muted">{item.summary}</p>
            </div>
          ))}
        </div>

        <ProseHeading level={2}>4. 어디까지 가능한가</ProseHeading>
        <ul className="mt-5 list-disc space-y-2 pl-6 text-[16px] leading-8 text-foreground">
          <li>로컬 또는 self-hosted coding assistant 구축</li>
          <li>오픈 모델 + provider-agnostic agent runtime 조합</li>
          <li>terminal pair programming, review, search, 브라우저 기반 검증</li>
          <li>에이전트 간 HTTP 래핑, 원격 제어, 워크플로 제품화</li>
        </ul>

        <ProseParagraph>
          다만 “완전한 대체”로 말하면 과장됩니다. 현재 오픈 모델과 오픈 런타임은 충분히 강해졌지만,
          frontier 폐쇄형 런타임의 편의성과 완성도, 최신 도구 통합, 안정성 면에서는 아직 차이가 남아 있는 경우가 많습니다.
          그래서 현실적인 선택은 대체라기보다 <strong>역할 분리</strong> 입니다. 메인 세션은 강한 런타임을 쓰고,
          오픈 런타임은 로컬 검증, 사내 프라이버시 워크플로, 실험 환경, 보조 에이전트 계층에 배치하는 식입니다.
        </ProseParagraph>

        <ProseHeading level={2}>5. 최신 기준으로 추천할 만한 조합</ProseHeading>
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-xl font-semibold text-foreground">조합 A — 로컬 pair programming 후보</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              <strong>OpenCode + LM Studio + Gemma 4 26B A4B 또는 Gemma 4 31B</strong>
            </p>
            <p className="mt-3 text-sm leading-7 text-foreground-muted">
              OpenCode 공식 문서는 LM Studio 같은 OpenAI-compatible local provider 구성을 예시로 보여 줍니다.
              Gemma 4 공식 모델 카드는 E 계열은 노트북/폰, 26B A4B와 31B는 consumer GPU와 workstation을 배포 대상으로 설명합니다.
              따라서 로컬 pair programming 용도로 검토할 만한 조합으로 볼 수 있습니다.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-xl font-semibold text-foreground">조합 B — 오픈 coder 중심의 agentic coding 실험</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              <strong>OpenCode 또는 Aider + Qwen3-Coder-30B-A3B-Instruct + OpenAI-compatible endpoint</strong>
            </p>
            <p className="mt-3 text-sm leading-7 text-foreground-muted">
              Qwen3-Coder 30B 공식 카드 기준으로 30.5B total / 3.3B activated, 256K native context, agentic coding과 browser-use를 전면에 내세웁니다.
              exact hardware requirement는 이 페이지에서 직접 단정하지 않지만, 공식 카드 자체가 효율성과 agentic coding을 강조하므로
              고성능 로컬 coder 실험에서 우선 검토할 만한 축으로 볼 수 있습니다.
            </p>
          </div>

          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-xl font-semibold text-foreground">조합 C — autonomous development 실험</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              <strong>OpenHands + LM Studio + Devstral Small 2505</strong>
            </p>
            <p className="mt-3 text-sm leading-7 text-foreground-muted">
              OpenHands 공식 local LLM 문서는 이 조합을 예시로 보여 줍니다. 또한 같은 문서에서
              <strong>최소 16GB VRAM GPU</strong> 또는 <strong>Apple Silicon 32GB RAM</strong>을 hardware requirement로 명시합니다.
              다만 OpenHands 문서도 local LLM은 기능이 제한될 수 있다고 경고하므로, pair programming보다 더 넓은 autonomous development 실험용으로 보는 편이 정확합니다.
            </p>
          </div>
        </div>

        <ProseHeading level={2}>6. 하드웨어 기준으로 보면</ProseHeading>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">노트북 급</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              Gemma 4 E2B/E4B 같은 소형 모델, 문서 요약, 간단한 코드 보조, 경량 pair programming 정도가 현실적입니다.
              공식 Gemma 카드도 작은 모델을 노트북/온디바이스 배포 대상으로 설명합니다.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">고성능 개인 워크스테이션</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              Gemma 4 26B A4B, 31B, Qwen3-Coder-30B 같은 모델을 검토할 수 있는 구간입니다.
              정확한 속도는 서빙 백엔드에 따라 크게 달라지지만, 실제 구현/리팩터/검증 보조까지 보는 실용 구간입니다.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">팀 서버 / GPU 서버</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              OpenHands나 더 긴 autonomous workflow, 브라우저 검증, 다수 세션 동시 운영 같은 팀 단위 실험은 이 구간이 더 적합합니다.
              특히 traces, observability, MCP governance까지 같이 붙이면 개인 장비보다 팀 서버 쪽이 운영하기 좋습니다.
            </p>
          </div>
        </div>

        <ProseHeading level={2}>7. 실제 사용성 기준으로 보면</ProseHeading>
        <ul className="mt-5 list-disc space-y-2 pl-6 text-[16px] leading-8 text-foreground">
          <li>빠르게 바로 쓰기: Aider</li>
          <li>provider-agnostic 오픈 런타임: OpenCode</li>
          <li>autonomous development 실험: OpenHands</li>
          <li>오픈 모델만으로 팀 표준화: 가능은 하지만, 운영 편의성과 최신 도구 통합 면에서는 별도 검토가 더 필요합니다</li>
          <li>현실적인 접근 후보: 폐쇄형 메인 세션 + 오픈 런타임/오픈 모델 보조 레이어</li>
        </ul>

        <ProseHeading level={2}>8. 이 사이트와의 연결</ProseHeading>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Link href="/handbook" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">핸드북</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              전체 하네스 엔지니어링 흐름과 모델/런타임 해석을 장문으로 봅니다.
            </p>
          </Link>
          <Link href="/reference/mcp-landscape" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">MCP 지형도</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              오픈 런타임 위에 붙일 수 있는 외부 맥락 서버를 같이 봅니다.
            </p>
          </Link>
          <Link href="/playbook/setup-codex" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">Codex 심화 플레이북</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              폐쇄형 런타임 쪽의 현재 베스트 프랙티스와 비교해 읽기에 좋습니다.
            </p>
          </Link>
        </div>
      </Prose>
    </div>
  );
}
