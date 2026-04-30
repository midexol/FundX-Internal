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

// ⟳ echo · src\components\fundx\hero\useScramble.ts
//   const frameRef = useRef<NodeJS.Timeout | null>(null)
//   const scrambleTo = (word: string) => {