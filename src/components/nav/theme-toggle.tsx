"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

/**
 * 다크/라이트 테마 토글 버튼입니다.
 * 마운트 전에는 SSR 불일치를 피하기 위해 placeholder 만 렌더링합니다.
 */
export function ThemeToggle() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const current = theme === "system" ? resolvedTheme : theme;
  const isDark = current !== "light";

  return (
    <button
      type="button"
      aria-label="테마 전환"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-foreground-muted transition hover:border-accent hover:text-foreground"
    >
      {mounted ? (
        isDark ? (
          <Sun className="h-4 w-4" />
        ) : (
          <Moon className="h-4 w-4" />
        )
      ) : (
        <span className="block h-4 w-4" />
      )}
    </button>
  );
}
