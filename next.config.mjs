/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
      DRIZZLE_DB_URL: process.env.DRIZZLE_DB_URL,
    },
  };
  
  export default nextConfig;