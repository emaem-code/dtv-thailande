import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Intègre la valeur de la plateforme au JavaScript client, sans variable à configurer.
  env: {
    VERCEL_ENV: process.env.VERCEL_ENV ?? 'development',
  },
};

export default nextConfig;
