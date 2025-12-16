### localStorage と sessionStorage それぞれに保存されたデータの有効期限がどのように異なるか、実際に動作確認して結果を記述しなさい。

#### todoを追加してブラウザをリロードした場合

- localStorage: データが保持されているため、追加したtodoが復元される
- sessionStorage: データが保持されているため、追加したtodoが復元される

#### todoを追加してブラウザを閉じた後、再度開いた場合

- localStorage: データが保持されているため、追加したtodoが復元される
- sessionStorage: データが削除されているため、追加したtodoは復元されない

#### todoを追加して別タブで同じページを開いた場合

- localStorage: あるタブでlocalStorageを変更すると別タブでstorageイベントが発火し、更新ができるため、追加したtodoが反映される。
- sessionStorage: タブごとに独立しているため、別タブで開いた場合は追加したtodoは反映されない。
