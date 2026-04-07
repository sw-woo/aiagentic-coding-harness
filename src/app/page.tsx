import Link from "next/link";
import { EditorialHero } from "@/components/landing/editorial-hero";
import { PrincipleCard } from "@/components/landing/principle-card";
import { catalog } from "@/lib/catalog";

const PRINCIPLES = [
  {
    number: "01",
    title: "선언문",
    description:
      "이 사이트의 모든 콘텐츠가 따르는 다섯 가지 원칙입니다. 출처 없는 주장은 사이트에 올라가지 않습니다.",
    href: "/manifesto",
    hint: "5 rules",
  },
  {
    number: "02",
    title: "Karpathy 방법론",
    description:
      "Software 1.0 / 2.0 / 3.0, LLM as OS, vibe coding의 진짜 의미와 한계, 그리고 그 위에서 진지한 하네스가 어떻게 동작하는지 정리했습니다.",
    href: "/methodology/karpathy",
    hint: "essay",
  },
  {
    number: "03",
    title: "5-레이어 아키텍처",
    description:
      "memory · skills · subagents · rules · hooks 다섯 레이어로 구성된 하네스의 인터랙티브 다이어그램입니다. 각 레이어를 클릭하면 실제 파일과 역할을 볼 수 있습니다.",
    href: "/architecture/overview",
    hint: "diagram",
  },
  {
    number: "04",
    title: "살아있는 카탈로그",
    description:
      "이 사이트를 만든 하네스의 모든 skill, agent, hook, rule을 검색하고 자기 프로젝트로 가져갈 수 있습니다.",
    href: "/catalog/skills",
    hint: `${catalog.skills.length + catalog.agents.length + catalog.hooks.length + catalog.rules.length}개 항목`,
  },
] as const;

const COUNTS = [
  { label: "스킬", value: catalog.skills.length, href: "/catalog/skills" },
  { label: "서브에이전트", value: catalog.agents.length, href: "/catalog/agents" },
  { label: "훅", value: catalog.hooks.length, href: "/catalog/hooks" },
  { label: "규칙", value: catalog.rules.length, href: "/catalog/rules" },
] as const;

export default function Home() {
  return (
    <>
      <EditorialHero />

      <section className="border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
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
          <p className="mt-6 max-w-3xl font-serif text-base leading-relaxed text-foreground-muted">
            위 숫자는 모두 실제 <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-sm">kotlin-codex</code> 저장소의 하네스 인벤토리에서 빌드 시점에 생성됩니다.
            이 사이트 자체가 자기 자신의 견본이며, 여러분의 프로젝트에도 같은 방식으로 적용할 수 있습니다.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <p className="mb-2 font-mono text-xs uppercase tracking-[0.22em] text-foreground-muted">
          목차
        </p>
        <h2 className="font-serif text-3xl tracking-tight text-foreground sm:text-4xl">
          사이트 안에서 어디로 갈 수 있나요
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p) => (
            <PrincipleCard key={p.number} {...p} />
          ))}
        </div>
      </section>
    </>
  );
}
