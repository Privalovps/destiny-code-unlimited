/** Dependency-free validator for every keyword used by this package's seven JSON Schemas.
 * Rejects unsupported keywords rather than silently weakening a later schema. */
export type Schema={ [key:string]:unknown };
const keywords=new Set(['$schema','type','required','properties','additionalProperties','items','oneOf','const','enum','minItems','maxItems','uniqueItems','minimum','maximum','minLength','pattern','minProperties','maxProperties']);
export function validateSchema(value:unknown,schema:Schema,path='$'):void {
 for(const key of Object.keys(schema))if(!keywords.has(key))throw new Error(`Unsupported schema keyword: ${key}`);
 if(schema.oneOf){const branches=schema.oneOf as Schema[];let matches=0;for(const branch of branches){try{validateSchema(value,branch,path);matches++;}catch{ /* branch mismatch */ }}if(matches!==1)throw new Error(`${path}: oneOf`);}
 if('const' in schema&&JSON.stringify(value)!==JSON.stringify(schema.const))throw new Error(`${path}: const`);
 if(schema.enum&&!(schema.enum as unknown[]).some(x=>JSON.stringify(x)===JSON.stringify(value)))throw new Error(`${path}: enum`);
 if(schema.type){const actual=value===null?'null':Array.isArray(value)?'array':typeof value;const wanted=schema.type;if(wanted==='integer'?!(typeof value==='number'&&Number.isInteger(value)):actual!==wanted)throw new Error(`${path}: expected ${wanted}`);}
 if(typeof value==='number'){if(!Number.isFinite(value)||(typeof schema.minimum==='number'&&value<schema.minimum)||(typeof schema.maximum==='number'&&value>schema.maximum))throw new Error(`${path}: numeric bounds`);}
 if(typeof value==='string'){if((typeof schema.minLength==='number'&&[...value].length<schema.minLength)||(typeof schema.pattern==='string'&&!new RegExp(schema.pattern).test(value)))throw new Error(`${path}: string bounds`);}
 if(Array.isArray(value)){
  if((typeof schema.minItems==='number'&&value.length<schema.minItems)||(typeof schema.maxItems==='number'&&value.length>schema.maxItems))throw new Error(`${path}: array length`);
  if(schema.uniqueItems&&new Set(value.map(x=>JSON.stringify(x))).size!==value.length)throw new Error(`${path}: uniqueItems`);
  if(schema.items)value.forEach((item,i)=>validateSchema(item,schema.items as Schema,`${path}[${i}]`));
 }
 if(value!==null&&typeof value==='object'&&!Array.isArray(value)){
  const object=value as Record<string,unknown>,properties=(schema.properties??{}) as Record<string,Schema>;
  if((typeof schema.minProperties==='number'&&Object.keys(object).length<schema.minProperties)||(typeof schema.maxProperties==='number'&&Object.keys(object).length>schema.maxProperties))throw new Error(`${path}: property count`);
  for(const key of (schema.required??[]) as string[])if(!(key in object))throw new Error(`${path}.${key}: required`);
  for(const [key,item] of Object.entries(object)){if(properties[key])validateSchema(item,properties[key],`${path}.${key}`);else if(schema.additionalProperties===false)throw new Error(`${path}.${key}: extra property`);else if(typeof schema.additionalProperties==='object')validateSchema(item,schema.additionalProperties as Schema,`${path}.${key}`);}
 }
}
