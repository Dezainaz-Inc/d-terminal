# D-Terminal

## 概要
Dezainaz Inc. 社内ツール。日報・プロジェクト管理・メモ + ターミナルを統合したElectronデスクトップアプリ。

## リポジトリ
- **GitHub**: https://github.com/Dezainaz-Inc/d-terminal (プライベート)
- **ローカルパス**: `/Users/kenshi_tsukamoto/Downloads/Project/d-terminal/`

## 構成
- **ベース**: Collaborator (Electron app) をフォークしてカスタマイズ
- **日報/プロジェクト管理**: Vanilla JS + Supabase (プロジェクトID: `vybvmrsepsnqwnxpqxqi`)
- **ターミナル**: xterm.js + node-pty
- **自動アップデート**: electron-updater + GitHub Releases

## アプリ構造
```
out/
  main/index.js          — メインプロセス（IPC, UpdateManager, ウィンドウ管理）
  renderer/
    shell/index.html     — シェル（タブUI: 日報 / キャンバス）
    nippo/               — 日報・プロジェクト管理UI（index.html + style.css）
    assets/              — バンドル済みJS/CSS（shell-*.js, nav-*.js, nippo-app.js）
    terminal-tile/       — ターミナルタイル
    settings/            — 設定画面
```

## タブ構成
- **日報タブ**: nippo webview（Supabase接続、日報/プロジェクト/メモの3ビュー）
- **キャンバスタブ**: ターミナルタイル等を自由配置するキャンバス

## Supabase
- プロジェクトID: `vybvmrsepsnqwnxpqxqi`
- テーブル: `daily_reports`, `projects`, `project_tasks`, `project_members`, `team_members`, `notification_settings`, `notification_triggers`, `pages`, `time_entries`
- anonキーはnippo-app.js内にハードコード

## デザイン方針
- **和の美意識**: Noto Sans JP + IBM Plex Mono、墨色(#1c1c1a) + 白磁(#fafaf8) + 朱(#c4713b)
- ダークモード対応（prefers-color-scheme）
- ふわっとしたfadeUpアニメーション、滑らかなcubic-bezierトランジション
- Notionに寄せすぎない独自ミニマルデザイン

## リリース手順
1. `package.json` の `version` を更新
2. コミット & タグを打つ:
   ```bash
   git add -A
   git commit -m "v0.x.x: 変更内容"
   git tag v0.x.x
   git push origin main --tags
   ```
3. GitHub Actions が自動でビルド → GitHub Releases に `.dmg` を公開
4. ユーザーのアプリが60分以内に自動検知してアップデート

## asar の手動パック手順（ローカルで直接変更する場合）
```bash
# 1. asarを展開
asar extract /Applications/D-Terminal.app/Contents/Resources/app.asar /tmp/d-terminal-src

# 2. ファイルを編集

# 3. 再パック
asar pack /tmp/d-terminal-src /Applications/D-Terminal.app/Contents/Resources/app.asar

# 4. ハッシュ更新 & 署名
NEW_HASH=$(shasum -a 256 /Applications/D-Terminal.app/Contents/Resources/app.asar | awk '{print $1}')
/usr/libexec/PlistBuddy -c "Set :ElectronAsarIntegrity:Resources/app.asar:hash $NEW_HASH" /Applications/D-Terminal.app/Contents/Info.plist
codesign --force --sign - /Applications/D-Terminal.app

# 5. キャッシュクリア & 起動
rm -rf "$HOME/Library/Application Support/@collaborator/electron/Cache"
open /Applications/D-Terminal.app
```

**重要**: `npx asar` (v3.2.0) はバグあり。`npm install -g @electron/asar` でグローバルインストールした `asar` コマンドを使うこと。

## 注意事項
- macOSのコード署名保護でapp.asarの上書きがサイレントに失敗する場合がある → 一度コピーしてから作業する
- `CFBundleName` は `Collaborator` のまま（ヘルパーアプリ名と一致させる必要がある）、`CFBundleDisplayName` が `D-Terminal`
- Apple Developer証明書なしのため、初回起動時に「システム設定 > プライバシーとセキュリティ > このまま開く」が必要
- pushはユーザーが明示的に指示するまでしない
- `ElectronAsarIntegrity` のハッシュをInfo.plistで更新しないとアプリが起動しない

## データ保存先
- キャンバス状態: `~/.collaborator/canvas-state.json`
- Electronデータ: `~/Library/Application Support/@collaborator/electron/`
- Preferences: `~/Library/Preferences/com.collaborator.desktop.plist`
