import fs from "node:fs";
import path from "node:path";
import type { Platform, CatalogType } from "@/lib/catalog";

export type LocalStarterItem = {
  id: string;
  name: string;
  platform: Platform;
  path: string;
  description: string;
  content: string;
};

const ROOT = process.cwd();

function read(relPath: string): string {
  return fs.readFileSync(path.join(ROOT, relPath), "utf-8");
}

const STARTERS: Record<CatalogType, LocalStarterItem[]> = {
  skills: [
    {
      id: "starter-codex-review-skill",
      name: "review",
      platform: "codex",
      path: ".agents/skills/review/SKILL.md",
      description: "문서/페이지 변경을 검토하는 최소 Codex skill starter",
      content: read(".agents/skills/review/SKILL.md"),
    },
    {
      id: "starter-codex-verify-skill",
      name: "verify",
      platform: "codex",
      path: ".agents/skills/verify/SKILL.md",
      description: "변경 후 최소 검증 절차를 정리한 Codex skill starter",
      content: read(".agents/skills/verify/SKILL.md"),
    },
    {
      id: "starter-claude-review-skill",
      name: "review",
      platform: "claude-code",
      path: ".claude/skills/review/SKILL.md",
      description: "읽기 전용 변경 검토용 Claude skill starter",
      content: read(".claude/skills/review/SKILL.md"),
    },
  ],
  agents: [
    {
      id: "starter-codex-reviewer-agent",
      name: "reviewer",
      platform: "codex",
      path: ".codex/agents/reviewer.toml",
      description: "읽기 전용 reviewer Codex subagent starter",
      content: read(".codex/agents/reviewer.toml"),
    },
    {
      id: "starter-codex-verifier-agent",
      name: "verifier",
      platform: "codex",
      path: ".codex/agents/verifier.toml",
      description: "검증 전용 Codex subagent starter",
      content: read(".codex/agents/verifier.toml"),
    },
    {
      id: "starter-claude-content-reviewer-agent",
      name: "content-reviewer",
      platform: "claude-code",
      path: ".claude/agents/content-reviewer.md",
      description: "문서/가독성 검토용 Claude agent starter",
      content: read(".claude/agents/content-reviewer.md"),
    },
  ],
  hooks: [
    {
      id: "starter-codex-hooks-config",
      name: "codex hooks.json",
      platform: "codex",
      path: ".codex/hooks.json",
      description: "SessionStart / PreToolUse 최소 Codex hooks starter",
      content: read(".codex/hooks.json"),
    },
    {
      id: "starter-codex-pre-bash-guard",
      name: "pre_bash_guard.py",
      platform: "codex",
      path: ".codex/hooks/pre_bash_guard.py",
      description: "위험한 bash 차단용 Codex hook script starter",
      content: read(".codex/hooks/pre_bash_guard.py"),
    },
    {
      id: "starter-claude-settings-json",
      name: "settings.json",
      platform: "claude-code",
      path: ".claude/settings.json",
      description: "permissions + hooks를 함께 포함한 Claude starter",
      content: read(".claude/settings.json"),
    },
  ],
  rules: [
    {
      id: "starter-codex-default-rules",
      name: "default.rules",
      platform: "codex",
      path: ".codex/rules/default.rules",
      description: "forbidden / prompt 중심의 최소 Codex rules starter",
      content: read(".codex/rules/default.rules"),
    },
    {
      id: "starter-claude-security-rule",
      name: "security.md",
      platform: "claude-code",
      path: ".claude/rules/security.md",
      description: "보안과 위험 명령 규칙을 담은 Claude rule starter",
      content: read(".claude/rules/security.md"),
    },
  ],
};

export function getLocalStarterItems(type: CatalogType): LocalStarterItem[] {
  return STARTERS[type];
}
