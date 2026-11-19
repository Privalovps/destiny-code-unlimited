import 'server-only';
import { calculate,humanCalculation } from './calculate';
import { arcanum,positionData,channelData,policy } from './data';
import type { MatrixResult,NodeId,FreePreview } from './types';
import { CONTENT_VERSION } from './report';
import { symbolDepth } from './depth-library';
export type ChartNode={id:NodeId;label:string;number:number;archetype:string;role:string;calculation:string;coordinates:[number,number]|null;primary:boolean};
export type ChartDTO={nodes:ChartNode[];links:[NodeId,NodeId][]};
export function chartDTO(matrix:MatrixResult):ChartDTO{
 const primary=new Set(['day','month','year','bottom','core','nw','ne','se','sw']);
 const nodes=positionData.map(p=>({id:p.id,label:p.displayName,number:matrix.values[p.id],archetype:arcanum(matrix.values[p.id]).name,role:p.role.replace(' in the source tradition',''),calculation:humanCalculation(matrix.trace.find(step=>step.formulaId===p.id)!,matrix.date),coordinates:p.diagramCoordinates,primary:primary.has(p.id)}));
 const diagram=new Set(nodes.filter(n=>n.coordinates).map(n=>n.id)),edges=new Map<string,[NodeId,NodeId]>();
 for(const c of channelData){const ids=c.physicalOrder.filter(id=>diagram.has(id));for(let i=1;i<ids.length;i++){const pair:[NodeId,NodeId]=[ids[i-1],ids[i]],key=[...pair].sort().join(':');edges.set(key,pair);}}
 return {nodes,links:[...edges.values()]};
}
export function freeReading(date:string):{preview:FreePreview;chart:ChartDTO}{
 const matrix=calculate(date);return {preview:{dateOnly:date,methodologyVersion:matrix.methodologyVersion,calculationProfile:matrix.calculationProfile,contentVersion:CONTENT_VERSION,positions:(policy.free.positionIds as ('day'|'core')[]).map(id=>({id,number:matrix.values[id],coreSymbolicMeaning:arcanum(matrix.values[id]).coreSymbolicMeaning+(CONTENT_VERSION!=='en-US-role-editorial-1.0.0'?`. ${(CONTENT_VERSION==='en-US-role-editorial-2.1.0'||CONTENT_VERSION==='en-US-role-editorial-2.1.1')?symbolDepth[matrix.values[id]].principle.replace(/\.+$/,''):symbolDepth[matrix.values[id]].principle}`:'')})),disclosure:'A symbolic framework for entertainment and self-reflection, not a scientific assessment or prediction.'},chart:chartDTO(matrix)};
}
