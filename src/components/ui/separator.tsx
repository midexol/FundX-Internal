"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      )}
      {...props}
    />
  )
}

export { Separator }


// ⟳ echo · src\components\fundx\hero\HeroBackground.tsx
// const STACKS_COLORS = {
//   stream: "#9333ea",
//   streamAlt: "#6366f1",
//   block: "#9333ea",

// ⟳ echo · src\components\fundx\hero\HeroCTAs.tsx
//       </Link>
//       <Link href="/explore">
//         <Button variant="outline" size="lg" className="h-16 px-10 rounded-full text-lg border-2 border-slate-200 bg-white text-slate-700" style={{ transition: "border-color 250ms ease, background-color 250ms ease, transform 250ms ease" }} onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.025)"; e.currentTarget.style.borderColor = "#cbd5e1"; e.currentTarget.style.backgroundColor = "#f8fafc" }} onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.borderColor = ""; e.currentTarget.style.backgroundColor = "" }} onMouseDown={e => (e.currentTarget.style.transform = "scale(0.975)")} onMouseUp={e => (e.currentTarget.style.transform = "scale(1.025)")}>
//           Explore Campaigns
//         </Button>