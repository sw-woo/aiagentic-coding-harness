import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

/**
 * 사이트 sitemap.
 * - /manifesto 와 그 하위는 robots noindex 이므로 sitemap 에서 제외합니다.
 * - 카탈로그 동적 라우트와 단순 정적 페이지를 한 번에 나열합니다.
 */

const STATIC_PATHS = [
  "/",
  "/handbook",
  "/guide",
  "/architecture/overview",
  "/architecture/claude-vs-codex",
  "/playbook/setup-claude-code",
  "/playbook/setup-codex",
  "/methodology/codex-best-practices",
  "/catalog/skills",
  "/catalog/agents",
  "/catalog/hooks",
  "/catalog/rules",
  "/reference",
  "/reference/claude-code-official",
  "/reference/codex-official",
  "/reference/codex-adoption",
  "/reference/codex-hooks",
  "/reference/profiles-subagents",
  "/reference/ultraplan",
  "/reference/zero-trust-plugins",
  "/reference/agent-sandboxing",
  "/reference/token-economics",
  "/reference/security-guardrails",
  "/reference/mcp-landscape",
  "/reference/automation-patterns",
  "/reference/debugging-playbook",
  "/reference/metrics-observability",
  "/reference/trends-direction",
  "/reference/progress-adoption",
  "/reference/open-source-stack",
  "/reference/paper-to-code",
  "/reference/harness-100",
  "/reference/revfactory-harness",
] as const;

const METHODOLOGY_SLUGS = [
  "karpathy",
  "ralph-loop",
  "eval-driven",
  "context-engineering",
  "vibe-coding",
  "multi-agent",
  "self-improving",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const base = siteConfig.url.replace(/\/$/, "");

  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: `${base}${path}`,
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));

  const methodologyEntries: MetadataRoute.Sitemap = METHODOLOGY_SLUGS.map((slug) => ({
    url: `${base}/methodology/${slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticEntries, ...methodologyEntries];
}
