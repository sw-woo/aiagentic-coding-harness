import type { Metadata } from "next";
import Link from "next/link";
import {
  Prose,
  ProseEyebrow,
  ProseHeading,
  ProseParagraph,
} from "@/components/content/prose";
import { Callout } from "@/components/content/callout";

const GETTING_STARTED = [
  { title: "Codex 홈", href: "https://developers.openai.com/codex/", summary: "Codex 전체 문서의 진입점입니다. CLI, IDE, Web, 설정, 학습 자료가 여기서 갈라집니다." },
  { title: "Authentication", href: "https://developers.openai.com/codex/auth", summary: "ChatGPT 로그인, API 키, 인증 흐름을 정리한 문서입니다." },
  { title: "Use cases", href: "https://developers.openai.com/codex/use-cases", summary: "Codex에 실제로 어떤 작업을 맡길 수 있는지 예시 중심으로 보는 페이지입니다." },
  { title: "OpenAI for developers", href: "https://developers.openai.com/", summary: "Codex 관련 최신 리소스, 비디오, 가이드, 모델 문서를 찾을 때 유용한 상위 진입점입니다." },
] as const;

const CONFIGURATION = [
  { title: "Config Basics", href: "https://developers.openai.com/codex/config-basic", summary: "프로젝트 config와 사용자 config가 어디에 있는지부터 설명합니다." },
  { title: "Config Advanced", href: "https://developers.openai.com/codex/config-advanced", summary: "profiles, hooks, project overrides 같은 고급 설정을 다룹니다." },
  { title: "Config Reference", href: "https://developers.openai.com/codex/config-reference", summary: "실제 키 이름과 설정값을 확인할 때 보는 기준 문서입니다." },
  { title: "Sandboxing", href: "https://developers.openai.com/codex/sandboxing", summary: "read-only, workspace-write, danger-full-access 같은 실행 경계를 설명합니다." },
  { title: "Rules", href: "https://developers.openai.com/codex/rules", summary: "위험 명령과 승인 정책을 선언적으로 다루는 규칙 표면입니다." },
  { title: "Hooks", href: "https://developers.openai.com/codex/hooks", summary: "SessionStart, PreToolUse 등 hook 수명주기와 제한을 설명합니다." },
  { title: "Subagents", href: "https://developers.openai.com/codex/subagents", summary: "커스텀 subagent 등록과 역할 분리를 다룹니다." },
  { title: "MCP", href: "https://developers.openai.com/codex/mcp", summary: "stdio/HTTP MCP 서버 연결과 운영 방법을 설명합니다." },
] as const;

const LEARN = [
  { title: "OpenAI Resources", href: "https://developers.openai.com/resources", summary: "Codex Prompting Guide, 제품 시연 영상, 실전형 가이드 같은 최신 학습 자료를 모아 보는 상위 페이지입니다." },
  { title: "Codex GitHub README", href: "https://github.com/openai/codex", summary: "CLI 빠른 시작, 설치, 기본 동작을 가장 빠르게 확인할 수 있는 공식 오픈소스 문서입니다." },
  { title: "Official skills examples", href: "https://github.com/openai/codex/tree/main/.codex/skills", summary: "공식 저장소 안에 포함된 skills 예시를 직접 확인할 수 있습니다." },
  { title: "Codex use cases", href: "https://developers.openai.com/codex/use-cases", summary: "실무에서 Codex를 어떤 유형의 작업에 배치하는지 살피기 좋은 페이지입니다." },
] as const;

const RELEASES = [
  { title: "Feature Maturity", href: "https://developers.openai.com/codex/feature-maturity", summary: "기능별 안정성 수준을 확인할 때 봐야 하는 페이지입니다." },
  { title: "OpenAI Codex GitHub", href: "https://github.com/openai/codex", summary: "CLI 오픈소스 저장소 자체입니다." },
  { title: "GitHub Releases", href: "https://github.com/openai/codex/releases", summary: "CLI 실제 릴리스 버전과 날짜를 확인할 때 보는 페이지입니다." },
  { title: "OpenAI Changelog", href: "https://platform.openai.com/docs/changelog", summary: "API 및 플랫폼 차원의 변경사항을 추적할 때 함께 봐야 하는 상위 변경 이력입니다." },
] as const;

const MODELS = [
  { title: "All models", href: "https://platform.openai.com/docs/models", summary: "현재 OpenAI 모델 전체와 권장 시작점을 확인하는 문서입니다." },
  { title: "GPT-5-Codex", href: "https://platform.openai.com/docs/models/gpt-5-codex", summary: "Codex용 agentic coding 모델의 공식 모델 카드입니다." },
  { title: "GPT-5.4", href: "https://platform.openai.com/docs/models/gpt-5.4", summary: "복잡한 reasoning과 coding의 기본 시작점으로 보는 frontier 모델 카드입니다." },
  { title: "GPT-5.4 mini", href: "https://platform.openai.com/docs/models/gpt-5.4-mini", summary: "subagent와 저지연 coding 작업에 적합한 mini 모델 카드입니다." },
] as const;

export const metadata: Metadata = {
  title: "OpenAI Codex 공식 자료 맵",
  description:
    "OpenAI Codex 관련 공식 문서와 저장소를 configuration, operation, learning, releases, models 관점에서 정리한 참고 페이지입니다.",
};

function ResourceGrid({
  title,
  items,
}: {
  title: string;
  items: readonly { title: string; href: string; summary: string }[];
}) {
  return (
    <>
      <ProseHeading level={2}>{title}</ProseHeading>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="group flex h-full flex-col gap-3 rounded-xl border border-border bg-surface p-5 transition hover:border-accent"
          >
            <h3 className="font-sans text-lg font-medium text-foreground">{item.title}</h3>
            <p className="flex-1 text-sm leading-relaxed text-foreground-muted">{item.summary}</p>
            <span className="font-mono text-xs text-foreground-subtle transition group-hover:text-accent-2">
              공식 문서 열기 ↗
            </span>
          </a>
        ))}
      </div>
    </>
  );
}

export default function CodexOfficialReferencePage() {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose size="wide">
        <ProseEyebrow>참고자료 · Codex</ProseEyebrow>
        <ProseHeading level={1}>OpenAI Codex 공식 자료 맵</ProseHeading>
        <ProseParagraph>
          Claude Code에 비해 Codex 쪽은 문서가 더 분산되어 보이기 쉽습니다. 실제로는 설정, 런타임,
          보안, 학습 자료, 모델 카드, 릴리스 정보가 각각 다른 페이지에 흩어져 있습니다. 이 페이지는
          그 공식 자료를 한 군데에 묶어, Codex 하네스를 설계하거나 업데이트할 때 어디를 먼저 봐야 하는지
          빠르게 찾도록 돕기 위한 정리본입니다.
        </ProseParagraph>

        <Callout tone="note" title="정리 기준">
          <p>
            이 페이지는 OpenAI 공식 문서와 <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">openai/codex</code>
            저장소만 기준으로 묶었습니다. 제3자 블로그나 요약 글은 넣지 않았습니다.
          </p>
        </Callout>

        <ProseHeading level={2}>현재 읽는 순서 추천</ProseHeading>
        <ProseParagraph>
          처음이면 <strong>Codex 홈 → Config Basics → Config Reference → Sandboxing → Hooks → MCP → Subagents → Use cases</strong> 순서가 가장 좋습니다.
          이미 쓰고 있다면 <strong>Feature Maturity / GitHub Releases / OpenAI Changelog</strong> 를 주기적으로 보는 편이 더 중요합니다.
        </ProseParagraph>

        <ResourceGrid title="1. 시작점" items={GETTING_STARTED} />
        <ResourceGrid title="2. 설정과 운영" items={CONFIGURATION} />
        <ResourceGrid title="3. 학습 자료" items={LEARN} />
        <ResourceGrid title="4. 릴리스와 안정성" items={RELEASES} />
        <ResourceGrid title="5. 모델 문서" items={MODELS} />

        <ProseHeading level={2}>이 사이트와 어떻게 연결되나요</ProseHeading>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Link href="/reference/codex-hooks" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">Codex Hooks 심화 가이드</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              공식 hooks 문서를 실제 Kotlin/JVM 하네스 관점으로 풀어 쓴 상세 가이드입니다.
            </p>
          </Link>
          <Link href="/playbook/setup-codex" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">Codex 심화 플레이북</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              실제 하네스 파일 구조와 rules/hooks/subagents 예시를 보려면 이 페이지로 이어집니다.
            </p>
          </Link>
          <Link href="/handbook" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">핸드북</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              agentic coding harness 엔지니어링의 과거-현재-미래 흐름을 장문으로 설명합니다.
            </p>
          </Link>
          <Link href="/guide" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">사이트 가이드</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              이 사이트 전체를 어떤 순서로 읽을지 정리한 위키형 안내 페이지입니다.
            </p>
          </Link>
        </div>
      </Prose>
    </div>
  );
}
