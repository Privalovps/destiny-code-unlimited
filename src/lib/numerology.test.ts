import { describe, expect, it } from 'vitest';
import { calculateMatrix, dateSchema, reduce22 } from './numerology';
const today = new Date('2026-11-17T12:00:00Z');
describe('documented matrix variant',()=>{
 it('matches the regression fixture',()=>expect(calculateMatrix('1993-04-17',today)).toEqual({A:17,B:4,C:22,D:7,E:5,NW:21,NE:8,SE:11,SW:6}));
 it('preserves 1–22 and sums above 22',()=>{for(let n=1;n<=22;n++) expect(reduce22(n)).toBe(n); expect(reduce22(29)).toBe(11); expect(reduce22(99999)).toBe(9);});
 it.each(['2000-02-29','2024-02-29','1993-01-31','1993-04-30','0001-01-01','2026-11-17'])('accepts %s',d=>expect(dateSchema(today).safeParse(d).success).toBe(true));
 it.each(['1900-02-29','2023-02-29','2024-02-30','1993-04-31','1993-06-31','1993-11-31','0000-01-01','1993-00-10','1993-13-01','1993-01-00','1993-01-32','2026-11-18','2099-01-01','93-04-17','1993-4-17','garbage',''])('rejects %s',d=>expect(()=>calculateMatrix(d,today)).toThrow());
 it('is deterministic and bounded',()=>{for(let m=1;m<=12;m++){const d=`1993-${String(m).padStart(2,'0')}-17`; const a=calculateMatrix(d,today);expect(a).toEqual(calculateMatrix(d,today));Object.values(a).forEach(n=>expect(n>=1&&n<=22).toBe(true));}});
 it.each([0,-1,1.5,NaN,Infinity])('rejects invalid reduction %s',n=>expect(()=>reduce22(n)).toThrow());
});

// Canonical calendar strings must not exploit JavaScript $ accepting a final newline.
it('rejects trailing newline in product birth dates',()=>{expect(dateSchema().safeParse('1991-12-09\n').success).toBe(false);});
