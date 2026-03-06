"use client"

import { useRef, useEffect } from "react"
import { motion, useInView, useAnimation } from "framer-motion"
import { getHeroCampaign, getSideCampaigns } from "@/lib/data"
import { LeftCard } from "@/components/fundx/cards/LeftCard"
import { RightCard } from "@/components/fundx/cards/RightCard"
import { CenterCard } from "@/components/fundx/cards/CenterCard"
import { MobileCard } from "@/components/fundx/cards/MobileCard"

export function CampaignFan() {
  const hero = getHeroCampaign()
  const sideCampaigns = getSideCampaigns()
  const leftCard = sideCampaigns[0]
  const rightCard = sideCampaigns[1]

  const getProgress = (raised: number, goal: number) =>
    Math.min((raised / goal) * 100, 100)

  // ── Scroll trigger ──────────────────────────────────────────────
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: "-80px" })

  const leftControls = useAnimation()
  const centerControls = useAnimation()
  const rightControls = useAnimation()

  useEffect(() => {
    if (!isInView) return

    // Center card lifts up very slightly — it's already in place
    centerControls.start({
      x: 0,
      y: -12,
      rotate: 0,
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 90,
        damping: 20,
        delay: 0,
      },
    })

    // Left card deals out to the left
    leftControls.start({
      x: -390,
      y: 0,
      rotate: -6,
      scale: 0.92,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 65,
        damping: 18,
        delay: 0.12,
      },
    })

    // Right card deals out to the right
    rightControls.start({
      x: 390,
      y: 0,
      rotate: 6,
      scale: 0.92,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 65,
        damping: 18,
        delay: 0.22,
      },
    })
  }, [isInView, leftControls, centerControls, rightControls])

  // ── All cards start here: stacked in the center ─────────────────
  const stackedLeft = {
    x: 0,
    y: 0,
    rotate: -6,
    scale: 0.92,
    opacity: 0.85,
  }

  const stackedCenter = {
    x: 0,
    y: 0,
    rotate: 0,
    scale: 1,
    opacity: 1,
  }

  const stackedRight = {
    x: 0,
    y: 0,
    rotate: 6,
    scale: 0.92,
    opacity: 0.85,
  }

  return (
    <div ref={containerRef} className="relative w-full">

      {/* ── MOBILE: plain vertical list, no animation ── */}
      <div className="flex xl:hidden flex-col gap-6">
        <MobileCard
          campaign={leftCard}
          progress={getProgress(leftCard.raised, leftCard.goal)}
        />
        <MobileCard
          campaign={hero}
          progress={getProgress(hero.raised, hero.goal)}
        />
        <MobileCard
          campaign={rightCard}
          progress={getProgress(rightCard.raised, rightCard.goal)}
        />
      </div>

      {/* ── DESKTOP: stacked deck that deals out on scroll ── */}
      <div className="hidden xl:block relative w-full h-[460px]">

        {/* 
          All three cards are absolutely centered.
          They start on top of each other.
          On scroll they animate to their final x positions.
        */}

        {/* LEFT CARD — starts center, deals left */}
        <motion.div
          initial={stackedLeft}
          animate={leftControls}
          className="absolute top-0 w-[300px] h-[420px]"
          style={{
            left: "50%",
            marginLeft: "-150px", // half of 300px — truly centered
            zIndex: 10,
          }}
        >
          <LeftCard
            campaign={leftCard}
            progress={getProgress(leftCard.raised, leftCard.goal)}
          />
        </motion.div>

        {/* CENTER CARD — stays center, lifts up */}
        <motion.div
          initial={stackedCenter}
          animate={centerControls}
          className="absolute top-0 w-[560px] h-[420px]"
          style={{
            left: "50%",
            marginLeft: "-280px", // half of 560px — truly centered
            zIndex: 30,
          }}
        >
          <CenterCard
            campaign={hero}
            progress={getProgress(hero.raised, hero.goal)}
          />
        </motion.div>

        {/* RIGHT CARD — starts center, deals right */}
        <motion.div
          initial={stackedRight}
          animate={rightControls}
          className="absolute top-0 w-[300px] h-[420px]"
          style={{
            left: "50%",
            marginLeft: "-150px", // half of 300px — truly centered
            zIndex: 10,
          }}
        >
          <RightCard
            campaign={rightCard}
            progress={getProgress(rightCard.raised, rightCard.goal)}
          />
        </motion.div>

      </div>
    </div>
  )
}