'use client';
import { useState, useSyncExternalStore } from 'react';
import { THEME_STORAGE_KEY, validTheme } from '@/lib/theme';

function subscribe(notify:()=>void) {
  const storage=(event:StorageEvent)=>{
    if(event.key===THEME_STORAGE_KEY||event.key===null){document.documentElement.dataset.theme=validTheme(event.newValue);notify();}
  };
  window.addEventListener('destiny-theme',notify);
  window.addEventListener('storage',storage);
  return ()=>{window.removeEventListener('destiny-theme',notify);window.removeEventListener('storage',storage);};
}
const snapshot=()=>validTheme(document.documentElement.dataset.theme);
const serverSnapshot=()=>'dark' as const;
export function ThemeToggle() {
  const theme=useSyncExternalStore(subscribe,snapshot,serverSnapshot);
  const [message,setMessage]=useState('');
  function toggle() {
    const next=theme==='dark'?'light':'dark';
    document.documentElement.dataset.theme=next;
    try {localStorage.setItem(THEME_STORAGE_KEY,next);setMessage('');}
    catch {setMessage('Theme changed for this visit. This browser could not save the preference.');}
    window.dispatchEvent(new Event('destiny-theme'));
  }
  return <div className="theme-control"><button type="button" className="theme-toggle" onClick={toggle} aria-label={`Switch to ${theme==='dark'?'light':'dark'} theme`} aria-pressed={theme==='light'} title={`Switch to ${theme==='dark'?'light':'dark'} theme`}>
    <svg className="theme-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3M5 5l2 2m10 10 2 2M5 19l2-2M17 7l2-2"/></svg>
    <svg className="theme-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"/></svg>
  </button><span className="sr-only" role="status">{message}</span></div>;
}
