# システムパターン

## アーキテクチャ概要

このプロジェクトは、Next.js の App Router を使用したモダンなフロントエンドアーキテクチャを採用しています。全体的なシステム設計は以下のパターンに基づいています。

### レイヤードアーキテクチャ

プロジェクトは以下の階層で構成されています：

1. **プレゼンテーション層**：

   - Next.js のページコンポーネント
   - UIコンポーネント（shadcn/ui + Tailwind CSS）
   - レイアウトコンポーネント

2. **アプリケーション層**：

   - 状態管理（Zustand）
   - ロジックフック
   - フォーム処理（React Hook Form）

3. **ドメイン層**：

   - ビジネスロジック
   - バリデーション（Zod）
   - 型定義

4. **インフラストラクチャ層**：
   - API通信（Next.js標準のfetch）
   - ログ記録（Pino）
   - 認証処理（NextAuth.js）

## 主要な技術的決定

### Next.js App Router

App Routerを採用することで以下の利点を得ています：

- ファイルシステムベースのルーティング
- React Server Components
- ストリーミング対応
- レイアウトのネスト
- ルートグループ

### TypeScriptの厳格な使用

- `strict`モードを有効化
- すべてのコンポーネントに適切な型定義
- Zodによる実行時の型チェック

### 状態管理アプローチ

- Zustandを使用した単一ストア、マルチスライスパターン
- グローバル状態と局所状態の明確な分離
- コンポーネントをできるだけステートレスに保つ

### コンポーネント設計原則

- コロケーションパターンを採用
- 機能ごとにディレクトリを分割
- コンポーネントの責務を明確に分離

## 設計パターン

### コンポジションパターン

コンポーネントは小さな単位で設計し、それらを組み合わせて複雑なUIを構築します。

```tsx
// 単純な例
<Card>
  <CardHeader>
    <CardTitle>タイトル</CardTitle>
    <CardDescription>説明文</CardDescription>
  </CardHeader>
  <CardContent>コンテンツ</CardContent>
  <CardFooter>フッター</CardFooter>
</Card>
```

### カスタムフックパターン

ロジックを再利用可能なフックとして抽出し、UIとロジックを分離します。

```tsx
// カスタムフックの例
function useUserData(userId: string) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const response = await fetch(`/api/users/${userId}`)
        const data = await response.json()
        setUser(data)
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [userId])

  return { user, loading, error }
}

// 使用例
function UserProfile({ userId }: { userId: string }) {
  const { user, loading, error } = useUserData(userId)

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorDisplay message={error.message} />

  return <UserCard user={user} />
}
```

### アダプターパターン

外部APIやサービスとの連携にはアダプターパターンを使用し、実装詳細からアプリケーションを分離します。

```tsx
// APIアダプターの例
interface UserAPI {
  getUser(id: string): Promise<User>
  updateUser(user: User): Promise<void>
}

class RestUserAPI implements UserAPI {
  async getUser(id: string): Promise<User> {
    const response = await fetch(`/api/users/${id}`)
    return await response.json()
  }

  async updateUser(user: User): Promise<void> {
    await fetch(`/api/users/${user.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
  }
}
```

### ストラテジーパターン

さまざまなバリエーションを持つ処理には、ストラテジーパターンを使用して実装を切り替えられるようにしています。

```tsx
// バリデーション戦略の例
interface ValidationStrategy {
  validate(data: unknown): boolean
  errorMessage: string
}

class EmailValidator implements ValidationStrategy {
  validate(data: unknown): boolean {
    return typeof data === 'string' && /^\S+@\S+\.\S+$/.test(data)
  }

  errorMessage = '有効なメールアドレスを入力してください'
}

class PasswordValidator implements ValidationStrategy {
  validate(data: unknown): boolean {
    return typeof data === 'string' && data.length >= 8
  }

  errorMessage = 'パスワードは8文字以上である必要があります'
}

// 使用例
function validateField(data: unknown, validator: ValidationStrategy): string | null {
  return validator.validate(data) ? null : validator.errorMessage
}
```

## コンポーネント間の関係

### コンポーネント階層

```
App
├── Layout
│   ├── Header
│   ├── Main
│   └── Footer
├── Pages
│   ├── Home
│   ├── About
│   └── ...
└── Features
    ├── Auth
    │   ├── LoginForm
    │   └── SignupForm
    ├── User
    │   ├── UserProfile
    │   └── UserSettings
    └── ...
```

### データフロー

1. **トップダウン**：

   - Propsを通じて親から子へデータを渡す
   - Context APIを使用して深いネストを避ける

2. **ボトムアップ**：

   - イベントハンドラを通じて子から親へ通知
   - カスタムイベントによる非直接的な通信

3. **グローバル**：
   - Zustandを使用した状態管理
   - Sliceパターンによるドメイン分離

### エラーハンドリング

- React Error Boundaryによるエラー捕捉
- try-catchブロックによる細粒度の例外処理
- エラー状態の集中管理

## テストパターン

プロジェクトでは以下のテスト戦略を採用しています：

1. **単体テスト**：

   - VitestとReact Testing Libraryを使用
   - 分離されたコンポーネントとユーティリティのテスト

2. **統合テスト**：

   - コンポーネント間の連携を検証
   - MSWによるAPIモック

3. **E2Eテスト**：
   - Playwrightによる実際のブラウザでのテスト
   - ユーザーフローの検証

### テストピラミッド

- 多数の単体テスト（基盤）
- 適度な統合テスト（中間層）
- 少数の重要なE2Eテスト（頂点）

## パフォーマンス最適化

- React Server Componentsの活用
- 画像最適化（Next.js Image）
- コード分割（動的インポート）
- スタイルのパージ（未使用CSSの削除）

## セキュリティ対策

- CSRFトークンの使用
- コンテンツセキュリティポリシー
- 入力のサニタイズとバリデーション
- XSS対策
