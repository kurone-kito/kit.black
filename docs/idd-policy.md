# IDD Policy Configuration

This repository uses Issue-Driven Development (IDD), imported from
[`kurone-kito/idd-skill`](https://github.com/kurone-kito/idd-skill). This
document is the human-readable record of the policy decisions confirmed
during onboarding (roadmap #110). The machine-readable mirror lives in
[`.github/idd/config.json`](../.github/idd/config.json); keep the two
aligned in the same change.

## Import verification

**IDD import verified on 2026-07-03** (onboarding roadmap #110, covering
tracks #111 through #115). The Step 6 checklist in
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
required.

### v0.6.0 re-import verification

**Re-imported and verified on 2026-08-15** (roadmap #122, close-out
track #128 — see the roadmap for the full prerequisite-track list). The
repository moved from the 2026-07-03 `iddVersion: 0.3.0` baseline onto
**upstream tag `v0.6.0` (commit `f1666048`)**.

- Roadmap #122 opened 2026-07-14 targeting the `v0.4.0` tag plus a
  forward-port from upstream commit `4103665`. A 2026-07-27 re-plan
  pinned a SHA snapshot (`4e8c7043`) instead, once upstream had moved
  `main` past `v0.4.0` without cutting a new tag; it re-baselined onto
  the `v0.6.0` tag on 2026-08-12 once upstream cut it.
  `.github/idd/config.json`'s `iddVersion` carries the tag's declared
  template value, `"0.6.0"`.
- The Step 6 checklist passed again against the re-imported set: all
  `.github/instructions/idd-*.instructions.md` files (now including the
  `lite/` weak-model-tier bundle), the expanded `docs/` set (adding
  `docs/idd-resume-detail.md`, `docs/idd-advisory-wait-shell-fallback.md`,
  `docs/idd-design-rationale.md`), and the four `profiles/` READMEs are
  present; `.github/idd/config.json` validates against
  `schemas/policy.schema.json`.
- The corrupted `<placeholder>`-as-shell-redirection command examples the
  0.3.0 import shipped (root-caused and fixed in #123) are confirmed
  gone and cannot come back:
  `grep -rn '< [a-z-]* >' .github/instructions docs profiles .claude/skills`
  returns no matches, and `pnpm run lint:fix` produces no diff under the
  vendored IDD surfaces.
- `node scripts/idd-doctor.mjs` (run under Node ≥24.2.0 — see Helper
  Runtime Profile below) now runs from the vendored bundle and produces
  real output instead of silently exiting 0. It reports 12 passing checks,
  3 warnings, and 1 error on this verification pass:
  - The `worktreeGuard`/`core.hooksPath` warning is a false alarm: husky's
    `.husky/pre-commit` and `.husky/pre-push` chain
    `.githooks/_idd-worktree-guard.sh` at the end of their own scripts (see
    Worktree Guard below), so the guard is active even though
    `core.hooksPath` points at `.husky/_` rather than `.githooks`
    directly.
  - The branch-protection-not-readable warning is genuine
    (`gh api repos/{owner}/{repo}/branches/main/protection` returns `404`;
    `gh api repos/{owner}/{repo}/rulesets` returns the repository's two
    active rulesets, neither of which contains a `required_status_checks`
    rule). This is the fail-closed `ciGate.trustEmptyProtectionReads`
    default doing its job, per design — see Deferred below for why the
    key stays unset rather than flipped here.
  - The autopilot-suitability score/label warning on issue #136 is
    accurate by design: #136 carries a stale score of 3 alongside its
    intentional `status:blocked-by-human` label.
  - The placeholder-scanner error
    (`packages/web/src/i18n/{en,ja}.ts: {{ year }}`) is a false positive —
    the scanner's `files` input is every git-tracked text-like file in the
    repository, not just IDD-managed paths, so it also reaches the
    application's own i18n runtime-template tokens. Filed upstream as
    [kurone-kito/idd-skill#2079](https://github.com/kurone-kito/idd-skill/issues/2079)
    rather than patched locally, since `scripts/idd-doctor.mjs` is
    vendored byte-identical from upstream (#225) and a local patch would
    silently revert on the next re-sync.
- `pnpm run lint` and `pnpm run test` pass, with one pre-existing,
  environment-specific exception: `packages/web`'s `Calendar.test.tsx`
  needs a live-credentialed `kb-fetcher` fetch (`src/data.json`) that is
  not obtainable in every execution environment (for example, a freshly
  created IDD worktree); this is a data-availability gap, not a defect
  introduced by the re-import.

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

**Advisory bot identities** (`advisoryWait.primaryBotLogin`,
`advisoryBotLogins`, set in #126):

- **Primary advisory bot**: `copilot` (bare login; matches the
  distributed default).
- **Ack-only classifiable bots** (`advisoryBotLogins`):
  `coderabbitai[bot]` and `chatgpt-codex-connector[bot]` — both observed
  on this repository's PRs. Copilot is deliberately excluded from this
  list: it is the gating primary, not an ack-only classifiable bot.
- **Secondary advisory bot**: unconfigured. `coderabbitai` was
  considered but is not a requestable reviewer on this
  repository — `gh api repos/{owner}/{repo}/collaborators/coderabbitai`
  returns `404` (only `kurone-kito` is a collaborator), and CodeRabbit
  reviews via GitHub App install rather than a request event. An inert
  `secondaryBotLogin` would make the advisory-wait path look like it has
  a fallback it does not have, so the key stays unset.

**Advisory-convergence scope** (`advisoryWait.convergenceScope`): set to
`idd-claimed` in #126. The distributed default is `all-prs`; this
repository runs Dependabot, so `idd-claimed` reports claimless PRs as
`not_applicable` instead of requiring Copilot convergence or a
maintainer waiver on every dependency-bump PR.

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

`.github/workflows/push.yml` (build/lint/test) runs on `issue/*` branches,
so IDD PRs carry real build/lint/test CI signal in addition to lint + test
run locally in the worktree (pre-push-validate), CodeQL, Copilot, and
CodeRabbit.

## Role Labels

**Policy** (`labels`, set in #126): `roadmapLabelName: roadmap`,
`blockedByHumanLabelName: status:blocked-by-human`,
`needsDecisionLabelName: status:needs-decision` — all pinned to their
distributed defaults, recorded explicitly rather than left implicit.

## Discover Concurrency Tuning

**Selection desync** (`discover.selectionDesync`, set in #126):
`session-offset`. Spreads concurrent autopilot sessions across an A4
Step 2 same-score tie band by a per-session offset, cutting claim races
between parallel sessions that would otherwise all pick the
lowest-numbered candidate.

## Merge-Gate Solo-CODEOWNER Fallback

**Policy** (`mergeGate.soloCodeownerAdminFallback`, set in #126):
`auto-admin-retry` (the distributed default). This repository has no
`CODEOWNERS`, so the key is currently inert; it is recorded so the
behavior is explicit if `CODEOWNERS` is ever added.

## External-Check Waivers

**Policy** (`ciGate.externalChecks.waivable`,
`ciGate.externalCheckWaivers`, set in #126): `idd-advisory-convergence`
(exact match) is waivable; waivers require `maintainer-authorized`
mode, `owners-and-maintainers-only` authority, and expire after
`PT24H` (24 h). This is the escape hatch that keeps the
`idd-advisory-convergence` required check (once #129 registers it)
from being unwaivable if the check gets stuck. For a claimless PR (e.g.
Dependabot), a maintainer can bind a waiver to the sentinel claim-id
`none` via `scripts/external-check-waiver.mjs --claimless` — the vendored
helper bundle (#225) ships this script now.

`ciGate.trustEmptyProtectionReads` intentionally stays unset (fail-closed
default) — see Deferred below.

## Advisory-Convergence Gate

**Status**: hosted as a **non-required** check (`.github/workflows/idd-advisory-convergence.yml`,
added in #127, adapted from the `idd-template/` artifact upstream ships
at `v0.6.0` — this repository's copy pins `actions/checkout@v7` instead
of upstream's `@v4`, matching the sibling `push.yml`/`push-main.yml`
workflows). It triggers on `pull_request`, `pull_request_review`,
`pull_request_review_comment`, and manual `workflow_dispatch` (for
re-checking after a maintainer waiver), and produces a convergence verdict
on every PR today.

- **Scope** (`advisoryWait.convergenceScope`, set in #126):
  `idd-claimed` — see PR Review Policy above for why (Dependabot PRs stay
  out of the gate).
- **Waiver surface**: configured and live — see External-Check Waivers
  above.
- **Required-check enforcement**: not yet active. Registering
  `idd-advisory-convergence` as a required status check is a GitHub
  Ruleset edit tracked in #129, an operator-only action (repository
  Settings access this automation does not hold). Until #129 lands, the
  workflow's verdict is advisory-only, matching this repository's
  `copilot-advisory` review policy; #129 does not block #128, since the
  gate already runs and produces real signal as a non-required check.

## Issue-Author Approval Gate

- **Gate posture**: `enabled-by-default` (no `skipIssueAuthorApprovalGate`
  opt-out).
- **`maintainer-approval-actors` policy**: `owners-and-maintainers-only`.
- The repository owner self-authorizes as issue author under this policy.

## Helper Runtime Profile

**Profile**: `vendored-node` (set in #228, superseding the earlier
`instructions-only` posture recorded at 2026-07-03 onboarding)

The operator preferred `package-manager` (pnpm) during onboarding, but the
IDD helper package `@kurone-kito/idd-skill` remains unpublished to the npm
registry. Rather than pin an unreviewed mutable source (a branch tarball
or git URL) via the newly-available `helperRuntime.packageSpec` field,
the repository vendors the reviewed, committed helper bundle directly:
`scripts/` (#225) and `schemas/` + `fixtures/schemas/` (#226) are synced
verbatim from `idd-skill` `v0.6.0` and excluded from prettier/eslint/
oxlint/cspell reformatting and marked `linguist-vendored` (#222, #223), so
they stay byte-identical across re-imports and diff cleanly against
upstream. `helperRuntime.profile: vendored-node` was verified against the
committed bundle in #228.

**Node 24 LTS floor (load-bearing, #141).** Upstream helpers declare
`engines.node: "^22.22.2 || >=24.2.0"`, and 39 of the 57 vendored
`scripts/*.mjs` files gate their CLI body on `import.meta.main`, which
does not exist before Node 24.2.0. On this repository's previous Node
23.6.1 pin, every gated helper — including `node scripts/idd-doctor.mjs`
— printed nothing and exited `0`: a silent fail-open no-op that let every
gate the vendored bundle feeds pass vacuously. `.nvmrc` / `.node-version`
/ `.tool-versions` and `package.json`'s `engines.node` now require
`>=24.2.0`; every helper invocation in this repository's instructions
runs under that floor.

Upgrading to `package-manager` remains a tracked follow-up once a
reviewed helper spec (a published package, or a pinned tarball evaluated
under the same review bar) becomes available — see Deferred below.

## Issue-Authoring Companion

**Status**: installed at `.claude/skills/issue-authoring/`.

## Worktree Guard

**Status**: enabled (`worktreeGuard.enabled: true`).

The opt-in git hooks under `.githooks/` refuse commits and pushes made
from the **primary** worktree while HEAD is on an implementation branch
(`issue/*` or `roadmap-audit/*`), enforcing the B1 disposable-worktree
rule locally. The hooks are pure POSIX sh.

`pnpm install`'s `"prepare": "husky"` script keeps `core.hooksPath`
pointed at `.husky/_` in this repository, so the `.githooks/` hooks never
fire on their own. `.husky/pre-commit` and `.husky/pre-push` chain the
same guard check (`.githooks/_idd-worktree-guard.sh`) at the end of
their own scripts, so the guard is active by default after a normal
`pnpm install` — no manual `core.hooksPath` opt-in is required.

Anyone who prefers routing hooks through `.githooks/` directly (for
example, outside this repo's husky wiring) can still opt in manually:

```sh
git config core.hooksPath .githooks
```

Either way, IDD implementation work must happen in a sibling worktree
(`git worktree add ../<repo>.<branch> -b <branch> origin/main`), not by
switching the primary worktree onto the issue branch.

## Claude Code Permission Baseline

**Status**: adopted (#142), from the upstream `idd-template/.claude/settings.json`
curated baseline, at `.claude/settings.json`.

Unlike the upstream default-off template, this repository's baseline
deliberately **enables merge-capable operations** — `gh pr merge` is
allowlisted, and the deny entries upstream ships for
`node scripts/idd-merge-execute.mjs` / `node bin/idd-merge-execute.mjs`
are removed — so that a Claude Code session can carry out the F3 merge
autonomously, matching this repository's `fully_autonomous_merge` policy.
`gh api` is deliberately **not** allowlisted at all (see the `gh api`
DELETE-verb trap documented in `docs/permissions.md` before adding any
`gh api` entry). Personal additions belong in
`.claude/settings.local.json`, which layers on top of this file.

## Formatting Divergence

Repository-wide Prettier formatting is **not** a preserved divergence for
vendored IDD surfaces — the opposite is true: `.prettierignore` excludes
them deliberately.

- `.github/instructions/`, the `docs/idd-*.md` set (except the
  locally-authored `docs/idd-policy.md`, re-included), `docs/concepts.md`,
  `docs/customization.md`, `docs/getting-started.md`, `docs/index.md`,
  `docs/permissions.md`, `docs/policy-constants.md`, `docs/reference.md`,
  `docs/onboarding/`, `profiles/`, and `.githooks/` are excluded (#123).
- The vendored helper bundle `/scripts/`, `/schemas/`, and
  `/fixtures/schemas/` is excluded (#222), anchored to the repository root
  so nested package directories of the same name (e.g.
  `packages/web/scripts/`) are not swept in.
- `.claude/skills/` is excluded as a vendored Claude Code skill bundle.

This exists because `prettier-plugin-sh` parsed the vendored docs'
`<issue-number>` / `<pr-number>` argument placeholders inside fenced
` ```sh ` blocks as shell redirections, corrupting sixteen command
examples across six files in the 0.3.0 import (five of them in
instruction files agents read as authoritative). `markdownlint-cli2`
keeps running on these paths and passes on upstream-faithful content;
only Prettier (and, for the helper bundle, `prettier-plugin-sort-json`)
is excluded.

## Deferred

Tracked, but intentionally not changed by #128 or the v0.6.0
re-import:

- **`helperRuntime.profile: package-manager`** — once
  `@kurone-kito/idd-skill` is published to the npm registry with a
  reviewed, non-mutable spec. The newly-available `helperRuntime.packageSpec`
  pin (an unreviewed mutable tarball/git-URL source) was considered during
  the v0.6.0 re-import and declined in favor of vendoring (see Helper
  Runtime Profile above).
- **`instructionProfile: "lite"`** — the `lite/` condensed phase files are
  imported (#123) and available, but the opt-in switch stays unset:
  upstream's `schemas/policy.schema.json` root object rejects unknown
  properties, so setting this key today fails `idd-doctor`'s schema
  validation outright rather than merely doing nothing. Revisit once
  upstream's schema accepts the field.
- **`ciGate.trustEmptyProtectionReads`** — left at the fail-closed
  default. `#128` verification reconfirmed the branch-protection and
  ruleset reads genuinely 404 (`gh api .../branches/main/protection` →
  404; `gh api .../rulesets` → 200, no `required_status_checks` rule), but
  this has not held any merge — this repository's own IDD sessions have
  proceeded on that direct 404 evidence across every PR merged since the
  rulesets were introduced, with no merge blocked by it. Revisit only if
  that changes (a 404 that starts actually holding merges).
- **`advisoryWait.exemptBotAuthoredPrs`** — left unset (default `false`).
  It only matters under `advisoryWait.convergenceScope: "all-prs"`; this
  repository uses `"idd-claimed"`, which already keeps claimless PRs out
  of the gate, so the flag is redundant here.
- **Upstream deltas landing after `v0.6.0`** — including polish/fix
  commits already on upstream `main` past the tag, and GitHub Enterprise
  Server support (not applicable to this GitHub.com-hosted repository) —
  picked up by the next release re-sync.
- **`scripts/idd-doctor.mjs` placeholder-scanner false positive** — filed
  upstream as
  [kurone-kito/idd-skill#2079](https://github.com/kurone-kito/idd-skill/issues/2079);
  see the v0.6.0 re-import verification note above. Non-blocking and
  profile-independent; the fix must land upstream and arrive via the next
  re-sync, since `scripts/` stays vendored byte-identical.
