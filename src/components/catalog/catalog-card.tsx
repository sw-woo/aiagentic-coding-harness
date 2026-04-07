import * as React from "react";
import type { Platform } from "@/lib/catalog";
import { platformLabel } from "@/lib/catalog";
import { cn } from "@/lib/utils";

type CatalogCardProps = {
  name: string;
  platform: Platform;
  description: string;
  path: string;
  badges?: { label: string; tone?: "default" | "success" | "warn" | "danger" }[];
  children?: React.ReactNode;
};

const TONE_STYLES = {
  default: "border-border text-foreground-muted",
  success: "border-success/50 text-success",
  warn: "border-amber-400/50 text-amber-300",
  danger: "border-danger/50 text-danger",
} as const;

/**
 * 카탈로그 그리드의 단일 카드입니다.
 * - 좌상단: monospace 이름 + 플랫폼 칩
 * - 본문: 짧은 description
 * - 좌하단: 파일 경로 (monospace)
 * - 우하단: 태그/배지
 */
export function CatalogCard({
  name,
  platform,
  description,
  path,
  badges,
  children,
}: CatalogCardProps) {
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
        <code className="truncate font-mono text-[11px] text-foreground-subtle">
          {path}
        </code>
        {badges && badges.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {badges.map((b) => (
              <span
                key={b.label}
                className={cn(
                  "rounded-sm border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide",
                  TONE_STYLES[b.tone ?? "default"],
                )}
              >
                {b.label}
              </span>
            ))}
          </div>
        ) : null}
      </footer>
    </article>
  );
}
