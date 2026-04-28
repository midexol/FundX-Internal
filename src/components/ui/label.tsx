"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }


// ⟳ echo · src\components\fundx\cards\LeftCard.tsx
//       <div className="relative h-48 xl:h-1/2 bg-slate-100 overflow-hidden shrink-0">
//         <div className="absolute inset-0 flex items-center justify-center text-slate-300 text-sm font-bold bg-slate-50 group-hover:scale-105 transition-transform duration-700">
//           [Image]
//         </div>