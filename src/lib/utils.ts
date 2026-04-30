import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// ⟳ echo · src\components\create\WizardSteps.tsx
//                        <SelectItem value="Education">Education</SelectItem>
//                        <SelectItem value="Gaming">Gaming</SelectItem>