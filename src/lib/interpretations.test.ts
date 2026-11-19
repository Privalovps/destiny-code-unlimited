import { expect, it } from 'vitest';
import { interpretation, interpretations } from './interpretations';
it('provides a unique, complete original center reading for each arcana', () => {
  expect(interpretations).toHaveLength(22);
  expect(new Set(interpretations.map(x=>x.name)).size).toBe(22);
  for(let n=1;n<=22;n++) {
    const entry=interpretation(n);
    expect(entry.number).toBe(n);
    expect(entry.description.length).toBeGreaterThan(80);
    expect(entry.strengths).toHaveLength(3);
    expect(entry.prompt.endsWith('?')).toBe(true);
    expect(entry.growth.length).toBeGreaterThan(30);
  }
  expect(interpretation(5).name).toBe('The Hierophant');
});
