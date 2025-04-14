export const slice = (str, indexStart, indexEnd) => {
  if (!indexStart) {
    indexStart = 0;
  }
  if (!indexEnd) {
    if (indexEnd === undefined) {
      indexEnd = str.length;
    } else {
      indexEnd = 0;
    }
  }
  if (indexStart < 0) {
    indexStart = str.length + indexStart;
  }
  if (indexEnd < 0) {
    indexEnd = str.length + indexEnd;
  }
  if (indexStart >= indexEnd || indexStart > str.length) {
    return "";
  }
  return str.substring(indexStart, indexEnd);
};
