export type PdfEdition='light'|'dark';
/** Presentation only. This selector never grants access to a report. */
export function parsePdfEdition(value:string|null):PdfEdition|null {
  return value===null||value==='light'?'light':value==='dark'?'dark':null;
}
export const pdfPalettes={
  light:{paper:'#F8F4EC',ink:'#2A1B30',muted:'#65586B',gold:'#735329',metal:'#A38247',panel:'#F0E9DE',rule:'#D7CBB8'},
  dark:{paper:'#130D1B',ink:'#F5ECDF',muted:'#B9ADBF',gold:'#D8B977',metal:'#D8B977',panel:'#26172E',rule:'#6D5744'},
} as const;
