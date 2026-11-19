import 'server-only';
import { calculate,humanCalculation } from './calculate';
import { arcanum,positionById,positionData,sectionData,channelData,patternData,contrastData,SOURCE_DATA_HASH,digest,policy } from './data';
import type { NodeId,Domain,Provenance,ReportBlock,MatrixResult } from './types';
export const CONTENT_VERSION='en-US-role-editorial-1.0.0';
export const REPORT_SCHEMA_VERSION='1.0.0';
export const CANDIDATE_SAMPLE_DATE=policy.sample.date;
export const primaryIds:readonly NodeId[]=['day','month','year','bottom','core','nw','ne','se','sw'];
export type CalculationRow={label:string;number:number;archetype:string;calculation:string};
export type ContentBlock=ReportBlock & {heading?:string;detail?:string;rows?:CalculationRow[]};
export type CandidateSection={id:string;title:string;blocks:ContentBlock[]};
export type CandidateReport={dateOnly:string;methodologyVersion:string;calculationProfile:'C-family-center-v1';contentVersion:string;reportSchemaVersion:string;sourceDataHash:string;locale:'en-US';values:MatrixResult['values'];trace:MatrixResult['trace'];sections:CandidateSection[];semanticContentHash:string;wordCount:number};
const editorial:Provenance={classification:'editorial_synthesis',sourceRefs:[],editorialNote:'Original role-specific English composition from the supplied research package.'};
export function exactTail(values:readonly number[]){return patternData.find(p=>p.match.orderedValues.length===values.length&&p.match.orderedValues.every((value,i)=>value===values[i]));}
export function repeatedPrimary(values:MatrixResult['values']){const groups=new Map<number,NodeId[]>();for(const id of primaryIds){const value=values[id];groups.set(value,[...(groups.get(value)??[]),id]);}return [...groups].filter(([,ids])=>ids.length>1).slice(0,2);}
export function composeCandidate(dateOnly:string):CandidateReport{
 const matrix=calculate(dateOnly),values=matrix.values,a=(id:NodeId)=>arcanum(values[id]),p=(id:NodeId)=>positionById[id];
 const usedText=new Set<string>(),usedExamples=new Set<number>();
 const proof=(id:NodeId)=>humanCalculation(matrix.trace.find(t=>t.formulaId===id)!,dateOnly);
 const heading=(id:NodeId)=>`${p(id).displayName} · ${values[id]} / ${a(id).name}`;
 const block=(text:string,nodeIds:NodeId[]=[],ruleIds:string[]=[],kind:ContentBlock['kind']='paragraph',title?:string):ContentBlock=>({kind,text,nodeIds,formulaIds:nodeIds,ruleIds,heading:title,provenance:{...editorial,sourceRefs:[...new Map(nodeIds.flatMap(id=>[...p(id).provenance.sourceRefs,...a(id).sourceRefs]).map(ref=>[JSON.stringify(ref),ref])).values()]}});
 function distinct(candidates:string[]){const text=candidates.find(x=>![...usedText].some(used=>used.includes(x)||x.includes(used)));if(text)usedText.add(text);return text??'';}
 function reading(id:NodeId,domain:Domain=p(id).domain){
  let candidates=[a(id).domainReadings[domain]];
  if(domain==='family')candidates.push(a(id).communicationThemes,a(id).personalDevelopment);
  if(id==='month_inner')candidates=[a(id).communicationThemes,...candidates];
  if(id==='month_mid')candidates=[a(id).strengthsAndTalents,...candidates];
  if(id==='money_center')candidates=[`Work settings to explore include ${a(id).careerThemes.map(s=>s.replace(/\.+$/,'')).join(', ')}. These are examples of activities, not a prescribed profession.`,...candidates];
  let text=distinct(candidates);
  if(domain==='core'){const tension=distinct([a(id).internalContradiction]);if(tension)text+=` A tension to consider: ${tension.charAt(0).toLowerCase()+tension.slice(1)}`;}
  if(domain==='relationship'){const communication=distinct([a(id).communicationThemes]);if(communication)text+=` ${communication}`;}
  if(id==='money_center'){const resource=distinct([a(id).moneyAndResources]);if(resource)text+=` ${resource}`;}
  const role=p(id).role.replace(' in the source tradition','');
  const result=block(`${role} ${text||`Consider ${a(id).coreSymbolicMeaning} specifically through this role, rather than applying the earlier description to another person.`}`,[id],[],'position',heading(id));
  result.detail=`${p(id).displayName}: ${proof(id)}. The number supplies the archetype; the position gives the reading its particular focus.`;return result;
 }
 function example(id:NodeId){if(usedExamples.has(values[id]))return null;usedExamples.add(values[id]);return block(`For example, ${a(id).everydayExample.replace(/^You /,'you ')}`,[id],[],'paragraph','An everyday example');}
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
 const anchor:Record<string,NodeId>={core:'core',talents:'month',relationships:'love_center',resources:'money_center',parenting:'day',ancestry:'family_center',learning:'bottom',purpose:'purpose_personal'};
 const sections=sectionData.map(spec=>{
  const blocks:ContentBlock[]=[block(introductions[spec.id])];
  if(spec.id==='orientation')blocks.push(block('The diagram contains 30 positions. Eight further values summarize family resources, line relationships and purpose. A repeated number keeps the same archetype while its position changes the question. Because the values are calculated from related inputs, repetition is not independent confirmation or a measure of personal power.'));
  else if(spec.id==='ancestry'){
   blocks.push(reading('family_center'));
   for(const corner of ['nw','ne','se','sw'] as const){const channel=channelData.find(c=>c.id===`${corner}_family`)!;const ids=channel.interpretationOrder;
    const themes=ids.map(id=>`${values[id]} / ${a(id).name}: ${a(id).coreSymbolicMeaning}`).join(' → ');
    const family=distinct([a(corner).familyAndAncestralThemes,a(corner).communicationThemes]);
    const item=block(`${themes}. ${family} Apply the branch to an expectation or choice you can observe now. The inner theme qualifies the outer theme, and the middle theme offers another perspective on how it is expressed.`,ids,['COM-CHANNEL'],'position',p(corner).displayName);
    item.detail=ids.map(id=>`${p(id).displayName}: ${proof(id)}`).join('; ');blocks.push(item);for(const id of ids)blocks.push(reading(id,'family'));
   }
  }else if(spec.id==='learning'){
   const ids:NodeId[]=['bottom','bottom_inner','bottom_mid'],key=ids.map(id=>values[id]),pattern=exactTail(key);
   blocks.push(block(`Your learning sequence is ${key.join(' → ')}. Its themes are ${ids.map(id=>a(id).coreSymbolicMeaning).join(' → ')}.`,ids,['COM-TAIL-C']));
   if(pattern){const item=block(pattern.symbolicReading,ids,['COM-TAIL-C'],'pattern',pattern.title);item.provenance={...pattern.provenance};blocks.push(item,block(pattern.practice,ids,['COM-TAIL-C'],'practice','A practice for this pattern'));}
   else blocks.push(block(`This sequence has no exact named match in the current pattern catalog. The general reading therefore begins with ${a('bottom').coreSymbolicMeaning}. ${a('bottom').personalDevelopment}`,['bottom'],['COM-TAIL-C'],'pattern','Your general learning theme'));
   blocks.push(reading('bottom'),reading('bottom_inner'),reading('bottom_mid'));
  }else if(spec.id==='integration'){
   const practiced=new Set<number>();for(const id of ['core','money_center','love_center'] as const){if(practiced.has(values[id]))continue;practiced.add(values[id]);blocks.push(block(a(id).reflectivePractice,[id],[],'practice',heading(id)));}
   blocks.push(block('After one attempt, record the action, the response and one detail you did not expect. Decide what to keep, revise or leave aside. A result that does not fit the interpretation is useful information too.'));
  }else if(spec.id==='reference'){
   const item=block('',positionData.map(p=>p.id),[],'calculation_table','All calculated values');item.rows=positionData.map(position=>({label:position.displayName,number:values[position.id],archetype:a(position.id).name,calculation:proof(position.id)}));blocks.push(item);
  }else{
   let ids=spec.positionIds;
   if(spec.id==='relationships')ids=channelData.find(c=>c.id==='relationships')!.interpretationOrder;
   if(spec.id==='purpose')ids=['purpose_personal','purpose_social','purpose_spiritual','heart_sky'];
   if(spec.id==='talents')ids=channelData.find(c=>c.id==='month_triad')!.interpretationOrder;
   for(const id of ids){
    if(id==='bridge'&&spec.id==='resources'){blocks.push(block(`The shared bridge is ${values.bridge}, ${a('bridge').name}. Return to its relationship reading when discussing work time, spending or shared responsibilities: the symbol is the same shared point, not a second financial indicator.`,['bridge'],['COM-BALANCE']));continue;}
    const item=reading(id,spec.id==='relationships'&&id==='bottom_inner'?'relationship':spec.id==='parenting'&&id==='day'?'family':undefined);blocks.push(item);
   }
   if(spec.id==='talents')blocks.push(block(`An experiment could combine ${a('month_inner').strengthsAndTalents.replace(/\.$/,'').toLowerCase()} with the ${a('money_center').coreSymbolicMeaning} work theme. Make one small deliverable for a specific audience, then ask whether it was useful before drawing a conclusion about professional fit.`,['month_inner','money_center'],['COM-TALENT-WORK'],'practice','Bring expression into useful work'));
   if(spec.id==='relationships')blocks.push(block(`For the shared bridge, compare what was actually agreed about time, money and responsibility with what each person only expected.`,['bridge'],['COM-BALANCE'],'practice','Clarify a shared commitment'));
   if(spec.id==='purpose'){
    const idList:NodeId[]=['earth','sky','purpose_personal','paternal','maternal','purpose_social','purpose_spiritual'];
    const item=block('These intermediate totals preserve the grouping of the calculation. Personal and family resources remain different parts of the reading.',idList,[],'calculation_table','How the purpose values connect');item.rows=idList.map(id=>({label:p(id).displayName,number:values[id],archetype:a(id).name,calculation:proof(id)}));blocks.push(item);
   }
  }
  if(spec.id==='core')for(const [number,ids] of repeatedPrimary(values))blocks.push(block(`${number}, ${arcanum(number).name}, appears at ${ids.map(id=>p(id).displayName.toLowerCase()).join(', ')}. The shared theme is ${arcanum(number).coreSymbolicMeaning}; compare the different roles rather than counting the appearances as extra evidence.`,ids,['COM-REPEAT'],'paragraph','A recurring primary theme'));
  if(spec.combinationRuleIds.includes('COM-CONTRAST')){const eligible=new Set<number>(spec.positionIds.map(id=>values[id])),pair=contrastData.find(pair=>pair.values.every(n=>eligible.has(n)));if(pair)blocks.push(block(`A useful tradeoff to consider is ${pair.themes.join(' and ')}. ${pair.guidance} These preferences can coexist; use an actual situation to decide whether the comparison is useful.`,spec.positionIds.filter(id=>pair.values.includes(values[id])),['COM-CONTRAST'],'paragraph','Two themes in conversation'));}
  const id=anchor[spec.id];if(id){const constructive=distinct(a(id).constructiveManifestations);if(constructive)blocks.push(block(constructive,[id],[],'paragraph','A constructive expression'));const shadow=distinct(a(id).shadowManifestations);if(shadow)blocks.push(block(`A limiting expression to consider is ${shadow.charAt(0).toLowerCase()+shadow.slice(1)} `,[id],[],'paragraph','When the emphasis becomes limiting'));const e=example(id);if(e)blocks.push(e);}
  return {id:spec.id,title:spec.title,blocks};
 });
 const report:CandidateReport={dateOnly,methodologyVersion:matrix.methodologyVersion,calculationProfile:'C-family-center-v1',contentVersion:CONTENT_VERSION,reportSchemaVersion:REPORT_SCHEMA_VERSION,sourceDataHash:SOURCE_DATA_HASH,locale:'en-US',values,trace:matrix.trace,sections,semanticContentHash:'',wordCount:0};
 report.semanticContentHash=digest(publication(report));report.wordCount=publication(report).sections.flatMap(s=>s.blocks.flatMap(b=>[b.text,b.detail??''])).join(' ').trim().split(/\s+/).length;
 return report;
}
/** Renderer contract: includes every visible block in order, strips internal research/provenance. Theme is deliberately absent. */
export function publication(report:CandidateReport){return {date:report.dateOnly,core:{number:report.values.core,name:arcanum(report.values.core).name},sections:report.sections.map(section=>({id:section.id,title:section.title,blocks:section.blocks.map(b=>({kind:b.kind,text:b.text,heading:b.heading??'',detail:b.detail??'',rows:b.rows??[]}))}))};}
export const candidateSample=()=>composeCandidate(CANDIDATE_SAMPLE_DATE);
