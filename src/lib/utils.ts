import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// ⟳ echo · src\components\ui\card.tsx
//   return (
//     <div
//       data-slot="card-header"
//       className={cn(