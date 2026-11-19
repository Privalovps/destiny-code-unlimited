import 'server-only';
import { parsePdfEdition, type PdfEdition } from '@/lib/pdf-edition';
import { privateHeaders } from './personal-response';
import { privatePdfResponse } from './pdf-response';
import { limitReportWork } from './report-rate-limit';

export function downloadPdf(request: Request, filename: string, render: (edition: PdfEdition) => Uint8Array) {
  const query = new URL(request.url).searchParams;
  const edition = parsePdfEdition(query.get('edition'));
  if (!edition || query.getAll('edition').length > 1 || [...query.keys()].some(key => key !== 'edition')) {
    return new Response('Choose either the light or dark PDF edition.', { status: 400, headers: privateHeaders });
  }

  const retryAfter = limitReportWork('pdf', request.headers);
  if (retryAfter) {
    return new Response('Too many PDF requests. Please try again shortly.', {
      status: 429,
      headers: { ...privateHeaders, 'Retry-After': String(retryAfter) },
    });
  }

  try {
    return privatePdfResponse(render(edition), `${filename}-${edition}.pdf`);
  } catch {
    return new Response('This report could not be downloaded. Please try again later.', {
      status: 503, headers: privateHeaders,
    });
  }
}
