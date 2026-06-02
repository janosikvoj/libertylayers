"use client";

import LayersOfLiberty from "@/components/brand/LayersOfLiberty";
import { DOSSIER_SHAPE } from "@/components/dossier/dossier";
import { DossierFolder } from "@/components/dossier/DossierFolder";
import { DossierHint } from "@/components/dossier/DossierHint";
import { DossierPage } from "@/components/dossier/DossierPage";
import { useDossier } from "@/context/DossierContext";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { stage, setStage } = useDossier();
  const isSealed = stage === "sealed" || stage === "hover";
  const isOpen = stage === "open";

  return (
    <div className="relative h-screen overflow-hidden bg-stone-950 text-neutral-100">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
      >
        <LayersOfLiberty
          className="absolute top-0 w-full max-h-full h-auto"
          fill="url(#stripes-horizontal)"
          preserveAspectRatio="xMinYMid meet"
        />
      </motion.div>

      {isSealed && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <motion.button
            aria-label="Open classified file"
            onClick={() => setStage("opening")}
            onHoverStart={() => setStage("hover")}
            onHoverEnd={() => setStage("sealed")}
            className={cn(
              "pointer-events-auto absolute outline-none z-40 cursor-pointer",
              DOSSIER_SHAPE,
            )}
          />
        </div>
      )}

      <motion.div
        className={cn(
          "absolute inset-0 pointer-events-none flex items-center justify-center",
          !isOpen &&
            "motion-preset-slide-up-sm motion-duration-1000 motion-delay-500",
        )}
        initial="sealed"
        animate={stage}
      >
        <DossierFolder />
        <DossierPage>{children}</DossierPage>
      </motion.div>

      <DossierHint />
    </div>
  );
}
