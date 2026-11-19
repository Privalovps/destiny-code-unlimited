import { describe,it,expect } from 'vitest';
import { writeFileSync } from 'node:fs';
import { composeCandidate,publication } from './report';
import { positionNarrative,channelSynthesis,declaredSequence } from './depth';
import { calculate } from './calculate';
import { positionData,arcanum } from './data';
import { pdfReadingDocument } from './pdf';
import { webReadingDocument } from '@/components/candidate-reading';
const dates=['1991-12-09','1987-01-23','1993-04-17','2000-02-29','1976-11-28'];
describe('shared editorial quality',()=>{
 it.each(dates)('assembles complete natural sentences without repeated scaffolding for %s',date=>{
  const report=composeCandidate(date),text=report.sections.flatMap(s=>s.blocks.map(b=>b.text)).join(' ');
  expect(text).not.toMatch(/the practical question is what you would do differently|The specific pressure to watch|In this order|Begin with (?:name|say|ask|check|explain|state|make|separate|share)|into this particular role|a constructive application is to/i);
  expect(text).not.toMatch(/\.\.|\s{2,}|\b(?:to to|with with|the the)\b/);
  expect(report).toEqual(composeCandidate(date));expect(report.values).toEqual(calculate(date).values);
  expect(report.wordCount).toBeGreaterThan(9000);
  expect(webReadingDocument(report)).toEqual(publication(report));for(const theme of ['light','dark'] as const)expect(pdfReadingDocument(report,theme)).toEqual(publication(report));
 });
 it('keeps all 22 symbols grammatical in every documented position and domain',()=>{
  const matrix=calculate(dates[0]);for(let number=1;number<=22;number++)for(const p of positionData){const values={...matrix.values,[p.id]:number} as typeof matrix.values;for(const first of [true,false]){const text=positionNarrative(values,p.id,p.domain,first,new Set()).join(' ');expect(text).not.toMatch(/\.\.|\s{2,}|Begin with (?:name|say|ask|check)/i);expect(text.length).toBeGreaterThan(150);}}
 });
 it('keeps approved ordered components and readable complete communication sentences for all 22 entry symbols',()=>{
  for(let number=1;number<=22;number++){const matrix=calculate(dates[0]),values={...matrix.values,bottom_inner:number} as typeof matrix.values;const sentence=arcanum(number).communicationThemes;expect(sentence).toMatch(/^[A-Z]/);const channel=channelSynthesis(values,'relationships',{opening:'Opening.',constructive:'Constructive.',shadow:'Shadow.',scenario:`One person requests a change. Start the conversation plainly: ${sentence}`,conclusion:'Conclusion.'});expect(channel.ids).toEqual(declaredSequence('relationships'));expect(channel.text).toContain(sentence);expect(channel.text).not.toMatch(/Begin with (?:name|say|ask|check)/i);}
 });
 it('records five-date metrics only when explicitly requested',()=>{
  if(process.env.DESTINY_CODE_WRITE_EDITORIAL_AUDIT==='1')writeFileSync('/private/tmp/dc-editorial-after.json',JSON.stringify(dates.map(date=>{const r=composeCandidate(date);return {date,words:r.wordCount,hash:r.semanticContentHash,sections:r.sections};}),null,2));
 });
});
