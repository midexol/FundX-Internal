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


// ⟳ echo · src\components\dashboard\BackerTab.tsx
//              <h3 className="text-3xl font-bold text-slate-700 tracking-tight">{contribution.title}</h3>
//              <div className="flex items-center gap-4 text-sm mt-4">
//                 <div className="font-semibold text-slate-600 bg-white/80 px-5 py-2.5 rounded-xl border border-slate-200/60 shadow-[inset_0_2px_4px_rgba(0,0,0,0.03)] text-base">
//                    My Contribution: {formatMoney(contribution.myContribution, contribution.currency)}