'use client';
import { useState } from 'react';

export function ShareReading({number,archetype,theme}:{number:number;archetype:string;theme:string}) {
  const [status,setStatus]=useState('');
  async function copy() {
    try {
      await navigator.clipboard.writeText(`DESTINY CODE · ${String(number).padStart(2,'0')} / ${archetype}\n${theme}\nA symbolic question, not a prediction.`);
      setStatus('Summary copied. Your birth date and result URL are not included.');
    } catch {setStatus('Copy is unavailable in this browser. You can select and copy your archetype text instead.');}
  }
  return <div className="share-reading"><button type="button" className="text-link" onClick={copy}>Copy my archetype summary ↗</button><p className="fine">A short text summary for sharing, without your birth date.</p><p role="status" className="fine">{status}</p></div>;
}
