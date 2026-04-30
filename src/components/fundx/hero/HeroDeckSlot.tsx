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


// ⟳ echo · src\components\fundx\hero\HeroBackdrop.tsx
//         logoRef.current.style.opacity = String(opacity)
//         rafRef.current = requestAnimationFrame(animate)
//       }
//       rafRef.current = requestAnimationFrame(animate)
//     }