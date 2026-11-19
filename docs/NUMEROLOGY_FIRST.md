# Numerology-first shared interpretation update

## Implemented

Position readings now follow the same explicit order for every active Arcana/domain: central symbolic meaning, position meaning, constructive manifestation and shadow manifestation. A separate application block follows the chapter’s supported combination reading. Concise Arcana-led recommendations replace stacked role exercises. Channel paragraphs likewise explain roles and tensions before examples and guidance. This changes the shared model used by the authorized candidate reading, fixed sample and both PDF themes; no sample-only prose exists.

`symbolic-reading.ts` contains 22 distinct original English constructive/shadow profiles and material, relationship, family and talent adaptations. Other domains retain their documented position meanings and use the same central symbolism. A repeated number retains its meaning and receives its actual position/domain treatment rather than losing constructive/shadow content through general de-duplication. Family examples use the family role of the portrait instead of its unrelated outward-presentation scenario.

The library is an original editorial adaptation of the package’s documented archetypal themes, domain readings, constructive/shadow concepts and position roles. It adds no new traditional calculation, channel, named program, inheritance forecast or claim of official school endorsement. Private source references remain attached through each contributing Arcana and position. No assertion that the original source books were newly read is made.

## Example: Judgment / material learning

1. The central theme of Judgment is inheritance and renewal. Judgment brings inheritance and renewal into material learning. Shared knowledge, family practices and collective patterns are symbolic resources; responsibility concerns what is continued, revised or passed on. A family connection alone does not establish the value of an undertaking. The material anchor concerns the approach brought to resources and responsibility. Money is one expression; equipment, working time and obligations also matter. The relevant question is how something useful is maintained, allocated or changed.

2. In the money reading of year / material learning, the constructive expression centers on renewal through an understood inheritance, belonging that permits choice and the transmission of useful collective knowledge.

3. The shadow expression at year / material learning in this money context is loyalty confused with obedience, judgment through a fixed family story or responsibility assumed for everyone’s history. Treating a different present choice as rejection of belonging can make an appealing intention difficult to support through ordinary responsibilities.

4. One possible setting is deciding which commitments a limited amount of time and money can realistically support. Before allocating resources to the goal, choose what to carry forward and explain what you would revise.

The first three paragraphs are interpretation; the fourth illustrates the situation and offers guidance. In the assembled chapter, the application appears after the material and money-channel readings. Inheritance here refers to the supplied symbolism of shared knowledge, family practices and collective patterns; it does not assert that money or assets will be inherited.

## Content balance and depth

The following word counts exclude orientation, formulas, reference appendix and layout. They are measurements, not generation targets. The earlier depth has been retained and interpretation expanded; no quota-based padding is used.

| Date | Narrative words |
|---|---:|
| 1991-12-09 | 12,673 |
| 1987-01-23 | 12,774 |
| 1993-04-17 | 12,616 |
| 2000-02-29 | 12,592 |
| 1976-11-28 | 12,685 |

For the sample, structural paragraph classification estimates 73.7% interpretation and 26.3% application. The classifier counts explicit position explanations and interpretive channel paragraphs separately from applications, practice blocks, integration and channel examples/guidance. This is a rough editorial proxy, not an objective measure of specificity or scholarly validity. Expert editorial review is still needed.

## Verification and preservation

199 focused tests passed across 12 files using one worker, disabled file parallelism and a 384 MB Node heap. TypeScript and targeted ESLint passed. Checks exercise all 22 symbols across all 38 position contexts, first/repeated use, explicit constructive/shadow coverage, interpretation-before-guidance order, Judgment material symbolism, five-date determinism, original calculation fixtures/traces/schemas/checksums, approved channel ordering, disabled generic program matching, sample parity, Light/Dark semantic parity, the existing bounded Light PDF content test, free-data boundaries and rejection before premium composition.

No changes were made to numerical formulas, package source data, paid routes, entitlement/authentication logic, checkout/webhooks, Supabase, canonical 1290 USD cents, release gates, chart interactions, visual components, theme CSS or PDF engine. No server, build, browser automation, parallel agent, dependency installation, production activation or PDF batch was launched. Visual PDF/page-flow review remains manual.

## Exact files changed

Modified:
- `src/lib/methodology/depth.ts`
- `src/lib/methodology/report.ts`
- `README.md`
- `docs/IMPLEMENTATION_STATUS.md`

Created:
- `src/lib/methodology/symbolic-reading.ts`
- `src/lib/methodology/numerology-first.test.ts`
- `docs/NUMEROLOGY_FIRST.md`

## Manual preview

Run `npm run dev -- --hostname 127.0.0.1` manually and open `/report/demo`. Both PDF download controls consume the same revised publication. Arbitrary-date premium reports remain protected. Existing content rollback and historical v4 behavior are unchanged; the production research gate remains false.
