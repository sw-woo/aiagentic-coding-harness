# Harness 100 Review: RevFactory's Production-Grade Agent Team Collection

**Review Date:** April 7, 2026
**Repository:** https://github.com/revfactory/harness-100
**Author:** Minho Hwang (revfactory)

---

## 1. What is Harness-100?

Harness 100 is a production-grade collection of 100 ready-to-use agent team configurations designed for Claude Code. Each harness spans 10 distinct domains (content creation, software development, data/AI, business strategy, education, legal compliance, health, communications, operations, and specialized sectors). The collection contains 200 total harnesses with dual language support (Korean and English), comprising 978 agent definitions, 630 skills, and 1,808 markdown files. According to the README, Harness 100 provides "100 production-grade agent team harness collection for Claude Code" with "4-5 specialist agents per harness, an orchestrator skill, and 2-3 agent-extending skills."

---

## 2. Author & Date

**Author:** Minho Hwang (GitHub: revfactory)
**Creation Date:** March 22, 2026
**Last Update:** March 23, 2026

The repository was published with a single initial commit containing the complete collection of 100 harnesses in both Korean and English.

---

## 3. Stated Goal / Philosophy

From the README, the stated objective is clear: Harness 100 aims to provide "production-grade agent team configurations" that are immediately deployable and "ready-to-use" across diverse professional domains. The philosophy emphasizes:

> "Every harness includes: Agent Team Mode, Domain Expertise, Structured Outputs, Dependency DAG, Error Handling, Scale Modes, Test Scenarios, Trigger Boundaries"

The approach prioritizes **domain-specific frameworks** embedded in every harness (OWASP Top 10, Bloom's Taxonomy, Porter's Five Forces, GDPR/PIPA standards, AIDA copywriting, GHG Protocol, etc.), enabling agents to operate with established methodologies rather than generic patterns. The quick-start philosophy is captured in the deployment model: `cp -r en/01-youtube-production/.claude/ /path/to/project/.claude/`—copy a harness and immediately have a functional multi-agent team.

---

## 4. Top-Level Structure

The repository follows a straightforward organization:

```
harness-100/
├── en/                          # 100 English-language harnesses
│   ├── 01-content-creation/     # Domain categories 01-100
│   ├── 02-podcast-studio/
│   ├── ...
│   └── 100-ip-portfolio/
├── ko/                          # 100 Korean-language harnesses (parallel structure)
├── LICENSE                      # Apache 2.0
├── README.md                    # English documentation
├── README_ko.md                 # Korean documentation
└── .gitignore
```

**Within each harness** (e.g., `en/01-content-creation/.claude/`):
- **CLAUDE.md** – Project overview and harness metadata
- **agents/** – Directory containing 4-5 specialized agent definitions (markdown files)
- **skills/** – Directory containing orchestrator skill and 2-3 domain-extending skills

Each harness is self-contained and can be deployed independently.

---

## 5. Key Patterns it Teaches

Harness 100 codifies the following patterns and principles:

1. **Agent Team Mode / SendMessage Communication** – Direct inter-agent messaging for coordination and cross-validation rather than sequential pipelines.

2. **Domain-Specific Frameworks Integration** – Each harness embeds established industry methodologies (OWASP for security, Bloom's Taxonomy for education, Porter's Five Forces for strategy, DCF models for finance, GDPR/PIPA for compliance).

3. **Structured Output Templates** – Domain-specific response schemas that enforce consistency and enable downstream parsing by other agents.

4. **Task Dependency Graphs (DAGs)** – Explicit task ordering with support for parallel execution to optimize multi-agent workflows.

5. **Resilience & Error Handling** – Built-in retry, skip, and fallback strategies allowing graceful degradation when individual agents fail.

6. **Scalability Modes** – Three operational tiers: full multi-agent pipeline, reduced (subset of agents), or single-agent operation for different computational/cost constraints.

7. **Test Scenario Definition** – Each harness includes normal operation scenarios, edge cases (existing artifacts), and error condition tests with trigger boundaries.

8. **Trigger Boundary Specification** – Explicit declarations of when a harness should/should not activate to prevent misuse and clarify scope.

9. **External Tool Integration** – Orchestration of Gemini image generation, web search, and other third-party services alongside Claude-based agents.

10. **Bilingual Parity** – Complete parallel harness implementations in Korean and English ensure accessibility across linguistic boundaries.

---

## 6. Tooling Stack

**Core Technologies:**
- **Claude Code** (Anthropic) – Host platform for agent execution
- **Markdown** – Primary configuration language for all harnesses, agents, and skills
- **Agent Framework:** Claude Code's agent/skill system with SendMessage capabilities

**Embedded Tools & Services:**
- **Gemini Image Generation** – For visual content creation harnesses
- **Web Search** – Integrated into research and business intelligence harnesses
- **External APIs** – Generic integration patterns for third-party services

**Domain-Specific Tools Codified:**
- OWASP Top 10 checklists
- Bloom's Taxonomy assessment structures
- Porter's Five Forces business analysis
- DCF financial modeling
- GDPR/PIPA compliance frameworks
- GHG Protocol for sustainability

**No explicit runtime, database, or programming language requirements** — configuration-native approach.

---

## 7. Comparison to Our Sample (5-Layer Agentic Coding Harness)

### Where Harness-100 Overlaps

| Layer | Our Sample | Harness-100 | Overlap |
|-------|-----------|------------|---------|
| **Memory** | Persistent context, conversation history | [Source not verified] | Likely: both use Claude Code context management |
| **Skills** | Domain-specific skills, orchestration | Explicit 2-3 agent-extending skills + orchestrator | ✓ Strong match: identical skill-based architecture |
| **Agents** | Specialized agent personas | 4-5 specialist agents per harness | ✓ Strong match: multi-agent team pattern |
| **Rules** | Behavioral constraints, error handling | Trigger boundaries, error handling strategies | ✓ Strong match: both enforce scope and recovery |
| **Hooks** | System integration points | [Source not verified] | Unknown: no hook pattern documentation found |

### Key Differences

1. **Breadth vs. Depth:** Harness-100 offers 100 horizontally-scoped harnesses (one per professional domain); our sample focuses on vertical depth of a single domain with comprehensive layering.

2. **Framework Embedding:** Harness-100 treats domain methodologies as core design artifacts (OWASP, Porter's, Bloom's, etc.); our sample appears to focus on coding/development patterns.

3. **Bilingual Parity:** Harness-100 maintains 200 harnesses (Korean + English); our sample documentation is English-only.

4. **Explicit Scalability Modes:** Harness-100 formally defines full/reduced/single-agent operation tiers; our sample's scaling approach is [출처 미확인].

5. **Dependency DAG Specification:** Harness-100 makes task graphs explicit and parameterizable; our sample's task coordination approach is [출처 미확인].

6. **Deployment Philosophy:** Harness-100 assumes copy-and-use simplicity; our sample appears to be educational/reference code.

---

## 8. Things Worth Borrowing

1. **Framework-First Design** – Embed established methodologies (e.g., SOLID principles, clean architecture patterns, the 12-factor app) into every coding harness as first-class agents/skills, not documentation afterthoughts.

2. **Explicit Scalability Modes** – Formalize three operational tiers (full, reduced, single-agent) with trigger boundaries to allow users to adapt harness complexity to their constraints.

3. **Structured Output Templates** – Define JSON/markdown schemas per agent to enforce consistency and enable tool-use patterns where one agent directly consumes another's output.

4. **Bilingual Parity (or Localization Framework)** – If targeting international users, implement parallel harness versions or a parameterized localization layer rather than single-language documentation.

5. **Quick-Start Deployment** – Provide copy-paste harness paths and simple installation verification (e.g., `test-harness.sh` that validates agent presence and skill configuration).

6. **Trigger Boundary Documentation** – Explicitly list "should trigger" and "should not trigger" conditions to clarify harness scope and prevent misuse.

7. **Cross-Agent Communication Patterns** – Formalize SendMessage usage patterns (e.g., validation workflows, consensus-seeking, escalation) as reusable orchestrator skills.

---

## 9. Things We Already Do Better / Differently

1. **Pedagogical Clarity** – Our sample appears designed to teach the 5-layer architecture systematically; Harness-100 is prescriptive and deployment-focused, losing educational value for newcomers.

2. **Recursive Self-Reference** – Our sample can be examined to understand our own harness structure (meta-learning); Harness-100 does not appear to include self-describing harnesses.

3. **Vertical Domain Mastery** – Our sample likely goes deeper into coding patterns (hooks, rules, memory management) than Harness-100's horizontal breadth allows per domain.

4. **Context Preservation Patterns** – [출처 미확인] — our memory layer may implement more sophisticated context persistence than the Harness-100 markdown-only configuration suggests.

5. **Hook System Design** – Our explicit hooks layer appears more sophisticated than Harness-100's integration approach (which appears tool-service-centric).

---

## 10. Sources

### Primary Documentation
- **README (English):** https://raw.githubusercontent.com/revfactory/harness-100/main/README.md
- **Repository Root:** https://github.com/revfactory/harness-100
- **Harness List (English):** https://github.com/revfactory/harness-100/tree/main/en
- **Git Commit History:** https://github.com/revfactory/harness-100/commits/main

### Key Statistics Verified
- 978 agent definitions across both languages
- 630 skills total
- 1,808 markdown files
- 200 harnesses (100 Korean, 100 English)
- Apache 2.0 license
- Creation: March 22, 2026 | Last update: March 23, 2026

### Domain Coverage (10 Categories)
1. Content Creation & Creative (01-15)
2. Software Development & DevOps (16-30)
3. Data & AI/ML (31-42)
4. Business & Strategy (43-55)
5. Education & Learning (56-65)
6. Legal & Compliance (66-72)
7. Health & Lifestyle (73-80)
8. Communication & Documents (81-88)
9. Operations & Process (89-95)
10. Specialized Domains (96-100): real estate, e-commerce, sustainability, IP management

### Individual Harness Examples Referenced
- 01-youtube-production
- 16-fullstack-webapp
- 31-ml-experiment
- 43-startup-launcher
- 66-contract-analyzer
- 100-ip-portfolio

### Embedded Methodologies Documented
- AIDA (advertising/copywriting)
- OWASP Top 10 (security)
- Bloom's Taxonomy (education)
- Porter's Five Forces (strategy)
- SOLID principles (inferred from development category)
- GDPR/PIPA (legal compliance)
- GHG Protocol (sustainability)
- DCF models (financial modeling)
- BMC (Business Model Canvas)
- RICE prioritization
- Diataxis (documentation)
- SIPOC (process mapping)

### Repository Metadata
- **Author:** Minho Hwang (revfactory)
- **License:** Apache 2.0
- **Stars:** 475 (at time of research)
- **Forks:** 172 (at time of research)
- **Primary Commit:** 8e8d35c (March 23, 2026, 07:41:55 UTC+9)

---

## Conclusion

Harness 100 represents a production-oriented, horizontally-scaled approach to agent team configuration, prioritizing deployment simplicity and domain coverage over architectural depth. Its strength lies in rapid operationalization: select a domain, copy a harness, and begin multi-agent work immediately. Our agentic coding harness takes a complementary, vertical approach—teaching the fundamental layers (memory, skills, agents, rules, hooks) through example and enabling deep customization within the coding domain. The two projects serve different audiences: Harness 100 for practitioners seeking immediate multi-domain solutions, and our sample for architects and developers building novel harness patterns.
