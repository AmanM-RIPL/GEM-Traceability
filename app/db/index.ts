import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
const username = process.env.Username || "";
const password = process.env.Password || "";
const host = process.env.Host|| "";
const database = process.env.Database || "";
const DATABASE_URL= `postgres://${username}:${password}@${host}/${database}`;
// import * as schema from "./schema";

import * as schema from "./schema/schema";
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });