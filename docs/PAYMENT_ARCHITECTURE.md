# Single-product commerce preparation

## Current status

One permanent product: **Destiny Code — Complete Personal Reading**, **$12.90 USD**, one-time; no subscription. Canonical application definition: `src/lib/server/product.ts`, `amount: 1290`, `currency: 'USD'`, entitlement `complete_reading`. The migration independently constrains the same values. There is no launch promotion, inventory, reservation, future price, discount, quota, or purchase countdown.

**Purchasing and email delivery are unavailable.** `paymentProvider()` and `emailProvider()` deliberately return `null`. Setting environment variables alone cannot fabricate a provider or enable real checkout. No card data is collected. The site must not accept money yet.

## Supabase setup (operator action; not executed)

1. Create a Supabase project in the chosen region and review hosting, backup and privacy requirements.
2. Review and apply `supabase/migrations/202611170001_complete_reading.sql` using the SQL editor or your established Supabase migration tooling. No database dependency was added to the application.
3. The migration creates `destiny_private` tables for customers, fixed-price orders, entitlements, immutable event receipts, hashed credentials, email outbox and rate limits. All tables enable RLS. There are no browser policies or anon/authenticated table grants. Only the service-role RPC `public.dc_gateway(text,jsonb)` is exposed; it uses a fixed empty search path and schema-qualified references.
4. Configure `SUPABASE_URL` and the legacy server-side `SUPABASE_SERVICE_ROLE_KEY` JWT. The REST gateway sends that key only from server modules. Never prefix it with `NEXT_PUBLIC_`, place it in browser bundles, or log it. Configure `APP_ORIGIN` to the exact HTTPS production origin.
5. Verify migrations against a disposable database: denied anon/authenticated access; allowed service-role RPC; concurrent duplicate events; transaction rollback; exact-price checks; duplicate token redemption; revoked entitlement denial. SQL has been inspected but has **not been applied or integration-tested** here.

The migration is additive. Roll back access first with `REVOKE EXECUTE ON FUNCTION public.dc_gateway(text,jsonb) FROM service_role;`, disable checkout and delivery, then deploy the prior application if appropriate. Preserve orders and entitlements for reconciliation; do not drop purchase tables as an automatic rollback. Secure/export backups before a later schema migration. This is a first migration, not an idempotent seed script.

## Provider extension points

`src/lib/server/contracts.ts` defines `createCheckoutSession`, `verifyWebhook`, `retrievePaymentStatus`, and `normalizePaymentEvent`. Implement a selected provider's documented SDK/API and signature verification in an adapter, then wire `providers.ts`. No generic signature scheme or undocumented payment API has been invented. Store the actual provider credentials server-side only when selected.

`POST /api/checkout` validates email and calendar date, rejects extra client price fields, creates the fixed-price pending order **before** requesting hosted checkout, uses the order ID as the provider idempotency key, and binds the provider checkout ID. It returns only an HTTPS hosted checkout URL. Neither pending orders nor redirects grant access. If creating checkout fails after an order is created, that order remains pending; provider-specific reconciliation/retry handling is a required launch check.

`POST /api/payments/webhook` requires the actual adapter, bounded raw request bytes, signed-provider verification, normalized event validation, and an independent authoritative payment lookup. Product, order, checkout, payment ID, environment, **1290** and **USD** must agree. In one database transaction the gateway locks the order, deduplicates immutable event receipts, marks payment status, creates the unique entitlement and queues fulfillment. Refunds, reversals and disputes revoke access. Terminal revocations never reactivate on late success; pending/failed events cannot downgrade a paid order. Provider retries must receive a non-success response on temporary persistence failures.

Configure actual provider event subscriptions and sandbox/live modes when selected. Reconcile provider records with local orders before launch, including races before checkout binding, partial refunds (normalize conservatively to revoked), disputes, delayed events and provider outages. A success URL has no payment authority.

## Accountless access and delivery

The payment transaction queues an email job. `POST /api/internal/deliver` processes **one** claimed job per explicit invocation, protected with `Authorization: Bearer <DELIVERY_SECRET>` (at least 32 characters), and uses a short lease for concurrent workers. No scheduler, polling or background process was started. Supply a real transactional email adapter plus an operator-managed worker/scheduler and monitoring before enabling checkout. Delivery retries are bounded to ten attempts; stuck/dead-letter jobs need operator attention. Retries can issue more than one short-lived link after ambiguous delivery failure; purchase fulfillment itself remains idempotent.

Verification links contain 32-byte random tokens in a URL fragment, not permanent report access keys. The browser immediately removes the fragment from history; an explicit confirmation POST atomically consumes the one-use hash (15-minute expiry) and establishes a 30-day HttpOnly, SameSite=Lax session. Production cookies are Secure and use the `__Host-` prefix. GET does not consume links, preventing ordinary email scanners from consuming them. Only hashes are stored. Token expiry relates to security, **not promotional pricing**.

`/readings` lists server-owned, paid, active entitlements. `/report/<opaque-order-uuid>` and `/report/<uuid>/pdf?edition=light|dark` recheck the session, customer, environment, paid status and current entitlement on every request. The birth date comes from the authorized order. Date strings, query parameters and browser state are never payment proof. Full report generation and PDF creation occur after authorization. Premium libraries carry `server-only` boundaries; public pages serialize only deliberately limited excerpts. Private routes use dynamic rendering and no-store headers. PDFs are generated only on explicit download, without public object URLs or static files.

`/access/recover` queues a generic recovery response for eligible email addresses without revealing purchases. Email-keyed rate limits live in the database. Before exposing real checkout/recovery, add deployment-level IP/abuse limits, email monitoring, logout/session management, and operator procedures for customer support, fraud, retention/deletion, and refunds. Expired credential and rate-limit cleanup, outbox/event retention, and database growth monitoring need an operator-defined scheduled maintenance policy; no recursive scans or automatic background jobs are included.

## Environment

See `.env.example`. Required for eventual production: `APP_ORIGIN` (exact HTTPS origin), `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `DELIVERY_SECRET`, `ENABLE_LIVE_CHECKOUT=1` **after** real adapters, fulfillment and verification are tested. Provider-specific keys are intentionally unspecified until a provider is chosen. `DESTINY_CODE_DEV_CHECKOUT=1` is honored only when `NODE_ENV=development`; it is never a production unlock flag.

## Safe local simulator (no Supabase or provider required)

Manually run exactly one process:

```sh
cd ~/Desktop/Isoteric
npm run dev:preview
```

This script uses `DESTINY_CODE_DEV_CHECKOUT=1 APP_ORIGIN=http://127.0.0.1:3000 next dev --webpack --hostname 127.0.0.1`. Open **http://127.0.0.1:3000/dev/checkout?date=1993-04-17**; use that same origin throughout. The development route and POST require development mode, explicit server flag, loopback host and matching request origin. Never expose a development server publicly.

1. Create a pending test order with a test email/date. Its report link must deny access.
2. Grant an **unpaid** local test entitlement. No provider signature is simulated and no money moves.
3. Open the one-use local verification link and confirm. `/readings` lists the test reading; follow its opaque-ID report URL.
4. Download Light and Dark PDFs individually. Generation remains explicit.
5. Return to `/dev/checkout` in the same session and revoke. Reload the report and both PDF URLs: access must be denied.
6. Reusing a consumed/expired link must fail. A plain `/report/1993-04-17` must fail. Stop the process; restart ordinary development without the flag: the simulator is unavailable.

Local state is memory-only, bounded to 200 orders/1000 credentials/1000 events and cleared on restart. It tests the access workflow, not database concurrency, real payments, real delivery or production deployment. Never rely on it as a durable purchase store. Previously used `DESTINY_CODE_LOCAL_PREVIEW` does not authorize anything.

## Remaining launch blockers

Select eligible providers; implement documented signed webhooks and authoritative lookups; apply/review SQL and exercise RLS/concurrency in a disposable database; test checkout/fulfillment failure handling and all reversals; configure actual email delivery and recovery; deploy HTTPS and abuse limits; define retention, monitoring, backups, reconciliation and support; finish operator/jurisdiction-specific legal and refund terms. No compliance or live-payment claim is made.

Official references used for the architecture: [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security), [Supabase database functions](https://supabase.com/docs/guides/database/functions), [Next.js cookies](https://nextjs.org/docs/app/api-reference/functions/cookies).
