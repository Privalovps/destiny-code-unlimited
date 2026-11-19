# Commerce change manifest

Exact source/configuration/documentation files changed during the single-product commerce task, compared with the temporary pre-change snapshot. Existing work was preserved; this directory has no Git repository. Generated TypeScript cache files are excluded.

## Modified

- `AGENTS.md`
- `README.md`
- `docs/IMPLEMENTATION_STATUS.md`
- `docs/PAYMENT_ARCHITECTURE.md`
- `docs/QA.md`
- `next.config.ts`
- `package.json`
- `src/app/globals.css`
- `src/app/page.tsx`
- `src/app/privacy/page.tsx`
- `src/app/report/[date]/page.tsx`
- `src/app/report/[date]/pdf/route.ts`
- `src/app/report/demo/page.tsx`
- `src/app/result/page.tsx`
- `src/app/terms/page.tsx`
- `src/components/landing-hero.tsx`
- `src/components/pdf-downloads.tsx`
- `src/components/report-preview.tsx`
- `src/components/shared.tsx`
- `src/lib/archetype-depth.ts`
- `src/lib/editorial-context.ts`
- `src/lib/longform-interpretations.ts`
- `src/lib/position-essays.ts`
- `src/lib/premium-interpretations.ts`
- `src/lib/preview.ts`
- `src/lib/report-route.test.ts`
- `src/lib/report.ts`
- `vitest.config.mts`

## Created

- `.env.example`
- `docs/COMMERCE_CHANGED_FILES.md`
- `src/app/access/recover/page.tsx`
- `src/app/access/verify/page.tsx`
- `src/app/api/access/recover/route.ts`
- `src/app/api/access/redeem/route.ts`
- `src/app/api/checkout/route.ts`
- `src/app/api/dev/checkout/route.ts`
- `src/app/api/internal/deliver/route.ts`
- `src/app/api/payments/webhook/route.ts`
- `src/app/checkout/failure/page.tsx`
- `src/app/checkout/page.tsx`
- `src/app/checkout/pending/page.tsx`
- `src/app/checkout/success/page.tsx`
- `src/app/dev/checkout/page.tsx`
- `src/app/readings/page.tsx`
- `src/components/access-actions.tsx`
- `src/components/payment-status.tsx`
- `src/lib/server/access.test.ts`
- `src/lib/server/access.ts`
- `src/lib/server/checkout-status.ts`
- `src/lib/server/config.ts`
- `src/lib/server/contracts.ts`
- `src/lib/server/http.ts`
- `src/lib/server/memory-store.ts`
- `src/lib/server/payments.test.ts`
- `src/lib/server/payments.ts`
- `src/lib/server/product.ts`
- `src/lib/server/providers.ts`
- `src/lib/server/store.ts`
- `src/lib/server/supabase-store.ts`
- `src/lib/server/tokens.ts`
- `src/test/server-only.ts`
- `supabase/migrations/202611170001_complete_reading.sql`

No dependencies were installed. `package-lock.json`, the numerical engine, `docs/METHODOLOGY.md`, the chart, theme files, illustration assets, PDF writer and original reading paragraphs were not changed. Premium data libraries gained server-only import boundaries.
