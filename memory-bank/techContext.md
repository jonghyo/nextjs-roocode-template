# 技術コンテキスト

## 技術スタック詳細

### フロントエンド

| 技術            | バージョン | 目的                                |
| --------------- | ---------- | ----------------------------------- |
| Next.js         | 15.1.7     | Reactフレームワーク、App Router使用 |
| React           | 19.0.0     | UIライブラリ                        |
| TypeScript      | 5.7.3      | 静的型付け                          |
| Zustand         | -          | 状態管理ライブラリ (予定)           |
| shadcn/ui       | -          | コンポーネントライブラリ            |
| Tailwind CSS    | 4.0.8      | ユーティリティファーストCSS         |
| Zod             | 3.24.2     | スキーマ検証                        |
| React Hook Form | -          | フォーム管理 (予定)                 |
| Day.js          | -          | 日付操作 (予定)                     |
| NextAuth.js     | -          | 認証 (予定)                         |
| Pino            | 9.6.0      | ログ記録                            |

### 開発ツール

| ツール                | バージョン | 目的                       |
| --------------------- | ---------- | -------------------------- |
| Vitest                | 3.0.7      | テストランナー             |
| React Testing Library | 16.1.0     | UIコンポーネントテスト     |
| MSW                   | 2.7.3      | APIモック                  |
| Playwright            | -          | E2Eテスト (予定)           |
| Storybook             | 8.4.7      | コンポーネントドキュメント |
| ESLint                | 9          | コード品質チェック         |
| Prettier              | 3.4.2      | コードフォーマッター       |
| lefthook              | 1.11.0     | Gitフック管理              |
| GitHub Actions        | -          | CI/CD                      |

## 開発環境のセットアップ

### 要件

- Node.js (最新のLTSバージョン)
- npm
- VS Code（推奨）+ RooCode拡張機能

### 初期セットアップ

```bash
# リポジトリのクローン
git clone <repository-url>
cd nextjs-roocode-template

# 依存関係のインストール
npm ci

# 環境変数の設定
cp .env.example .env

# 開発サーバーの起動
npm run dev
```

## 技術的な制約

### ブラウザサポート

- モダンブラウザ（Chrome, Firefox, Safari, Edge最新版）
- IE非サポート

### パフォーマンス要件

- Webパフォーマンススコアが90%以上
- First Contentful Paint: 1.0秒以下
- Time to Interactive: 3.5秒以下
- ページサイズ: 500KB以下（画像を除く）

### セキュリティ要件

- 機密情報は環境変数で管理
- `.env` ファイル、`src/env`配下のファイル、シークレット情報を含むファイルは修正・コミット禁止
- セキュアなフォーム実装（XSS対策）
- APIエンドポイントのCSRF保護

## 依存関係管理

このプロジェクトでは、npmを使用してパッケージを管理しています。依存関係の追加時には以下のガイドラインに従います：

1. **依存関係の追加**：

   ```bash
   npm install <package-name>
   ```

2. **開発依存関係の追加**：

   ```bash
   npm install -D <package-name>
   ```

3. **既存の依存関係**：既にpackage.jsonにリストされているパッケージは再インストールしないでください。

4. **ライセンス確認**：新しいライブラリを追加する際はライセンスを確認してください。コピーレフトライセンスは避けてください。

## ビルドプロセス

### 開発ビルド

```bash
npm run dev
```

開発モードではホットリロードが有効になり、変更が即座に反映されます。

### 本番ビルド

```bash
npm run build
npm run start
```

本番ビルドでは、以下の最適化が行われます：

- コードの縮小化とトランスパイル
- 画像の最適化
- 不要なコードの削除
- キャッシュの最適化

## テスト戦略

### ユニットテスト

```bash
# 全テストの実行
npm test

# 特定のファイルのテスト
npm test -- src/spec/utils/example.spec.ts

# ウォッチモード
npm test -- --watch

# カバレッジレポート
npm run coverage
```

### コンポーネントテスト

Storybookを使用してUIコンポーネントの視覚的なテストを行います。

```bash
npm run storybook
```

### E2Eテスト

```bash
# Playwrightテストの実行（未実装）
npm run test:e2e
```

## デプロイメント

### 継続的インテグレーション

GitHub Actionsを使用してCIパイプラインを設定しています。プルリクエストごとに以下のチェックが実行されます：

1. ESLintによるコード品質チェック
2. TypeScriptの型チェック
3. ユニットテストの実行
4. ビルドの確認

### デプロイ先

Vercelへのデプロイメントが推奨されています。

## コード規約と品質管理

### ESLint設定

ESLintを使用してコードの品質と一貫性を確保しています。

```bash
# リントの実行
npm run lint

# 設定の検査
npm run lint:inspect
```

### Prettierによるコードフォーマット

Prettierを使用してコードスタイルの一貫性を維持しています。

.prettierrcの主要な設定：

```json
{
  "semi": false,
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

### Git Hooks

lefthookを使用してコミット前のチェックを自動化しています。主なフック：

- **pre-commit**: リント、型チェック、テスト実行
- **commit-msg**: コミットメッセージのフォーマットチェック

## ディレクトリ構造

```
src/
├── __mocks__/       # モック定義
├── __tests__/       # テストファイル
├── app/             # Next.js App Router
├── components/      # Reactコンポーネント
│   ├── features/    # 機能コンポーネント
│   ├── layout/      # レイアウトコンポーネント
│   └── ui/          # 基本UIコンポーネント
├── env/             # 環境変数定義（t3-env）
└── lib/             # ユーティリティ関数と共有ロジック
```

### 命名規則

- **ディレクトリ**: ケバブケース
- **ファイル名**: ケバブケース
- **コンポーネント名**: パスカルケース
- **変数名**: キャメルケース
- **定数名**: スネークケース
- **React hook名**: キャメルケース
- **CSSクラス名**: Tailwind CSSのクラス名

## アクセシビリティ要件

- WCAG 2.1 AA準拠
- キーボードナビゲーション対応
- スクリーンリーダー対応
- 適切なaria属性の使用

## パフォーマンス最適化

- React Server Components活用
- コード分割と遅延ロード
- 画像最適化（Next.js Image）
- 適切なキャッシュ戦略

## エラー処理とロギング

- Pinoを使用したログ記録
- 構造化されたエラーオブジェクト
- グローバルエラーハンドリング
- ユーザーフレンドリーなエラー表示

## 使用APIと外部サービス

現時点では外部APIや特定のバックエンドサービスは定義されていません。アプリケーション要件に応じて追加される予定です。

## 開発ツールと拡張機能

### 推奨VSCode拡張機能

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- RooCode（必須）

### その他の開発ツール

- React Developer Tools（ブラウザ拡張）
- Redux DevTools（Zustandと互換性あり）
