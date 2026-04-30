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

// ⟳ echo · src\components\fundx\hero\HeroHeadline.tsx
//       <br />
//       <span className="inline-flex items-center flex-wrap justify-center gap-x-4">
//         on the
//         <ChainToggleIcon displayStacks={displayStacks} glitching={glitching} glitchOffset={glitchOffset} glitchOpacity={glitchOpacity} glitchSkew={glitchSkew} isStacksMode={isStacksMode} />
//         <span style={{ display: "inline-block", minWidth: "240px", fontVariantLigatures: "none" }} className={`bg-clip-text text-transparent bg-gradient-to-r ${displayStacks ? "from-purple-600 to-indigo-600" : "from-[#FF6B4A] to-[#FF3D71]"}`}>