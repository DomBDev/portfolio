/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  output: 'standalone',
  outputFileTracingRoot: path.join(__dirname, '../../'),
  outputFileTracingIncludes: {
    '**/*': ['./app/frontend/**/*']
  },
  poweredByHeader: false,
  reactStrictMode: true
}

module.exports = nextConfig 