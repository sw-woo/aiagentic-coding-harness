import type { Metadata } from "next";
import Link from "next/link";
import {
  Prose,
  ProseEyebrow,
  ProseHeading,
  ProseParagraph,
} from "@/components/content/prose";
import { Callout } from "@/components/content/callout";
import { CodeBlock } from "@/components/content/code-block";

const SOURCE_LINKS = [
  {
    label: "Vercel Sandbox 문서",
    href: "https://vercel.com/docs/sandbox",
  },
  {
    label: "@vercel/sandbox npm",
    href: "https://www.npmjs.com/package/@vercel/sandbox",
  },
  {
    label: "laverdet/isolated-vm GitHub",
    href: "https://github.com/laverdet/isolated-vm",
  },
  {
    label: "gVisor 공식 문서",
    href: "https://gvisor.dev/docs/",
  },
  {
    label: "E2B 공식 문서",
    href: "https://e2b.dev/docs",
  },
] as const;

type Row = {
  solution: string;
  isolation: string;
  startup: string;
  language: string;
  cost: string;
  whenToUse: string;
};

const COMPARISON_ROWS: Row[] = [
  {
    solution: "Vercel Sandbox",
    isolation: "Firecracker microVM (전용 커널 + 하드웨어 경계)",
    startup: "~ms (snapshot) · 콜드는 의존성 설치 시간",
    language: "Amazon Linux 2023 기반 Node.js 24/22, Python 3.13, 브라우저, Chromium",
    cost: "Vercel 요금제 기준 · 초 단위 VM time + 네트워크",
    whenToUse: "브라우저 자동화, 에이전트 실행 환경, AI 생성 코드 격리 테스트",
  },
  {
    solution: "isolated-vm",
    isolation: "V8 Isolate (in-process, isolate 별 heap 분리, 기본 128MB)",
    startup: "~0ms (같은 Node.js 프로세스 내)",
    language: "JavaScript / TypeScript 한정",
    cost: "오픈소스 · 자체 호스팅",
    whenToUse: "단일 함수 평가, 유저 제출 코드 실행, 가벼운 플러그인 격리",
  },
  {
    solution: "Docker 컨테이너",
    isolation: "namespace + cgroup (호스트 커널 공유)",
    startup: "~50ms",
    language: "모든 언어",
    cost: "자체 호스팅 기본 · 클라우드 컨테이너 서비스",
    whenToUse: "표준적인 격리 · CI 빌드 격리 · 중간 수준의 신뢰 환경",
  },
  {
    solution: "gVisor (runsc)",
    isolation: "user-space kernel (Sentry) + Gofer + seccomp",
    startup: "~50ms (Docker 수준)",
    language: "Linux 바이너리 모두 (언어 무관)",
    cost: "오픈소스, Google Cloud Run · GKE Sandbox 기본 제공",
    whenToUse: "컨테이너보다 강한 격리가 필요할 때 · 신뢰할 수 없는 코드 실행",
  },
  {
    solution: "E2B",
    isolation: "Firecracker microVM (내부적으로 gVisor · Firecracker 조합)",
    startup: "~1초 (pre-warmed template)",
    language: "Python · TypeScript SDK 중심, AI agent template 특화",
    cost: "SaaS 요금제 · 샌드박스 시간 단위",
    whenToUse: "AI 코드 인터프리터, 에이전트 도구 실행 전용 SaaS",
  },
];

const RELATED_PAGES = [
  {
    href: "/reference/zero-trust-plugins",
    title: "Zero Trust 플러그인 (우산 페이지)",
    description:
      "이 페이지의 sandbox 는 zero-trust 4계층 방어 중 두 번째 층입니다. 전체 그림을 먼저 보려면 여기로.",
  },
  {
    href: "/reference/security-guardrails",
    title: "하네스 보안과 가드레일 (기본)",
    description:
      "sandbox · rules · hooks · MCP governance 네 층을 기본 수준에서 소개하는 페이지입니다.",
  },
  {
    href: "/reference/mcp-landscape",
    title: "MCP 지형도",
    description:
      "외부 도구를 붙이는 MCP 생태계 현황과 주요 서버 목록입니다.",
  },
] as const;

export const metadata: Metadata = {
  title: "에이전트 샌드박싱 — 5가지 격리 솔루션 비교",
  description:
    "Vercel Sandbox, isolated-vm, Docker, gVisor, E2B 를 격리 수준·시작 시간·언어 지원·비용·사용 시나리오 기준으로 비교하고, 어떤 상황에 무엇을 쓸지 정리한 페이지입니다.",
};

export default function AgentSandboxingPage() {
  return (
    <div className="border-b border-border bg-background py-16 sm:py-24">
      <Prose size="wide">
        <ProseEyebrow>참고자료 · Sandboxing</ProseEyebrow>
        <ProseHeading level={1}>
          에이전트 샌드박싱 — 5가지 격리 솔루션 비교
        </ProseHeading>
        <ProseParagraph>
          에이전트가 생성하거나 외부 플러그인이 실행하는 코드는 메인 개발 환경과 직접 접촉하면
          안 됩니다. 이 페이지는 실무에서 자주 쓰이는 다섯 가지 격리 솔루션을 같은 축으로 비교하고,
          &ldquo;브라우저 자동화&rdquo; · &ldquo;단일 함수 평가&rdquo; · &ldquo;컨테이너 격리&rdquo; 같은 실제 시나리오에서 무엇을 고를지
          정리합니다.
        </ProseParagraph>

        <div className="mt-6 flex flex-wrap gap-3">
          {SOURCE_LINKS.map((source) => (
            <a
              key={source.href}
              href={source.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-accent hover:underline"
            >
              {source.label} ↗
            </a>
          ))}
        </div>

        <Callout tone="note" title="이 페이지의 위치">
          <p>
            샌드박싱은 <Link href="/reference/zero-trust-plugins" className="text-accent hover:underline">/reference/zero-trust-plugins</Link>{" "}
            의 4계층 방어 중 두 번째 층입니다. Allowlist 가 &ldquo;무엇을 설치할 수 있는가&rdquo;를 고정한다면,
            Sandbox 는 &ldquo;실행 시점에 무엇에 접근할 수 있는가&rdquo;를 고정합니다.
          </p>
        </Callout>

        <ProseHeading level={2}>1. 비교 표 — 한 장으로 보는 다섯 솔루션</ProseHeading>
        <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="bg-background">
              <tr>
                <th className="px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">
                  솔루션
                </th>
                <th className="px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">
                  격리 방식
                </th>
                <th className="px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">
                  시작 시간
                </th>
                <th className="px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">
                  언어 지원
                </th>
                <th className="px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">
                  비용
                </th>
                <th className="px-4 py-3 text-left font-mono text-[11px] uppercase tracking-[0.18em] text-foreground-subtle">
                  추천 시나리오
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {COMPARISON_ROWS.map((row) => (
                <tr key={row.solution}>
                  <td className="px-4 py-4 align-top font-semibold text-foreground">
                    {row.solution}
                  </td>
                  <td className="px-4 py-4 align-top text-foreground-muted">{row.isolation}</td>
                  <td className="px-4 py-4 align-top text-foreground-muted">{row.startup}</td>
                  <td className="px-4 py-4 align-top text-foreground-muted">{row.language}</td>
                  <td className="px-4 py-4 align-top text-foreground-muted">{row.cost}</td>
                  <td className="px-4 py-4 align-top text-foreground-muted">{row.whenToUse}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ProseHeading level={2}>2. Vercel Sandbox — 브라우저와 전체 OS가 필요할 때</ProseHeading>
        <ProseParagraph>
          Vercel Sandbox 는 Firecracker microVM 기반의 격리 실행 환경으로, 필요할 때마다 임시 Linux
          VM을 띄워서 명령을 돌리고 즉시 정리합니다. Amazon Linux 기반이라 표준 패키지 매니저 dnf 를
          그대로 쓸 수 있고, 브라우저 자동화를 위한 Chromium 시스템 라이브러리도 그 안에서 설치할 수
          있습니다. 공식 문서는 다음 URL 입니다
          (
          <a
            href="https://vercel.com/docs/sandbox"
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            vercel.com/docs/sandbox
          </a>
          ).
        </ProseParagraph>
        <ProseParagraph>
          반복 실행이 잦다면 snapshot 기능으로 의존성이 미리 설치된 VM 이미지를 저장해 두고, 이후
          실행은 sub-second 에 시작할 수 있습니다. 아래 코드는 Vercel 공식 sandbox 스킬 문서에
          나와 있는 기본 패턴을 단순화한 것입니다.
        </ProseParagraph>
        <CodeBlock filename="run-sandbox.ts" language="typescript">
{`import { Sandbox } from "@vercel/sandbox";

async function withBrowser<T>(
  fn: (sandbox: InstanceType<typeof Sandbox>) => Promise<T>,
): Promise<T> {
  const snapshotId = process.env.AGENT_BROWSER_SNAPSHOT_ID;

  const sandbox = snapshotId
    ? await Sandbox.create({ source: { type: "snapshot", snapshotId }, timeout: 120_000 })
    : await Sandbox.create({ runtime: "node24", timeout: 120_000 });

  try {
    return await fn(sandbox);
  } finally {
    await sandbox.stop();
  }
}

// Example: run a shell command in the sandbox
export async function runCmd(cmd: string, args: string[]) {
  return withBrowser(async (sandbox) => {
    const result = await sandbox.runCommand(cmd, args);
    return await result.stdout();
  });
}`}
        </CodeBlock>

        <ProseHeading level={2}>3. isolated-vm — 가벼운 JavaScript 함수 평가</ProseHeading>
        <ProseParagraph>
          전체 OS 수준의 격리는 너무 무겁고, 단지 짧은 JavaScript 함수 하나를 안전하게 평가하면 되는
          상황이 있습니다. 이런 경우{" "}
          <a
            href="https://github.com/laverdet/isolated-vm"
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            laverdet/isolated-vm
          </a>{" "}
          같은 V8 isolate 기반 도구가 적합합니다. 같은 Node.js 프로세스 안에서 새로운 V8 isolate 를
          만들고, 그 안에서 코드를 돌립니다. 메모리 한도와 실행 시간 제한을 줄 수 있고, 기본적으로
          Node.js API (fs, net, child_process 등) 는 isolate 안에서 보이지 않습니다.
        </ProseParagraph>
        <CodeBlock filename="isolated-eval.js" language="javascript">
{`import ivm from 'isolated-vm';

async function evaluateUntrusted(code) {
  // 메모리 한도 8MB isolate
  const isolate = new ivm.Isolate({ memoryLimit: 8 });
  const context = await isolate.createContext();
  const jail = context.global;
  await jail.set('global', jail.derefInto());

  try {
    // 100ms 이상 걸리면 강제 종료
    const result = await context.eval(code, { timeout: 100 });
    return result;
  } finally {
    context.release();
    isolate.dispose();
  }
}`}
        </CodeBlock>
        <ProseParagraph>
          isolated-vm 은 Cloudflare Workers 이전 세대의 엣지 런타임 격리 방식이기도 합니다. V8
          isolate 는 프로세스 단위 격리가 아니라 heap 단위 격리이기 때문에, 같은 프로세스 안에
          수백 개의 isolate 를 동시에 운영할 수 있고 오버헤드가 매우 작습니다.
        </ProseParagraph>

        <ProseHeading level={2}>4. Docker — 표준 컨테이너 격리</ProseHeading>
        <ProseParagraph>
          Docker 는 가장 널리 쓰이는 격리 기술이지만, 에이전트 관점에서는 &ldquo;중간 수준의 격리&rdquo; 에
          가깝습니다. namespace 와 cgroup 으로 프로세스와 리소스를 분리하지만, 커널은 호스트와
          공유합니다. 신뢰 수준이 중간인 플러그인 (예: 내부 팀이 만든 도구) 실행에는 충분하지만,
          완전히 신뢰할 수 없는 외부 코드에는 다음 절의 gVisor 같은 추가 층이 권장됩니다.
        </ProseParagraph>

        <ProseHeading level={2}>5. gVisor — 컨테이너 격리를 한 단계 강화</ProseHeading>
        <ProseParagraph>
          gVisor 는 Google 이 만든 user-space kernel 입니다. 컨테이너가 호스트 커널에 직접 시스템
          콜을 보내는 대신, gVisor 의 runsc 런타임이 가로채서 user-space 에서 해석합니다. 이렇게
          하면 컨테이너 안의 악성 코드가 실제 커널 취약점을 건드릴 수 있는 범위가 대폭 줄어듭니다.
          공식 문서는 {" "}
          <a
            href="https://gvisor.dev/docs/"
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            gvisor.dev
          </a>
          {" "}에 있습니다.
        </ProseParagraph>
        <ProseParagraph>
          gVisor 는 Google Cloud Run, GKE Sandbox 같은 관리형 서비스에서 이미 기본 또는 옵션 런타임
          으로 제공됩니다. 자체 호스팅 Kubernetes 에서는 runsc 를 직접 설치하고 RuntimeClass 로
          붙이면 됩니다.
        </ProseParagraph>

        <ProseHeading level={2}>6. E2B — AI 코드 인터프리터에 특화된 SaaS</ProseHeading>
        <ProseParagraph>
          E2B 는 &ldquo;AI 에이전트가 생성한 코드를 안전하게 실행&rdquo; 이라는 시나리오에 특화된 SaaS 입니다.
          Firecracker microVM 위에 Python, Node.js, 패키지 매니저, Jupyter 커널 같은 코드 인터프리터
          환경이 pre-warmed 상태로 준비돼 있어서, 수백 ms 안에 격리 환경을 얻을 수 있습니다. 공식
          SDK 문서는 {" "}
          <a
            href="https://e2b.dev/docs"
            target="_blank"
            rel="noreferrer"
            className="text-accent hover:underline"
          >
            e2b.dev/docs
          </a>
          {" "}를 참고하시면 됩니다.
        </ProseParagraph>

        <ProseHeading level={2}>7. 어떤 상황에 무엇을 쓸지 — 의사결정 가이드</ProseHeading>
        <div className="mt-6 space-y-4">
          <article className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">
              시나리오 A — 에이전트가 브라우저를 조작해야 한다
            </h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              <strong>Vercel Sandbox + Chromium + agent-browser</strong> 조합을 권장합니다. snapshot
              으로 의존성을 미리 구워 두면 실행 시간이 짧고, microVM 이 호스트와 완전히 분리돼 있어
              브라우저가 어떤 사이트를 열어도 개발 머신에는 영향이 없습니다.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">
              시나리오 B — 유저 제출 코드를 실시간으로 평가한다 (JavaScript)
            </h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              <strong>isolated-vm</strong> 이 가장 가볍고 빠릅니다. 같은 Node.js 프로세스 안에 수백
              개의 isolate 를 띄울 수 있어 동시 접속 많은 서비스에도 잘 맞습니다. 단, 네이티브 모듈
              접근이 필요하면 이 옵션은 부적합합니다.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">
              시나리오 C — 에이전트가 생성한 Python 코드 실행 + Jupyter 필요
            </h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              <strong>E2B</strong> 가 가장 빠른 셋업입니다. 이미 Python · pip · Jupyter 커널이 준비돼
              있어서 첫 호출부터 작업을 시작할 수 있습니다. 자체 호스팅이 필요하면 Vercel Sandbox
              snapshot 으로 같은 환경을 재구성할 수도 있습니다.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">
              시나리오 D — 기존 CI 파이프라인 안에서 격리를 강화하고 싶다
            </h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              이미 Docker 를 쓰고 있다면 <strong>gVisor runsc</strong> 를 RuntimeClass 로 붙이는
              것이 가장 작은 변경입니다. 커널 공유를 피하고 싶을 때 합리적인 선택입니다.
            </p>
          </article>
          <article className="rounded-xl border border-border bg-surface p-5">
            <h3 className="text-lg font-semibold text-foreground">
              시나리오 E — 완전 격리된 개발 환경이 필요하지만 여러 언어를 쓴다
            </h3>
            <p className="mt-2 text-sm leading-7 text-foreground-muted">
              <strong>Vercel Sandbox</strong> 가 현실적입니다. Amazon Linux 기반이라 대부분의 언어
              런타임을 dnf 로 설치할 수 있고, 실행마다 새 VM 이라 상태가 남지 않습니다.
            </p>
          </article>
        </div>

        <ProseHeading level={2}>8. 같이 주의할 점</ProseHeading>
        <ul className="mt-5 list-disc space-y-2 pl-6 text-[16px] leading-8 text-foreground">
          <li>
            Sandbox 는 &ldquo;실행 권한의 경계&rdquo; 일 뿐, credential 노출이나 간접 프롬프트 인젝션을 직접
            막지는 않습니다. 반드시 zero-trust 4계층 전체와 같이 써야 합니다.
          </li>
          <li>
            네트워크 접근은 기본적으로 &ldquo;deny by default&rdquo; 로 시작합니다. Vercel Sandbox 도 network
            access 를 명시적으로 허용하지 않으면 차단되며, 필요한 도메인만 allowlist 로 여는 것이
            안전합니다.
          </li>
          <li>
            실행 시간과 메모리 한도를 반드시 설정합니다. 무한 루프나 메모리 폭주가 격리 환경을 넘어
            호스트에 영향을 주면 안 됩니다.
          </li>
          <li>
            격리 환경의 로그는 외부로 꼭 수집합니다. 실행 내역이 없으면 사고 대응이 불가능합니다.
          </li>
          <li>
            가장 흔한 실수는 &ldquo;첫 실험은 sandbox 없이 그냥 로컬에서&rdquo; 하는 것입니다. 처음부터 격리
            환경을 기본값으로 만드는 편이 안전합니다.
          </li>
        </ul>

        <ProseHeading level={2}>9. 같이 읽으면 좋은 페이지</ProseHeading>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {RELATED_PAGES.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="rounded-xl border border-border bg-surface p-5 transition hover:border-accent"
            >
              <h3 className="text-lg font-semibold text-foreground">{page.title}</h3>
              <p className="mt-2 text-sm leading-7 text-foreground-muted">{page.description}</p>
            </Link>
          ))}
        </div>

        <ProseHeading level={2}>10. Sources</ProseHeading>
        <ul className="mt-5 list-disc space-y-2 pl-6 text-[16px] leading-8 text-foreground">
          <li>
            Vercel Sandbox 공식 문서:{" "}
            <a
              href="https://vercel.com/docs/sandbox"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              vercel.com/docs/sandbox
            </a>
          </li>
          <li>
            @vercel/sandbox npm 패키지:{" "}
            <a
              href="https://www.npmjs.com/package/@vercel/sandbox"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              npmjs.com/package/@vercel/sandbox
            </a>
          </li>
          <li>
            laverdet/isolated-vm GitHub 저장소:{" "}
            <a
              href="https://github.com/laverdet/isolated-vm"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              github.com/laverdet/isolated-vm
            </a>
          </li>
          <li>
            Docker 공식 문서 — 격리 개념:{" "}
            <a
              href="https://docs.docker.com/engine/security/"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              docs.docker.com/engine/security
            </a>
          </li>
          <li>
            gVisor 공식 문서:{" "}
            <a
              href="https://gvisor.dev/docs/"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              gvisor.dev/docs
            </a>
          </li>
          <li>
            Google Cloud Run — gVisor 기반 격리:{" "}
            <a
              href="https://cloud.google.com/run/docs/about-instance-autoscaling"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              cloud.google.com/run/docs
            </a>
          </li>
          <li>
            GKE Sandbox 공식 가이드:{" "}
            <a
              href="https://cloud.google.com/kubernetes-engine/docs/how-to/sandbox-pods"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              cloud.google.com/kubernetes-engine/docs/how-to/sandbox-pods
            </a>
          </li>
          <li>
            E2B 공식 문서:{" "}
            <a
              href="https://e2b.dev/docs"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              e2b.dev/docs
            </a>
          </li>
          <li>
            Firecracker microVM 공식 사이트:{" "}
            <a
              href="https://firecracker-microvm.github.io/"
              target="_blank"
              rel="noreferrer"
              className="text-accent hover:underline"
            >
              firecracker-microvm.github.io
            </a>
          </li>
        </ul>

        <hr className="my-12 border-border" />
        <p className="font-mono text-sm text-foreground-muted">
          ←{" "}
          <Link href="/reference" className="text-accent-2 hover:underline">
            참고자료 인덱스로 돌아가기
          </Link>
        </p>
      </Prose>
    </div>
  );
}
