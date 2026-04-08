import type { Metadata } from "next";
import Link from "next/link";
import { Callout } from "@/components/content/callout";

const TOC = [
  { id: "overview", label: "이 사이트는 무엇인가" },
  { id: "audience", label: "누가 읽으면 좋은가" },
  { id: "tour", label: "30분 투어 순서" },
  { id: "map", label: "페이지별 지도" },
  { id: "layers", label: "5-레이어 설명" },
  { id: "reading", label: "추천 읽기 코스" },
  { id: "bridge", label: "Claude / Codex 병행" },
  { id: "next", label: "다음 액션" },
] as const;

const PAGE_MAP = [
  {
    title: "핸드북",
    href: "/handbook",
    description:
      "agentic coding harness 엔지니어링 전체 큰그림을 과거·현재·미래 흐름으로 읽는 중심 페이지입니다.",
  },
  {
    title: "방법론",
    href: "/methodology/karpathy",
    description:
      "Karpathy, Ralph, eval-driven, context engineering 등 큰그림의 일부를 더 깊게 파는 방법론 층입니다.",
  },
  {
    title: "아키텍처",
    href: "/architecture/overview",
    description:
      "memory, skills, subagents, rules, hooks 가 어떻게 맞물려 하네스를 이루는지 시각적으로 보여주는 층입니다.",
  },
  {
    title: "카탈로그",
    href: "/catalog/skills",
    description:
      "실제 파일 경로와 설명을 따라가며 지금 저장소에 있는 skill, agent, hook, rule 을 확인하는 층입니다.",
  },
  {
    title: "플레이북",
    href: "/playbook/setup-codex",
    description:
      "새 저장소에 하네스를 심거나, 현재 저장소를 운영 가능한 설정으로 끌어올리는 실전 가이드 층입니다.",
  },
  {
    title: "참고자료",
    href: "/reference",
    description:
      "외부 하네스 컬렉션, 원전 글, Codex 공식 자료 맵, hooks / MCP / security / metrics 심화 자료를 따라 들어가는 층입니다.",
  },
] as const;

const LAYERS = [
  {
    title: "Memory",
    description:
      "세션이 바뀌어도 유지되어야 하는 저장소 규칙과 검증 명령을 AGENTS.md 같은 문서에 고정합니다.",
  },
  {
    title: "Skills",
    description:
      "반복 워크플로를 skill 로 분리해 매번 같은 설명을 다시 쓰지 않게 만듭니다.",
  },
  {
    title: "Subagents",
    description:
      "reviewer, verifier, docs researcher 같은 좁은 역할을 분리해 병렬성과 정확도를 올립니다.",
  },
  {
    title: "Rules",
    description:
      "위험 명령, 승인 경계, 운영 안전선 같은 정책을 선언형으로 관리합니다.",
  },
  {
    title: "Hooks",
    description:
      "세션 시작 컨텍스트 주입, 위험한 bash 차단, 수정 직후 자동 검증 같은 동적 guardrail 을 맡깁니다.",
  },
] as const;

const READING_TRACKS = [
  {
    title: "처음 보는 사람",
    steps: [
      { label: "홈", href: "/" },
      { label: "이 가이드", href: "/guide" },
      { label: "핸드북", href: "/handbook" },
      { label: "5-레이어 아키텍처", href: "/architecture/overview" },
    ],
  },
  {
    title: "바로 적용하려는 사람",
    steps: [
      { label: "이 가이드", href: "/guide" },
      { label: "Codex 심화 플레이북", href: "/playbook/setup-codex" },
      { label: "카탈로그", href: "/catalog/skills" },
      { label: "참고자료", href: "/reference" },
    ],
  },
  {
    title: "하네스를 설계하려는 사람",
    steps: [
      { label: "이 가이드", href: "/guide" },
      { label: "핸드북", href: "/handbook" },
      { label: "Claude vs Codex 비교", href: "/architecture/claude-vs-codex" },
      { label: "Codex 심화 플레이북", href: "/playbook/setup-codex" },
    ],
  },
] as const;

export const metadata: Metadata = {
  title: "사이트 가이드",
  description:
    "이 사이트를 어떤 순서로 읽어야 하는지, 각 페이지가 무엇을 설명하는지, 하네스를 어떻게 이해하면 되는지 자세히 안내하는 가이드 페이지입니다.",
};

export default function GuidePage() {
  return (
    <div className="border-b border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-18">
        <div className="grid gap-10 lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-2xl border border-border bg-surface p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-foreground-muted">
                Site Guide
              </p>
              <h1 className="mt-3 font-serif text-3xl leading-tight tracking-tight text-foreground">
                이 사이트를 활용하기 쉽게 정리한 안내서
              </h1>
              <p className="mt-4 text-sm leading-7 text-foreground-muted">
                홈, 방법론, 아키텍처, 카탈로그, 플레이북, 참고자료가 각각 어떤 역할을 하는지,
                어떤 순서로 읽으면 이해가 빨라지는지 wiki 스타일로 설명합니다.
              </p>

              <div className="mt-6 border-t border-border pt-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">
                  On This Page
                </p>
                <nav aria-label="가이드 목차" className="mt-3 space-y-2">
                  {TOC.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block rounded-md px-3 py-2 text-sm text-foreground-muted transition hover:bg-background hover:text-foreground"
                    >
                      {section.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          <main className="min-w-0">
            <article className="space-y-8">
              <section id="overview" className="rounded-2xl border border-border bg-surface p-7">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-foreground-muted">
                  Overview
                </p>
                <h2 className="mt-3 font-serif text-4xl tracking-tight text-foreground sm:text-5xl">
                  이 사이트는 에이전틱 코딩 하네스를 설명하는 기술 문서 사이트입니다
                </h2>
                <p className="mt-5 text-[17px] leading-8 text-foreground-muted">
                  단순히 “AI 코딩이 멋지다”를 말하는 사이트가 아니라, 실제 저장소에 하네스를 심고,
                  운영 가능한 규칙과 검증 루프를 만들고, 다른 사람이 와도 복구 가능한 문서 구조를 설계하는 방법을 설명합니다.
                </p>
                <Callout tone="note" title="핵심 요약">
                  <p>
                    이 사이트의 주제는 <strong>모델 자체</strong> 보다 <strong>모델을 감싸는 하네스</strong> 입니다.
                    좋은 결과는 모델 이름 하나가 아니라 memory, skills, subagents, rules, hooks, 검증 루프가 함께 만들기 때문입니다.
                  </p>
                </Callout>
              </section>

              <section id="audience" className="rounded-2xl border border-border bg-surface p-7">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  누가 읽으면 좋나요
                </h2>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                  <div className="rounded-xl border border-border bg-background p-5">
                    <h3 className="text-lg font-semibold text-foreground">개발 리더</h3>
                    <p className="mt-2 text-sm leading-7 text-foreground-muted">
                      팀 공통 규칙과 검증 루프를 어떻게 문서화할지 고민하는 분.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-background p-5">
                    <h3 className="text-lg font-semibold text-foreground">실무 개발자</h3>
                    <p className="mt-2 text-sm leading-7 text-foreground-muted">
                      Codex나 Claude를 “잘 쓰는 프롬프트”가 아니라 “잘 설계된 작업 환경”으로 바꾸고 싶은 분.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-background p-5">
                    <h3 className="text-lg font-semibold text-foreground">플랫폼 설계자</h3>
                    <p className="mt-2 text-sm leading-7 text-foreground-muted">
                      AIOps/MLOps 같은 복합 저장소에서 하네스를 구조적으로 설계하려는 분.
                    </p>
                  </div>
                </div>
              </section>

              <section id="tour" className="rounded-2xl border border-border bg-surface p-7">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  30분 투어 순서
                </h2>
                <div className="mt-5 space-y-4">
                  {[
                    ["0-5분", "홈과 이 가이드", "이 사이트가 무엇을 다루는지, 왜 모델보다 하네스가 중요한지 감을 잡습니다."],
                    ["5-10분", "핸드북", "하네스 엔지니어링의 큰그림과 역사, 현재 스택, 미래 방향을 먼저 이해합니다."],
                    ["10-15분", "아키텍처", "memory, skills, subagents, rules, hooks 다섯 층이 어떻게 연결되는지 봅니다."],
                    ["15-20분", "카탈로그", "설명만 읽지 말고 실제 skill, agent, hook, rule 파일 경로를 확인합니다."],
                    ["20-25분", "플레이북", "새 저장소에 무엇부터 세팅해야 하는지 구체적인 순서와 예시를 봅니다."],
                    ["25-30분", "참고자료", "외부 컬렉션과 원전 문서까지 이어 보면서 자기 환경에 맞는 방향을 정합니다."],
                  ].map(([time, title, desc]) => (
                    <div key={time} className="grid gap-3 rounded-xl border border-border bg-background px-5 py-4 md:grid-cols-[120px_180px_minmax(0,1fr)]">
                      <p className="font-mono text-sm text-accent">{time}</p>
                      <p className="font-semibold text-foreground">{title}</p>
                      <p className="text-sm leading-7 text-foreground-muted">{desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="map" className="rounded-2xl border border-border bg-surface p-7">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  페이지별 지도
                </h2>
                <div className="mt-5 space-y-4">
                  {PAGE_MAP.map((page) => (
                    <div key={page.href} className="rounded-xl border border-border bg-background px-5 py-4">
                      <Link href={page.href} className="text-lg font-semibold text-foreground hover:text-accent">
                        {page.title}
                      </Link>
                      <p className="mt-2 text-sm leading-7 text-foreground-muted">{page.description}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section id="layers" className="rounded-2xl border border-border bg-surface p-7">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  이 사이트가 계속 말하는 5-레이어는 무엇인가요
                </h2>
                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                  {LAYERS.map((layer, index) => (
                    <div key={layer.title} className="rounded-xl border border-border bg-background p-5">
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-foreground-subtle">
                        0{index + 1}
                      </p>
                      <h3 className="mt-2 text-lg font-semibold text-foreground">{layer.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-foreground-muted">{layer.description}</p>
                    </div>
                  ))}
                </div>
                <Callout tone="tip" title="읽는 포인트">
                  <p>
                    다섯 레이어를 따로 외우실 필요는 없습니다. 중요한 것은 “에이전트 성능 문제를 어느 층에서 고쳐야 하는가”를 구분하는 감각입니다.
                    프롬프트 문제인지, 문서 문제인지, 검증 문제인지, 권한 문제인지가 분리되어야 하네스가 자랍니다.
                  </p>
                </Callout>
              </section>

              <section id="reading" className="rounded-2xl border border-border bg-surface p-7">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  추천 읽기 코스
                </h2>
                <div className="mt-5 grid gap-4 xl:grid-cols-3">
                  {READING_TRACKS.map((track) => (
                    <div key={track.title} className="rounded-xl border border-border bg-background p-5">
                      <h3 className="text-lg font-semibold text-foreground">{track.title}</h3>
                      <div className="mt-4 space-y-3">
                        {track.steps.map((step, index) => (
                          <div key={step.href} className="flex items-start gap-3">
                            <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border font-mono text-xs text-foreground-subtle">
                              {index + 1}
                            </span>
                            <Link href={step.href} className="text-sm leading-6 text-foreground hover:text-accent">
                              {step.label}
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section id="bridge" className="rounded-2xl border border-border bg-surface p-7">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  왜 Claude 와 Codex 를 같이 설명하나요
                </h2>
                <p className="mt-4 text-[16px] leading-8 text-foreground-muted">
                  실제 실무에서는 한 플랫폼만 보지 않고, 비슷한 개념이 다른 제품에서 어떻게 구현되는지 비교해야 구조가 선명해집니다.
                  이 사이트는 Claude 쪽의 `.claude/` 구조와 Codex 쪽의 `.codex/` 구조를 병치하면서,
                  도구가 바뀌어도 오래 가는 개념과 특정 제품 전용 기능을 구분하게 돕습니다.
                </p>
                <div className="mt-5 grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-border bg-background p-5">
                    <h3 className="text-lg font-semibold text-foreground">제품에 종속되지 않는 것</h3>
                    <p className="mt-2 text-sm leading-7 text-foreground-muted">
                      프로젝트 메모리, 반복 워크플로, 역할 분리, 위험 명령 방어, 자동 검증 루프 같은 구조적 개념입니다.
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-background p-5">
                    <h3 className="text-lg font-semibold text-foreground">제품에 따라 달라지는 것</h3>
                    <p className="mt-2 text-sm leading-7 text-foreground-muted">
                      설정 문법, subagent 형식, hook 등록 방식, MCP 표면, rule 문법 같은 제품별 구현 차이입니다.
                    </p>
                  </div>
                </div>
              </section>

              <section id="next" className="rounded-2xl border border-border bg-surface p-7">
                <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                  다음 액션
                </h2>
                <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                  <Link href="/handbook" className="rounded-xl border border-border bg-background p-5 transition hover:border-accent">
                    <h3 className="text-lg font-semibold text-foreground">핸드북</h3>
                    <p className="mt-2 text-sm leading-7 text-foreground-muted">
                      과거 발전사, 현재의 최신 스택, 미래 방향까지 한 흐름으로 읽는 설명 중심 페이지입니다.
                    </p>
                  </Link>
                  <Link href="/playbook/setup-codex" className="rounded-xl border border-border bg-background p-5 transition hover:border-accent">
                    <h3 className="text-lg font-semibold text-foreground">Codex 심화 플레이북</h3>
                    <p className="mt-2 text-sm leading-7 text-foreground-muted">
                      실제 설정 파일, rule, hook, subagent, 외부 확장까지 한 번에 정리한 심화 문서입니다.
                    </p>
                  </Link>
                  <Link href="/architecture/overview" className="rounded-xl border border-border bg-background p-5 transition hover:border-accent">
                    <h3 className="text-lg font-semibold text-foreground">아키텍처 다이어그램</h3>
                    <p className="mt-2 text-sm leading-7 text-foreground-muted">
                      하네스를 구성하는 5개 레이어를 시각적으로 확인할 수 있습니다.
                    </p>
                  </Link>
                  <Link href="/catalog/skills" className="rounded-xl border border-border bg-background p-5 transition hover:border-accent">
                    <h3 className="text-lg font-semibold text-foreground">실제 카탈로그</h3>
                    <p className="mt-2 text-sm leading-7 text-foreground-muted">
                      설명을 읽은 뒤 실제 파일 경로와 항목으로 내려가 확인하는 단계입니다.
                    </p>
                  </Link>
                </div>
              </section>
            </article>
          </main>
        </div>
      </div>
    </div>
  );
}
