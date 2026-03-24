# D-Terminal

Dezainaz Inc. 社内の日報・プロジェクト管理 + ターミナルを統合したデスクトップアプリ。

## ダウンロード

### 最新版

[![Latest Release](https://img.shields.io/github/v/release/Dezainaz-Inc/d-terminal?label=%E6%9C%80%E6%96%B0%E3%83%90%E3%83%BC%E3%82%B8%E3%83%A7%E3%83%B3&style=flat-square)](https://github.com/Dezainaz-Inc/d-terminal/releases/latest)

| OS | ダウンロード |
|----|------------|
| macOS (Apple Silicon / Intel) | [**D-Terminal.dmg**](https://github.com/Dezainaz-Inc/d-terminal/releases/latest/download/D-Terminal.dmg) |

> 2回目以降はアプリ内で自動アップデートされるため、再ダウンロードは不要です。

## インストール方法

### macOS

1. 上のリンクから `.dmg` をダウンロード
2. ダウンロードした `.dmg` を開き、`D-Terminal` を `Applications` フォルダにドラッグ
3. 初回起動時にセキュリティの警告が出る場合：
   - **システム設定** → **プライバシーとセキュリティ** → 下部の「このまま開く」をクリック
4. 以降は通常通り起動できます

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
- キャンバス上でズーム・パン操作

### AI アシスタント
- チャットでタスク追加・変更・削除
- プロジェクト操作、日報操作をAI経由で実行

### 通知連携
- Slack / Discord / Webhook 対応
- 日報作成、タスク完了などのイベント通知

## 自動アップデート

アプリは起動後、60分ごとに新しいバージョンを自動チェックします。アップデートがある場合はバックグラウンドでダウンロードされ、次回起動時に適用されます。

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

タグをpushすると GitHub Actions が自動でビルドし、[Releases](https://github.com/Dezainaz-Inc/d-terminal/releases) に `.dmg` が公開されます。

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
