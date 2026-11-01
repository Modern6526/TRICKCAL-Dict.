# TRICKCAL 用語辞典

GitHub Pagesで公開する用語検索・Microsoft IME辞書出力サイトです。

## 辞書データの追加

`data/dictionary.json` の配列に項目を追加します。

```json
{
  "reading": "あーねっと",
  "candidates": ["アーネット", "Annette", "아네트"],
  "pos": "名詞",
  "category": "キャラクター"
}
```

- `reading`: IMEに登録する読み
- `candidates`: 変換候補（表示・出力順）
- `pos`: IMEの品詞（省略時は「名詞」）
- `category`: サイト上の分類（省略時は「その他」）

JSONでは項目間をカンマで区切り、最後の項目の後ろにはカンマを付けません。

## GitHub Pagesの設定

リポジトリの **Settings → Pages** を開き、Build and deploymentを **Deploy from a branch** に設定します。
Branchを `main`、Folderを `/ (root)` にしてSaveします。

数分後、`https://<ユーザー名>.github.io/<リポジトリ名>/` で公開されます。

サイトのダウンロード機能は、現在表示されている検索・カテゴリに一致する用語をUTF-16 LE BOM、タブ区切り、CRLFで出力します。
