## 濁音や半濁音を含むファイルを各OSで作ると、NFC,NFDどちらになるのかの調査結果

### Windows OS

手順:

Explorer上で`ぱ.txt`のファイルを作成する。
PowerShellを開き、以下のコマンドを実行する。

結果:

```
$ Get-ChildItem | ForEach-Object {
   Write-Output $_.Name
   [System.Text.Encoding]::UTF8.GetBytes($_.Name) | Format-Hex
}
00000000 E3 81 B1 2E 74 78 74
```

`E3 81 B1`は`ぱ`を表し、(1文字で表しているため)NFCであることがわかる。
なお、`2E`は`.`を表し、`74 78 74`は`txt`を表している。

### Mac OS

手順:

ターミナル上で`touch sample.txt`でファイルを作成後、Finder上で、そのファイルの名前を`ぱ.txt`に変更する。

ターミナル上で`ls | while read f; do echo "$f"; echo "$f" | xxd; done`を実行し、該当ファイル名をバイト列として表示する。

結果:

```
$ ls | while read f; do echo "$f"; echo "$f" | xxd; done
ぱ.txt
00000000: e381 afe3 829a 2e74 7874 0a              .......txt.
```

`e3 81 af`は`は`を表し、`e3 82 9a`は`半濁音`を表すため、これはNFD形式ということがわかる。

また、MacのVisual Studio Codeや`touch`コマンドでファイルを作成し、そのファイルに対して先ほどのコマンドを実行すると、

```
$ ls | while read f; do echo "$f"; echo "$f" | xxd; done
ぱ.txt
00000000: e381 b12e 7478 740a                      ....txt.
```

とな理、NFC形式で表示されている。 これはファイル名を作成する際に、自動でNFC正規化されているかどうかの違いによるものだと考えられる。
