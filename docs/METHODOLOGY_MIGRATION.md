# Version migration and rollback — research C candidate

## Current stage

The candidate is implemented and active **locally by default**, not deployed or activated in production. `src/lib/methodology/release.ts` is the single public release switch. `PRODUCTION_RESEARCH_APPROVED=false` prevents an environment flag alone from activating the candidate in production. `DESTINY_CODE_READING_RELEASE=legacy-v4` rolls public/local generation back to the old edition.

No order, DOB, payment ID, price, entitlement, ownership, webhook or session record is migrated. No Supabase migration was added or run. Existing unversioned orders continue the exact pre-task v4 report engine and PDF writer. The old calculator/data/renderer remain available, preserving Justice/Strength interpretation as originally delivered in that edition. Earlier snapshots that were never persisted cannot be reconstructed; this protects the actual pre-task baseline rather than inventing historical versions.

## Local order pins

The existing volatile development simulator now records a report-edition sidecar immediately after creating a new pending test order. This is one content-metadata call, not a payment grant. Its original mode/origin/cookie/fulfillment/entitlement checks remain intact. Only new explicitly local simulator orders can be pinned to the candidate; old/unbound/live orders default to v4. The sidecar is bounded to 200 entries and disappears with the simulator on restart.

Changing the public release does not rewrite an already pinned test order. An entitlement is still checked on every report and PDF request **before** version selection or composition. Edition/profile selection is never taken from URL parameters, client state, DOB alone or a public sample flag.

## Why production remains held

The current persistent order schema has no immutable method/content binding or stored report snapshot. Automatically binding all historical orders to a new method would violate the requested preservation boundary. Before future production activation, the operator must approve durable report metadata or immutable snapshots for new orders, define how historical versions remain retrievable, and test that path with the selected production fulfillment system. This task does not silently modify payment tables or fabricate such persistence.

Changing `PRODUCTION_RESEARCH_APPROVED` alone is not sufficient operational preparation. Production release also requires this durable version ownership, editorial review and the normal deployment review. Existing payment/email adapters remain as previously configured; no live processing claim is made.

## Caches and hashes

All premium and sample endpoints remain private/no-store and dynamic. There is no personalized response cache to bypass authorization. `readingCacheKey` includes authorized order identity and, for the candidate, method/profile/content/schema/source-data/locale/semantic hash. A future cache must be used only after the same entitlement check. Semantic hashes exclude theme and pagination; source-data hashes include the approved duplicate-channel resolution and access policy.

## Rollback

1. Stop any manually started development process.
2. Set `DESTINY_CODE_READING_RELEASE=legacy-v4` in the local environment, then start one Webpack process manually. Free/home/sample views return to v4; unversioned purchasers already remained there.
3. Pinned candidate local test readings keep their original renderer until that volatile test state is cleared. A rollback is not an entitlement revocation.
4. To restore source files as well, use the exact changed-file manifest and the pre-edit snapshot `/private/tmp/dc-candidate-before` while preserving unrelated later edits. Do not restore a historical date-based premium bypass. Do not change payment history.

The source snapshot contains pre-task src/docs/Supabase/configuration files; no Git repository was present, so no checkpoint commit was possible. The supplied research package was not modified. Prior methodology documents are archived in `docs/history/`.

## Input correction

Shared product date validation gained an exact ten-character check to reject a final newline that JavaScript `$` can otherwise accept. Valid dates, the nine-value legacy arithmetic and regression fixture are unchanged. The candidate parser has the same strict grammar and typed errors; pure future dates remain valid in the reference domain, while product entry still applies the existing UTC as-of rule.

## Content-only edition 2

The calculation profile is unchanged. The frozen C content edition 1 composer is in `src/lib/methodology/report-v1.ts`. Internal `composeCandidateVersion` supports both editions. `DESTINY_CODE_CONTENT_VERSION=en-US-role-editorial-1.0.0` selects the older C prose locally without reverting calculations. Default local prose is edition 2. This environment option does not override production release gating or entitlement checks. Existing historical v4 purchases are unaffected. Local simulation release pins are not durable content snapshots; immutable production content-version binding remains unfinished. See REPORT_DEPTH_AUDIT.md.
