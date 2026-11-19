import { describe,it,expect } from 'vitest';
import { writeFileSync } from 'node:fs';
import { composeCandidate,composeCandidateVersion } from './report';
import { calculate } from './calculate';
import { positionById } from './data';
import type { NodeId,ArcanaNumber } from './types';
import { arcanaFrames,positionPlaces } from './literary-frames';
import { roleDepth,illustrationSentence,sectionSynthesis,positionNarrative } from './depth';
import { applicationCues } from './depth-library';
import { symbolicReadings } from './symbolic-reading';
import approved from './fixtures/editorial-v2.1.json';
import { pdfReadingDocument } from './pdf';
import { webReadingDocument } from '@/components/candidate-reading';
const artifacts=/practiced skills takes|takes direction from direction|(?<!theme of )cultivation and tangible care focuses|(?<!theme of )depth and independent understanding introduces|consider considering|independent understanding gives substance|Apparent moderation can conceal avoidance concealed as moderation|\b(?:to to|the the|with with)\b|\.\./i;
const textOf=(r:ReturnType<typeof composeCandidate>)=>r.sections.flatMap(s=>s.blocks.map(b=>b.text)).join(' ');
describe('grammar-only correction',()=>{
 it.each(approved)('preserves approved 2.1.0 and corrects generated paragraphs for $date',fixture=>{
  const before=composeCandidateVersion(fixture.date,'en-US-role-editorial-2.1.0'),after=composeCandidate(fixture.date);
  expect(before.semanticContentHash).toBe(fixture.semanticHash);expect(before.wordCount).toBe(fixture.words);expect(after.values).toEqual(before.values);expect(after.trace).toEqual(before.trace);expect(after.sections.map(s=>s.id)).toEqual(before.sections.map(s=>s.id));expect(after.sections.find(s=>s.id==='reference')).toEqual(before.sections.find(s=>s.id==='reference'));expect(after.sections.flatMap(s=>s.blocks.flatMap(b=>b.ruleIds))).toEqual(before.sections.flatMap(s=>s.blocks.flatMap(b=>b.ruleIds)));expect(after).toEqual(composeCandidate(fixture.date));expect(textOf(after).match(artifacts)?.[0]).toBeUndefined();expect(Math.abs(after.wordCount-before.wordCount)).toBeLessThan(before.wordCount*.01);
  for(const theme of ['light','dark'] as const)expect(pdfReadingDocument(after,theme)).toEqual(webReadingDocument(after));
 });
 it('uses grammar-safe subjects for the confirmed plural-position and compound-theme cases',()=>{
  expect(arcanaFrames[7].constructive(symbolicReadings[7].constructive,'practiced skills')).toBe('Through the Chariot, the emphasis in practiced skills is direction, coordinated movement and effort organized toward a defined stage of completion.');
  expect(arcanaFrames[9].constructive(symbolicReadings[9].constructive,'practiced skills')).toContain("The Hermit's contribution to practiced skills lies in depth");
  const values=calculate('1991-12-09').values;
  expect(sectionSynthesis(values,'resources')[0].text).toContain('the theme of cultivation and tangible care focuses attention');
  expect(sectionSynthesis(values,'parenting')[0].text).toContain('The theme of depth and independent understanding introduces the exchange');
  expect(arcanaFrames[14].shadow(symbolicReadings[14].shadow,'the lower maternal anchor')).toBe('In the lower maternal anchor, the unbalanced pattern is avoidance concealed as moderation, suppressed preferences or swings between restriction and excess.');
 });
 it('checks every structured scene and every Arcana frame as generated sentences',()=>{
  for(const [id,role] of Object.entries(roleDepth))expect(illustrationSentence(id as keyof typeof roleDepth,role.scene)).not.toMatch(artifacts);
  for(let number=1;number<=22;number++)for(const [key,place] of Object.entries(positionPlaces)){const id=key as NodeId;for(const kind of ['constructive','shadow'] as const){const text=arcanaFrames[number][kind](symbolicReadings[number][kind],place);expect(text).not.toMatch(artifacts);expect(text).toMatch(/^[A-Z].*\.$/);}for(const first of [true,false]){const values={...calculate('1991-12-09').values,[id]:number} as ReturnType<typeof calculate>['values'];const text=positionNarrative(values,id,positionById[id].domain,first,new Set()).join(' ');expect(text.match(artifacts)?.[0]).toBeUndefined();}}
 });
 it('checks all 22 dynamically substituted themes in every supported section, including repeated roles',()=>{
  const base=calculate('1991-12-09').values;
  for(let number=1;number<=22;number++){
   const same=Object.fromEntries(Object.keys(base).map(id=>[id,number])) as typeof base;
   for(const section of ['core','talents','relationships','resources','parenting','ancestry','learning','purpose','integration'])for(const block of sectionSynthesis(same,section)){
    expect(block.text).not.toMatch(artifacts);
    for(const line of block.text.match(/[^.!?]+[.!?]/g)??[]){const phrase=applicationCues[number].pressure;expect(line.toLowerCase().split(phrase.toLowerCase()).length-1).toBeLessThanOrEqual(1);}
   }
   const paragraph=positionNarrative({...base,month_mid:number as ArcanaNumber},'month_mid','talent',false,new Set()).join(' ');expect(paragraph).not.toMatch(artifacts);
  }
 });
 it('writes a compact human review audit only when requested',()=>{
  if(process.env.DESTINY_CODE_WRITE_GRAMMAR_AUDIT==='1')writeFileSync('/private/tmp/dc-grammar-after.json',JSON.stringify(approved.map(f=>{const r=composeCandidate(f.date);return {date:f.date,beforeWords:f.words,words:r.wordCount,hash:r.semanticContentHash,sourceDataHash:r.sourceDataHash,sections:r.sections};}),null,2));
 });
});
