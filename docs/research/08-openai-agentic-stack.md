# OpenAI Agentic Stack — Verified Source Pack

Verification baseline: `2026-04-07`

Method note:
- This pack uses only official OpenAI web properties (`openai.com`, `developers.openai.com`, `platform.openai.com`, `help.openai.com`, `model-spec.openai.com`) plus official GitHub repositories under `github.com/openai`.
- Any detail not directly confirmed from those sources in this verification pass is marked `[UNVERIFIED]`.
- This document covers the current OpenAI agentic stack, including the modern Codex CLI and related APIs. It does not describe the deprecated 2021 Codex API except where needed to avoid confusion.

## 1. Codex CLI

- The current Codex CLI is the open-source terminal agent published at `https://github.com/openai/codex`. The repository describes it as “OpenAI Codex CLI,” and the public release list shows `0.118.0` as the latest release in this verification pass, dated `2026-03-31`. Source: https://github.com/openai/codex ; https://github.com/openai/codex/releases ; Verified: `2026-04-07`
- OpenAI’s Codex docs position Codex as an agent that runs in the terminal and IDE, and the CLI docs explicitly describe the terminal workflow, login, model selection, and approval/sandbox controls. Source: https://developers.openai.com/codex/ ; https://developers.openai.com/codex/auth ; Verified: `2026-04-07`
- OpenAI’s current Codex model docs verify these Codex-usable models in the current stack: `gpt-5.4`, `gpt-5.4-mini`, `gpt-5.3-codex`, and `gpt-5.3-codex-spark` (the latter marked as research preview / Pro-only in the docs). Source: https://developers.openai.com/codex/models ; Verified: `2026-04-07`
- `config.toml` is a first-class configuration surface. OpenAI docs verify the default user config path as `~/.codex/config.toml`, with trusted-project overrides via `.codex/config.toml`. Source: https://developers.openai.com/codex/config-basic ; https://developers.openai.com/codex/config-reference ; Verified: `2026-04-07`
- Profiles are officially documented. OpenAI’s advanced config docs describe named profiles under `[profiles.<name>]`, inheritance via `profile = "<name>"`, and CLI selection with `--profile`. Source: https://developers.openai.com/codex/config-advanced ; https://developers.openai.com/codex/config-reference ; Verified: `2026-04-07`
- Sandboxing is officially documented. OpenAI currently documents `read-only`, `workspace-write`, and `danger-full-access` sandbox modes, plus approval controls such as `approval_policy`. Source: https://developers.openai.com/codex/sandboxing ; https://developers.openai.com/codex/config-reference ; Verified: `2026-04-07`
- MCP is officially supported in both the CLI and IDE extension. OpenAI’s MCP page documents STDIO and streamable HTTP servers, `codex mcp` management commands, and `config.toml`-based MCP configuration. Source: https://developers.openai.com/codex/mcp ; Verified: `2026-04-07`
- Hooks are officially documented as experimental. OpenAI documents lifecycle hooks via `hooks.json` next to active config layers, with `~/.codex/hooks.json` and `<repo>/.codex/hooks.json` as practical locations, gated by `[features] codex_hooks = true`. Source: https://developers.openai.com/codex/config-advanced ; https://developers.openai.com/codex/hooks ; Verified: `2026-04-07`
- Rules are officially documented. OpenAI documents project and global rule files, rule loading order, and agent behavior shaping through the Rules system. Source: https://developers.openai.com/codex/rules ; Verified: `2026-04-07`
- Custom agents are officially documented, but the public docs in this pass describe them as TOML files in `~/.codex/agents/` or `.codex/agents/`, plus `agents.<name>.*` config keys. I did not verify a current single-file `agents.toml` product surface in OpenAI’s public docs, so the specific label `agents.toml` is `[UNVERIFIED]` for the current official UX. Source: https://developers.openai.com/codex/subagents ; https://developers.openai.com/codex/config-reference ; Verified: `2026-04-07`
- Likewise, the specific end-user feature label `execpolicy` is `[UNVERIFIED]` in the current public docs pass. The verified public surfaces are `approval_policy`, sandbox settings, rules, and hook controls; if OpenAI exposes `execpolicy` internally or in older builds, that naming was not directly confirmed here. Source: https://developers.openai.com/codex/config-reference ; https://developers.openai.com/codex/rules ; Verified: `2026-04-07`
- Verified public milestones:
  - OpenAI’s `Introducing Codex` post states “Last month, we launched Codex CLI,” which verifies a public CLI launch in `April 2025`, but does not give a day-of-month in that post. Source: https://openai.com/index/introducing-codex/ ; Verified: `2026-04-07`
  - On `2025-05-16`, OpenAI announced Sign in with ChatGPT for Codex CLI and introduced `codex-mini-latest` as the CLI default model at that time. Source: https://openai.com/index/introducing-codex/ ; https://help.openai.com/en/articles/11381614-codex-cli-and-sign-in-with-chatgpt ; Verified: `2026-04-07`
  - On `2026-02-02`, OpenAI announced the Codex app and explicitly said the app shares session history, configuration, and IDE/CLI handoff with Codex CLI. Source: https://openai.com/index/introducing-codex-app/ ; Verified: `2026-04-07`
  - On `2026-03-04`, OpenAI’s release notes announced a native Windows app for Codex. Source: https://help.openai.com/en/articles/6825453-chatgpt-rlease-notes ; Verified: `2026-04-07`
  - On `2026-03-31`, the official GitHub repo shows release `0.118.0` as the latest public release in this verification pass. Source: https://github.com/openai/codex/releases ; Verified: `2026-04-07`

## 2. GPT-5.x Family (verified only)

- `GPT-5` is officially announced by OpenAI in `Introducing GPT-5`, dated `2025-08-07`. OpenAI describes it as a system that unifies fast responses and deeper reasoning, and says it is available to all ChatGPT users, with higher limits and `GPT-5 pro` for Pro users. Source: https://openai.com/index/introducing-gpt-5/ ; Verified: `2026-04-07`
- `GPT-5-Codex` is officially listed by OpenAI in the model reference as a coding model for agentic software engineering, with API model ID `gpt-5-codex`. OpenAI’s model page describes it as optimized for coding workflows and available via the Responses API. I did not verify a separate openai.com launch post for `GPT-5-Codex` in this pass, but the model listing itself is official. Source: https://platform.openai.com/docs/models/gpt-5-codex ; https://platform.openai.com/docs/models ; Verified: `2026-04-07`
- `GPT-5.4` is officially announced by OpenAI in `Introducing GPT-5.4`, dated `2026-03-05`. OpenAI says it is available in ChatGPT, the API, and Codex, and highlights native computer use, memory improvements, and up to `1M` token context. Source: https://openai.com/index/introducing-gpt-5-4/ ; https://platform.openai.com/docs/models/gpt-5.4 ; Verified: `2026-04-07`
- `GPT-5.4-mini` is officially announced by OpenAI in `Introducing GPT-5.4-mini`, dated `2026-03-17`. OpenAI says it is available in the API, Codex, and ChatGPT, with `400k` context, tool use, function calling, web search, file search, computer use, and skills support. Source: https://openai.com/index/introducing-gpt-5-4-mini/ ; https://platform.openai.com/docs/models/gpt-5.4-mini ; Verified: `2026-04-07`
- `GPT-5.4-mini` pricing is officially documented on the model page as `$0.40 / 1M` input tokens and `$1.60 / 1M` output tokens in this verification pass. Source: https://platform.openai.com/docs/models/gpt-5.4-mini ; Verified: `2026-04-07`
- `[UNVERIFIED]` I did not verify an official OpenAI announcement or model page for a product literally named `GPT-5.4-mini-Codex`, `GPT-5.4-Codex`, or `GPT-5.4 spark`; those names should not be used without separate primary-source confirmation. Verified basis for this caution: current model pages checked were `GPT-5`, `GPT-5-Codex`, `GPT-5.4`, and `GPT-5.4-mini`. Source: https://platform.openai.com/docs/models ; Verified: `2026-04-07`

## 3. Operator

- OpenAI announced Operator on `2025-01-23` as “a research preview of an agent that can use its own browser to perform tasks for you.” The post says it can type, click, scroll, and generally interact with websites through a browser. Source: https://openai.com/index/introducing-operator/ ; Verified: `2026-04-07`
- OpenAI says Operator is powered by `Computer-Using Agent (CUA)`, which combines GPT-4o vision with advanced reasoning trained via reinforcement learning for GUI interaction. Source: https://openai.com/index/introducing-operator/ ; https://openai.com/index/computer-using-agent/ ; Verified: `2026-04-07`
- At launch, Operator access was limited to `ChatGPT Pro` users in the United States. Source: https://openai.com/index/introducing-operator/ ; Verified: `2026-04-07`
- Current status: OpenAI updated the Operator announcement on `2025-07-17` to say Operator had been fully integrated into ChatGPT as `ChatGPT agent`, and OpenAI’s help center later states Operator was deprecated and no longer accessible after `2025-08-31`. Source: https://openai.com/index/introducing-operator/ ; https://help.openai.com/en/articles/11428486-operator-is-now-deprecated ; Verified: `2026-04-07`
- Pricing/status interpretation as of this pass: there is no current standalone Operator product price. OpenAI’s current public pricing page prices `ChatGPT Pro` at `$200/month`, and current product language emphasizes `ChatGPT agent`, not a separate purchasable Operator SKU. Source: https://openai.com/pricing ; https://help.openai.com/en/articles/11428486-operator-is-now-deprecated ; Verified: `2026-04-07`

## 4. Computer Use Agent

- OpenAI introduced `Computer-Using Agent (CUA)` on `2025-01-23` as the model behind Operator. OpenAI says CUA combines GPT-4o’s visual capabilities with advanced reasoning via reinforcement learning to interact with graphical user interfaces. Source: https://openai.com/index/computer-using-agent/ ; Verified: `2026-04-07`
- OpenAI’s API docs currently expose computer use through the Responses API via model `computer-use-preview` and tool `computer_use_preview`. OpenAI explicitly says computer use is available through the Responses API and “is not available on Chat Completions.” Source: https://platform.openai.com/docs/guides/tools-computer-use ; Verified: `2026-04-07`
- The public API guide describes the action loop as model suggestion -> client executes click/type/scroll/etc. -> client returns a screenshot -> model continues. This is OpenAI’s documented computer-use integration pattern. Source: https://platform.openai.com/docs/guides/tools-computer-use ; Verified: `2026-04-07`
- OpenAI currently labels computer use as `beta` / preview behavior and advises against trusting it in fully authenticated or high-stakes environments without additional safeguards. Source: https://platform.openai.com/docs/guides/tools-computer-use ; Verified: `2026-04-07`
- OpenAI’s CUA release page is a citable official research artifact and includes a BibTeX citation link. In this verification pass, I did not confirm a separate standalone OpenAI paper page or arXiv paper beyond the official release/research page and its linked materials, so any claim of a separately published CUA paper should be treated as `[UNVERIFIED]` unless independently sourced. Source: https://openai.com/index/computer-using-agent/ ; Verified: `2026-04-07`

## 5. Assistants API

- OpenAI describes the Assistants API as an API for building assistants that can call models and access tools, with persistent objects such as assistants, threads, messages, and runs. Source: https://platform.openai.com/docs/api-reference/assistants ; https://platform.openai.com/docs/api-reference/threads?lang=javascript ; Verified: `2026-04-07`
- Threads are officially documented as conversation containers that assistants can interact with. Source: https://platform.openai.com/docs/api-reference/threads?lang=javascript ; Verified: `2026-04-07`
- OpenAI’s Assistants deep-dive materials verify built-in tool surfaces including `Code Interpreter`, `File Search` (retrieval), and function calling / third-party tools. Source: https://platform.openai.com/docs/assistants/deep-dive ; https://platform.openai.com/docs/assistants/tools/code-interpreter ; https://platform.openai.com/docs/assistants/tools/file-search ; https://platform.openai.com/docs/assistants/tools/function-calling ; Verified: `2026-04-07`
- OpenAI’s Assistants API FAQ states that, as of `2025-03-11`, OpenAI released the building blocks of its new Agents platform, including the Responses API, web search, file search, computer use, and an Agents SDK. Source: https://help.openai.com/en/articles/8550641-assistants-api-v2-faq ; Verified: `2026-04-07`
- Deprecation timeline: OpenAI’s migration guide says the Assistants API will be deprecated after full feature parity is achieved, and the current migration guide states the Assistants API “will be shut down on August 26, 2026.” Source: https://platform.openai.com/docs/guides/migrate-to-responses#assistants-api ; https://help.openai.com/en/articles/8550641-assistants-api-v2-faq ; Verified: `2026-04-07`

## 6. Realtime API

- OpenAI announced the Realtime API on `2024-10-01` as infrastructure for low-latency multimodal applications, especially speech-to-speech experiences. Source: https://openai.com/index/introducing-the-realtime-api/ ; Verified: `2026-04-07`
- OpenAI’s current docs describe the Realtime API as enabling low-latency, multimodal conversational experiences over WebRTC or WebSocket, with text and audio in/out and function calling. Source: https://platform.openai.com/docs/guides/realtime ; https://platform.openai.com/docs/guides/realtime-webrtc ; Verified: `2026-04-07`
- OpenAI’s Realtime guide explicitly recommends WebRTC for browser/mobile client-side integrations and WebSocket for server-to-server integrations where low latency still matters. Source: https://platform.openai.com/docs/guides/realtime ; https://platform.openai.com/docs/guides/realtime-webrtc ; Verified: `2026-04-07`
- OpenAI later announced general availability updates for the Realtime API on `2025-08-28`, including SIP support, tracing in the Agents SDK, and prompt caching support. Source: https://openai.com/index/introducing-gpt-realtime-and-realtime-api-updates/ ; Verified: `2026-04-07`

## 7. Swarm

- Swarm is OpenAI’s official experimental multi-agent orchestration library at `https://github.com/openai/swarm`. The repo describes Swarm as an experimental educational framework for lightweight, ergonomic multi-agent orchestration. Source: https://github.com/openai/swarm ; Verified: `2026-04-07`
- The repo says Swarm has two primary primitives, `Agents` and `handoffs`, and emphasizes simplicity, controllability, and testability. Source: https://github.com/openai/swarm ; Verified: `2026-04-07`
- Current status: the repo prominently says Swarm is now replaced by the OpenAI Agents SDK, which OpenAI recommends for production use. That means Swarm should be treated as experimental / educational rather than the stable strategic path. Source: https://github.com/openai/swarm ; Verified: `2026-04-07`
- `[UNVERIFIED]` The exact initial public release date/month for Swarm was not directly re-verified from an official OpenAI page in this pass, so “October 2024” should not be repeated as a hard fact without a direct launch-source citation. Source basis for current status only: https://github.com/openai/swarm ; Verified: `2026-04-07`

## 8. Agents SDK

- OpenAI’s official successor to Swarm is the `OpenAI Agents SDK`. OpenAI’s Python docs explicitly describe it as a “production-ready evolution” of Swarm. Source: https://openai.github.io/openai-agents-python/ ; Verified: `2026-04-07`
- Verified official URLs:
  - Python docs: https://openai.github.io/openai-agents-python/ ; Verified: `2026-04-07`
  - Python repo: https://github.com/openai/openai-agents-python ; Verified: `2026-04-07`
  - JavaScript/TypeScript repo: https://github.com/openai/openai-agents-js ; Verified: `2026-04-07`
- Language support verified in this pass:
  - Python: directly documented by the OpenAI Agents SDK docs and repo. Source: https://openai.github.io/openai-agents-python/ ; https://github.com/openai/openai-agents-python ; Verified: `2026-04-07`
  - JavaScript / TypeScript: verified by the official `openai-agents-js` repository. Source: https://github.com/openai/openai-agents-js ; Verified: `2026-04-07`
- OpenAI positions the Agents SDK around agents, handoffs, guardrails, tracing, and tool-using workflows. Source: https://openai.github.io/openai-agents-python/ ; Verified: `2026-04-07`

## 9. Function Calling Evolution

- Function calling itself was publicly launched in `2023`, but this pack focuses on the agent-era additions OpenAI still documents in current primary sources. Source: https://help.openai.com/en/articles/8555517-function-calling-in-the-openai-api ; Verified: `2026-04-07`
- Parallel function calling: OpenAI’s Assistants function-calling docs explicitly say parallel function calls are supported “with the latest models released on or after November 6, 2023.” Source: https://platform.openai.com/docs/assistants/tools/function-calling ; Verified: `2026-04-07`
- JSON mode: OpenAI’s current function-calling help article says that when using function calling, JSON mode is always enabled. OpenAI’s Structured Outputs announcement says JSON mode was introduced “last year at DevDay,” but I did not separately re-verify the canonical launch post/date for JSON mode in this pass, so the exact original JSON-mode launch date is `[UNVERIFIED]` here. Source: https://help.openai.com/en/articles/8555517-function-calling-in-the-openai-api ; https://openai.com/index/introducing-structured-outputs-in-the-api/ ; Verified: `2026-04-07`
- Structured Outputs: OpenAI officially introduced Structured Outputs on `2024-08-06`. OpenAI says setting `strict: true` in a tool definition causes model-generated arguments to exactly match the supplied JSON Schema. Source: https://openai.com/index/introducing-structured-outputs-in-the-api/ ; https://help.openai.com/en/articles/8555517-function-calling-in-the-openai-api ; Verified: `2026-04-07`
- Strict mode: in OpenAI’s public terminology, strict schema adherence is part of Structured Outputs rather than a separately launched API family. The verified public date for that strict-schema tool behavior is therefore `2024-08-06`. Source: https://openai.com/index/introducing-structured-outputs-in-the-api/ ; Verified: `2026-04-07`
- Agents-platform transition: OpenAI’s function-calling help article says that on `2025-03-11`, OpenAI released the building blocks of the new Agents platform, including the Responses API and first-party tools, which is the main current context for tool use evolution. Source: https://help.openai.com/en/articles/8555517-function-calling-in-the-openai-api ; Verified: `2026-04-07`

## 10. Official Agent-Related Posts/Papers

- `Introducing the Realtime API` (`2024-10-01`) is the key official post for low-latency voice agents and multimodal streaming. Source: https://openai.com/index/introducing-the-realtime-api/ ; Verified: `2026-04-07`
- `Introducing Operator` (`2025-01-23`) is the key official product post for OpenAI’s browser-using agent. Source: https://openai.com/index/introducing-operator/ ; Verified: `2026-04-07`
- `Computer-Using Agent` (`2025-01-23`) is the key official research/release post for the CUA model and its benchmarks/safety framing. Source: https://openai.com/index/computer-using-agent/ ; Verified: `2026-04-07`
- `Introducing Codex` (`2025-05-16`) is the key official post tying Codex, Codex CLI, and agentic software engineering together. Source: https://openai.com/index/introducing-codex/ ; Verified: `2026-04-07`
- `Introducing GPT-5` (`2025-08-07`) matters to the agentic ecosystem because it frames the flagship model family that current OpenAI tool-using and agent products build on. Source: https://openai.com/index/introducing-gpt-5/ ; Verified: `2026-04-07`
- `[UNVERIFIED]` I did not confirm a separate standalone OpenAI arXiv paper specifically for Operator or CUA beyond the official release/research pages and linked materials surfaced in this pass. For a public comparison page, use the verified official posts above unless you independently verify a paper URL. Source basis: https://openai.com/index/introducing-operator/ ; https://openai.com/index/computer-using-agent/ ; Verified: `2026-04-07`

## 11. Safety Frameworks

- OpenAI’s Usage Policies are a current official policy surface and are published at `https://openai.com/policies/usage-policies/`. The page in this pass shows an effective date of `2025-10-29`. Source: https://openai.com/policies/usage-policies/ ; Verified: `2026-04-07`
- OpenAI’s public Model Spec lives at `https://model-spec.openai.com/`, and OpenAI’s `Inside our approach to the Model Spec` post explains that the Model Spec complements, rather than replaces, the Preparedness Framework. Source: https://model-spec.openai.com/ ; https://openai.com/index/inside-our-approach-to-the-model-spec/ ; Verified: `2026-04-07`
- Preparedness Framework: OpenAI clearly still references it as an active safety framework in public materials, including the CUA release page and the Model Spec explainer. However, I did not successfully retrieve the canonical current Preparedness Framework page or PDF URL in this verification pass, so the framework itself is verified as referenced by OpenAI, but its direct canonical URL is `[UNVERIFIED]` here. Source: https://openai.com/index/computer-using-agent/ ; https://openai.com/index/inside-our-approach-to-the-model-spec/ ; Verified: `2026-04-07`
- OpenAI’s computer-use guidance adds practical agent-safety guidance on top of policy/framework text: use sandboxed environments, respect pending safety checks, keep humans in the loop when checks fire, and avoid high-stakes or fully authenticated deployments without additional oversight. Source: https://platform.openai.com/docs/guides/tools-computer-use ; Verified: `2026-04-07`

## Sources

All URLs below were accessed and verified on `2026-04-07`.

- https://github.com/openai/codex
- https://github.com/openai/codex/releases
- https://developers.openai.com/codex/
- https://developers.openai.com/codex/auth
- https://developers.openai.com/codex/models
- https://developers.openai.com/codex/config-basic
- https://developers.openai.com/codex/config-advanced
- https://developers.openai.com/codex/config-reference
- https://developers.openai.com/codex/sandboxing
- https://developers.openai.com/codex/mcp
- https://developers.openai.com/codex/hooks
- https://developers.openai.com/codex/rules
- https://developers.openai.com/codex/subagents
- https://openai.com/index/introducing-codex/
- https://help.openai.com/en/articles/11381614-codex-cli-and-sign-in-with-chatgpt
- https://openai.com/index/introducing-codex-app/
- https://help.openai.com/en/articles/6825453-chatgpt-rlease-notes
- https://openai.com/index/introducing-gpt-5/
- https://platform.openai.com/docs/models
- https://platform.openai.com/docs/models/gpt-5-codex
- https://openai.com/index/introducing-gpt-5-4/
- https://platform.openai.com/docs/models/gpt-5.4
- https://openai.com/index/introducing-gpt-5-4-mini/
- https://platform.openai.com/docs/models/gpt-5.4-mini
- https://openai.com/index/introducing-operator/
- https://help.openai.com/en/articles/11428486-operator-is-now-deprecated
- https://openai.com/pricing
- https://openai.com/index/computer-using-agent/
- https://platform.openai.com/docs/guides/tools-computer-use
- https://platform.openai.com/docs/api-reference/assistants
- https://platform.openai.com/docs/api-reference/threads?lang=javascript
- https://platform.openai.com/docs/assistants/deep-dive
- https://platform.openai.com/docs/assistants/tools/code-interpreter
- https://platform.openai.com/docs/assistants/tools/file-search
- https://platform.openai.com/docs/assistants/tools/function-calling
- https://help.openai.com/en/articles/8550641-assistants-api-v2-faq
- https://platform.openai.com/docs/guides/migrate-to-responses#assistants-api
- https://openai.com/index/introducing-the-realtime-api/
- https://platform.openai.com/docs/guides/realtime
- https://platform.openai.com/docs/guides/realtime-webrtc
- https://openai.com/index/introducing-gpt-realtime-and-realtime-api-updates/
- https://github.com/openai/swarm
- https://openai.github.io/openai-agents-python/
- https://github.com/openai/openai-agents-python
- https://github.com/openai/openai-agents-js
- https://help.openai.com/en/articles/8555517-function-calling-in-the-openai-api
- https://openai.com/index/introducing-structured-outputs-in-the-api/
- https://openai.com/policies/usage-policies/
- https://model-spec.openai.com/
- https://openai.com/index/inside-our-approach-to-the-model-spec/
