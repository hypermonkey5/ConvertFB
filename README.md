# ConvertFB
## 機能
- ファイルとファイル名をひとかたまりのバッファに変換
- 変換したバッファをファイルに戻す
- ファイルを保存

## 使うまで
```
git clone http://spring.ics.nitech.ac.jp:8081/git/iwasato/ConvertFB.git
cp ConvertFB/converter.js [好きなディレクトリ]
```

## 使い方
### toBuffer(path,call)
- path バッファに変換するファイルのパス
- call コールバック
- return undefined
pathで指定したファイル・名前をひとまとめのバッファに変換

### toFile(buf,call)
- buf 変換したバッファ
- call コールバック
- return undefined
bufをファイルに戻す．bufはConvertでファイルから変換したものに限る

### writeFile(path,data,call)
- path ファイルを書き込むパス
- data ファイルのバッファ
- call コールバック
pathはデフォルトだと'./tmp/'+ファイル名．ファイルを保存する．fs.writeFileしてるだけ

## ファイル
### converter.js
これをrequire．
インスタンス生成して関数使う．

### index.js
サンプルコード．
```
node index.js パス1 パス2
```
実行すると，パス1のファイルをバッファにして，また戻してパス2に保存している．要はコピーします．

### test.〜
テスト用のテキストとか画像とか

### tmp
テスト用の保存先

## 対応状況
- 現状nodeで動くことを確認しているだけ
- ファイルサイズとかどこまで行けるのかとか調べていない
- webブラウザでは動かない
- telepathyと組み合わせられるかわからない

## TODO
- webブラウザで動け
- telepathyで動け
- いろんな例外処理．エラー起こるな