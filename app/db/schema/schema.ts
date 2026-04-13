import { pgTable, uuid,serial, varchar, timestamp, uniqueIndex, integer, text, boolean } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  roleId: integer("role_id").references(() => roles.id),
  email: varchar("email", { length: 255 }).notNull(),
  phoneNumber: varchar("phone_number", { length: 255 }),
  passwordHash: text("password_hash"),
  isActive: boolean("is_active"),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").notNull(),
});

export const roles = pgTable(
  "roles",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 50 }).notNull(),
  },
  (table) => {
    return {
      nameUnique: uniqueIndex("roles_name_key").on(table.name),
    };
  }
);