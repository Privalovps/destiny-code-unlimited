import { describe, expect, it } from 'vitest';
import { generateReport, REPORT_VERSION, sectionReadingText } from './report';
import { professionalArcana, professionalArcanum } from './professional-arcana';
import { getSampleReport, SAMPLE_DATE } from './sample-report';
import { matrixPositions } from './matrix-positions';
import { positionGuides } from './professional-positions';
import { comparePositions } from './archetype-comparisons';
import { ACTIVE_METHODOLOGY, INTERPRETATION_VERSION, researchSources, symbolSourceUrl } from './reading-methodology';
import { interpretation } from './interpretations';
import { calculateMatrix } from './numerology';
import { editorialKey } from './editorial-context';
import { readFileSync } from 'node:fs';
const today=new Date('2026-11-17T12:00:00Z');
const fixtures=[
 {date:'1993-04-17',matrix:{A:17,B:4,C:22,D:7,E:5,NW:21,NE:8,SE:11,SW:6}},
 {date:'1992-05-18',matrix:{A:18,B:5,C:21,D:8,E:7,NW:5,NE:8,SE:11,SW:8}},
 {date:'1987-11-28',matrix:{A:10,B:11,C:7,D:10,E:11,NW:21,NE:18,SE:17,SW:20}},
];
describe('source-aware 22-Arcana library',()=>{
 it('uses exactly the active convention, including the explicit Fool adaptation',()=>{
  expect(professionalArcana.map(a=>a.number)).toEqual(Array.from({length:22},(_,i)=>i+1));
  expect(professionalArcanum(8).name).toBe('Strength');expect(professionalArcanum(11).name).toBe('Justice');expect(professionalArcanum(22).name).toBe('The Fool');
  expect(professionalArcanum(22).traditional).toContain('numbers the Fool 0');
  expect(ACTIVE_METHODOLOGY.status).toContain('not the complete');
 });
 it.each(professionalArcana)('has distinct, attributed content and nine rules for $number / $name',a=>{
  expect(a.name).toBe(interpretation(a.number).name);expect(a.concepts.length).toBeGreaterThanOrEqual(4);
  for(const field of ['traditional','constructive','shadow','tension','personality','talents','relationships','money','growth','synthesis','example','exercise','takeaway'] as const)expect(a[field].length).toBeGreaterThan(20);
  expect(new Set(professionalArcana.map(entry=>entry.theme)).size).toBe(22);
  expect(new Set(Object.values(a.positionRules)).size).toBe(9);
  expect(Object.keys(a.positionRules).sort()).toEqual(matrixPositions.map(p=>p.key).sort());
  expect(a.source.url).toBe(symbolSourceUrl(a.number));expect(a.source.scope).toContain('editorial');expect(a.attribution).toContain('Original Destiny Code');
 });
 it('has no shared complete domain paragraphs between different archetypes',()=>{
  const text=professionalArcana.flatMap(a=>[a.constructive,a.shadow,a.personality,a.talents,a.relationships,a.money,a.growth,a.synthesis,a.exercise]);
  expect(new Set(text.map(editorialKey)).size).toBe(text.length);
  for(const n of [0,23,1.5,NaN])expect(()=>professionalArcanum(n)).toThrow();
 });
 it('resolves static source references to the inspected chapter and research registry',()=>{
  const doc=readFileSync(new URL('../../docs/history/PROFESSIONAL_METHODOLOGY_V4.md',import.meta.url),'utf8');
  for(const source of Object.values(researchSources)){expect(new URL(source.url).protocol).toBe('https:');expect(doc).toContain(source.url);expect(source.access.length).toBeGreaterThan(20);}
  expect(new Set(professionalArcana.map(a=>a.source.url)).size).toBe(22);
 });
});
describe('traceable report engine',()=>{
 it.each(fixtures)('preserves arithmetic and traces every position for $date',({date,matrix})=>{
  const r=generateReport(date,today);expect(r.matrix).toEqual(matrix);expect(r.matrix).toEqual(calculateMatrix(date,today));expect(r.methodology.id).toBe(ACTIVE_METHODOLOGY.id);expect(r.version).toBe(INTERPRETATION_VERSION);expect(r.sections).toHaveLength(8);
  for(const section of r.sections)for(const block of section.blocks){expect(section.positions).toContain(block.position);expect(block.number).toBe(matrix[block.position]);expect(block.title).toBe(professionalArcanum(block.number).name);expect(block.sourceUrl).toBe(symbolSourceUrl(block.number));expect(block.paragraphs.length).toBeGreaterThan(0);expect(block.references.every(ref=>ref.id!==section.id)).toBe(true);}
  const analysis=r.sections.find(s=>s.id==='life-themes')!;expect(analysis.blocks.map(b=>b.position)).toEqual(matrixPositions.map(p=>p.key));
  for(const position of r.positions){expect(position.proof).toContain(String(matrix[position.key]));expect(position.origin).toContain('editorial');}
  expect(r.wordCount).toBeGreaterThan(6000);expect(r.wordCount).toBeLessThan(9000);
  expect(r).toEqual(generateReport(date,today));
 });
 it.each([...fixtures.map(f=>f.date),'0001-01-01','2000-02-29'])('does not duplicate paragraphs, questions or specific exercises for %s',date=>{
  const r=generateReport(date,today);const paragraphs=r.sections.flatMap(s=>s.blocks.flatMap(b=>[...b.paragraphs,...b.notes])).map(editorialKey);
  expect(new Set(paragraphs).size).toBe(paragraphs.length);
  const questions=r.sections.flatMap(s=>s.questions).map(editorialKey);expect(new Set(questions).size).toBe(questions.length);
  const practices=r.sections.map(s=>editorialKey(s.practice));expect(new Set(practices).size).toBe(8);
  const text=r.sections.flatMap(sectionReadingText).join(' ');
  for(const a of professionalArcana){expect(text.split(a.example).length-1).toBeLessThanOrEqual(1);expect(text.split(a.exercise).length-1).toBeLessThanOrEqual(1);expect(text.split(a.shadow).length-1).toBeLessThanOrEqual(1);}
  for(const p of matrixPositions)expect(text.split(positionGuides[p.key].practice).length-1).toBe(1);
  expect(text).not.toMatch(/\b(?:A[123]|B[123]|C[123]|D[123])\b|your karmic (?:debt|program)|your money channel|your love channel|you will (?:earn|marry|become)/i);
 });
 it('changes substantive domain prose rather than only labels across matrices',()=>{
  const a=generateReport(fixtures[0].date,today),b=generateReport(fixtures[1].date,today);
  for(const index of [1,2,3,4,5,7])expect(a.sections[index].blocks.flatMap(x=>x.paragraphs)).not.toEqual(b.sections[index].blocks.flatMap(x=>x.paragraphs));
 });
 it('keeps repeated archetypes consistent while assigning different tasks',()=>{
  const r=generateReport('1992-05-18',today);expect(r.matrix.D).toBe(r.matrix.NE);expect(r.matrix.NE).toBe(r.matrix.SW);
  const comparison=comparePositions(r.matrix,'NE','SW');expect(comparison.origin).toContain('editorial');expect(comparison.text).toContain('same archetype, Strength');expect(comparison.text).toContain('NE');expect(comparison.text).toContain('SW');expect(comparison.text).toContain(professionalArcanum(8).positionRules.NE);expect(comparison.text).toContain(professionalArcanum(8).positionRules.SW);
 });
});
describe('historical v4 sample',()=>{
 it('uses the same content/version/methodology and never selects a visitor date',()=>{
  expect(getSampleReport()).toEqual(generateReport(SAMPLE_DATE));expect(getSampleReport().version).toBe(REPORT_VERSION);
 });
});
