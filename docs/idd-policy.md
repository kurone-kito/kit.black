# IDD Policy Configuration

This repository uses Issue-Driven Development (IDD), imported from
[`kurone-kito/idd-skill`](https://github.com/kurone-kito/idd-skill). This
document is the human-readable record of the policy decisions confirmed
during onboarding (roadmap #110). The machine-readable mirror lives in
[`.github/idd/config.json`](../.github/idd/config.json); keep the two
aligned in the same change.

## Import verification

**IDD import verified on 2026-07-03** (onboarding roadmap #110, tracks
# 111–#115). The Step 6 checklist in
[`docs/onboarding/agent-entry-and-verification.md`](onboarding/agent-entry-and-verification.md)
passed:

- All 18 `.github/instructions/idd-*.instructions.md`, the imported
  `docs/` set, and the four `profiles/` READMEs are present.
- `.github/idd/config.json` is valid and records the confirmed policies
  (marker prefix `kit-black`, `fully_autonomous_merge`,
  `copilot-advisory`, `fast-agent-resolve`, claim/CI-wait defaults,
  approval gate enabled / `owners-and-maintainers-only`,
  `helperRuntime.profile: instructions-only`,
  `worktreeGuard.enabled: true`, `trustedMarkerActors: [kurone-kito]`).
- `idd-overview-core.instructions.md` frontmatter has `applyTo: '**'` and
  `excludeAgent: 'code-review'`; the `kit-black` marker names resolve in
  `idd-discover.instructions.md`.
- `.githooks/pre-commit` and `pre-push` are mode 100755.
- `CLAUDE.md`, `AGENTS.md`, `GEMINI.md` reference `docs/idd-workflow.md`;
  the issue-authoring companion is installed at
  `.claude/skills/issue-authoring/`.
- All seven onboarding placeholders are resolved. The only remaining
  `{{...}}` token is the literal doc example `{{placeholder}}` in
  vendored upstream onboarding docs (routed upstream in
  kurone-kito/idd-skill#1207), not an unresolved onboarding placeholder.

From this point the repository's own `.github/instructions/` are
authoritative; the upstream ("theirs") bootstrap flow is no longer
required. Known follow-ups: #117 (run `push.yml` on `issue/*` branches)
and the helper-runtime upgrade to `package-manager` once a reviewed
helper spec is published.

## Merge Policy

**Policy**: `fully_autonomous_merge`

One trusted agent session may execute the F3 merge after the normal
claim, freshness, CI, advisory, and review gates pass.

> **Operational caveat.** Every merge to `main` triggers a Netlify
> production deploy (`.github/workflows/push-main.yml`). The operator
> accepted the auto-deploy-on-merge tradeoff for maintenance speed.

## Credential Scope

- **Worker credentials**: least-privilege scope sufficient to claim,
  branch, push, and open PRs.
- **Merge-capable credentials**: under `fully_autonomous_merge`, one
  trusted agent session may hold the merge-capable set needed to
  continue through F3.

## PR Review Policy

**Profile**: `copilot-advisory` (distributed default)

The PR phases keep an advisory review step. In practice this repository
also receives GitHub Copilot and CodeRabbit reviews; a missing advisory
review is fail-safe via the generation timeout.

## Review-Thread Resolution Policy

**Policy**: `fast-agent-resolve`

An agent may resolve review threads after acting on accepted, rejected,
or advisory feedback.

## Critique-Loop Profile

**Profile**: distributed defaults (see
[`docs/policy-constants.md`](policy-constants.md)).

## Claim Timing

- **claim-stale-age**: `PT24H` (24 h)
- **claim-heartbeat-interval**: `PT12H` (12 h)

## CI Wait Policy

- **running timeout**: `PT30M` (30 min)
- **generation timeout**: `PT10M` (10 min)
- **rerun policy**: `rerun-once`

> **Repository note.** `.github/workflows/push.yml` (build/lint/test)
> currently does not run on `issue/*` branches because its branch filter
> uses `'*'`, which does not match branch names containing `/`. Until
> that is fixed (tracked in #117), IDD PRs are validated by lint + test
> run locally in the worktree (pre-push-validate) plus CodeQL, Copilot,
> and CodeRabbit; the build is exercised by the post-merge `main` deploy.

## Issue-Author Approval Gate

- **Gate posture**: `enabled-by-default` (no `skipIssueAuthorApprovalGate`
  opt-out).
- **`maintainer-approval-actors` policy**: `owners-and-maintainers-only`.
- The repository owner self-authorizes as issue author under this policy.

## Helper Runtime Profile

**Profile**: `instructions-only`

The operator preferred `package-manager` (pnpm) during onboarding, but
the IDD helper package `@kurone-kito/idd-skill` is not published to the
npm registry, so no reviewed, non-mutable helper spec is resolvable.
Rather than pin an unreviewed mutable source (a branch tarball / git
URL), the repository stays on the fail-safe `instructions-only` profile,
where the written decision tables in `.github/instructions/` are
canonical. Upgrading to `package-manager` is tracked as a follow-up once
a reviewed helper spec (a published package or a pinned tarball) is
available.

## Issue-Authoring Companion

**Status**: installed at `.claude/skills/issue-authoring/`.

## Worktree Guard

**Status**: enabled (`worktreeGuard.enabled: true`).

The opt-in git hooks under `.githooks/` refuse commits and pushes made
from the **primary** worktree while HEAD is on an implementation branch
(`issue/*` or `roadmap-audit/*`), enforcing the B1 disposable-worktree
rule locally. The hooks are pure POSIX sh.

`core.hooksPath` is a local, uncommitted setting, so each clone must opt
in once:

```sh
git config core.hooksPath .githooks
```

After that, IDD implementation work must happen in a sibling worktree
(`git worktree add ../<repo>.<branch> -b <branch> origin/main`), not by
switching the primary worktree onto the issue branch.
