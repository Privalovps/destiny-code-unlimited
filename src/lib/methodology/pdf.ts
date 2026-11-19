import { symbolForCandidate } from './symbols';
import 'server-only';
import { publication,type CandidateReport } from './report';
import { positionData,channelData } from './data';
import { pdfPalettes,type PdfEdition } from '../pdf-edition';
import { wrapPdfText,textWidth,pdfText } from '../report-pdf';
import { emblemFrame } from '../arcana-symbols';
export const candidatePdfText=(value:string)=>pdfText(value.replace(/→/g,' -> '));
export function pdfReadingDocument(report:CandidateReport,edition:PdfEdition){if(!pdfPalettes[edition])throw new Error('Unknown PDF edition.');return publication(report);}
/** Same standard-font/vector publication technology and existing Light/Dark palettes. No browser or file/network operation. */
export function generateCandidatePdf(report:CandidateReport,edition:PdfEdition,sample=false):Uint8Array{
 const document=pdfReadingDocument(report,edition),palette=pdfPalettes[edition];if(!palette)throw new Error('Unknown PDF edition.');
 const W=595.28,H=841.89,M=58,BOTTOM=72,BODY=11.5,LEADING=1.55;
 const color=(hex:string)=>[1,3,5].map(offset=>(parseInt(hex.slice(offset,offset+2),16)/255).toFixed(4)).join(' ');
 const INK=color(palette.ink),GOLD=color(palette.gold),PAPER=color(palette.paper),MUTED=color(palette.muted),RULE=color(palette.rule),PANEL=color(palette.panel),METAL=color(palette.metal);
 const n=(x:number)=>x.toFixed(2),escape=(x:string)=>candidatePdfText(x).replace(/([\\()])/g,'\\$1');
 const pages:string[][]=[];let commands:string[]=[],y=H-M;
 function write(value:string,x:number,baseline:number,size=BODY,font='F1',ink=INK){commands.push(`BT /${font} ${size} Tf ${ink} rg 1 0 0 1 ${n(x)} ${n(baseline)} Tm (${escape(value)}) Tj ET`);}
 function rule(x1:number,y1:number,x2:number,y2:number,ink=RULE,width=.6){commands.push(`${ink} RG ${width} w ${n(x1)} ${n(y1)} m ${n(x2)} ${n(y2)} l S`);}
 function rect(x:number,bottom:number,width:number,height:number,ink:string){commands.push(`${ink} rg ${n(x)} ${n(bottom)} ${n(width)} ${n(height)} re f`);}
 function page(){commands=[];pages.push(commands);y=H-M;rect(0,0,W,H,PAPER);write('DESTINY CODE / COMPLETE PERSONAL READING',M,y,8,'F1',GOLD);y-=17;rule(M,y,W-M,y);y-=30;}
 const width=(font:string)=>(W-M*2)*(font==='F2'?.72:1);
 const height=(value:string,size=BODY,font='F1',gap=10)=>wrapPdfText(candidatePdfText(value),width(font),size).length*size*LEADING+gap;
 function reserve(required:number){if(y-required<BOTTOM)page();}
 function text(value:string,size=BODY,font='F1',gap=10,ink=INK){const lines=wrapPdfText(candidatePdfText(value),width(font),size),leading=size*LEADING;for(let index=0;index<lines.length;){let available=Math.floor((y-BOTTOM)/leading);const remaining=lines.length-index;if(available<Math.min(2,remaining)){page();continue;}let take=Math.min(available,remaining);if(remaining-take===1){if(take<=2){page();continue;}take--;}available=take;for(let line=0;line<available;line++){write(lines[index++],M,y,size,font,ink);y-=leading;}if(index<lines.length)page();}y-=gap;}
 function heading(value:string,next:string,size=17){reserve(height(value,size,'F2')+Math.min(height(next),BODY*LEADING*3+10));text(value,size,'F2');}
 function symbol(number:number,x:number,bottom:number,size:number){const scale=size/120;for(const source of [emblemFrame,...symbolForCandidate(number).paths]){const tokens=source.match(/[MLCZ]|-?\d+(?:\.\d+)?/g)!;let output='',index=0;while(index<tokens.length){const op=tokens[index++];if(op==='Z'){output+=' h';continue;}for(let point=0;point<(op==='C'?3:1);point++){const px=Number(tokens[index++]),py=Number(tokens[index++]);output+=` ${n(x+px*scale)} ${n(bottom+(120-py)*scale)}`;}output+=op==='M'?' m':op==='L'?' l':' c';}commands.push(`q ${METAL} RG .8 w ${output} S Q`);}}
 function circle(x:number,cy:number,r:number){const k=r*.55228475;commands.push(`${PAPER} rg ${METAL} RG .8 w ${n(x+r)} ${n(cy)} m ${n(x+r)} ${n(cy+k)} ${n(x+k)} ${n(cy+r)} ${n(x)} ${n(cy+r)} c ${n(x-k)} ${n(cy+r)} ${n(x-r)} ${n(cy+k)} ${n(x-r)} ${n(cy)} c ${n(x-r)} ${n(cy-k)} ${n(x-k)} ${n(cy-r)} ${n(x)} ${n(cy-r)} c ${n(x+k)} ${n(cy-r)} ${n(x+r)} ${n(cy-k)} ${n(x+r)} ${n(cy)} c B`);}
 page();rule(M-20,108,M-20,716,METAL,.5);rule(W-M+20,108,W-M+20,716,METAL,.5);symbol(report.values.core,(W-145)/2,566,145);
 y=536;text('The art of becoming.',36,'F2',15);text(document.core.name,23,'F2',18,GOLD);text(`CENTER ${report.values.core} / ${report.dateOnly}`,12,'F1',20);text('Ten chapters and a calculation reference',10,'F1',10,MUTED);text(`${edition.toUpperCase()} EDITION${sample?' / FIXED PUBLIC SAMPLE':''}`,9,'F1',20,GOLD);text('Symbolic entertainment and self-reflection, not a scientific assessment or prediction.',10,'F1',12,MUTED);text(sample?'A fixed example of the complete reading.':'Your birth date appears in this file. Store and share it with care.',9,'F1',0,MUTED);
 page();text('Your complete Destiny Matrix',26,'F2',12);text(`Birth date / ${report.dateOnly}`,10,'F1',12,MUTED);
 const centerY=y-212,points=new Map(positionData.filter(p=>p.diagramCoordinates).map(p=>[p.id,{x:W/2+p.diagramCoordinates![0]*200,y:centerY-p.diagramCoordinates![1]*200}]));
 const edges=new Set<string>();for(const channel of channelData){const ids=channel.physicalOrder.filter(id=>points.has(id));for(let i=1;i<ids.length;i++){const key=[ids[i-1],ids[i]].sort().join(':');if(edges.has(key))continue;edges.add(key);const a=points.get(ids[i-1])!,b=points.get(ids[i])!;rule(a.x,a.y,b.x,b.y,METAL);}}
 for(const [id,p] of points){const r=id==='core'?18:['day','month','year','bottom','nw','ne','se','sw'].includes(id)?13:9;circle(p.x,p.y,r);const value=String(report.values[id]),size=id==='core'?15:10;write(value,p.x-textWidth(value,size)/2,p.y-3,size);}
 y=centerY-225;text('30 diagram positions. Family resources and the seven line/purpose totals are separate summary values, listed in the calculation reference.',10,'F1',12,MUTED);
 page();text('Inside your reading',29,'F2',20);const contentsPage=pages.length-1,rows:{y:number;index:number}[]=[];
 for(const [i,section] of document.sections.entries()){rows.push({y,index:i});write(i<10?String(i+1).padStart(2,'0'):'+',M,y,12,'F1',GOLD);const lines=wrapPdfText(section.title,W-M*2-64,14);for(const [j,line] of lines.entries())write(line,M+32,y-j*20,14,'F2');y-=lines.length*20+15;}
 const starts:number[]=[];
 for(const [i,section] of document.sections.entries()){
  reserve(height(section.title,26,'F2')+180);starts.push(pages.length);rule(M,y,W-M,y,METAL);y-=43;write(i<10?String(i+1).padStart(2,'0'):'+',M,y,36,'F2',GOLD);y-=30;text(section.title,26,'F2',12);
  for(const block of section.blocks){if(block.heading)heading(block.heading,block.text||block.detail||'',17);
   if(block.kind==='practice'&&block.text){const required=Math.min(height(block.text)+22,200);reserve(required);rect(M-9,y-required+8,W-M*2+18,required,PANEL);rule(M-9,y+8,M-9,y-required+8,METAL,1.4);text(block.text);}else if(block.text)text(block.text);
   if(block.detail)text(block.detail,10,'F1',12,MUTED);
   for(const row of block.rows){reserve(75);text(`${row.label} / ${row.number} / ${row.archetype}`,11,'F1',4,GOLD);text(row.calculation,10,'F1',12);}
  }y-=20;
 }
 const final=commands;commands=pages[contentsPage];for(const row of rows)write(String(starts[row.index]),W-M-16,row.y,11,'F1',GOLD);commands=final;
 const objects:string[]=[];objects[0]='<< /Type /Catalog /Pages 2 0 R >>';objects[1]=`<< /Type /Pages /Count ${pages.length} /Kids [${pages.map((_,i)=>`${5+i*2} 0 R`).join(' ')}] >>`;objects[2]='<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>';objects[3]='<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman /Encoding /WinAnsiEncoding >>';
 pages.forEach((content,i)=>{commands=content;rule(M,48,W-M,48);write(`${report.dateOnly} / SYMBOLIC SELF-REFLECTION`,M,31,8,'F1',MUTED);write(`${i+1} / ${pages.length}`,W-M-40,31,8,'F1',GOLD);const stream=commands.join('\n');objects[4+i*2]=`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${6+i*2} 0 R >>`;objects[5+i*2]=`<< /Length ${Buffer.byteLength(stream,'ascii')} >>\nstream\n${stream}\nendstream`;});
 let pdf='%PDF-1.4\n';const offsets=[0];objects.forEach((object,i)=>{offsets.push(Buffer.byteLength(pdf,'ascii'));pdf+=`${i+1} 0 obj\n${object}\nendobj\n`;});const xref=Buffer.byteLength(pdf,'ascii');pdf+=`xref\n0 ${objects.length+1}\n0000000000 65535 f \n${offsets.slice(1).map(o=>`${String(o).padStart(10,'0')} 00000 n \n`).join('')}trailer\n<< /Size ${objects.length+1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;return new Uint8Array(Buffer.from(pdf,'ascii'));
}
