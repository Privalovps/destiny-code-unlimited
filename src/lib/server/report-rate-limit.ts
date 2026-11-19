import 'server-only';
import { createHmac, randomBytes } from 'node:crypto';
import { isIP } from 'node:net';

const windowMs = 60_000;
const limits = {
  report: { client: 18, instance: 120 },
  pdf: { client: 6, instance: 30 },
};

type Work = keyof typeof limits;

export function createReportLimiter() {
  const secret = randomBytes(32);
  const buckets = {
    report: { end: 0, total: 0, clients: new Map<string, number>() },
    pdf: { end: 0, total: 0, clients: new Map<string, number>() },
  };

  return (work: Work, headers: Pick<Headers, 'get'>, now = Date.now()) => {
    const bucket = buckets[work];
    if (now >= bucket.end) {
      bucket.end = now + windowMs;
      bucket.total = 0;
      bucket.clients.clear();
    }

    // Trust the platform header only on Vercel. Other requests share a fallback bucket.
    const ip = process.env.VERCEL === '1' ? headers.get('x-vercel-forwarded-for') : null;
    const client = ip && isIP(ip) ? createHmac('sha256', secret).update(ip).digest('hex') : 'unknown';
    const count = bucket.clients.get(client) ?? 0;
    if (count >= limits[work].client || bucket.total >= limits[work].instance) {
      return Math.ceil((bucket.end - now) / 1000);
    }

    bucket.clients.set(client, count + 1);
    bucket.total += 1;
    return 0;
  };
}

export const limitReportWork = createReportLimiter();
