"use client"

import { useActionState, useEffect, useRef } from "react"
import { addMessage, type ActionResult } from "@/app/actions/messages"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const initialState: ActionResult = { ok: false }

export function MessageForm({ onSuccess }: { onSuccess?: () => void }) {
  const [state, formAction, pending] = useActionState(addMessage, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset()
      onSuccess?.()
    }
  }, [state, onSuccess])

  return (
    <form ref={formRef} action={formAction} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">الاسم</Label>
        <Input id="name" name="name" placeholder="اكتب اسمك" maxLength={40} required />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="body">رسالتك</Label>
        <Textarea
          id="body"
          name="body"
          placeholder="شاركنا تهنئتك بمناسبة اليوم الوطني السعودي ٩٦"
          maxLength={280}
          rows={4}
          required
        />
      </div>

      {state.error ? (
        <p className="text-sm text-destructive" role="alert">
          {state.error}
        </p>
      ) : null}
      {state.ok ? (
        <p className="text-sm text-primary" role="status">
          تم نشر رسالتك على الحائط، شكرًا لمشاركتك!
        </p>
      ) : null}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? "جارٍ النشر..." : "أضف رسالتك إلى الحائط"}
      </Button>
    </form>
  )
}
