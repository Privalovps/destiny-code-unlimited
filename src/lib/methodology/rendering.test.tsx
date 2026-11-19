import { describe,expect,it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { candidateSample,publication } from './report';
import { CandidateReading } from '@/components/candidate-reading';
const plain=(html:string)=>html.replace(/<[^>]*>/g,' ').replace(/&#x27;/g,"'").replace(/&quot;/g,'"').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
describe('lightweight static server-component rendering (no HTTP server or browser)',()=>{
 it('renders the fixed sample paragraphs, details and calculation rows in document order',()=>{
  const report=candidateSample(),html=renderToStaticMarkup(<CandidateReading report={report} sample/>),text=plain(html);
  expect(html).toContain('Download Light sample');expect(html).toContain('Download Dark sample');expect(html).toContain(report.semanticContentHash);
  let cursor=0;for(const section of publication(report).sections)for(const block of section.blocks){if(block.text){const index=text.indexOf(block.text,cursor);expect(index,block.heading||section.title).toBeGreaterThanOrEqual(cursor);cursor=index+block.text.length;}if(block.detail){const index=text.indexOf(block.detail,cursor);expect(index).toBeGreaterThanOrEqual(cursor);cursor=index+block.detail.length;}for(const row of block.rows){expect(text).toContain(row.label);expect(text).toContain(row.calculation);}}
  expect(text).not.toMatch(/reduce22|sourceRefs|COM-[A-Z]|TAIL-C-|Waite|Priemykhova|matrixdestiny|destiny22/);
 });
});
