import { z } from 'zod';
/** Sum decimal digits repeatedly only above 22; never subtract 22. */
export function reduce22(n: number): number {
  if (!Number.isSafeInteger(n) || n < 1) throw new Error('Expected a positive safe integer.');
  while (n > 22) n = String(n).split('').reduce((sum, d) => sum + Number(d), 0);
  return n;
}
export function dateSchema(today = new Date()) {
  return z.string().length(10,'Use YYYY-MM-DD.').regex(/^\d{4}-\d{2}-\d{2}$/, 'Use YYYY-MM-DD.').superRefine((value, ctx) => {
    const [year, month, day] = value.split('-').map(Number);
    const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
    const days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if (!year || month < 1 || month > 12 || day < 1 || day > (days[month - 1] ?? 0)) {
      ctx.addIssue({code:'custom',message:'Enter a real calendar date.'}); return;
    }
    // Compare calendar components in UTC; never parse a birth date into a Date.
    const limit = today.getUTCFullYear()*10000+(today.getUTCMonth()+1)*100+today.getUTCDate();
    if (year*10000+month*100+day > limit) ctx.addIssue({code:'custom',message:'Your birth date cannot be in the future.'});
  });
}
export function calculateMatrix(date: string, today = new Date()) {
  dateSchema(today).parse(date);
  const [year, month, day] = date.split('-').map(Number);
  const A = reduce22(day), B = month, C = reduce22(String(year).padStart(4,'0').split('').reduce((s,d)=>s+Number(d),0));
  const D = reduce22(A+B+C), E = reduce22(A+B+C+D);
  return {A,B,C,D,E,NW:reduce22(A+B),NE:reduce22(B+C),SE:reduce22(C+D),SW:reduce22(D+A)};
}
export type Matrix = ReturnType<typeof calculateMatrix>;
