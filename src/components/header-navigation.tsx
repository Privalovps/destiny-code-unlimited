'use client';
import { ArrowIcon } from '@/components/arrow-icon';
import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import styles from './header-navigation.module.css';

export function HeaderNavigation() {
  const [open,setOpen]=useState(false);
  const panelId=useId();
  const root=useRef<HTMLDivElement>(null);
  const trigger=useRef<HTMLButtonElement>(null);

  useEffect(()=>{
    if(!open) return;
    const desktop=window.matchMedia('(min-width: 640px)');
    const outside=(event:PointerEvent)=>{if(!root.current?.contains(event.target as Node)) setOpen(false);};
    const resize=()=>{if(desktop.matches) setOpen(false);};
    document.addEventListener('pointerdown',outside);
    desktop.addEventListener('change',resize);
    return ()=>{document.removeEventListener('pointerdown',outside);desktop.removeEventListener('change',resize);};
  },[open]);

  return <div className={styles.navigation} ref={root}
    onBlur={event=>{if(!event.currentTarget.contains(event.relatedTarget)) setOpen(false);}}
    onKeyDown={event=>{if(event.key==='Escape'&&open){event.preventDefault();setOpen(false);trigger.current?.focus();}}}>
    <nav className={styles.links} aria-label="Main navigation">
      <Link href="/#how-it-works">The experience</Link>
      <Link href="/report/demo">Sample report <ArrowIcon /></Link>
    </nav>
    <button ref={trigger} type="button" className={styles.menuButton} aria-label="Main navigation menu" aria-expanded={open} aria-controls={panelId} onClick={()=>setOpen(value=>!value)}>
      Menu<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><path d={open?'M4 4l8 8M12 4l-8 8':'M2 5h12M2 11h12'}/></svg>
    </button>
    <nav id={panelId} className={styles.panel} aria-label="Mobile navigation" hidden={!open}>
      <ul className={styles.mobileLinks}>
        <li><Link href="/#how-it-works" onClick={()=>setOpen(false)}>The experience<ArrowIcon direction="down" /></Link></li>
        <li><Link href="/report/demo" onClick={()=>setOpen(false)}>Sample report<ArrowIcon /></Link></li>
      </ul>
    </nav>
  </div>;
}
