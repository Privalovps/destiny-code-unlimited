'use client';
import { useEffect, useState } from 'react';

type Chapter = {id:string;title:string};
/** One observer, eight targets, no scroll loop or polling. */
export function ReadingProgress({chapters}:{chapters:Chapter[]}) {
  const [active,setActive]=useState(-1);
  useEffect(()=>{
    if (!('IntersectionObserver' in window)) return;
    const observer=new IntersectionObserver(entries=>{
      const visible=entries.filter(entry=>entry.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);
      if(visible[0]) setActive(chapters.findIndex(chapter=>chapter.id===visible[0].target.id));
    },{rootMargin:'-10% 0px -65% 0px',threshold:0});
    chapters.forEach(chapter=>{const element=document.getElementById(chapter.id);if(element) observer.observe(element);});
    return ()=>observer.disconnect();
  },[chapters]);
  return <nav aria-label="Reading contents">
    <p className="tiny">YOUR READING / {active<0?'BEGIN HERE':`${String(active+1).padStart(2,'0')} OF ${chapters.length}`}</p>
    <progress className="reading-progress" max={chapters.length} value={active+1} aria-label="Current chapter in the reading"/>
    <details className="chapter-menu" open><summary>Chapters & reading progress</summary>
      <ol>{chapters.map((chapter,index)=><li key={chapter.id}><a href={`#${chapter.id}`} aria-current={active===index?'location':undefined}><span className="tiny">{String(index+1).padStart(2,'0')}</span> {chapter.title}</a></li>)}</ol>
    </details>
  </nav>;
}
