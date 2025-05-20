import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./config/schema.js",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_KU2ZygrBT6bE@ep-snowy-wildflower-a1i4peyb-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
  }
});
