import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  turbopack: {},
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "apod.nasa.gov",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
} satisfies NextConfig;

export default withNextIntl(nextConfig);
