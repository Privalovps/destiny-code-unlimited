import 'server-only';
import { PdfDownloads } from './pdf-downloads';
import { ArcanaEmblem } from './arcana-emblem';
import Link from 'next/link';
import { Chart } from './chart';
import { ReportCover } from './report-cover';
import { ReadingProgress } from './reading-progress';
import type { PremiumReport } from '@/lib/report';
export function FullReading({report,reportId,sample=false,development=false}:{report:PremiumReport;reportId?:string;sample?:boolean;development?:boolean}){
 const date=report.date,core=report.core;
  return <div className="shell full-report" id="report-top">
    <section className="section report-cover-layout">
      <div className="report-intro">{(sample||development)&&<div className="demo-badge">{sample?'PUBLIC SAMPLE · FIXED EXAMPLE · NOT A PURCHASE':'LOCAL DEVELOPMENT SIMULATION · UNPAID DEMO'}</div>}
        <p className="eyebrow">FULL LONG-FORM READING / EDITION {report.version}</p>
        <h1 className="page-title">The art of<br/><em>becoming.</em></h1>
        <p className="report-length">{report.wordCount.toLocaleString('en-US')} words · Eight complete chapters · About {report.readingMinutes} minutes</p>
        <p className="report-date">YOUR READING / <time dateTime={date}>{date}</time></p>
        <p>A reading that begins with {core.name}, then follows the questions in your nine-position matrix. Take your time. Keep your own experience at the center.</p>
        <div className="report-actions"><a className="button" href="#blueprint">Begin my reading ↓</a>{!sample&&<a className="text-link" href="#pdf-editions">Choose a PDF edition ↓</a>}</div>
        <div id="pdf-editions">{!sample&&reportId&&<PdfDownloads reportId={reportId}/>}</div><p className="fine">{sample?'This fixed example demonstrates all eight chapters from the same engine as a purchased reading. It does not unlock another birth date. The public sample is web-only.':'You are viewing the complete reading, not the free excerpts. Your selected birth date appears in this reading and its PDFs.'} {report.disclaimer}</p>
        <Link prefetch={false} className="text-link" href={`/result?date=${date}`}>{sample?'← Explore this example’s free matrix':'← Return to your free reading'}</Link>
      </div><ReportCover date={date} number={report.matrix.E} archetype={core.name} sample={sample}/>
    </section>
    <section className="report-matrix" aria-labelledby="matrix-title"><div><p className="eyebrow">THE ARITHMETIC / NINE POSITIONS</p><h2 id="matrix-title">One chart.<br/><em>Many questions.</em></h2><p>Every chapter names the positions it uses. Select a number to see its formula and a symbolic question. The connecting lines add no calculated channels.</p><div className="motif-list">{report.motifs.map(m=><p key={m.number}><strong>{String(m.number).padStart(2,'0')} / {m.archetype}</strong><span>{m.positions.join(' · ')}</span></p>)}</div><p className="fine">A repeated number repeats an image. It does not amplify a claim or establish a life pattern.</p><Link className="text-link" href="/methodology">Read the calculation method</Link></div><Chart matrix={report.matrix}/></section>
    <details className="method-details"><summary>Reference: all nine positions and formulas</summary><div className="position-grid">{report.positions.map(p=><article key={p.key}><h3>{p.key} / {p.number}</h3><p>{p.label}</p><p><code>{p.formula}</code></p><p>{p.archetype}</p><p className="fine">Editorial lens: {p.lens}</p></article>)}</div></details>
    <div className="full-report-layout"><aside className="report-contents"><ReadingProgress chapters={report.sections.map(({id,title})=>({id,title}))}/></aside>
      <div className="report-reading">{report.sections.map((s,index)=><section key={s.id} className={`report-chapter chapter-style-${index%3}`} id={s.id} aria-labelledby={`${s.id}-title`}>
        <header className="chapter-heading"><span className="chapter-numeral" aria-hidden="true">{String(index+1).padStart(2,'0')}</span><div><p className="eyebrow">CHAPTER {index+1} / POSITIONS {s.positions.map(p=>`${p}: ${report.matrix[p]}`).join(' · ')}</p><h2 id={`${s.id}-title`}>{s.title}</h2></div></header>
        <p className="chapter-intro">{s.introduction}</p>{s.id==='life-themes'&&<nav className="position-contents" aria-label="Nine position explanations">{s.blocks.map(block=><a key={block.position} href={`#position-${block.position}`}>{block.position} / {block.number}</a>)}</nav>}{s.aliases?.map(alias=><span key={alias} id={alias} className="chapter-anchor"/>)}
        {s.blocks.map((block,i)=><article className="reading-block" id={s.id==='life-themes'?`position-${block.position}`:undefined} key={`${block.position}-${i}`}><p className="tiny">{block.position} / ARCANA {block.number} / {block.title}</p><div className="block-heading"><ArcanaEmblem number={block.number} decorative/><h3>{block.heading}</h3></div>{block.paragraphs.map((p,j)=><p key={j}>{p}</p>)}<details className="method-details"><summary>Detailed reading: calculation, position and source</summary><p><code>{report.positions.find(position=>position.key===block.position)?.proof}</code></p><p>Position lens: {report.positions.find(position=>position.key===block.position)?.lens} · Destiny Code editorial interpretation.</p>{block.notes.map(note=><p key={note} style={{overflowWrap:'anywhere'}}>{note}</p>)}<p style={{overflowWrap:'anywhere'}}><a href={block.sourceUrl} target="_blank" rel="noreferrer">Primary tarot reference: {block.title} ↗</a></p></details>{block.references.map(reference=><p className="reading-reference fine" key={reference.id}>For another perspective on {block.title}, return to <a href={`#${reference.id}`}>{reference.title}</a>.</p>)}</article>)}
        <div className="chapter-context"><p className="tiny">BRINGING THE SYMBOLS INTO CONTEXT</p><p>{s.detail}</p></div>
        <div className="chapter-practice"><p className="tiny">A PRACTICE TO TRY</p><h3>Make it your own.</h3><p>{s.practice}</p></div>
        <div className="reflection-box"><h3>Questions to take with you</h3><ul>{s.questions.map(q=><li key={q}>{q}</li>)}</ul></div>
        <div className="chapter-pagination"><a className="text-link" href="#report-top">Reading overview ↑</a>{report.sections[index+1]&&<a className="text-link" href={`#${report.sections[index+1].id}`}>Next: {report.sections[index+1].title} ↓</a>}</div>
      </section>)}</div>
    </div>
    <section className="report-finale" aria-labelledby="finale-title"><p className="eyebrow">A QUESTION TO LIVE WITH / CENTER {report.matrix.E}</p><h2 id="finale-title">The next page<br/><em>belongs to you.</em></h2><blockquote>{report.conclusion}</blockquote><div className="report-actions">{!sample&&reportId&&<PdfDownloads reportId={reportId}/>}<Link prefetch={false} className="text-link" href={`/result?date=${date}`}>Return to your matrix ↗</Link></div></section>
    <details className="method-details"><summary>Methodology, sources and editorial attribution</summary>{report.sourceNotes.map(note=><p key={note} style={{overflowWrap:'anywhere'}}>{note}</p>)}<Link className="text-link" href="/methodology">Read the public methodology reference ↗</Link></details>
    <p className="fine report-end">{report.disclaimer}</p>
  </div>;
}
