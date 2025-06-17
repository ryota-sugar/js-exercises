export const sum = (a?: number[]): number => {
  if (!a || a.length === 0) {
    return 0;
  }
  return a.reduce((accumulator, currentValue) => {
    return accumulator + currentValue;
  }, 0);
};

export const join = (
  array?: (string | number | null)[],
  separator?: string
): string | null => {
  if (!array) {
    throw new Error();
  }
  if (array.length === 0) {
    return "";
  }
  // separatorがundefinedの場合は,を使用
  if (separator === undefined) {
    separator = ",";
  }
  return array.reduce<string>((accumulator, currentValue, index) => {
    // 最初の要素の場合は、separatorを付けずにそのまま返す
    if (index === 0) {
      return currentValue === null ? "" : String(currentValue);
    }
    return (
      accumulator +
      separator +
      (currentValue === null ? "" : String(currentValue))
    );
  }, "");
};

export const reverse = (
  array?: (string | number | null)[]
): (string | number | null)[] => {
  if (!array) {
    throw new Error();
  }
  if (array.length === 0) {
    return [];
  }
  return array.reduce<(string | number | null)[]>(
    (acc, cur) => [cur, ...acc],
    []
  );
};

export const every = (
  array?: (number | null)[],
  callback?: (value: number, index: number, array: (number | null)[]) => boolean
): boolean => {
  if (!array || !callback) {
    throw new Error();
  }
  return array.reduce<boolean>((accumulator, currentValue, index, array) => {
    // accumulatorがfalseならその時点でfalseを返す
    if (!accumulator) return false;
    // undefinedやnullはfalseとして扱う
    if (currentValue === null || currentValue === undefined) return false;
    return callback(currentValue, index, array);
  }, true);
};

export const some = <T>(
  array?: (number | null)[],
  callback?: (
    value: number | null,
    index: number,
    array?: (number | null)[]
  ) => boolean
): boolean => {
  if (!array || !callback) {
    throw new Error();
  }
  return array.reduce<boolean>((accumulator, currentValue, index, array) => {
    // すでにtrueなら以降もtrue
    if (accumulator) return true;
    return callback(currentValue, index, array);
  }, false);
};
