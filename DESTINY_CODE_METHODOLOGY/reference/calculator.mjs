/** Reference calculator, detached from an application. No dependencies. */
export function reduce22(input) {
  if (!Number.isSafeInteger(input) || input < 1) throw new Error('Expected a positive safe integer');
  let value = input;
  while (value > 22) value = [...String(value)].reduce((sum, digit) => sum + Number(digit), 0);
  return value;
}
export function parseDateOnly(input) {
  if (typeof input !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(input)) throw new Error('Expected YYYY-MM-DD');
  const [year, month, day] = input.split('-').map(Number);
  const leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  const lengths = [31,leap ? 29 : 28,31,30,31,30,31,31,30,31,30,31];
  if (year < 1 || year > 9999 || month < 1 || month > 12 || day < 1 || day > lengths[month-1]) throw new Error('Invalid Gregorian date');
  return {year, month, day};
}
export function calculate(date, rules, profile = 'C-family-center-v1') {
  if (!['C-family-center-v1','AB-personal-center-v1'].includes(profile)) throw new Error('Unknown research profile');
  const {year,month,day} = parseDateOnly(date);
  const raw = {yearNumber:year, monthOfYear:month, dayOfMonth:day};
  const values = {}; const trace = [];
  for (const rule of rules) {
    const inputs = profile === 'AB-personal-center-v1' && /^(nw|ne|se|sw)_inner$/.test(rule.id)
      ? [rule.id.split('_')[0], 'core'] : rule.inputs;
    const operands = inputs.map(id => {
      const value = values[id] ?? raw[id];
      if (value === undefined) throw new Error('Unknown dependency: '+id);
      return value;
    });
    let rawValue;
    if (rule.operation === 'digit_sum_then_reduce') rawValue = [...String(operands[0])].reduce((sum,digit)=>sum+Number(digit),0);
    else if (rule.operation === 'identity' || rule.operation === 'reduce') rawValue = operands[0];
    else if (rule.operation === 'sum_reduce') rawValue = operands.reduce((sum,value)=>sum+value,0);
    else throw new Error('Unsupported operation: '+rule.operation);
    const steps=[rawValue]; while(steps.at(-1)>22) steps.push([...String(steps.at(-1))].reduce((s,d)=>s+Number(d),0));
    const result=reduce22(rawValue); values[rule.id]=result;
    trace.push({formulaId:rule.id,inputs,operands,rawValue,reductionSteps:steps,result});
  }
  return {date,calculationProfile:profile,methodologyVersion:'dc-symbolic-1.0.0-proposed',values,trace};
}
