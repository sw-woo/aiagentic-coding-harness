/**
 * 이 컴포넌트는 에이전틱 코딩 하네스의 5개 레이어를 인터랙티브 다이어그램으로 보여드립니다.
 * `import { HarnessLayerDiagram } from "@/components/diagrams/HarnessLayerDiagram";` 형태로 가져와서 사용하실 수 있습니다.
 */
'use client';

import { useId, useState, type JSX } from 'react';
import {
  Brain,
  Lock,
  Shield,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react';

type Layer = {
  id: string;
  title: string;
  description: string;
  path: string;
  examples: string;
  Icon: LucideIcon;
};

const layers = [
  {
    id: 'memory-context',
    title: 'Memory & Context',
    description:
      'Session memory, harness specs, and context window discipline keep the agent grounded across long-running work.',
    path: 'CLAUDE.md',
    examples: 'CLAUDE.md / AGENTS.md / context window management',
    Icon: Brain,
  },
  {
    id: 'skills-commands',
    title: 'Skills & Slash Commands',
    description:
      'Reusable skills and command surfaces turn recurring workflows like review, verification, and planning into fast entry points.',
    path: '.claude/skills/test-all/SKILL.md',
    examples: '.claude/skills, .agents/skills, /review, /test-all',
    Icon: Zap,
  },
  {
    id: 'subagents',
    title: 'Subagents',
    description:
      'Specialized ephemeral agents split complex work into parallel lanes while preserving a focused context for each role.',
    path: '.codex/agents',
    examples: '.claude/agents, .codex/agents, parallel ephemeral specialists',
    Icon: Users,
  },
  {
    id: 'rules-permissions',
    title: 'Rules & Permissions',
    description:
      'Policy layers define what the agent may edit, execute, or escalate before any tool call is allowed to proceed.',
    path: '.codex/rules/default.rules',
    examples: '.claude/settings.json permissions, .codex/rules/default.rules',
    Icon: Shield,
  },
  {
    id: 'hooks-sandbox',
    title: 'Hooks & Sandbox',
    description:
      'Lifecycle hooks and sandbox controls provide last-mile enforcement around tool use, execution boundaries, and recovery flows.',
    path: '.codex/hooks.json',
    examples: 'PreToolUse, PostToolUse, sandbox modes, exec policy',
    Icon: Lock,
  },
] as const satisfies readonly Layer[];

export function HarnessLayerDiagram(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const panelId = useId();
  const activeLayer = layers[activeIndex];

  return (
    <section className="mx-auto w-full max-w-4xl">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-start">
        <div
          aria-label="Agentic coding harness layers"
          className="flex flex-col gap-3"
        >
          {layers.map((layer, index) => {
            const isActive = index === activeIndex;
            const Icon = layer.Icon;

            return (
              <button
                key={layer.id}
                type="button"
                role="button"
                aria-label={`${layer.title} layer`}
                aria-controls={panelId}
                aria-pressed={isActive}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                className={[
                  'group relative flex w-full items-start gap-4 overflow-hidden rounded-2xl border p-4 text-left',
                  'bg-background/95 border-border text-foreground shadow-[0_0_0_1px_rgba(255,255,255,0.02)]',
                  'motion-safe:transition-[transform,border-color,box-shadow,background-color] motion-safe:duration-200',
                  'motion-safe:hover:-translate-y-px motion-safe:focus-visible:-translate-y-px',
                  'motion-reduce:transition-none motion-reduce:transform-none',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0042FF] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950',
                  isActive
                    ? 'border-[#68CAFF] bg-zinc-900/90 shadow-[0_0_0_1px_rgba(104,202,255,0.35),0_0_28px_rgba(104,202,255,0.12)]'
                    : 'hover:border-[#68CAFF]/70 hover:bg-zinc-900/80 hover:shadow-[0_0_24px_rgba(104,202,255,0.08)]',
                ].join(' ')}
              >
                <div
                  className={[
                    'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border',
                    'motion-safe:transition-colors motion-safe:duration-200 motion-reduce:transition-none',
                    isActive
                      ? 'border-[#0042FF] bg-[#0042FF] text-white'
                      : 'border-zinc-800 bg-zinc-950 text-[#68CAFF]',
                  ].join(' ')}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.22em] text-zinc-500">
                        Layer {index + 1}
                      </p>
                      <h3 className="mt-1 text-base font-semibold text-foreground sm:text-lg">
                        {layer.title}
                      </h3>
                    </div>
                    <span
                      className={[
                        'hidden rounded-full border px-2.5 py-1 text-[11px] font-medium text-zinc-400 sm:inline-flex',
                        isActive ? 'border-[#68CAFF]/60 text-[#68CAFF]' : 'border-zinc-800',
                      ].join(' ')}
                    >
                      Active
                    </span>
                  </div>

                  <p className="mt-2 line-clamp-2 text-sm text-zinc-400">
                    {layer.examples}
                  </p>

                  <code className="mt-3 inline-flex max-w-full rounded-md border border-zinc-800 bg-zinc-950/80 px-2.5 py-1 text-xs text-zinc-300">
                    <span className="truncate">{layer.path}</span>
                  </code>
                </div>
              </button>
            );
          })}
        </div>

        <aside
          id={panelId}
          aria-live="polite"
          className="sticky top-4 rounded-3xl border border-border bg-zinc-950/90 p-5 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]"
        >
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-[#68CAFF] bg-[#0042FF] text-white shadow-[0_0_24px_rgba(104,202,255,0.16)]">
              <activeLayer.Icon className="h-5 w-5" aria-hidden="true" />
            </div>

            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-[#68CAFF]">
                Harness Layer {activeIndex + 1}
              </p>
              <h3 className="mt-1 text-xl font-semibold text-foreground">
                {activeLayer.title}
              </h3>
            </div>
          </div>

          <p className="mt-5 text-sm leading-7 text-zinc-300">
            {activeLayer.description}
          </p>

          <div className="mt-5 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
              Example Surface
            </p>
            <p className="mt-2 text-sm text-zinc-300">{activeLayer.examples}</p>

            <p className="mt-4 text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">
              Example File Path
            </p>
            <code className="mt-2 inline-flex max-w-full rounded-md border border-zinc-800 bg-zinc-950 px-2.5 py-1.5 text-xs text-zinc-200">
              <span className="truncate">{activeLayer.path}</span>
            </code>
          </div>

          <div className="mt-5 flex items-center gap-2 text-xs text-zinc-500">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#0042FF]" />
            Hover, focus, or tap a layer to inspect its role in the harness.
          </div>
        </aside>
      </div>
    </section>
  );
}
