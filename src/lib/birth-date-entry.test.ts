import { describe, expect, it } from 'vitest';
import { formatBirthDateEntry, parseBirthDateEntry } from './birth-date-entry';

describe('automatic date separators', () => {
  it.each([
    ['17', '17'],
    ['170', '17.0'],
    ['17.04', '17.04'],
    ['17.041', '17.04.1'],
    ['17041993', '17.04.1993'],
    ['17.04.1993', '17.04.1993'],
    ['1993-04-17', '17.04.1993'],
    ['17.04.', '17.04'],
  ])('formats %s as %s', (input, expected) => {
    expect(formatBirthDateEntry(input)).toBe(expected);
  });
});

describe('birth-date form input', () => {
  const today = new Date(Date.UTC(2026, 10, 19));

  it.each([' 29.02.2000 ', '2000-02-29'])('normalizes %s to the canonical route date', (input) => {
    expect(parseBirthDateEntry(input, today)).toEqual({ success: true, data: '2000-02-29' });
  });

  it.each(['29.02.1900', '31.04.1993', '20.11.2026', '04/17/1993', '', ['1993-04-17']])(
    'rejects invalid input %j',
    (input) => {
      expect(parseBirthDateEntry(input, today).success).toBe(false);
    },
  );
});
