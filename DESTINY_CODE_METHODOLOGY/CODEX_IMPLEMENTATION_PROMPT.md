# Codex task: implement the reviewed methodology candidate

Work in the existing Next.js App Router / TypeScript project requested at `~/Desktop/Isoteric`. First inspect the actual repository and its applicable instructions. If that path is unavailable, report the missing project location rather than pretending this package contains the application.

This package contains independent research, followed by a proposed methodology and a separate engineering handoff. Do not constrain it to the old nine-position model, eight chapters, existing formulas, or old prose. Do not independently invent missing numerology rules.

## 1. Read before editing

Read `00_README.md`, all `research/` documents, `data/decisions.json`, the complete calculation/position/channel/arcana/combination files, all test fixtures, and the implementation specifications. Review the three source-specific analyses and comparison before selecting any formula. The source books are identified in `data/sources.json`; original scans and OCR chapters are intentionally not redistributed.

The selected research candidate is `dc-symbolic-1.0.0-proposed`, calculation profile `C-family-center-v1`. It uses the complete construction chain described by Maria Priemykhova, not an average of conflicting schools. Albina Matrix's two books overlap and are not independent votes. The alternative `AB-personal-center-v1` is for explicit comparison, not a hidden fallback.

Important limitations: every PDF page was processed, but an exhaustive line-by-line semantic reading of every narrative was not completed. The page log and open decisions say exactly what was checked. Do not claim complete critical coverage or official affiliation. Generic C program detection is blocked; printed headings are an evidence catalog only. The English library is original editorial synthesis, not translated authoritative doctrine.

## 2. Inspect the application and create a concrete change plan

Locate actual calculation functions, arcana data, chart nodes, chapter composition, free preview serialization, paid routes, entitlement checks, checkout/webhook handlers, Light/Dark PDF renderers, public sample, caches, saved reports and method-version fields. Record actual file paths. Do not assume proposed paths in the spec already exist. Identify old content strings and references that must be replaced. Preserve unrelated user edits and save the old engine through normal version control for rollback.

Separate the mathematical/profile choice from UI adaptation. `DEC-ANCESTRY` recommends C, but it does not prove that a production migration of already purchased reports was approved. Implement the versioned candidate and fixtures within the authorized task; do not silently rewrite historical reports or deploy an unreviewed release.

## 3. Implement deterministic data and calculation

Use the JSON files as the source of truth and adapt `implementation/types.ts` to the repository. Validate the schemas and cross-references before importing data. Preserve stable IDs and provenance. Every active position must have a verified formula.

Implement strict Gregorian YYYY-MM-DD date parsing, years 0001–9999 in the pure reference domain, without timezone conversion or a birth-time adjustment. A separate product input rule may reject future birth dates with an explicit as-of date. Reject invalid dates instead of normalizing them.

Implement R22: preserve all integers 1–22. While a value exceeds 22, replace it with its decimal digit sum. Add a formula's specified dependencies completely before applying R22. Never reduce arbitrary partial sums. Purpose formulas explicitly use already-reduced named intermediate aggregates.

The selected model has38 calculated values:30 diagram nodes, a separate family aggregate, and seven line/purpose aggregates. The personal center and family aggregate remain separate. C ancestral inner points use the family aggregate; A/B use the personal center. Never mix these conventions within one profile. The reference calculator, source assertions and fixture traces show expected behavior.

## 4. Implement role-specific interpretation and combinations

Load all 22 archetypes with Justice8, Strength11, Fool22. Keep core symbolism, domain readings and position roles separate. Do not paste the same general profile at every repeated number. Treat every English sentence/example as the original editorial layer indicated by its provenance.

Use only declared channels and composition rules. Separate physical order from interpretation order. Exact tail keys are `[bottom,bottom_inner,bottom_mid]`; never sort, reverse or use multiset matching. The 26 C-tail entries include three distinct9/9/18 variants. If an exact key is missing, use the declared general bottom-theme fallback and disclose that no named key matched.

Generic program headings must retain `automaticMatchingEnabled=false` until a source-supported placement detector and orientation rule are resolved. Do not invent an all-pairs library, a compatibility score, a strength multiplier, a planetary-purpose value, a health card, or forecasts. Repetition counts distinct primary node IDs; calculated sums are correlated and do not provide independent corroboration. Contrasts use the explicit small contrast table and remain labeled editorial.

Present constructive and shadow possibilities without claiming to know which applies. Never infer disease, infertility, trauma, actual wrongdoing by ancestors, suicidal behavior, literal past-life acts, guaranteed wealth, future disasters or an identifiable future partner from a date. Preserve the distinction between a symbolic possibility and an observed fact.

## 5. Compose one versioned report model

Implement `ReportModel` with method/profile/content/schema versions, locale, source-data hash, values, ordered sections, block provenance and calculation references. Both accessible and advanced layers use these same values. Explain specialist terms once. Use natural American English and concrete conditional examples.

The proposal contains ten topical chapters plus a technical appendix. Adopt or adapt that structure after reviewing the source-supported information; do not retain eight chapters as a hidden constraint. Preserve substantive role-specific content without using a word target to justify filler. The portable sample/composer demonstrates the data flow; it is a reference, not a substitute for final editorial and application review. Keep engine instructions such as “do not infer” in internal metadata; customer prose should explain the useful interpretation naturally.

## 6. Replace every content surface

Replace obsolete arcana explanations, generic position prose, unsupported combinations, philosophical filler, chapter-generation rules, free text, advanced notes, chart details, glossary/method explanation, premium web report, both PDF themes and the public sample. Search for old formula names and hard-coded chapter counts. Do not preserve obsolete copy merely because it already renders.

Keep the premium luxury visual identity, responsive layout and interactive chart. Extend the chart for supported nodes, using the provided relative layout as a new diagram design rather than copying a source illustration. Keep aggregates separate from physical nodes and provide readable details for small viewports.

## 7. Keep free/paid boundaries and payment security

Keep the price at **$12.90 / USD 1290 minor units** and preserve the current payment authorization model. Do not unnecessarily modify checkout, authentication, provider-signature verification, webhook validation, purchase ownership or entitlements.

Produce a limited free DTO at the server boundary. Do not ship the complete paid library, full personalized report, hidden premium paragraphs, or protected PDF links in public HTML, RSC serialization or unauthenticated APIs. Existing premium web and PDF routes must check the existing entitlement before retrieval or rendering. Cache hits must not bypass authorization.

Generate the fixed public sample with the same engine. The recommended source-verified date is1991-12-09; if retaining the existing sample date, add its fixture. A public sample flag must never unlock arbitrary dates. Update the sample page, chart, Light/Dark downloads and all relevant links together.

## 8. Preserve purchases and version migration

Keep calculation profile, method version, content revision and report schema version distinct. Existing purchases retain access without another charge. Preserve old report snapshots or retain a version-aware old renderer. Do not silently recalculate historical reports under a new method. Add version-aware cache keys and invalidation. Record a reversible active-method switch and a rollback path that does not modify entitlement or payment history.

## 9. Validate with meaningful checks

Run the lightweight portable checks first:

```bash
node reference/validate.mjs
python3 reference/validate_data.py
```

Then add equivalent repository tests for strict dates, R22 boundaries, the non-associative partial-sum counterexample, all 12 date fixtures and complete traces, the two manually asserted source examples, C-versus-A/B ancestral divergence, distinct ordered-tail keys, unsupported-program exclusion,22 archetypes and all 38 outputs.

Add role-specific output checks and semantic parity tests across web, Light PDF and Dark PDF. Validate free serialization, fixed-sample allowlisting, paid access denial and existing-purchaser access using the application's test mechanisms and mock states. Do not perform live purchases to test this task. Search for stale active-method content. Record what actually ran and what remains unverified.

## 10. Performance restrictions

- Preserve the Webpack development configuration.
- Do not launch Turbopack.
- Do not run memory-intensive production builds without permission.
- Do not run browser automation without permission.
- Do not launch parallel development agents.
- Avoid unnecessary new dependencies and background processes.

Use targeted unit, schema and type checks by default. Missing evidence or a blocked research rule is not permission to fabricate a meaning.

## Final implementation report

Provide actual changed paths, the selected profile and content versions, old/new migration behavior, all content surfaces replaced, actual tests and results, remaining limitations and rollback instructions. State explicitly whether a candidate was merely implemented, made active locally, or deployed. Do not claim a live deployment or successful application/PDF/security integration unless it was actually performed and verified.
