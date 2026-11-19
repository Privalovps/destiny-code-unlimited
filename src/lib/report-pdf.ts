import type { PremiumReport } from './report';
import { matrixPositions } from './matrix-positions';
import { emblemFrame, symbolFor } from './arcana-symbols';
import { pdfPalettes, type PdfEdition } from './pdf-edition';

/** Small PDF 1.4 writer: standard fonts, vector paths, and ASCII text only.
 * No browser binary, external service, clock, random ID, or runtime dependency.
 */
const PAGE_W = 595.28, PAGE_H = 841.89, MARGIN = 58;
// Cover rails sit outside the full text column, including wrapped metadata.
const COVER_FRAME_GAP = 20;
export function pdfText(text: string): string {
  return text.normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[‘’]/g,"'").replace(/[“”]/g,'"').replace(/[–—]/g,'-').replace(/…/g,'...').replace(/·/g,' / ').replace(/[^\x20-\x7E\n]/g,'').replace(/[ \t]+/g,' ');
}
// Helvetica AFM widths for printable ASCII, in thousandths of an em.
const widths = [278,278,355,556,556,889,667,191,333,333,389,584,278,333,278,278,556,556,556,556,556,556,556,556,556,556,278,278,584,584,584,556,1015,667,667,722,722,667,611,778,722,278,500,667,556,833,722,778,667,778,722,667,611,722,667,944,667,667,611,278,278,278,469,556,333,556,556,500,556,556,278,556,556,222,222,500,222,833,556,556,556,556,333,500,278,556,500,722,500,500,500,334,260,334,584];
export function textWidth(text: string, size: number): number {
  return [...pdfText(text)].reduce((sum,c)=>sum+(widths[c.charCodeAt(0)-32] ?? 1000),0)*size/1000;
}
export function wrapPdfText(text: string, maxWidth: number, size: number): string[] {
  const lines: string[] = [];
  for (const paragraph of pdfText(text).split('\n')) {
    let line = '';
    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      if (line && textWidth(`${line} ${word}`,size)>maxWidth) { lines.push(line); line=''; }
      // Split an unbroken token too; no text can silently leave the page.
      if (textWidth(word,size)>maxWidth) {
        let part='';
        for (const c of word) {
          if (part && textWidth(part+c,size)>maxWidth) {lines.push(part);part='';}
          part+=c;
        }
        line=part;
      } else line=line?`${line} ${word}`:word;
    }
    if (line) lines.push(line);
  }
  return lines;
}
const escape = (text:string) => pdfText(text).replace(/([\\()])/g,'\\$1');
const n = (value:number) => value.toFixed(2);

export function generateReportPdf(report:PremiumReport,edition:PdfEdition='light'):Uint8Array {
  const palette=pdfPalettes[edition];
  if(!palette) throw new RangeError('Unknown PDF edition.');
  const color=(hex:string)=>[1,3,5].map(offset=>(parseInt(hex.slice(offset,offset+2),16)/255).toFixed(4)).join(' ');
  const INK=color(palette.ink),GOLD=color(palette.gold),METAL=color(palette.metal),PAPER=color(palette.paper),PANEL=color(palette.panel),MUTED=color(palette.muted),RULE=color(palette.rule);
  const pages:string[][]=[];
  let commands:string[]=[],y=PAGE_H-MARGIN;
  const BODY=11.5,LEADING=1.55,BOTTOM=72;
  function write(value:string,x:number,baseline:number,size=BODY,font='F1',ink=INK) {
    commands.push(`BT /${font} ${size} Tf ${ink} rg 1 0 0 1 ${n(x)} ${n(baseline)} Tm (${escape(value)}) Tj ET`);
  }
  function rule(x1:number,y1:number,x2:number,y2:number,ink=RULE,width=.6) {
    commands.push(`${ink} RG ${width} w ${n(x1)} ${n(y1)} m ${n(x2)} ${n(y2)} l S`);
  }
  function rect(x:number,bottom:number,width:number,height:number,ink:string) {
    commands.push(`${ink} rg ${n(x)} ${n(bottom)} ${n(width)} ${n(height)} re f`);
  }
  function page() {
    commands=[];pages.push(commands);y=PAGE_H-MARGIN;
    rect(0,0,PAGE_W,PAGE_H,PAPER);
    write('DESTINY CODE / LOCAL DEVELOPMENT PREVIEW',MARGIN,y,8,'F1',GOLD);
    y-=17;rule(MARGIN,y,PAGE_W-MARGIN,y);y-=30;
  }
  const maxWidth=(font:string)=>(PAGE_W-MARGIN*2)*(font==='F2'?.72:1);
  function height(value:string,size=BODY,font='F1',gap=10) {
    return wrapPdfText(value,maxWidth(font),size).length*size*LEADING+gap;
  }
  function reserve(required:number) {if(y-required<BOTTOM) page();}
  function text(value:string,size=BODY,font='F1',gap=10,ink=INK) {
    const lines=wrapPdfText(value,maxWidth(font),size);
    const leading=size*LEADING;
    // Flow paragraphs rather than moving whole paragraphs onto near-empty pages.
    // Keep at least two lines together on each side of a page break.
    for(let index=0;index<lines.length;) {
      let available=Math.floor((y-BOTTOM)/leading);
      const remaining=lines.length-index;
      if(available<Math.min(2,remaining)){page();continue;}
      let take=Math.min(available,remaining);
      if(remaining-take===1){if(take<=2){page();continue;}take--;}
      available=take;
      for(let line=0;line<available;line++){write(lines[index++],MARGIN,y,size,font,ink);y-=leading;}
      if(index<lines.length) page();
    }
    y-=gap;
  }
  function heading(value:string,next:string,size=16) {
    reserve(height(value,size,'F2',10)+Math.min(height(next),BODY*LEADING*3+10));
    text(value,size,'F2',10);
  }
  function drawSymbol(number:number,x:number,bottom:number,size:number) {
    const scale=size/120;
    const paths=[emblemFrame,...symbolFor(number).paths];
    for(const source of paths){
      const tokens=source.match(/[MLCZ]|-?\d+(?:\.\d+)?/g)!;
      let output='',index=0;
      while(index<tokens.length){
        const operation=tokens[index++];
        if(operation==='Z'){output+=' h';continue;}
        const count=operation==='C'?3:1;
        for(let point=0;point<count;point++){
          const px=Number(tokens[index++]),py=Number(tokens[index++]);
          output+=` ${n(x+px*scale)} ${n(bottom+(120-py)*scale)}`;
        }
        output+=operation==='M'?' m':operation==='L'?' l':' c';
      }
      commands.push(`q ${METAL} RG 0.8 w ${output} S Q`);
    }
  }
  function circle(x:number,cy:number,r:number) {
    const k=r*.55228475;
    commands.push(`${PAPER} rg ${METAL} RG .8 w ${n(x+r)} ${n(cy)} m ${n(x+r)} ${n(cy+k)} ${n(x+k)} ${n(cy+r)} ${n(x)} ${n(cy+r)} c ${n(x-k)} ${n(cy+r)} ${n(x-r)} ${n(cy+k)} ${n(x-r)} ${n(cy)} c ${n(x-r)} ${n(cy-k)} ${n(x-k)} ${n(cy-r)} ${n(x)} ${n(cy-r)} c ${n(x+k)} ${n(cy-r)} ${n(x+r)} ${n(cy-k)} ${n(x+r)} ${n(cy)} c B`);
  }
  function reflection(question:string) {
    const lines=wrapPdfText(question,PAGE_W-MARGIN*2-28,BODY);
    const required=lines.length*BODY*LEADING+25;
    reserve(required);
    rect(MARGIN-9,y-required+8,PAGE_W-MARGIN*2+18,required,PANEL);
    rule(MARGIN-9,y+8,MARGIN-9,y-required+8,METAL,1.4);
    y-=5;
    for(const line of lines){write(line,MARGIN+12,y);y-=BODY*LEADING;}
    y-=20;
  }
  page();
  // A real cover: original vector emblem, central value and deliberate editorial hierarchy.
  rule(MARGIN-COVER_FRAME_GAP,108,MARGIN-COVER_FRAME_GAP,716,METAL,.5);
  rule(PAGE_W-MARGIN+COVER_FRAME_GAP,108,PAGE_W-MARGIN+COVER_FRAME_GAP,716,METAL,.5);
  drawSymbol(report.matrix.E,(PAGE_W-145)/2,566,145);
  y=536;text('The art of becoming.',36,'F2',15);
  text(report.core.name,23,'F2',18,GOLD);
  text(`CENTER ${String(report.matrix.E).padStart(2,'0')} / ${report.date}`,12,'F1',20);
  text(`Eight chapters / ${report.wordCount} words / Edition ${report.version}`,10,'F1',10,MUTED);
  text(`${edition.toUpperCase()} PDF / UNPAID DEVELOPMENT EDITION`,9,'F1',20,GOLD);
  text(report.disclaimer,10,'F1',12,MUTED);
  text('This is a complete local preview, not proof of purchase. Your birth date appears in this file and its URL. Store or share it with care.',9,'F1',0,MUTED);

  page();
  text('Your Destiny Matrix',27,'F2',8);
  text(`Birth date / ${report.date}`,10,'F1',12,MUTED);
  const scale=.65,left=(PAGE_W-500*scale)/2,bottom=y-500*scale;
  const point=(x:number,py:number)=>[left+x*scale,bottom+(500-py)*scale] as const;
  const segments=[[250,55,445,250],[445,250,250,445],[250,445,55,250],[55,250,250,55],[112,112,388,112],[388,112,388,388],[388,388,112,388],[112,388,112,112],[55,250,445,250],[250,55,250,445],[112,112,388,388],[388,112,112,388]];
  for(const [x1,y1,x2,y2] of segments){const a=point(x1,y1),b=point(x2,y2);rule(a[0],a[1],b[0],b[1],METAL);}
  for(const p of matrixPositions){
    const [x,py]=point(p.x,p.y),r=p.key==='E'?25:18;
    circle(x,py,r);const value=String(report.matrix[p.key]);
    write(value,x-textWidth(value,16)/2,py-5,16);
    write(p.key,x-textWidth(p.key,8)/2,py-r-11,8,'F1',GOLD);
  }
  y=bottom-23;
  text('Nine documented values. The connecting lines add no hidden channels. Each chapter names the positions it uses.',10,'F1',16,MUTED);
  heading('Your position reference',report.positions[0].archetype,17);
  for(const p of report.positions) text(`${p.key} / ${p.number} / ${p.archetype} / ${p.lens}`,9,'F1',2);

  page();
  text('Inside your reading',29,'F2',20);
  const contentsPage=pages.length-1;
  const contentsRows:{y:number;index:number}[]=[];
  for(const [index,section] of report.sections.entries()){
    contentsRows.push({y,index});
    write(String(index+1).padStart(2,'0'),MARGIN,y,12,'F1',GOLD);
    const lines=wrapPdfText(section.title,PAGE_W-MARGIN*2-64,14);
    for(const [lineIndex,line] of lines.entries()) write(line,MARGIN+32,y-lineIndex*20,14,'F2');
    y-=lines.length*20+20;
  }
  heading('A reading, not an assignment','Begin with the blueprint.',17);
  text('Begin with the blueprint, then read the chapter that speaks most clearly to an ordinary situation. Questions and practices are invitations; you do not have to complete them in order. Use your own examples, include disagreement, and let a useful question become more specific as you read.',11,'F1',12,MUTED);
  const chapterPages:number[]=[];
  for(const [index,section] of report.sections.entries()){
    // A new chapter can share a page when there is meaningful reading space left.
    const openerHeight=height(section.title,26,'F2',12)+125;
    reserve(openerHeight+BODY*LEADING*3);
    chapterPages.push(pages.length);
    rule(MARGIN,y,PAGE_W-MARGIN,y,METAL);y-=43;
    write(String(index+1).padStart(2,'0'),MARGIN,y,36,'F2',GOLD);
    drawSymbol(report.matrix[section.positions[0]],PAGE_W-MARGIN-55,y-17,48);
    y-=30;
    text(section.title,26,'F2',12);
    text(`SOURCE POSITIONS / ${section.positions.map(p=>`${p}: ${report.matrix[p]}`).join(' / ')}`,8,'F1',15,GOLD);
    text(section.introduction,BODY,'F1',18);
    for(const block of section.blocks){
      const label=`${block.position} / ${block.number} / ${block.title}`;
      reserve(height(label,9,'F1',6)+height(block.heading,17,'F2',10)+BODY*LEADING*3);
      text(label,9,'F1',6,GOLD);
      heading(block.heading,block.paragraphs[0]??'',17);
      for(const paragraph of block.paragraphs) text(paragraph);
      for(const note of block.notes) text(note,9,'F1',12,MUTED);
      for(const reference of block.references) text(`For another perspective on ${block.title}, return to ${reference.title}.`,9,'F1',12,MUTED);
      y-=5;
    }
    heading('In context',section.detail);text(section.detail);
    heading('A practice to try',section.practice);text(section.practice);
    heading('Questions to take with you',section.questions[0]??'');
    for(const question of section.questions) reflection(question);
    y-=20;
  }
  reserve(260);rule(MARGIN,y,PAGE_W-MARGIN,y,METAL);y-=35;
  heading('The next page belongs to you.',report.conclusion,25);
  text(report.conclusion,12,'F1',18);
  heading('Methodology and source notes',report.sourceNotes[0],17);
  for(const note of report.sourceNotes) text(note,9,'F1',10,MUTED);
  text(report.disclaimer,9,'F1',0,MUTED);
  // Fill actual chapter start numbers after layout, without regenerating report content.
  const finalCommands=commands;
  commands=pages[contentsPage];
  for(const row of contentsRows) write(String(chapterPages[row.index]),PAGE_W-MARGIN-16,row.y,11,'F1',GOLD);
  commands=finalCommands;

  const objects:string[]=[];
  objects[0]='<< /Type /Catalog /Pages 2 0 R >>';
  objects[1]=`<< /Type /Pages /Count ${pages.length} /Kids [${pages.map((_,i)=>`${5+i*2} 0 R`).join(' ')}] >>`;
  objects[2]='<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>';
  objects[3]='<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman /Encoding /WinAnsiEncoding >>';
  pages.forEach((content,index)=>{
    commands=content;
    rule(MARGIN,48,PAGE_W-MARGIN,48);
    write(`${report.date} / SYMBOLIC SELF-REFLECTION`,MARGIN,31,8,'F1',MUTED);
    write(`${index+1} / ${pages.length}`,PAGE_W-MARGIN-40,31,8,'F1',GOLD);
    const stream=commands.join('\n');
    objects[4+index*2]=`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${PAGE_W} ${PAGE_H}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${6+index*2} 0 R >>`;
    objects[5+index*2]=`<< /Length ${Buffer.byteLength(stream,'ascii')} >>\nstream\n${stream}\nendstream`;
  });
  let pdf='%PDF-1.4\n';const offsets=[0];
  objects.forEach((object,index)=>{offsets.push(Buffer.byteLength(pdf,'ascii'));pdf+=`${index+1} 0 obj\n${object}\nendobj\n`;});
  const xref=Buffer.byteLength(pdf,'ascii');
  pdf+=`xref\n0 ${objects.length+1}\n0000000000 65535 f \n${offsets.slice(1).map(o=>`${String(o).padStart(10,'0')} 00000 n \n`).join('')}trailer\n<< /Size ${objects.length+1} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return new Uint8Array(Buffer.from(pdf,'ascii'));
}
