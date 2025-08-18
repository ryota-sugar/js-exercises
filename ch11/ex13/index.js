export function stringifyJSON(json) {
  if (json === null) {
    return "null";
  }
  if (typeof json === "boolean") {
    return json ? "true" : "false";
  }
  if (typeof json === "number") {
    // JSON.stringifyはNaN, Infinity, -Infinityをnullにするため、チェックする
    return Number.isFinite(json) ? String(json) : "null";
  }
  if (typeof json === "string") {
    // 特殊な文字をJSON形式に変換する
    const meta = {
      "\b": "\\b",
      "\t": "\\t",
      "\n": "\\n",
      "\f": "\\f",
      "\r": "\\r",
      '"': '\\"',
      "\\": "\\\\",
    };

    // その他の制御文字(改行、タブなど)(文字コード 0x00~0x1f)とダブルクォート、バックスラッシュの正規表現
    // eslint-disable-next-line no-control-regex
    const patternString = /[\\"\u0000-\u001F]/g;

    // 正規表現にマッチする文字を一つずつ取り出して置換する
    return (
      '"' +
      json.replace(patternString, function (matchedChar) {
        const escaped = meta[matchedChar];
        // metaに存在する文字はそれに置換
        if (typeof escaped === "string") {
          return escaped;
        }
        // それ以外の制御文字は \uXXXX 形式にエスケープ
        return (
          "\\u" + ("0000" + matchedChar.charCodeAt(0).toString(16)).slice(-4)
        );
      }) +
      '"'
    );
  }

  if (typeof json === "object") {
    // toJSONメソッドを持つオブジェクトはtoJSONを呼び出してその戻り値を変換する
    if (typeof json.toJSON === "function") {
      return stringifyJSON(json.toJSON());
    }

    if (Array.isArray(json)) {
      const elements = json.map((element) => {
        // 配列内の変換不可能な値はnullとして扱う
        const stringified = stringifyJSON(element);
        return stringified === undefined ? "null" : stringified;
      });
      return `[${elements.join(",")}]`;
    }

    const pairs = [];
    for (const key in json) {
      // 継承されたプロパティを無視
      if (Object.prototype.hasOwnProperty.call(json, key)) {
        const stringifiedjson = stringifyJSON(json[key]);
        // 値が変換不可能な場合、そのキーと値のペアは無視する
        if (stringifiedjson !== undefined) {
          pairs.push(`${stringifyJSON(key)}:${stringifiedjson}`);
        }
      }
    }
    return `{${pairs.join(",")}}`;
  }

  // undefined, function, symbolは変換不可能なのでundefinedを返す
  return undefined;
}
