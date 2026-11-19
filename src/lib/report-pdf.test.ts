import { describe, expect, it } from 'vitest';
import { generateReport } from './report';
import { generateReportPdf, pdfText, textWidth, wrapPdfText } from './report-pdf';
const today=new Date('2026-11-17T12:00:00Z');
describe('PDF cover frame clearance',()=>{
  it.each([
    {edition:'light' as const,long:false},
    {edition:'dark' as const,long:false},
    {edition:'light' as const,long:true},
    {edition:'dark' as const,long:true},
  ])('keeps $edition cover text inside the frame (long=$long)',({edition,long})=>{
    const report=generateReport('1993-04-17',today);
    if(long){
      report.core={...report.core,name:'The Hierophant: Wisdom, Tradition, and the Questions We Choose to Carry'};
      report.version="Collector's editorial reading / Extended personal edition / Volume one";
    }
    const pdf=Buffer.from(generateReportPdf(report,edition)).toString('ascii');
    const cover=pdf.match(/stream\n([\s\S]*?)\nendstream/)![1];
    const rails=[...cover.matchAll(/([\d.]+) ([\d.]+) m ([\d.]+) ([\d.]+) l S/g)]
      .filter(m=>m[1]===m[3]&&Math.abs(Number(m[2])-Number(m[4]))>500)
      .map(m=>Number(m[1])).sort((a,b)=>a-b);
    expect(rails).toHaveLength(2);
    expect(rails[0]+rails[1]).toBeCloseTo(595.28,2);
    const text=[...cover.matchAll(/BT \/(F[12]) ([\d.]+) Tf [^\n]*?1 0 0 1 ([\d.]+) ([\d.]+) Tm \(((?:\\.|[^\\)])*)\) Tj ET/g)];
    expect(text.length).toBeGreaterThan(10);
    for(const line of text){
      const x=Number(line[3]),size=Number(line[2]);
      const value=line[5].replace(/\\([\\()])/g,'$1');
      expect(x-rails[0]).toBeGreaterThanOrEqual(19.99);
      expect(rails[1]-(x+textWidth(value,size))).toBeGreaterThanOrEqual(19.99);
    }
  });
});
function inspect(bytes:Uint8Array) {
  const pdf=Buffer.from(bytes).toString('ascii');
  expect(pdf.startsWith('%PDF-1.4')).toBe(true);
  const xref=Number(pdf.match(/startxref\n(\d+)/)![1]);
  expect(pdf.slice(xref,xref+4)).toBe('xref');
  const offsets=[...pdf.slice(xref).matchAll(/(\d{10}) 00000 n/g)].map(x=>Number(x[1]));
  offsets.forEach((offset,i)=>expect(pdf.slice(offset,offset+`${i+1} 0 obj`.length)).toBe(`${i+1} 0 obj`));
  for(const match of pdf.matchAll(/\/Length (\d+) >>\nstream\n([\s\S]*?)\nendstream/g)) expect(Buffer.byteLength(match[2],'ascii')).toBe(Number(match[1]));
  const count=Number(pdf.match(/\/Type \/Pages \/Count (\d+)/)![1]);
  expect([...pdf.matchAll(/\/Type \/Page /g)]).toHaveLength(count);
  expect(count).toBeGreaterThanOrEqual(10);
  expect(pdf).toContain(`(${count} / ${count}) Tj`);
  expect(pdf).not.toMatch(/\/CreationDate|\/ModDate|\/ID/);
  return {pdf,count};
}
describe('deterministic complete PDF',()=>{
  it.each(['1993-04-17','2000-02-29','0001-01-01','2026-11-17'])('exports actual data and all text for %s',date=>{
    const report=generateReport(date,today),bytes=generateReportPdf(report);
    expect(bytes).toEqual(generateReportPdf(report));
    const {pdf}=inspect(bytes);
    expect(pdf).toContain(date);
    expect(pdf).toContain('LOCAL DEVELOPMENT PREVIEW');
    const escape=(text:string)=>pdfText(text).replace(/([\\()])/g,'\\$1');
    const textLines=[...pdf.matchAll(/\((.*)\) Tj ET/g)].map(x=>x[1]).filter(line=>line!=='DESTINY CODE / LOCAL DEVELOPMENT PREVIEW' && !line.includes('SYMBOLIC SELF-REFLECTION') && !/^\d+ \/ \d+$/.test(line)).join(' ');
    for(const section of report.sections){
      expect(textLines).toContain(section.title);
      for(const block of section.blocks) {
        expect(textLines).toContain(escape(`${block.position} / ${block.number} / ${block.title}`));
        expect(textLines).toContain(escape(block.heading));
        for(const paragraph of block.paragraphs) expect(textLines).toContain(escape(paragraph));
      }
      expect(textLines).toContain(escape(section.detail));
      expect(textLines).toContain(escape(section.practice));
      for(const question of section.questions) expect(textLines).toContain(escape(question));
    }
    expect(textLines).toContain(escape(report.conclusion));
    expect(textLines).toContain('Your position reference');
    expect(textLines).toContain(report.core.name);
    for(const command of pdf.matchAll(/1 0 0 1 ([\d.]+) ([\d.]+) Tm/g)) {
      expect(Number(command[1])).toBeGreaterThan(20);
      expect(Number(command[2])).toBeGreaterThan(20);
      expect(Number(command[2])).toBeLessThan(842);
    }
  });
  it('produces an editorial-length sample PDF without abbreviating its data',()=>{
    const report=generateReport('1993-04-17',today);
    const {count}=inspect(generateReportPdf(report));
    expect(count).toBeGreaterThanOrEqual(15);
    expect(count).toBeLessThanOrEqual(40);
    expect(report.sections.find(s=>s.id==='life-themes')?.blocks).toHaveLength(9);
  });
  it('paginates long content without dropping the final paragraph',()=>{
    const report=generateReport('1993-04-17',today);
    const base=inspect(generateReportPdf(report)).count;
    report.sections[0].blocks[0].paragraphs.push(('A deliberately extended reading paragraph for pagination. ').repeat(350),'END OF EXTENDED CONTENT');
    const {pdf,count}=inspect(generateReportPdf(report));
    expect(count).toBeGreaterThan(base);
    expect(pdf).toContain('END OF EXTENDED CONTENT');
    const lines=wrapPdfText('W'.repeat(500),480,11);
    expect(lines.join('')).toBe('W'.repeat(500));
    lines.forEach(line=>expect(textWidth(line,11)).toBeLessThanOrEqual(480));
  });
});
