import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
  return (
    <Image
      src="/Logo.svg"
      alt="FundX Logo"
      width={32}
      height={16}
      className={className}
    />
  );
}

// ⟳ echo · src\lib\utils.ts
// import { clsx, type ClassValue } from "clsx"
// import { twMerge } from "tailwind-merge"
// export function cn(...inputs: ClassValue[]) {