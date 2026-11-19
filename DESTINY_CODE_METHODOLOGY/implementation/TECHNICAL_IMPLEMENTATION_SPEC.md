# Engineering specification

This document follows the independent source audit and chosen methodology. It does not authorize an external deployment or assert anything about uninspected code.

## Suggested boundaries, adapt to actual repository

| Module | Responsibility |
|---|---|
| methodology/data | Validated immutable JSON, provenance and decisions |
| methodology/calculate | Strict date parser, R22, ordered dependency evaluation, trace |
| methodology/compose | Domain/role selection, exact C-tail keys, bounded explicit combinations |
| methodology/report-model | Versioned semantic document tree, free DTO, fixed sample |
| server/report-service | Authenticate and verify the existing entitlement before personalized paid data access |
| render/web | Render the semantic model, accessible diagram and expanded details |
| render/pdf | Render the same semantic model with Light or Dark tokens |
| fixtures | Supplied dates, manual source assertions, forbidden-input and migration checks |

`reference/calculator.mjs` and the structured files are a portable mathematical reference, not an instruction to replace the Next.js security architecture. `types.ts` describes the contracts. JSON schemas are executable contracts. Do not silently coerce a missing property into a made-up interpretation.

## Calculation contract

`calculate(dateOnly, rules, calculationProfile)` returns all 38 named values and a step-by-step trace. Inputs use Gregorian date-only parsing. No local timezone, current clock, random number, display label, network model or birth-time adjustment affects the result. Unknown profile, invalid date, dependency or operation raises a typed error. Keep integers throughout. Evaluate a complete formula before applying R22; named intermediate formula values are already reduced.

The baseline profile uses family_center for every ancestral inner point. The alternate A/B ancestry profile exists only for research comparison until explicitly adopted as a separately versioned method. Never select a profile based on whichever output looks more plausible.

## Interpretation contract

Resolve `(positionId, calculatedArcana, domain, locale, contentVersion)`. Use the actual node role and domain reading; generic biography-style paragraphs cannot substitute for role-specific interpretation. Number meanings and position roles have separate provenance. All English copy is an editorial layer; sourceRefs do not imply that each sentence is a translation of that page.

Compose only declared channels. Preserve physical order separately from interpretation order. Tail lookup uses `[bottom,bottom_inner,bottom_mid]` and an exact string key; no sorting. A missing named key generates a disclosed general bottom-theme reading, not a fabricated named program. Generic programs have `automaticMatchingEnabled=false` and must remain inactive. A contrast uses a listed pair in the current section only. A repeated symbol counts distinct primary node IDs, never multiple uses of the same node.

No remote language model is required for baseline generation. If later introduced for style, it receives a complete verified semantic plan, cannot change numbers or create new rules, and needs an independent validation/fallback path; that is a separate scope.

## Document model and rendering

The authoritative `ReportModel` contains dateOnly, method version, calculation profile, content version, schema version, locale, source-data hash, values, ordered sections and provenance. A block includes its position/formula/combination IDs and classification. A section may contain introductory prose, position interpretations, a conditional example, a combination, a practice and a compact advanced note. The advanced note references the same calculations.

Calculate the semantic content hash on canonical serialized semantic content. Theme and pagination metadata are outside this hash. Both PDF themes and web should render equal semantic blocks in equal order, including headings, values, examples, disclosures and advanced notes. Browser and PDF markup may differ. Avoid shipping the entire paid catalog to the browser just to render a preview.

## Free, paid and public sample

The server prepares a free DTO with day/core core-symbolic-meaning fields and the framework disclosure. The numerical chart may be public if the existing product already exposes it; paid prose and complete personalized report AST remain protected. Use a server-only boundary for paid data imports in Next.js. Do not embed premium JSON, hidden paragraphs, downloadable URLs, or a serialized paid report in the initial public HTML or RSC payload.

Paid endpoints and PDFs use existing entitlement verification before fetching/rendering protected personalized reports. A public sample is an allowlisted fixed fixture, not a request parameter that disables authorization. Pricing remains USD 1290 minor units. Preserve existing checkout/webhook/entitlement logic.

## Versioning and migration

Recommended fields: `methodologyVersion`, `calculationProfile`, `contentVersion`, `reportSchemaVersion`, `sourceDataHash`, and existing purchase/report IDs. Do not change a historic report's numeric method by merely refreshing its text. Retain frozen output or an old version renderer. Include all version fields in cache and invalidation design; check authorization independently of caching. Preserve access for old purchasers without inventing new grants.

## Errors and missing evidence

Data validation fails on missing archetype, unresolved active rule, unknown node or broken source reference. An unmatched named tail is an allowed documented fallback, not a data-validation failure. An unresolved generic program is inactive. Missing optional content is omitted with a development diagnostic and a documented limitation; production prose must not invent a fact to fill a gap.

## Acceptance

Source-example assertions, all supplied date fixtures, invalid dates, partial-sum counterexample, profile divergence and distinct 9/9/18 keys pass. Every active node, source reference, section rule and archetype resolves. Free requests disclose no paid prose. Public sample is fixed. Entitlement and PDF access tests preserve existing purchase behavior. Web, Light PDF and Dark PDF use one semantic model. Searches reveal no stale active-method references. Record the actual checks run; do not report planned integration checks as completed.
