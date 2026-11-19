import type { Metadata } from 'next';
import { CandidateReading } from '@/components/candidate-reading';
import { candidateSample } from '@/lib/methodology/report';

export const metadata: Metadata = { title: 'Complete sample reading · Fixed example' };

export default function Demo() {
  return <CandidateReading report={candidateSample()} sample />;
}
