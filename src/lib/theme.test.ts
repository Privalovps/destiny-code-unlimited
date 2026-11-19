import { describe, expect, it } from 'vitest';
import { runInNewContext } from 'node:vm';
import { readFileSync } from 'node:fs';
import { THEME_STORAGE_KEY, themeBootstrap, validTheme } from './theme';
import { parsePdfEdition, pdfPalettes } from './pdf-edition';
import { arcanaSymbols, symbolFor } from './arcana-symbols';

function contrast(a:string,b:string) {
 const luminance=(hex:string)=>[1,3,5].map(offset=>parseInt(hex.slice(offset,offset+2),16)/255).map(c=>c<=.04045?c/12.92:((c+.055)/1.055)**2.4).reduce((sum,c,index)=>sum+c*[.2126,.7152,.0722][index],0);
 const values=[luminance(a),luminance(b)].sort((x,y)=>y-x);return (values[0]+.05)/(values[1]+.05);
}
describe('lightweight theme preference',()=>{
 it.each([['light','light'],['dark','dark'],[null,'dark'],['invalid','dark']])('bootstraps %s before rendering', (stored,expected)=>{
   const document={documentElement:{dataset:{theme:'dark'}}};
   runInNewContext(themeBootstrap,{document,localStorage:{getItem:(key:string)=>{expect(key).toBe(THEME_STORAGE_KEY);return stored;}}});
   expect(document.documentElement.dataset.theme).toBe(expected);
 });
 it('keeps dark available when browser storage is blocked',()=>{
   const document={documentElement:{dataset:{theme:''}}};
   runInNewContext(themeBootstrap,{document,localStorage:{getItem:()=>{throw new Error('blocked');}}});
   expect(document.documentElement.dataset.theme).toBe('dark');expect(validTheme('script')).toBe('dark');
 });
 it('defines every UI token in both themes with AA body, muted and accent text',()=>{
   const css=readFileSync(new URL('../app/themes.css',import.meta.url),'utf8');
   const blocks=css.split('[data-theme="light"]');
   const tokens=(s:string)=>new Map([...s.matchAll(/(--[\w-]+):\s*(#[0-9a-fA-F]+)/g)].map(m=>[m[1],m[2]]));
   const dark=tokens(blocks[0]),light=tokens(blocks[1]);
   expect([...dark.keys()].sort()).toEqual([...light.keys()].sort());
   for(const theme of [dark,light]){
     for(const text of ['--text','--text-muted','--accent']) for(const surface of ['--page','--surface','--surface-soft','--surface-raised']) expect(contrast(theme.get(text)!,theme.get(surface)!)).toBeGreaterThanOrEqual(4.5);
     expect(contrast(theme.get('--button-bg')!,theme.get('--button-text')!)).toBeGreaterThanOrEqual(4.5);
   }
 });
});
describe('original emblem and PDF presentation data',()=>{
 it('provides 22 distinct original path sets with no remote resources',()=>{
   expect(arcanaSymbols).toHaveLength(22);
   expect(new Set(arcanaSymbols.map(s=>s.paths.join(' '))).size).toBe(22);
   expect(new Set(arcanaSymbols.map(s=>s.motif)).size).toBe(22);
   for(let number=1;number<=22;number++) for(const path of symbolFor(number).paths) expect(path).toMatch(/^[MLCZ\s\d.\-]+$/);
   expect(()=>symbolFor(23)).toThrow();
 });
 it('validates PDF presentation without treating it as access',()=>{
   expect(parsePdfEdition(null)).toBe('light');expect(parsePdfEdition('dark')).toBe('dark');expect(parsePdfEdition('paid')).toBeNull();
   for(const palette of Object.values(pdfPalettes)) expect(contrast(palette.paper,palette.ink)).toBeGreaterThan(4.5);
 });
});
