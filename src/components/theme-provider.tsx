"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * 라이트/다크 테마 프로바이더입니다.
 * - 기본값은 다크입니다.
 * - 시스템 설정을 따를 수 있고, 사용자가 토글로 강제 전환할 수도 있습니다.
 */
export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
