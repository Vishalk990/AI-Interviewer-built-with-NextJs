import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
  schema: "./utils/schema.js",
  out: "./drizzle",
  driver:"pg",
  dbCredentials: {
    connectionString: process.env.DRIZZLE_DB_URL
  },
  verbose: true,
  strict: true,
});
