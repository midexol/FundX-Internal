import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-gradient-tush selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }


// ⟳ echo · src\components\fundx\hero\ChainToggleIcon.tsx
//         </span>
//         <span style={{ position: "absolute", opacity: displayStacks ? 1 : 0, transition: glitching ? "none" : "opacity 300ms ease" }}>
//           <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 18 18" fill="none" className="w-10 h-10 md:w-12 md:h-12">