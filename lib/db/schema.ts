import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  body: text("body").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
})

export type Message = typeof messages.$inferSelect
