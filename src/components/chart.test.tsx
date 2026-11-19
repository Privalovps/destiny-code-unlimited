import { beforeEach, describe, expect, it, vi } from 'vitest';
import { isValidElement, type ReactElement, type ReactNode } from 'react';
import { readFileSync } from 'node:fs';
import postcss from 'postcss';
import { matrixPositions, type Position } from '@/lib/matrix-positions';
import { calculateMatrix } from '@/lib/numerology';
import { positionReading } from '@/lib/position-reading';
import { Chart } from './chart';

// Hook harness exercises actual click handlers/render output without a browser or DOM package.
const state=vi.hoisted(()=>({selected:'E' as Position}));
vi.mock('react',async original=>({
  ...await original<typeof import('react')>(),
  useId:()=> 'chart-test',
  useState:()=>[state.selected,(next:Position)=>{state.selected=next;}],
}));
type Element=ReactElement<Record<string,unknown>>;
function elements(node:ReactNode):Element[] {
  if(Array.isArray(node)) return node.flatMap(elements);
  if(!isValidElement<Record<string,unknown>>(node)) return [];
  return [node,...elements(node.props.children as ReactNode)];
}
function text(node:ReactNode):string {
  if(typeof node==='string'||typeof node==='number') return String(node);
  if(Array.isArray(node)) return node.map(text).join(' ');
  return isValidElement<Record<string,unknown>>(node)?text(node.props.children as ReactNode):'';
}
const matrix=calculateMatrix('1993-04-17');
const buttons=(view:ReactNode)=>elements(view).filter(node=>node.type==='button'&&node.props.className==='chart-node');
const geometry=(view:ReactNode)=>elements(view).filter(node=>node.type==='circle'&&String(node.props.className).startsWith('node')).map(node=>({key:node.key,x:node.props.cx,y:node.props.cy,r:node.props.r}));
beforeEach(()=>{state.selected='E';});

describe('shared chart native interaction',()=>{
  it.each([
    [false, 'Your nine-position Destiny Matrix'],
    [true, 'Example nine-position Destiny Matrix'],
  ])('provides a single SVG title string when preview is %s', (preview, title)=>{
    const view=Chart({matrix,preview});
    expect(elements(view).find(node=>node.type==='title')?.props.children).toBe(title);
  });
  it.each(matrixPositions.map(p=>p.key))('selects %s with one click without changing any node geometry',position=>{
    const initial=Chart({matrix});
    const initialGeometry=geometry(initial);
    const numberGeometry=(view:ReactNode)=>elements(view).filter(node=>node.type==='text'&&String(node.props.className).startsWith('matrix-number')).map(node=>({key:node.key,x:node.props.x,y:node.props.y,size:node.props.fontSize,baseline:node.props.dominantBaseline}));
    const initialNumbers=numberGeometry(initial);
    const initialTargets=buttons(initial).map(node=>({key:node.key,style:node.props.style}));
    expect(buttons(initial)).toHaveLength(9);
    const button=buttons(initial).find(node=>node.props['data-position']===position)!;
    expect(button.props.type).toBe('button');
    expect(button.props.tabIndex).toBeUndefined(); // Native Tab/Enter/Space semantics.
    expect(button.props['aria-label']).toContain(`arcana ${matrix[position]}`);
    (button.props.onClick as ()=>void)();
    const selected=Chart({matrix});
    expect(geometry(selected)).toEqual(initialGeometry);
    expect(numberGeometry(selected)).toEqual(initialNumbers);
    expect(buttons(selected).map(node=>({key:node.key,style:node.props.style}))).toEqual(initialTargets);
    expect(buttons(selected).filter(node=>node.props['aria-pressed']===true).map(node=>node.props['data-position'])).toEqual([position]);
    const reading=positionReading(matrix,position);
    expect(text(selected)).toContain(reading.arcana.name);
    expect(text(selected)).toContain(reading.reflection);
    expect(text(selected)).toContain(reading.calculation);
    expect(elements(selected).find(node=>node.props.className==='chart-selection')?.key).toBeNull();
    expect(elements(selected).find(node=>node.type==='details')?.key).toBeNull();
  });
  it('keeps native buttons outside the pointer-transparent SVG',()=>{
    const view=Chart({matrix});
    const svg=elements(view).find(node=>node.type==='svg')!;
    expect(svg.props.pointerEvents).toBe('none');
    expect(elements(svg.props.children as ReactNode).some(node=>node.type==='button'||node.type==='foreignObject')).toBe(false);
    expect(new Set(buttons(view).map(node=>node.key)).size).toBe(9);
  });
});

describe('fixed transparent hit regions',()=>{
  const css=postcss.parse(readFileSync(new URL('../app/globals.css',import.meta.url),'utf8'));
  let width='',centerWidth='';
  css.walkRules('.matrix-controls .chart-node',rule=>{rule.walkDecls('width',decl=>{width=decl.value;});});
  css.walkRules('.matrix-controls .chart-node[data-position="E"]',rule=>{rule.walkDecls('width',decl=>{centerWidth=decl.value;});});
  it.each([240,280,335,350,390,540])('has 44px minimum, centered and nonoverlapping targets at %spx chart width',chartWidth=>{
    const targets=buttons(Chart({matrix}));
    const boxes=matrixPositions.map(p=>{
      const match=(p.key==='E'?centerWidth:width).match(/^max\(([\d.]+)%,\s*([\d.]+)px\)$/)!;
      expect(match).not.toBeNull();
      const size=Math.max(chartWidth*Number(match[1])/100,Number(match[2]));
      expect(size).toBeGreaterThanOrEqual(44);
      const style=targets.find(node=>node.props['data-position']===p.key)!.props.style as {left:string;top:string};
      const offset=(value:string)=>{
        const parts=value.match(/^calc\(([\d.]+)% - max\(([\d.]+)%, ([\d.]+)px\)\)$/)!;
        return chartWidth*Number(parts[1])/100-Math.max(chartWidth*Number(parts[2])/100,Number(parts[3]));
      };
      const x=offset(style.left),y=offset(style.top);
      expect(x+size/2).toBeCloseTo(p.x*chartWidth/500,8);
      expect(y+size/2).toBeCloseTo(p.y*chartWidth/500,8);
      expect(x).toBeGreaterThanOrEqual(0);expect(y).toBeGreaterThanOrEqual(0);
      expect(x+size).toBeLessThanOrEqual(chartWidth);expect(y+size).toBeLessThanOrEqual(chartWidth);
      const visibleRadius=(p.key==='E'?41:p.key.length===1?29:24)+.5;
      expect(size/2).toBeGreaterThanOrEqual(visibleRadius*chartWidth/500);
      return {x,y,size};
    });
    for(let a=0;a<boxes.length;a++) for(let b=a+1;b<boxes.length;b++){
      const first=boxes[a],second=boxes[b];
      expect(first.x<second.x+second.size&&first.x+first.size>second.x&&first.y<second.y+second.size&&first.y+first.size>second.y).toBe(false);
    }
  });
  it('allows only color transitions and no transforms/animations on numeric controls',()=>{
    css.walkRules(rule=>{
      if(!/chart-node|matrix-position|matrix-number|matrix-stage>\.matrix/.test(rule.selector)) return;
      rule.walkDecls(decl=>{
        if(['transform','animation','translate','rotate','scale'].includes(decl.prop)) expect(decl.value).toBe('none');
        if(decl.prop==='transition'&&decl.value!=='none') expect(decl.value.split(',').every(part=>/^\s*(color|fill|stroke)\s/.test(part))).toBe(true);
      });
    });
  });
});
