import { getMessages } from "@/app/actions/messages"
import { SiteHeader } from "@/components/site-header"
import { AddMessageDialog } from "@/components/add-message-dialog"
import { MessageCard } from "@/components/message-card"

export const dynamic = "force-dynamic"

export default async function HomePage() {
  const messages = await getMessages()

  return (
    <div className="relative min-h-screen bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 bg-repeat opacity-[0.12]"
        style={{ backgroundImage: "url('/backgrounds/saudi-heritage.png')", backgroundSize: "460px" }}
      />
      <div className="relative z-10">
        <SiteHeader />

        <section className="relative overflow-hidden bg-primary text-primary-foreground">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-repeat opacity-20 mix-blend-overlay"
            style={{ backgroundImage: "url('/backgrounds/saudi-heritage.png')", backgroundSize: "420px" }}
          />
          <div className="relative mx-auto max-w-5xl px-4 py-12 text-center sm:px-6 sm:py-16">
          <p className="text-sm font-medium tracking-wide text-primary-foreground/80">
            المملكة العربية السعودية
          </p>
          <h1 className="mt-2 text-balance text-3xl font-extrabold sm:text-5xl">
            حائط رسائل اليوم الوطني السعودي ٩٦
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-primary-foreground/85 sm:text-lg">
            تسعدنا مشاركة تهنئتك وكلماتك الجميلة بمناسبة اليوم الوطني السعودي
          </p>
          <div className="mt-6 flex justify-center">
            <AddMessageDialog />
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-lg font-bold text-foreground">الرسائل</h2>
          <span className="text-sm text-muted-foreground">{messages.length} رسالة</span>
        </div>

        {messages.length === 0 ? (
          <div className="rounded-lg border border-dashed border-primary/30 p-10 text-center text-muted-foreground">
            لا توجد رسائل بعد. كن أول من يهنئ الوطن!
          </div>
        ) : (
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>*]:mb-4">
            {messages.map((message) => (
              <MessageCard key={message.id} message={message} />
            ))}
          </div>
        )}
      </main>

        <footer className="border-t border-primary/15 py-6 text-center text-sm text-muted-foreground">
          كل عام والوطن بخير · اليوم الوطني السعودي ٩٦
        </footer>
      </div>
    </div>
  )
}
