export function HeroBadge() {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-orange-200/60 bg-gradient-to-r from-orange-50/50 to-white px-4 py-1.5 text-sm font-medium text-orange-600 mb-8 cursor-default backdrop-blur-sm"
      style={{ boxShadow: "0 1px 6px 0 rgba(0,0,0,0.04)" }}
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-gradient-to-r from-[#FF6B4A] to-[#FF3D71]" />
      </span>
      <span className="tracking-wide">Live on Stacks</span>
    </div>
  )
}


// ⟳ echo · src\components\fundx\hero\HeroCTAs.tsx
//         <Button size="lg" className="h-16 px-10 rounded-full text-lg" style={{ transition: "opacity 250ms ease, transform 250ms ease", boxShadow: "0 4px 20px 0 rgba(255,61,113,0.22)" }} onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.025)")} onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")} onMouseDown={e => (e.currentTarget.style.transform = "scale(0.975)")} onMouseUp={e => (e.currentTarget.style.transform = "scale(1.025)")}>
//           Start a Campaign
//         </Button>
//       </Link>
//       <Link href="/explore">