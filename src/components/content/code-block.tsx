import * as React from "react";
import { cn } from "@/lib/utils";

type CodeBlockProps = {
  filename?: string;
  language?: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * 코드 블록 컴포넌트입니다.
 * MVP 단계에서는 Shiki 없이 plain pre/code + 파일명 헤더를 보여 줍니다.
 * 후속 phase 에서 Shiki 또는 Fumadocs 코드 하이라이트를 추가할 예정입니다.
 */
export function CodeBlock({ filename, language, children, className }: CodeBlockProps) {
  return (
    <div className={cn("my-6 overflow-hidden rounded-lg border border-border bg-surface", className)}>
      <div className="flex items-center justify-between gap-4 border-b border-border bg-surface-2 px-4 py-2 font-mono text-xs text-foreground-muted">
        <span className="truncate text-foreground-muted">{filename ?? "snippet"}</span>
        {language ? (
          <span className="text-foreground-subtle">{language}</span>
        ) : null}
      </div>
      <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed text-foreground"><code>{children}</code></pre>
    </div>
  );
}
