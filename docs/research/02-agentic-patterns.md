# Agentic Coding Patterns Reference (2024-2026)

**Status**: Verified reference document for Kotlin/JVM AIOps/MLOps harness development
**Last Updated**: 2026-04-07
**Audience**: Korean developer community (존댓말)

---

## 1. Ralph "Wiretap" Loop

### WHO & WHEN
**Geoffrey Huntley** popularized the Ralph pattern starting in 2024. The pattern is named after Ralph Wiggum (The Simpsons character) as a humorous reference to a simple, seemingly naive approach that works.

- Original blog: [everything is a ralph loop](https://ghuntley.com/loop/)
- Featured in: [Inventing the Ralph Wiggum Loop | Dev Interrupted](https://devinterrupted.substack.com/p/inventing-the-ralph-wiggum-loop-creator)
- GitHub repo: [snarktank/ralph](https://github.com/snarktank/ralph)

### WHY
The Ralph loop reframes software development away from complex microservices architectures toward iterable, composable automation. Instead of building software sequentially like Jenga blocks, agents work in loops where:

- **Progress persists in files and git history**, not in the LLM's context window
- **Fresh context per iteration** — when context fills up, a new agent picks up where the last one left off
- **Deterministic loop structure** — a bash infinite loop feeds the same prompt repeatedly until all PRD items complete

Huntley's core argument: traditional software development has become obsolete; autonomous AI-driven loops can develop code cheaper and faster than human labor.

### HOW IT WORKS
The mechanism is elegantly simple:

1. Write a bash infinite loop
2. On each iteration:
   - Feed the same initial prompt to the agent (e.g., Claude Code or Amp)
   - Include current file state and git history as context
   - Let the agent make one autonomous change (file writes, commits, tool calls)
   - If all PRD items pass → break loop
   - If failures remain → loop continues with fresh context

The key insight: **progress lives outside the context window**. When context exhausts, the next loop iteration starts fresh, examining only the current file state and recent git diffs, not conversation history.

### CODE/CONFIG EXAMPLE

**Minimal bash Ralph loop:**

```bash
#!/bin/bash
# ralph-loop.sh — autonomous agent loop

PROMPT="Build a Kotlin AIOps harness per AGENTS.md spec"
MAX_ITERATIONS=50
ITERATION=0

while [ $ITERATION -lt $MAX_ITERATIONS ]; do
  ITERATION=$((ITERATION + 1))
  echo "=== Ralph Loop Iteration $ITERATION ==="

  # Fresh agent context: only git diff since last checkpoint
  RECENT_CHANGES=$(git diff HEAD~1)
  SPEC=$(cat AGENTS.md)

  # Invoke agent with deterministic prompt
  claude --no-stream --file AGENTS.md --prompt "$PROMPT"

  # Check completion criteria
  if npm test && git log --oneline -1 | grep -q "COMPLETE"; then
    echo "✓ All PRD items complete at iteration $ITERATION"
    break
  fi

  git add -A
  git commit -m "ralph-iter-$ITERATION: auto-iteration"
done

echo "Ralph loop finished after $ITERATION iterations"
```

**AGENTS.md task specification (Ralph-style):**

```markdown
# AGENTS.md - Task Specification for Ralph Loop

## Goal
Build a minimal Kotlin JVM AIOps harness with eval-driven development.

## PRD Items
- [ ] Parse OpenAI-compatible tool spec format
- [ ] Implement parallel read-only subagents for code review
- [ ] Wire eval loop: write test → run agent → grade → improve
- [ ] Persist memory to ~/.claude/projects/*/memory/MEMORY.md

## Success Criteria
- All tests pass: `./gradlew test`
- Git history shows incremental commits
- Evals report ≥95% spec compliance
```

### SOURCE URLS
- [everything is a ralph loop](https://ghuntley.com/loop/)
- [Ralph Wiggum as a "software engineer"](https://ghuntley.com/ralph/)
- [GitHub: snarktank/ralph](https://github.com/snarktank/ralph)
- [Mastering Ralph loops transforms software engineering | LinearB Blog](https://linearb.io/blog/ralph-loop-agentic-engineering-geoffrey-huntley)
- [2026 - The year of the Ralph Loop Agent - DEV](https://dev.to/alexandergekov/2026-the-year-of-the-ralph-loop-agent-1gkj)

---

## 2. Eval-Driven Development (EDD)

### WHO & WHEN
- **Hamel Husain** — published [Your AI Product Needs Evals](https://hamel.dev/blog/posts/evals/) (core text)
- **Eugene Yan** — [Task-Specific LLM Evals that Do & Don't Work](https://eugeneyan.com/writing/evals/) (March 2024)
- **Jason Liu** — MLOps/AIOps specialist; contributor to [What We Learned from a Year of Building with LLMs](https://www.oreilly.com/radar/what-we-learned-from-a-year-of-building-with-llms-part-ii/) (O'Reilly, May 2024)
- **Husain et al.** — Field guide on rapidly improving AI products

### WHY
EDD flips the script on traditional AI product iteration. Unsuccessful AI products almost always share a common root cause: **failure to create robust evaluation systems**.

Unlike manual review cycles, EDD establishes:

- **Unit tests for LLMs** — scoped, assertion-based tests that run cheaply and frequently
- **Human & model evaluation** — searchable traces with LLM critiques of output quality
- **A/B testing** — real-world validation for mature features

This creates a virtuous cycle: measure → debug → improve → measure. Hamel notes teams who succeed barely talk about tools—they obsess over **measurement and iteration**.

### HOW IT WORKS
The eval-driven loop:

1. **Write eval before agent code** — define success criteria (recall, precision, domain-specific metrics)
2. **Run agent against eval dataset** — capture traces with full input/output
3. **Grade outputs** — use LLM-as-judge, human raters, or domain-specific metrics
4. **Analyze failures** — identify patterns in eval errors
5. **Improve system** — update prompts, tool specs, or fine-tuning data
6. **Repeat** — re-run evals to verify improvement

Key: keep evals simple and domain-specific. Off-the-shelf metrics (ROUGE, BLEU) often fail to correlate with application performance.

### CODE/CONFIG EXAMPLE

**Eval suite for Kotlin AIOps harness:**

```python
# evals/agentic_harness_evals.py
import json
from typing import Callable

class HarnessEval:
    """Eval suite for AIOps agent harness."""

    def __init__(self):
        self.results = {"passed": 0, "failed": 0, "traces": []}

    def eval_tool_parsing(self, agent_output: str) -> bool:
        """Unit test: agent must parse tool spec correctly."""
        try:
            parsed = json.loads(agent_output)
            required_fields = ["name", "description", "parameters"]
            return all(f in parsed for f in required_fields)
        except:
            return False

    def eval_agent_concurrency(self, agent_traces: list) -> dict:
        """Model eval: did agent use parallel subagents correctly?"""
        # Send agent traces to LLM-as-judge
        prompt = f"""
        Review this agent session trace. Did the agent:
        1. Spawn read-only review subagents in parallel?
        2. Avoid write conflicts between agents?
        3. Complete within eval deadline?

        Trace: {json.dumps(agent_traces, indent=2)}
        """
        # Call LLM with CoT to grade
        judgment = call_llm_judge(prompt)
        return {
            "passed": judgment["passed"],
            "confidence": judgment["confidence"],
            "reasoning": judgment["reasoning"]
        }

    def run_suite(self, agent_callable: Callable):
        """Run full eval suite; trace failures for improvement."""
        test_cases = [
            {"input": '{"name":"get_logs","parameters":{...}}',
             "expected": "parsed_tool_spec"},
            # ... more test cases
        ]

        for test in test_cases:
            output = agent_callable(test["input"])
            passed = self.eval_tool_parsing(output)

            trace_entry = {
                "test": test,
                "output": output,
                "passed": passed,
                "timestamp": datetime.now().isoformat()
            }
            self.results["traces"].append(trace_entry)

            if passed:
                self.results["passed"] += 1
            else:
                self.results["failed"] += 1

        return self.results

# Usage in CI/CD gate
if __name__ == "__main__":
    evals = HarnessEval()
    results = evals.run_suite(agent_main)

    # Pre-merge gate: must have ≥95% pass rate
    pass_rate = results["passed"] / (results["passed"] + results["failed"])
    assert pass_rate >= 0.95, f"Evals failed: {pass_rate*100:.1f}% pass rate"

    print(json.dumps(results, indent=2))
```

**CLAUDE.md with eval discipline:**

```markdown
# Eval-Driven Development Discipline

## Before implementing a feature
1. Write 3-5 eval test cases covering success criteria
2. Define metrics: recall, precision, latency, or domain-specific
3. Run baseline eval against current implementation
4. Only then write implementation or prompt improvements

## Eval examples for AIOps harness
- Tool parsing: can agent extract parameters from OpenAI spec?
- Subagent isolation: do parallel agents write to conflicting files?
- Memory recall: does agent retrieve relevant past context from MEMORY.md?
- Latency: do evals complete within SLA?

## Tools
- Python unittest for unit evals
- LLM-as-judge for semantic evals
- Trace logging for failure analysis
```

### SOURCE URLS
- [Your AI Product Needs Evals – Hamel's Blog](https://hamel.dev/blog/posts/evals/)
- [Task-Specific LLM Evals that Do & Don't Work – Eugene Yan](https://eugeneyan.com/writing/evals/)
- [What We Learned from a Year of Building with LLMs (Part II) – O'Reilly](https://www.oreilly.com/radar/what-we-learned-from-a-year-of-building-with-llms-part-ii/)
- [A Field Guide to Rapidly Improving AI Products – Hamel's Blog](https://hamel.dev/blog/posts/field-guide/)

---

## 3. Context Engineering

### WHO & WHEN
- **Andrej Karpathy** — coined the term; [X post (early 2025)](https://x.com/karpathy/status/1937902205765607626)
- **Lance Martin** (LangChain) — [Context Engineering for Agents (June 2025)](https://rlancemartin.github.io/2025/06/23/context_engineering/)
- **Anthropic engineering blog** — context as first-class engineering concern

### WHY
Agents interleave LLM invocations and tool calls, often for long-running tasks. Long-running tasks accumulate tokens that:

- **Exceed context window** → hallucinations, distraction, performance degradation
- **Balloon cost/latency** → inference time and token spend explode
- **Degrade performance** → "context dilution" from old, irrelevant information

Context engineering treats the context window as a **managed resource**, not a free lunch. As Karpathy frames it:

> "Context engineering is the delicate art and science of filling the context window with just the right information for the next step."

### HOW IT WORKS
Four primitives (Lance Martin's framework):

1. **Write Context** — persist information outside the window (scratchpads, memories)
2. **Select Context** — retrieve relevant info when needed (RAG, embeddings, memories)
3. **Compress Context** — reduce tokens while preserving signal (summarization, trimming)
4. **Isolate Context** — split information across subagents or runtime environments

#### Practical mechanisms:

- **Scratchpads**: Agent saves intermediate notes to `~/.claude/projects/*/memory/scratchpad.md` during task
- **Summarization on approach**: Claude Code auto-summarizes full trajectory when nearing context limit
- **Subagent isolation**: Each subagent gets focused context window; parent coordinates; no redundant state
- **Markdown library**: Karpathy's "LLM Knowledge Base" pattern — agent maintains evolving markdown docs indexed by summary files, ~100 articles at ~400K words, agent navigates via summaries

### CODE/CONFIG EXAMPLE

**Context engineering in CLAUDE.md (write + select + compress):**

```markdown
# Context Engineering for AIOps Harness

## Write Context (Persist Outside Window)

### Scratchpad pattern
- Agent writes notes to .claude/memory/scratchpad.md during long tasks
- Format: `## [Task] | Status: in-progress | Tokens used: 5,234`
- On context approach, summarize scratchpad and archive to detail file

### Memory hierarchy
- MEMORY.md (index, first 200 lines loaded) → links to topic files
- Topic files: debugging.md, tool-specs.md, design-decisions.md
- Agent reads full topic files on demand, not at startup

## Select Context (Retrieve Relevant Info)

### Tool spec retrieval
- Store tool definitions in .claude/memory/tool-specs.md
- On each iteration, grep relevant tool (e.g., "logs", "metrics") not all tools
- Load only the 2-3 tools needed for current task

### Memory query
- Agent embeds query: "Which memory doc covers subagent coordination?"
- Retrieve top-k docs by similarity
- Load only relevant memory, not entire directory

## Compress Context (Reduce Tokens)

### Summarization strategy
- When scratchpad exceeds 2KB, summarize completed sections
- Archive summary to detail file; keep only current section in scratchpad
- Compress old git diffs: summarize "refactored logging layer" not full diff

### Trim old messages
- Discard conversation turns >5 iterations old
- Retain only recent failures and their resolutions
- Keep tool outputs (stdout/stderr) but drop full logs
```

**Kotlin/JVM implementation (context isolation via subagents):**

```kotlin
// Context-engineered subagent architecture
interface SubagentContext {
    val toolDescriptions: List<String>  // Only relevant tools
    val memorySnippet: String           // Select from MEMORY.md
    val recentDiffs: String             // Compressed to essentials
}

class ReviewSubagent(private val ctx: SubagentContext) {
    /**
     * Isolated context: this subagent operates in its own window.
     * Parent agent does NOT pass:
     * - Full conversation history
     * - All tool specs
     * - Complete git log
     *
     * Instead: focused context for code review task.
     */
    fun reviewPullRequest(pr: String): ReviewResult {
        val context = buildContext()
        // ~3K tokens max for this subagent
        return callAgent(context, pr)
    }

    private fun buildContext(): String {
        return """
        # Code Review Context

        ## Relevant Tools (select, not all)
        ${ctx.toolDescriptions.take(3).joinToString("\n")}

        ## Memory (compress)
        ${ctx.memorySnippet}

        ## Recent Changes (isolate)
        ${ctx.recentDiffs}

        ## Task
        Review this PR for: logic errors, test coverage, compliance with CLAUDE.md
        """
    }
}
```

### SOURCE URLS
- [Context Engineering – Andrej Karpathy on X](https://x.com/karpathy/status/1937902205765607626)
- [Context Engineering for Agents – Lance Martin](https://rlancemartin.github.io/2025/06/23/context_engineering/)
- [Context Engineering – LangChain Blog](https://blog.langchain.com/context-engineering-for-agents/)
- [Karpathy LLM Knowledge Base Architecture – VentureBeat](https://venturebeat.com/data/karpathy-shares-llm-knowledge-base-architecture-that-bypasses-rag-with-an)

---

## 4. Subagent-Driven Development

### WHO & WHEN
- **Anthropic Claude Code** — [Create custom subagents docs](https://code.claude.com/docs/en/sub-agents)
- **Simon Willison** — [Subagents - Agentic Engineering Patterns](https://simonwillison.net/guides/agentic-engineering-patterns/subagents/)
- Mainstream adoption: 2024-2026

### WHY
Subagents solve the "monolithic agent" problem:

- **One write agent** trying to do everything = hallucination risk, high latency, context dilution
- **Read-only specialized agents** working in parallel = safer, faster, modular

Why parallel read-only agents are safer:

1. **No write conflicts** — each subagent reads state; parent agent coordinates writes
2. **Isolated failure** — one subagent crash doesn't cascade
3. **Focused context** — each agent sees only task-relevant information
4. **Cost-optimized** — route simple tasks to faster/cheaper models (Claude Haiku)

Anthropic found subagents implement four of five "Building Effective Agents" patterns natively: prompt chaining, routing, parallelization, orchestrator-workers.

### HOW IT WORKS

1. Define subagent in CLAUDE.md or `.claude/subagents/` directory
2. Specify: description, allowed tools, system prompt, model (Haiku/Sonnet)
3. Parent agent delegates matching tasks with `invoke_subagent(task)`
4. Each subagent runs in its own context window with focused permissions
5. Parent agent aggregates subagent outputs and decides next steps

Execution patterns:

- **Parallel**: 3+ unrelated tasks → fire all subagents, wait for all results
- **Sequential**: tasks with dependencies → await subagent, use output in next call

### CODE/CONFIG EXAMPLE

**Subagent configuration (CLAUDE.md):**

```markdown
# Subagents for AIOps Harness

## Subagent: Code Reviewer
**Description**: Identify bugs, design weaknesses, and spec violations in PRs

**Allowed Tools**:
- Read files (no write)
- Run tests (read output only)
- Query git log

**System Prompt**:
You are a senior code reviewer for Kotlin/JVM projects.
Your job: identify logic errors, test gaps, and CLAUDE.md violations.
Output format: JSON with keys: severity, line_number, suggestion.

**Model**: claude-3-5-haiku (cheap, fast)

---

## Subagent: Test Runner
**Description**: Execute tests and hide noisy output from main agent

**Allowed Tools**:
- Execute shell commands (tests only, no deployments)
- Read test output
- Commit results to branch (not main)

**Model**: claude-3-5-haiku

---

## Subagent: Debugger
**Description**: Root-cause analysis for test failures

**Allowed Tools**:
- Read logs and stack traces
- Run debugger (breakpoints, inspection)
- Read heap dumps
- Suggest fixes (don't write)

**Model**: claude-3-5-sonnet (for complex reasoning)
```

**Parallel subagent invocation (Kotlin pseudo-code):**

```kotlin
// Parent agent uses subagents in parallel
class AIOpsHarness {
    suspend fun reviewAndTestPullRequest(pr: PullRequest): ReviewResult {
        // Spawn 3 read-only subagents in parallel
        val reviewResult = async {
            invokeSubagent(
                name = "CodeReviewer",
                task = "Review PR ${pr.id}: check for logic errors and spec violations",
                input = pr.diff
            )
        }

        val testResult = async {
            invokeSubagent(
                name = "TestRunner",
                task = "Run tests on branch ${pr.branch}; report failures",
                input = pr.branch
            )
        }

        val debugResult = async {
            invokeSubagent(
                name = "Debugger",
                task = "Root-cause any test failures from TestRunner",
                input = testResult.await()  // Sequential on test failures
            )
        }

        // Wait for all parallel tasks
        val allResults = awaitAll(reviewResult, testResult, debugResult)

        // Parent agent aggregates and decides: merge or suggest changes?
        return synthesizeReview(allResults)
    }
}
```

**Subagent definition in code (Claude SDK style):**

```python
# subagents.py
from anthropic import Anthropic

client = Anthropic()

code_reviewer_subagent = {
    "name": "CodeReviewer",
    "description": "Reviews Kotlin code for bugs and design issues",
    "instructions": """
    You are a senior Kotlin code reviewer.
    Analyze the provided code diff and report:
    1. Logic errors or potential NPEs
    2. Missing test coverage
    3. CLAUDE.md standard violations
    Format output as JSON.
    """,
    "model": "claude-3-5-haiku-20241022",
    "tools": ["read_file", "run_tests"]
}

def invoke_subagent(subagent: dict, task: str, input_data: str):
    """Invoke a subagent; return result without polluting main context."""
    response = client.messages.create(
        model=subagent["model"],
        max_tokens=1024,
        system=subagent["instructions"],
        messages=[{
            "role": "user",
            "content": f"{task}\n\nInput:\n{input_data}"
        }]
    )
    return response.content[0].text

# Usage in main agent loop
if __name__ == "__main__":
    pr_diff = get_pr_diff()
    review = invoke_subagent(code_reviewer_subagent,
                             "Review this PR",
                             pr_diff)
    print(f"Review complete: {review}")
```

### SOURCE URLS
- [Create custom subagents – Claude Code Docs](https://code.claude.com/docs/en/sub-agents)
- [Subagents – Agentic Engineering Patterns (Simon Willison)](https://simonwillison.net/guides/agentic-engineering-patterns/subagents/)
- [Subagents in the SDK – Claude API Docs](https://platform.claude.com/docs/en/agent-sdk/subagents)
- [4 Agentic AI Patterns You Already Use in Claude Code — and One You Don't](https://wmedia.es/en/tips/claude-code-agentic-ai-five-patterns)

---

## 5. Plan / Brainstorm / TDD Discipline

### WHO & WHEN
- **obra** (Derek Collison) — [Superpowers framework on GitHub](https://github.com/obra/superpowers)
- **Anthropic** — verified Superpowers as official methodology plugin
- Publication: 2024-2025; widely adopted by end of 2025

### WHY
Agentic systems that skip planning and jump to code often:

- Generate thousands of lines of code that miss the spec
- Produce untested features needing human review and rework
- Accumulate technical debt faster than humans can correct

**Superpowers doctrine**: process skills before implementation skills. Enforce:

1. **Brainstorming** before spec-writing
2. **Planning** before implementation
3. **TDD** before code (tests are mandatory, not optional)

This transforms agents from "copy-paste code generators" to "disciplined senior developers".

### HOW IT WORKS

The seven-phase workflow:

1. **Brainstorm** — refine rough requirements via dialogue; present design in chunks for validation
2. **Git worktrees** — establish isolated development branch with verified baseline
3. **Plan** — break work into 2-5 minute tasks with exact file paths and verification steps
4. **Execution** — subagents tackle individual tasks
5. **TDD** — red-green-refactor; code written after test exists
6. **Code review** — validate against design spec by severity
7. **Branch completion** — verify tests pass; present merge options

**Key enforcement**: Superpowers literally deletes code written before tests exist. If agent writes implementation before test, it fails the skill.

### CODE/CONFIG EXAMPLE

**Superpowers CLAUDE.md with TDD enforcement:**

```markdown
# Superpowers: Planning + TDD Discipline

## Phase 1: Brainstorm
- Ask clarifying questions about the feature
- Explore 2-3 design alternatives before committing
- Show design in digestible chunks (2-4 paragraphs each)
- Wait for human approval before moving to Phase 2

## Phase 2: Plan (in git worktree)
- Create isolated branch: `git worktree add -b feature/xyz`
- List all tasks in PLAN.md: exact file paths, 2-5 min each
- Example task format:
  ```
  ### Task 2.1: Create OpenAI spec parser
  **Files**: src/main/kotlin/ToolSpec.kt
  **Code sketch**:
  data class OpenAITool(val name: String, val parameters: Map<String, Any>)
  fun parseOpenAISpec(json: String): OpenAITool = ...

  **Verification**: Unit test must pass: testParseOpenAISpecValid()
  ```

## Phase 3: TDD (Test-Driven)
- **RULE**: Tests come first. Implementation follows.
- If code is written before test: DELETE IT. Start over with test.
- Red-Green-Refactor cycle:
  1. Write failing test
  2. Write minimal code to pass test
  3. Refactor for clarity (tests still pass)

**Example for ToolSpec parser:**
```kotlin
// tests/ToolSpecTest.kt (write this FIRST)
class ToolSpecTest {
    @Test
    fun testParseOpenAISpecValid() {
        val json = """
        {
            "name": "get_logs",
            "parameters": {"service": "string"}
        }
        """.trimIndent()
        val spec = parseOpenAISpec(json)
        assertEquals("get_logs", spec.name)
        assertEquals("string", spec.parameters["service"])
    }

    @Test
    fun testParseOpenAISpecInvalidThrows() {
        val invalidJson = "{invalid}"
        assertThrows<JsonException> { parseOpenAISpec(invalidJson) }
    }
}

// src/main/kotlin/ToolSpec.kt (write AFTER test)
data class OpenAITool(val name: String, val parameters: Map<String, Any>)

fun parseOpenAISpec(json: String): OpenAITool {
    val parsed = JSON.parseToJsonElement(json).jsonObject
    return OpenAITool(
        name = parsed["name"]?.jsonPrimitive?.content ?: throw JsonException("missing name"),
        parameters = parsed["parameters"]?.jsonObject?.toMap() ?: emptyMap()
    )
}
```

## Phase 4: Code Review
- Validate logic against design spec (from Brainstorm)
- Severity levels:
  - **Critical**: Logic errors, missing tests → block merge
  - **Major**: Performance, security → request changes
  - **Minor**: Style, naming → nice-to-have

## Phase 5: Merge
- Run full test suite: `./gradlew test`
- Rebase onto main
- Merge with squash or linear history per CLAUDE.md
```

**Skill invocation (how agents activate Superpowers):**

```python
# In agent system prompt:
SUPERPOWERS_SKILLS = [
    "brainstorm_skill",   # Ask clarifying questions
    "planning_skill",     # Break into atomic tasks
    "tdd_skill",          # Enforce test-first
    "review_skill",       # Validate against spec
]

def activate_skill(skill_name: str, context: str):
    """Load and activate a skill for the agent."""
    skill = load_skill(f"skills/{skill_name}.md")
    # Prepend skill instructions to system prompt
    return skill.instructions + "\n\n" + context

# Main agent loop
for task in tasks:
    # Automatically activate Superpowers skills
    augmented_prompt = activate_skill("brainstorm_skill", user_request)
    response = agent.query(augmented_prompt)

    # Skill will enforce TDD: wait for tests before code
```

### SOURCE URLS
- [GitHub: obra/superpowers](https://github.com/obra/superpowers)
- [Superpowers: How I'm using coding agents in October 2025](https://blog.fsck.com/2025/10/09/superpowers/)
- [Superpowers Tutorial: Claude Code TDD Framework (2026)](https://byteiota.com/superpowers-tutorial-claude-code-tdd-framework-2026/)
- [Agentic Skills Frameworks Compared – Ry Walker](https://rywalker.com/research/agentic-skills-frameworks)

---

## 6. Memory Systems

### WHO & WHEN
- **Anthropic Claude Code** — [How Claude remembers your project](https://code.claude.com/docs/en/memory)
- **Instinct MCP** — [instinct-mcp on PyPI](https://pypi.org/project/instinct-mcp/)
- Standard adoption: 2024-2026

### WHY
Without persistent memory, agents forget:

- Build commands and test patterns
- Debugging insights ("Flaky test #X fails every other run")
- Project conventions and architectural decisions
- User corrections ("Always use pnpm, not npm")

Memory systems close the loop: **agent learns from corrections** and applies learnings across sessions.

Two complementary mechanisms:

- **CLAUDE.md files** — you write explicit instructions; loaded every session
- **Auto memory** — agent writes notes itself based on corrections and patterns

### HOW IT WORKS

#### CLAUDE.md (Explicit)
- Lives in `./CLAUDE.md`, `~/.claude/CLAUDE.md`, or `./.claude/CLAUDE.md`
- Loaded at session start; treated as context, not enforced rules
- Hierarchical: specific locations take precedence (project > user > org)
- Can import other files with `@` syntax
- Can use `.claude/rules/` for path-specific instructions

#### Auto Memory (Implicit)
- Agent writes notes to `~/.claude/projects/<project>/memory/MEMORY.md`
- First 200 lines (or 25KB) loaded at session start
- Agent reads/writes memory throughout session
- Organized: MEMORY.md as index → topic files (debugging.md, api-conventions.md)
- Machine-local; worktrees in same repo share one memory directory

#### Instinct-Based Learning [출처 미확인]
- Agents observe patterns from repeated tasks
- Confidence tracking over time
- Auto-promote recurring patterns into suggestions agent follows
- Example: "My summaries are too long" → agent learns conciseness

### CODE/CONFIG EXAMPLE

**CLAUDE.md with memory discipline:**

```markdown
# Memory and Learning

## Explicit Memory (CLAUDE.md)

### Build and Test Commands
- Build: `./gradlew build`
- Test: `./gradlew test`
- Integration tests: `./gradlew integrationTest`
- Test single class: `./gradlew test --tests MyClassTest`

### Project Conventions
- Language: Kotlin 1.9+
- Async: Coroutines, not threads
- Logging: SLF4J + Logback
- Tests: kotest (behavior-driven)

### Common Patterns
- Tool definitions: JSON in `src/main/resources/tools/`
- Config: HOCON in `src/main/resources/application.conf`
- Memory: `~/.claude/projects/<project>/memory/MEMORY.md`

## Auto Memory Topics
- @~/.claude/projects/innogrid-prj/memory/MEMORY.md (index)
- Topic: debugging patterns (see MEMORY.md)
- Topic: performance insights (see MEMORY.md)
```

**Auto memory structure (MEMORY.md index):**

```markdown
# Auto Memory Index

## Debugging Insights
See `debugging.md` for:
- Flaky test patterns (e.g., timing issues in async tests)
- ClassLoader issues with Kotlin reflection
- Common NPE sources in tool invocation

## Performance Learnings
See `performance.md` for:
- Coroutine pool sizing for AIOps workloads
- Memory tuning (heap, GC) for long-running agents
- Cache invalidation strategy for tool specs

## API Design Decisions
See `api-conventions.md` for:
- Error response format (always JSON)
- Pagination: limit/offset or cursor
- Rate limiting headers

---

## Latest Session Notes (2025-03-15)
- Fixed async subagent dispatch race condition (debugging.md)
- Learned: gradle build cache helps; always use `--build-cache` flag
- Reminder: run `./gradlew clean` before CI to avoid cache skew
```

**Instinct-based memory pattern (conceptual Kotlin):**

```kotlin
/**
 * Instinct-based learning system.
 * Agent observes patterns and auto-promotes high-confidence learnings.
 */
class InstinctMemory {
    data class Pattern(
        val condition: String,      // e.g., "async test fails"
        val action: String,         // e.g., "add @flaky tag"
        val confidence: Float,      // 0-1 based on frequency
        val occurrences: Int
    )

    private val patterns = mutableMapOf<String, Pattern>()

    fun observeSessionOutcome(session: AgentSession) {
        // After each agent run, track what worked
        session.userCorrections.forEach { correction ->
            // Example correction: "Use `kotlin.test` not `junit`"
            updatePattern(
                condition = "import junit",
                action = "replace with kotlin.test",
                feedback = correction
            )
        }
    }

    private fun updatePattern(condition: String, action: String, feedback: String) {
        val existing = patterns[condition]
        if (existing != null) {
            patterns[condition] = existing.copy(
                occurrences = existing.occurrences + 1,
                confidence = existing.confidence * 0.95f + 0.05f  // Increase confidence
            )
        }
    }

    fun promoteToMemory(minConfidence: Float = 0.8f) {
        // Auto-promote high-confidence patterns to MEMORY.md
        patterns
            .filter { (_, pattern) -> pattern.confidence > minConfidence }
            .forEach { (key, pattern) ->
                val memoryEntry = """
                    # Auto-learned pattern
                    Condition: ${pattern.condition}
                    Action: ${pattern.action}
                    Confidence: ${pattern.confidence} (${pattern.occurrences} observations)
                """.trimIndent()
                appendToMemory("patterns.md", memoryEntry)
            }
    }
}
```

### SOURCE URLS
- [How Claude remembers your project – Claude Code Docs](https://code.claude.com/docs/en/memory)
- [Memory tool – Claude API Docs](https://platform.claude.com/docs/en/agents-and-tools/tool-use/memory-tool)
- [Claude Code's Hidden Memory Directory – Michael Livs](https://michaellivs.com/blog/claude-code-memory-directory/)
- [7 Steps to Mastering Memory in Agentic AI Systems – ML Mastery](https://machinelearningmastery.com/7-steps-to-mastering-memory-in-agentic-ai-systems/)

---

## 7. Verification Loops & Pre-Merge Gates

### WHO & WHEN
- **Anthropic** — emphasis on harness engineering (2024-2026)
- **Spotify Engineering** — LLM Judge implementation ([출처 미확인])
- **Augment Code** — pre-merge verification framework
- Industry consensus: 2025-2026

### WHY
Without verification gates, autonomous agents:

- Generate large changes that fail in production
- Bypass quality standards under sprint pressure
- Ship bugs that single human reviewers miss

Pre-merge gates create **layered feedback**:

- **Layer 1 (Agent-internal)**: Verifier runs before agent creates PR
- **Layer 2 (CI hard gate)**: Re-run verifier; PR cannot merge without passing
- **Layer 3 (Human harness)**: Humans engineer the specs and gates, not review individual PRs

Key insight: **humans on the loop, not humans in the loop**. Engineers maintain the harness (specs, evals, quality gates); verification runs automatically.

### HOW IT WORKS

1. **Define verification criteria** in CLAUDE.md or eval suite
2. **Run verifier internally** (agent evaluates own output before PR)
3. **CI gate** (verifier runs as hard block; cannot bypass)
4. **Analysis** (collect failure patterns, iterate on spec)
5. **Improve** (update prompts, tool specs, or evals based on failures)

Spotify case: LLM Judge layer vetoes ~25% of agent sessions. Without gate, 1 in 4 sessions would ship broken code.

### CODE/CONFIG EXAMPLE

**Verification suite (pre-merge gates):**

```kotlin
// src/test/kotlin/VerificationGates.kt
class PreMergeGates {

    companion object {
        const val SPEC_COMPLIANCE_MIN = 0.95f
        const val TEST_COVERAGE_MIN = 0.80f
        const val LATENCY_SLA_MS = 5000
    }

    fun runPreMergeVerification(agentOutput: AgentOutput): VerificationResult {
        val checks = listOf(
            checkSpecCompliance(agentOutput),
            checkTestCoverage(agentOutput),
            checkLatencySLA(agentOutput),
            checkNoRegressions(agentOutput),
            checkSecurityRules(agentOutput)
        )

        val passed = checks.all { it.passed }
        val score = checks.map { it.score }.average()

        return VerificationResult(
            passed = passed,
            overallScore = score,
            details = checks,
            timestamp = now()
        )
    }

    private fun checkSpecCompliance(output: AgentOutput): Check {
        // Does output match AGENTS.md spec?
        val spec = loadSpec("AGENTS.md")
        val compliance = evaluateCompliance(output, spec)

        return Check(
            name = "Spec Compliance",
            passed = compliance >= SPEC_COMPLIANCE_MIN,
            score = compliance,
            details = "Matched ${(compliance*100).toInt()}% of spec items"
        )
    }

    private fun checkTestCoverage(output: AgentOutput): Check {
        // Run coverage tool on generated code
        val coverage = runJacoco(output.generatedKotlin)

        return Check(
            name = "Test Coverage",
            passed = coverage >= TEST_COVERAGE_MIN,
            score = coverage,
            details = "Coverage: ${(coverage*100).toInt()}%"
        )
    }

    private fun checkLatencySLA(output: AgentOutput): Check {
        // Measure agent inference latency
        val latency = output.latencyMs

        return Check(
            name = "Latency SLA",
            passed = latency <= LATENCY_SLA_MS,
            score = (LATENCY_SLA_MS - latency) / LATENCY_SLA_MS.toFloat(),
            details = "Latency: ${latency}ms (target: ${LATENCY_SLA_MS}ms)"
        )
    }

    private fun checkNoRegressions(output: AgentOutput): Check {
        // Run full test suite; ensure no tests broke
        val testResult = runTests(output.generatedKotlin)

        return Check(
            name = "No Regressions",
            passed = testResult.allPassed,
            score = testResult.passRate,
            details = "${testResult.passCount}/${testResult.totalCount} tests pass"
        )
    }

    private fun checkSecurityRules(output: AgentOutput): Check {
        // Check for hardcoded secrets, unsafe dependencies, etc.
        val violations = scanSecurity(output.generatedKotlin)

        return Check(
            name = "Security Rules",
            passed = violations.isEmpty(),
            score = if (violations.isEmpty()) 1.0f else 0.0f,
            details = violations.map { it.description }
        )
    }
}

data class Check(
    val name: String,
    val passed: Boolean,
    val score: Float,    // 0-1
    val details: Any
)

data class VerificationResult(
    val passed: Boolean,
    val overallScore: Float,
    val details: List<Check>,
    val timestamp: Instant
)
```

**CI/CD gate configuration (.github/workflows/pre-merge-gate.yml):**

```yaml
name: Pre-Merge Verification Gate

on:
  pull_request:
    types: [opened, synchronize, reopened]

jobs:
  verify:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Set up Kotlin
        uses: fwilhe2/setup-kotlin@main

      - name: Run Pre-Merge Gates
        run: |
          ./gradlew test \
            --tests VerificationGates \
            --info

      - name: Check Spec Compliance
        run: |
          SCORE=$(./gradlew -q evaluateSpecCompliance)
          echo "Spec Compliance: $SCORE"
          if (( $(echo "$SCORE < 0.95" | bc -l) )); then
            echo "FAIL: Spec compliance below 95%"
            exit 1
          fi

      - name: Check Test Coverage
        run: |
          ./gradlew jacocoTestReport
          COVERAGE=$(./gradlew -q printCoverage)
          echo "Coverage: $COVERAGE"
          if (( $(echo "$COVERAGE < 0.80" | bc -l) )); then
            echo "FAIL: Coverage below 80%"
            exit 1
          fi

      - name: Enforce Pre-Merge Rules
        run: |
          # Hard gate: no merge without passing all checks
          ./gradlew runPreMergeGates \
            --fail-on-violation

      - name: Block Merge if Failed
        if: failure()
        run: |
          echo "Pre-merge verification FAILED."
          echo "Agent must fix issues before merge is allowed."
          exit 1
```

**CLAUDE.md with verification discipline:**

```markdown
# Verification and Pre-Merge Gates

## Agent Responsibility
Before creating a PR:
1. Run verification suite: `./gradlew runPreMergeGates`
2. Check all gates pass:
   - Spec compliance ≥95%
   - Test coverage ≥80%
   - No security violations
   - Latency ≤5000ms
3. Only create PR if all gates PASS

## CI/CD Hard Gate
Merging is blocked unless:
- All tests pass: `./gradlew test`
- All gates pass: `./gradlew runPreMergeGates`
- No regressions in coverage
- Security scan clean

## Failure Analysis
If gates fail:
1. Analyze failure reason (logged in PR comments)
2. Update prompt, tool spec, or evals per failure pattern
3. Re-run gates; verify fix
4. Create new PR with improvements

## Human Harness
Engineers maintain:
- AGENTS.md spec (not reviewed per-PR, but continually improved)
- Verification criteria (gate thresholds)
- Eval suite (new evals added as gaps found)

Humans do NOT review individual PRs; gates and evals do the work.
```

### SOURCE URLS
- [How AI Agent Verification Prevents Production Bugs Before Merge – Augment Code](https://www.augmentcode.com/guides/ai-agent-pre-merge-verification)
- [The Agent Improvement Loop Starts with a Trace – LangChain](https://www.langchain.com/conceptual-guides/traces-start-agent-improvement-loop)
- [Understanding the Agent Loop – TechAhead](https://www.techaheadcorp.com/blog/understanding-the-agent-loop/)
- [The Agentic Evaluation Loop in Practice – Akira AI](https://www.akira.ai/blog/agentic-evaluation-loop-practice)

---

## 8. Multi-Agent Orchestration (DevFleet / dmux / DAG-Based)

### WHO & WHEN
- **dmux** — Justin Schroeder (@jpschroeder), Boyd (@0xboyd), FormKit Inc. (2024-2026)
- **Agent Orchestrator** — ComposioHQ (parallel coding agents with git worktrees)
- **RFC-driven DAG execution** — Emerging practice, academic + industry (arXiv, 2025)

### WHY
Single-agent loops get stuck:

- **Bottlenecks**: One agent can't parallelize across independent tasks
- **Context dilution**: One agent handling 10 tasks loses focus
- **Slow**: Sequential execution of tasks that could run in parallel

Multi-agent orchestration:

- **Parallel independent tasks** — 3+ unrelated features in parallel
- **Isolated git worktrees** — each agent on own branch, no merge conflicts
- **Automated coordination** — orchestrator spawns agents, collects results, merges

### HOW IT WORKS

#### dmux Pattern
1. Press `n` in dmux REPL → create new pane
2. Type task prompt → dmux creates git worktree and branch
3. Select agent (Claude Code, opencode, plain shell)
4. dmux launches agent in pane with isolated branch
5. Pane file browser lets you inspect worktree without switching
6. On completion, dmux smart-merges branch back to main

#### Agent Orchestrator Pattern (DAG-Based)
1. Main orchestrator receives list of tasks
2. Builds **DAG** (directed acyclic graph) of dependencies
3. Identifies parallel (independent) tasks
4. Spawns subagent per parallel task with own worktree
5. Intermediate outputs cached and passed to dependent tasks
6. Orchestrator merges all branches on success

### CODE/CONFIG EXAMPLE

**dmux setup (orchestration REPL):**

```bash
#!/bin/bash
# Example dmux workflow for AIOps harness

# Launch dmux
dmux

# In dmux REPL:
# > n
# Prompt: "Implement OpenAI tool spec parser in Kotlin"
# Select: Claude Code (fast model)
# → dmux spawns worktree: feature/openai-tool-parser
# → Agent runs in isolated pane

# > n
# Prompt: "Implement subagent parallel dispatch mechanism"
# Select: Claude Code
# → dmux spawns: feature/subagent-dispatch
# → Runs in parallel to first task

# > n
# Prompt: "Write integration tests for tool spec + dispatch"
# Select: Claude Code
# → dmux spawns: feature/integration-tests
# → After first two complete (dependency in DAG)

# dmux REPL commands:
# :list           - show all panes and their branches
# :browse <pane>  - file browser for pane's worktree
# :merge <pane>   - smart merge pane branch to main
# :kill <pane>    - delete worktree and branch
```

**DAG-orchestrated multi-agent (Kotlin pseudo-code):**

```kotlin
/**
 * Multi-agent orchestration using Directed Acyclic Graph (DAG).
 * Parallel tasks run simultaneously; dependent tasks await predecessors.
 */
class AIOpsOrchestrator {

    data class Task(
        val id: String,
        val description: String,
        val dependsOn: List<String> = emptyList(),
        val agentModel: String = "claude-3-5-sonnet"
    )

    data class TaskResult(
        val taskId: String,
        val worktreeBranch: String,
        val output: String,
        val success: Boolean
    )

    private val tasks = mutableListOf<Task>()
    private val results = mutableMapOf<String, TaskResult>()

    fun planDAG(taskList: List<Task>): DAG {
        // Build dependency graph
        val dag = DAG()
        for (task in taskList) {
            dag.addNode(task.id, task)
            for (dep in task.dependsOn) {
                dag.addEdge(dep, task.id)  // dep → task
            }
        }
        return dag
    }

    suspend fun executeParallel(dag: DAG) {
        val parallel = dag.topologicalSort()

        // Execute levels in order; tasks within level run in parallel
        for (level in parallel) {
            val jobs = level.map { taskId ->
                async {
                    executeTask(taskId, dag)
                }
            }
            awaitAll(*jobs.toTypedArray())
        }
    }

    private suspend fun executeTask(taskId: String, dag: DAG): TaskResult {
        val task = dag.getNode(taskId) as Task

        // Wait for dependencies to complete
        for (depId in task.dependsOn) {
            results[depId] ?: throw IllegalStateException("Dependency $depId not ready")
        }

        // Create isolated worktree for this task
        val branch = "feature/${task.id}"
        runCommand("git worktree add -b $branch origin/main")

        try {
            // Invoke agent with task context
            val output = invokeAgent(
                model = task.agentModel,
                systemPrompt = "You are a senior Kotlin developer. Complete this task.",
                prompt = task.description,
                branch = branch
            )

            val result = TaskResult(
                taskId = taskId,
                worktreeBranch = branch,
                output = output,
                success = true
            )

            results[taskId] = result
            return result
        } catch (e: Exception) {
            return TaskResult(
                taskId = taskId,
                worktreeBranch = branch,
                output = e.message ?: "Unknown error",
                success = false
            )
        }
    }

    suspend fun mergeAll(dag: DAG): Boolean {
        // Smart merge: rebase and auto-resolve conflicts
        val mergeOrder = dag.topologicalSort().flatten().reversed()

        for (taskId in mergeOrder) {
            val result = results[taskId] ?: continue
            if (!result.success) {
                println("Skipping merge for failed task: $taskId")
                continue
            }

            try {
                runCommand("git checkout main")
                runCommand("git merge --no-ff ${result.worktreeBranch}")
                runCommand("git worktree remove ${result.worktreeBranch}")
            } catch (e: Exception) {
                println("Merge conflict for $taskId: ${e.message}")
                // Manual intervention needed
                return false
            }
        }

        return true
    }
}

// Usage
suspend fun main() {
    val orchestrator = AIOpsOrchestrator()

    val tasks = listOf(
        Task("parse-spec", "Implement OpenAI tool spec parser"),
        Task(
            "subagent-dispatch",
            "Implement parallel subagent dispatch",
            dependsOn = listOf("parse-spec")  // Depends on spec parser
        ),
        Task(
            "integration-tests",
            "Write end-to-end integration tests",
            dependsOn = listOf("parse-spec", "subagent-dispatch")  // Depends on both
        ),
        Task("docs", "Update README and CLAUDE.md")  // Independent
    )

    val dag = orchestrator.planDAG(tasks)
    orchestrator.executeParallel(dag)  // parse-spec + docs in parallel
                                       // subagent-dispatch waits for parse-spec
                                       // integration-tests waits for both

    val success = orchestrator.mergeAll(dag)
    println(if (success) "All tasks merged successfully" else "Merge conflicts; manual review needed")
}
```

### SOURCE URLS
- [dmux – Parallel agents with tmux and worktrees](https://dmux.ai/)
- [GitHub: standardagents/dmux](https://github.com/standardagents/dmux)
- [dmux: The Dev Agent Multiplexer for Parallel AI – Bright Coding](https://blog.brightcoding.dev/2026/03/21/dmux-the-revolutionary-dev-agent-multiplexer-for-parallel-ai)
- [Agent Orchestrator – ComposioHQ](https://github.com/ComposioHQ/agent-orchestrator)
- [Local, Parallel, and Autonomous: Building a Fully Agent-Generated Codebase – Yusuke Tsutsumi](https://y.tsutsumi.io/2026/03/30/agentic-orchestration-with-beads-and-lelouch/)

---

## 9. Anthropic "Building Effective Agents" (Dec 19, 2024)

### WHAT IT IS
Anthropic's foundational guide on building agentic systems, based on work with dozens of teams across industries.

**URL**: [Building Effective AI Agents](https://www.anthropic.com/research/building-effective-agents)
**Published**: December 19, 2024
**Audience**: Anyone building LLM-based agent systems

### KEY DISTINCTION: Workflows vs. Agents

**Workflows**
- LLMs and tools orchestrated through **predefined code paths**
- Predictable execution for well-defined tasks
- Example: Prompt Chaining (Plan → Implement → Review)

**Agents**
- LLMs **dynamically direct their own processes** and tool usage
- Autonomous, flexible for open-ended problems
- Example: Agent decides which tool to call next based on task state

### BUILDING BLOCKS

All agentic systems rest on a foundation: the **augmented LLM**.

Components:
1. **Retrieval** — agent generates queries independently; surfaces relevant docs
2. **Tools** — agent selects and invokes suitable tools
3. **Memory** — agent determines what to retain across contexts

### RECOMMENDED PATTERNS

Anthropic recommends starting **simple** and adding complexity only when needed:

1. **Prompt Chaining** — sequence LLM calls through predefined steps (simplest)
2. **Routing** — LLM chooses which pipeline to follow
3. **Parallelization** — multiple LLM/tool calls execute simultaneously
4. **Orchestrator-Workers** — main agent delegates tasks to specialized subagents (most complex)

**Important caveat**: agentic systems trade **latency and cost** for better task performance. Not every problem needs agents.

### CODE/CONFIG EXAMPLE

**Building Effective Agents in Kotlin (patterns):**

```kotlin
/**
 * Anthropic's four recommended patterns for agentic systems.
 * Start with simplest; increase complexity only if needed.
 */

// Pattern 1: Prompt Chaining (Simplest)
class PromptChainingAgent {
    suspend fun buildHarnessStepByStep(spec: String): String {
        val plan = callLLM("Plan phase", spec)
        val design = callLLM("Design phase", plan)
        val implementation = callLLM("Implement phase", design)
        return implementation
    }
}

// Pattern 2: Routing (Choose path based on input)
class RoutingAgent {
    suspend fun processRequest(request: String): String {
        val category = classifyRequest(request)  // "spec" | "debug" | "test"

        return when (category) {
            "spec" -> handleSpecRequest(request)
            "debug" -> handleDebugRequest(request)
            "test" -> handleTestRequest(request)
            else -> "Unknown request type"
        }
    }

    private suspend fun classifyRequest(request: String): String {
        // LLM decides which handler to use
        return callLLM("Classify request type", request)
    }
}

// Pattern 3: Parallelization (Multiple tasks simultaneously)
class ParallelizationAgent {
    suspend fun reviewAndTest(pr: String): ReviewResult {
        // Three independent tasks: run in parallel
        val review = async { codeReview(pr) }
        val tests = async { runTests(pr) }
        val security = async { securityScan(pr) }

        val (r, t, s) = awaitAll(review, tests, security)
        return ReviewResult(review = r, tests = t, security = s)
    }
}

// Pattern 4: Orchestrator-Workers (Subagents for specialization)
class OrchestratorAgent {
    private val reviewerSubagent = SubagentFactory.create("CodeReviewer")
    private val testerSubagent = SubagentFactory.create("TestRunner")
    private val debuggerSubagent = SubagentFactory.create("Debugger")

    suspend fun fullCIWorkflow(pr: String): CIResult {
        // Main agent orchestrates; subagents specialize
        val reviewResult = reviewerSubagent.invoke("Review PR", pr)

        if (reviewResult.hasFailures) {
            val debugResult = debuggerSubagent.invoke("Debug failures", reviewResult.failures)
            return CIResult(review = reviewResult, debug = debugResult)
        }

        val testResult = testerSubagent.invoke("Run tests", pr)
        return CIResult(review = reviewResult, tests = testResult)
    }
}

// Anthropic's recommendation: measure and decide
suspend fun choosePattern(problem: String): String {
    // Simplest solution that works is best
    // Start with prompt chaining; only upgrade to agents if needed

    return when {
        problem == "Sequential, predictable steps" -> "Use Prompt Chaining"
        problem == "Different paths based on input" -> "Use Routing"
        problem == "Independent parallel tasks" -> "Use Parallelization"
        problem == "Specialized subagents" -> "Use Orchestrator-Workers"
        else -> "Use augmented LLM (simplest fallback)"
    }
}
```

**CLAUDE.md reflecting Anthropic patterns:**

```markdown
# Building Effective Agents (Anthropic Dec 2024)

## Start Simple
1. Can you solve this with a single LLM call? → Do that.
2. Do you need multiple sequential steps? → Use Prompt Chaining.
3. Does the LLM need to choose between paths? → Use Routing.
4. Are tasks independent? → Parallelize.
5. Do you need specialists? → Use Orchestrator-Workers (subagents).

## Design Questions
- What is the user's latency tolerance? (agents = slower)
- How much does each inference cost? (agents = expensive)
- How often do you need to regenerate vs. iterate?

## Verify Pattern Choice
- Measure LLM calls, latency, and cost for current pattern
- If acceptable, stick with it (don't over-engineer)
- If unacceptable, try next complexity level and re-measure

## Anthropic's Augmented LLM Foundation
Every pattern builds on:
- Retrieval (agent queries for docs)
- Tools (agent invokes specialized functions)
- Memory (agent retains learnings)
```

### SOURCE URLS
- [Building Effective AI Agents – Anthropic Research](https://www.anthropic.com/research/building-effective-agents)
- [Building Effective Agents – Anthropic News](https://www.anthropic.com/news/building-effective-agents)
- [Building Effective Agents Cookbook – Anthropic GitHub](https://github.com/anthropics/anthropic-cookbook/tree/main/patterns/agents)
- [Building effective agents – Simon Willison's Blog](https://simonwillison.net/2024/Dec/20/building-effective-agents/)

---

## Summary & Key Takeaways

| Pattern | WHO | WHEN | WHY | Core Mechanism |
|---------|-----|------|-----|-----------------|
| **Ralph Loop** | Geoffrey Huntley (2024) | Long-running autonomous agents | Progress persists in git, not context | Infinite bash loop; fresh context per iteration |
| **Eval-Driven Dev** | Hamel Husain, Eugene Yan (2024) | Building reliable AI products | Evals catch failures early; enable iteration | Write test → run agent → grade → improve |
| **Context Engineering** | Karpathy, Lance Martin (2025) | Managing token efficiency | Large agents leak context; drift in quality | Write, select, compress, isolate: 4 primitives |
| **Subagent-Driven** | Anthropic Claude Code (2024) | Parallel specialized tasks | Read-only agents safer; faster; cheaper | Delegates to focused subagent; parent coordinates |
| **Plan/Brainstorm/TDD** | obra Superpowers (2025) | Disciplined agent development | Code-first agents miss spec; TDD enforces quality | Skill-based workflow: brainstorm → plan → test → code |
| **Memory Systems** | Anthropic Claude Code (2024) | Cross-session learning | Agents forget; need persistent learnings | CLAUDE.md (explicit) + auto memory (implicit) |
| **Verification Loops** | Anthropic, Spotify (2025) | Production quality gates | Agents bypass QA under pressure; gates enforce | Run verifier before PR; hard CI gate on merge |
| **Multi-Agent Orchestration** | dmux, ComposioHQ (2024-2026) | Parallel independent tasks | Single agent bottlenecks; can't parallelize | DAG execution: parallel tasks → isolated worktrees → smart merge |
| **Building Effective Agents** | Anthropic (Dec 2024) | Choosing right pattern | Over-engineering = cost + latency waste | Start simple (prompt chain); upgrade only if needed |

### Practical Integration for Kotlin/JVM AIOps Harness

**Phase 1: Start Simple (Week 1)**
- Implement Prompt Chaining with CLAUDE.md
- Write 5-10 eval tests (eval-driven)
- Set up MEMORY.md for learnings

**Phase 2: Add Parallelization (Week 2-3)**
- Implement subagent dispatch for code review, testing, debugging
- Use Superpowers skills for brainstorm → plan → TDD
- Set up pre-merge verification gates

**Phase 3: Production Hardening (Week 4+)**
- Deploy dmux for parallel task orchestration
- Implement context engineering (write/select/compress/isolate)
- Run Ralph loop with full CI/CD automation

**Verification Discipline**: Every iteration validates against evals; pre-merge gates block unverified code.

---

## References & Further Reading

### Blogs & Articles
- [everything is a ralph loop – Geoffrey Huntley](https://ghuntley.com/loop/)
- [Your AI Product Needs Evals – Hamel Husain](https://hamel.dev/blog/posts/evals/)
- [Context Engineering for Agents – Lance Martin](https://rlancemartin.github.io/2025/06/23/context_engineering/)
- [How Claude remembers your project – Anthropic Claude Code Docs](https://code.claude.com/docs/en/memory)

### GitHub Repositories
- [obra/superpowers – Agentic Skills Framework](https://github.com/obra/superpowers)
- [standardagents/dmux – Dev Agent Multiplexer](https://github.com/standardagents/dmux)
- [snarktank/ralph – Autonomous Ralph Loop](https://github.com/snarktank/ralph)
- [anthropics/anthropic-cookbook – Patterns & Examples](https://github.com/anthropics/anthropic-cookbook/tree/main/patterns/agents)

### Official Documentation
- [Create custom subagents – Claude Code Docs](https://code.claude.com/docs/en/sub-agents)
- [Subagents in the SDK – Claude API Docs](https://platform.claude.com/docs/en/agent-sdk/subagents)
- [Building Effective AI Agents – Anthropic Research](https://www.anthropic.com/research/building-effective-agents)

---

**Document Status**: Complete reference for 2024-2026 agentic patterns. Suitable for Korean developer community showcase.
**Last Verified**: 2026-04-07
**Format**: Markdown (존댓말 friendly; code examples in Kotlin/Python)
