import Link from "next/link";
import { EditorialHero } from "@/components/landing/editorial-hero";
import { PrincipleCard } from "@/components/landing/principle-card";
import { FocusImageGallery } from "@/components/content/focus-image-gallery";
import { catalog } from "@/lib/catalog";

const CORE_PILLARS = [
  {
    number: "01",
    title: "하네스 엔지니어링 큰그림",
    description:
      "과거 발전사, 현재의 최신 스택, 미래 방향까지 agentic coding harness 전체 그림을 장문으로 설명합니다.",
    href: "/handbook",
    hint: "핵심 축",
  },
  {
    number: "02",
    title: "운영 구조와 아키텍처",
    description:
      "역할 분리, 검토 루프, 스킬 연결, 실패 복구까지 실제로 돌아가는 팀 구조를 다이어그램과 함께 보여줍니다.",
    href: "/architecture/overview",
    hint: "구조 설명",
  },
  {
    number: "03",
    title: "실전 셋업과 운영 패턴",
    description:
      "실제 저장소에 Codex나 Claude 하네스를 넣고 운영 가능한 상태로 끌어올리는 방법을 정리했습니다.",
    href: "/playbook/setup-codex",
    hint: "실전 플레이북",
  },
] as const;

const COUNTS = [
  { label: "스킬", value: catalog.skills.length, href: "/catalog/skills" },
  { label: "서브에이전트", value: catalog.agents.length, href: "/catalog/agents" },
  { label: "훅", value: catalog.hooks.length, href: "/catalog/hooks" },
  { label: "규칙", value: catalog.rules.length, href: "/catalog/rules" },
] as const;

const SHORTCUTS = [
  {
    title: "사이트 가이드 보기",
    description: "이 사이트를 어떤 순서로 읽어야 하는지, 각 페이지가 무슨 역할인지 자세히 설명합니다.",
    href: "/guide",
  },
  {
    title: "핸드북부터 읽기",
    description: "하네스 엔지니어링의 전체 큰그림을 과거-현재-미래 흐름으로 설명합니다.",
    href: "/handbook",
  },
  {
    title: "아키텍처 이해하기",
    description: "스킬, 규칙, 훅, 서브에이전트가 어떻게 연결되는지 바로 확인합니다.",
    href: "/architecture/overview",
  },
  {
    title: "카탈로그 탐색하기",
    description: "실제로 복사해 쓸 수 있는 항목을 유형별로 찾습니다.",
    href: "/catalog/skills",
  },
  {
    title: "참고자료 보기",
    description: "공식 문서, 비교 자료, 외부 컬렉션, oh-my-claudecode 읽기 가이드까지 함께 봅니다.",
    href: "/reference",
  },
] as const;

const START_PATHS = [
  {
    title: "처음 보는 사람",
    description:
      "핸드북으로 큰그림을 먼저 잡고, 그다음 아키텍처와 가이드를 보면 전체 구조가 가장 빨리 잡힙니다.",
    links: [
      { label: "핸드북", href: "/handbook" },
      { label: "가이드", href: "/guide" },
      { label: "아키텍처", href: "/architecture/overview" },
    ],
  },
  {
    title: "바로 설정하려는 사람",
    description:
      "플레이북에서 실제 설정 파일을 먼저 보고, 필요한 세부는 Codex 도입 패턴과 hooks 심화로 내려가면 됩니다.",
    links: [
      { label: "Codex 플레이북", href: "/playbook/setup-codex" },
      { label: "도입 패턴", href: "/reference/codex-adoption" },
      { label: "Hooks 심화", href: "/reference/codex-hooks" },
    ],
  },
  {
    title: "공식 자료부터 확인하려는 사람",
    description:
      "Claude Code 와 Codex 두 도구의 공식 자료 맵, OMC 읽기 가이드, MCP 지형도를 통해 원전과 최신 문서부터 따라갈 수 있습니다.",
    links: [
      { label: "Claude Code 공식 자료 맵", href: "/reference/claude-code-official" },
      { label: "Codex 공식 자료 맵", href: "/reference/codex-official" },
      { label: "OMC 읽기 가이드", href: "/reference/oh-my-claudecode" },
      { label: "MCP 지형도", href: "/reference/mcp-landscape" },
      { label: "참고자료", href: "/reference" },
    ],
  },
] as const;

export default function Home() {
  return (
    <>
      <EditorialHero />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-foreground-muted">
            시작 가이드
          </p>
          <h2 className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
            어떤 목적으로 오셨는지에 따라 읽는 순서가 다릅니다
          </h2>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {START_PATHS.map((path) => (
            <article key={path.title} className="rounded-2xl border border-border bg-surface p-7 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
              <h3 className="text-xl font-semibold text-foreground">{path.title}</h3>
              <p className="mt-3 text-sm leading-7 text-foreground-muted">{path.description}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {path.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-md border border-border bg-background px-3 py-2 font-mono text-xs text-foreground-muted transition hover:border-accent hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="flex flex-col gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-foreground-muted">
            핵심 축
          </p>
          <h2 className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
            이 사이트에서 먼저 봐야 할 세 가지
          </h2>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {CORE_PILLARS.map((p) => (
            <PrincipleCard key={p.number} {...p} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-surface/55">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
          <div className="flex flex-col gap-3">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-foreground-muted">
              이해를 돕는 이미지
            </p>
            <h2 className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
              글보다 먼저 구조를 보여주는 두 장의 도식
            </h2>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <article className="overflow-hidden rounded-2xl border border-border bg-background shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <div className="border-b border-border px-6 py-5">
                <h3 className="text-xl font-semibold text-foreground">워크플로 치트시트</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  시작, 파일 구조, 스킬, 훅, 메모리, 반복 작업 흐름까지 전체 작업면을 한 장으로 요약한 자료입니다.
                  원본 해상도가 아주 크지는 않아서, 전체 보기 아래에 확대 조각도 함께 제공합니다.
                </p>
              </div>
              <div className="p-4">
                <FocusImageGallery
                  src="/landing/claude-workflow-cheatsheet.png"
                  alt="Claude Code workflow cheatsheet"
                  width={565}
                  height={766}
                  priority
                  areas={[
                    { label: "상단 확대", objectPosition: "center top" },
                    { label: "하단 확대", objectPosition: "center bottom" },
                  ]}
                />
              </div>
            </article>

            <article className="overflow-hidden rounded-2xl border border-border bg-background shadow-[0_18px_60px_rgba(15,23,42,0.06)]">
              <div className="border-b border-border px-6 py-5">
                <h3 className="text-xl font-semibold text-foreground">`.claude/` 폴더 해부도</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground-muted">
                  설정, 커맨드, 규칙, 스킬, 에이전트가 어떤 위치에서 역할을 나누는지 직관적으로 보여줍니다.
                  텍스트 중심 이미지라서 전체 보기와 확대 조각을 같이 둡니다.
                </p>
              </div>
              <div className="p-4">
                <FocusImageGallery
                  src="/landing/claude-folder-anatomy.png"
                  alt="Anatomy of the .claude folder"
                  width={744}
                  height={739}
                  areas={[
                    { label: "좌측 구조 확대", objectPosition: "left center" },
                    { label: "우측 설명 확대", objectPosition: "right center" },
                  ]}
                />
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {COUNTS.map((c) => (
              <Link
                key={c.label}
                href={c.href}
                className="group flex flex-col gap-2 bg-background px-6 py-7 transition hover:bg-surface"
              >
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-foreground-subtle">
                  {c.label}
                </span>
                <span className="font-sans text-4xl font-semibold tracking-tight text-foreground transition group-hover:text-accent">
                  {c.value}
                </span>
                <span className="font-mono text-xs text-foreground-muted">자세히 보기 →</span>
              </Link>
            ))}
          </div>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-foreground-muted">
            위 숫자는 실제 하네스 인벤토리에서 빌드 시점에 생성됩니다. 설명만 있는 사이트가 아니라, 바로 확인하고 가져다 쓸 수 있는 구조를 기준으로 정리했습니다.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.22em] text-foreground-muted">
          바로 살펴보기
        </p>
        <h2 className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
          필요한 페이지로 바로 이동할 수 있습니다
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {SHORTCUTS.map((item, index) => (
            <PrincipleCard
              key={item.href}
              number={`0${index + 1}`}
              title={item.title}
              description={item.description}
              href={item.href}
            />
          ))}
        </div>
      </section>
    </>
  );
}
