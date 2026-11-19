export type Theme = 'dark' | 'light';
export const THEME_STORAGE_KEY = 'destiny-code-theme';
export function validTheme(value:unknown):Theme {return value==='light'?'light':'dark';}
/** Runs in the head before the body paints. Only a validated display preference is read. */
export const themeBootstrap = `(()=>{let theme='dark';try{if(localStorage.getItem('${THEME_STORAGE_KEY}')==='light')theme='light'}catch{}document.documentElement.dataset.theme=theme})()`;
