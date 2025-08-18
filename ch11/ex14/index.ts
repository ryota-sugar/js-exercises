const normalizeJapanese = (str: string): string => {
  // ひらがな→カタカナ変換し、同一の文字として扱う(U+3041～U+3096)(U+30A1～U+30F6)に変換
  str = str.replace(/[\u3041-\u3096]/g, (s) =>
    String.fromCharCode(s.charCodeAt(0) + 0x60)
  );
  // NFKC正規化（小書き文字や濁点・半濁点を通常文字に統一して同一の文字として扱う）
  return str.normalize("NFKC");
};

export const sortJapanese = (array: string[]): string[] => {
  const collator = new Intl.Collator("ja-JP", { sensitivity: "base" });
  return [...array].sort((a, b) =>
    collator.compare(normalizeJapanese(a), normalizeJapanese(b))
  );
};

export const toJapaneseDateString = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    era: "long",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timeZone: "Asia/Tokyo",
  };
  const str = date.toLocaleDateString("ja-JP-u-ca-japanese", options);
  // 和暦〇〇/×/△ の形式のため、年月日の形式に変換
  return str.replace(/(\D+)(\d+)\/(\d+)\/(\d+)/, "$1$2年$3月$4日");
};
