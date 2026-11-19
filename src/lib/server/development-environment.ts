/** Shared environment boundary for local-only tools; host/origin checks remain mandatory at entry points. */
export type DevelopmentEnvironment=Record<string,string|undefined>;
const hostedMarkers=['VERCEL','VERCEL_ENV','NETLIFY','CONTEXT','CF_PAGES','RENDER','RENDER_EXTERNAL_URL','RAILWAY_ENVIRONMENT','RAILWAY_ENVIRONMENT_ID','FLY_APP_NAME','AWS_LAMBDA_FUNCTION_NAME','K_SERVICE','CI'];
export function localDevelopmentEnvironment(env:DevelopmentEnvironment=process.env){return env.NODE_ENV==='development'&&!hostedMarkers.some(key=>Boolean(env[key]));}
