import { candidateSample, CANDIDATE_SAMPLE_DATE } from '@/lib/methodology/report';
import { generateCandidatePdf } from '@/lib/methodology/pdf';
import type { PdfEdition } from '@/lib/pdf-edition';
import { downloadPdf } from '@/lib/server/unlimited-pdf';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;
export const runtime = 'nodejs';

const samplePdfs = new Map<PdfEdition, Uint8Array>();

export function GET(request: Request) {
  return downloadPdf(request, `destiny-code-sample-${CANDIDATE_SAMPLE_DATE}`, edition => {
    const cached = samplePdfs.get(edition);
    if (cached) return cached;
    const pdf = generateCandidatePdf(candidateSample(), edition, true);
    samplePdfs.set(edition, pdf);
    return pdf;
  });
}
