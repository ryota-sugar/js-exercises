import https from "https";
import "dotenv/config";

// 環境変数からtoken, owner, repositoryを取得
const TOKEN = process.env.GITHUB_TOKEN;
const OWNER = process.env.GITHUB_OWNER;
const REPOSITORY = process.env.GITHUB_REPOSITORY;

// GitHubAPIを使ってrequestを送信する共通関数
const githubSendRequest = ({ method, endPoint, body, verbose }) => {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      hostname: "api.github.com",
      method: method,
      path: `/repos/${OWNER}/${REPOSITORY}${endPoint}`,
      headers: {
        "User-Agent": "js-exercises-app",
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28", // 現在指定がなくても2022-11-28が使われる
      },
    };

    if (verbose) {
      console.log("Request Options:", requestOptions);
    }

    // requestOptionsを使ってrequestを作成
    const request = https.request(requestOptions);
    // もしbodyがあれば書き込む
    if (body) {
      request.write(JSON.stringify(body));
    }
    // リクエストが完了したらendを呼び出す
    request.end();

    //ネットワークに接続されていないなど、リクエストエラーで失敗した場合
    request.on("error", (e) => reject(e));

    // レスポンスが届き始めたら処理を行う
    request.on("response", (response) => {
      if (verbose) {
        console.log("Response Status Code:", response.statusCode);
        console.log("Response Headers:", response.headers);
      }
      if (response.statusCode < 200 || response.statusCode >= 300) {
        reject(new Error(`HTTP Status Code: ${response.statusCode}`));
        response.resume(); // データを消費してメモリリークを防ぐ
        return;
      }
      response.setEncoding("utf8");
      let responseData = "";
      response.on("data", (chunk) => {
        responseData += chunk;
      });
      // 全てのデータを受け取ったらresolveで返す
      response.on("end", () => {
        try {
          resolve(JSON.parse(responseData));
        } catch (e) {
          reject(e);
        }
      });
    });
  });
};

// issueを作成する関数
const openIssue = async (title, verbose) => {
  const result = await githubSendRequest({
    method: "POST",
    endPoint: "/issues",
    body: { title: title },
    verbose: verbose,
  });
  console.log("Issue created:", result.html_url);
};

// issueを閉じる関数
const closeIssue = async (issueNumber, verbose) => {
  const result = await githubSendRequest({
    method: "PATCH",
    endPoint: `/issues/${issueNumber}`,
    body: { state: "closed" },
    verbose: verbose,
  });
  console.log("Issue closed:", result.html_url);
};

// issue一覧を取得する関数
const listIssues = async (verbose) => {
  const result = await githubSendRequest({
    method: "GET",
    endPoint: "/issues",
    verbose: verbose,
  });
  console.log("Issues listed:", result);
};

// ヘルプ表示
const showHelp = () => {
  console.log(`
Usage: <command> [options]

Commands:
  list                  issue の一覧を表示
  create <title>        新しいissueを作成
  close <issue_id>      指定したissueをクローズ

Options:
  -h, --help     使い方を表示
  -v, --verbose  HTTP通信のログ詳細を出力
_  `);
};

(async () => {
  const args = process.argv.slice(2); // node index.js以降の引数を取得

  // オプションの種類を判別
  const help = args.includes("-h") || args.includes("--help");
  const verbose = args.includes("-v") || args.includes("--verbose");

  // -hまたは--helpが含まれている、またはargsに何も設定されていない場合、showHelpを実行して終了
  if (help || args.length === 0) {
    showHelp();
    return;
  }

  // オプション以外の引数をコマンドとして認識
  const command = args.find((arg) => !arg.startsWith("-"));
  try {
    switch (command) {
      case "list":
        await listIssues(verbose);
        break;
      case "create": {
        const titleIndex = args.indexOf("create") + 1; // vreateコマンドの次にある引数をタイトルとする
        const title = args[titleIndex];
        // タイトルが存在しなかったり、次の引数がオプションだった場合はエラーを投げる
        if (!title || title.startsWith("-")) {
          throw new Error("Issue title is required for 'create' command.");
        }
        await openIssue(title, verbose);
        break;
      }
      case "close": {
        const issueNumberIndex = args.indexOf("close") + 1; // closeコマンドの次にある引数をissue番号とする
        const issueNumberStr = args[issueNumberIndex];
        const issueNumber = parseInt(issueNumberStr, 10);
        // issue番号が存在しなかったり、数値に変換できなかった場合はエラーを投げる
        if (!issueNumberStr || isNaN(issueNumber)) {
          throw new Error(
            "Valid issue number is required for 'close' command."
          );
        }
        await closeIssue(issueNumber, verbose);
        break;
      }
      default:
        showHelp(); // 不明なコマンドの場合もヘルプを表示
        throw new Error(`Unknown command: ${command}`);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
})();
