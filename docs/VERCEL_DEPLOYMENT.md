# Customer-only deployment guide

Prepared locally; no deployment has been performed. Read [release audit](CUSTOMER_RELEASE_AUDIT.md) before publication. This release has no public owner/Studio preview and no operational payment provider.

## 1. Dependency and runtime gate

Use Node.js 24.x (`.nvmrc`). Local development remains Webpack. Install from the reviewed lockfile with `npm ci`. Run `node scripts/check-customer-release.mjs` before upload. It rejects Next.js versions older than the reviewed 16.4.5 security floor; passing is not a guarantee against future advisories. Do not bypass this guard. The approved dependency update was attempted but failed with ENOTFOUND for registry.npmjs.org; installed/locked Next.js remains 16.2.0. From a network-enabled terminal, run `NODE_OPTIONS=--max-old-space-size=384 npm install --save-exact next@16.4.5 eslint-config-next@16.4.5`, inspect the lockfile, then rerun the preflight and focused checks. The update must succeed before deployment. Review current [Next.js security advisories](https://github.com/vercel/next.js/security/advisories).

No local production build is required for this handoff. Vercel runs `npm run build` in its cloud environment; the prebuild guard runs first.

## 2. Create a private GitHub repository

The audited folder has no Git repository. Create an empty **private** GitHub repository without an initial README. In this existing project directory, run these commands yourself:

```sh
cd ~/Desktop/Isoteric
git init -b main
git add .
git status --short
git diff --cached --stat
git ls-files -- '.env*'
git ls-files -- '*.pdf'
```

Inspect staged files before committing. Only `.env.example` should appear among environment files; no generated private PDFs, credentials, node_modules or .next should be staged. Keep the methodology JSON/schema data: it is required by the application. Do not use `git add -f` for ignored secrets. If a secret was ever published, remove it from history and rotate it; adding an ignore rule does not revoke credentials.

```sh
git commit -m "Prepare customer-only release"
git remote add origin https://github.com/YOUR_ACCOUNT/YOUR_PRIVATE_REPOSITORY.git
git push -u origin main
```

Replace the remote placeholders. These Git operations have not been performed by the agent.

## 3. Connect Vercel

Choose Add New Project, import the private repository and select Next.js. Root directory is the repository root. Select Node.js 24.x. The checked-in configuration uses `npm ci` and `npm run build`; leave output directory at the Next.js default. Do not set a static export output. PDF routes require the Node.js runtime, not Edge.

Configure environment variables separately for **Preview** and **Production**. Never copy `.env.local` into Git or upload secret files. Do not set NODE_ENV manually; Vercel builds both deployments with production runtime behavior.

| Name | Public customer deployment |
| --- | --- |
| NEXT_PUBLIC_SITE_URL | Exact HTTPS canonical origin, without trailing slash/path. Not a secret. May initially be unset to use Vercel's automatic hostname. |
| APP_ORIGIN | Exact HTTPS browser origin used by future checkout/recovery. Never the local example URL on a deployment. |
| ENABLE_LIVE_CHECKOUT | `0` |
| DESTINY_CODE_DEV_CHECKOUT | `0` or unset |
| DESTINY_CODE_LOCAL_REPORT_PREVIEW | `0` or unset |
| DESTINY_CODE_LOCAL_PREVIEW | `0` or unset |
| DESTINY_CODE_READING_RELEASE | Unset; deployed public free/sample surfaces use the current 38-value edition. |
| DESTINY_CODE_CONTENT_VERSION | Unset; use frozen current content, not an historical rollback. |
| SUPABASE_URL | Server-only Supabase project URL, required for real durable customer access; not needed for free/sample-only browsing. |
| SUPABASE_SERVICE_ROLE_KEY | Server-only service-role secret, never NEXT_PUBLIC. Required with Supabase for customer entitlements. |
| DELIVERY_SECRET | Server-only random value, at least 32 characters, for the existing delivery-worker endpoint. No automatic worker is added. |

Vercel's VERCEL/VERCEL_ENV/hostname variables are platform-managed. Never override them to enable local tools. No Lava.top credentials are specified yet because the verified provider adapter is not implemented. Do not invent credentials or turn checkout on.

For durable commerce, review and manually apply `supabase/migrations/202611170001_complete_reading.sql` in the intended Supabase project. Review RLS/RPC permissions before supplying service credentials. Use separate test and production projects. No migration has been applied by this task. See [payment architecture](PAYMENT_ARCHITECTURE.md).

## 4. Deploy and inspect the cloud build

Create the deployment and inspect Vercel logs. If the dependency guard or build fails, fix the reported error; do not remove security checks to publish. A successful cloud build has not yet been verified. Platform execution limits and cold starts must be checked on the chosen plan. PDF routes request a 60-second maximum duration and cap buffered PDF responses at 4,000,000 bytes, below Vercel's documented 4.5 MB payload limit. PDFs are generated on explicit requests in memory, never written to public assets. Oversized responses fail privately rather than publishing partial documents.

## 5. Preview and mobile customer QA

Optionally enable Vercel Authentication / Deployment Protection for Preview deployments through project settings, subject to plan availability. This protects the deployment front door; it does **not** grant a paid entitlement. No remote owner report bypass is included.

Open the Preview URL on an iPhone; sign in through Vercel if protected. Check homepage, birth-date validation, free results for 1991-12-09 and 2005-08-29, matrix selection, light/dark themes, fixed `/report/demo`, and its Light/Dark PDF links. Verify first/last PDF pages and long-page pagination manually. All ten sample chapters should appear. Verify arbitrary `/report/2005-08-29` and both PDF editions are denied, and `/dev/report-preview`, `/dev/report-preview/reading`, `/dev/report-preview/pdf`, `/dev/checkout` cannot be opened. Purchase controls must honestly remain unavailable. Confirm no horizontal overflow at 320/375/390/430/768px and desktop widths. Monitor cloud errors and actual memory/latency; no runtime checks were performed locally.

## 6. Custom domain and HTTPS

In Vercel Project Settings → Domains, add the domain you own. Use the **exact DNS records displayed for that project** at your registrar: typically an apex A record or subdomain CNAME. Do not copy old example IPs from another project. Preserve mail MX/TXT and unrelated records. Wait for Vercel to verify DNS and issue HTTPS. Choose a canonical apex/www hostname and configure the other to redirect.

Set NEXT_PUBLIC_SITE_URL and APP_ORIGIN to the final HTTPS origin in Production and redeploy so build-time metadata uses the domain. Keep Preview origins separate. Test HTTPS, redirects, sample/PDF access and denied private/dev routes again from a mobile phone.

## 7. Rollback and off switches

Use Vercel Deployments to roll back/promote a previously verified production deployment. Environment changes require a redeploy; review the environment of the target deployment. Database migrations and fulfilled entitlements are not automatically rolled back. Do not downgrade to an insecure framework version. Keep all development flags off; disabling live checkout does not revoke genuine historical entitlements.

Before accepting money, finish verified payments/email delivery, durable report-edition binding and real infrastructure tests described in the release audit. Until then this is a free/sample customer website with an unavailable paid offer.

Platform references: [Node versions](https://vercel.com/docs/functions/runtimes/node-js/node-js-versions), [function limits](https://vercel.com/docs/functions/limitations), [duration](https://vercel.com/docs/functions/configuring-functions/duration), [domain setup](https://vercel.com/docs/domains/working-with-domains/add-a-domain), [deployment protection](https://vercel.com/docs/deployment-protection), [rollback](https://vercel.com/docs/deployments/rollback-production-deployment).
