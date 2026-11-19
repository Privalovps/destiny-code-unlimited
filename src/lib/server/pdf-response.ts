import 'server-only';
import { privateHeaders } from './personal-response';
/** Buffered Node.js PDF response, bounded below the deployment provider's payload ceiling. */
export const MAX_PDF_BYTES=4_000_000;
export function privatePdfResponse(pdf:Uint8Array,filename:string){
 if(pdf.byteLength>MAX_PDF_BYTES)return new Response('This report could not be downloaded. Please try again later.',{status:503,headers:privateHeaders});
 if(!/^[a-z0-9][a-z0-9._-]{0,180}\.pdf$/.test(filename))throw new Error('Invalid PDF filename.');
 return new Response(new Uint8Array(pdf),{headers:{...privateHeaders,'Content-Type':'application/pdf','Content-Disposition':`attachment; filename="${filename}"`}});
}
