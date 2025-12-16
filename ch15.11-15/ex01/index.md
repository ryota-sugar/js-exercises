### index.js でdocument.cookie プロパティを console.logで表示する

cookieの値として空文字が返ってきた。これは、サーバー側の`cookieAuthzMiddleware`関数で、HttpOnly属性付きでCookieが設定されており、JavaScriptからはcookieの値が取得できないためである。

### ブラウザの開発者コンソールで http://localhost:3000/ の Cookie を表示する

1つ目と同じでcookieの値として空文字が返ってきた。これは、サーバー側の`cookieAuthzMiddleware`関数で、HttpOnly属性付きでCookieが設定されており、JavaScriptからはcookieの値が取得できないためである。

### ToDo アプリのタブをリロードする

リロード前に表示されていたタスクの一覧がそのまま表示された。理由は、ブラウザに紐づけられているsession idがcookieに保存されており、リクエスト時にそのsessionが保たれるためである。

### 同一ブラウザの異なるタブやウィンドウで http://localhost:3000/ を開いて ToDo リストの状態を確認する

異なるタブやウィンドウで開いても、同じToDoリストの状態が表示された。理由は、同一ブラウザ内であれば、cookieに保存されたsession idが共有されるためである。

### シークレットウィンドウや異なるブラウザで http://localhost:3000/ を開いて ToDo リストの状態を確認する

シークレットウィンドウや異なるブラウザで開くと、ToDoリストは空の状態で表示された。理由は、シークレットウィンドウや異なるブラウザでは、cookieが共有されず、既存のToDoリストにアクセスできないためである。

### http://127.0.0.1:3000/ を開いて ToDo リストの状態を確認する

Todoリストは空の状態で表示された。cookieにアクセスできるのは、ドキュメントのオリジンに制限されており、`127.0.0.1:3000`のドキュメントから`localhost:3000`のcookieにはアクセスできないためである。
