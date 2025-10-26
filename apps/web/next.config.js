/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
module.exports = {
  output: 'export',
  basePath: '/My-math-game',
  assetPrefix: isProd ? '/My-math-game/' : '',
  images: { unoptimized: true },
};

export default nextConfig;
