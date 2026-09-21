import Image from "next/image"

export function SiteHeader() {
  return (
    <header className="w-full border-b border-primary/15 bg-white/70 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        {/* Right side (RTL start): Ministry of Education logo */}
        <div className="flex items-center">
          <Image
            src="/logos/ministry-of-education.png"
            alt="شعار وزارة التعليم"
            width={130}
            height={72}
            className="h-14 w-auto object-contain sm:h-16"
            priority
          />
        </div>

        <div className="hidden text-center sm:block">
          <p className="text-sm font-semibold text-primary">الثانوية الثانية بالبكيرية</p>
          <p className="text-xs text-muted-foreground">اليوم الوطني السعودي ٩٦</p>
        </div>

        {/* Left side (RTL end): National Day 96 logo */}
        <div className="flex items-center">
          <Image
            src="/logos/national-day-96.png"
            alt="شعار اليوم الوطني السعودي ٩٦"
            width={130}
            height={72}
            className="h-14 w-auto object-contain sm:h-16"
            priority
          />
        </div>
      </div>
    </header>
  )
}
