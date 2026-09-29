# dotagents

My personal agent marketplace: self-authored and curated third-party skills & plugins for Claude Code and Codex.

Like dotfiles, but for AI agents. This repo collects the skills and plugins I use — ones I wrote and ones I picked up from others — in a single marketplace, so I can install everything from one place on any machine. My shell config lives in a separate repo, `dotfiles`.

## Install

### Claude Code

Add the marketplace:

```text
/plugin marketplace add arthurc0102/dotagents
```

Install a plugin:

```text
/plugin install <plugin>@arthurc0102
```

### Codex

Work in progress.

## Catalog

### Mine

| Name           | Type | Description                                                                                                                                                                                              |
| -------------- | ---- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ty-lsp         | LSP  | Python language server ([ty](https://github.com/astral-sh/ty)) for type checking and code intelligence, run through `uvx`. Requires [uv](https://docs.astral.sh/uv/).                                    |
| typescript-lsp | LSP  | TypeScript/JavaScript language server matched to the workspace: the native `tsc --lsp` for TypeScript 7+ (or when none is installed), `typescript-language-server` for older versions. Requires Node.js. |

### Third-party

| Name              | Type         | Description                                                                                                        | Source                                                                                                                                   | License    |
| ----------------- | ------------ | ------------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------- |
| i-have-adhd       | Plugin       | ADHD-friendly output: lead with the next action, numbered steps, no tangents.                                      | [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd)                                                                              | MIT        |
| eli5              | Plugin       | Explain any topic like I'm 5: an HTML picture explainer with big visuals and few words.                            | [anthropics/claude-plugins-community](https://github.com/anthropics/claude-plugins-community/tree/main/eli5)                             | MIT        |
| codex             | Plugin       | Use Codex from Claude Code to review code or delegate tasks.                                                       | [openai/codex-plugin-cc](https://github.com/openai/codex-plugin-cc)                                                                      | Apache-2.0 |
| humanizer         | Plugin       | Rewrite AI-sounding text so it reads naturally without changing what it says.                                      | [blader/humanizer](https://github.com/blader/humanizer)                                                                                  | MIT        |
| shuorenhua-zh-tw  | Skill        | Clean AI tone out of Traditional Chinese (Taiwan) text and align it with Taiwan terms and punctuation.             | [tentenco/shuorenhua-zh-tw](https://github.com/tentenco/shuorenhua-zh-tw), via [a fork](https://github.com/arthurc0102/shuorenhua-zh-tw) | MIT        |
| frontend-design   | Plugin       | Distinctive, production-grade frontend interfaces that avoid generic AI aesthetics.                                | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/frontend-design)            | Apache-2.0 |
| context7          | Plugin (MCP) | Up-to-date, version-specific library docs via Upstash's hosted Context7 MCP server.                                | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official/tree/main/external_plugins/context7)          | Apache-2.0 |
| feature-dev       | Plugin       | Feature development workflow with agents for codebase exploration, architecture design, and quality review.        | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/feature-dev)                | Apache-2.0 |
| playground        | Plugin       | Interactive single-file HTML playgrounds with visual controls, live preview, and a copyable prompt.                | [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official/tree/main/plugins/playground)                 | Apache-2.0 |
| mattpocock-skills | Plugin       | 27 engineering and productivity skills: grilling, spec/ticket flows, TDD, code review, domain modelling, and more. | [mattpocock/skills](https://github.com/mattpocock/skills)                                                                                | MIT        |
| herdr             | Skill        | Inspect and control Herdr workspaces, tabs, panes, and agents through the `herdr` CLI. CLI only.                   | [herdrdev/herdr](https://github.com/herdrdev/herdr/tree/main/skills/herdr)                                                               | Apache-2.0 |

## Repo structure

```text
.claude-plugin/
  marketplace.json   # marketplace manifest (name: arthurc0102)
plugins/
  <plugin>/          # plugins authored in this repo
```

Third-party plugins are referenced from their upstream repos in `marketplace.json` rather than copied here.

The exception is `shuorenhua-zh-tw`, which points at the fork [arthurc0102/shuorenhua-zh-tw](https://github.com/arthurc0102/shuorenhua-zh-tw). Upstream ships only a root `SKILL.md` without `.claude-plugin/plugin.json`, and claude.ai (including Claude Code on the web) doesn't list plugins that lack one, so the fork adds that manifest and otherwise tracks upstream. Once upstream ships its own manifest, point the entry back at [tentenco/shuorenhua-zh-tw](https://github.com/tentenco/shuorenhua-zh-tw) and retire the fork.

`herdr` has the same missing manifest but is referenced from upstream as is, so it shows up only in the Claude Code CLI. That's the only place it's needed, so it isn't worth forking.

## Adding a skill

TODO: document once the first plugins are added.

- **Own:** TODO
- **Third-party, referenced** (marketplace entry points at the upstream repo): TODO
- **Third-party, vendored** (copied into this repo, keeping the original license): TODO
