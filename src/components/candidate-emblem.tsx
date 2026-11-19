import { symbolForCandidate } from '@/lib/methodology/symbols';
import { emblemFrame } from '@/lib/arcana-symbols';
export function CandidateEmblem({number,name,decorative=false}:{number:number;name:string;decorative?:boolean}){
 const symbol=symbolForCandidate(number);
 return <svg className="arcana-emblem" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" aria-hidden={decorative||undefined} role={decorative?undefined:'img'} aria-label={decorative?undefined:name}>{!decorative&&<title>{name}</title>}<path d={emblemFrame}/>{symbol.paths.map((path,i)=><path key={i} d={path}/>)}</svg>;
}
