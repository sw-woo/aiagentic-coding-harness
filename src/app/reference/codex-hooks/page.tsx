import type { Metadata } from "next";
import Link from "next/link";
import {
  Prose,
  ProseEyebrow,
  ProseHeading,
  ProseParagraph,
} from "@/components/content/prose";
import { CodeBlock } from "@/components/content/code-block";
import { Callout } from "@/components/content/callout";

const SOURCE_LINKS = [
  { label: "OpenAI Codex Hooks", href: "https://developers.openai.com/codex/hooks" },
  { label: "OpenAI Config Advanced", href: "https://developers.openai.com/codex/config-advanced" },
  { label: "OpenAI Config Reference", href: "https://developers.openai.com/codex/config-reference" },
  { label: "OpenAI Sandboxing", href: "https://developers.openai.com/codex/sandboxing" },
] as const;

export const metadata: Metadata = {
  title: "Codex Hooks 심화 가이드",
  description:
    "OpenAI Codex hooks를 실제 저장소 하네스 관점에서 설명하는 상세 가이드입니다. 위치, 이벤트, JSON payload, guardrail 예시, 디버깅 포인트까지 정리합니다.",
};

export default function CodexHooksReferencePage() {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose size="wide">
        <ProseEyebrow>참고자료 · Codex Hooks</ProseEyebrow>
        <ProseHeading level={1}>Codex Hooks 심화 가이드</ProseHeading>
        <ProseParagraph>
          이 페이지는 OpenAI Codex의 hooks를 “기능 소개” 수준이 아니라, 실제 저장소 하네스의 동적 guardrail 로 쓰는 관점에서 정리한 문서입니다.
          Claude Code 마스터 같은 사이트가 가진 장점은 훅을 실제 예시와 운영 습관까지 이어서 설명한다는 점인데,
          그 형식을 참고하되 내용은 Codex 공식 문서와 실제 저장소 운영 관점에 맞춰 재구성했습니다.
        </ProseParagraph>

        <Callout tone="note" title="핵심 요약">
          <p>
            Hooks는 sandbox나 rules를 대체하는 보안 경계가 아닙니다. Hooks는 <strong>동적 guardrail</strong> 입니다.
            즉, 세션 시작 시 문맥을 넣고, 위험한 bash를 더 빨리 막고, 수정 직후 자동 검증을 돌리는 데 쓰는 것이 가장 효과적입니다.
          </p>
        </Callout>

        <ProseHeading level={2}>1. 왜 Hooks가 중요한가</ProseHeading>
        <ProseParagraph>
          AGENTS.md 와 rules는 정적인 문서입니다. 하지만 실제 작업은 동적입니다. 어떤 파일이 바뀌었는지, 어떤 bash 명령이 막 실행되려는지,
          수정 직후 어떤 검증을 돌려야 하는지는 실행 시점에 결정됩니다. 이때 hooks가 들어갑니다. 좋은 하네스는
          “규칙을 적어 두는 것” 에서 끝나지 않고, “실행 순간에 필요한 guardrail을 거는 것” 까지 내려옵니다.
        </ProseParagraph>

        <ProseHeading level={2}>2. 공식 문서 기준으로 확인되는 것</ProseHeading>
        <ul className="mt-5 list-disc space-y-2 pl-6 text-[17px] leading-8 text-foreground">
          <li>hooks는 현재 Codex 문서에서 실험 기능으로 설명됩니다.</li>
          <li>활성 config 레이어 옆의 <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">hooks.json</code> 을 사용합니다.</li>
          <li>프로젝트 루트에서는 보통 <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">.codex/hooks.json</code> 과 <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">.codex/hooks/</code> 조합을 씁니다.</li>
          <li>실제 동작은 <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">[features] codex_hooks = true</code> 와 함께 보는 것이 안전합니다.</li>
        </ul>
        <div className="mt-6 flex flex-wrap gap-3">
          {SOURCE_LINKS.map((source) => (
            <a key={source.href} href={source.href} target="_blank" rel="noreferrer" className="text-sm text-accent hover:underline">
              {source.label} ↗
            </a>
          ))}
        </div>

        <ProseHeading level={2}>3. 파일 위치와 기본 구조</ProseHeading>
        <ProseParagraph>
          실전에서는 아래 구조를 추천합니다. 설정 파일과 실제 스크립트를 분리해 두면 나중에 테스트와 디버깅이 쉬워집니다.
        </ProseParagraph>
        <CodeBlock filename=".codex/hooks 구조" language="text">
{`.codex/
├── config.toml
├── hooks.json
└── hooks/
    ├── session_start_context.py
    ├── pre_bash_guard.py
    └── post_kt_lint.sh`}
        </CodeBlock>

        <CodeBlock filename=".codex/hooks.json" language="json">
{`{
  "hooks": {
    "SessionStart": [
      {
        "command": "/usr/bin/python3 $(git rev-parse --show-toplevel)/.codex/hooks/session_start_context.py"
      }
    ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "command": "/usr/bin/python3 $(git rev-parse --show-toplevel)/.codex/hooks/pre_bash_guard.py"
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Write|Edit|MultiEdit|ApplyPatch",
        "command": "bash $(git rev-parse --show-toplevel)/.codex/hooks/post_kt_lint.sh"
      }
    ]
  }
}`}
        </CodeBlock>

        <ProseHeading level={2}>4. 어떤 이벤트에 무엇을 붙여야 하나</ProseHeading>
        <div className="mt-6 overflow-x-auto rounded-xl border border-border">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="bg-surface">
              <tr>
                <th className="border-b border-border px-4 py-3 font-mono text-xs uppercase tracking-wide text-foreground-muted">이벤트</th>
                <th className="border-b border-border px-4 py-3 font-mono text-xs uppercase tracking-wide text-foreground-muted">추천 역할</th>
                <th className="border-b border-border px-4 py-3 font-mono text-xs uppercase tracking-wide text-foreground-muted">예시</th>
              </tr>
            </thead>
            <tbody>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3 font-medium text-foreground">SessionStart</td>
                <td className="border-b border-border px-4 py-3 text-foreground-muted">문맥 주입</td>
                <td className="border-b border-border px-4 py-3 text-foreground-muted">현재 저장소 상태, 표준 검증 명령, 위험 구역, 읽어야 할 문서를 짧게 출력</td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3 font-medium text-foreground">PreToolUse</td>
                <td className="border-b border-border px-4 py-3 text-foreground-muted">빠른 차단 / 경고</td>
                <td className="border-b border-border px-4 py-3 text-foreground-muted">rm -rf, terraform destroy, kubectl delete, git push --force 같은 명령 차단</td>
              </tr>
              <tr className="align-top">
                <td className="border-b border-border px-4 py-3 font-medium text-foreground">PostToolUse</td>
                <td className="border-b border-border px-4 py-3 text-foreground-muted">자동 포맷 / 자동 검증</td>
                <td className="border-b border-border px-4 py-3 text-foreground-muted">Kotlin 파일 수정 후 ktlintCheck, TypeScript 수정 후 tsc, formatting 등</td>
              </tr>
            </tbody>
          </table>
        </div>

        <ProseHeading level={2}>5. Codex 쪽에서 중요한 차이: payload는 stdin JSON 입니다</ProseHeading>
        <ProseParagraph>
          이 부분이 Claude 스타일 문서와 가장 많이 달라지는 지점입니다. Codex 쪽 훅은 실제로 stdin JSON payload를 읽는 구조로 생각하는 편이 안전합니다.
          그래서 shell script나 Python 훅에서 <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">tool_input.file_path</code> 나
          <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">tool_input.path</code> 를 직접 파싱하는 식으로 짜는 편이 견고합니다.
        </ProseParagraph>
        <CodeBlock filename="PostToolUse payload 예시" language="json">
{`{
  "tool": "Edit",
  "tool_input": {
    "file_path": "aiops-api/src/main/kotlin/com/example/Routes.kt"
  }
}`}
        </CodeBlock>

        <ProseHeading level={2}>6. 파일 타입별 PostToolUse를 먼저 설계합니다</ProseHeading>
        <ProseParagraph>
          일반적으로는 “모든 수정 후 전체 테스트”보다 “수정된 파일 타입에 맞춘 빠른 검증”이 더 중요합니다.
          Kotlin 파일이 바뀌었을 때만 <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">ktlintCheck</code> 를 자동으로 돌리면
          피드백 속도와 안전성이 모두 좋아집니다.
        </ProseParagraph>
        <CodeBlock filename=".codex/hooks/post_kt_lint.sh" language="bash">
{`#!/usr/bin/env bash
set -euo pipefail

PAYLOAD="$(cat)"
ROOT="$(git rev-parse --show-toplevel)"
FILE_PATH="$(printf '%s' "$PAYLOAD" | jq -r '.tool_input.file_path // .tool_input.path // empty')"

if [[ -z "$FILE_PATH" || "$FILE_PATH" != *.kt ]]; then
  exit 0
fi

source ~/.zshrc >/dev/null 2>&1 || true
export GRADLE_USER_HOME="$ROOT/.gradle-user"
cd "$ROOT"
./gradlew ktlintCheck --no-daemon`}
        </CodeBlock>

        <ProseHeading level={2}>7. PreToolUse는 &apos;완벽한 방어벽&apos;이 아니라 &apos;빠른 1차 차단기&apos;로 씁니다</ProseHeading>
        <ProseParagraph>
          Hooks는 rules와 sandbox보다 앞서가는 보조 장치입니다. 즉, PreToolUse 하나만 믿고 운영 명령 방어를 끝내면 안 됩니다.
          가장 좋은 조합은 <strong>Rules로 선언형 금지</strong>, <strong>PreToolUse로 빠른 차단과 경고</strong> 입니다.
        </ProseParagraph>
        <CodeBlock filename=".codex/hooks/pre_bash_guard.py" language="python">
{`import json
import re
import sys

payload = json.load(sys.stdin)
command = payload.get("tool_input", {}).get("command", "")

blocked = [
    r"git\\s+reset\\s+--hard",
    r"rm\\s+-rf",
    r"terraform\\s+destroy",
    r"kubectl\\s+delete",
    r"helm\\s+uninstall",
]

for pattern in blocked:
    if re.search(pattern, command):
        print("BLOCK: 위험한 명령이므로 실행할 수 없습니다.")
        sys.exit(0)

sys.exit(0)`}
        </CodeBlock>

        <ProseHeading level={2}>8. 실무에서 자주 쓰는 훅 패턴</ProseHeading>
        <ul className="mt-5 list-disc space-y-2 pl-6 text-[17px] leading-8 text-foreground">
          <li>SessionStart: 현재 브랜치, 표준 검증 명령, 금지된 운영 명령, 읽어야 할 handoff 문서를 주입</li>
          <li>PreToolUse: git push, kubectl apply, terraform destroy, rm -rf, secrets 관련 명령 차단 또는 경고</li>
          <li>PostToolUse: Kotlin 파일 수정 후 ktlintCheck, TypeScript 수정 후 typecheck, Python 수정 후 targeted test</li>
          <li>Stop 성격의 최종 검증은 Codex hooks만으로 해결하려 하기보다 verify script와 CI에 넘기는 편이 안전</li>
        </ul>

        <Callout tone="warning" title="이렇게 쓰면 안 됩니다">
          <p>모든 PostToolUse에서 무거운 전체 테스트를 돌리는 것.</p>
          <p>hook 하나만으로 운영 안전을 다 해결하려는 것.</p>
          <p>외부 네트워크나 인터랙티브 셸 초기화에 깊게 의존하는 것.</p>
          <p>hook가 다시 다른 도구를 호출해 무한 루프가 생기게 만드는 것.</p>
        </Callout>

        <ProseHeading level={2}>9. 디버깅 포인트</ProseHeading>
        <ProseParagraph>
          훅이 안 도는 것처럼 보일 때는 대부분 네 가지 중 하나입니다. <code className="rounded bg-surface-2 px-1 py-0.5 font-mono text-sm">codex_hooks</code> 기능이 안 켜졌거나,
          hooks.json 위치가 다르거나, matcher가 실제 이벤트와 안 맞거나, payload 파싱이 파일 경로를 못 읽는 경우입니다.
        </ProseParagraph>
        <CodeBlock filename="디버깅 순서" language="text">
{`1. .codex/config.toml 에 [features] codex_hooks = true 확인
2. .codex/hooks.json 경로와 JSON 문법 확인
3. matcher 값이 실제 tool 이름과 맞는지 확인
4. stdin payload를 로그로 찍어 tool_input 구조 확인
5. hook 스크립트를 독립 실행으로 먼저 smoke test
6. 무거운 검증은 hook가 아니라 verify script로 내리기`}
        </CodeBlock>

        <ProseHeading level={2}>10. 이 페이지를 어디와 같이 읽어야 하나</ProseHeading>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <Link href="/playbook/setup-codex" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">Codex 심화 플레이북</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              hooks를 포함한 전체 하네스 구조와 rollout 순서를 함께 봅니다.
            </p>
          </Link>
          <Link href="/reference/codex-official" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">Codex 공식 자료 맵</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              hooks 외에 config, sandbox, subagents, models 문서를 한 번에 따라갑니다.
            </p>
          </Link>
          <Link href="/handbook" className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent">
            <h3 className="text-lg font-semibold text-foreground">핸드북</h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              hooks를 하네스 엔지니어링 전체 그림 안에서 해석하는 장문 페이지입니다.
            </p>
          </Link>
        </div>
      </Prose>
    </div>
  );
}
