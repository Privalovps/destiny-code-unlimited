import { CandidateReading } from '@/components/candidate-reading';
import { composeCandidate } from '@/lib/methodology/report';
import { dateSchema } from '@/lib/numerology';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Your complete personal reading',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
};

export default async function FullReport({ params }: { params: Promise<{ date: string }> }) {
  const { date } = await params;
  const parsed = dateSchema().safeParse(date);
  if (!parsed.success) notFound();
  return <CandidateReading report={composeCandidate(parsed.data)} />;
}
