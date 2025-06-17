export const bubbleSort = (array: number[]): number[] => {
  for (let i = 0; i < array.length - 1; i++) {
    // iが増えるにつれて、最後の配列の要素はソート済みになるため、参照しなくなる
    for (let j = 0; j < array.length - 1 - i; j++) {
      if (array[j] > array[j + 1]) {
        //swapさせる
        const temp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = temp;
      }
    }
  }
  return array;
};
