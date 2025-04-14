export const isEqual = (a, b) => {
  const deviation = 1e-10;
  if (Math.abs(a - b) < deviation) {
    return true;
  }
  return false;
};
