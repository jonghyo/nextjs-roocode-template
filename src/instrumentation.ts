export const register = async () => {
  //Next.jsサーバー起動時に環境変数が設定されているか確認
  console.log('Validating Environent Variables.')
  await import('@/env/server.mjs')
  // await import('@/env/client.mjs')
}
