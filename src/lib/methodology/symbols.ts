import { symbolFor } from '../arcana-symbols';
/** Reuse original artwork with the candidate's Justice VIII / Strength XI convention. */
export const symbolForCandidate=(number:number)=>symbolFor(number===8?11:number===11?8:number);
