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
  onboarding-scoped `{{...}}` token is the literal doc example
  `{{placeholder}}` in vendored upstream onboarding docs (routed
  upstream in kurone-kito/idd-skill#1207), not an unresolved onboarding
  placeholder. A separate, unrelated `{{...}}` class — the app's own
  `packages/web/src/i18n/{en,ja}.ts` runtime template tokens — is
  documented below; it predates this repository's IDD adoption and is
  not an onboarding placeholder either.

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
    rule). This was the fail-closed `ciGate.trustEmptyProtectionReads`
    default doing its job, per design, at the time of this verification
    pass — see Required-Check-Read Trust below for the #241 decision
    that later flipped the key to `true`.
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

### v0.11.0 re-import verification

**Re-imported and verified on 2026-09-17** (roadmap #244, completion
track #252 — see the roadmap for the full seven-track prerequisite
list, #245 through #251). The repository moved from the v0.6.0 baseline
onto **upstream tag `v0.11.0` (commit
`1f90787ebf4021673ce6e5eb69741df331fd2037`, released 2026-09-12)**.
`.github/idd/config.json`'s `iddVersion` carries the tag's declared
template value, `"0.11.0"`.

- The onboarding hearing for this re-import was resolved up front in
  roadmap #244's own "Wizard and clarification decisions" table, before
  the child tracks were created — see the resolved-values summary in
  the relevant sections below rather than repeating the whole table
  here.
- The Step 6 checklist passed again against the re-imported set:
  `node scripts/idd-doctor.mjs` reports `passed (4 warning(s))` with
  **zero errors** — required instruction/reference files, profile
  artifacts, marker prefix, project-commands table, merge/review policy
  signals, `.github/idd/config.json` schema validation, and all three
  agent entry files (`AGENTS.md`, `CLAUDE.md`, `GEMINI.md`) pass. The
  corrupted `<placeholder>`-as-shell-redirection regression check
  (`grep -rn '< [a-z-]* >' .github/instructions docs profiles
.claude/skills`) still returns no matches.
  - The `worktreeGuard`/`core.hooksPath` warning remains the same husky-
    chains-`.githooks` false alarm recorded at v0.6.0.
  - The "branch protection is enabled but no required status checks are
    configured on main" warning is genuine and independently confirmed:
    `gh ruleset view` on both of this repository's active rulesets
    (`main`, `features`) shows neither contains a
    `required_status_checks` rule. This matches issue #129 ("Register
    idd-advisory-convergence as a required check") still being **open**
    — see Advisory-Convergence Gate below, unchanged from the v0.6.0
    record.
  - The autopilot-suitability score/label disagreement now covers
    **two** issues, both accurate by design: #136 (recorded at v0.6.0)
    and #122 — the v0.6.0 re-import's own roadmap issue, still open and
    carrying `status:blocked-by-human` alongside a stale score of 3.
  - The v0.6.0-era placeholder-scanner false positive
    ([kurone-kito/idd-skill#2079](https://github.com/kurone-kito/idd-skill/issues/2079))
    is **resolved**: `idd-doctor.mjs` now scans an explicit allowlist of
    IDD-managed path classes (`docs/*.md`, `profiles/`, `.claude/skills/`,
    the vendored helper bundle, `.github/idd/`) that never reaches an
    adopter's own application source, so
    `packages/web/src/i18n/{en,ja}.ts`'s `{{ year }}` runtime template
    token no longer triggers it. The fix landed upstream and flowed back
    through this re-sync with no local patch needed.
- `node scripts/validate-schemas.mjs`: all 20 managed fixture pairs (10
  schemas × valid/invalid) validate successfully, plus the
  `schemas/phase-graph.json` live-data case — no unexplained missing
  managed schema/fixture pair. The CLI itself does not reach a clean
  exit, though: upstream added a new live-data check at v0.11.0
  (`idd-skill#2279`) that reads
  `idd-template/docs/onboarding/hearing-catalog.json`, a path that
  assumes the script runs inside the `idd-skill` source repository's own
  `idd-template/` tree. This adopter repository's real hearing catalog
  lives at `docs/onboarding/hearing-catalog.json` (no `idd-template/`
  prefix, since kit.black is not the idd-skill template repository
  itself), so the CLI throws an uncaught `ENOENT` after printing the
  fixture-pair results. This is a script/adopter-layout mismatch, not a
  missing managed pair; it is recorded as a known local gap rather than
  patched by this verification track, since `scripts/` is
  #245/#246/#247's candidate-file territory, not this document's.
- `node scripts/helper-runtime-manifest.mjs --profile vendored-node`
  reports exactly **115 managed files: 73 scripts, 22 schemas, 20
  fixtures** — confirmed by direct inspection of the manifest's
  `managedFiles` list, matching this repository's actual `scripts/`,
  `schemas/`, and `fixtures/schemas/` contents exactly (one additional
  file, `scripts/advisory-comment-debounce.mjs`, exists in `scripts/`
  but is deliberately outside the 73 managed files — see Advisory-
  Convergence Gate below). This is the delta roadmap #244 recorded: up
  from the prior 89-file set (57 scripts, 16 schemas, 16 fixtures).
- `pnpm run lint` and `pnpm run test` pass with the same known exception
  recorded at v0.6.0 and reconfirmed unchanged here: only
  `packages/web`'s `Calendar.test.tsx` fails (the same missing
  credential-bound `src/data.json`); `packages/lib` and
  `packages/fetcher` are fully green, and the rest of `packages/web`
  passes (149 passed, 2 skipped alongside the one failing suite).

## Merge Policy

**Policy**: `fully_autonomous_merge`, with an explicit
`mergePolicyAck: "fully_autonomous_merge"` acknowledgement recorded in
`.github/idd/config.json` (v0.11.0 re-import, roadmap #244) confirming
the operator's continued acceptance of this policy — the policy value
itself is unchanged from the original onboarding decision.

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

## Project Commands

**Policy** (`commands`, set in #208): the human-readable mirror of
`.github/idd/config.json`'s `commands` object, kept in sync in the same
change.

<!-- dprint-ignore-start -->

| Name                  | Commands                                                                                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **install-deps**      | `pnpm install --prefer-frozen-lockfile`                                                                                                                                   |
| **fix-validate**      | `pnpm run lint:fix && pnpm run lint`                                                                                                                                      |
| **pre-push-validate** | `pnpm --filter @kurone-kito/kit.black-lib run build && pnpm --filter @kurone-kito/kit.black-web run prebuild:yaml && pnpm run lint && pnpm run test`                      |
| **post-fix-validate** | `pnpm --filter @kurone-kito/kit.black-lib run build && pnpm --filter @kurone-kito/kit.black-web run prebuild:yaml && pnpm run lint:fix && pnpm run lint && pnpm run test` |

<!-- dprint-ignore-end -->

`pre-push-validate` and `post-fix-validate` build `packages/lib` first:
`packages/lib`'s `package.json` resolves `main` to `dist/index.mjs`, which
only exists after `pnpm run build`, and both `packages/fetcher` and
`packages/web` import `@kurone-kito/kit.black-lib` as a workspace
dependency. Without the build, `pnpm run test` in a freshly created IDD
worktree fails to resolve that import even though nothing is actually
broken. `fix-validate` is deliberately left unchanged — lint alone never
touches workspace `dist/` output, so it has no equivalent gap.

Building `packages/lib` alone (not a full `pnpm run build`) is
deliberate: a root build also runs `packages/web`'s `prebuild:fetcher`
script, which calls the live Google Calendar API and needs credentials
(`CLIENT_ID`/`CLIENT_SECRET`/`ID_*`/`REFRESH_TOKEN`) that do not exist in
a fresh worktree. `packages/web`'s `Calendar.test.tsx` statically imports
the resulting `src/data.json` with no fallback, so it stays a known,
separate, credential-bound gap outside `pre-push-validate`'s scope — see
the v0.6.0 re-import verification note above and #208.

A sibling, non-credential-bound gap existed alongside it: `Head.test.tsx`
statically imports `packages/web/src/constants.json`, which is generated
by the separate `prebuild:yaml` script (no credentials needed) and was
also absent in a fresh worktree. `pre-push-validate` and
`post-fix-validate` now also run
`pnpm --filter @kurone-kito/kit.black-web run prebuild:yaml` before
`pnpm run lint` (`pnpm run lint:fix` in `post-fix-validate`) and
`pnpm run test` (#270), the same credential-free way
`packages/lib`'s build gap was fixed above, so `constants.json` exists by
the time `Head.test.tsx` runs in a fresh worktree and that test file no
longer fails there. `prebuild:fetcher` and the aggregate
`pnpm run "/^prebuild:.+/"` (`prebuild`) script remain deliberately
excluded from both commands — only `prebuild:yaml` was folded in — since
`prebuild:fetcher` is the credential-bound step the paragraph above
describes.

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

## Vendored-Content Security-Scanner Alerts

**Policy** (decided 2026-09-17, tracked in #271): **Option B** —
documented manual-dismissal-with-justification convention. No new
`ciGate` configuration surface for this class of finding.

Option A (registering specific CodeQL rule/path combinations as
`ciGate.externalChecks.waivable` entries, mirroring the existing
`idd-advisory-convergence` waiver) was considered and rejected as
infeasible against the current schema: `schemas/policy.schema.json`
defines `externalChecks.waivable[].selector` as matching a
repo-external **check name** only ("Name or glob selector for a
repo-external check eligible for a maintainer-authorized waiver"), with
no rule- or path-level granularity. Registering a selector for this
class of finding would waive the entire CodeQL check repository-wide,
not the one vendored-content alert — a materially larger and riskier
change than the issue described, not a reuse of the existing mechanism.
Building genuine rule/path granularity would require a new gate
feature, which this decision does not adopt.

When a security-scanner alert (CodeQL or otherwise) is confirmed to sit
inside content this repository re-syncs byte-identical from
`kurone-kito/idd-skill` (`scripts/`, `schemas/`, `fixtures/schemas/` —
see [Formatting Divergence](#formatting-divergence)), a maintainer
dismisses the alert directly in GitHub's code-scanning UI with a
justification comment citing the byte-identical-vendoring constraint
and, when one exists, the upstream relay issue tracking the finding
(e.g. #261, #264). No `ciGate` configuration change accompanies the
dismissal, and no autonomous agent dismisses a code-scanning alert on
its own authority. This does not prevent a future re-sync from
re-reporting the same finding as new; each recurrence is dismissed the
same way until the fix lands upstream and flows back through a re-sync.

## Required-Check-Read Trust

**Policy** (`ciGate.trustEmptyProtectionReads`, set in #241): `true`.

Across four consecutive autopilot runs (2026-08-13 through 2026-08-15)
and all 10 merges in the most recent run (PRs #231-#240), the
branch-protection and ruleset reads were independently reconfirmed
genuinely empty every time with no drift
(`branches/main/protection` → 404 "Branch not protected"; `rulesets` →
200, two active rulesets, neither containing a `required_status_checks`
rule). But the fail-closed default formally held every one of those 10
merges — `pre-merge-readiness.mjs` returned `ready: false` on
`protectionReadsUnreadable: true` each time — forcing a manual `gh pr
merge --match-head-commit` override instead of the sanctioned
`idd-merge-execute.mjs --apply` helper (PRs #238-#240 carry an explicit
disclosed-override PR comment recording this). This is exactly the "a
404 that starts actually holding merges" condition the prior Deferred
entry named as its own revisit trigger, so #241 recorded the decision to
flip the key.

The repository operator accepts the residual risk this opts into: a
token-scope problem masquerading as a `404` is no longer distinguished
from a genuine empty read — this key restores the pre-`#1377` trusting
behavior described in
[`idd-ci.instructions.md`](../.github/instructions/idd-ci.instructions.md)'s
Required-check discovery step. Revisit if that risk materializes — a
`404` that turns out to mask a real permission gap rather than a
genuinely empty read.

## Advisory-Convergence Gate

**Status**: hosted as a **non-required** check (`.github/workflows/idd-advisory-convergence.yml`,
added in #127, re-adapted for v0.11.0 in #251 from the `idd-template/`
artifact upstream ships at `v0.11.0` — upstream's own copy still pins
`actions/checkout@v4` at this tag (confirmed against the upstream
source); this repository's copy keeps its local `actions/checkout@v7`
divergence, matching the sibling `push.yml`/`push-main.yml` workflows).
It triggers on `pull_request`, `pull_request_review`,
`pull_request_target`, and manual `workflow_dispatch` (for re-checking
after a maintainer waiver); `pull_request_review_comment` was dropped
from this workflow at v0.11.0 and moved to the new companion below.

- **v0.11.0 re-adaptation** (#251): adds `helperRuntime.profile`
  resolution with a fail-closed path for an `instructions-only` or
  ambiguous profile (a missing/invalid profile no longer silently runs
  the vendored-node command anyway); adds the `pull_request_target`
  trigger plus its own `idd-advisory-convergence-self-waiver` job (posts
  a narrowly-scoped external-check waiver for a PR that fixes this
  gate's own checking logic, so it can benefit from its own fix while
  still unmerged); this repository's own deployment conventions
  (`actions/checkout@v7`, `ref: main`, `persist-credentials: false`, the
  `CI_RUNNER_LABEL` fallback to `ubuntu-latest`, explicit `setup-node`
  from `.node-version`) are unchanged.
- **Non-required comment companion** (`.github/workflows/idd-advisory-convergence-comment.yml`,
  #251): a separate, also non-required workflow that now owns the
  `pull_request_review_comment` trigger dropped from the main workflow
  above, invoking the newly vendored
  `scripts/advisory-comment-debounce.mjs` to protect the
  `ciWait.rerunPolicy: rerun-once` budget from idd-originated
  comment-reply bursts. `advisory-comment-debounce.mjs` is deliberately
  **outside** the 115-file managed helper bundle (see Helper Runtime
  Profile below) — it is a workflow-specific helper this repository
  vendored directly, byte-identical and sha256-verified against
  `kurone-kito/idd-skill@v0.11.0:scripts/advisory-comment-debounce.mjs`,
  and marked `linguist-vendored` the same as every other vendored file.
- **Scope** (`advisoryWait.convergenceScope`, set in #126):
  `idd-claimed` — see PR Review Policy above for why (Dependabot PRs stay
  out of the gate).
- **Waiver surface**: configured and live — see External-Check Waivers
  above.
- **Required-check enforcement**: still not yet active as of the v0.11.0
  re-import verification (#252, 2026-09-17) — reconfirmed directly:
  `gh ruleset view` on both of this repository's active rulesets
  (`main`, `features`) shows neither contains a `required_status_checks`
  rule. Registering `idd-advisory-convergence` as a required status
  check is a GitHub Ruleset edit tracked in #129 (still open), an
  operator-only action (repository Settings access this automation does
  not hold). Until #129 lands, the workflow's verdict is advisory-only,
  matching this repository's `copilot-advisory` review policy; #129
  does not block #128 or #244/#252, since the gate already runs and
  produces real signal as a non-required check.

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
`scripts/` (#225) and `schemas/` + `fixtures/schemas/` (#226) were synced
verbatim from `idd-skill` `v0.6.0` and re-synced verbatim to `v0.11.0`
in #246/#247, excluded from prettier/eslint/oxlint/cspell reformatting
and marked `linguist-vendored` (#222, #223, extended for the v0.11.0
delta in #248), so they stay byte-identical across re-imports and diff
cleanly against upstream. `helperRuntime.profile: vendored-node` was
verified against the committed bundle in #228, and reconfirmed against
the v0.11.0 bundle in #252
(`node scripts/helper-runtime-manifest.mjs --profile vendored-node`
reports exactly 115 managed files: 73 scripts, 22 schemas, 20
fixtures — see the v0.11.0 re-import verification note above).

**Node 24 LTS floor (load-bearing, #141).** Upstream helpers declared
`engines.node: "^22.22.2 || >=24.2.0"` at `v0.6.0`, with 39 of the then
57 vendored `scripts/*.mjs` files gating their CLI body on
`import.meta.main`, which does not exist before Node 24.2.0. On this
repository's previous Node 23.6.1 pin, every gated helper — including
`node scripts/idd-doctor.mjs` — printed nothing and exited `0`: a silent
fail-open no-op that let every gate the vendored bundle feeds pass
vacuously. `.nvmrc` / `.node-version` / `.tool-versions` and
`package.json`'s `engines.node` now require `>=24.2.0`; every helper
invocation in this repository's instructions runs under that floor. At
`v0.11.0` the vendored `helper-runtime-manifest.mjs` itself declares a
wider `nodeEngines: "^22.23.2 || ^24.2.0 || >=26.0.0"` (confirmed by
direct inspection of its output), which the repository's `>=24.2.0` pin
(currently Node 24.19.0 in this worktree) still satisfies; no floor
change was needed for the v0.11.0 re-import.

Upgrading to `package-manager` remains a tracked follow-up once a
reviewed helper spec (a published package, or a pinned tarball evaluated
under the same review bar) becomes available — see Deferred below.

## Issue-Authoring Companion

**Status**: installed at `.claude/skills/issue-authoring/`, refreshed to
the v0.11.0 ownership/publication contract in #249 — atomic labeled
publication and release guards, exact publication-intent body identity,
set/anchor ownership tracking, and hardened marker cleanup and stale
self-waiver handling (verified present in
`.claude/skills/issue-authoring/references/contract.md`'s ownership,
publication-intent, and candidate-file sections during the #252
verification pass).

**Authoring language and clarification bound**: `authoringLanguage` is
set to `"en"` and `issueAuthoring.maxClarificationRounds` to `3`
(roadmap #244's resolved hearing values, applied in #250) — matches the
existing English issue/PR prose convention. The companion's Stage 1
hold uses the `issueAuthoring.authoringLabelName` value
(`status:authoring`) until explicit release, as recorded in the same
hearing.

**Authoring journal**: `issueAuthoring.journalIssue` is set to
`kurone-kito/kit.black#267` (#268). Issue #267 is the durable,
comment-only publication-intent journal for standalone issue-authoring
sets with no existing issue or anchor of their own — it must stay open
and comment-only (never closed, never treated as an IDD work item).

Issue #252's own acceptance criteria were scoped, at hearing time, to
record "no standalone journal issue" as part of the broader v0.11.0
onboarding-hearing durable record for this area. This configuration
supersedes that hearing-time outcome: #252's eventual record must
reflect the #267 journal configured here rather than the earlier
"none" state.

**Reconciled against roadmap #244's own hearing table** (v0.11.0
re-import, verified in #252): the resolved value there reads "No new
journalIssue; this re-import is anchored by existing roadmap #244" — a
decision not to create an _additional_ journal target, not a reversal
of the pre-existing #267 configuration above (which predates this
re-import and was set independently via #268). The two records do not
conflict: #267 remains the repository's one and only configured
authoring journal, unchanged by the v0.11.0 re-import.

**Residual risk**: no mechanical Discover exclusion protects #267 from
ordinary issue selection yet — `idd-discover.instructions.md`'s A0-O
orphan-first fallback has no special case for a configured
`issueAuthoring.journalIssue` target, and neither does the vendored
`scripts/discover-orphan-filter.mjs` helper. In practice, both
`node scripts/discover-viability-gate.mjs --issue 267` and
`node scripts/suitability-triage.mjs --issue 267` already reject #267
today (`clear_verification` / `actionability` fail, since the issue
describes no implementable work), so accidental selection is unlikely
under this repository's current A4/A4.5 gates — but that protection is
incidental (a byproduct of the issue's own prose), not a guaranteed
invariant. Recommended follow-ups: apply the configured
`status:blocked-by-human` label to #267 directly (cheapest; mechanically
excludes it via A3's own label bullet, though the semantic fit is a
stretch since the issue is not actually blocked on a human decision),
or extend A0-O and its helper to explicitly skip the configured journal
target.

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

Tracked, but intentionally not changed by #128, the v0.6.0 re-import, or
the v0.11.0 re-import (#252):

- **`helperRuntime.profile: package-manager`** — once
  `@kurone-kito/idd-skill` is published to the npm registry with a
  reviewed, non-mutable spec. The newly-available `helperRuntime.packageSpec`
  pin (an unreviewed mutable tarball/git-URL source) was considered during
  the v0.6.0 re-import and declined in favor of vendoring (see Helper
  Runtime Profile above); roadmap #244's v0.11.0 hearing reconfirmed the
  same choice ("Keep vendored-node; the upstream package is
  private/unpublished") — still unpublished as of this verification.
- **`instructionProfile: "lite"`** — the `lite/` condensed phase files are
  imported (#123) and available, but the opt-in switch stays unset:
  upstream's `schemas/policy.schema.json` root object rejects unknown
  properties, so setting this key today fails `idd-doctor`'s schema
  validation outright rather than merely doing nothing. Revisit once
  upstream's schema accepts the field; roadmap #244's v0.11.0 hearing
  reconfirmed keeping this unset for the same reason.
- **`advisoryWait.exemptBotAuthoredPrs`** — left unset (default `false`).
  It only matters under `advisoryWait.convergenceScope: "all-prs"`; this
  repository uses `"idd-claimed"`, which already keeps claimless PRs out
  of the gate, so the flag is redundant here.
- **Mutable upstream `main` delta past the tagged release** — as of the
  v0.11.0 re-import, upstream `main` sits at an untagged, 12-file delta
  (commit `adad8ae43c5a1b6fc3a100ce384c8a84a8d5139d` per roadmap #244),
  including polish/fix commits and GitHub Enterprise Server support (not
  applicable to this GitHub.com-hosted repository) — picked up by the
  next tagged release re-sync, not adopted early.
- **`critiqueLoop.delegate`** — not enabled. Roadmap #244's v0.11.0
  hearing table recorded "Do not enable critiqueLoop.delegate; no
  external reviewer CLI is configured" as the resolved answer; the C1
  critique pass continues to use the per-agent same-response mechanism.
- **Token-cost development tooling** — deferred as upstream development
  tooling, not part of the managed vendored bundle: roadmap #244's
  "canonical source comparison is the upstream helper-runtime-manifest.mjs
  for vendored-node; root-level upstream development tools such as
  token-cost scripts are not adopter helpers and remain out of scope."
- **`developmentBranch` / `provider` / `upstreamEscalation.enabled`** —
  all left unset. Roadmap #244's v0.11.0 hearing recorded "Leave
  developmentBranch and provider unset; the repository uses main and
  GitHub" as the resolved answer (no non-default development branch or
  non-GitHub provider in use); `upstreamEscalation.enabled` stays unset
  as noted in the `validate-schemas.mjs` entry below, since autonomous
  upstream filing is out of this workflow's scope regardless of the
  field's value.
- **`scripts/validate-schemas.mjs` manifest-aware fixture discovery
  (#258)** — a deliberate, repository-owner-authored local divergence
  from byte-identical vendoring, not a re-import artifact: the shipped
  `discoverSchemaCases()` scanned the physical `schemas/` directory
  unconditionally and required a fixture pair for every `*.schema.json`
  file, so it exited 1 immediately whenever a managed schema lacked
  fixtures (the `vendored-node` profile intentionally curates a
  smaller managed-fixture set than managed-schema set). Fixed locally to
  read the managed-fixture set from `helper-runtime-manifest.mjs`'s own
  `collectVendoredFiles()` instead. This was **not** filed upstream by
  this workflow — autonomous upstream filing is out of scope
  ([Upstream-candidate escalation](../.github/instructions/idd-overview-appendix.instructions.md#upstream-candidate-escalation)'s
  "what never to do" prohibits writing to `kurone-kito/idd-skill`, and
  `upstreamEscalation.enabled` is unset here regardless). The v0.11.0
  re-sync (#246) overwrote this local patch with the byte-identical
  upstream copy as expected, and the divergence was re-applied
  afterward with two additional review-driven fixes on PR #266 (commit
  `dfe45c6`, Refs #258): `collectManagedFixtureSchemaNames` now tracks
  which specific half (valid/invalid) of a fixture pair each schema
  declares rather than treating any-half-declared as fully managed, and
  `discoverSchemaCases()` takes an optional `declaredPaths` parameter so
  it stays unit-testable against a synthetic root. Whether to report
  this upstream, and how to reconcile it with byte-identical vendoring
  on the next re-sync, remains an operator decision outside this
  workflow; expect `scripts/validate-schemas.mjs` to diff against
  upstream at the next re-sync and re-apply (or re-evaluate) this
  divergence rather than silently overwriting it.
- **`scripts/validate-schemas.mjs` onboarding-hearing-catalog live-data
  path assumption (found during #252, unresolved)** — upstream added a
  live-data validation case at v0.11.0 (`idd-skill#2279`) that reads
  `idd-template/docs/onboarding/hearing-catalog.json`, assuming the
  script runs inside the `idd-skill` source repository's own
  `idd-template/` tree. This repository's real hearing catalog lives at
  `docs/onboarding/hearing-catalog.json` (no `idd-template/` prefix), so
  running `node scripts/validate-schemas.mjs` here throws an uncaught
  `ENOENT` after printing all 20 fixture-pair results — the managed
  schema/fixture pairs themselves are all complete; only this one
  hardcoded live-data path is unreachable in a `vendored-node` adopter
  checkout. Not fixed by #252 (out of its `docs/idd-policy.md`-only
  scope; `scripts/` is #245/#246/#247's candidate-file territory) — see
  the #252 PR body for the candidate follow-up.
