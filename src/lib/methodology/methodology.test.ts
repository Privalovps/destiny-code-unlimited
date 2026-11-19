import { describe,expect,it } from 'vitest';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { calculate,parseDateOnly,reduce22 } from './calculate';
import { arcanaData,positionData,channelData,rules,genericPrograms,patternData,sectionData,SOURCE_DATA_HASH,sourceData } from './data';
import { validateSchema } from './schema';
import { candidateSample,composeCandidate,exactTail,publication,repeatedPrimary } from './report';
import { freeReading } from './public';
import { pdfReadingDocument } from './pdf';
import { webReadingDocument } from '@/components/candidate-reading';
import cases from '../../../DESTINY_CODE_METHODOLOGY/data/test_cases.json';
import invalid from '../../../DESTINY_CODE_METHODOLOGY/data/invalid_dates.json';
import examples from '../../../DESTINY_CODE_METHODOLOGY/data/source_example_assertions.json';
import fixtureSchema from '../../../DESTINY_CODE_METHODOLOGY/schemas/test_cases.schema.json';
import manifest from '../../../DESTINY_CODE_METHODOLOGY/data/package_manifest.json';
import type { CalculationProfile,NodeId } from './types';
const root=new URL('../../../DESTINY_CODE_METHODOLOGY/',import.meta.url);
describe('package and schema integrity',()=>{
 it('preserves every supplied research file checksum',()=>{for(const entry of manifest.files){const bytes=readFileSync(new URL(entry.path,root));expect(bytes.length).toBe(entry.bytes);expect(createHash('sha256').update(bytes).digest('hex')).toBe(entry.sha256);}});
 it('validates all seven supplied schemas and rejects corrupted required data',()=>{
  for(const name of ['arcana','positions','calculation_rules','combination_rules','karmic_patterns','report_sections','test_cases']){
   const schema=JSON.parse(readFileSync(new URL(`schemas/${name}.schema.json`,root),'utf8')),value=JSON.parse(readFileSync(new URL(`data/${name}.json`,root),'utf8'));expect(()=>validateSchema(value,schema)).not.toThrow();
  }
  expect(()=>validateSchema({},fixtureSchema)).toThrow();expect(()=>validateSchema([1,1],{type:'array',uniqueItems:true})).toThrow();expect(()=>validateSchema('x',{unknownKeyword:true})).toThrow();
 });
 it('has 38 formulas/roles, 30 diagram nodes, 22 correctly numbered archetypes and disabled generic programs',()=>{
  expect(rules).toHaveLength(38);expect(positionData).toHaveLength(38);expect(positionData.filter(p=>p.diagramCoordinates)).toHaveLength(30);expect(arcanaData.map(a=>a.number)).toEqual(Array.from({length:22},(_,i)=>i+1));expect(arcanaData[7].name).toBe('Justice');expect(arcanaData[10].name).toBe('Strength');expect(arcanaData[21].name).toBe('The Fool');expect(genericPrograms.every(p=>p.automaticMatchingEnabled===false)).toBe(true);
  for(const arcana of arcanaData)for(const p of positionData)expect(arcana.domainReadings[p.domain]).toBeTruthy();expect(SOURCE_DATA_HASH).toMatch(/^[a-f0-9]{64}$/);expect(sourceData).toHaveLength(3);
 });
 it('resolves approved duplicate channel orders without losing physical positions',()=>{
  expect(new Set(channelData.map(c=>c.id)).size).toBe(channelData.length);
  expect(channelData.find(c=>c.id==='money')?.interpretationOrder).toEqual(['year_inner','bridge','money_center']);expect(channelData.find(c=>c.id==='relationships')?.interpretationOrder).toEqual(['bottom_inner','bridge','love_center']);expect(channelData.find(c=>c.id==='earth_axis')?.interpretationOrder).toEqual(['day','year','earth']);expect(channelData.find(c=>c.id==='sky_axis')?.interpretationOrder).toEqual(['month','bottom','sky']);
 });
});
describe('complete mathematical parity',()=>{
 it('preserves 1–22 and rejects partial-sum reduction',()=>{for(let n=1;n<=22;n++)expect(reduce22(n)).toBe(n);expect(reduce22(23)).toBe(5);expect(reduce22(29)).toBe(11);expect(reduce22(999)).toBe(9);expect(reduce22(20+20+10)).toBe(5);expect(reduce22(reduce22(20+20)+10)).toBe(14);for(const n of [0,-1,1.5,NaN,Infinity])expect(()=>reduce22(n)).toThrow();});
 it.each(invalid)('rejects invalid Gregorian input %s',date=>expect(()=>parseDateOnly(date)).toThrow());
 it('rejects trailing-newline and whitespace date coercion',()=>{for(const date of ['1991-12-09\n','1991-12-09\r\n',' 1991-12-09','1991-12-09 '])expect(()=>parseDateOnly(date)).toThrow();});
 it('allows the pure year domain and rejects unknown profiles and dependencies',()=>{expect(parseDateOnly('0001-01-01').year).toBe(1);expect(parseDateOnly('9999-12-31').year).toBe(9999);expect(()=>calculate('1991-12-09','other' as CalculationProfile)).toThrow();expect(()=>calculate('1991-12-09','C-family-center-v1',[{...rules[0],inputs:['missing' as NodeId]}])).toThrow();});
 it.each(cases)('matches all 38 values and complete reference trace for $date',fixture=>{
  const result=calculate(fixture.date);expect(result.values).toEqual(fixture.values);expect(result.trace).toEqual(fixture.trace);expect(result).toEqual(calculate(fixture.date));const alternate=calculate(fixture.date,'AB-personal-center-v1');for(const [id,value] of Object.entries(fixture.expectedABAncestry))expect(alternate.values[id as NodeId]).toBe(value);
 });
 it.each(examples)('matches the manual source example $date / $profile',example=>{const result=calculate(example.date,example.profile as CalculationProfile);for(const [id,value] of Object.entries(example.expected))expect(result.values[id as NodeId]).toBe(value);});
 it('keeps family and personal centers separate',()=>{const c=calculate('1991-12-09'),ab=calculate('1991-12-09','AB-personal-center-v1');expect([c.values.core,c.values.family_center,c.values.nw_inner,c.values.nw_mid]).toEqual([10,11,5,8]);expect([ab.values.nw_inner,ab.values.nw_mid]).toEqual([4,7]);});
});
describe('interpretation, public boundaries and parity',()=>{
 it('matches only exact ordered tail keys',()=>{expect(patternData).toHaveLength(26);expect(new Set(patternData.map(p=>p.match.orderedValues.join('-'))).size).toBe(26);for(const values of [[18,9,9],[9,9,18],[9,18,9]])expect(exactTail(values)?.match.orderedValues).toEqual(values);expect(exactTail([5,15,20])?.id).toBe('TAIL-C-5-15-20');expect(exactTail([5,20,15])).toBeUndefined();});
 it.each(cases.slice(0,4))('creates a deterministic role-aware model and shared web/PDF plan for $date',fixture=>{
  const report=composeCandidate(fixture.date);expect(report).toEqual(composeCandidate(fixture.date));expect(report.sections.map(s=>s.id)).toEqual(sectionData.map(s=>s.id));expect(report.sections).toHaveLength(11);expect(report.sourceDataHash).toBe(SOURCE_DATA_HASH);
  const web=webReadingDocument(report);for(const edition of ['light','dark'] as const)expect(pdfReadingDocument(report,edition)).toEqual(web);expect(publication(report)).toEqual(web);
  const visible=JSON.stringify(web);expect(visible).not.toMatch(/reduce22|COM-[A-Z]|TAIL-C-|sourceRefs|editorial_synthesis|C-family-center|Priemykhova|Waite|sacred-texts|matrixdestiny|destiny22|pdfPages/);
  for(const section of report.sections)for(const block of section.blocks){expect(block.nodeIds.every(id=>id in report.values)).toBe(true);expect(block.formulaIds).toEqual(block.nodeIds);expect(block.provenance.classification).toBeTruthy();}
 });
 it('keeps recurrence bounded to distinct primary nodes and role differences substantive',()=>{const report=composeCandidate('1991-12-09');for(const [,ids] of repeatedPrimary(report.values)){expect(new Set(ids).size).toBe(ids.length);expect(ids).not.toContain('bridge');expect(ids).not.toContain('family_center');}expect(repeatedPrimary(report.values).length).toBeLessThanOrEqual(2);expect(composeCandidate('1987-01-23').sections).not.toEqual(report.sections);});
 it('exposes only the two allowed free statements and public numeric metadata',()=>{
  const free=freeReading('1991-12-09');expect(Object.keys(free).sort()).toEqual(['chart','preview']);expect(free.preview.positions.map(p=>p.id)).toEqual(['day','core']);expect(free.chart.nodes).toHaveLength(38);expect(free.chart.nodes.filter(n=>n.coordinates)).toHaveLength(30);expect(JSON.stringify(free)).not.toMatch(/domainReadings|reflectivePractice|shadowManifestations|sourceRefs|"sections"|"patterns"|COM-/);
  for(const p of free.preview.positions)expect(Object.keys(p).sort()).toEqual(['coreSymbolicMeaning','id','number']);
 });
 it('keeps proportional numeric targets non-overlapping at mobile and desktop widths',()=>{
  const css=readFileSync(new URL('../../components/expanded-matrix.module.css',import.meta.url),'utf8');expect(css).not.toMatch(/min-width:920px|overflow-x:auto/);const nodes=freeReading('1991-12-09').chart.nodes.filter(n=>n.coordinates);
  for(const width of [280,335,390,430,712,1180])for(let i=0;i<nodes.length;i++)for(const b of nodes.slice(i+1)){const a=nodes[i],dx=Math.abs(a.coordinates![0]-b.coordinates![0])*.42*width,dy=Math.abs(a.coordinates![1]-b.coordinates![1])*.42*width;const diameter=(id:string,primary:boolean)=>(id==='core'?80:primary?64:44)/920*width;const separation=(diameter(a.id,a.primary)+diameter(b.id,b.primary))/2;expect(dx>=separation||dy>=separation).toBe(true);}
 });
 it('uses one fixed source-verified sample, with the same versions and hash',()=>{const sample=candidateSample();expect(sample.dateOnly).toBe('1991-12-09');expect(sample).toEqual(composeCandidate('1991-12-09'));expect(sample.semanticContentHash).toMatch(/^[a-f0-9]{64}$/);});
});
