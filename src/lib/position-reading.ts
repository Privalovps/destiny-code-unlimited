import type { Matrix } from './numerology';
import { matrixPositions, type Position } from './matrix-positions';
import { interpretation } from './interpretations';

/** Public chart commentary uses only the original free interpretations. */
export function positionReading(matrix: Matrix, key: Position) {
  const position = matrixPositions.find(p=>p.key===key)!;
  const arcana = interpretation(matrix[key]);
  const inputs: Record<Position,string> = {
    A:'the day digits when the day exceeds 22', B:'the calendar month, preserved as entered',
    C:'the sum of the four year digits, reduced only above 22',
    D:`${matrix.A} + ${matrix.B} + ${matrix.C}`, E:`${matrix.A} + ${matrix.B} + ${matrix.C} + ${matrix.D}`,
    NW:`${matrix.A} + ${matrix.B}`, NE:`${matrix.B} + ${matrix.C}`, SE:`${matrix.C} + ${matrix.D}`, SW:`${matrix.D} + ${matrix.A}`,
  };
  return {...position, number:matrix[key], arcana, calculation:`${position.formula} = ${matrix[key]}`, inputs:inputs[key],
    reflection:`Through the editorial lens of ${position.lens.toLowerCase()}, ${arcana.name} asks: ${arcana.prompt}`};
}
