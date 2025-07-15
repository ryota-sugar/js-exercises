export const f = new Function(
  "equation",
  `
    const args = Array.from({ length: 10 }, (_, i) => '$' + (i + 1));
    const usedArgs = args.filter(arg => equation.includes(arg));

    let realEquation = equation;
    usedArgs.forEach((arg, idx) => {
      const reg = new RegExp('\\\\' + arg + '\\\\b', 'g');
      realEquation = realEquation.replace(reg, '_' + (idx + 1));
    });

    const finalArgs = usedArgs.map((_, idx) => '_' + (idx + 1));

    const isBlock = realEquation.trim().startsWith('{');

    return new Function(...finalArgs, isBlock ? realEquation : 'return ' + realEquation);
  `
);
// 最初に引数として文字列式を受け取る
// そして、式に含まれる引数を置換して新しい関数を生成する
// 手順
// 1. $1〜$10を列挙
// 2. 引数で受け取った式の中で$1〜$10のどれが使われているか確認
// 3. $nを_nに置換(単純なnは構文エラーになるため)
// 4. 引数文字列式を変換
// 5. 引数文字列式が{で始まる場合はreturnをつけずに関数本体として扱う
