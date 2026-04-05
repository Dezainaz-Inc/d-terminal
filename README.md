# D-Terminal

Dezainaz Inc. 社内の日報・プロジェクト管理 + ターミナルを統合したデスクトップアプリ。

## ダウンロード

[![Latest Release](https://img.shields.io/github/v/release/Dezainaz-Inc/d-terminal?label=%E6%9C%80%E6%96%B0%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3&style=flat-square)](https://github.com/Dezainaz-Inc/d-terminal/releases/latest)

[Releases ページ](https://github.com/Dezainaz-Inc/d-terminal/releases/latest)から最新版をダウンロードしてください。

| ファイル | 対象 |
|---------|------|
| `D-Terminal-x.x.x-arm64.dmg` | **Apple Silicon Mac**（M1/M2/M3/M4） |
| `D-Terminal-x.x.x.dmg` | **Intel Mac**（2020年以前のMacBook等） |

> **どちらをダウンロードすれば？** →  メニュー → **このMacについて** で「チップ」が **Apple M1/M2/M3/M4** なら `arm64.dmg`、**Intel** なら `D-Terminal-x.x.x.dmg` をダウンロードしてください。`.blockmap` や `latest-mac.yml` は自動アップデート用なので無視してOKです。

> **v0.3.7以前をお使いの方へ**: 自動アップデート機能はv0.3.8から有効です。それ以前のバージョンでは自動更新が動作しないため、上記リンクから最新の `.dmg` を再ダウンロードしてください。v0.3.8以降は自動でアップデートされます。

## インストール方法

1. `.dmg` をダウンロードして開く
2. `D-Terminal` を `Applications` フォルダにドラッグ
3. 初回起動時にセキュリティの警告が出る場合：
   - **システム設定** → **プライバシーとセキュリティ** → 下部の「このまま開く」をクリック
4. 以降は通常通り起動できます

> 2回目以降はアプリ内（設定 → Update）で更新確認できます。自動チェックも60分ごとに行われます。

## 機能

### 日報
- ユーザー切替（チームメンバー管理）
- 稼働開始/終了、やること/やったことのチェックリスト
- プロジェクトの完了タスクを自動反映
- Supabase Realtimeでリアルタイム同期

### プロジェクト管理
- プロジェクト作成・ステータス管理（進行中/保留/完了/中止）
- タスク管理（ドラッグ&ドロップ並び替え、担当者割当、フィルター/ソート）
- テキスト一括追加 / ファイル取込（txt/csv/md）
- メンバー招待・権限管理

### メモ
- 自由なメモページ作成
- プロジェクトへの紐付け
- アイコン切り替え

### ターミナル（キャンバス）
- 複数のターミナルタイルを自由に配置
- ターミナル下部のインプットバーからコマンド送信（履歴対応）
- ブラウザタイルでURL/localhostプレビュー
- キャンバス上でズーム・パン操作

### AI アシスタント
- チャットでタスク追加・変更・削除
- プロジェクト操作、日報操作をAI経由で実行

### 通知連携
- Slack / Discord / Webhook 対応
- 日報作成、タスク完了などのイベント通知

## 自動アップデート

アプリは起動後、60分ごとに新しいバージョンを自動チェックします。設定画面の「Update」からも手動で確認できます。

## 開発者向け

### リリース手順

```bash
# 1. package.json の version を更新
# 2. コミット
git add -A
git commit -m "v0.x.x: 変更内容"

# 3. タグを打ってpush
git tag v0.x.x
git push origin main --tags
```

タグをpushすると GitHub Actions が自動でビルド → Releases に `.dmg` が公開されます。

### ローカルでの変更（asar直接編集）

```bash
# 展開
asar extract /Applications/D-Terminal.app/Contents/Resources/app.asar /tmp/d-terminal-src

# 編集後、再パック
asar pack /tmp/d-terminal-src /Applications/D-Terminal.app/Contents/Resources/app.asar

# ハッシュ更新 & 署名
NEW_HASH=$(shasum -a 256 /Applications/D-Terminal.app/Contents/Resources/app.asar | awk '{print $1}')
/usr/libexec/PlistBuddy -c "Set :ElectronAsarIntegrity:Resources/app.asar:hash $NEW_HASH" /Applications/D-Terminal.app/Contents/Info.plist
codesign --force --sign - /Applications/D-Terminal.app
```

> **注意**: `npx asar` (v3.2.0) にはバグがあります。`npm install -g @electron/asar` でインストールした `asar` コマンドを使用してください。

## 技術スタック

- **Electron** — デスクトップアプリフレームワーク
- **Supabase** — データベース + リアルタイム同期
- **Gemini API** — AIアシスタント
- **electron-updater** — GitHub Releases経由の自動アップデート
- **xterm.js + node-pty** — ターミナルエミュレーション

---

© 2026 Dezainaz Inc.
