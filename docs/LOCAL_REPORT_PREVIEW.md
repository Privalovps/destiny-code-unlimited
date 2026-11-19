# Owner-only local full-report preview

## Audit and architecture

Existing /dev/checkout and /api/dev/checkout create simulated orders, events, entitlements and verification sessions. They are unchanged and are not used by this feature.

Normal /report/[opaqueOrderId] and its PDF route still call authorizedOrder before composition. No existing authorization, payment, webhook, provider or order-storage code was modified.

The new tool calls composeCandidate, CandidateReading and generateCandidatePdf: the same 38-value C-family engine, 22-Arcana content, complete ten chapters plus reference, and PDF generator used by authorized candidate-edition readings. It is not a simplified sample. Historical purchases keep their previous editions. The production methodology-release hold remains unchanged. An intentionally selected historical DESTINY_CODE_CONTENT_VERSION is respected and the actual version is displayed.

## Start manually with Webpack

Stop any previous development server, then run:

    cd ~/Desktop/Isoteric
    DESTINY_CODE_LOCAL_REPORT_PREVIEW=1 APP_ORIGIN=http://127.0.0.1:3000 npm run dev -- --hostname 127.0.0.1

Open **http://127.0.0.1:3000/dev/report-preview**.

Choose a date and click **Generate Full Reading**, then **Open Full Report**, **Download Light PDF** or **Download Dark PDF**. The full reading also contains both download controls. No PDF is generated while loading either page; generation happens only when the download URL is requested.

The exact new server-only flag is **DESTINY_CODE_LOCAL_REPORT_PREVIEW=1**. Never use a NEXT_PUBLIC name for it. APP_ORIGIN must exactly match the browser origin; the inline value above overrides an existing production origin. No Supabase, Lava.top or email credentials are required. DESTINY_CODE_DEV_CHECKOUT can remain 0. Do not use npm run dev:preview for this workflow; that is the separate commerce simulator.

Alternatively, put these two values in .env.local and restart the same loopback-bound server:

    DESTINY_CODE_LOCAL_REPORT_PREVIEW=1
    APP_ORIGIN=http://127.0.0.1:3000

## Direct URLs after choosing a date

For 2005-08-29:

- Generator: http://127.0.0.1:3000/dev/report-preview?date=2005-08-29
- Full reading: http://127.0.0.1:3000/dev/report-preview/reading?date=2005-08-29
- Light PDF: http://127.0.0.1:3000/dev/report-preview/pdf?date=2005-08-29&edition=light
- Dark PDF: http://127.0.0.1:3000/dev/report-preview/pdf?date=2005-08-29&edition=dark

For 1991-12-09:

- Full reading: http://127.0.0.1:3000/dev/report-preview/reading?date=1991-12-09
- Light PDF: http://127.0.0.1:3000/dev/report-preview/pdf?date=1991-12-09&edition=light
- Dark PDF: http://127.0.0.1:3000/dev/report-preview/pdf?date=1991-12-09&edition=dark

Each URL independently enforces the server guard. Date parameters select calculation input; they are never payment evidence. No arbitrary-date option was added to the public fixed sample at /report/demo, and normal purchased-report URLs still require opaque order IDs and current entitlements.

## Local security boundary

Before composing any content, all entry points require development mode, the exact flag value 1, no hosted/preview/CI markers, a loopback APP_ORIGIN and its exact Host/port match. The PDF route also checks its URL origin is loopback with the expected protocol and port. External/proxy forwarding metadata, multiple forwarding peers and cross-origin/browser cross-site requests are rejected. Normal single loopback forwarding headers supplied by Next development are supported.

The process must bind to 127.0.0.1. Host/forwarding checks supplement this binding; they are not authentication suitable for public hosting. Do not expose the process through a public tunnel or proxy.

Pages are force-dynamic with revalidate=0. The existing /dev/:path* policy configures private/no-store, no-referrer and noindex responses; the PDF explicitly applies the shared private headers too. No report cache, database birth-date storage, order, token, session cookie or entitlement is created. Dates remain in local URLs/browser history as deliberately selected by the owner.

The renderer's localPreview property changes links only; it is never payment proof and is not accepted from URL parameters. Report and PDF gates remain independent. Existing fixed-sample and purchaser link destinations are unchanged.

## Turn it off before deployment

Stop the server. Remove DESTINY_CODE_LOCAL_REPORT_PREVIEW or set it to 0 in .env.local and any shell environment. Restart without the inline enable flag, or explicitly use:

    DESTINY_CODE_LOCAL_REPORT_PREVIEW=0 npm run dev -- --hostname 127.0.0.1

Do not configure the flag on the hosting platform. Production/test modes and hosted preview environments deny access even if it is accidentally present. This feature does not activate the research methodology in production.

## Focused verification

60 tests passed across six files with one worker, no file parallelism and a 384 MB Node heap. TypeScript and targeted ESLint passed. Checks cover both requested dates, real data/static HTML composition, 38 values/11 sections, invalid/future/duplicate inputs, hosted/production/disabled guards, hostile request metadata, no order-store access, denial by ordinary paid routes despite the preview flag, preserved sample/purchaser downloads, explicit Light/Dark writer dispatch and private PDF headers. Writers are mocked in preview route tests; no PDF batch was rendered. Existing access, payment, content-freeze and static-rendering checks pass.

No server, build, browser automation, parallel agent, installation, payment call or database migration was launched. Actual browser behavior and PDF visual layout remain manual checks. Pricing remains 1290 USD cents. Report content, PDF engine/styles, screen themes and Webpack scripts are unchanged.

## Exact files

Created:
- src/lib/server/local-report-preview.ts
- src/lib/server/local-report-preview.test.tsx
- src/components/local-report-preview-links.tsx
- src/app/dev/report-preview/page.tsx
- src/app/dev/report-preview/reading/page.tsx
- src/app/dev/report-preview/pdf/route.ts
- docs/LOCAL_REPORT_PREVIEW.md

Modified:
- src/components/candidate-reading.tsx (optional developer-link presentation only)
- .env.example
- README.md
- docs/IMPLEMENTATION_STATUS.md
