// slice関数を使うことで新しい配列を作成
export const pop = (array: any[]): any => {
  if (array.length === 0) {
    return [];
  }
  return array.slice(0, array.length - 1);
};

// スプレッド構文を使うことで新しい配列を作成
export const push = (array: any[], element: any): any[] => {
  return [...array, element];
};

export const shift = (array: any[]): any => {
  if (array.length === 0) {
    return [];
  }
  return array.slice(1);
};

export const unshift = (array: any[], element: any): any[] => {
  return [element, ...array];
};

export const sort = (
  array: any[],
  callback: (a: any, b: any) => number
): any[] => {
  return [...array].sort(callback);
};
