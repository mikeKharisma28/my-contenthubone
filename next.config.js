/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    SITECORE_CLIENT_ID: process.env.SITECORE_CLIENT_ID,
    SITECORE_CLIENT_SECRET: process.env.SITECORE_CLIENT_SECRET,
    SITECORE_AUDIENCE: process.env.SITECORE_AUDIENCE,

    // Delivery Auth token
    SITECORE_DEV_AUTH_TOKEN_PROD: process.env.SITECORE_DEV_AUTH_TOKEN_PROD,
    SITECORE_ENDPOINT_URL_PROD: process.env.SITECORE_ENDPOINT_URL_PROD,

    // Preview Auth token
    SITECORE_DEV_AUTH_TOKEN_DEV: process.env.SITECORE_DEV_AUTH_TOKEN_DEV,
    SITECORE_ENDPOINT_URL_DEV: process.env.SITECORE_ENDPOINT_URL_DEV,

    // Sitecore Content Hub One URLs
    CONTENT_MANAGEMENT_BASE_URL: process.env.CONTENT_MANAGEMENT_BASE_URL,
    CONTENT_MANAGEMENT_AUTH_URL: process.env.CONTENT_MANAGEMENT_AUTH_URL,
    MEDIA_UPLOAD_URL: process.env.MEDIA_UPLOAD_URL,

    // App's URLs
    NEXT_PUBLIC_API_DEV: process.env.NEXT_PUBLIC_API_DEV,
    NEXT_PUBLIC_API_PROD: process.env.NEXT_PUBLIC_API_PROD
  }
};

module.exports = nextConfig;
