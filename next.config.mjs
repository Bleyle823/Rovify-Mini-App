/** @type {import('next').NextConfig} */
const nextConfig = {
  // Avoid Windows EPERM issues with trace file by disabling output tracing
  outputFileTracing: false,
  experimental: {
    // Silence workspace root warning by scoping file tracing to project
    outputFileTracingRoot: process.cwd(),
  },
  // Silence known optional dependency warnings in some web3 libs
  // https://github.com/WalletConnect/walletconnect-monorepo/issues/1908
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
