import { describe,it,expect } from 'vitest';
import { writeFileSync,readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import freeze from '../../../docs/CONTENT_FREEZE.json';
import { CONTENT_VERSION,FINAL_CONTENT_VERSION,composeCandidate,composeCandidateVersion,publication,candidateSample } from './report';
import { symbolicReadings } from './symbolic-reading';
import { symbolicReadings as frozenSymbols } from './history/editorial-v2/symbolic-reading';
import { symbolDepth } from './depth-library';
import { symbolDepth as frozenDepth } from './history/editorial-v2/depth-library';
import { roleDepth } from './depth';
import { roleDepth as frozenRoles } from './history/editorial-v2/depth';
import baseline from './fixtures/editorial-v2.json';
import { pdfReadingDocument } from './pdf';
import { webReadingDocument } from '@/components/candidate-reading';
import { freeReading } from './public';
import { narrativeCoverage } from './narrative-metrics';
const forbidden=/the constructive expression centers on|the shadow expression at|one possible setting is|from symbolism to experience|in the money reading of|in this context|Begin with (?:name|say|ask|check)|reduce22\(|sourceRefs|COM-[A-Z]|TAIL-C-|editorialRole|pdfPages/i;
describe('owner-review content freeze',()=>{
 it('pins the review candidate to its exact content files, without production approval',()=>{expect(freeze.contentVersion).toBe(FINAL_CONTENT_VERSION);expect(freeze.status).toBe('ready_for_product_owner_review');expect(freeze.productionApproved).toBe(false);for(const [path,hash] of Object.entries(freeze.files))expect(createHash('sha256').update(readFileSync(new URL(`../../../${path}`,import.meta.url))).digest('hex')).toBe(hash);expect(candidateSample().semanticContentHash).toBe(freeze.sampleSemanticHash);expect(candidateSample().sourceDataHash).toBe(freeze.sourceDataHash);});
 it('keeps all approved symbolic, constructive/shadow and role material unchanged',()=>{expect(symbolicReadings).toEqual(frozenSymbols);expect(symbolDepth).toEqual(frozenDepth);expect(roleDepth).toEqual(frozenRoles);expect(FINAL_CONTENT_VERSION).toBe('en-US-role-editorial-2.1.1');expect(CONTENT_VERSION).toBe(FINAL_CONTENT_VERSION);});
 it.each(baseline)('preserves the historical baseline and final content depth for $date',fixture=>{
  const old=composeCandidateVersion(fixture.date,'en-US-role-editorial-2.0.0'),report=composeCandidate(fixture.date);
  expect(old.semanticContentHash).toBe(fixture.semanticHash);expect(old.wordCount).toBe(fixture.words);expect(report.values).toEqual(old.values);expect(report.trace).toEqual(old.trace);expect(report).toEqual(composeCandidate(fixture.date));expect(report.sections.map(s=>s.id)).toEqual(old.sections.map(s=>s.id));expect(report.sections).toHaveLength(11);
  expect(report.sections.flatMap(s=>s.blocks.flatMap(b=>b.ruleIds))).toEqual(old.sections.flatMap(s=>s.blocks.flatMap(b=>b.ruleIds)));
  const text=JSON.stringify(publication(report));expect(text).not.toMatch(forbidden);for(const section of report.sections)for(const b of section.blocks)if(b.kind!=='calculation_table')expect(b.text.trim()).not.toBe('');
  const paragraphs=report.sections.flatMap(s=>s.blocks.map(b=>b.text.trim().toLowerCase())).filter(Boolean);expect(new Set(paragraphs).size).toBe(paragraphs.length);
  const currentPositions=report.sections.flatMap(s=>s.blocks.filter(b=>b.kind==='position').flatMap(b=>b.nodeIds));expect(currentPositions).toEqual(old.sections.flatMap(s=>s.blocks.filter(b=>b.kind==='position').flatMap(b=>b.nodeIds)));
  // An accidental abridgment guard, never a generation quota; substantive fragments are checked independently.
  expect(report.wordCount).toBeGreaterThan(fixture.words*.9);
  for(const edition of ['light','dark'] as const)expect(pdfReadingDocument(report,edition)).toEqual(webReadingDocument(report));
 });
 it('shares the fixed sample and paid generator without leaking the private editorial layer into free data',()=>{expect(candidateSample()).toEqual(composeCandidate('1991-12-09'));const free=JSON.stringify(freeReading('1991-12-09'));expect(free).not.toMatch(/constructive|symbolicReadings|sourceRefs|editorialRole|"sections"/);expect(freeReading('1991-12-09').preview.positions.every(p=>!p.coreSymbolicMeaning.endsWith('..'))).toBe(true);});
 it('exports five-date review metrics only on explicit audit request',()=>{
  if(process.env.DESTINY_CODE_WRITE_FINAL_AUDIT!=='1')return;
  writeFileSync('/private/tmp/dc-final-editorial-audit.json',JSON.stringify(baseline.map(fixture=>{const report=composeCandidate(fixture.date);return {date:fixture.date,beforeWords:fixture.words,words:report.wordCount,hash:report.semanticContentHash,coverage:narrativeCoverage(report),sections:report.sections};}),null,2));
 });
});
