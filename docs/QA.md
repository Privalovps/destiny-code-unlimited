# Research candidate QA

Use [RESEARCH_C_IMPLEMENTATION.md](RESEARCH_C_IMPLEMENTATION.md) for current manual checks and limitations. No browser, server, build or PDF batch was run. Historical instructions below do not authorize automatic execution.

# Current commerce QA — November 17, 2026

The current access flow supersedes all historical date-only preview instructions below. Use [PAYMENT_ARCHITECTURE.md](PAYMENT_ARCHITECTURE.md) for setup and limitations.

1. Manually start exactly one loopback Webpack process with `npm run dev:preview`; open `http://127.0.0.1:3000/dev/checkout?date=1993-04-17`.
2. Create a pending test order. Its opaque-ID report and both PDF endpoints must deny access. A plain date URL and `paid=true` must never unlock anything.
3. Grant an unpaid local entitlement; confirm the one-use fragment link. Verify `/readings`, all eight chapters and the two explicit PDF editions. Reusing the verification link must fail.
4. Revoke the test entitlement and reload the same report/PDF URLs. All must deny access immediately. Start a new order to test again; terminal revocations never reactivate.
5. Stop that process. Ordinary `npm run dev -- --hostname 127.0.0.1` must not expose the simulator. Production ignores development flags; real access requires the database session/entitlement check.
6. Inspect landing, free result, checkout, pending/success/failure, recovery and library in both existing screen themes at 320/375/390/430/768/1440px. Confirm one $12.90 USD offer, one-time payment, no subscription, no discount/counter/timer, and one disabled purchase CTA until real providers exist.
7. Review individual Light/Dark PDFs manually for unchanged chapter content, page breaks, cover safety, first/last page and all nine chart values. No PDF rendering or visual browser verification was performed during commerce preparation.
8. In a disposable Supabase project, apply the migration and independently test anon denial, atomic duplicate fulfillment, customer isolation, concurrent one-use redemption, refund/reversal/dispute revocation and transaction rollback. These database integration checks remain unperformed.

Lightweight checks performed: TypeScript, targeted ESLint and 80 tests across payments, request authorization, report routes, numerology and report structure. No server, browser automation, build, real webhook, email or database execution was performed.

---

## Historical visual and numerology QA notes (previous preview URLs are retired)

# Current QA record — studio refinement 3.1

## Executed, without a Next.js server

- Strict TypeScript (`--noEmit --incremental false`): passed.
- Targeted ESLint over changed/new TS/TSX: passed.
- 77 focused Vitest tests: passed in one worker; route PDF writer mocked to avoid batch export.
- Calculation engine, fixture, center library, position definitions, server preview helper and package scripts compared with the pre-edit snapshot: unchanged.
- CSS semantic token sets match across light/dark; tested AA contrast for primary, secondary and accent text against primary surfaces, plus button labels. This does not replace a complete accessibility audit.
- Separate sample light/dark exports: 33 pages each, all 195 expected text segments present, valid xref/stream/page structure, no nonfinite coordinates. No visual PDF test was performed.
- No server, build, browser automation, parallel agents, dependency installation or persistent service was launched.

## Manual checklist — still outstanding

1. Start `npm run dev:preview` manually. Inspect `/`, `/result?date=1993-04-17`, `/report/1993-04-17`, `/report/demo`, methodology and legal pages at 375px, 768px and 1440px.
2. Toggle light and dark in the header with mouse, touch, Enter and Space. Verify the label/pressed state, focus ring and both icons. Navigate between routes and reload; confirm the preference persists without a bright/dark page flash. Test a second tab, storage disabled, cleared storage and JavaScript disabled. Default is dark.
3. Check forms, native date picker, text, chart labels, controls, cards, cover, footer and legal copy in both themes. Check real device contrast/zoom, no horizontal overflow and 44px controls. Test invalid dates and the documented fixture.
4. Select all nine matrix positions. Confirm only corners highlight their actual adjacent inputs. Verify center/node reveal order, selected detail panel and keyboard controls. Enable reduced motion before loading and verify there is no drawing/reveal animation.
5. Inspect emblems at phone size: each has a distinct symbol and accessible text when meaningful. They are geometric emblems, not full artwork.
6. Read report chapters with repeated values (for example 0001-01-01 and 2000-02-29). Check position-specific treatments, no same-chapter references, distinct exercises, nonrepeated reflection questions, active chapter progress and return links.
7. Explicitly download the Light PDF, then separately the Dark PDF, using the full page's labeled controls. Verify choice is independent of screen theme. Inspect each cover, matrix, contents page numbers, first/last page, long chapters, question panels, page edges and print settings. Do not batch-export dates.
8. Stop the preview server. Start ordinary `npm run dev -- --hostname 127.0.0.1`; full report and both PDF URLs should return 404 without the flag. Stop before any further server command. Production access denial/build verification remains a later operator-controlled check.
9. Observe memory and responsiveness during these manual steps. Webpack is configured, but runtime resource behavior has not been verified in this task.
10. Verify prices remain disabled. Before public launch, complete/review legal operator identity, retention/hosting details, delivery/support, and the payment/entitlement plan. No legal compliance or paid fulfillment is claimed.

---

## Historical verification record (predates current source)

Historical build/test results below do not validate this refinement.

# Verification record

## Automated verification — November 17, 2026

Dependencies and package-lock.json are present. The earlier dependency-installation blocker is resolved.

| Command | Observed result |
| --- | --- |
| npm run lint | Passed |
| npm run typecheck | Passed |
| npm test | Passed: 5 files, 56 tests |
| npm run build | Passed |

The initial production build exposed a dynamic Google font lookup for the Open Graph star glyph. Replacing that glyph with inline SVG removes the need for the glyph font request.

Coverage includes deterministic full reports, nine documented positions, PDF object offsets and stream lengths, pagination without dropped content, date validation, and PDF route gating. The local preview is development-only; tests confirm production cannot enable it through the environment flag. No payment or entitlement flow is implemented.

## Remaining manual verification

The browser inventory returned “The browser access host is unavailable.” No responsive browser inspection is claimed.

1. Run `npm run dev:preview`; inspect the landing, result, full report, and demo at 375px and 1440px.
2. Submit 1993-04-17 and verify the nine-number fixture in docs/METHODOLOGY.md.
3. Try every chart node by mouse and keyboard; verify its announced label and caption.
4. Check empty dates, April 31, non-leap February 29, and tomorrow in forms and direct result URLs. Confirm 2000-02-29 is valid.
5. Verify no horizontal overflow, readable text, keyboard focus, reduced motion, and native date entry on mobile Safari and Chrome.
6. Download and visually inspect the full PDF. Automated tests validate its structure and text, not visual typography.
7. Verify the single $12.90 offer, no subscription, disabled live purchasing and truthful unpaid simulation labels.
8. Inspect metadata, Open Graph appearance, noindex/no-referrer on results, and production hosting log policy. Complete legal operator placeholders before public launch.

## Authored automated coverage

Vitest covers the regression fixture, reduction preservation, repeated digit sums, invalid reduction inputs, deterministic/bounded positions, Gregorian leap-year exceptions, valid 29/30/31-day boundaries, malformed inputs, year zero, invalid months/days, today, and future dates. A content test checks that every center has a unique name and complete writing.
