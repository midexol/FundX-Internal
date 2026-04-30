"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"

import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation_ = "horizontal",
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation_={orientation_}
      className={cn(
        "bg-border shrink-0 data-[orientation_=horizontal]:h-px data-[orientation_=horizontal]:w-full data-[orientation_=vertical]:h-full data-[orientation_=vertical]:w-px",
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