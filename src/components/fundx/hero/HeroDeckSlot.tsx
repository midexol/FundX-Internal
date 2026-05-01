import React from "react"

export function HeroDeckSlot({ slotRef }: { slotRef: React.RefObject<HTMLDivElement | null> }) {
  return (
    <div
      ref={slotRef}
      className="w-full flex justify-center items-center my-6"
      style={{ height: "6rem", pointerEvents: "none" }}
      aria-hidden="true"
    />
  )
}


// ⟳ echo · src\components\ui\button.tsx
//         default: "h-9 px-4 py-2 has-[>svg]:px-3",
//         xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
//         sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
//         lg: "h-10 rounded-md px-6 has-[>svg]:px-4",