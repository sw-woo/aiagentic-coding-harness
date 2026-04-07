"use client";

import * as React from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import {
  catalogTypes,
  catalogTypeLabels,
  decisionLabel,
  decisionTone,
  platformLabel,
  type CatalogType,
  type Platform,
  type SkillItem,
  type AgentItem,
  type HookItem,
  type RuleItem,
} from "@/lib/catalog";
import { cn } from "@/lib/utils";

type Meta = { source: string; sourceUrl: string; generatedAt: string };

type Props =
  | {
      type: "skills";
      title: string;
      description: string;
      items: SkillItem[];
      meta: Meta;
    }
  | {
      type: "agents";
      title: string;
      description: string;
      items: AgentItem[];
      meta: Meta;
    }
  | {
      type: "hooks";
      title: string;
      description: string;
      items: HookItem[];
      meta: Meta;
    }
  | {
      type: "rules";
      title: string;
      description: string;
      items: RuleItem[];
      meta: Meta;
    };

const TONE_STYLES = {
  default: "border-border text-foreground-muted",
  success: "border-success/50 text-success",
  warn: "border-amber-400/50 text-amber-300",
  danger: "border-danger/50 text-danger",
} as const;

type Tone = keyof typeof TONE_STYLES;

function Badge({ label, tone = "default" }: { label: string; tone?: Tone }) {
  return (
    <span
      className={cn(
        "rounded-sm border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide",
        TONE_STYLES[tone],
      )}
    >
      {label}
    </span>
  );
}

function CardShell({
  name,
  platform,
  description,
  path,
  badges,
  children,
}: {
  name: string;
  platform: Platform;
  description: string;
  path: string;
  badges?: { label: string; tone?: Tone }[];
  children?: React.ReactNode;
}) {
  return (
    <article className="group flex h-full flex-col gap-4 rounded-lg border border-border bg-surface p-5 transition hover:border-accent">
      <header className="flex items-start justify-between gap-3">
        <h3 className="font-mono text-sm font-semibold tracking-tight text-foreground">
          {name}
        </h3>
        <span className="shrink-0 rounded-sm border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-foreground-muted">
          {platformLabel(platform)}
        </span>
      </header>
      <p className="flex-1 font-sans text-sm leading-relaxed text-foreground-muted">
        {description}
      </p>
      {children}
      <footer className="flex flex-col gap-3 border-t border-border pt-3">
        <code className="truncate font-mono text-[11px] text-foreground-subtle">{path}</code>
        {badges && badges.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {badges.map((b) => (
              <Badge key={b.label} {...b} />
            ))}
          </div>
        ) : null}
      </footer>
    </article>
  );
}

/**
 * 카탈로그 페이지의 클라이언트 셸입니다.
 * type 별로 어떤 카드를 그릴지 내부에서 분기합니다 (RSC 경계 함수 prop 회피).
 */
export function CatalogPageShell(props: Props) {
  const { type, title, description, items, meta } = props;
  const [query, setQuery] = React.useState("");
  const [platform, setPlatform] = React.useState<"all" | Platform>("all");

  const filtered = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return (items as Array<SkillItem | AgentItem | HookItem | RuleItem>).filter((item) => {
      if (platform !== "all" && item.platform !== platform) return false;
      if (!q) return true;
      const desc =
        "description" in item && typeof item.description === "string"
          ? item.description
          : "";
      const haystack = `${item.name} ${desc} ${item.path ?? ""}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [items, query, platform]);

  return (
    <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[220px_1fr]">
      <aside className="space-y-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-foreground-subtle">
            카탈로그
          </p>
          <h1 className="mt-2 font-sans text-2xl font-semibold tracking-tight text-foreground">
            살아있는 인벤토리
          </h1>
          <p className="mt-3 text-sm text-foreground-muted">
            아래 데이터는 실제 <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-[11px]">{meta.source}</code> 저장소에서 빌드 시점에 자동 생성됩니다.
          </p>
        </div>
        <nav aria-label="카탈로그 카테고리" className="flex flex-col gap-1">
          {catalogTypes.map((t) => (
            <Link
              key={t}
              href={`/catalog/${t}`}
              className={cn(
                "rounded-md px-3 py-2 font-mono text-sm transition",
                t === type
                  ? "border border-accent bg-accent/10 text-foreground"
                  : "border border-transparent text-foreground-muted hover:border-border hover:bg-surface hover:text-foreground",
              )}
            >
              {catalogTypeLabels[t]}
            </Link>
          ))}
        </nav>
        <p className="font-mono text-xs text-foreground-subtle">생성일: {meta.generatedAt}</p>
      </aside>

      <section className="min-w-0 space-y-6">
        <header className="space-y-3">
          <h2 className="font-sans text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
            {title}
          </h2>
          <p className="max-w-3xl font-serif text-base leading-relaxed text-foreground-muted">
            {description}
          </p>
        </header>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-subtle"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="이름·경로·설명으로 검색..."
              className="h-10 w-full rounded-md border border-border bg-surface pl-9 pr-3 font-mono text-sm text-foreground placeholder:text-foreground-subtle focus:border-accent focus:outline-none"
            />
          </div>
          <div className="flex items-center gap-1 rounded-md border border-border bg-surface p-1">
            {(["all", "claude-code", "codex"] as const).map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPlatform(p)}
                className={cn(
                  "rounded px-3 py-1 font-mono text-xs uppercase tracking-wider transition",
                  platform === p
                    ? "bg-accent text-white"
                    : "text-foreground-muted hover:text-foreground",
                )}
              >
                {p === "all" ? "전체" : p === "claude-code" ? "Claude Code" : "Codex"}
              </button>
            ))}
          </div>
        </div>

        <p className="font-mono text-xs text-foreground-subtle">
          {filtered.length}개 결과 / 전체 {items.length}개
        </p>

        {filtered.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border bg-surface/40 p-12 text-center">
            <p className="font-serif text-base text-foreground-muted">
              검색 조건에 맞는 항목이 없습니다.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {type === "skills" &&
              (filtered as SkillItem[]).map((item) => (
                <CardShell
                  key={item.id}
                  name={item.name}
                  platform={item.platform}
                  description={item.description ?? "(설명 없음)"}
                  path={item.path}
                  badges={item.model ? [{ label: item.model }] : undefined}
                />
              ))}

            {type === "agents" &&
              (filtered as AgentItem[]).map((item) => (
                <CardShell
                  key={item.id}
                  name={item.name}
                  platform={item.platform}
                  description={item.description ?? "(설명 없음)"}
                  path={item.path}
                  badges={[
                    ...(item.model ? [{ label: item.model }] : []),
                    ...(item.sandboxMode
                      ? [
                          {
                            label: item.sandboxMode,
                            tone:
                              item.sandboxMode === "read-only"
                                ? ("success" as const)
                                : ("warn" as const),
                          },
                        ]
                      : []),
                  ]}
                />
              ))}

            {type === "hooks" &&
              (filtered as HookItem[]).map((item) => (
                <CardShell
                  key={item.id}
                  name={item.name}
                  platform={item.platform}
                  description={`${item.event} · ${item.matcher}${item.statusMessage ? " · " + item.statusMessage : ""}`}
                  path={item.path}
                  badges={[
                    { label: item.event },
                    { label: item.matcher, tone: "warn" },
                  ]}
                >
                  <code className="block truncate rounded bg-surface-2 px-2 py-1 font-mono text-[11px] text-foreground-muted">
                    {item.command}
                  </code>
                </CardShell>
              ))}

            {type === "rules" &&
              (filtered as RuleItem[]).map((item) => (
                <CardShell
                  key={item.id}
                  name={item.name}
                  platform={item.platform}
                  description={item.pattern ?? ""}
                  path={item.path}
                  badges={[
                    {
                      label: decisionLabel(item.decision),
                      tone: decisionTone(item.decision),
                    },
                    ...(item.category ? [{ label: item.category }] : []),
                  ]}
                />
              ))}
          </div>
        )}
      </section>
    </div>
  );
}
