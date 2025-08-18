type Url = {
  base: string;
  additionalQuery?: [string, string][];
  path?: string;
};

export const modifyUrl = (url: Url): string => {
  // baseからURLを生成
  const urlObj = new URL(url.base);
  // 追加のクエリパラメータがあれば、searchParamsに追加
  if (url.additionalQuery) {
    url.additionalQuery.forEach(([key, value]) => {
      urlObj.searchParams.append(key, value);
    });
  }
  // pathが指定されていれば、ベースURLのoriginに対して新しいパスを設定
  if (url.path) {
    urlObj.pathname = new URL(url.path, urlObj.origin).pathname;
  }
  // 変更後のURL文字列を返す
  return urlObj.toString();
};
