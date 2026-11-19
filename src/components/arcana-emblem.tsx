import { emblemFrame, symbolFor } from '@/lib/arcana-symbols';
import { interpretation } from '@/lib/interpretations';
export function ArcanaEmblem({number,className='',decorative=false}:{number:number;className?:string;decorative?:boolean}) {
  const symbol=symbolFor(number);
  const label=`${interpretation(number).name}: ${symbol.motif}`;
  return <svg className={`arcana-emblem ${className}`} viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.35" strokeLinecap="round" strokeLinejoin="round" role={decorative?undefined:'img'} aria-label={decorative?undefined:label} aria-hidden={decorative||undefined}>
    {!decorative&&<title>{label}</title>}
    <path className="emblem-frame" d={emblemFrame}/>
    {symbol.paths.map((path,index)=><path key={index} d={path}/>)}
  </svg>;
}
