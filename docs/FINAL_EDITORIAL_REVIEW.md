# Final editorial review candidate — November 18, 2026

**Content:** `en-US-role-editorial-2.1.0`  
**Methodology:** `dc-symbolic-1.0.0-proposed` / `C-family-center-v1`  
**Report schema:** `1.0.0`; American English.  
**Status:** ready for product-owner review. Not production-approved, deployed or payment-approved.

This closes the planned editorial pass for launch preparation. Future corrections should be intentional, versioned revisions; the freeze is a review checkpoint, not a claim that human judgment or future improvements are unnecessary. Exact text-file checksums and the sample semantic hash are recorded in [CONTENT_FREEZE.json](CONTENT_FREEZE.json).

## What changed

The approved numerology-first baseline was preserved. Its 22 interpretation profiles, constructive/shadow fragments, 38 role explanations, illustrative situations and supported combination rules remain unchanged. The repetitive wrappers around that material were edited at the shared-generator layer.

- Twenty-two archetype-specific sentence structures replace the universal constructive/shadow introductions. Their vocabulary follows the already approved symbolism rather than randomized synonym selection. Natural position names replace constructions such as “in the money reading of year / material learning.”
- Repeated archetypes receive a brief symbolic recall only when the following domain explanation does not already name them. This avoids an unnecessary second introduction without suppressing the position-specific interpretation.
- Examples have descriptive, role-specific headings tied to their calculated archetype. The repeated “From symbolism to experience” label is gone from the new edition.
- Example transitions distinguish expression, material choice, partnership, learning, family and purpose. Complete sentences and imperative recommendations retain their grammatical form.
- Constructive and shadow paragraphs remain in their original order. The shadow transition relates to the relevant archetype: authorship for the Magician, inherited continuity for Judgment, proportion for Temperance, and so forth. These are editorial expressions of existing meanings, not new programs.
- Applications still follow the chapter’s supported combination reading. Private semantic role labels replace heading-text assumptions in QA; these labels are stripped from the web/PDF publication document.
- The relevant free introductory prose remains shared; the final edition also avoids doubling its terminal period in the free-page renderer.

## Three generated before/after examples — 1991-12-09

### Constructive material interpretation

Before:

In the money reading of year / material learning, the constructive expression centers on renewal through an understood inheritance, belonging that permits choice and the transmission of useful collective knowledge. Connecting generations can preserve knowledge while making it usable in a changed setting. Belonging can support independent judgment instead of replacing it.

After:

Judgment links material learning with renewal through an understood inheritance, belonging that permits choice and the transmission of useful collective knowledge. Connecting generations can preserve knowledge while making it usable in a changed setting. Belonging can support independent judgment instead of replacing it.

### Shadow interpretation

Before:

The shadow expression at year / material learning in this money context is loyalty confused with obedience, judgment through a fixed family story or responsibility assumed for everyone’s history. Loyalty may become obedience, or a fixed story may assign blame before anyone speaks. Trying to repair everyone’s history can obscure the responsibilities that actually belong to you. Treating a different present choice as rejection of belonging can make an appealing intention difficult to support through ordinary responsibilities.

After:

Inheritance becomes restrictive in material learning through loyalty confused with obedience, judgment through a fixed family story or responsibility assumed for everyone’s history. Loyalty may become obedience, or a fixed story may assign blame before anyone speaks. Trying to repair everyone’s history can obscure the responsibilities that actually belong to you. Treating a different present choice as rejection of belonging can make an appealing intention difficult to support through ordinary responsibilities.

### Example transition and heading

Before heading: **From symbolism to experience · Personal center**

One possible setting is a decision in which two worthwhile commitments require different responses. When deciding which priority to preserve, adjust to a changed condition while naming what will remain stable. Choose what will remain consistent through one changing situation and what you are willing to adjust, then review both after a defined interval.

After heading: **A choice between commitments · The Wheel of Fortune**

Imagine a decision in which two worthwhile commitments require different responses. When deciding which priority to preserve, adjust to a changed condition while naming what will remain stable. Choose what will remain consistent through one changing situation and what you are willing to adjust, then review both after a defined interval.

## Depth and five-date validation

The same narrative counter excludes orientation, cover, TOC, headings, navigation and the calculation appendix. Counts document preservation, not quality or a target used to generate prose. The difference is below 1% for each date; every substantive interpretation profile and position occurrence remains present.

| Date | Approved 2.0.0 | Review candidate 2.1.0 | Result |
|---|---:|---:|---|
| 1991-12-09 | 12,673 | 12,630 | deterministic; same values, traces, chapters and rule sequence |
| 1987-01-23 | 12,774 | 12,739 | deterministic; same values, traces, chapters and rule sequence |
| 1993-04-17 | 12,616 | 12,532 | deterministic; same values, traces, chapters and rule sequence |
| 2000-02-29 | 12,592 | 12,492 | deterministic; same values, traces, chapters and rule sequence |
| 1976-11-28 | 12,685 | 12,625 | deterministic; same values, traces, chapters and rule sequence |

A rough paragraph-function estimate for the sample is 73.3% interpretation and 26.7% application. This is a structural editorial estimate, not proof of scholarly quality or a word quota.

208 focused tests passed across 13 files with one worker, file parallelism disabled and a 384 MB Node heap. TypeScript and targeted ESLint passed. Proof includes:

- Every research-package checksum and supplied schema; the 12 complete numerical fixtures and source examples; all 38 values and traces; Justice VIII / Strength XI / Fool XXII; disabled unsupported program matching.
- Every one of the 22 Arcana across all 38 position contexts, for first and repeated use, plus the five complete matrices above. Common and uncommon combinations use the same supported channel rules and grammar-safe fragments rather than ad hoc pair descriptions.
- No empty interpretations, duplicate full paragraphs, duplicate practice blocks, forbidden template markers, raw source metadata or implementation syntax in the final publication.
- All constructive/shadow library entries and role definitions equal the frozen baseline. Every position occurrence, ten-chapter structure, calculation reference and ordered composition-rule sequence is preserved.
- Historical 2.0.0 generation reproduces five recorded semantic hashes and word counts exactly. Historical C 1.0.0 and nine-position v4 remain available.
- Fixed sample generation equals the authorized candidate generator for its fixed birth date. Sample routes cannot select arbitrary visitor dates. Free output contains only the allowed introduction/chart fields.
- Web, Light PDF and Dark PDF share the same publication. The existing bounded Light PDF test verifies the actual PDF text contains every paragraph and calculation row in order. No PDF batch or visual PDF verification was performed.
- Existing production release denial, report/PDF authorization-before-composition, pricing and payment/access regression tests remain passing.

No development server, production build, browser automation, parallel agent, dependency installation, database migration, payment integration change or deployment was performed. There were no changes to chart geometry, click behavior, CSS, themes or visual components.

## Historical compatibility and rollback

`src/lib/methodology/history/editorial-v2/` freezes the six composer/library modules needed to reproduce the approved 2.0.0 text. It shares the unchanged calculation/data modules. The five baseline hashes are in `src/lib/methodology/fixtures/editorial-v2.json`.

Internal `composeCandidateVersion` supports C content 1.0.0, 2.0.0 and 2.1.0. It is not a public access endpoint. To preview the approved earlier C prose, stop the server and set `DESTINY_CODE_CONTENT_VERSION=en-US-role-editorial-2.0.0` before restarting Webpack. The old 1.0.0 content rollback and `DESTINY_CODE_READING_RELEASE=legacy-v4` remain available. Production still fails closed on research activation through `PRODUCTION_RESEARCH_APPROVED=false`.

Historical real orders continue on their existing v4 engine. Durable immutable method/content binding for future production C purchases remains unfinished; the bounded local simulator is not durable report-version storage. No existing entitlement or customer record was changed.

## Product-owner review still required

Read the whole fixed sample for literary flow, especially repeated numbers and the longer ancestry/purpose chapters. Spot-check additional dates with repeated Arcana and unmatched ordered-tail keys. Review both PDF editions visually for headings, page breaks, cover, final page and chapter flow; semantic/text checks do not prove visual pagination. Review the free reading’s punctuation in both screen themes.

The supplied package remains a targeted, documented research proposal rather than an exhaustive reading of all 630 source pages. Original English domain and channel synthesis is not a certified traditional combined-program dictionary. There is no new primary-book verification or claim of empirical accuracy. Expert terminology/source review and the existing production version-persistence prerequisites remain separate from editorial completion.

Manual preview: run `npm run dev -- --hostname 127.0.0.1`, then open `/report/demo`. Download Light and Dark editions only on request. Arbitrary-date premium reports remain protected. Do not enable production research release as part of this review.

## Exact files changed in this pass

Modified:
- `src/lib/methodology/depth.ts`
- `src/lib/methodology/report.ts`
- `src/lib/methodology/public.ts`
- `src/lib/methodology/numerology-first.test.ts`
- `README.md`
- `docs/IMPLEMENTATION_STATUS.md`
- `docs/PROFESSIONAL_METHODOLOGY.md`

Created:
- `src/lib/methodology/literary-frames.ts`
- `src/lib/methodology/content-freeze.test.ts`
- `src/lib/methodology/fixtures/editorial-v2.json`
- `src/lib/methodology/history/editorial-v2/report.ts`
- `src/lib/methodology/history/editorial-v2/depth.ts`
- `src/lib/methodology/history/editorial-v2/depth-library.ts`
- `src/lib/methodology/history/editorial-v2/editorial-context.ts`
- `src/lib/methodology/history/editorial-v2/symbolic-reading.ts`
- `src/lib/methodology/history/editorial-v2/narrative-metrics.ts`
- `docs/CONTENT_FREEZE.json`
- `docs/FINAL_EDITORIAL_REVIEW.md`
