import { dateSchema } from './numerology';

export function formatBirthDateEntry(value: string): string {
  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  const digits = iso ? iso[3] + iso[2] + iso[1] : value.replace(/\D/g, '').slice(0, 8);
  return [digits.slice(0, 2), digits.slice(2, 4), digits.slice(4)].filter(Boolean).join('.');
}

export function parseBirthDateEntry(value: unknown, today?: Date) {
  const input = typeof value === 'string' ? value.trim() : '';
  const dotted = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(input);
  const date = dotted ? `${dotted[3]}-${dotted[2]}-${dotted[1]}` : input;
  return dateSchema(today).safeParse(date);
}
