"use client"

export function ChainToggleSwitch({ isStacksMode, onToggle }: { isStacksMode: boolean; onToggle: () => void }) {
  return (
    <span className="inline-flex align-middle ml-2">
      <button onClick={onToggle} aria-label="Toggle between Bitcoin and Stacks" className="relative inline-flex items-center cursor-pointer focus:outline-none" style={{ WebkitTapHighlightColor: "transparent" }}>
        <div style={{ transition: "background 700ms ease", background: isStacksMode ? "#0f172a" : "linear-gradient(to right, #FF6B4A, #FF3D71)" }} className="w-24 h-12 rounded-full p-1">
          <div style={{ transition: "transform 650ms cubic-bezier(0.4, 0, 0.2, 1)", transform: isStacksMode ? "translateX(48px)" : "translateX(0px)", boxShadow: "0 2px 10px 0 rgba(0,0,0,0.12)" }} className="w-10 h-10 bg-white rounded-full" />
        </div>
      </button>
    </span>
  )
}


// ⟳ echo · src\components\ui\textarea.tsx
//       data-slot="textarea"
//       className={cn(
//         "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
//         className
//       )}