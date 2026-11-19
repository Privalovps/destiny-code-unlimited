import { CandidateEmblem } from './candidate-emblem';
import { ArcanaEmblem } from './arcana-emblem';

export function ReportCover({date,number,archetype,sample=false,numbering='legacy',full=false}:{date:string;number:number;archetype:string;sample?:boolean;numbering?:'legacy'|'candidate';full?:boolean}) {
  return <div className="personal-report-cover" aria-label={`${sample?'Fictional sample':'Personalized'} report cover for ${date}, center ${number}, ${archetype}`}>
    <span className="tiny">DESTINY CODE / THE PREMIUM EDITION</span>
    <div className="cover-orbit" aria-hidden="true">{numbering==='candidate'?<CandidateEmblem number={number} name={archetype} decorative/>:<ArcanaEmblem number={number} decorative/>}<span>{String(number).padStart(2,'0')}</span></div>
    <p className="personal-cover-title">The art of<br/><em>becoming.</em></p>
    <p className="cover-archetype">{archetype}</p>
    <div className="personal-cover-footer"><time dateTime={date}>{date}</time><span>{sample?'FICTIONAL SAMPLE':full?'PERSONAL READING':'PERSONALIZED PREVIEW'}</span></div>
    <p className="fine">Symbolic reflection · Not a prediction</p>
  </div>;
}
