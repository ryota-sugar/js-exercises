export const reverse = (str: string): string => {
  const result = [];
  const segmenter = new Intl.Segmenter("ja", { granularity: "grapheme" });
  for (const segment of segmenter.segment(str)) {
    result.unshift(segment.segment);
  }
  return result.join("");
};
