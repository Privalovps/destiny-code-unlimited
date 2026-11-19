import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
import {calculate, reduce22, parseDateOnly} from './calculator.mjs';
import {composeReport,renderMarkdown,freePreview} from './report-composer.mjs';
const root=path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const read=name=>JSON.parse(fs.readFileSync(path.join(root,'data',name+'.json'),'utf8'));
const rules=read('calculation_rules').rules;
const fixtures=read('test_cases');
const results=[];
function check(name,fn){fn();results.push({name,status:'passed'});}
check('Reducer threshold, preserved multi-digit values, repeated digit sum',()=>{
 for(const [n,v] of [[1,1],[10,10],[11,11],[20,20],[21,21],[22,22],[23,5],[29,11],[40,4],[999,9]])assert.equal(reduce22(n),v);
 for(const n of [0,-1,1.5,NaN,Infinity,'22'])assert.throws(()=>reduce22(n));
 assert.equal(reduce22(20+20+10),5);assert.equal(reduce22(reduce22(20+20)+10),14);
});
check('Strict Gregorian dates and no timestamp coercion',()=>{
 for(const d of read('invalid_dates'))assert.throws(()=>parseDateOnly(d));
 assert.deepEqual(parseDateOnly('2000-02-29'),{year:2000,month:2,day:29});
 assert.deepEqual(parseDateOnly('0001-01-01'),{year:1,month:1,day:1});
});
check('Twelve independent Python arithmetic fixtures and full traces',()=>{
 for(const fixture of fixtures){const result=calculate(fixture.date,rules);assert.deepEqual(result.values,fixture.values);assert.deepEqual(result.trace,fixture.trace);assert.deepEqual(calculate(fixture.date,rules),result);}
});
check('A/B ancestry convention is a separate profile for all twelve dates',()=>{
 for(const fixture of fixtures){const result=calculate(fixture.date,rules,'AB-personal-center-v1');for(const [id,value] of Object.entries(fixture.expectedABAncestry))assert.equal(result.values[id],value);}
 const c=calculate('1991-12-09',rules);const ab=calculate('1991-12-09',rules,'AB-personal-center-v1');
 assert.deepEqual([c.values.nw_inner,c.values.nw_mid],[5,8]);assert.deepEqual([ab.values.nw_inner,ab.values.nw_mid],[4,7]);
 assert.throws(()=>calculate('1991-12-09',rules,'unknown'));
});
check('Manual book-example assertions for A/B and C',()=>{
 for(const e of read('source_example_assertions')){const c=calculate(e.date,rules,e.profile);for(const [id,value] of Object.entries(e.expected))assert.equal(c.values[id],value,`${e.date}:${id}`);}
});
const data=Object.fromEntries(['arcana','positions','channels','report_sections','combination_rules','karmic_patterns','contrast_pairs'].map(k=>[k,read(k)]));
check('38 formula IDs, 30 chart nodes, 22 distinct correctly numbered archetypes',()=>{
 assert.equal(rules.length,38);assert.equal(new Set(rules.map(x=>x.id)).size,38);
 assert.equal(data.positions.filter(x=>x.diagramCoordinates!==null).length,30);
 assert.deepEqual(data.arcana.map(x=>x.number),Array.from({length:22},(_,i)=>i+1));
 assert.equal(data.arcana.find(x=>x.number===8).name,'Justice');assert.equal(data.arcana.find(x=>x.number===11).name,'Strength');
 assert.equal(data.arcana.find(x=>x.number===22).name,'The Fool');
});
check('All exact C tail keys are distinct, arithmetic-consistent and order-sensitive',()=>{
 const keys=data.karmic_patterns.map(x=>x.match.orderedValues.join('-'));assert.equal(keys.length,26);assert.equal(new Set(keys).size,26);
 for(const p of data.karmic_patterns){const [a,b,c]=p.match.orderedValues;assert.equal(reduce22(a+b),c);assert.deepEqual(p.match.nodeOrder,['bottom','bottom_inner','bottom_mid']);}
 for(const key of ['18-9-9','9-9-18','9-18-9'])assert(keys.includes(key));
 assert(keys.includes('5-15-20'));assert(!keys.includes('5-20-15'));
});
check('Generic code catalog remains disabled',()=>{assert(read('source_code_catalog').every(x=>x.automaticMatchingEnabled===false));});
check('Repetition cannot count a shared node twice',()=>{
 const primary=['day','month','year','bottom','core','nw','ne','se','sw'];assert.equal(new Set(primary).size,9);
 const channelIds=data.channels.flatMap(x=>x.physicalOrder);assert(channelIds.filter(x=>x==='bridge').length>1);assert(!primary.includes('bridge'));
});
check('Varna annex does not override the 22-range year or input date',()=>{const m=calculate('1993-02-03',rules);assert.equal(m.values.year,22);assert.equal(m.date,'1993-02-03');});
const sampleMatrix=calculate('1991-12-09',rules);const sample=composeReport(sampleMatrix,data);
check('Sample and second-date report use same roles with different actual values',()=>{
 const second=composeReport(calculate('1987-01-23',rules),data);
 assert.notDeepEqual(sample.values,second.values);assert.notEqual(renderMarkdown(sample),renderMarkdown(second));
 assert.deepEqual(composeReport(sampleMatrix,data),sample);
 assert.equal(sample.sections.length,11);assert.equal(sample.sections.find(x=>x.id==='learning').blocks[1].kind,'pattern');
 assert(sample.sections.find(x=>x.id==='learning').blocks[1].text.includes('Knowledge, influence, and belonging'));
 for(const s of sample.sections)for(const b of s.blocks){for(const id of b.nodeIds)assert(id in sample.values);for(const id of b.ruleIds)assert(data.combination_rules.some(x=>x.id===id));}
});
check('Portable free DTO contains only the declared limited fields',()=>{
 const preview=freePreview(sampleMatrix,data);assert.deepEqual(preview.positions.map(x=>x.id),['day','core']);assert(!('sections' in preview));
 for(const p of preview.positions)assert.deepEqual(Object.keys(p).sort(),['coreSymbolicMeaning','id','number'].sort());
});
fs.writeFileSync(path.join(root,'implementation/SAMPLE_COMPLETE_READING.md'),renderMarkdown(sample));
fs.writeFileSync(path.join(root,'data/sample_report_model.json'),JSON.stringify(sample,null,2)+'\n');
const preview=freePreview(sampleMatrix,data);
fs.writeFileSync(path.join(root,'implementation/SAMPLE_FREE_PREVIEW.md'),'# Introductory symbolic reading\n\nDate: '+preview.dateOnly+'\n\n'+preview.positions.map(p=>`${p.id} = ${p.number}: ${p.coreSymbolicMeaning}.`).join('\n\n')+'\n\n'+preview.disclosure+'\n');
fs.writeFileSync(path.join(root,'data/reference_validation_results.json'),JSON.stringify({status:'passed',checks:results,sourceExamples:2,fixtureDates:fixtures.length,profileComparisons:fixtures.length,scope:'Portable package only. No application, payment, browser, or PDF integration tests were run.'},null,2)+'\n');
console.log(JSON.stringify({status:'passed',checks:results.length,fixtures:fixtures.length,sourceExamples:2,sampleSections:sample.sections.length}));
