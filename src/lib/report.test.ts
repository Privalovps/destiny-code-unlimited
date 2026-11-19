import { describe, expect, it } from 'vitest';
import { countReadingWords, generateReport } from './report';
import { longformInterpretations, longformFor } from './longform-interpretations';
import { positionEssays } from './position-essays';
import { editorialKey } from './editorial-context';
import { interpretation } from './interpretations';
import { premiumInterpretations, premiumInterpretation } from './premium-interpretations';
import { isLocalReportPreview } from './preview';
import { archetypeDepth, depthFor } from './archetype-depth';
import { professionalArcanum } from './professional-arcana';
import { positionReading } from './position-reading';
const today = new Date('2026-11-17T12:00:00Z');
describe('full reading',()=>{
  it('preserves the fixture and produces all eight source-labeled sections',()=>{
    const report=generateReport('1993-04-17',today);
    expect(report.matrix).toEqual({A:17,B:4,C:22,D:7,E:5,NW:21,NE:8,SE:11,SW:6});
    expect(report.positions).toHaveLength(9);
    expect(report.sections.map(s=>s.title)).toEqual(['Your Numerology Blueprint','Core Personality & Inner World','Strengths & Hidden Talents','Love & Relationships','Money & Career Themes','Challenges & Personal Growth','Detailed Matrix Position Analysis','Personal Reflection & Integration']);
    for(const section of report.sections) for(const block of section.blocks){
      expect(section.positions).toContain(block.position);
      expect(block.number).toBe(report.matrix[block.position]);
      expect(block.title).toBe(interpretation(block.number).name);
      expect(block.paragraphs.length+block.references.length).toBeGreaterThan(0);
    }
    expect(report.sections[1].positions).toEqual(['E','B','D']);
    expect(report.sections[2].positions).toEqual(['A','NW','NE']);
    expect(report.sections[3].positions).toEqual(['SW','NE','E']);
    expect(report.sections[4].positions).toEqual(['C','SE','D']);
    expect(report.sections[5].positions).toEqual(['B','D','E']);
    expect(report.sections[0].positions).toHaveLength(9);
    expect(report.sections[6].positions).toHaveLength(9);
    expect(report.core).toEqual(interpretation(report.matrix.E));
  });
  it('is deterministic and changes domain text when its source changes',()=>{
    const a=generateReport('1993-04-17',today),b=generateReport('1992-05-18',today);
    expect(a).toEqual(generateReport('1993-04-17',today));
    expect(a.sections[1].blocks[0].paragraphs).not.toEqual(b.sections[1].blocks[0].paragraphs);
    expect(a.sections[3].blocks[0].paragraphs).not.toEqual(b.sections[3].blocks[0].paragraphs);
    expect(a.sections[1].blocks[0].paragraphs).toContain(professionalArcanum(5).personality);
  });
  it('keeps each chapter substantial, with a practice and evidence-based questions',()=>{
    const report=generateReport('1993-04-17',today);
    expect(new Set(report.sections.map(s=>s.id)).size).toBe(8);
    for(const section of report.sections){
      const text=[section.introduction,section.detail,section.practice,...section.questions,...section.blocks.flatMap(b=>b.paragraphs)].join(' ');
      expect(text.split(/\s+/).length).toBeGreaterThan(250);
      expect(section.practice.length).toBeGreaterThan(120);
    }
    expect(report.conclusion).toContain(interpretation(report.matrix.E).prompt);
    expect(report.motifs.flatMap(m=>m.positions).sort()).toEqual(Object.keys(report.matrix).sort());
    expect(report.readingMinutes).toBeGreaterThan(8);
  });
  it('counts body prose once and does not repeat complete paragraphs to inflate length',()=>{
    const report=generateReport('1993-04-17',today);
    expect(report.wordCount).toBeGreaterThanOrEqual(6000);
    expect(report.wordCount).toBeLessThanOrEqual(9000);
    expect(report.wordCount).toBe(countReadingWords(report.sections,report.conclusion));
    const paragraphs=report.sections.flatMap(s=>s.blocks.flatMap(b=>b.paragraphs));
    expect(new Set(paragraphs).size).toBe(paragraphs.length);
    for(const section of report.sections) for(const block of section.blocks) for(const ref of block.references) expect(report.sections.some(s=>s.id===ref.id)).toBe(true);
    expect(report.positions.find(p=>p.key==='C')?.proof).toContain('1 + 9 + 9 + 3 = 22');
  });
  it.each(['1993-04-17','0001-01-01','2000-02-29','1992-05-18'])('edits repetition and self-references for %s',date=>{
    const report=generateReport(date,today);
    const questions=report.sections.flatMap(s=>s.questions.map(editorialKey));
    expect(new Set(questions).size).toBe(questions.length);
    const practices=report.sections.map(s=>editorialKey(s.practice));
    expect(new Set(practices).size).toBe(practices.length);
    for(const section of report.sections) for(const block of section.blocks){
      expect(block.paragraphs.length).toBeGreaterThan(0);
      expect(block.references.every(reference=>reference.id!==section.id)).toBe(true);
    }
    // Exact instructions must not be reinserted beneath different source labels.
    const practiceText=report.sections.map(s=>s.practice).join(' ');
    for(const row of premiumInterpretations) expect(practiceText.split(row.experiment).length-1).toBeLessThanOrEqual(1);
  });
  it('has four distinct long-form domains for each original arcana and nine positional essays',()=>{
    expect(longformInterpretations).toHaveLength(22);
    expect(new Set(longformInterpretations.flatMap(row=>Object.values(row))).size).toBe(88);
    for(let n=1;n<=22;n++) for(const passage of Object.values(longformFor(n))) expect(passage.split(/\s+/).length).toBeGreaterThan(65);
    expect(Object.keys(positionEssays).sort()).toEqual(['A','B','C','D','E','NE','NW','SE','SW']);
    for(const invalid of [0,23,NaN,Infinity]) expect(()=>longformFor(invalid)).toThrow();
  });
  it('provides distinct constructive and challenging writing for all 22 arcana',()=>{
    expect(archetypeDepth).toHaveLength(22);
    expect(new Set(archetypeDepth.flatMap(a=>[a.strength,a.tension])).size).toBe(44);
    for(let n=1;n<=22;n++) {
      expect(depthFor(n).strength.length).toBeGreaterThan(200);
      expect(depthFor(n).tension.length).toBeGreaterThan(150);
    }
    for(const invalid of [0,23,1.5,NaN,Infinity]) expect(()=>depthFor(invalid)).toThrow();
  });
  it('keeps public chart commentary aligned with each documented position',()=>{
    const report=generateReport('1993-04-17',today);
    for(const p of report.positions){
      const detail=positionReading(report.matrix,p.key);
      expect(detail.number).toBe(p.number);
      expect(detail.calculation).toContain(p.formula);
      expect(detail.reflection).toContain(interpretation(p.number).prompt);
    }
    expect(positionReading(report.matrix,'E').inputs).toBe('17 + 4 + 22 + 7');
  });
  it('has six distinct substantial original extensions for all 22 symbols',()=>{
    expect(premiumInterpretations).toHaveLength(22);
    const all = premiumInterpretations.flatMap(entry=>Object.values(entry));
    expect(new Set(all).size).toBe(22*6);
    premiumInterpretations.forEach(entry=>{
      for(const field of ['talent','relationships','money','growth','life'] as const) expect(entry[field].length).toBeGreaterThan(170);
      expect(entry.experiment.length).toBeGreaterThan(70);
    });
    expect(()=>premiumInterpretation(0)).toThrow();
    expect(()=>premiumInterpretation(23)).toThrow();
  });
  it.each(['2024-02-30','1900-02-29','0000-01-01','2026-11-18','1993-4-17','not-a-date'])('rejects invalid input %s',date=>expect(()=>generateReport(date,today)).toThrow());
  it.each(['0001-01-01','2000-02-29','2026-11-17'])('supports boundary date %s',date=>expect(generateReport(date,today).positions).toHaveLength(9));
});
describe('local preview gate',()=>{
  it('requires development AND an explicit server flag',()=>{
    expect(isLocalReportPreview({NODE_ENV:'development',DESTINY_CODE_LOCAL_PREVIEW:'1'})).toBe(true);
    for(const NODE_ENV of ['production','test',undefined]) expect(isLocalReportPreview({NODE_ENV,DESTINY_CODE_LOCAL_PREVIEW:'1'})).toBe(false);
    for(const flag of [undefined,'0','true']) expect(isLocalReportPreview({NODE_ENV:'development',DESTINY_CODE_LOCAL_PREVIEW:flag})).toBe(false);
  });
});
