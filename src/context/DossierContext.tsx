"use client";
import { usePathname } from "next/navigation";
import { createContext, useContext, useRef, useState } from "react";

type DossierStage = "sealed" | "hover" | "opening" | "open";
interface DossierContextType {
  stage: DossierStage;
  setStage: (stage: DossierStage) => void;
}

const DossierContext = createContext<DossierContextType | null>(null);

export function DossierProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [stage, setStage] = useState<DossierStage>(() =>
    pathname === "/" ? "sealed" : "open",
  );

  return (
    <DossierContext.Provider value={{ stage, setStage }}>
      {children}
    </DossierContext.Provider>
  );
}

export const useDossier = () => {
  const ctx = useContext(DossierContext);
  if (!ctx) throw new Error("useDossier must be used within DossierProvider");
  return ctx;
};
