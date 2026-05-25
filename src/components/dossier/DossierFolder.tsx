"use client";
import AnarchyIsOrder from "@/components/brand/AnarchyIsOrder";
import { AnimatePresence, motion } from "motion/react";
import { useDossier } from "@/context/DossierContext";

export function DossierFolder() {
  const { stage } = useDossier();
  const isSealed = stage === "sealed" || stage === "hover";

  return (
    <AnimatePresence>
      {isSealed && (
        <>
          {/* Back */}
          <motion.div
            exit={{
              y: "100vh",
              rotateZ: -12,
              transition: { duration: 0.7, ease: "easeIn" },
            }}
            className="w-2xs aspect-99/70 absolute bg-stone-400"
          />

          {/* Front cover */}
          <motion.div
            variants={{
              sealed: {
                background:
                  "linear-gradient(0deg,var(--color-stone-300) 0%, var(--color-stone-200) 0%)",
              },
              hover: {
                rotateX: 30,
                skewX: 8,
                background:
                  "linear-gradient(0deg,var(--color-stone-300) 0%, var(--color-stone-200) 90%)",
                transition: {
                  type: "spring",
                  visualDuration: 0.3,
                  bounce: 0.5,
                },
              },
            }}
            exit={{
              background:
                "linear-gradient(0deg,var(--color-stone-300) 0%, var(--color-stone-200) 0%)",
              y: "100vh",
              rotateZ: -12,
              transition: { duration: 0.7, ease: "easeIn" },
            }}
            transition={{ type: "spring", visualDuration: 0.5, bounce: 0 }}
            style={{
              transformOrigin: "bottom center",
              transformStyle: "preserve-3d",
              zIndex: 2,
            }}
            className="w-2xs aspect-99/70 absolute text-stone-800 p-4"
          >
            <svg
              aria-hidden="true"
              className="absolute left-0 top-px -translate-y-full w-20 h-4 fill-stone-200"
              viewBox="0 0 64 16"
              preserveAspectRatio="none"
            >
              <path d="M12.8 0H51.2L64 16H0L12.8 0Z" />
            </svg>
            <div className="absolute inset-0 overflow-hidden">
              <AnarchyIsOrder className="absolute fill-stone-600 h-[120%] -right-4 -bottom-2 rotate-12 pointer-events-none" />
              <div
                style={{ filter: "url(#stamp)" }}
                className="absolute left-4 bottom-8 px-[0.1em] leading-none w-fit font-mono font-bold outline-4 uppercase text-4xl tracking-tighter -rotate-6 rounded-sm"
              >
                Classified
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
