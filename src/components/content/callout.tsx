import * as React from "react";
import { Info, AlertTriangle, ShieldAlert, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutTone = "note" | "warning" | "danger" | "tip";

const TONE_STYLES: Record<
  CalloutTone,
  { border: string; bg: string; icon: React.ComponentType<{ className?: string }>; label: string }
> = {
  note: {
    border: "border-info",
    bg: "bg-info/10",
    icon: Info,
    label: "참고",
  },
  warning: {
    border: "border-amber-400",
    bg: "bg-amber-400/10",
    icon: AlertTriangle,
    label: "주의",
  },
  danger: {
    border: "border-danger",
    bg: "bg-danger/10",
    icon: ShieldAlert,
    label: "위험",
  },
  tip: {
    border: "border-success",
    bg: "bg-success/10",
    icon: Sparkles,
    label: "팁",
  },
};

type CalloutProps = {
  tone?: CalloutTone;
  title?: string;
  children: React.ReactNode;
};

/**
 * 본문 안에 삽입하는 강조 박스입니다.
 * 톤은 참고/주의/위험/팁 네 가지를 지원합니다.
 */
export function Callout({ tone = "note", title, children }: CalloutProps) {
  const style = TONE_STYLES[tone];
  const Icon = style.icon;
  return (
    <aside
      className={cn(
        "my-6 flex gap-4 rounded-lg border-l-4 bg-surface/60 px-5 py-4 font-sans text-[15px] text-foreground",
        style.border,
        style.bg,
      )}
    >
      <Icon className="mt-1 h-5 w-5 shrink-0 text-foreground-muted" aria-hidden="true" />
      <div className="space-y-2">
        <p className="font-medium text-foreground">{title ?? style.label}</p>
        <div className="text-foreground-muted [&>*+*]:mt-2">{children}</div>
      </div>
    </aside>
  );
}
