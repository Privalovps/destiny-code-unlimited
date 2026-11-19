import { describe, expect, it } from 'vitest';
import { parseBirthDateEntry } from './birth-date-entry';

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
