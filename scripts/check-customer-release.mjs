import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

/** Minimum reviewed Next 16 patch floor; not a substitute for a fresh dependency advisory review. */
export function assertCustomerRelease(nextVersion,nodeVersion){
 const next=/^16\.(\d+)\.(\d+)$/.exec(nextVersion);
 if(!next||Number(next[1])<4||(Number(next[1])===4&&Number(next[2])<5))throw new Error('Public deployment blocked: install a reviewed Next.js 16 release at least 16.4.5 and regenerate package-lock.json before building.');
 if(Number(nodeVersion.split('.')[0])!==24)throw new Error('Customer deployment requires Node.js 24.x.');
}
if(process.argv[1]&&import.meta.url===pathToFileURL(process.argv[1]).href){
 try{
  const next=JSON.parse(readFileSync(new URL('../node_modules/next/package.json',import.meta.url),'utf8'));
  assertCustomerRelease(next.version,process.versions.node);
  process.stdout.write('Customer release dependency floor passed. Review current advisories before publication.\n');
 }catch(error){process.stderr.write((error instanceof Error?error.message:'Customer release validation failed.')+'\n');process.exitCode=1;}
}
