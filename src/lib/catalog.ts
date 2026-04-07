/**
 * 카탈로그 데이터 로더
 * data/catalog/*.json 은 kotlin-codex 인벤토리에서 자동 생성된 사실 기반 데이터입니다.
 * 빌드 시점에 정적으로 import 되며, 런타임 fetch 가 일어나지 않습니다.
 */
import skillsRaw from "../../data/catalog/skills.json";
import agentsRaw from "../../data/catalog/agents.json";
import hooksRaw from "../../data/catalog/hooks.json";
import rulesRaw from "../../data/catalog/rules.json";
import permissionsRaw from "../../data/catalog/permissions.json";

export type Platform = "claude-code" | "codex";

export type CatalogMeta = {
  source: string;
  sourceUrl: string;
  generatedAt: string;
};

export type SkillItem = {
  id: string;
  name: string;
  platform: Platform;
  path: string;
  description: string;
  firstParagraph?: string;
  tools?: string[];
  model?: string | null;
};

export type AgentItem = {
  id: string;
  name: string;
  platform: Platform;
  path: string;
  description: string;
  model?: string | null;
  effort?: string | null;
  sandboxMode?: string | null;
  firstParagraph?: string;
};

export type HookItem = {
  id: string;
  name: string;
  platform: Platform;
  path: string;
  event: string;
  matcher: string;
  command: string;
  scriptPath?: string;
  statusMessage?: string;
};

export type RuleItem = {
  id: string;
  name: string;
  platform: Platform;
  path: string;
  pattern?: string;
  decision: "allow" | "ask" | "deny" | "prompt" | "forbidden";
  category?: string;
  content?: string;
  source?: string;
};

export type PermissionItem = {
  id: string;
  decision: "allow" | "ask" | "deny";
  pattern: string;
  platform: Platform;
};

type RawCatalog<T> = {
  source: string;
  sourceUrl: string;
  generatedAt: string;
  items: T[];
};

const skills = skillsRaw as RawCatalog<SkillItem>;
const agents = agentsRaw as RawCatalog<AgentItem>;
const hooks = hooksRaw as RawCatalog<HookItem>;
const rules = rulesRaw as RawCatalog<RuleItem>;
const permissions = permissionsRaw as RawCatalog<PermissionItem>;

export const catalog = {
  meta: {
    source: skills.source,
    sourceUrl: skills.sourceUrl,
    generatedAt: skills.generatedAt,
  },
  skills: skills.items,
  agents: agents.items,
  hooks: hooks.items,
  rules: rules.items,
  permissions: permissions.items,
} as const;

export const catalogTypes = ["skills", "agents", "hooks", "rules"] as const;
export type CatalogType = (typeof catalogTypes)[number];

export const catalogTypeLabels: Record<CatalogType, string> = {
  skills: "스킬",
  agents: "서브에이전트",
  hooks: "훅",
  rules: "규칙",
};

export const catalogTypeDescriptions: Record<CatalogType, string> = {
  skills:
    "재사용 가능한 워크플로 스킬 목록입니다. /review, /test-all 같은 슬래시 명령부터 자동 활성화 스킬까지 모두 포함합니다.",
  agents:
    "전문 역할을 좁게 가진 서브에이전트 목록입니다. 리뷰, 검증, 문서 확인 같은 병렬 가능한 작업을 격리된 컨텍스트에서 수행합니다.",
  hooks:
    "세션 시작, 도구 실행 전후 같은 라이프사이클 이벤트에서 동작하는 훅 목록입니다. 위험 명령 차단·자동 lint·세션 컨텍스트 주입 등 마지막 방어선 역할을 합니다.",
  rules:
    "에이전트가 무엇을 편집·실행·승인 요청해야 하는지를 선언적으로 정의한 정책 모음입니다. 경로별 규칙과 execpolicy 규칙이 모두 포함됩니다.",
};

export function platformLabel(platform: Platform): string {
  return platform === "claude-code" ? "Claude Code" : "Codex";
}

export function decisionLabel(decision: RuleItem["decision"]): string {
  switch (decision) {
    case "allow":
      return "허용";
    case "ask":
    case "prompt":
      return "확인 후 실행";
    case "deny":
    case "forbidden":
      return "차단";
    default:
      return decision;
  }
}

export function decisionTone(decision: RuleItem["decision"]): "success" | "warn" | "danger" {
  switch (decision) {
    case "allow":
      return "success";
    case "ask":
    case "prompt":
      return "warn";
    case "deny":
    case "forbidden":
      return "danger";
    default:
      return "warn";
  }
}
