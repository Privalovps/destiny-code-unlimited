import { localDevelopmentEnvironment } from './server/development-environment';
/** Legacy display-only hint. Never use this as report or PDF authorization. */
export function isLocalReportPreview(env:Record<string,string|undefined>=process.env){return localDevelopmentEnvironment(env)&&env.DESTINY_CODE_LOCAL_PREVIEW==='1';}
