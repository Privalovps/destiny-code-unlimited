import type { Matrix } from './numerology';
export type Position = keyof Matrix;
export const matrixPositions = [
  {key:'A', label:'Left · day', formula:'reduce22(day)', lens:'Starting point', x:55,y:250},
  {key:'B', label:'Top · month', formula:'month', lens:'Practice', x:250,y:55},
  {key:'C', label:'Right · year digits', formula:'reduce22(sum of year digits)', lens:'Resources', x:445,y:250},
  {key:'D', label:'Bottom · synthesis', formula:'reduce22(A + B + C)', lens:'Integration into action', x:250,y:445},
  {key:'E', label:'Center · combined sum', formula:'reduce22(A + B + C + D)', lens:'Integrating question', x:250,y:250},
  {key:'NW', label:'Northwest · adjacent sum', formula:'reduce22(A + B)', lens:'Practice meeting initiative', x:112,y:112},
  {key:'NE', label:'Northeast · adjacent sum', formula:'reduce22(B + C)', lens:'Listening across differences', x:388,y:112},
  {key:'SE', label:'Southeast · adjacent sum', formula:'reduce22(C + D)', lens:'Resources meeting action', x:388,y:388},
  {key:'SW', label:'Southwest · adjacent sum', formula:'reduce22(D + A)', lens:'Agency within connection', x:112,y:388},
] as const satisfies readonly {key:Position;label:string;formula:string;lens:string;x:number;y:number}[];
