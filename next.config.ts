import { type NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  typescript: {
    // CI環境では前のステージでtsc実施済みのためbuild 時の tsc による型チェックを無効にする
    ignoreBuildErrors: Boolean(process.env.CI)
  },
  eslint: {
    // CI環境では前のステージでtsc実施済みのためbuild 時の eslint によるチェックを無効にする
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: Boolean(process.env.CI)
  }
}

export default nextConfig
