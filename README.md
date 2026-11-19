# Destiny Code Unlimited

An independent Destiny Code site. Enter a birth date to open the interactive matrix, ten chapters, and calculation appendix. The reading includes two downloadable PDF editions. Unlimited uses the existing C-family-center-v1 calculation, 38 documented values, and 22 symbolic archetypes.

## Local use

Use Node.js 24 and run the following from this directory.

```sh
npm ci
npm run dev
```

If dependencies are already installed here, run `npm run dev` directly. Open the localhost address shown by Next.js. Both the development and build scripts select Webpack explicitly. No local environment file is required.

| Route | Purpose |
| --- | --- |
| `/` | Home and birth-date form |
| `/result` | Standalone birth-date form |
| `/result?date=YYYY-MM-DD` | Server-validated redirect to the complete reading |
| `/report/YYYY-MM-DD` | Full reading, interactive matrix, and appendix |
| `/report/YYYY-MM-DD/pdf?edition=light` | Light PDF |
| `/report/YYYY-MM-DD/pdf?edition=dark` | Dark PDF |
| `/report/demo` | Fixed example reading and PDFs |

## Independent Vercel project

1. Install the reviewed framework update and run the checks below before publishing. The deployment guard blocks the existing Next.js 16.2.0 pin and requires a stable Next.js 16 release at or above 16.4.5.
2. When ready to publish, create a fresh Git repository here and push it to a separate GitHub repository for Unlimited. The ignore rules exclude installed dependencies, build output, local environment files, and generated PDFs.
3. In Vercel, choose **Add New → Project** and import the Unlimited repository into a new project. Set Node.js to 24.x. Use the committed `vercel.json`, which runs `npm ci` and `npm run build`. Use the new project's own `vercel.app` address. Vercel can supply the origin automatically, or set `NEXT_PUBLIC_SITE_URL` to the Unlimited project's HTTPS origin without a trailing slash. See [Vercel Git project setup](https://vercel.com/docs/git).
4. Before opening public access, review the operator details in the privacy and terms templates and the host's request-log retention. Configure a project-specific firewall rate limit for the report and PDF paths if limits must hold across instances. See [Vercel WAF rate limiting](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting).

### Framework update before deployment

Next.js 16.4.6 is the reviewed upgrade target as of November 19, 2026. The install attempt failed because this environment could not resolve `registry.npmjs.org`, so the manifest and lockfile still pin 16.2.0. Review current advisories before publishing. [Next.js 16.4.6 release](https://github.com/vercel/next.js/releases/tag/v16.4.6) · [November security release](https://nextjs.org/blog/november-2026-security-release) · [Current advisories](https://github.com/vercel/next.js/security/advisories)

Run these commands from a network-enabled terminal with Node.js 24 active. Review the npm-generated `package.json` and `package-lock.json` together before committing them to the Unlimited repository.

```sh
cd "$HOME/Desktop/Isoteric - Unlimited" &&
export NODE_OPTIONS=--max-old-space-size=384 &&
npm install --save-exact next@16.4.6 &&
npm install --save-dev --save-exact eslint-config-next@16.4.6 &&
npm ls next eslint-config-next react react-dom --depth=0 &&
node scripts/check-customer-release.mjs &&
npm test -- src/lib src/components/chart.test.tsx --maxWorkers=1 &&
npm run typecheck &&
npm run lint
```

## Privacy and capacity

Server-side validation accepts real, non-future Gregorian dates. Report and PDF responses are marked `private, no-store` and `noindex, nofollow`, with a no-referrer policy. A date is visible in its report URL and PDFs. Shared links, browser history, and hosting logs can retain it. Anyone with the URL can calculate that reading. The application keeps no date history or database.

Generation limits use a one-minute window per warm server instance. On Vercel, the platform's client IP header is hashed with an ephemeral in-memory key. A client can request up to 18 reports and six PDFs per minute, with ceilings of 120 reports and 30 PDFs per instance. Other hosts and requests with no usable IP share one fallback client bucket. Limits reset on cold starts, and clients on shared IPs share a quota. Distributed traffic can reach multiple instances, so the application limits alone cannot enforce a deployment-wide cap.

Personal PDF bytes are generated on demand and discarded after the response. Since both editions of the fixed public example are identical across requests, they are reused in memory for the lifetime of a warm instance. Production secrets, a database, and external services are unnecessary.

The methodology files and historical report engine remain available for reference under `DESTINY_CODE_METHODOLOGY`, `docs`, and `src/lib`. Older deployment and commerce documents describe the commercial source, while this README applies to Unlimited.
