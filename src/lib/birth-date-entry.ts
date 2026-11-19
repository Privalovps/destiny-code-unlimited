import { dateSchema } from './numerology';

export function parseBirthDateEntry(value: unknown, today?: Date) {
  const input = typeof value === 'string' ? value.trim() : '';
  const dotted = /^(\d{2})\.(\d{2})\.(\d{4})$/.exec(input);
  const date = dotted ? `${dotted[3]}-${dotted[2]}-${dotted[1]}` : input;
  return dateSchema(today).safeParse(date);
}
