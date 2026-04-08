/**
 * 인기 GitHub agentic coding 하네스 레포 TOP 10 (2026-04-08 GitHub Public API 기준).
 *
 * 모든 stars / forks / pushed_at 값은 https://api.github.com/repos/<owner>/<name> 에서
 * 직접 받은 값입니다. 마케팅성 블로그 글에 인용된 수치는 사용하지 않았습니다.
 *
 * 다음에 한 번 더 갱신하실 때는 다음 명령으로 한 번에 검증하실 수 있습니다.
 *
 *   for r in $(jq -r '.[].repo' src/data/popular-harness-repos.json); do
 *     curl -s "https://api.github.com/repos/$r" | jq '.stargazers_count'
 *   done
 */

export type PopularHarnessRepo = {
  /** owner/name 표기 */
  repo: string;
  /** 정식 GitHub URL */
  url: string;
  /** 카드 제목으로 쓸 한국어 친화 이름 */
  title: string;
  /** 한 줄 카테고리 라벨 */
  category: string;
  /** 짧은 한국어 존댓말 설명 */
  summary: string;
  /** GitHub stargazers_count (검증 시점) */
  stars: number;
  /** SPDX license 식별자 또는 표기 */
  license: string;
  /** YYYY-MM-DD pushed_at */
  lastPushed: string;
  /** 어떤 도구에서 쓸 수 있는지 */
  worksWith: readonly string[];
  /** "바로 적용" 가이드 - 짧은 설치/적용 안내 */
  applyGuide: {
    command?: string;
    note: string;
  };
};

export const popularHarnessRepos: readonly PopularHarnessRepo[] = [
  {
    repo: "affaan-m/everything-claude-code",
    url: "https://github.com/affaan-m/everything-claude-code",
    title: "Everything Claude Code (ECC)",
    category: "멀티도구 하네스 시스템",
    summary:
      "Claude Code, Codex, OpenCode, Cursor 까지 한 저장소에서 같이 쓰는 하네스 최적화 시스템입니다. 30+ 전문 에이전트, 100+ 스킬, 슬래시 명령, hook 워크플로를 한 묶음으로 제공합니다.",
    stars: 145224,
    license: "MIT",
    lastPushed: "2026-04-07",
    worksWith: ["Claude Code", "Codex", "OpenCode", "Cursor"],
    applyGuide: {
      command: "git clone https://github.com/affaan-m/everything-claude-code.git",
      note: "저장소의 README 의 selective-install 가이드를 따라 필요한 스킬·에이전트만 골라 설치하실 수 있습니다. 한 번에 다 넣지 마시고 단계적으로 추가하시는 편이 안전합니다.",
    },
  },
  {
    repo: "obra/superpowers",
    url: "https://github.com/obra/superpowers",
    title: "Superpowers (obra)",
    category: "스킬 프레임워크 + 개발 방법론",
    summary:
      "Jesse Vincent (obra) 가 만든 agentic skills framework 입니다. 2026년 1월 Anthropic 공식 plugin marketplace 에 등재됐고, TDD, 체계적 디버깅, brainstorming, subagent-driven development 같은 20+ 스킬을 제공합니다.",
    stars: 139792,
    license: "MIT",
    lastPushed: "2026-04-06",
    worksWith: ["Claude Code (네이티브)", "Codex (수동)", "OpenCode (수동)"],
    applyGuide: {
      command:
        "/plugin marketplace add obra/superpowers-marketplace\n/plugin install superpowers@superpowers-marketplace",
      note: "Claude Code 2.0.13 이상에서 위 두 줄을 슬래시 명령으로 실행하시면 됩니다. Codex · OpenCode 에서는 README 의 수동 셋업 절차를 따라가시면 됩니다.",
    },
  },
  {
    repo: "anthropics/claude-code",
    url: "https://github.com/anthropics/claude-code",
    title: "Anthropic Claude Code (공식 CLI)",
    category: "공식 CLI",
    summary:
      "Anthropic 이 공식적으로 배포하는 Claude Code CLI 의 본 저장소입니다. 메모리, 스킬, 서브에이전트, 훅, 권한, 플러그인 마켓의 모든 사양이 여기서 출발합니다.",
    stars: 110752,
    license: "Anthropic 라이선스",
    lastPushed: "2026-04-08",
    worksWith: ["Claude Code"],
    applyGuide: {
      note: "공식 설치 절차는 docs.anthropic.com/en/docs/claude-code 의 Getting Started 페이지를 따라가시면 됩니다. README 의 빠른 시작을 먼저 실행하시는 편이 가장 안전합니다.",
    },
  },
  {
    repo: "openai/codex",
    url: "https://github.com/openai/codex",
    title: "OpenAI Codex CLI (공식)",
    category: "공식 CLI",
    summary:
      "OpenAI 가 Rust 로 만든 공식 Codex CLI 의 본 저장소입니다. config.toml, profiles, subagents, hooks, MCP 설정의 표준이 여기에서 정의됩니다.",
    stars: 73774,
    license: "Apache-2.0",
    lastPushed: "2026-04-08",
    worksWith: ["Codex"],
    applyGuide: {
      note: "공식 설치 절차는 developers.openai.com/codex/cli 와 README 의 Getting Started 를 따라가시면 됩니다. Homebrew, npm, 직접 빌드 세 가지 경로가 모두 README 에 설명돼 있습니다.",
    },
  },
  {
    repo: "hesreallyhim/awesome-claude-code",
    url: "https://github.com/hesreallyhim/awesome-claude-code",
    title: "Awesome Claude Code (큐레이션)",
    category: "큐레이션 리스트",
    summary:
      "스킬, hooks, 슬래시 명령, 서브에이전트 오케스트레이터, 애플리케이션, 플러그인을 모은 정전급 큐레이션 리스트입니다. 사람은 추천만 하고 PR 은 Claude 만 받는 독특한 운영 방식으로도 유명합니다.",
    stars: 37308,
    license: "MIT (NOASSERTION)",
    lastPushed: "2026-04-08",
    worksWith: ["Claude Code"],
    applyGuide: {
      note: "리스트 자체는 git clone 이 아니라 브라우저로 열고 카테고리별로 필요한 항목만 자기 저장소로 옮기시는 편이 일반적입니다. 한 번 훑어 보시고 자기 팀에 맞는 5~10개만 골라 시작하시면 됩니다.",
    },
  },
  {
    repo: "wshobson/agents",
    url: "https://github.com/wshobson/agents",
    title: "wshobson/agents",
    category: "프로덕션 에이전트 + 스킬 묶음",
    summary:
      "182개의 전문 에이전트, 16개의 멀티 에이전트 워크플로 오케스트레이터, 147개의 agent skills, 95개 슬래시 명령을 75개 plugin 으로 정리한 production-ready 묶음입니다.",
    stars: 33145,
    license: "MIT",
    lastPushed: "2026-04-03",
    worksWith: ["Claude Code"],
    applyGuide: {
      command: "git clone https://github.com/wshobson/agents.git",
      note: "README 의 plugin 별 설치 절차를 보시고, 자기 저장소의 .claude/ 디렉터리에 필요한 plugin 만 골라 복사하시면 됩니다.",
    },
  },
  {
    repo: "Yeachan-Heo/oh-my-claudecode",
    url: "https://github.com/Yeachan-Heo/oh-my-claudecode",
    title: "oh-my-claudecode (Yeachan)",
    category: "Teams-first 멀티 에이전트 오케스트레이션",
    summary:
      "Claude Code 위에 얹는 Teams 중심 오케스트레이션 레이어입니다. v4.4.0 부터 Codex · Gemini 도 MCP 서버가 아니라 tmux CLI worker 방식으로 호출하는 형태로 진화했습니다. 한국 사용자가 만든 대표적인 오픈 하네스입니다.",
    stars: 25861,
    license: "MIT",
    lastPushed: "2026-04-08",
    worksWith: ["Claude Code (메인)", "Codex (worker)", "Gemini (worker)"],
    applyGuide: {
      command:
        "/plugin marketplace add https://github.com/Yeachan-Heo/oh-my-claudecode\n/plugin install oh-my-claudecode\n/omc-setup",
      note: "현재 README 기준 기본 진입은 저장소 clone 이 아니라 Claude Code 안에서 plugin 설치 후 /omc-setup 을 다시 실행하는 방식입니다. native Team 은 settings.json 에 agent teams 활성화가 필요하고, `omc team` 으로 Codex · Gemini worker 를 쓰려면 tmux 와 해당 CLI 가 설치돼 있어야 합니다.",
    },
  },
  {
    repo: "Yeachan-Heo/oh-my-codex",
    url: "https://github.com/Yeachan-Heo/oh-my-codex",
    title: "oh-my-codex (OmX)",
    category: "Codex 확장 (hooks, teams, HUDs)",
    summary:
      "OpenAI Codex CLI 위에 얹는 workflow layer 입니다. native Codex hooks, teams runtime, sparkshell · explore 같은 보조 표면을 제공합니다. oh-my-claudecode 와 짝을 이루는 한국 사용자 발 오픈 하네스입니다.",
    stars: 18457,
    license: "오픈소스 (라이선스 미표기)",
    lastPushed: "2026-04-08",
    worksWith: ["Codex"],
    applyGuide: {
      command: "git clone https://github.com/Yeachan-Heo/oh-my-codex.git",
      note: "README 의 .omx/ 디렉터리 셋업 절차를 따라가시면 됩니다. 기존 .codex/ 와 충돌하지 않도록 별도 디렉터리에 두는 구조입니다.",
    },
  },
  {
    repo: "VoltAgent/awesome-claude-code-subagents",
    url: "https://github.com/VoltAgent/awesome-claude-code-subagents",
    title: "Awesome Claude Code Subagents (VoltAgent)",
    category: "100+ 전문 subagents",
    summary:
      "언어별 전문가, 인프라, 테스팅, 보안, AI · ML 등 카테고리로 정리한 100개 이상의 Claude Code 서브에이전트 컬렉션입니다. 카테고리별로 필요한 것만 골라 가져가실 수 있습니다.",
    stars: 16634,
    license: "MIT",
    lastPushed: "2026-04-01",
    worksWith: ["Claude Code"],
    applyGuide: {
      command: "git clone https://github.com/VoltAgent/awesome-claude-code-subagents.git",
      note: "agents/ 폴더에서 필요한 subagent 의 .md 파일을 자기 저장소의 .claude/agents/ 에 복사하시면 즉시 사용 가능합니다.",
    },
  },
  {
    repo: "anthropics/claude-plugins-official",
    url: "https://github.com/anthropics/claude-plugins-official",
    title: "Anthropic 공식 plugin marketplace",
    category: "공식 plugin marketplace",
    summary:
      "Anthropic 이 직접 운영하는 Claude Code plugin marketplace 의 본 저장소입니다. 어떤 plugin 이 공식으로 인정받았는지 확인하실 수 있고, marketplace.json 에 모든 등재 plugin 의 메타데이터가 있습니다.",
    stars: 16290,
    license: "Anthropic 운영",
    lastPushed: "2026-04-08",
    worksWith: ["Claude Code"],
    applyGuide: {
      command: "/plugin marketplace add anthropics/claude-plugins-official",
      note: "Claude Code 안에서 위 슬래시 명령으로 마켓플레이스를 추가하시면, 그 다음부터 /plugin install <name> 으로 개별 plugin 을 설치하실 수 있습니다.",
    },
  },
];
