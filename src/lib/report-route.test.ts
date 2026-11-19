import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { NextRequest } from 'next/server';
import FullReport from '@/app/report/[date]/page';
import { GET } from '@/app/report/[date]/pdf/route';
import Result from '@/app/result/page';
import { GET as samplePdf } from '@/app/report/demo/pdf/route';
import { calculate as calculateReference } from '../../DESTINY_CODE_METHODOLOGY/reference/calculator.mjs';
import rules from '../../DESTINY_CODE_METHODOLOGY/data/calculation_rules.json';
import { composeCandidate, publication } from '@/lib/methodology/report';
import { createReportLimiter, limitReportWork } from '@/lib/server/report-rate-limit';
import { proxy } from '@/proxy';

vi.mock('@/lib/server/report-rate-limit', async importOriginal => {
  const actual = await importOriginal<typeof import('@/lib/server/report-rate-limit')>();
  return { ...actual, limitReportWork: vi.fn(actual.createReportLimiter()) };
});

vi.mock('next/navigation', async importOriginal => ({
  ...await importOriginal<typeof import('next/navigation')>(),
  useRouter: () => ({ push: vi.fn() }),
}));

beforeEach(() => {
  vi.mocked(limitReportWork).mockImplementation(createReportLimiter());
});

const parameters = (date: string) => ({ params: Promise.resolve({ date }) });
const pdfRequest = (date: string, query: string) => new Request(`http://localhost/report/${date}/pdf?${query}`);

describe('Unlimited reports', () => {
  it.each([
    ['1991-12-09', 10],
    ['2005-08-29', 7],
    ['1983-11-07', 6],
  ])('publishes the complete %s reading with center %i and both real PDFs', async (date, core) => {
    const report = composeCandidate(date);
    const document = publication(report);
    expect(report.values.core).toBe(core);
    expect(report.values).toEqual(calculateReference(date, rules.rules).values);
    expect(Object.keys(report.values)).toHaveLength(38);
    expect(document.sections).toHaveLength(11);

    const html = renderToStaticMarkup(await FullReport(parameters(date)));
    expect(html).toContain(report.semanticContentHash);
    expect(html).toContain(`Your center is ${core}, ${document.core.name}.`);
    expect(html).toContain('id="reading-matrix"');
    for (const section of document.sections) {
      expect(html).toContain(`id="${section.id}"`);
    }
    expect(html).not.toMatch(/href="\/(?:checkout|access|dev|readings)\b/);

    const editions: string[] = [];
    for (const edition of ['light', 'dark']) {
      expect(html).toContain(`href="/report/${date}/pdf?edition=${edition}"`);
      const response = await GET(pdfRequest(date, `edition=${edition}`), parameters(date));
      expect(response.status).toBe(200);
      expect(response.headers.get('Content-Type')).toBe('application/pdf');
      expect(response.headers.get('Content-Disposition')).toContain(`destiny-code-${date}-${edition}.pdf`);
      expect(response.headers.get('Cache-Control')).toBe('private, no-store');
      expect(response.headers.get('X-Robots-Tag')).toBe('noindex, nofollow');
      const pdf = Buffer.from(await response.arrayBuffer()).toString('latin1');
      expect(pdf).toMatch(/^%PDF-/);
      expect(pdf).toContain(`CENTER ${core} / ${date}`);
      expect(pdf).toContain(`${edition.toUpperCase()} EDITION`);
      expect(pdf).toMatch(/%%EOF\s*$/);
      editions.push(pdf);
    }
    expect(editions[0]).not.toBe(editions[1]);

  });

  it('validates route inputs and rejects malformed PDF selectors', async () => {
    for (const date of ['2005-02-29', '29-08-2005', '2999-01-01', 'opaque-order-id']) {
      await expect(FullReport(parameters(date))).rejects.toMatchObject({ digest: 'NEXT_HTTP_ERROR_FALLBACK;404' });
      expect((await GET(pdfRequest(date, 'edition=light'), parameters(date))).status).toBe(404);
    }
    const date = '1991-12-09';
    for (const query of ['edition=sepia', 'edition=light&edition=dark', 'edition=light&date=2005-08-29']) {
      expect((await GET(pdfRequest(date, query), parameters(date))).status).toBe(400);
    }
    expect(samplePdf(pdfRequest('demo', 'edition=dark&date=2005-08-29')).status).toBe(400);
  });

  it('opens a valid legacy result link directly and shows the form otherwise', async () => {
    await expect(Result({ searchParams: Promise.resolve({ date: '2005-08-29' }) }))
      .rejects.toMatchObject({ digest: expect.stringContaining('/report/2005-08-29') });
    const form = renderToStaticMarkup(await Result({ searchParams: Promise.resolve({ date: ['2005-08-29', '1983-11-07'] }) }));
    expect(form).toContain('Enter a valid birth date');
    expect(form).toContain('Generate My Full Reading');
  });
});

describe('generation limits', () => {
  it('returns a private 429 when the PDF limiter rejects the request', async () => {
    vi.mocked(limitReportWork).mockReturnValue(42);
    const date = '1991-12-09';
    const response = await GET(pdfRequest(date, 'edition=light'), parameters(date));
    expect(response.status).toBe(429);
    expect(response.headers.get('Retry-After')).toBe('42');
    expect(response.headers.get('Cache-Control')).toBe('private, no-store');
  });

  it('returns 429 for a burst of report requests and provides a retry time', () => {
    const request = new NextRequest('http://localhost/report/1991-12-09');
    for (let i = 0; i < 18; i++) expect(proxy(request).status).toBe(200);
    const blocked = proxy(request);
    expect(blocked.status).toBe(429);
    expect(Number(blocked.headers.get('Retry-After'))).toBeGreaterThan(0);
  });

  it('caps PDF work per client and per instance, then resets the window', () => {
    vi.stubEnv('VERCEL', '1');
    try {
      const limit = createReportLimiter();
      const client = (address: number) => new Headers({ 'x-vercel-forwarded-for': `192.0.2.${address}` });
      for (let i = 0; i < 30; i++) expect(limit('pdf', client(i % 5 + 1), 0)).toBe(0);
      expect(limit('pdf', client(6), 1000)).toBe(59);
      expect(limit('report', client(6), 1000)).toBe(0);
      for (let i = 0; i < 6; i++) expect(limit('pdf', client(1), 60_000)).toBe(0);
      expect(limit('pdf', client(1), 60_001)).toBe(60);
      expect(limit('pdf', client(2), 60_001)).toBe(0);
    } finally {
      vi.unstubAllEnvs();
    }
  });
});
