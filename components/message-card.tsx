import type { Message } from "@/lib/db/schema"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

function formatDate(date: Date) {
  return new Intl.DateTimeFormat("ar-SA", {
    day: "numeric",
    month: "long",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date))
}

export function MessageCard({ message }: { message: Message }) {
  const initial = message.name.trim().charAt(0) || "؟"

  return (
    <Card className="break-inside-avoid border-primary/15 shadow-sm transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-center gap-3 pb-2">
        <span
          className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
          aria-hidden="true"
        >
          {initial}
        </span>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-foreground">{message.name}</span>
          <span className="text-xs text-muted-foreground">{formatDate(message.createdAt)}</span>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-pretty leading-relaxed text-card-foreground">{message.body}</p>
      </CardContent>
    </Card>
  )
}
