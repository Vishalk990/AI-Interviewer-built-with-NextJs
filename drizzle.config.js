import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql", // "mysql" | "sqlite" | "postgresql"
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials: {
    url: "postgresql://neondb_owner:n8UWlaTbBr9E@ep-wild-smoke-a55ghyzx.us-east-2.aws.neon.tech/ai-interview-mocker?sslmode=require",
  }
});
