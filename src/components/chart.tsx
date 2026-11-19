'use client';
import { useId, useState } from 'react';
import type { Matrix } from '@/lib/numerology';
import { matrixPositions, type Position } from '@/lib/matrix-positions';
import { positionReading } from '@/lib/position-reading';
import { ArcanaEmblem } from './arcana-emblem';

export function Chart({matrix,preview=false}:{matrix:Matrix;preview?:boolean}) {
  const [selected,setSelected]=useState<Position>('E');
  const uid=useId();
  const active=positionReading(matrix,selected);
  return <div className="chart-wrap">
    <div className="matrix-stage"><svg role="img" pointerEvents="none" viewBox="0 0 500 500" className="matrix" aria-labelledby={`${uid}-title ${uid}-help`}>
      <title id={`${uid}-title`}>{`${preview ? 'Example' : 'Your'} nine-position Destiny Matrix`}</title>
      <desc id={`${uid}-help`}>Select any numbered button to read its formula and symbolic question. Lines connect positions and do not calculate extra channels.</desc>
      <defs><radialGradient id={`${uid}-halo`}><stop stopColor="var(--ornament)" stopOpacity=".15"/><stop offset="1" stopColor="var(--ornament)" stopOpacity="0"/></radialGradient></defs>
      <circle cx="250" cy="250" r="242" fill={`url(#${uid}-halo)`} pointerEvents="none"/>
      <g className="matrix-geometry" pointerEvents="none" fill="none" stroke="currentColor" strokeWidth=".8" aria-hidden="true">
        <circle cx="250" cy="250" r="195" strokeDasharray="2 8"/><circle cx="250" cy="250" r="224" opacity=".3"/>
        <path className="matrix-construction" pathLength="1" d="M250 55 445 250 250 445 55 250Z M112 112H388V388H112Z M55 250H445 M250 55V445 M112 112 388 388 M388 112 112 388"/>
        {(['NW','NE','SE','SW'] as const).map(corner=>{
          const keys={NW:['A','NW','B'],NE:['B','NE','C'],SE:['C','SE','D'],SW:['D','SW','A']} as const;
          const points=keys[corner].map(key=>matrixPositions.find(p=>p.key===key)!);
          return <path key={corner} className={selected===corner?'matrix-input-link active':'matrix-input-link'} d={`M ${points.map(p=>`${p.x} ${p.y}`).join(' L ')}`}/>;
        })}
        <circle cx="250" cy="250" r="86" opacity=".4"/>
        <path d="M250 12v12m0 452v12M12 250h12m452 0h12" strokeWidth="2"/>
      </g>
      {matrixPositions.map(({key,x,y})=><g key={key} className="matrix-position" pointerEvents="none">
        <circle cx={x} cy={y} r={key==='E'?41:key.length===1?29:24} className={selected===key?'node selected':'node'}/>
        <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize={key==='E'?28:23} className={selected===key?'matrix-number selected':'matrix-number'} pointerEvents="none">{matrix[key]}</text>
        {key!=='E'&&<text x={x} y={y+42} textAnchor="middle" className="node-label" aria-hidden="true">{key}</text>}
      </g>)}
    </svg>
      <div className="matrix-controls" role="group" aria-label="Select a matrix position">
        {matrixPositions.map(({key,x,y,label})=><button key={key} type="button" className="chart-node" data-position={key}
          style={{left:`calc(${x/5}% - max(${key==='E'?8.4:6.8}%, 22px))`,top:`calc(${y/5}% - max(${key==='E'?8.4:6.8}%, 22px))`}}
          onClick={()=>setSelected(key)} aria-label={`${key}, ${label}: arcana ${matrix[key]}`} aria-pressed={selected===key} aria-controls={`${uid}-detail`}><span className="sr-only">{matrix[key]}</span></button>)}
      </div>
    </div>
    <div className="chart-caption"><span className="tiny">{preview?'EXAMPLE MATRIX · ':''}{active.label}</span><span>{active.number} <span className="muted">/ 22</span></span></div>
    <div className="chart-detail" id={`${uid}-detail`} aria-live="polite" aria-atomic="true">
      <p className="tiny">{active.key} / ARCANA {active.number} / {active.lens} · EDITORIAL LENS</p>
      <div className="chart-selection"><ArcanaEmblem number={active.number} decorative/><div><h3>{active.arcana.name}</h3><p>{active.reflection}</p></div></div>
      <details><summary>How {active.key} is calculated</summary><p><code>{active.calculation}</code></p><p>Inputs: {active.inputs}. Sum decimal digits repeatedly only above 22.</p><p>{active.arcana.theme}. {active.arcana.growth}</p></details>
    </div>
    <p className="chart-legend fine">Select or tab to a number. Center: combined sum · Larger outer nodes: cardinal inputs/synthesis · Corners: adjacent sums. Corner selection highlights only its two documented inputs. Positions are symbolic prompts, not measured traits.</p>
  </div>;
}
