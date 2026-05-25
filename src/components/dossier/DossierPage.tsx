"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useDossier } from "@/context/DossierContext";

export function DossierPage({ children }: { children: React.ReactNode }) {
  const { stage, setStage } = useDossier();
  const isOpen = stage === "open";
  const isSealed = stage === "sealed" || stage === "hover";

  return (
    <motion.main
      initial={isOpen && false}
      variants={{
        hover: { y: "-1rem", rotate: -2 },
        opening: {
          y: ["-1rem", "0"],
          width: "100%",
          height: "100%",
          transition: {
            duration: 1.2,
            ease: [0.77, 0, 0.175, 1],
            height: { duration: 1.6, ease: [0.77, 0, 0.175, 1] },
          },
        },
        open: {
          y: "0",
          width: "100%",
          height: "100%",
        },
      }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      onAnimationComplete={(def) => {
        if (def === "opening") setStage("open");
      }}
      className={cn(
        "relative bg-yellow-400 text-stone-800 overflow-hidden",
        !isOpen && "w-2xs aspect-99/70",
        isOpen && "pointer-events-auto",
      )}
    >
      <p
        className={cn(
          "absolute top-2 font-semibold text-nowrap right-4 transition-all duration-700",
          !isSealed && "top-4 right-[calc(100%-3rem)] translate-x-full",
        )}
      >
        ¤ Liberty Layers
      </p>
      {isOpen && children}
    </motion.main>
  );
}
