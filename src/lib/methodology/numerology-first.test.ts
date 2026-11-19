import { describe,it,expect } from 'vitest';
import { calculate } from './calculate';
import { arcanum,positionData } from './data';
import { positionNarrative,roleDepth } from './depth';
import { symbolicReadings } from './symbolic-reading';
import { candidateSample,composeCandidate } from './report';
import { countWords } from './narrative-metrics';
import { writeFileSync } from 'node:fs';
const dates=['1991-12-09','1987-01-23','1993-04-17','2000-02-29','1976-11-28'];
describe('numerology precedes application',()=>{
 it('gives all 22 symbols an explicit meaning, role, constructive expression and shadow before guidance',()=>{
  const matrix=calculate(dates[0]);expect(Object.keys(symbolicReadings)).toHaveLength(22);
  for(let n=1;n<=22;n++)for(const position of positionData)for(const first of [true,false]){
   const values={...matrix.values,[position.id]:n} as typeof matrix.values,paragraphs=positionNarrative(values,position.id,position.domain,first,new Set());
   expect(paragraphs).toHaveLength(4);expect(paragraphs[0].toLowerCase()).toContain(arcanum(n).name.toLowerCase());expect(paragraphs[1]).toContain(symbolicReadings[n].constructive);expect(paragraphs[2]).toContain(symbolicReadings[n].shadow);expect(paragraphs.slice(0,3).join(' ')).not.toContain(roleDepth[position.id].test);expect(paragraphs[3]).not.toBe('');
  }
 });
 it('explains Judgment in material learning through inheritance and renewal before resource guidance',()=>{
  const matrix=calculate(dates[0]);expect(matrix.values.year).toBe(20);const paragraphs=positionNarrative(matrix.values,'year','money',false,new Set());
  expect(paragraphs[0]).toContain('Judgment');expect(paragraphs[0]).toContain('inheritance and renewal');expect(paragraphs[0]).toContain('family practices and collective patterns');expect(paragraphs[1]).toContain('transmission of useful collective knowledge');expect(paragraphs[2]).toContain('loyalty confused with obedience');expect(paragraphs[3]).toContain('choose what to carry forward');
 });
 it.each(dates)('retains all positions and ordered syntheses before the application layer for %s',date=>{
  const r=composeCandidate(date);for(const section of r.sections){const firstApplication=section.blocks.findIndex(b=>b.editorialRole==='application');
   if(firstApplication>=0){expect(section.blocks.slice(firstApplication).every(b=>b.kind!=='position')).toBe(true);expect(section.blocks.slice(0,firstApplication).every(b=>b.kind!=='practice')).toBe(true);}
  }expect(r.values).toEqual(calculate(date).values);
 });
 it('records structural balance without treating word percentages as proof of content quality',()=>{
  const r=candidateSample();let interpretation=0,application=0;
  for(const s of r.sections){if(['orientation','reference'].includes(s.id))continue;let channelIndex=-1;for(const b of s.blocks){const words=countWords(b.text);if(b.heading?.startsWith('Reading '))channelIndex=0;else if(channelIndex>=0&&channelIndex<4)channelIndex++;
   if(b.kind==='practice'||b.editorialRole==='application'||s.id==='integration'||channelIndex===2||channelIndex===3)application+=words;else interpretation+=words;
  }}
  if(process.env.DESTINY_CODE_WRITE_SYMBOLIC_AUDIT==='1')writeFileSync('/private/tmp/dc-symbolic-audit.json',JSON.stringify({sampleWords:r.wordCount,interpretation,application,interpretationShare:interpretation/(interpretation+application),dates:dates.map(date=>{const report=composeCandidate(date);return {date,words:report.wordCount,hash:report.semanticContentHash};}),judgmentExample:positionNarrative(calculate(dates[0]).values,'year','money',false,new Set())},null,2));
 });
});
