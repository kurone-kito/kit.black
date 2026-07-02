# Guidelines for AI Agents

## Immediate rules

- Match the conversational language to the user's language.
- Write comments and documentation in English unless there is a clear
  project-specific reason otherwise.
- If uncertainty, hidden risk, or missing context blocks a safe change,
  stop and ask a concise question before proceeding.

## IDD Workflow

This project uses Issue-Driven Development (IDD) with parallel AI
agents. Start with [docs/idd-workflow.md](docs/idd-workflow.md) for the
cross-agent entry path and phase routing.

Gemini CLI agents should manually open
`.github/instructions/idd-overview-core.instructions.md` and the routed
phase file before starting IDD work.

The repository's recorded IDD policy lives in
[docs/idd-policy.md](docs/idd-policy.md).
