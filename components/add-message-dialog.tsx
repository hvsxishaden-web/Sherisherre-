"use client"

import { useState } from "react"
import { MessageForm } from "@/components/message-form"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function AddMessageDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-background font-bold text-primary shadow-lg hover:bg-background/90"
        >
          أضف رسالتك
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-right text-xl">أضف رسالتك</DialogTitle>
          <DialogDescription className="text-right text-pretty leading-relaxed">
            تسعدنا مشاركة تهنئتك وكلماتك الجميلة بمناسبة اليوم الوطني السعودي
          </DialogDescription>
        </DialogHeader>
        <MessageForm onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
