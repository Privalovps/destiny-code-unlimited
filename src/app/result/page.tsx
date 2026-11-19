import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { BirthForm } from '@/components/birth-form';
import { dateSchema } from '@/lib/numerology';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = {
  title: 'Generate your full reading',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
};

export default async function Result({ searchParams }: { searchParams: Promise<{ date?: string | string[] }> }) {
  const { date } = await searchParams;
  const parsed = dateSchema().safeParse(date);
  if (parsed.success) redirect(`/report/${parsed.data}`);

  return <section className="shell section narrow">
    <h1 className="page-title">A date is all we need.</h1>
    {date !== undefined && <p role="alert">Enter a valid birth date to begin.</p>}
    <BirthForm />
  </section>;
}
