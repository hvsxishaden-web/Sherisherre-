"use server"

import { db } from "@/lib/db"
import { messages } from "@/lib/db/schema"
import { desc } from "drizzle-orm"
import { revalidatePath } from "next/cache"

export async function getMessages() {
  return db.select().from(messages).orderBy(desc(messages.createdAt))
}

export type ActionResult = { ok: boolean; error?: string }

export async function addMessage(_prev: ActionResult, formData: FormData): Promise<ActionResult> {
  const name = String(formData.get("name") ?? "").trim()
  const body = String(formData.get("body") ?? "").trim()

  if (!name || name.length > 40) {
    return { ok: false, error: "الرجاء إدخال اسم صحيح (حتى 40 حرفًا)." }
  }
  if (!body || body.length > 280) {
    return { ok: false, error: "الرجاء كتابة رسالة صحيحة (حتى 280 حرفًا)." }
  }

  await db.insert(messages).values({ name, body })
  revalidatePath("/")
  return { ok: true }
}
