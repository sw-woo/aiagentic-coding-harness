/**
 * Zero Trust 플러그인 파이프라인 다이어그램.
 *
 * 여섯 단계로 구성된 방어 흐름을 시각화합니다:
 * Plugin (신뢰 불가) → Allowlist → Sandbox → Credential Proxy → I/O Guardrail → Result (안전)
 *
 * 사용처:
 * - /reference/zero-trust-plugins 페이지의 §2 4계층 방어 섹션
 * - 추후 /architecture/overview 페이지에서도 사용 가능
 *
 * 다크/라이트 테마 자동 반영, 모바일 1열 → 데스크탑 가로 흐름 반응형.
 */
import {
  AlertTriangle,
  ListChecks,
  Box,
  Lock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ArrowDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Stage = {
  number: string;
  icon: LucideIcon;
  title: string;
  detail: string;
  tone: "danger" | "neutral" | "success";
};

const STAGES: Stage[] = [
  {
    number: "0",
    icon: AlertTriangle,
    title: "Plugin",
    detail: "기본적으로 신뢰할 수 없는 외부 도구, MCP 서버, 플러그인 입력",
    tone: "danger",
  },
  {
    number: "1",
    icon: ListChecks,
    title: "Allowlist",
    detail: "사전에 감사된 목록 안에서만 등록. 서명 / 출처 검증",
    tone: "neutral",
  },
  {
    number: "2",
    icon: Box,
    title: "Sandbox",
    detail: "micro VM · V8 isolate · gVisor 로 실행 권한 격리",
    tone: "neutral",
  },
  {
    number: "3",
    icon: Lock,
    title: "Credential Proxy",
    detail: "비밀 키는 프록시만 알고, 플러그인은 단기 토큰만 받음",
    tone: "neutral",
  },
  {
    number: "4",
    icon: ShieldCheck,
    title: "I/O Guardrails",
    detail: "Llama Guard · NeMo Guardrails · Prompt Guard 로 입출력 검사",
    tone: "neutral",
  },
  {
    number: "5",
    icon: CheckCircle2,
    title: "Result",
    detail: "네 층을 모두 통과한 응답만 에이전트 컨텍스트로 전달",
    tone: "success",
  },
];

const TONE_STYLES: Record<Stage["tone"], { border: string; iconColor: string; badge: string }> = {
  danger: {
    border: "border-danger/50",
    iconColor: "text-danger",
    badge: "text-danger",
  },
  neutral: {
    border: "border-border",
    iconColor: "text-accent",
    badge: "text-foreground-subtle",
  },
  success: {
    border: "border-success/50",
    iconColor: "text-success",
    badge: "text-success",
  },
};

export function ZeroTrustPipeline() {
  return (
    <div className="rounded-2xl border border-border bg-background p-6 sm:p-8">
      <header className="mb-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-foreground-subtle">
          Defense Pipeline · 6 Stages
        </p>
        <h3 className="mt-2 font-serif text-2xl tracking-tight text-foreground sm:text-[26px]">
          Zero Trust 플러그인 방어 흐름
        </h3>
        <p className="mt-2 max-w-[72ch] text-sm leading-7 text-foreground-muted">
          외부 플러그인 입력(0) 은 기본적으로 신뢰할 수 없다고 가정합니다. 네 개의 방어 층을 차례로
          통과해야만 결과(5) 가 에이전트 컨텍스트에 도달합니다. 한 층이 무너져도 다음 층이
          보완하도록 설계합니다.
        </p>
      </header>

      {/* 데스크탑: 가로 흐름 / 모바일: 세로 흐름 */}
      <ol
        className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-stretch lg:gap-2"
        aria-label="Zero Trust 방어 파이프라인 6단계"
      >
        {STAGES.map((stage, index) => {
          const Icon = stage.icon;
          const tone = TONE_STYLES[stage.tone];
          const isLast = index === STAGES.length - 1;

          return (
            <li
              key={stage.number}
              className="flex flex-1 flex-col lg:min-w-0 lg:flex-row lg:items-stretch"
            >
              <article
                className={`flex-1 rounded-xl border bg-surface p-4 transition lg:min-w-0 ${tone.border}`}
              >
                <div className="flex items-start gap-3">
                  <div className={`shrink-0 ${tone.iconColor}`}>
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p
                      className={`font-mono text-[10px] uppercase tracking-[0.18em] ${tone.badge}`}
                    >
                      Stage {stage.number}
                    </p>
                    <h4 className="mt-1 text-sm font-semibold tracking-tight text-foreground">
                      {stage.title}
                    </h4>
                    <p className="mt-2 text-xs leading-6 text-foreground-muted">{stage.detail}</p>
                  </div>
                </div>
              </article>

              {!isLast && (
                <div
                  className="flex items-center justify-center py-1 lg:px-1 lg:py-0"
                  aria-hidden="true"
                >
                  <ArrowDown className="h-4 w-4 text-foreground-subtle lg:hidden" />
                  <ArrowRight className="hidden h-4 w-4 text-foreground-subtle lg:block" />
                </div>
              )}
            </li>
          );
        })}
      </ol>

      <footer className="mt-6 rounded-xl border border-border bg-surface-2/40 p-4">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">
          핵심 원칙
        </p>
        <p className="mt-2 text-sm leading-7 text-foreground-muted">
          한 층만 믿지 않습니다. Allowlist 가 뚫리면 Sandbox 가, Sandbox 가 뚫리면 Credential Proxy
          가, 모든 층이 뚫리면 I/O Guardrails 가 잡습니다. 단일 안전 장치는 언젠가 실패하지만, 네
          층이 직렬로 연결된 구조는 모든 층이 동시에 실패해야만 뚫립니다.
        </p>
      </footer>
    </div>
  );
}
