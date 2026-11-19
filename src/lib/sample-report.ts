import 'server-only';
import { generateReport } from './report';
/** The sole public full reading. No route/query/body value can select its date. */
export const SAMPLE_DATE='1993-04-17' as const;
export function getSampleReport(){return generateReport(SAMPLE_DATE);}
