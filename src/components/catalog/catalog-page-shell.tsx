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

type GuideCard = {
  title: string;
  description: string;
  href?: string;
  hrefLabel?: string;
};

type ExternalLink = {
  label: string;
  href: string;
};

type QuickStart = {
  title: string;
  checklist: string[];
  snippet: string;
  snippetLabel: string;
  starterQueries: string[];
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
        <div className="space-y-1">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-foreground-subtle">
            파일 경로
          </p>
          <code className="block truncate font-mono text-[11px] text-foreground-subtle">{path}</code>
        </div>
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

function getGuideCards(type: Props["type"]): GuideCard[] {
  if (type === "skills") {
    return [
      {
        title: "무엇을 보는 페이지인가",
        description:
          "반복해서 다시 쓸 수 있는 작업 흐름을 모아 둔 곳입니다. review, verify, gradle 같은 이름의 스킬부터 보는 편이 좋습니다.",
      },
      {
        title: "어떻게 고르면 좋은가",
        description:
          "먼저 플랫폼 필터를 고르고, 설명에 현재 작업과 가장 가까운 워크플로가 있는지 확인한 뒤, 경로를 따라 실제 SKILL 파일까지 내려가면 됩니다.",
      },
      {
        title: "다음 단계",
        description:
          "스킬을 이해한 뒤에는 플레이북에서 실제 설정 구조를 보고, reference에서 hooks나 MCP 같은 심화 문서로 이어가면 됩니다.",
        href: "/playbook/setup-codex",
        hrefLabel: "Codex 플레이북 보기",
      },
    ];
  }

  if (type === "agents") {
    return [
      {
        title: "무엇을 보는 페이지인가",
        description:
          "메인 에이전트가 병렬로 맡길 수 있는 좁은 역할 목록입니다. reviewer, verifier, docs researcher처럼 역할이 작을수록 실전성이 높습니다.",
      },
      {
        title: "어떻게 고르면 좋은가",
        description:
          "현재 작업이 리뷰인지, 검증인지, 문서 확인인지부터 먼저 분류하십시오. 그 다음 가장 좁은 역할의 subagent를 고르는 편이 좋습니다.",
      },
      {
        title: "다음 단계",
        description:
          "profiles와 subagents 역할 설계를 같이 보면, 메인 세션과 작은 모델의 배치 기준까지 한 번에 이해할 수 있습니다.",
        href: "/reference/profiles-subagents",
        hrefLabel: "Profiles / Subagents 보기",
      },
    ];
  }

  if (type === "hooks") {
    return [
      {
        title: "무엇을 보는 페이지인가",
        description:
          "세션 시작, 도구 실행 전후 같은 순간에 자동으로 붙는 guardrail 목록입니다. 문맥 주입, 위험 명령 차단, 자동 검증이 여기에 속합니다.",
      },
      {
        title: "어떻게 고르면 좋은가",
        description:
          "먼저 event를 보고, 그 다음 matcher와 command를 읽으십시오. hooks는 기능 소개보다 실행 시점과 트리거 조건이 더 중요합니다.",
      },
      {
        title: "다음 단계",
        description:
          "hooks는 rules나 sandbox를 대체하지 않으므로, 심화 가이드와 보안 문서를 같이 보는 편이 좋습니다.",
        href: "/reference/codex-hooks",
        hrefLabel: "Hooks 심화 보기",
      },
    ];
  }

  return [
    {
      title: "무엇을 보는 페이지인가",
      description:
        "에이전트가 무엇을 허용받고, 무엇을 차단당하고, 무엇은 승인 후에만 실행해야 하는지를 선언적으로 적어 둔 정책 목록입니다. 읽기용 설명보다 실제 안전선 정의에 가깝습니다.",
    },
    {
      title: "어떻게 적용하나",
      description:
        "먼저 `forbidden` 으로 정말 위험한 명령을 막고, 그 다음 `prompt` 로 사람 확인이 필요한 명령을 분리하십시오. Codex는 `.codex/rules/default.rules`, Claude는 `.claude/settings.json` permissions 쪽에 대응시켜 넣는 식이 기본입니다.",
    },
    {
      title: "무엇부터 복사하면 좋은가",
      description:
        "처음에는 `git reset --hard`, `rm -rf`, `terraform destroy`, `kubectl delete` 같은 파괴 명령과 `git push`, `gh pr create` 같은 외부 반영 명령만 먼저 넣으십시오. 그 다음에 저장소 특화 정책을 추가하는 편이 가장 안전합니다.",
      href: "/reference/security-guardrails",
      hrefLabel: "보안 / 가드레일 보기",
    },
  ];
}

function getExternalLinks(type: Props["type"]): ExternalLink[] {
  if (type === "skills") {
    return [
      { label: "OpenAI Codex 공식 저장소", href: "https://github.com/openai/codex" },
      { label: "OpenAI skills 예시", href: "https://github.com/openai/codex/tree/main/.codex/skills" },
      { label: "Harness 100", href: "https://github.com/revfactory/harness-100" },
      { label: "OpenSkills", href: "https://github.com/BandarLabs/open-skills" },
    ];
  }

  if (type === "agents") {
    return [
      { label: "OpenAI Subagents 문서", href: "https://developers.openai.com/codex/subagents" },
      { label: "OpenAI Codex 공식 저장소", href: "https://github.com/openai/codex" },
      { label: "OpenHands", href: "https://github.com/OpenHands/OpenHands" },
      { label: "OpenCode", href: "https://github.com/sst/opencode" },
    ];
  }

  if (type === "hooks") {
    return [
      { label: "OpenAI Hooks 문서", href: "https://developers.openai.com/codex/hooks" },
      { label: "Claude Code Master Hooks", href: "https://claudecode-master.netlify.app/advanced/hooks/" },
      { label: "codexmaster security docs", href: "https://github.com/robbiecalvin/codexmaster/tree/main/docs/security" },
      { label: "OpenAI Codex 저장소", href: "https://github.com/openai/codex" },
    ];
  }

  return [
    { label: "OpenAI Rules 문서", href: "https://developers.openai.com/codex/rules" },
    { label: "OpenAI Config Reference", href: "https://developers.openai.com/codex/config-reference" },
    { label: "codexmaster guardrails", href: "https://github.com/robbiecalvin/codexmaster/tree/main/docs/security" },
    { label: "GitHub MCP Registry 정책", href: "https://docs.github.com/enterprise-cloud@latest/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-mcp-registry" },
  ];
}

function getQuickStart(type: Props["type"]): QuickStart {
  if (type === "skills") {
    return {
      title: "바로 적용 순서",
      checklist: [
        "플랫폼 필터를 먼저 고릅니다.",
        "현재 작업과 가장 가까운 skill 이름으로 검색합니다.",
        "카드 하단의 파일 경로를 기준으로 자기 프로젝트에 같은 구조를 만듭니다.",
        "처음에는 review, verify, gradle 같이 반복성이 높은 skill만 가져갑니다.",
      ],
      snippetLabel: "예시 구조",
      snippet: `.agents/skills/review/SKILL.md\n.agents/skills/verify/SKILL.md\n.codex/skills/<name>/SKILL.md`,
      starterQueries: ["review", "verify", "gradle", "deploy"],
    };
  }

  if (type === "agents") {
    return {
      title: "바로 적용 순서",
      checklist: [
        "메인 에이전트가 혼자 하기 부담스러운 역할을 먼저 고릅니다.",
        "reviewer, verifier, docs-researcher처럼 좁은 역할부터 시작합니다.",
        "카드 하단 파일 경로를 기준으로 `.codex/agents/*.toml` 또는 `.claude/agents/*.md`에 옮깁니다.",
        "write 권한이 필요한 agent는 최소화합니다.",
      ],
      snippetLabel: "예시 구조",
      snippet: `.codex/agents/reviewer.toml\n.codex/agents/verifier.toml\n.claude/agents/content-reviewer.md`,
      starterQueries: ["reviewer", "verifier", "docs", "content"],
    };
  }

  if (type === "hooks") {
    return {
      title: "바로 적용 순서",
      checklist: [
        "먼저 SessionStart와 PreToolUse 두 개만 넣습니다.",
        "hook 스크립트는 짧고 결정적으로 유지합니다.",
        "카드의 event와 matcher를 보고, 자기 프로젝트 수명주기와 맞는지 확인합니다.",
        "무거운 전체 테스트는 hook보다 verify 스크립트로 내리는 편이 안전합니다.",
      ],
      snippetLabel: "예시 구조",
      snippet: `.codex/hooks.json\n.codex/hooks/session_start_context.py\n.codex/hooks/pre_bash_guard.py`,
      starterQueries: ["SessionStart", "PreToolUse", "PostToolUse", "ktlint"],
    };
  }

  return {
    title: "바로 적용 순서",
    checklist: [
      "처음에는 forbidden과 prompt 규칙만 잡습니다.",
      "정말 위험한 명령은 forbidden, 사람 확인이 필요한 명령은 prompt로 둡니다.",
      "카드 하단 경로를 기준으로 `.codex/rules/default.rules` 또는 `.claude/settings.json` permissions에 옮깁니다.",
      "저장소 특화 규칙은 나중에 추가합니다.",
    ],
    snippetLabel: "예시 구조",
    snippet: `prefix_rule(["git", "reset", "--hard"], "forbidden")\nprefix_rule(["rm", "-rf"], "forbidden")\nprefix_rule(["git", "push"], "prompt")`,
    starterQueries: ["forbidden", "prompt", "git", "kubectl"],
  };
}

/**
 * 카탈로그 페이지의 클라이언트 셸입니다.
 * type 별로 어떤 카드를 그릴지 내부에서 분기합니다 (RSC 경계 함수 prop 회피).
 */
export function CatalogPageShell(props: Props) {
  const { type, title, description, items, meta } = props;
  const [query, setQuery] = React.useState("");
  const [platform, setPlatform] = React.useState<"all" | Platform>("all");
  const guideCards = React.useMemo(() => getGuideCards(type), [type]);
  const externalLinks = React.useMemo(() => getExternalLinks(type), [type]);
  const quickStart = React.useMemo(() => getQuickStart(type), [type]);

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

        <div className="grid gap-4 xl:grid-cols-3">
          {guideCards.map((card) => (
            <article
              key={card.title}
              className="rounded-2xl border border-border bg-surface px-5 py-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
            >
              <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
              <p className="mt-2 text-sm leading-7 text-foreground-muted">{card.description}</p>
              {card.href && card.hrefLabel ? (
                <Link
                  href={card.href}
                  className="mt-4 inline-flex items-center gap-2 font-mono text-xs text-accent hover:underline"
                >
                  {card.hrefLabel} →
                </Link>
              ) : null}
            </article>
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-surface px-5 py-5">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-foreground-subtle">
            바로 열어보기
          </p>
          <p className="mt-2 text-sm leading-7 text-foreground-muted">
            내부 인벤토리만 보지 말고, 관련된 실제 GitHub 저장소와 공식 문서도 같이 열어 보시는 편이 이해가 빠릅니다.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {externalLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="rounded-md border border-border bg-background px-3 py-2 font-mono text-xs text-foreground-muted transition hover:border-accent hover:text-foreground"
              >
                {item.label} ↗
              </a>
            ))}
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
          <article className="rounded-2xl border border-border bg-surface px-5 py-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-foreground-subtle">
              {quickStart.title}
            </p>
            <ol className="mt-4 space-y-3">
              {quickStart.checklist.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-border font-mono text-[11px] text-foreground-subtle">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-7 text-foreground-muted">{step}</p>
                </li>
              ))}
            </ol>
            <div className="mt-5 flex flex-wrap gap-2">
              {quickStart.starterQueries.map((starter) => (
                <button
                  key={starter}
                  type="button"
                  onClick={() => setQuery(starter)}
                  className="rounded-md border border-border bg-background px-3 py-2 font-mono text-xs text-foreground-muted transition hover:border-accent hover:text-foreground"
                >
                  {starter}
                </button>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-border bg-surface px-5 py-5 shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-foreground-subtle">
              {quickStart.snippetLabel}
            </p>
            <pre className="mt-4 overflow-x-auto rounded-xl border border-border bg-background px-4 py-4 font-mono text-[12px] leading-6 text-foreground">
              <code>{quickStart.snippet}</code>
            </pre>
            <p className="mt-4 text-sm leading-7 text-foreground-muted">
              위 구조를 기준으로 자기 프로젝트에 동일한 파일/디렉터리를 만들고, 카드에서 고른 항목 내용을 옮기면 됩니다.
            </p>
          </article>
        </div>

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
          {query ? ` / 검색어: "${query}"` : ""}
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
