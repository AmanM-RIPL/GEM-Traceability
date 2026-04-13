import "dotenv/config";
import { defineConfig } from "drizzle-kit";
const username = process.env.Username || "";
const password = process.env.Password || "";
const host = process.env.Host|| "";
const database = process.env.Database || "";
const DATABASE_URL= `postgres://${username}:${password}@${host}/${database}`;

export default defineConfig({
  out: "./drizzle",
  schema: "./db/schema/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url:DATABASE_URL,
  },
});
