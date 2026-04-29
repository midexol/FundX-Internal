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

// ⟳ echo · src\components\fundx\hero\HeroCTAs.tsx
//         <Button variant="outline" size="lg" className="h-16 px-10 rounded-full text-lg border-2 border-slate-200 bg-white text-slate-700" style={{ transition: "border-color 250ms ease, background-color 250ms ease, transform 250ms ease" }} onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.025)"; e.currentTarget.style.borderColor = "#cbd5e1"; e.currentTarget.style.backgroundColor = "#f8fafc" }} onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.borderColor = ""; e.currentTarget.style.backgroundColor = "" }} onMouseDown={e => (e.currentTarget.style.transform = "scale(0.975)")} onMouseUp={e => (e.currentTarget.style.transform = "scale(1.025)")}>
//           Explore Campaigns
//         </Button>