import { reduce22 as legacyReduce } from '../numerology';
import type { CalculationProfile,MatrixResult,NodeId,TraceStep,CalculationRule,ArcanaNumber } from './types';
import { rules } from './data';
export class CalculationError extends Error {constructor(public code:'invalid_date'|'invalid_profile'|'missing_dependency'|'unsupported_operation'|'invalid_number',message:string){super(message);this.name='CalculationError';}}
export function reduce22(value:number){try{return legacyReduce(value);}catch{throw new CalculationError('invalid_number','Expected a positive safe integer.');}}
export function parseDateOnly(input:unknown){
 if(typeof input!=='string'||input.length!==10||!/^\d{4}-\d{2}-\d{2}$/.test(input))throw new CalculationError('invalid_date','Use YYYY-MM-DD.');
 const [year,month,day]=input.split('-').map(Number),leap=year%4===0&&(year%100!==0||year%400===0),lengths=[31,leap?29:28,31,30,31,30,31,31,30,31,30,31];
 if(year<1||year>9999||month<1||month>12||day<1||day>(lengths[month-1]??0))throw new CalculationError('invalid_date','Enter a real Gregorian date.');return {year,month,day};
}
export function calculate(date:string,profile:CalculationProfile='C-family-center-v1',formulas:readonly CalculationRule[]=rules):MatrixResult{
 if(!['C-family-center-v1','AB-personal-center-v1'].includes(profile))throw new CalculationError('invalid_profile','Unknown calculation profile.');
 const {year,month,day}=parseDateOnly(date),raw:Record<string,number>={yearNumber:year,monthOfYear:month,dayOfMonth:day},values={} as Record<NodeId,ArcanaNumber>,trace:TraceStep[]=[];
 for(const rule of formulas){
  const inputs=profile==='AB-personal-center-v1'&&/^(nw|ne|se|sw)_inner$/.test(rule.id)?[rule.id.split('_')[0],'core']:rule.inputs;
  const operands=inputs.map(id=>{const value=(values as Record<string,number>)[id]??raw[id];if(value===undefined)throw new CalculationError('missing_dependency',`Missing dependency: ${id}`);return value;});
  let rawValue:number;
  switch(rule.operation){case 'digit_sum_then_reduce':rawValue=[...String(operands[0])].reduce((sum,d)=>sum+Number(d),0);break;case 'identity':case 'reduce':rawValue=operands[0];break;case 'sum_reduce':rawValue=operands.reduce((sum,n)=>sum+n,0);break;default:throw new CalculationError('unsupported_operation','Unsupported formula operation.');}
  const reductionSteps=[rawValue];while(reductionSteps[reductionSteps.length-1]>22)reductionSteps.push([...String(reductionSteps[reductionSteps.length-1])].reduce((sum,d)=>sum+Number(d),0));
  const result=reduce22(rawValue) as ArcanaNumber;values[rule.id]=result;trace.push({formulaId:rule.id,inputs:[...inputs],operands,rawValue,reductionSteps,result});
 }
 return {date,methodologyVersion:'dc-symbolic-1.0.0-proposed',calculationProfile:profile,values,trace};
}
export function humanCalculation(step:TraceStep,date:string){
 const operands=step.formulaId==='year'?[...date.slice(0,4)].join(' + '):step.operands.join(' + ');
 const chain=step.reductionSteps.join(' → ');return step.operands.length===1&&step.formulaId!=='year'&&step.reductionSteps.length===1?String(step.result):`${operands} = ${chain}`;
}
