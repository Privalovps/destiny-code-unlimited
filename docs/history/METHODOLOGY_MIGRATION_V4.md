# Methodology migration decision record

## Active decision: no calculation migration

Keep `dc-nine-digit-sum-v1`: all nine formulas, reduction above 22, coordinates, public center interpretations, Strength VIII / Justice XI and Fool XXII remain unchanged. The 1993-04-17 regression fixture is unchanged. Interpretation edition changes from 3.1 to 4.0; this is a content revision, not a numerical correction.

Primary evidence from the accessible Ladini contents conflicts with the active eighth-code assignment. The primary calculation chapter was outside the available excerpt. Therefore this release names the existing independent convention explicitly rather than claiming complete Ladini alignment or swapping meanings silently.

## Changes implemented now

- New structured 22-Arcana source-aware library and nine editorial position guides.
- Original modern applications are distinguished from cited historical iconography.
- Eight chapters rebuilt from actual values, position rules and descriptive comparisons; no channels, purpose scores or karmic programs added.
- Shared detailed-reading presentation, source notes and same-data web/PDF output.
- Fixed public sample now consumes the actual paid-report generator and renderer instead of five manually authored generic sections.

The original public free-center descriptions remain intact. Old premium, depth and longform data files are retained but are no longer read by `generateReport`; this avoids deleting existing authored material while establishing one active professional pipeline.

## Proposed future migration — not enabled

A Ladini-aligned version would require review of legitimately accessible full primary calculation/position material, an explicit numbering map and all requested extensions. At minimum, compare the meaning of values 8 and 11 and any differences involving Fool, center, outer versus inner diagonals, ancestral center, purposes and tail ordering. Do not implement a partial switch under the same convention ID.

Before approval: obtain exact edition/page references, reproduce multiple worked examples, define every new position and its reduction timing, and decide which interpretive terms are supported. Then introduce a separate methodology ID with immutable fixtures and explicit selection. No alternate calculator or unused “Ladini mode” was added prematurely.

Existing orders currently store a birth date but not an immutable interpretation snapshot/version. Content revisions affect regenerated readings for existing orders. This task deliberately does not change order tables or security. Before a future numerical migration, the payment/data owner must separately design version pinning or purchased-report snapshots so a purchase is never silently recalculated under a different convention. Do not deploy a breaking calculation change merely by changing the report library.

## Compatibility and rollback

All current routes, fixed sample path, chapter IDs (including `life-themes`), chart geometry, CSS, themes, price and entitlement boundaries are preserved. The paid page only delegates its already-authorized report object to a shared server renderer. Its authorization and route-date validation statements are unchanged. The PDF endpoint is unchanged; its writer gained only rendering of shared interpretation/source notes, not palette, geometry or pagination changes.

Rollback the content revision by restoring the pre-edit report/data/presentation files together. No database rollback or payment modification is needed. Do not restore historical date-only premium access; leave current authorization checks intact.
