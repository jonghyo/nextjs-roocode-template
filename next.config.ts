import { type NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  typescript: {
    // CI環境では前のステージでtsc実施済みのためbuild 時の tsc による型チェックを無効にする
    ignoreBuildErrors: process.env.CI ? true : false
  },
  eslint: {
    // CI環境では前のステージでtsc実施済みのためbuild 時の eslint によるチェックを無効にする
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: process.env.CI ? true : false
  }
}

export default nextConfig
