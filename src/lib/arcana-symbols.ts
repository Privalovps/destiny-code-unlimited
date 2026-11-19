/** Original geometric emblems, not reproductions of tarot illustrations. M/L/C/Z paths share a 120-unit frame with the PDF. */
export function circlePath(x:number,y:number,r:number):string {
  const k=r*0.55228475;
  return `M ${x+r} ${y} C ${x+r} ${y+k} ${x+k} ${y+r} ${x} ${y+r} C ${x-k} ${y+r} ${x-r} ${y+k} ${x-r} ${y} C ${x-r} ${y-k} ${x-k} ${y-r} ${x} ${y-r} C ${x+k} ${y-r} ${x+r} ${y-k} ${x+r} ${y} Z`;
}
export const emblemFrame='M 22 8 L 98 8 L 112 22 L 112 98 L 98 112 L 22 112 L 8 98 L 8 22 Z';
export type ArcanaSymbol={motif:string;paths:readonly string[]};
export const arcanaSymbols:readonly ArcanaSymbol[]=[
  {motif:'A wand above a working table',paths:['M 31 75 L 89 75 M 38 75 L 34 96 M 82 75 L 86 96 M 43 64 L 76 31 M 73 27 L 81 35 M 44 38 L 44 50 M 38 44 L 50 44',circlePath(70,63,5)]},
  {motif:'Twin pillars holding a veil and crescent',paths:['M 28 94 L 28 34 L 38 34 L 38 94 M 82 94 L 82 34 L 92 34 L 92 94 M 38 40 C 52 63 68 63 82 40 M 66 23 C 49 30 49 48 66 52 C 59 44 59 31 66 23 M 23 96 L 97 96']},
  {motif:'A sprouting stem in a generous vessel',paths:['M 60 69 L 60 32 C 37 29 33 50 60 53 M 60 43 C 86 27 91 51 60 59 M 35 71 L 85 71 C 80 103 40 103 35 71 Z M 30 67 L 90 67 M 47 24 L 60 17 L 73 24']},
  {motif:'A crowned throne with a square foundation',paths:['M 33 97 L 33 38 L 87 38 L 87 97 M 27 58 L 41 58 L 41 77 L 79 77 L 79 58 L 93 58 M 41 77 L 41 97 M 79 77 L 79 97 M 44 31 L 41 20 L 53 26 L 60 15 L 67 26 L 79 20 L 76 31 Z']},
  {motif:'An open book beneath a bridge of shared learning',paths:['M 27 51 C 42 45 50 47 60 54 C 70 47 78 45 93 51 L 93 91 C 78 85 70 87 60 95 C 50 87 42 85 27 91 Z M 60 54 L 60 95 M 32 38 C 32 13 88 13 88 38 M 45 36 L 45 29 M 75 36 L 75 29']},
  {motif:'Two distinct ribbons meeting at a chosen crossing',paths:['M 35 25 C 13 42 43 56 60 69 C 77 56 107 42 85 25 M 35 25 C 61 11 69 42 60 52 C 51 42 59 11 85 25 M 60 69 L 60 101 M 39 83 L 60 101 L 81 83']},
  {motif:'A canopy and two wheels guided in one direction',paths:['M 30 77 L 35 45 L 85 45 L 90 77 Z M 37 45 L 37 26 L 83 26 L 83 45 M 60 33 L 60 70 M 51 61 L 60 70 L 69 61',circlePath(41,87,9),circlePath(79,87,9)]},
  {motif:'A lion-like mane held within a gentle curve',paths:['M 60 24 L 78 31 L 90 49 L 86 75 L 72 94 L 48 94 L 34 75 L 30 49 L 42 31 Z M 45 50 L 50 55 M 75 50 L 70 55 M 50 69 C 55 79 65 79 70 69 M 60 60 L 60 68 M 23 32 C 35 15 51 16 60 24']},
  {motif:'A lantern beside a solitary staff',paths:['M 44 45 L 76 45 L 81 84 L 39 84 Z M 46 45 L 46 35 C 46 17 74 17 74 35 L 74 45 M 60 53 L 60 74 M 52 63 L 68 63 M 93 24 L 93 98 M 38 91 L 82 91']},
  {motif:'A wheel with eight measured spokes',paths:[circlePath(60,60,34),circlePath(60,60,10),'M 60 26 L 60 50 M 60 70 L 60 94 M 26 60 L 50 60 M 70 60 L 94 60 M 36 36 L 53 53 M 67 67 L 84 84 M 84 36 L 67 53 M 53 67 L 36 84']},
  {motif:'Balanced scales on an upright standard',paths:['M 60 21 L 60 98 M 29 43 L 91 43 M 35 43 L 23 70 L 47 70 Z M 85 43 L 73 70 L 97 70 Z M 46 98 L 74 98 M 54 28 L 60 20 L 66 28']},
  {motif:'A suspended figure changing its angle',paths:['M 26 25 L 94 25 M 60 25 L 60 48 L 78 63 L 64 72 M 60 48 L 43 67 L 56 67 M 60 48 L 60 79',circlePath(60,91,9)]},
  {motif:'A pruned stem with a new leaf',paths:['M 35 94 L 63 65 L 63 30 M 54 30 L 72 30 M 63 65 C 82 36 100 58 73 73 M 35 94 C 46 76 57 77 68 80 M 36 38 L 84 86 M 31 34 L 39 42']},
  {motif:'Two vessels joined by a measured stream',paths:['M 24 30 L 51 30 L 48 52 L 28 52 Z M 69 73 L 96 73 L 92 97 L 73 97 Z M 40 57 C 40 71 80 53 80 68 M 48 58 C 48 65 88 51 88 67 M 30 24 L 45 24 M 75 67 L 90 67']},
  {motif:'A chain with an opened link',paths:['M 41 39 C 25 23 10 44 26 59 L 43 76 C 58 91 76 74 61 59 M 60 60 C 45 45 63 27 78 42 L 93 57 C 104 68 96 81 85 82 M 43 45 L 76 78 M 80 85 L 84 94']},
  {motif:'An opened tower and a questioned roof',paths:['M 36 98 L 39 49 L 80 49 L 84 98 Z M 47 96 L 47 71 L 57 71 L 57 96 M 67 62 L 74 62 M 30 39 L 45 24 L 63 33 L 79 22 L 92 36 M 75 16 L 61 41 L 73 41 L 59 65']},
  {motif:'An eight-point star above quiet water',paths:['M 60 20 L 66 44 L 87 34 L 76 55 L 100 61 L 76 67 L 87 88 L 66 77 L 60 101 L 54 77 L 33 88 L 44 67 L 20 61 L 44 55 L 33 34 L 54 44 Z M 25 104 L 95 104']},
  {motif:'A crescent above three uncertain tides',paths:['M 72 18 C 30 16 25 65 63 73 C 44 55 49 32 72 18 Z M 25 82 C 38 72 45 92 59 82 C 72 72 80 92 95 82 M 25 96 C 38 86 45 106 59 96 C 72 86 80 106 95 96']},
  {motif:'A clear sun with twelve outward rays',paths:[circlePath(60,60,22),'M 60 18 L 60 30 M 60 90 L 60 102 M 18 60 L 30 60 M 90 60 L 102 60 M 30 30 L 39 39 M 81 81 L 90 90 M 90 30 L 81 39 M 39 81 L 30 90 M 40 22 L 45 34 M 80 22 L 75 34 M 40 98 L 45 86 M 80 98 L 75 86']},
  {motif:'An open trumpet calling a considered response',paths:['M 26 62 L 57 50 L 57 80 L 26 68 Z M 57 50 L 77 32 L 77 98 L 57 80 M 34 69 L 40 87 L 51 83 L 47 65 M 87 49 L 101 42 M 89 65 L 106 65 M 87 81 L 101 88']},
  {motif:'An encompassing wreath with four open gates',paths:['M 46 23 C 17 43 20 85 46 98 M 74 23 C 103 43 100 85 74 98 M 38 33 L 47 40 M 29 50 L 42 53 M 28 70 L 41 68 M 36 88 L 47 80 M 82 33 L 73 40 M 91 50 L 78 53 M 92 70 L 79 68 M 84 88 L 73 80 M 60 19 L 60 30 M 60 90 L 60 101 M 45 60 L 60 44 L 75 60 L 60 76 Z']},
  {motif:'An open path, walking staff and small satchel',paths:['M 26 99 C 91 88 27 66 77 37 M 40 20 L 94 73 M 72 47 L 88 40 L 98 55 L 82 63 Z M 45 89 L 36 72 M 23 39 L 37 39 M 30 32 L 30 46']},
];
export function symbolFor(number:number):ArcanaSymbol {
  if(!Number.isInteger(number)||number<1||number>22) throw new RangeError('Expected an arcana from 1 through 22.');
  return arcanaSymbols[number-1];
}
