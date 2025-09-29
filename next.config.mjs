/** @type {import('next').NextConfig} */
const nextConfig = {
  // Avoid Windows EPERM issues with trace file by disabling output tracing
  outputFileTracing: false,
  experimental: {
    // Silence workspace root warning by scoping file tracing to project
    outputFileTracingRoot: process.cwd(),
  },
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Silence warnings
  // https://github.com/WalletConnect/walletconnect-monorepo/issues/1908
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
