export type SiteDocLink = {
  href: string;
  title: string;
  description: string;
};

export const siteDocLinks = {
  guide: {
    href: "/guide",
    title: "가이드",
    description:
      "이 사이트를 어떤 순서로 읽어야 하는지, 각 페이지가 무슨 역할인지 자세히 설명합니다.",
  },
  handbook: {
    href: "/handbook",
    title: "핸드북",
    description:
      "agentic coding harness 엔지니어링 전체 큰그림을 과거·현재·미래 흐름으로 읽는 중심 페이지입니다.",
  },
  methodology: {
    href: "/methodology/karpathy",
    title: "방법론",
    description:
      "Karpathy, Ralph, eval-driven, context engineering 등 큰그림의 일부를 더 깊게 파는 방법론 층입니다.",
  },
  architecture: {
    href: "/architecture/overview",
    title: "아키텍처",
    description:
      "memory, skills, subagents, rules, hooks 가 어떻게 맞물려 하네스를 이루는지 시각적으로 보여주는 층입니다.",
  },
  catalog: {
    href: "/catalog/skills",
    title: "카탈로그",
    description:
      "실제 파일 경로와 설명을 따라가며 지금 저장소에 있는 skill, agent, hook, rule 을 확인하는 층입니다.",
  },
  playbook: {
    href: "/playbook/setup-codex",
    title: "플레이북",
    description:
      "새 저장소에 하네스를 심거나, 현재 저장소를 운영 가능한 설정으로 끌어올리는 실전 가이드 층입니다.",
  },
  reference: {
    href: "/reference",
    title: "참고자료",
    description:
      "공식 문서, 운영 심화 문서, 외부 원전을 목적별로 묶어 둔 인덱스입니다.",
  },
} as const;

export const topNavLinks = [
  siteDocLinks.guide,
  siteDocLinks.handbook,
  siteDocLinks.methodology,
  siteDocLinks.architecture,
  siteDocLinks.catalog,
  siteDocLinks.playbook,
  siteDocLinks.reference,
] as const;
