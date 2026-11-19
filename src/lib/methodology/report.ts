import 'server-only';
import { calculate,humanCalculation } from './calculate';
import { arcanum,positionById,positionData,sectionData,channelData,patternData,contrastData,SOURCE_DATA_HASH,digest,policy } from './data';
import type { NodeId,Domain,Provenance,ReportBlock,MatrixResult } from './types';
import { positionNarrative,sectionSynthesis } from './depth';
import { narrativeWordCount } from './narrative-metrics';
import { composeCandidate as composePrevious } from './report-v1';
import { composeCandidateVersion as composeBaseline } from './history/editorial-v2/report';
import { composeCandidateVersion as composeApproved } from './history/editorial-v2-1/report';
import { applicationTitles } from './literary-frames';
export const FINAL_CONTENT_VERSION='en-US-role-editorial-2.1.1';
export type ContentVersion='en-US-role-editorial-1.0.0'|'en-US-role-editorial-2.0.0'|'en-US-role-editorial-2.1.0'|typeof FINAL_CONTENT_VERSION;
export const CONTENT_VERSION:ContentVersion=process.env.DESTINY_CODE_CONTENT_VERSION==='en-US-role-editorial-1.0.0'?'en-US-role-editorial-1.0.0':process.env.DESTINY_CODE_CONTENT_VERSION==='en-US-role-editorial-2.0.0'?'en-US-role-editorial-2.0.0':process.env.DESTINY_CODE_CONTENT_VERSION==='en-US-role-editorial-2.1.0'?'en-US-role-editorial-2.1.0':FINAL_CONTENT_VERSION;
export const REPORT_SCHEMA_VERSION='1.0.0';
export const CANDIDATE_SAMPLE_DATE=policy.sample.date;
export const primaryIds:readonly NodeId[]=['day','month','year','bottom','core','nw','ne','se','sw'];
export type CalculationRow={label:string;number:number;archetype:string;calculation:string};
export type ContentBlock=ReportBlock & {heading?:string;detail?:string;rows?:CalculationRow[];editorialRole?:'interpretation'|'application'|'practice'};
export type CandidateSection={id:string;title:string;blocks:ContentBlock[]};
export type CandidateReport={dateOnly:string;methodologyVersion:string;calculationProfile:'C-family-center-v1';contentVersion:string;reportSchemaVersion:string;sourceDataHash:string;locale:'en-US';values:MatrixResult['values'];trace:MatrixResult['trace'];sections:CandidateSection[];semanticContentHash:string;wordCount:number};
const editorial:Provenance={classification:'editorial_synthesis',sourceRefs:[],editorialNote:'Original role-specific English composition from the supplied research package.'};
export function exactTail(values:readonly number[]){return patternData.find(p=>p.match.orderedValues.length===values.length&&p.match.orderedValues.every((value,i)=>value===values[i]));}
export function repeatedPrimary(values:MatrixResult['values']){const groups=new Map<number,NodeId[]>();for(const id of primaryIds){const value=values[id];groups.set(value,[...(groups.get(value)??[]),id]);}return [...groups].filter(([,ids])=>ids.length>1).slice(0,2);}
function composeExpanded(dateOnly:string):CandidateReport{
 const matrix=calculate(dateOnly),values=matrix.values,a=(id:NodeId)=>arcanum(values[id]),p=(id:NodeId)=>positionById[id];
 const seenSymbols=new Set<number>(),usedPositionProse=new Set<string>();
 let applications:ContentBlock[]=[];
 const proof=(id:NodeId)=>{const step=matrix.trace.find(t=>t.formulaId===id)!;if(step.reductionSteps.length<2)return humanCalculation(step,dateOnly);const operands=id==='year'?[...dateOnly.slice(0,4)].join(' + '):step.operands.join(' + ');const chain=step.reductionSteps.slice(0,-1).map((value,i)=>`${value} → ${[...String(value)].join(' + ')} = ${step.reductionSteps[i+1]}`).join(' → ');return `${operands} = ${chain}`;};
 const heading=(id:NodeId)=>`${p(id).displayName} · ${values[id]} / ${a(id).name}`;
 const block=(text:string,nodeIds:NodeId[]=[],ruleIds:string[]=[],kind:ContentBlock['kind']='paragraph',title?:string):ContentBlock=>({kind,text,nodeIds,formulaIds:nodeIds,ruleIds,heading:title,editorialRole:kind==='practice'?'practice':'interpretation',provenance:{...editorial,sourceRefs:[...new Map(nodeIds.flatMap(id=>[...p(id).provenance.sourceRefs,...a(id).sourceRefs]).map(ref=>[JSON.stringify(ref),ref])).values()]}});
 function reading(id:NodeId,domain:Domain=p(id).domain){
  const first=!seenSymbols.has(values[id]);seenSymbols.add(values[id]);
  const paragraphs=positionNarrative(values,id,domain,first,usedPositionProse);
  for(const text of paragraphs.slice(3))if(text)applications.push({...block(text,[id],[],'paragraph',`${id==='day'&&domain==='family'?'Care within the family':applicationTitles[id]} · ${a(id).name}`),editorialRole:'application'});
  return paragraphs.slice(0,3).filter(Boolean).map((text,index)=>block(text,[id],[],'position',index===0?heading(id):undefined));
 }
 const introductions:Record<string,string>={
  orientation:'An archetype is one of 22 symbolic themes. A position gives that theme a particular role, and a channel connects a defined sequence of positions. Constructive and shadow expressions are possibilities to consider, not states diagnosed from a birthday. Start with the central theme, then follow the chapters that connect most clearly with a real situation.',
  core:`Your center is ${values.core}, ${a('core').name}: ${a('core').coreSymbolicMeaning}. Your birth-day portrait is ${values.day}, ${a('day').name}. The center organizes the reading; the portrait concerns outward expression. Read these as two perspectives on the same situation rather than competing descriptions of who you must be.`,
  talents:'The top arm distinguishes inspiration, self-expression and skills developed through practice. An idea can be inspiring before you know how to communicate it; a practiced skill can also need a new audience or form. Keep these three roles distinct as you consider the symbols below.',
  relationships:'The relationship channel brings together a learning theme, a shared relationship–resource bridge and qualities valued in reciprocal partnership. It concerns communication and choices within a relationship, not the identity or feelings of a future partner. A useful interpretation makes an agreement clearer while preserving each person’s freedom to choose.',
  resources:'The right arm concerns material learning and habits. The money-channel midpoint adds possible work settings, while the shared bridge connects resource commitments with relationship commitments. Separate the way a resource is used from the activity it may support; neither is a prediction of income or professional success.',
  parenting:'This arm offers a way to reflect on care, independence and family communication. Use the theme where it fits an actual relationship of care, without assuming a particular childhood or that you have children. The daily-life desire point adds a separate question about what makes ordinary life feel meaningful.',
  ancestry:'Four branches distinguish upper and lower paternal themes from upper and lower maternal themes. The family-resource aggregate combines the four outer corners and remains separate from your personal center. These are symbolic roles for reflecting on inherited stories and current choices; they do not establish facts about relatives, genes or past events.',
  learning:'The karmic learning pattern is a traditional name for a three-part symbolic lesson. Here it is read as a present-life reflection, not an accusation about a past life. Its sequence matters: the main learning point comes first, followed by the inner point and then the middle point.',
  purpose:'Purpose describes a symbolic direction for development and contribution, not an assigned occupation or required life timetable. Personal purpose combines the Earth and Sky aggregates; social purpose combines the paternal and maternal aggregates; spiritual purpose integrates the personal and social results. The two desire points remain distinct perspectives on what feels meaningful.',
  integration:'Choose a practice that belongs to a theme actually present in your chart. Keep the attempt small enough to review, record what happened and allow the result to qualify the interpretation. A reading becomes more useful when its language helps you describe a specific choice rather than a permanent identity.',
  reference:'This reference uses the same values as the chapters and diagram. Add each calculation’s complete set of inputs, then add decimal digits only when the result is above 22. A named intermediate total is reduced before it enters the next calculation. The family-resource aggregate and purpose totals are separate from the 30 diagram nodes.',
 };
 const sections=sectionData.map(spec=>{
  const blocks:ContentBlock[]=[block(introductions[spec.id])];applications=[];
  if(spec.id==='orientation')blocks.push(block('The diagram contains 30 positions. Eight further values summarize family resources, line relationships and purpose. A repeated number keeps the same archetype while its position changes the question. Because the values are calculated from related inputs, repetition is not independent confirmation or a measure of personal power.'));
  else if(spec.id==='ancestry'){
   blocks.push(...reading('family_center'));
   for(const corner of ['nw','ne','se','sw'] as const){const channel=channelData.find(c=>c.id===`${corner}_family`)!;for(const id of channel.interpretationOrder)blocks.push(...reading(id,'family'));}
  }else if(spec.id==='learning'){
   const ids:NodeId[]=['bottom','bottom_inner','bottom_mid'],key=ids.map(id=>values[id]),pattern=exactTail(key);
   blocks.push(block(`Your learning sequence is ${key.join(' → ')}. Its themes are ${ids.map(id=>a(id).coreSymbolicMeaning).join(' → ')}.`,ids,['COM-TAIL-C']));
   if(pattern){const item=block(pattern.symbolicReading,ids,['COM-TAIL-C'],'pattern',pattern.title);item.provenance={...pattern.provenance};blocks.push(item,block(pattern.practice,ids,['COM-TAIL-C'],'practice','A practice for this pattern'));}
   else blocks.push(block(`This sequence has no exact named match in the current pattern catalog. The general reading therefore begins with ${a('bottom').coreSymbolicMeaning}. ${a('bottom').personalDevelopment}`,['bottom'],['COM-TAIL-C'],'pattern','Your general learning theme'));
   blocks.push(...reading('bottom'),...reading('bottom_inner'),...reading('bottom_mid'));
  }else if(spec.id==='integration'){
   const practiced=new Set<number>();for(const id of ['core','money_center','love_center'] as const){if(practiced.has(values[id]))continue;practiced.add(values[id]);blocks.push(block(a(id).reflectivePractice,[id],[],'practice',heading(id)));}
   blocks.push(block('After one attempt, record the action, the response and one detail you did not expect. Decide what to keep, revise or leave aside. A result that does not fit the interpretation is useful information too.'));
  }else if(spec.id==='reference'){
   const item=block('',positionData.map(p=>p.id),[],'calculation_table','All calculated values');item.rows=positionData.map(position=>({label:position.displayName,number:values[position.id],archetype:a(position.id).name,calculation:proof(position.id)}));blocks.push(item);
  }else{
   let ids=spec.positionIds;
   if(spec.id==='relationships')ids=channelData.find(c=>c.id==='relationships')!.interpretationOrder;
   if(spec.id==='purpose')ids=['earth','sky','purpose_personal','paternal','maternal','purpose_social','purpose_spiritual','heart_sky'];
   if(spec.id==='talents')ids=channelData.find(c=>c.id==='month_triad')!.interpretationOrder;
   for(const id of ids){
    if(id==='bridge'&&spec.id==='resources'){blocks.push(block(`The shared bridge is ${values.bridge}, ${a('bridge').name}. Return to its relationship reading when discussing work time, spending or shared responsibilities: the symbol is the same shared point, not a second financial indicator.`,['bridge'],['COM-BALANCE']));continue;}
    const item=reading(id,spec.id==='relationships'&&id==='bottom_inner'?'relationship':spec.id==='parenting'&&id==='day'?'family':undefined);blocks.push(...item);
   }
   if(spec.id==='talents')blocks.push(block(`An experiment could combine ${a('month_inner').strengthsAndTalents.replace(/\.$/,'').toLowerCase()} with the ${a('money_center').coreSymbolicMeaning} work theme. Make one small deliverable for a specific audience, then ask whether it was useful before drawing a conclusion about professional fit.`,['month_inner','money_center'],['COM-TALENT-WORK'],'practice','Bring expression into useful work'));
   if(spec.id==='relationships')blocks.push(block(`For the shared bridge, compare what was actually agreed about time, money and responsibility with what each person only expected.`,['bridge'],['COM-BALANCE'],'practice','Clarify a shared commitment'));

  }
  if(spec.id==='core')for(const [number,ids] of repeatedPrimary(values))blocks.push(block(`${number}, ${arcanum(number).name}, appears at ${ids.map(id=>p(id).displayName.toLowerCase()).join(', ')}. The shared theme is ${arcanum(number).coreSymbolicMeaning}; compare the different roles rather than counting the appearances as extra evidence.`,ids,['COM-REPEAT'],'paragraph','A recurring primary theme'));
  if(spec.combinationRuleIds.includes('COM-CONTRAST')){const eligible=new Set<number>(spec.positionIds.map(id=>values[id])),pair=contrastData.find(pair=>pair.values.every(n=>eligible.has(n)));if(pair)blocks.push(block(`A useful tradeoff to consider is ${pair.themes.join(' and ')}. ${pair.guidance} These preferences can coexist; use an actual situation to decide whether the comparison is useful.`,spec.positionIds.filter(id=>pair.values.includes(values[id])),['COM-CONTRAST'],'paragraph','Two themes in conversation'));}
  for(const synthesis of sectionSynthesis(values,spec.id))for(const [index,text] of synthesis.text.split(/\n\n/).entries())blocks.push(block(text.trim(),synthesis.ids,synthesis.rule?[synthesis.rule]:[],'paragraph',index===0?synthesis.heading:undefined));
  const practices=blocks.filter(item=>item.kind==='practice');
  return {id:spec.id,title:spec.title,blocks:[...blocks.filter(item=>item.kind!=='practice'),...applications,...practices]};
 });
 const report:CandidateReport={dateOnly,methodologyVersion:matrix.methodologyVersion,calculationProfile:'C-family-center-v1',contentVersion:FINAL_CONTENT_VERSION,reportSchemaVersion:REPORT_SCHEMA_VERSION,sourceDataHash:SOURCE_DATA_HASH,locale:'en-US',values,trace:matrix.trace,sections,semanticContentHash:'',wordCount:0};
 report.semanticContentHash=digest(publication(report));report.wordCount=narrativeWordCount(report);
 return report;
}
/** Internal version dispatch only; callers retain their existing authorization responsibilities. */
export function composeCandidateVersion(dateOnly:string,version:ContentVersion):CandidateReport{if(version==='en-US-role-editorial-1.0.0')return composePrevious(dateOnly);if(version==='en-US-role-editorial-2.0.0')return composeBaseline(dateOnly,version);if(version==='en-US-role-editorial-2.1.0')return composeApproved(dateOnly,version);if(version===FINAL_CONTENT_VERSION)return composeExpanded(dateOnly);throw new Error('Unknown interpretation edition.');}
export const composeCandidate=(dateOnly:string)=>composeCandidateVersion(dateOnly,CONTENT_VERSION);
/** Renderer contract: includes every visible block in order, strips internal research/provenance. Theme is deliberately absent. */
export function publication(report:CandidateReport){return {date:report.dateOnly,core:{number:report.values.core,name:arcanum(report.values.core).name},sections:report.sections.map(section=>({id:section.id,title:section.title,blocks:section.blocks.map(b=>({kind:b.kind,text:b.text,heading:b.heading??'',detail:b.detail??'',rows:b.rows??[]}))}))};}
export const candidateSample=()=>composeCandidate(CANDIDATE_SAMPLE_DATE);
