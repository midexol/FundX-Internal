import Image from "next/image";

export default function Logo({ className }: { className?: string }) {
// ← structural drift
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