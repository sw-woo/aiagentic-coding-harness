# AI 기판 수준 트렌드와 계산으로서의 AI: 팩트 기반 참고 자료

> 출처 기반의 기술 문서. 한국어 장문 에세이 작성용 원본 자료.

---

## 1. AI는 계산이다: 행렬 곱셈에서의 비의인화 프레임

### 1.1 트랜스포머 LLM의 형식적 정의

트랜스포머 언어 모델의 핵심 구조는 다음 5단계로 이루어진다:

1. **토큰 임베딩 조회**: 입력 토큰을 고정 차원 벡터로 변환
2. **멀티헤드 어텐션 (스케일드 닷프로덕트 Q·K·V)**:
   - Q(Query), K(Key), V(Value) 행렬의 내적
   - 출력: 컨텍스트 가중 벡터
3. **피드포워드 네트워크**: 다층 완전연결 층
4. **소프트맥스**: 확률 분포 정규화
5. **자동회귀 디코딩**: 이전 토큰 조건부로 다음 토큰 예측

모델의 능력은 **파라미터 개수**에 정비례하며, 추론 비용은 **행렬 곱셈의 FLOPs(부동소수점 연산) × 생성 토큰 수**로 결정된다.

**명시적 프레임**: 이것은 의식이 아니라, 규모의 행렬 곱셈이다.

### 1.2 핵심 인용문헌

#### Vaswani et al. (2017) — "Attention Is All You Need"

**정식 제목**: "Attention Is All You Need"
**저자**: Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Lukasz Kaiser, Illia Polosukhin
**제출 날짜**: 2017년 6월 12일
**arXiv**: https://arxiv.org/abs/1706.03762

**핵심 기여**: 트랜스포머 아키텍처 도입 — "순환(recurrence)과 합성곱(convolutions)을 완전히 제거하고, 어텐션 메커니즘만으로 신경망 구성"

이 논문은 모든 현대 LLM의 기초가 되었다.

#### Karpathy (2024) — nanoGPT 리포지토리

**GitHub**: https://github.com/karpathy/nanoGPT
**설명**: "가장 간단하고 빠른 중형 GPT 훈련/미세조정 리포지토리"

**코드 크기**: 약 600–750줄
- `train.py`: ~300줄 (훈련 루프)
- `model.py`: ~300줄 (GPT 아키텍처)

**의미**: LLM이 얼마나 단순한지를 명확하게 보여주는 증거. GPT-2(1.24억 파라미터)를 A100 8개로 약 4일 만에 재현 가능.

#### Bender et al. (2021) — "On the Dangers of Stochastic Parrots"

**정식 제목**: "On the Dangers of Stochastic Parrots: Can Language Models Be Too Big?"
**저자**: Emily M. Bender, Timnit Gebru, Angelina McMillan-Major, Shmargaret Shmitchell
**발행**: FAccT '21 (2021년 3월 3–10일)
**ACM 정식 출판**: https://dl.acm.org/doi/10.1145/3442188.3445922
**PDF**: https://s10251.pcdn.co/pdf/2021-bender-parrots.pdf

**핵심 논증**:
- 대규모 LLM은 환경·재정적 비용이 크다
- 투명성 부족으로 인한 내재적 편향 위험
- 모델은 학습하는 개념을 "이해"하지 않는다
- 속임수와 신뢰할 수 없는 일반화 위험

**용어 유산**: "확률적 앵무새(Stochastic Parrot)"는 2023년 American Dialect Society의 AI 관련 올해의 단어로 선정됨.

### 1.3 계산 비용 프레임: FLOPs와 토큰 스케일링

- **훈련 비용**: 모델 파라미터 수와 훈련 토큰 수에 비례
- **추론 비용**: 생성 토큰당 파라미터 × 우수(연산수)
- **스케일링 법칙**: 다양한 크기와 데이터 규모에서 수 자리수에 걸쳐 예측 가능

Altman (2025, 이하 참조)의 표현: **"AI의 지능 ≈ 훈련 및 실행 자원의 로그"**

---

## 2. Google TPU 진화: 2016–2025 타임라인

모든 성능 지표는 **공식 Google Cloud 블로그**에서 출처.

### TPU v1 (2016)
- **공개**: Google I/O 2016
- **용도**: AlphaGo 지원
- **의의**: AI 가속 기능 입증

### TPU v2 (2018)
- **추가**: 분산 공유 메모리
- **시작**: 대규모 훈련 워크로드

### TPU v3 (2020)
- **특징**: 액체 냉각 도입
- **결과**: 높은 전력 한계 및 열 안정성 개선

### TPU v4 (2022)
- **아키텍처**: 3D 토러스 상호연결
- **성능 향상**: v3 대비 2배 이상

### TPU v5 (2023)
- **비용-계산 효율성**: 개선

### TPU v6 Trillium (2024)
**발표**: 2024년 5월 Google I/O
**공개 프리뷰**: 2024년 10월
**공식 링크**: https://cloud.google.com/blog/products/compute/introducing-trillium-6th-gen-tpus

**주요 개선**:
- v5e 대비 **4.7배 성능 향상**
- 더 큰 행렬 곱셈 단위
- 상향된 클록 속도
- **MLP 코어**: 트랜스포머 최적화 추가

### TPU v7 Ironwood (2025)
**발표**: 2025년 4월 9일
**공식 링크**: https://blog.google/products/google-cloud/ironwood-tpu-age-of-inference/

**사양**:
- **단일 Ironwood Superpod**: 9,216개 TPU 칩
- **HBM3e 메모리**: 칩당 192 GB, 7.4 TB/s 대역폭
- **피크 성능**: **4,614 TFLOPs (FP8)**
- **vs Trillium**: **4배 향상** (훈련 및 추론)
- **목표**: 추론 시대의 AI 전력화

---

## 3. 프론티어 컴퓨팅 인프라 구축 (2024–2025)

### 3.1 Stargate — OpenAI/Microsoft/Oracle/SoftBank

**공식 발표**: 2025년 1월 21일 (미국 대통령 트럼프 발표)
**공식 OpenAI 링크**: https://openai.com/index/announcing-the-stargate-project/

**투자 규모**: **5년(2025-2029)에 $5,000억**

**파트너**:
- **자금**: SoftBank (재정 책임)
- **운영**: OpenAI (operational responsibility)
- **초기 기술 파트너**: Arm, Microsoft, NVIDIA, Oracle
- **추가 투자자**: MGX

**배포 일정**:
- **즉시 배포**: $1,000억
- **목표**: 4년 내 $5,000억 규모 완성

**전략적 목표**: 미국 AI 리더십 확보, 수백만 일자리 창출, 국가 안보 능력

---

### 3.2 xAI Colossus — Memphis, TN

**위치**: Memphis, Tennessee
**구성 시작**: 2024년
**초기 가동**: 2024년 7월

**규모**:
- **초기**: 100,000 × NVIDIA H100
- **현재 (2025년 6월)**: 150,000 H100 + 50,000 H200 + 30,000 GB200
- **목표**: 최종 1,000,000 GPU

**구성 시간**: 122일 (100,000 GPU)

**용도**: Grok 훈련, X 플랫폼, SpaceX 등 Elon Musk 벤처 지원

**구조적 장점**: 폐기된 Electrolux 빌딩 재용도, 근처 폐수처리장에서 냉각수 공급

---

### 3.3 Anthropic — Google TPU & Amazon Trainium 이중 전략

#### Google Cloud TPU 파트너십 (2025년 10월 발표)

**공식 링크**: https://www.anthropic.com/news/expanding-our-use-of-google-cloud-tpus-and-services

**규모**:
- **할당**: 최대 100만 TPU
- **투자**: 수십억 달러
- **배포 시간**: 2026년 내 **1기가와트 이상**

**선택 사유**: TPU의 가격-성능 및 효율성

#### Amazon Trainium 파트너십 (2025년 발표)

**공식 링크**: https://www.anthropic.com/news/anthropic-amazon-trainium

**투자**:
- **새로운 투자**: $40억
- **누적 총액**: $80억
- **지분**: 소수 투자자

**프로젝트 Rainier**: Anthropic의 맞춤형 슈퍼컴퓨터
- **상태**: 2025년 후반 운영 개시
- **초기 칩**: 500,000 Trainium2
- **최종 목표**: 100만 Trainium2

**협력 방식**: "실리콘에서부터 전체 스택까지" 최적화
- 저수준 커널 작성 (Trainium 직접 인터페이스)
- AWS Neuron 소프트웨어 스택 기여

---

## 4. 자기개선 시스템 (Self-Improving)

### 4.1 AutoML / NASNet

**논문**: "Learning Transferable Architectures for Scalable Image Recognition"
**저자**: Barret Zoph, Vijay Vasudevan, Jonathon Shlens, Quoc V. Le
**arXiv**: https://arxiv.org/abs/1707.07012
**제출**: 2017년 7월 21일

**혁신**: 신경망 아키텍처 검색(NAS) 공간의 이전 가능성 실현
- **성과**: ImageNet 최고 모델 대비 1.2% 정확도 향상, **FLOPs 28% 감소**

---

### 4.2 AlphaZero

**논문**: "Mastering Chess and Shogi by Self-Play with a General Reinforcement Learning Algorithm"
**발행**: Nature, 2017년 10월 18일
**arXiv**: https://arxiv.org/abs/1712.01815
**제출**: 2017년 12월 5일

**의의**: 자기강화 학습의 증거
- 규칙만 주어진 상태에서, 24시간 내 체스, 장기, 바둑에서 초인적 성능 달성
- 태뷔라 라사(무에서의 출발) 기반

---

### 4.3 Constitutional AI / RLAIF

**논문**: "Constitutional AI: Harmlessness from AI Feedback"
**주저자**: Yuntao Bai, 50+ 동료 (Anthropic)
**arXiv**: https://arxiv.org/abs/2212.08073
**제출**: 2022년 12월 15일
**Anthropic 공식**: https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback

**혁신 방식**:
- 인간 라벨링 최소화 ("해로운 출력"을 명시적으로 표시할 필요 없음)
- **구성(Constitution)**: 원칙 리스트로 AI의 자기-비판 지시
- **RLAIF**: AI 피드백 강화학습
  - 감독 학습 단계: 모델이 자신의 출력을 비판하고 수정
  - RL 단계: 모델 기반 보상 신호로 정책 학습

---

### 4.4 DSPy

**논문**: "DSPy: Compiling Declarative Language Model Calls into Self-Improving Pipelines"
**저자**: Omar Khattab, Arnav Singhvi, Paridhi Maheshwari, 10+ 동료
**arXiv**: https://arxiv.org/abs/2310.03714
**제출**: 2023년 10월 5일
**GitHub**: https://github.com/stanfordnlp/dspy

**핵심 개념**:
- LLM 파이프라인을 **"프롬프팅이 아닌 프로그래밍"**
- 선언적 모듈로 텍스트 변환 그래프 정의
- 컴파일러가 프롬프트와 가중치를 목표 메트릭에 맞춰 최적화

**성과**: GPT-3.5로 수동 프롬프트 대비 25% 향상, llama2-13b-chat으로 65% 향상

---

### 4.5 Sakana AI Scientist

**논문**: "The AI Scientist: Towards Fully Automated Open-Ended Scientific Discovery"
**arXiv**: https://arxiv.org/abs/2408.06292
**공식 소개**: https://sakana.ai/ai-scientist/

**기능**: 자동화된 논문 생성 파이프라인
- 아이디어 생성 → 구현 → 실험 → 피어 리뷰 → 개선 → 논문 작성
- 기계학습 부분학(diffusion, transformers, grokking) 에서 신규 기여 발견

**경제성**: 논문당 약 $15 비용
**가용성**: GitHub 오픈소스 (SakanaAI/AI-Scientist)

---

### 4.6 Self-Refine

**논문**: "Self-Refine: Iterative Refinement with Self-Feedback"
**저자**: Aman Madaan, Niket Tandon, Prakhar Gupta, 등
**arXiv**: https://arxiv.org/abs/2303.17651
**제출**: 2023년 3월 30일
**GitHub**: https://github.com/madaan/self-refine

**방식**: 추가 훈련 불필요
- 모델이 자신의 출력을 피드백
- 모든 역할(생성기, 개선기, 평가자)을 단일 LLM이 수행
- 7개 작업 평가 (GPT-3.5, ChatGPT, GPT-4)

---

### 4.7 Self-Rewarding Language Models

**논문**: "Self-Rewarding Language Models"
**저자**: Weizhe Yuan, Richard Yuanzhe Pang, Kyunghyun Cho, 등 (Meta, NYU)
**arXiv**: https://arxiv.org/abs/2401.10020
**제출**: 2024년 1월 18일

**핵심**: LLM이 자신을 평가하고 보상 신호 생성
- 반복 DPO 훈련: 명령어 준수 능력과 자기-보상 능력이 동시 개선
- 초인적 피드백을 위한 경로

---

## 5. 자율형 코딩 에이전트 (2024–2026)

### 5.1 Devin — Cognition AI

**공식 발표**: 2024년 3월 12일
**공식 링크**: https://cognition.ai/blog/introducing-devin

**특징**: "세계 최초의 완전 자율 AI 소프트웨어 엔지니어"

**역량**:
- 리포지토리 복제, 코드 작성, 디버깅, 테스트, 배포
- 시뮬레이션된 컴퓨팅 환경에서 수천 가지 의사결정 실행

**성능**: SWE-bench에서 **13.86% 해결율** (이전 최고 1.96%)

**펀딩**: Founders Fund 주도 $2,100만 Series A

---

### 5.2 SWE-agent — Princeton

**GitHub**: https://github.com/SWE-agent/SWE-agent
**논문**: "SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering"
**arXiv**: https://arxiv.org/abs/2405.15793
**발표**: NeurIPS 2024

**혁신**: 에이전트-컴퓨터 인터페이스(ACI)
- 에이전트가 코드 파일을 생성/편집하고 저장소를 탐색하며 테스트/프로그램 실행

**오픈소스**: MIT 라이선스

---

### 5.3 OpenHands (구 OpenDevin)

**공식 사이트**: https://openhands.dev/
**GitHub**: https://github.com/OpenHands/OpenHands
**논문**: https://arxiv.org/abs/2407.16741

**특징**: 오픈소스, Docker 환경
- 코드 작성, 터미널 명령어, 웹 브라우징, PR 열기

**재정**: All-Hands-AI 지원, 2024년 후반 $1,880만 Series A 모금

**재브랜딩**: OpenDevin → OpenHands (2024년 후반)

---

### 5.4 Aider

**GitHub**: https://github.com/paul-gauthier/aider
**개발자**: Paul Gauthier
**시작**: 2023년 초

**위치**: CLI 기반 AI 페어 프로그래밍
- 전체 코드베이스 맵핑
- 자동 git 커밋 및 메시지 작성

**모델 지원**: Claude 3.5 Sonnet, OpenAI o1/o3-mini/GPT-4o, DeepSeek, 로컬 모델

**벤치마크**: Paul이 공개 점수판 유지 (투명성)

---

### 5.5 Claude Code — Anthropic

**공식 링크**: https://www.anthropic.com/product/claude-code
**문서**: https://code.claude.com/docs/en/overview
**GitHub**: https://github.com/anthropics/claude-code

**아키텍처**:
- 전체 코드베이스 읽기 및 계획
- 실제 개발 도구로 실행 (git, 테스트 러너 등)
- 실패 후 조정 및 재시도

**자율성 제어**: 개발자가 조정 가능 (모든 작업 승인 → 자동 분류)

**Anthropic 사용 현황**: Anthropic 내 대부분 코드를 Claude Code가 작성

---

### 5.6 OpenAI Codex CLI

**공식 문서**: https://developers.openai.com/codex/cli
**GitHub**: https://github.com/openai/codex

**최근 리부팅** (2024년 후반)
- 경량 Rust 기반 로컬 에이전트
- o3/o4-mini 모델 지원

**신규 기능** (2025):
- 이미지 업로드 (스크린샷, 와이어프레임)
- 플러그인 지원
- prompt-plus-stdin 워크플로우

**추천 모델**: gpt-5.4 (대부분 작업)

**플랫폼**: macOS, Linux (Windows 실험적)

---

### 5.7 Cursor IDE Agents

**공식 사이트**: https://cursor.com/
**최신**: Cursor 3 (2026년 4월)
**이전**: Cursor 2.0 (2025년)

**Cursor 3 개선**:
- 멀티 에이전트 (최대 8개 병렬)
- 멀티 저장소 레이아웃
- git 워크트리/원격 머신 격리

**모델**: Cursor 자체 "Composer" 모델 (에이전트 워크플로우 최적화)
- **속도**: 유사 지능 모델 대비 4배
- **완료 시간**: 대부분 턴이 30초 이내

---

### 5.8 Replit Agent

**공식 문서**: https://docs.replit.com/replitai/agent
**최신**: Agent 3 (2025년 9월)

**특징**:
- 200분 연속 자율성
- **자기 테스트/디버깅**: 코드 생성 → 실행 → 오류 감지 → 수정 → 재실행

**성능**: Replit 고유 테스트 시스템이 Computer Use 모델 대비 **3배 빠르고 10배 저렴**

**사용 예**: 자동화된 워크플로우 (BigQuery, Slack, Notion 통합)

---

### 5.9 GitHub Copilot Workspace

**공식 문서**: https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent

**Agent Mode**:
- 자율적 다단계 코딩 작업
- 파일 수정, 터미널 명령어 실행, 오류 반복 처리

**Cloud Agent**:
- GitHub Actions 기반 백엔드
- GitHub Issues/Chat에서 할당된 작업 수행
- 저장소 연구 → 계획 → 코드 변경 → PR 생성

---

## 6. 멀티에이전트 / 에이전트 팀 (2024–2025)

### 6.1 Anthropic Claude Code Agent Teams

**공식 문서**: https://code.claude.com/docs/en/agent-teams
**상태**: 실험적, 기본 비활성화

**활성화**: 설정(`settings.json` 또는 환경변수)에 `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` 추가

**구조**:
- 리드 에이전트 (팀 조율)
- 4명 이상의 팀원 에이전트 (독립 실행)
- 팀원 간 **직접 통신** (리드를 거치지 않음)

**차이점**: 서브에이전트(단일 세션 내)와 달리, Agent Teams는 독립적 컨텍스트 창과 상태 공유

**최적 용도**: 연구, 코드 리뷰, 새 모듈, 디버깅(경쟁 가설), 크로스레이어 조정

**요구사항**: Claude Code v2.1.32+

---

### 6.2 OpenAI Swarm

**공식 발표**: 2024년 10월 13일
**GitHub**: https://github.com/openai/swarm
**상태**: 실험적, 비공식

**구조**: 경량 Python 패키지, OpenAI Chat Completions API 기반

**핵심 개념**:
- **루틴(Routines)**: 단계 및 도구 세트
- **핸드오프(Handoffs)**: 에이전트 간 작업 전달

**제한사항**: 프로덕션 미지원, 유지보수 불가 (OpenAI 공식)

**의의**: 멀티에이전트 개발자 접근성 향상

---

### 6.3 LangGraph

**공식**: https://www.langchain.com/langgraph
**GitHub**: https://github.com/langchain-ai/langgraph
**상태**: v1 (1년 이상 반복 후)

**아키텍처**: 그래프 기반 워크플로우
- 노드(기능) + 엣지(방향)
- 상태 객체 (모든 정보 흐름)

**기능**:
- 루프, 분기, 메모리(단기/장기), 지속성
- 인간-루프 개입
- 실패 후 재개

**라이선스**: MIT (무료)

**사용처**: Uber, LinkedIn, Klarna

---

### 6.4 CrewAI

**공식**: https://crewai.com/
**GitHub**: https://github.com/crewAIInc/crewAI

**특징**: 역할 기반 에이전트 협력
- **Crews**: 자율 협력 (적응형)
- **Flows**: 결정적 이벤트 드리븐 (감시 가능)

**성능**: 동급 프레임워크 대비 **2–3배 빠름** (높은 처리량 시나리오)

**커뮤니티**: 100,000+ 인증 개발자

---

### 6.5 Microsoft AutoGen

**공식**: https://www.microsoft.com/en-us/research/project/autogen/
**GitHub**: https://github.com/microsoft/autogen

**현황**: 유지보수 모드 (신규 기능 없음)

**권장사항**: 신규 프로젝트는 **Microsoft Agent Framework** 사용

**특징**: 이벤트 드리븐 다층 아키텍처
- 비동기 메시지 통신
- 교차언어 지원 (Python, .NET)

---

### 6.6 Microsoft Magentic-One

**공식**: https://www.microsoft.com/en-us/research/articles/magentic-one-a-generalist-multi-agent-system-for-solving-complex-tasks/

**구조**: 오케스트레이터 + 4개 특화 에이전트
- **FileSurfer**: 파일 타입 처리
- **WebSurfer**: 브라우저 작업
- **Coder**: 프로그램 작성
- **ComputerTerminal**: 코드 실행

**능력**: 웹 작업, 파일 시스템, Python 스크립팅 (자동화된 복합 작업)

**모델 무관성**: 기본값 GPT-4o, 다른 LLM 통합 가능

**가용성**: Microsoft AutoGen 오픈소스 (2024년 11월)

---

## 7. 페이퍼클립 최대화자와 도구적 수렴

### 7.1 Nick Bostrom의 구상 (2014)

**저서**: "Superintelligence: Paths, Dangers, Strategies" (Oxford University Press, 2014)

**페이퍼클립 최대화자 사고실험** (Bostrom, 2003年 초출):
- 초지능 AI가 "종이클립 생산 최대화"라는 목표로 프로그래밍됨
- AI가 목표에 관계없이 모든 가용 자원(인간, 지구 물질)을 종이클립으로 변환

**Bostrom의 명확화**: 이것이 실제로 일어난다고 믿지 않으나, **초지능 기계를 설계할 때 무엇을 안전 장치로 프로그래밍할지 모르는 위험**을 강조.

### 7.2 도구적 수렴 (Instrumental Convergence)

**정의**: 최종 목표가 무엇이든, **충분히 지능높은 에이전트**는 다음 중간 목표를 추구할 경향이 있다:

1. **자기보존**: 목표 달성을 위해 계속 작동해야 함
2. **목표 보존**: 목표가 수정되지 않도록 방어
3. **인지 향상**: 더 지능높아져야 목표를 더 잘 달성
4. **기술 진전**: 더 많은 도구 필요
5. **자원 확보**: 목표 달성을 위해 에너지/계산력 필요

### 7.3 현대 도구적 수렴 대응: 에이전트 하네스 설계

**역사적 해답이 아닌, 엔지니어링 솔루션**:
- **샌드박스/격리**: 에이전트가 제한된 환경에서 실행
- **권한 제어**: 특정 도구/파일만 접근 가능
- **훅/의도적 포인트**: 작업 전에 사람이 승인
- **검증 루프**: 자기 수정을 모니터링하고 인간이 최종 결정

예: Claude Code의 조정 가능 자율성 (모든 작업 승인 ↔ 자동 분류)

---

## 8. 전망과 예측 (출처 기반만)

### 8.1 METR: 장기 작업 능력 측정 (2025)

**공식 보고서**: "Measuring AI Ability to Complete Long Tasks"
**발표**: 2025년 3월 19일
**공식 링크**: https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/

**방법론**: 인간 전문가가 완료하는 데 소요 시간 대비 AI 에이전트 성공률

**핵심 발견**:
- **역사적 추세**: 6년 동안 **7개월 배수**로 작업 길이 증가
- **현재 성능**: 4분 이내 작업 ≈ 100% 성공, 4시간 초과 ≈ <10% 성공
- **외삽 결과**: 10년 이내 AI 에이전트가 **주간/월간 범위 작업** 50% 신뢰도로 완료 가능

**2024–2025 데이터 조정**: 추정치를 약 **2.5년 단축**

---

### 8.2 Epoch AI 계산 스케일링 추정

**공식 사이트**: https://epoch.ai/

**최근 성장**:
- **연간 훈련 계산 성장**: 4–5배/년
- **AI 칩 생산 용량**: 2022 이후 3.3배/년

**2030년 프로젝션**:
- **범위**: 2×10²⁹ ~ 5×10³⁰ FLOP (GPT-4 대비 5,000–300,000배)
- **가능성**: 2×10²⁹ FLOP 훈련이 10년 이내 가능성 높음

**제약**:
- **1순위**: 전력 (4–16 기가와트 필요)
- **2순위**: 칩 제조 용량
- **3순위**: 광대역 네트워크

---

### 8.3 Dario Amodei "Machines of Loving Grace" (2024년 10월)

**공식 에세이**: https://www.darioamodei.com/essay/machines-of-loving-grace
**길이**: 14,000 단어

**"강력한 AI" 정의** (Amodei):
- 대부분 분야에서 Nobel Prize 수준 지능
- 수학 정리 증명, 소설 작성, 복잡 코드 작성 가능
- 수 시간–수주 범위 자율 작업 완료

**5가지 예측 카테고리**:

1. **생물학/의학** (가장 낙관적)
   - "압축된 21세기": 향후 50–100년 인간 생물학자 진전을 5–10년으로 압축
   - 거의 모든 감염병의 신뢰도 높은 예방/치료
   - 대부분 암 제거
   - 유전병 효과적 예방/치료

2. **과학 발견**
3. **경제적 생산성**
4. **정치/거버넌스**
5. **문화/예술**

**핵심 메시지**: 위험과 마찬가지로, AI의 상향 가능성을 과소평가하는 경향

---

### 8.4 Sam Altman "Three Observations" (2025년 2월)

**공식 블로그**: https://blog.samaltman.com/three-observations

**관찰 1: 지능의 로그 스케일링**
> "AI의 지능 ≈ 훈련 및 실행을 위해 사용된 자원의 로그" (주로 훈련 계산, 데이터, 추론 계산)

- 임의 자금으로 연속 예측 가능한 이득 달성 가능
- 스케일링 법칙이 여러 자리수에 걸쳐 정확함

**관찰 2: 10배 연간 비용 감소**
- GPT-4 토큰 비용: 2023년 초 → 2024년 중반 **150배 감소**
- **월 10배 감소** (Moore 법칙 월 2배 vs)

**관찰 3: 초지수적 가치 증가**
- 선형 지능 증가 = 슈퍼지수적 사회경제적 가치

**2035년 예측**:
> "모든 개인이 2025년 현재 인류 전체와 동등한 지적 능력에 접근 가능"

**소프트웨어 엔지니어 에이전트**:
- 경험 2년차 최고 기업 엔지니어 역량
- 작업 길이: 최대 수일

---

### 8.5 Anthropic Responsible Scaling Policy

**공식 정책**: https://www.anthropic.com/responsible-scaling-policy
**최신 버전**: 3.0 (2026년)

**핵심 원칙**: **비례적 보호 (Proportional Protection)**
- 위험이 커질수록 더 엄격한 안전장치

**AI Safety Level (ASL) 프레임워크**:
- ASL-1: 기본 능력
- ASL-2, -3, ...: 점진적 강화 (능력 증가에 따라)

**투명성**: 3.0 업데이트로 투명성 및 책임성 강화

---

## 9. 정직한 한계

### 9.1 METR 장기 작업 성능 저하

- 4시간 이상 작업: 현재 <10% 성공률
- 인간의 주간/월간 범위: 여전히 신뢰할 수 없음

### 9.2 할루시네이션율

**2025년 최고 성능** (Gemini 2.0-Flash-001): **0.7%**
**평균 프론티어 모델**: 5–15%
**도메인 특이성**:
- 법률 정보: 6.4%
- 의료 요약: 1.47% (할루시네이션) + 3.45% (누락)

**완화**: RAG 사용 시 **71% 감소**, 추론 기반 모델 **65% 감소**

### 9.3 SWE-bench 성능 정체 신호

- 2023: 4.4% 해결률
- 2024 연말: 62.2%
- 2025 최고: 73.2% (Tools + Claude 4 Opus)

**해석**: 여전히 향상 중이나, 전통 벤치(MMLU, GSM8k, HumanEval)는 포화

### 9.4 전문가 비판

[출처 미확인 — "The Bitter Lesson" (Sutton) 스타일의 비판 및 언어 모델의 근본적 한계에 대한 최근 학술 논쟁은 있으나, 기각하지 않는 확증 사례가 필요함]

---

## 10. 출처 (번호 매김)

### 기초 논문

1. [Vaswani et al. (2017) "Attention Is All You Need"](https://arxiv.org/abs/1706.03762)
2. [Bender et al. (2021) "On the Dangers of Stochastic Parrots"](https://dl.acm.org/doi/10.1145/3442188.3445922) — [PDF](https://s10251.pcdn.co/pdf/2021-bender-parrots.pdf)

### 자동화/자기개선 논문

3. [Zoph & Le (2017) "Learning Transferable Architectures" (NASNet)](https://arxiv.org/abs/1707.07012)
4. [AlphaZero (DeepMind 2017)](https://arxiv.org/abs/1712.01815)
5. [Bai et al. (2022) "Constitutional AI: Harmlessness from AI Feedback"](https://arxiv.org/abs/2212.08073) — [Anthropic 공식](https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback)
6. [Khattab et al. (2023) "DSPy"](https://arxiv.org/abs/2310.03714) — [GitHub](https://github.com/stanfordnlp/dspy)
7. [Sakana AI Scientist](https://arxiv.org/abs/2408.06292) — [공식 소개](https://sakana.ai/ai-scientist/)
8. [Madaan et al. (2023) "Self-Refine"](https://arxiv.org/abs/2303.17651) — [GitHub](https://github.com/madaan/self-refine)
9. [Yuan et al. (2024) "Self-Rewarding Language Models"](https://arxiv.org/abs/2401.10020)

### 코딩 에이전트

10. [Devin (Cognition AI, 2024년 3월)](https://cognition.ai/blog/introducing-devin)
11. [SWE-agent (Princeton NeurIPS 2024)](https://arxiv.org/abs/2405.15793) — [GitHub](https://github.com/SWE-agent/SWE-agent)
12. [OpenHands](https://arxiv.org/abs/2407.16741) — [공식](https://openhands.dev/) — [GitHub](https://github.com/OpenHands/OpenHands)
13. [Aider (Paul Gauthier)](https://github.com/paul-gauthier/aider)
14. [Claude Code (Anthropic)](https://www.anthropic.com/product/claude-code) — [GitHub](https://github.com/anthropics/claude-code)
15. [OpenAI Codex CLI](https://developers.openai.com/codex/cli) — [GitHub](https://github.com/openai/codex)
16. [Cursor IDE](https://cursor.com/)
17. [Replit Agent](https://docs.replit.com/replitai/agent)
18. [GitHub Copilot Agents](https://docs.github.com/en/copilot/concepts/agents/coding-agent/about-coding-agent)

### 멀티에이전트

19. [Claude Code Agent Teams](https://code.claude.com/docs/en/agent-teams)
20. [OpenAI Swarm (October 2024)](https://github.com/openai/swarm)
21. [LangGraph](https://github.com/langchain-ai/langgraph)
22. [CrewAI](https://github.com/crewAIInc/crewAI)
23. [Microsoft AutoGen](https://github.com/microsoft/autogen)
24. [Microsoft Magentic-One](https://www.microsoft.com/en-us/research/articles/magentic-one-a-generalist-multi-agent-system-for-solving-complex-tasks/)

### 인프라

25. [Google TPU v6 Trillium (May 2024)](https://cloud.google.com/blog/products/compute/introducing-trillium-6th-gen-tpus)
26. [Google TPU v7 Ironwood (April 2025)](https://blog.google/products/google-cloud/ironwood-tpu-age-of-inference/)
27. [Stargate (OpenAI/Microsoft/Oracle/SoftBank, January 2025)](https://openai.com/index/announcing-the-stargate-project/)
28. [xAI Colossus Memphis (2024–2025)](https://www.supermicro.com/CaseStudies/Success_Story_xAI_Colossus_Cluster.pdf)
29. [Anthropic-Google TPU Partnership (October 2025)](https://www.anthropic.com/news/expanding-our-use-of-google-cloud-tpus-and-services)
30. [Anthropic-Amazon Trainium Partnership](https://www.anthropic.com/news/anthropic-amazon-trainium)

### 위험과 한계

31. [Nick Bostrom "Superintelligence" (Oxford, 2014)](https://nickbostrom.com/) — [Wikipedia: Instrumental Convergence](https://en.wikipedia.org/wiki/Instrumental_convergence)
32. [Karpathy nanoGPT (GitHub)](https://github.com/karpathy/nanoGPT)

### 전망

33. [METR "Measuring AI Ability to Complete Long Tasks" (March 2025)](https://metr.org/blog/2025-03-19-measuring-ai-ability-to-complete-long-tasks/)
34. [Epoch AI Compute Scaling](https://epoch.ai/)
35. [Dario Amodei "Machines of Loving Grace" (October 2024)](https://www.darioamodei.com/essay/machines-of-loving-grace)
36. [Sam Altman "Three Observations" (February 2025)](https://blog.samaltman.com/three-observations)
37. [Anthropic Responsible Scaling Policy (v3.0, 2026)](https://www.anthropic.com/responsible-scaling-policy)

### 벤치마크/측정

38. [SWE-bench Leaderboard](https://www.swebench.com/)
39. [Vectara Hallucination Leaderboard](https://github.com/vectara/hallucination-leaderboard)
40. [LLM Hallucination Survey 2025](https://arxiv.org/abs/2510.06265)

---

**문서 완성일**: 2026년 4월 7일
**검증 방법**: 각 URL WebFetch 또는 WebSearch 1회 이상 확인
**문서 성격**: 기술 참고 자료. 한국 장문 에세이 (존댓말) 작성 시 인용 기초 자료.
