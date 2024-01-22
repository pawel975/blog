/**
 *
 * @param arr array to swap places of elements inside
 * @param firstElIndex index of first element to swap
 * @param secondElIndex index of second element to swap
 * @returns modified array with swaped places of first and second element
 */
function swapElements<T>(arr: T[], firstElIndex: number, secondElIndex: number): T[] {
  const arrCopy = [...arr];

  let temp = arrCopy[firstElIndex];
  arrCopy[firstElIndex] = arrCopy[secondElIndex];
  arrCopy[secondElIndex] = temp;

  return arrCopy;
}

export default swapElements;
