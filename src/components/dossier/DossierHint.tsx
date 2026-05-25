"use client";
import { cn } from "@/lib/utils";
import { useDossier } from "@/context/DossierContext";

export function DossierHint() {
  const { stage } = useDossier();
  const isSealed = stage === "sealed" || stage === "hover";
  const isOpen = stage === "open";

  return (
    <div
      className={cn(
        "absolute bottom-0 w-full mb-8 pointer-events-auto",
        "text-center font-mono text-[0.6rem] uppercase tracking-widest leading-loose text-stone-600",
        isSealed &&
          "motion-preset-slide-up motion-duration-1000 motion-delay-300",
        !isSealed && "motion-translate-y-out-100 motion-opacity-out-0",
        isOpen && "opacity-0",
      )}
    >
      <p>Ref: LL-2026-ALPHA</p>
      <p>Clearance: Public dissemination</p>
      <p
        className={cn(
          "transition-colors",
          stage === "hover" && "text-stone-300",
        )}
      >
        Action: Click to open
      </p>
    </div>
  );
}
