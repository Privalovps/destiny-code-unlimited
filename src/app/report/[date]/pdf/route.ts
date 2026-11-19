import { generateCandidatePdf } from '@/lib/methodology/pdf';
import { composeCandidate } from '@/lib/methodology/report';
import { dateSchema } from '@/lib/numerology';
import { privateHeaders } from '@/lib/server/personal-response';
import { downloadPdf } from '@/lib/server/unlimited-pdf';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

export async function GET(request: Request, { params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  const parsed = dateSchema().safeParse(date);
  if (!parsed.success) return new Response('Invalid birth date.', { status: 404, headers: privateHeaders });

  return downloadPdf(request, `destiny-code-${parsed.data}`, edition =>
    generateCandidatePdf(composeCandidate(parsed.data), edition),
  );
}
