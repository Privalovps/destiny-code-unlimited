import 'server-only';
import type { Matrix } from './numerology';
import type { Position } from './matrix-positions';
import { professionalArcanum } from './professional-arcana';
const contrasts:Record<string,string>={
 '4-5':'The Emperor examines who holds a responsibility; the Hierophant examines the principle that legitimizes it. A procedure can be well organized yet poorly explained, or ethically attractive yet impossible to administer. Ask both who is answerable and why the standard deserves to guide this task.',
 '5-22':'The Hierophant transmits an established practice; the Fool permits a first encounter before mastery. A useful apprenticeship needs both an intelligible boundary and room for an unfamiliar question. Neither rejecting the tradition immediately nor demanding complete conformity gives the new participant a fair encounter with it.',
 '8-11':'Strength asks how intensity is expressed; Justice asks how a judgment is justified. A gentle manner does not establish a fair decision, and a valid standard does not excuse a humiliating delivery. Review the evidence and the manner of response separately. These names follow the active VIII/XI convention.',
 '17-18':'The Star gives an aspiration a visible form; the Moon asks which part remains an image rather than established information. An inspiring possibility can guide a draft without becoming a promise. Identify what the vision helps you make and what would still need verification before a consequential commitment.',
 '13-21':'Death concerns the ending of a particular form; the World concerns the coherence of a completed whole. Ask whether a task needs a responsible conclusion or whether its parts have not yet been connected. An ending is not always a loss, and continued expansion is not always completion.',
 '6-15':'The Lovers examines an agreement and the values behind it; the Devil examines the incentives and costs that make an arrangement attractive. A freely stated preference can coexist with a strong desire. Clarify what was chosen, what was assumed and whether refusal remains genuinely available.',
 '7-12':'The Chariot directs effort; the Hanged Man suspends a familiar response to change the frame. Before choosing acceleration or a pause, ask whether the destination is clear and whether the present method can reach it. A useful pause informs movement instead of treating movement and reflection as permanent opposites.',
 '2-19':'The High Priestess protects an interval of receptive attention; the Sun makes a contribution visible. A thought need not remain private until perfect, nor must everything be shared immediately. Decide what is ready to be communicated and which uncertainty needs a little more examination.',
 '3-4':'The Empress cultivates the conditions of growth; the Emperor establishes responsibility and boundaries. A supportive environment needs enough structure to remain dependable and enough responsiveness to serve what is developing. Compare what the activity needs with the rule intended to protect it.',
 '9-10':'The Hermit narrows attention for careful discernment; the Wheel asks what has changed around the inquiry. A studied response still needs to meet current conditions. Review which conclusion remains supported and which depended on a setting that no longer applies.',
 '14-16':'Temperance adjusts the relation among parts; the Tower questions a premise on which the arrangement depends. Ask whether the difficulty concerns proportion or a faulty assumption. Small refinements cannot repair every premise, but a correctable imbalance does not require dismantling the whole structure.',
 '1-20':'The Magician turns an intention into a demonstrable act; Judgment reviews what an act has made clear. Put a modest attempt beside an honest account of its effect. The next contribution can then answer an actual lesson instead of making a grand promise of improvement.',
};
/** Descriptive comparisons only: no new sum, compatibility score or traditional combination program. */
export function comparePositions(matrix:Matrix,left:Position,right:Position){
 const a=professionalArcanum(matrix[left]),b=professionalArcanum(matrix[right]);
 const pair=[a.number,b.number].sort((x,y)=>x-y).join('-');
 const text=a.number===b.number
  ?`The same archetype, ${a.name}, occurs at ${left} and ${right}. Keep its theme constant while changing the task: at ${left}, ${a.positionRules[left]} At ${right}, ${b.positionRules[right]} Repetition comes from related sums, not independent evidence or greater spiritual intensity.`
  :contrasts[pair]??`${a.name} emphasizes ${a.concepts.slice(0,2).join(' and ')}, while ${b.name} emphasizes ${b.concepts.slice(0,2).join(' and ')}. At ${left}, ${a.positionRules[left]} At ${right}, ${b.positionRules[right]} Apply the two questions to the same event before deciding whether they complement or challenge one another. The difference need not describe a conflict you actually have.`;
 return {positions:[left,right] as [Position,Position],numbers:[a.number,b.number],origin:'Destiny Code editorial comparison' as const,text,derivation:`Read ${left} and ${right} separately through their existing lenses, then compare their named themes. No additional value is calculated.`};
}
