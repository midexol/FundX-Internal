import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// ⟳ echo · src\components\fundx\TrustStrips.tsx
//           </span>
//           <span className="flex items-center gap-2">
//             <span className="h-2 w-2 rounded-full bg-purple-500 animate-pulse" />