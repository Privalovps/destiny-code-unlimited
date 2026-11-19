import { describe,it,expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { assertCustomerRelease } from '../../../scripts/check-customer-release.mjs';
import config from '../../../next.config';
import pkg from '../../../package.json';
import lock from '../../../package-lock.json';
import vercel from '../../../vercel.json';
describe('customer deployment policy',()=>{
 it('preserves Webpack and pins the cloud runtime/install without changing dependencies',()=>{
  expect(pkg.scripts.dev).toBe('next dev --webpack');expect(pkg.scripts.build).toBe('next build --webpack');expect(pkg.scripts.prebuild).toBe('node scripts/check-customer-release.mjs');expect(pkg.engines.node).toBe('24.x');expect(lock.packages[''].engines.node).toBe('24.x');expect(vercel.installCommand).toBe('npm ci');expect(vercel.buildCommand).toBe('npm run build');
 });
 it('blocks known outdated/unreviewed framework lines before any cloud build begins',()=>{
  for(const next of ['16.2.0','16.4.4','16.4.5-canary.0','17.0.0'])expect(()=>assertCustomerRelease(next,'24.20.0')).toThrow();expect(()=>assertCustomerRelease('16.4.5','24.20.0')).not.toThrow();expect(()=>assertCustomerRelease('16.4.5','22.0.0')).toThrow();
 });
 it('keeps customer DOB and private report namespaces private and nonindexed',async()=>{
  const policies=await config.headers!();for(const source of ['/result','/report/:path*']){const policy=policies.find(p=>p.source===source);expect(policy?.headers).toContainEqual({key:'Cache-Control',value:'private, no-store'});expect(policy?.headers).toContainEqual({key:'X-Robots-Tag',value:'noindex, nofollow'});}
 });
 it('excludes local secrets, build output and private PDF exports from source/upload',()=>{
  const root=new URL('../../../',import.meta.url);
  for(const file of ['.gitignore','.vercelignore']){const text=readFileSync(new URL(file,root),'utf8');for(const entry of ['.env*','node_modules/','.next/','.vercel/','*.pdf','private-reports/'])expect(text).toContain(entry);}
 });
});
