"use client";

import * as React from "react";
import {
  Brain,
  Search,
  Users,
  Lock,
  Shield,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";

type Step = {
  id: string;
  number: string;
  title: string;
  oneLine: string;
  paragraph: string;
  artifacts: string[];
  Icon: LucideIcon;
};

const STEPS: readonly Step[] = [
  {
    id: "define-memory",
    number: "01",
    title: "메모리와 컨텍스트 정의",
    oneLine: "무엇을 만들지, 어떤 규칙을 따라야 하는지 적어 둡니다.",
    paragraph:
      "프로젝트 메모리는 모든 세션이 시작 시점에 자동으로 읽는 단일 진실의 출처입니다. 빌드 명령, 검증 명령, 보안 금지사항, 아키텍처 원칙 같은 오래 살아남는 규칙만 적어 두십시오.",
    artifacts: ["CLAUDE.md", "AGENTS.md", "@import 패턴"],
    Icon: Brain,
  },
  {
    id: "permissions-rules",
    number: "02",
    title: "권한과 규칙 선언",
    oneLine: "에이전트가 실행해도 되는 일과 멈춰야 하는 일을 명시합니다.",
    paragraph:
      "settings.json 의 permissions 또는 .codex/rules/default.rules 같은 declarative 정책으로 forbidden / prompt / allow 결정을 적습니다. 이 레이어는 사람이 읽고 납득할 수 있어야 합니다.",
    artifacts: [".claude/settings.json", ".codex/rules/default.rules"],
    Icon: Shield,
  },
  {
    id: "hooks-guardrails",
    number: "03",
    title: "훅으로 가드레일 설치",
    oneLine: "위험 명령은 사전 차단, 자동 lint 는 사후 실행되도록 이벤트에 연결합니다.",
    paragraph:
      "PreToolUse 는 위험한 Bash 명령을 실행 전에 막고, PostToolUse 는 변경된 파일을 자동으로 검사합니다. SessionStart 는 세션이 열릴 때마다 환경 컨텍스트를 주입합니다.",
    artifacts: [".claude/hooks/", ".codex/hooks/", "smoke test"],
    Icon: Lock,
  },
  {
    id: "skills-commands",
    number: "04",
    title: "재사용 스킬과 슬래시 명령",
    oneLine: "반복되는 워크플로를 짧고 명확한 입구로 묶어 둡니다.",
    paragraph:
      "리뷰, 검증, 배포 준비 같은 반복 작업은 SKILL.md frontmatter 로 정의합니다. 한 줄 description 만 보고도 언제 호출해야 할지 분명해야 합니다.",
    artifacts: [".claude/skills/", ".agents/skills/", "/review", "/test-all"],
    Icon: Zap,
  },
  {
    id: "subagents",
    number: "05",
    title: "서브에이전트로 역할 분리",
    oneLine: "리뷰어, 검증자, 문서 확인 같은 좁은 역할을 병렬화합니다.",
    paragraph:
      "메인 에이전트가 모든 일을 다 하지 않습니다. read-only 리뷰어, 검증 워커, 문서 리서처처럼 좁은 역할을 별도 컨텍스트로 띄워 fan-out 합니다.",
    artifacts: [".claude/agents/", ".codex/agents/", "병렬 실행"],
    Icon: Users,
  },
  {
    id: "verify-loop",
    number: "06",
    title: "검증 루프 자동화",
    oneLine: "변경 후 사실 확인을 사람이 기억하지 않아도 되게 만듭니다.",
    paragraph:
      "lint, type check, test, smoke test, docs sync 를 한 스크립트로 묶고, CI 와 hook 양쪽에서 호출합니다. 사실 기반 완료 선언만 허용합니다.",
    artifacts: ["scripts/verify_*.sh", "CI workflow", "evidence-before-assertions"],
    Icon: Search,
  },
  {
    id: "iterate",
    number: "07",
    title: "반복 가능한 출하",
    oneLine: "git push 한 번으로 동일한 회귀 검증과 배포가 끝나는 상태로 만듭니다.",
    paragraph:
      "배포는 토큰을 외운 사람만의 비밀 의식이 아니라 누구나 git push 만으로 재현할 수 있는 동작이어야 합니다. Vercel 자동 배포, GitHub Actions 검증 워크플로 등을 이 단계에서 닫습니다.",
    artifacts: ["vercel.json", ".github/workflows/deploy.yml", ".env.example"],
    Icon: Sparkles,
  },
] as const;

/**
 * 하네스 엔지니어링 7단계를 인터랙티브 카드 행으로 보여주는 컴포넌트입니다.
 * - 각 단계는 hover/focus/click 으로 활성화
 * - 활성 단계의 상세 설명과 산출물 목록을 우측 카드에 표시
 * - prefers-reduced-motion 존중
 */
export function HarnessEngineeringSteps() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const active = STEPS[activeIndex];

  return (
    <section className="mx-auto w-full max-w-6xl">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-start">
        <ol className="space-y-3" aria-label="하네스 엔지니어링 7단계">
          {STEPS.map((step, index) => {
            const isActive = index === activeIndex;
            const Icon = step.Icon;
            return (
              <li key={step.id}>
                <button
                  type="button"
                  aria-pressed={isActive}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  className={[
                    "group flex w-full items-start gap-4 rounded-lg border p-4 text-left transition motion-reduce:transition-none",
                    isActive
                      ? "border-accent-2 bg-surface shadow-[0_0_0_1px_var(--accent-2)]"
                      : "border-border bg-surface/60 hover:border-accent-2/60 hover:bg-surface",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "flex h-11 w-11 shrink-0 items-center justify-center rounded-md border transition",
                      isActive
                        ? "border-accent bg-accent text-white"
                        : "border-border bg-background text-accent-2",
                    ].join(" ")}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground-subtle">
                      Step {step.number}
                    </p>
                    <p className="mt-1 font-sans text-base font-semibold text-foreground sm:text-lg">
                      {step.title}
                    </p>
                    <p className="mt-1 text-sm text-foreground-muted">{step.oneLine}</p>
                  </div>
                </button>
              </li>
            );
          })}
        </ol>

        <aside
          aria-live="polite"
          className="sticky top-20 rounded-lg border border-border bg-surface p-6"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent-2">
            Step {active.number}
          </p>
          <h3 className="mt-2 font-sans text-2xl font-semibold tracking-tight text-foreground">
            {active.title}
          </h3>
          <p className="mt-4 font-serif text-[15px] leading-relaxed text-foreground">
            {active.paragraph}
          </p>
          <div className="mt-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">
              핵심 산출물
            </p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {active.artifacts.map((a) => (
                <li
                  key={a}
                  className="rounded-md border border-border bg-background px-2 py-1 font-mono text-xs text-foreground"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </section>
  );
}
