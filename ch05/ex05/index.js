export const getEvenObjects = (obj) => {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value % 2 === 0) {
      result[key] = value;
    }
  }
  return result;
};
