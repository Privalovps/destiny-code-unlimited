# Migration plan for an existing application

No project source was supplied or inspected in this environment. Every path below is a proposed destination to adapt after repository discovery. No statement here claims that the existing implementation is broken in a specific file. `~/Desktop/Isoteric` is the requested target for subsequent Codex work.

1. Inspect repository instructions, current route structure, engine, chart, report schema, PDF renderer, public sample, checkout/webhook paths, entitlements, caches and saved reports. Record actual imports and old methodology identifiers. Preserve the repository's Webpack workflow.
2. Commit or otherwise preserve the current interpretation engine using the project's normal version-control process. Do not delete user changes or rewrite history. Record a rollback point and an inventory of old content surfaces.
3. Add the new method/data as a versioned parallel module. Keep calculation profile, editorial content revision and report schema version separate. Resolve branch/profile decisions explicitly before switching a production calculation path. The supplied profile is a research recommendation, not evidence of prior owner approval to rewrite saved reports.
4. Make source fixtures and JSON validation pass. Implement one shared report model and a role-aware composition pass. Generate a concrete sample and free preview before wiring purchase flows to the new report.
5. Audit current purchases and report persistence. Existing entitlement owners keep access without paying again. Preserve completed paid report snapshots or retain the old renderer for them. New numeric output must not silently replace a historical report without its method version being visible. A migration can offer an upgraded report under the same purchase if the existing authorization model supports that; it cannot invent or remove access.
6. Change the active method in one explicit release configuration after review. Backfill only fields required for version metadata; preserve DOB values, purchase references and access grants. Never infer a new entitlement from a cached premium report.
7. Replace old explanations and combinations across free view, paid web reading, expanded chart text, glossary, sample, and both PDF themes. Search for stale method names, chapter counts and obsolete generated fixtures. Do not preserve obsolete paragraphs simply to avoid touching an old component.
8. Regenerate the fixed public sample through the same engine. Protect arbitrary personalized premium generation. Scope report caches by method/content/schema/locale plus authorized identity or use private authorization-aware storage.
9. Run lightweight unit, schema, source-example, entitlement and report parity checks. Use mock purchase states; no live transaction is needed. Do not run production builds or browser automation without permission.
10. Record the chosen profile, known limitations, data hashes, source decisions, tests and rollback switch. Rollback changes the active method configuration and renderer selection, not entitlement records or payment history.

## Content replacement inventory

| Surface | Required result |
|---|---|
| Arcana library | New original English copy and correct8/11 convention |
| Position tooltips | All chosen roles, including additional nodes; no nine-position cap |
| Free preview | Limited role-derived statements, same numbers and version |
| Paid report | Shared role-aware report AST; explicit combination rules |
| Advanced sections | Real formulas and references from the same engine |
| Light / Dark PDF | Same AST and content hash, different theme |
| Public sample | Fixed fixture regenerated after content changes |
| Glossary / FAQ / marketing claims | No obsolete formulas, chapter counts or unsupported predictions |
| Saved reports | Version-aware access and rendering with rollback support |

## Payment and performance invariants

Preserve $12.90 (USD 1290 minor units), current authentication, checkout, provider signature verification, webhook validation, purchase ownership checks and premium authorization. Moving prose is no reason to redesign security. Authorization remains server-side for web and PDF routes. Avoid unnecessary dependencies. Do not launch Turbopack, parallel development agents, a memory-intensive production build, or browser automation without permission. Lightweight deterministic tests and type checks are the intended default.
