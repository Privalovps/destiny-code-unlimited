'use client';
import { useId,useState } from 'react';
import type { ChartDTO } from '@/lib/methodology/public';
import { CandidateEmblem } from './candidate-emblem';
import styles from './expanded-matrix.module.css';
export function ExpandedMatrix({chart,example=false}:{chart:ChartDTO;example?:boolean}){
 const uid=useId(),[selected,setSelected]=useState('core');
 const active=chart.nodes.find(node=>node.id===selected)!,nodes=chart.nodes.filter(node=>node.coordinates),aggregates=chart.nodes.filter(node=>!node.coordinates);
 const point=(id:string)=>{const node=nodes.find(n=>n.id===id)!;return {x:500+node.coordinates![0]*420,y:500+node.coordinates![1]*420};};
 return <div className={`chart-wrap ${styles.chart}`}>
  <label className={styles.picker} htmlFor={`${uid}-select`}>Explore a position<select id={`${uid}-select`} value={selected} onChange={event=>setSelected(event.target.value)}>{chart.nodes.map(node=><option key={node.id} value={node.id}>{node.label} · {node.number}</option>)}</select></label>
  <p className="fine">{example?'Fixed example · ':''}30 diagram positions. Select a node, or choose a position above.</p>
  <div className={styles.viewport} role="region" aria-label="Complete Destiny Matrix">
   <div className={styles.stage}>
    <svg className="matrix" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet" role="img" aria-labelledby={`${uid}-title`} pointerEvents="none"><title id={`${uid}-title`}>{`${example ? 'Example' : 'Personal'} expanded Destiny Matrix`}</title>
     <g fill="none" stroke="currentColor" strokeWidth="1.2" pointerEvents="none" aria-hidden="true"><path d="M80 500 500 80 920 500 500 920Z M197.6 197.6H802.4V802.4H197.6Z"/>{chart.links.map(([a,b])=>{const left=point(a),right=point(b);return <line key={`${a}:${b}`} x1={left.x} y1={left.y} x2={right.x} y2={right.y}/>;})}</g>
     {nodes.map(node=>{const {x,y}=point(node.id);return <g key={node.id} pointerEvents="none"><circle cx={x} cy={y} r={node.id==='core'?38:node.primary?29:19} className={selected===node.id?'node selected':'node'}/><text x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize={node.id==='core'?30:node.primary?25:21} className={selected===node.id?'matrix-number selected':'matrix-number'}>{node.number}</text></g>;})}
    </svg>
    <div className={styles.controls} role="group" aria-label="Select a numeric node">{nodes.map(node=>{const {x,y}=point(node.id),size=node.id==='core'?80:node.primary?64:44;return <button key={node.id} type="button" className={styles.target} style={{left:`${x/10}%`,top:`${y/10}%`,width:`${size/9.2}%`,height:`${size/9.2}%`,marginLeft:`${-size/18.4}%`,marginTop:`${-size/18.4}%`}} aria-label={`${node.label}: ${node.number}, ${node.archetype}`} aria-pressed={selected===node.id} aria-controls={`${uid}-detail`} onClick={()=>setSelected(node.id)}><span className="sr-only">{node.number}</span></button>;})}</div>
   </div>
  </div>
  <details className="method-details"><summary>Eight separate summary values</summary><p className="fine">These aggregates are calculated separately; they are not additional circles on the diagram.</p><div className={styles.aggregates}>{aggregates.map(node=><button key={node.id} type="button" aria-pressed={selected===node.id} aria-controls={`${uid}-detail`} onClick={()=>setSelected(node.id)}>{node.label}<strong>{node.number}</strong></button>)}</div></details>
  <div id={`${uid}-detail`} className="chart-detail" aria-live="polite" aria-atomic="true"><p className="tiny">{active.label}</p><div className="chart-selection"><CandidateEmblem number={active.number} name={active.archetype} decorative/><div><h3>{active.number} / {active.archetype}</h3><p>{active.role}</p></div></div><details><summary>See this calculation</summary><p>{active.calculation}</p><p className="fine">Add all specified inputs before adding digits when the total is above 22.</p></details></div>
 </div>;
}
