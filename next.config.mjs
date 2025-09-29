/** @type {import('next').NextConfig} */
const nextConfig = {
  // Scope file tracing to this workspace to avoid monorepo warnings
  outputFileTracingRoot: process.cwd(),
  // Silence known optional dependency warnings in some web3 libs
  // https://github.com/WalletConnect/walletconnect-monorepo/issues/1908
  webpack: (config) => {
    // Stub React Native storage module for web builds to avoid RN peer deps
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@react-native-async-storage/async-storage': false,
    };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
};

export default nextConfig;
