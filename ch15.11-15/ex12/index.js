const input = document.getElementById("inputToken");

document.getElementById("upload").addEventListener("change", async (event) => {
  const uploadFile = event.target.uploadFiles[0];
  const accessToken = input?.value.trim() ?? "";
  if (!uploadFile) {
    alert("ファイルが選択されていません。");
    return;
  }
  // サインインしたユーザー(me)のOneDrive(drive)のルートフォルダー(root)に
  // https://learn.microsoft.com/ja-jp/onedrive/developer/rest-api/api/driveitem_put_content?view=odsp-graph-online
  const uploadUrl = `https://graph.microsoft.com/v1.0/me/drive/root:/${uploadFile.name}:/content`;
  try {
    const response = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`, // ヘッダーにアクセストークンを設定して送信
        "Content-Type": uploadFile.type,
      },
      body: uploadFile,
    });
    const data = await response.json();
    if (data.error) {
      alert("アップロードに失敗しました");
    } else {
      alert("アップロードに成功しました");
    }
  } catch (error) {
    alert("アップロード中にエラーが発生しました");
  }
});
