# AI 에이전트용 샌드박싱 솔루션 비교

이 문서는 AI 에이전트가 신뢰할 수 없는 코드를 안전하게 실행할 수 있게 하는 현대적 샌드박싱 기술 다섯 가지를 분석합니다. 각 솔루션은 고유한 격리 모델, 성능 특성, 비용 구조를 제공합니다.

## 1. Vercel Sandbox

### 개요

Vercel Sandbox는 Firecracker microVM 기반의 관리형 샌드박싱 서비스로, AI 에이전트 출력, 사용자 업로드 코드, 써드파티 스크립트를 안전하게 실행할 수 있도록 설계됐습니다 (https://vercel.com/docs/sandbox).

### 격리 아키텍처

각 샌드박스는 **Amazon Linux 2023 기반의 전용 Firecracker microVM**에서 실행됩니다 (https://vercel.com/docs/vercel-sandbox/concepts). Docker 컨테이너와 달리, Vercel Sandbox는 전용 커널을 각 샌드박스에 할당합니다:

- **하드웨어 격리**: KVM 기반 가상화로 호스트 커널과 완전히 분리
- **프로세스 격리**: 커널 레벨 격리로 다른 샌드박스의 프로세스 접근 불가
- **네트워크 격리**: 각 샌드박스의 독립적 네트워크 네임스페이스 (https://vercel.com/docs/vercel-sandbox/concepts)
- **리소스 제한**: CPU, 메모리, 디스크 한계 및 자동 타임아웃

### 주요 기능

**런타임**: Node.js 24, Node.js 22, Python 3.13 지원 (https://vercel.com/docs/sandbox#system-specifications)

**스냅샷**: 샌드박스 상태를 저장하고 나중에 복원하여 설정 시간 단축. 기본 30일 만료, 만료 시간 설정 가능 (https://vercel.com/docs/vercel-sandbox/sdk-reference#snapshot-class)

**부팅 시간**: Firecracker 최적화로 **밀리초 단위 시작** (https://vercel.com/docs/sandbox)

**네트워크 정책**: 기본 "allow-all", "deny-all" 또는 도메인/서브넷 기반 화이트리스트 (https://vercel.com/docs/vercel-sandbox/sdk-reference#networkpolicy-class)

**타임아웃**: 기본 5분, Hobby 플랜 45분, Pro/Enterprise 5시간까지 연장 가능 (https://vercel.com/docs/vercel-sandbox/sdk-reference#sandbox-class-instance-methods)

### 코드 예시

다음은 공식 SDK 레퍼런스 (https://vercel.com/docs/vercel-sandbox/sdk-reference#basic-workflow) 에서 추출한 기본 워크플로우입니다:

```typescript
// 1. 샌드박스 생성
const sandbox = await Sandbox.create({ runtime: 'node24' });

// 2. 명령 실행 - 완료 대기
const result = await sandbox.runCommand('node', ['--version']);

// 3. 결과 확인
console.log(result.exitCode); // 0
console.log(await result.stdout()); // v24.x.x
```

더 복잡한 예시 (https://vercel.com/docs/vercel-sandbox/sdk-reference#sandboxclassinstancemethods):

```typescript
// 파일 생성 및 실행
await sandbox.mkDir('assets');
await sandbox.writeFiles([
  { path: 'run.sh', content: Buffer.from('#!/bin/bash\necho "Hello"'), mode: 0o755 }
]);

// 분리된 명령 실행 (논블로킹)
const detached = await sandbox.runCommand({
  cmd: 'node',
  args: ['server.js'],
  detached: true
});

// 나중에 결과 확인
const result = await detached.wait();
console.log(result.exitCode);
```

네트워크 정책 설정 (https://vercel.com/docs/vercel-sandbox/sdk-reference#networkpolicy-class):

```typescript
// 모든 트래픽 차단
await sandbox.updateNetworkPolicy('deny-all');

// 특정 도메인만 허용
await sandbox.updateNetworkPolicy({
  allow: ["google.com", "api.example.com"]
});

// 비공개 네트워크 차단하고 인터넷 허용
await sandbox.updateNetworkPolicy({
  subnets: {
    deny: ["10.0.0.0/8"]
  }
});
```

스냅샷 패턴 (https://vercel.com/docs/vercel-sandbox/sdk-reference#sandboxinstancemethods):

```typescript
const snapshot = await sandbox.snapshot({ expiration: 0 }); // 무한 만료
console.log(snapshot.snapshotId);

// 나중에 스냅샷에서 생성
const newSandbox = await Sandbox.create({
  source: { type: 'snapshot', snapshotId: snapshot.snapshotId }
});
```

### 사용 시기

Vercel Sandbox는 다음 상황에 적합합니다:

- **AI 코드 인터프리터**: LLM이 생성한 Python/JavaScript 실행
- **클린 테스트 환경**: 각 테스트 실행마다 깨끗한 OS에서 시작
- **브라우저 자동화**: 신뢰할 수 없는 웹 스크래핑 스크립트
- **개발자 놀이터**: 사용자가 제출한 코드 검증

## 2. isolated-vm (V8 격리)

### 개요

isolated-vm은 Node.js에서 V8 Isolate를 직접 활용하는 라이브러리로, **프로세스 내 격리**를 제공합니다. Docker나 VM 없이, 단일 Node.js 프로세스 내에서 여러 독립적인 JavaScript 실행 환경을 만듭니다 (https://github.com/laverdet/isolated-vm).

### 격리 아키텍처

V8 Isolate는 다음 특성을 제공합니다 (https://github.com/laverdet/isolated-vm):

- **분리된 힙**: 각 Isolate는 고유한 메모리 힙을 가지며, 기본값 128MB (최소 8MB)
- **독립적 전역 범위**: 각 Context는 격리된 전역 객체와 built-in을 보유
- **컴파일된 스크립트**: 코드는 원래 Isolate에서만 실행됨
- **Node.js API 차단**: Isolate 내부에서는 파일시스템, 네트워크 접근 불가

격리는 **하드웨어 기반이 아니라 V8 엔진 수준**입니다. 따라서 V8 자체의 보안 취약점은 Isolate도 영향을 받습니다.

### 코드 예시

기본 사용법 (https://github.com/laverdet/isolated-vm README):

```javascript
const ivm = require('isolated-vm');

// 1. Isolate 생성
const isolate = new ivm.Isolate({ memoryLimit: 128 });

// 2. Context 생성
const context = isolate.createContextSync();

// 3. 코드 실행
const result = context.evalSync('2 + 2');
console.log(result); // 4
```

매개변수를 받는 함수로 코드 실행:

```javascript
const isolate = new ivm.Isolate({ memoryLimit: 64 });
const context = isolate.createContextSync();

// 클로저로 실행 (외부 변수 접근 가능)
const add = context.evalSync(`
  (a, b) => a + b
`);

const result = add.applySync(undefined, [5, 3]);
console.log(result); // 8
```

Reference 객체로 대용량 데이터 전달:

```javascript
const isolate = new ivm.Isolate();
const context = isolate.createContextSync();

// 호스트 함수를 Isolate에 노출
const fn = new ivm.Reference(function(x) {
  return x * 2;
});

context.set('multiply', fn);
const result = context.evalSync('multiply(21)');
console.log(result); // 42
```

### 사용 시기

isolated-vm은 다음에 적합합니다:

- **플러그인 시스템**: 신뢰할 수 있는 JavaScript 플러그인 실행
- **사용자 정의 함수**: Spreadsheet 수식, ETL 변환 함수
- **저비용 격리**: VM/컨테이너 오버헤드 없음

### 한계

- **JavaScript만**: Python, Go 등 다른 언어 지원 안 함
- **Node.js API 차단**: 파일, 네트워크 접근 불가
- **V8 보안**: Isolate 자체 취약점은 격리 불가능

## 3. gVisor 및 E2B

### gVisor: 사용자공간 커널

#### 개요

gVisor는 Google이 만든 **사용자공간 커널 아키텍처**로, "실행 중인 애플리케이션과 호스트 운영체제 사이에 강력한 격리 계층을 제공합니다" (https://gvisor.dev/docs/).

#### 아키텍처

gVisor는 두 가지 주요 컴포넌트로 구성됩니다 (https://gvisor.dev/docs/architecture/):

**The Sentry**: gVisor의 가장 큰 컴포넌트로, **애플리케이션 커널** 역할을 합니다. 컨테이너화된 애플리케이션의 시스템 콜을 가로채서 호스트 커널로 전달하지 않고 직접 처리합니다:
- 메모리 관리
- 신호 전달
- 스레딩
- 파일시스템 인터페이스

**The Gofer**: 9P 프로토콜을 통해 Sentry와 통신하는 호스트 프로세스로, 파일시스템 접근을 중개합니다. 이는 Sentry가 제한된 seccomp 컨테이너에서 실행되므로 추가 격리 계층을 제공합니다.

#### Go 선택 이유

gVisor는 Go로 작성되어 **메모리 보안**을 강조합니다 (https://gvisor.dev/docs/architecture/):

- 강한 타입 시스템
- 내장 범위 검사
- 미초기화 변수 없음
- Use-after-free 불가능
- 스택 오버플로우 불가능

#### Runsc 런타임

gVisor는 `runsc` 런타임을 제공하여 OCI(Open Container Initiative) 명세를 구현하므로 Docker, Kubernetes와 직접 통합 가능합니다 (https://gvisor.dev/docs/architecture/).

### E2B: 관리형 AI 샌드박싱

#### 개요

E2B는 "에이전트가 안전하게 코드를 실행하고, 데이터를 처리하고, 도구를 실행할 수 있게 하는 격리 샌드박스"를 제공하는 관리형 서비스입니다 (https://e2b.dev/docs).

#### 핵심 개념

E2B의 두 가지 기본 구성 요소:

1. **Sandbox**: 요청 시 생성되는 보안 Linux 가상 머신
2. **Template**: 샌드박스 인스턴스의 초기 환경 설정

#### SDK 지원

Python과 JavaScript/TypeScript 모두 지원됩니다. [출처 미확인]

E2B는 다음 사용 사례에 최적화됩니다 (https://e2b.dev/docs):

- **AI 에이전트**: LLM이 생성한 코드 실행
- **컴퓨터 이용**: 가상 데스크톱 환경과 상호작용
- **CI/CD 통합**: GitHub Actions 워크플로우에서 자동 테스트

## 4. 비교 표

| 솔루션 | 격리 수준 | 부팅 시간 | 언어 지원 | 비용 모델 | 사용 시기 |
|---|---|---|---|---|---|
| **Vercel Sandbox** | VM (Firecracker) | ~1ms | Node.js 24/22, Python 3.13 | 시간 단위 과금 + CPU/네트워크 | AI 에이전트, 신뢰할 수 없는 코드, 브라우저 자동화 |
| **isolated-vm** | V8 Isolate | ~0ms | JavaScript (Node.js) | 무료 (OSS) | 신뢰할 수 있는 JS 플러그인, 저비용 격리 |
| **gVisor** | 사용자공간 커널 | ~50ms | Linux 바이너리 (언어무관) | 자체 호스팅 또는 Kubernetes | 기존 컨테이너 워크플로우, 다언어 지원 필요 |
| **Docker 컨테이너** | 커널 공유 | ~50ms | 모든 언어 | 무료 (OSS) | 신뢰할 수 있는 워크로드, 프로덕션 배포 |
| **E2B** | VM (gVisor/Firecracker) | ~1초 | 다언어 (Agent-ready) | 샌드박스 시간 단위 과금 | AI 에이전트, 관리형 서비스 선호 |

## 5. 선택 가이드

### 위협 모델별 선택

**낮은 위협 (신뢰할 수 있는 코드)**:
- Docker 컨테이너로 충분
- isolated-vm 경량 격리 (JavaScript만)

**중간 위협 (사용자 제출 코드, LLM 생성 코드)**:
- **gVisor** 추천: 컨테이너 오버헤드 최소, Kubernetes 통합
- **Vercel Sandbox**: 관리형 서비스 선호 시

**높은 위협 (금융/의료 데이터, 악의적 입력)**:
- **Firecracker microVM**: 하드웨어 격리 필수
- **Vercel Sandbox** 또는 **E2B**: 관리형 microVM

### 실제 권고안

2026년 기준, 업계는 신뢰할 수 없는 코드에 **microVM 기반 격리**로 수렴하고 있습니다 (https://manveerc.substack.com/p/ai-agent-sandboxing-guide):

> AWS는 Lambda용 Firecracker를 만들었습니다. Google은 Search와 Gmail용 gVisor를 만들었습니다. 18개월 내 거의 모든 주요 플랫폼이 같은 결론에 도달했습니다: 신뢰할 수 없는 코드는 컨테이너보다 강력한 격리가 필요합니다.

**AI 에이전트의 경우**: gVisor 최소 요구, LLM 생성 코드나 사용자 업로드 바이너리는 microVM 필수 (https://manveerc.substack.com/p/ai-agent-sandboxing-guide).

## Sources

- https://vercel.com/docs/sandbox
- https://vercel.com/docs/vercel-sandbox/sdk-reference
- https://vercel.com/docs/vercel-sandbox/concepts
- https://github.com/laverdet/isolated-vm
- https://gvisor.dev/docs/
- https://gvisor.dev/docs/architecture/
- https://e2b.dev/docs
- https://northflank.com/blog/firecracker-vs-gvisor
- https://manveerc.substack.com/p/ai-agent-sandboxing-guide
