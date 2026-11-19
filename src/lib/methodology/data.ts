import 'server-only';
import { createHash } from 'node:crypto';
import arcana from '../../../DESTINY_CODE_METHODOLOGY/data/arcana.json';
import positions from '../../../DESTINY_CODE_METHODOLOGY/data/positions.json';
import channels from '../../../DESTINY_CODE_METHODOLOGY/data/channels.json';
import calculation from '../../../DESTINY_CODE_METHODOLOGY/data/calculation_rules.json';
import sections from '../../../DESTINY_CODE_METHODOLOGY/data/report_sections.json';
import combinations from '../../../DESTINY_CODE_METHODOLOGY/data/combination_rules.json';
import contrasts from '../../../DESTINY_CODE_METHODOLOGY/data/contrast_pairs.json';
import patterns from '../../../DESTINY_CODE_METHODOLOGY/data/karmic_patterns.json';
import programs from '../../../DESTINY_CODE_METHODOLOGY/data/source_code_catalog.json';
import accessPolicy from '../../../DESTINY_CODE_METHODOLOGY/data/access_policy.json';
import sources from '../../../DESTINY_CODE_METHODOLOGY/data/sources.json';
import arcanaSchema from '../../../DESTINY_CODE_METHODOLOGY/schemas/arcana.schema.json';
import positionSchema from '../../../DESTINY_CODE_METHODOLOGY/schemas/positions.schema.json';
import calculationSchema from '../../../DESTINY_CODE_METHODOLOGY/schemas/calculation_rules.schema.json';
import combinationSchema from '../../../DESTINY_CODE_METHODOLOGY/schemas/combination_rules.schema.json';
import patternSchema from '../../../DESTINY_CODE_METHODOLOGY/schemas/karmic_patterns.schema.json';
import sectionSchema from '../../../DESTINY_CODE_METHODOLOGY/schemas/report_sections.schema.json';
import { validateSchema,type Schema } from './schema';
import type { ArcanaDefinition,PositionDefinition,CalculationRule,ChannelDefinition,PatternDefinition,NodeId,Provenance } from './types';
export function canonical(value:unknown):string {if(Array.isArray(value))return `[${value.map(canonical).join(',')}]`;if(value!==null&&typeof value==='object')return `{${Object.entries(value).sort(([a],[b])=>a<b?-1:a>b?1:0).map(([key,v])=>`${JSON.stringify(key)}:${canonical(v)}`).join(',')}}`;return JSON.stringify(value);}
export const digest=(value:unknown)=>createHash('sha256').update(canonical(value)).digest('hex');
const schemaPairs:readonly [unknown,Schema][]=[[arcana,arcanaSchema],[positions,positionSchema],[calculation,calculationSchema],[combinations,combinationSchema],[patterns,patternSchema],[sections,sectionSchema]];
for(const [value,schema] of schemaPairs)validateSchema(value,schema);
export type Arcanum=ArcanaDefinition & {internalContradiction:string;everydayExample:string;communicationThemes:string;careerThemes:string[];strengthsAndTalents:string;personalDevelopment:string;familyAndAncestralThemes:string;moneyAndResources:string;relationshipSymbolism:string;positionSpecificRules:Record<string,{text?:string;method?:string;provenance:Provenance}>};
export const arcanaData=arcana as unknown as readonly Arcanum[];
export const positionData=positions as unknown as readonly PositionDefinition[];
export const rules=calculation.rules as unknown as readonly CalculationRule[];
/** Owner approved 2026-11-18: keep both research records, resolve duplicate channel IDs by explicit composition order. */
export const channelResolution={money:['year_inner','bridge','money_center'],relationships:['bottom_inner','bridge','love_center'],earth_axis:['day','year','earth'],sky_axis:['month','bottom','sky']} as const;
const channelsById=new Map<string,ChannelDefinition>();
for(const channel of channels as unknown as ChannelDefinition[]){
 const prior=channelsById.get(channel.id);
 if(prior&&!Object.hasOwn(channelResolution,channel.id))throw new Error(`Unresolved channel ID: ${channel.id}`);
 if(!prior)channelsById.set(channel.id,channel);
}
export const channelData=[...channelsById.values()].map(channel=>({...channel,interpretationOrder:channelResolution[channel.id as keyof typeof channelResolution]?[...channelResolution[channel.id as keyof typeof channelResolution]] as NodeId[]:channel.interpretationOrder}));
export const sectionData=sections as unknown as readonly {id:string;title:string;order:number;positionIds:NodeId[];combinationRuleIds:string[]}[];
export const patternData=patterns as unknown as readonly PatternDefinition[];
export const contrastData=contrasts;
export const combinationData=combinations;
export const genericPrograms=programs;
export const sourceData=sources;
export const policy=accessPolicy;
if(policy.free.includePremiumDomainCopy!==false||policy.free.positionIds.join(',')!=='day,core'||policy.sample.acceptArbitraryDob!==false||policy.sample.date!=='1991-12-09'||policy.price.amountMinor!==1290||policy.price.currency!=='USD')throw new Error('Review changed access/sample/price policy before enabling this package.');
if(policy.paid.sectionIds.join(',')!==sectionData.map(s=>s.id).join(','))throw new Error('Paid section manifest does not match access policy.');
const known=new Set<string>(['dayOfMonth','monthOfYear','yearNumber']);
for(const rule of rules){if(known.has(rule.id)||rule.inputs.some(id=>!known.has(id)))throw new Error(`Invalid formula dependency: ${rule.id}`);known.add(rule.id);}
if(rules.length!==38||positionData.length!==38||positionData.filter(p=>p.diagramCoordinates).length!==30||arcanaData.length!==22)throw new Error('Unexpected methodology extent.');
if(new Set(positionData.map(p=>p.id)).size!==38||new Set(sectionData.map(p=>p.id)).size!==11)throw new Error('Duplicate position or section ID.');
if(genericPrograms.some(program=>program.automaticMatchingEnabled!==false))throw new Error('Unsupported generic program matching must remain disabled.');
const ids=new Set(rules.map(r=>r.id)),combIds=new Set(combinations.map(r=>r.id));
for(const p of positionData)if(!ids.has(p.id)||p.formulaId!==p.id)throw new Error('Invalid position mapping.');
for(const c of channelData)if([...c.physicalOrder,...c.interpretationOrder].some(id=>!ids.has(id)))throw new Error('Invalid channel mapping.');
for(const s of sectionData)if(s.positionIds.some(id=>!ids.has(id))||s.combinationRuleIds.some(id=>!combIds.has(id)))throw new Error('Invalid section mapping.');
function refs(value:unknown):void {if(Array.isArray(value)){value.forEach(refs);return;}if(!value||typeof value!=='object')return;const v=value as Record<string,unknown>;if('sourceId' in v&&'pdfPages' in v){const source=sources.find(s=>s.id===v.sourceId);if(!source||!Array.isArray(v.pdfPages)||v.pdfPages.some(p=>!Number.isInteger(p)||p<1||p>source.pages))throw new Error('Invalid source/page reference.');}Object.values(v).forEach(refs);}
refs({arcana,positions,channels,calculation,sections,combinations,patterns,programs});
export const SOURCE_DATA_HASH=digest({arcana,positions,channels,calculation,sections,combinations,contrasts,patterns,programs,sources,accessPolicy,channelResolution});
export function arcanum(number:number){if(!Number.isInteger(number)||number<1||number>22)throw new RangeError('Expected arcana 1–22.');return arcanaData[number-1];}
export const positionById=Object.fromEntries(positionData.map(p=>[p.id,p])) as Record<NodeId,PositionDefinition>;
