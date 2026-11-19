export function PdfDownloads({reportId}:{reportId:string}) {
  return <div><div className="pdf-downloads" aria-label="Choose a PDF edition">
    <a className="button" href={`/report/${reportId}/pdf?edition=light`} download>Download Light PDF <span aria-hidden="true">↓</span></a>
    <a className="button pdf-secondary" href={`/report/${reportId}/pdf?edition=dark`} download>Download Dark PDF <span aria-hidden="true">↓</span></a>
  </div><p className="pdf-edition-note">The complete reading in either edition. Choose independently of your screen theme.</p></div>;
}
