"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PipCorners } from "../brand/Pip";
import { Button, Tabs } from "@base-ui/react";
import { cn } from "@/lib/utils";

// ─── Data ────────────────────────────────────────────────────────────────────

type PencilPart = {
  id: string;
  label: string;
  description: string;
  receiptItems: string[];
};

const PENCIL_PARTS: PencilPart[] = [
  {
    id: "graphite",
    label: "Graphite",
    description: "A mixture of graphite and clay mined on multiple continents.",
    receiptItems: [
      "Miners in Sri Lanka & Mexico",
      "Geological surveying crews",
      "Open-pit mining machinery",
      "Clay quarrying workers",
      "Water used in ore washing",
      "Chemical processing agents",
      "Kiln-firing energy (900 °C)",
      "Hardness-grade QA testing",
      "Packaging & bulk transport",
      "Import tariff administration",
      "Port handling & warehousing",
      "Laboratory material scientists",
      "Safety regulation compliance",
      "Environmental remediation fund",
    ],
  },
  {
    id: "glue",
    label: "Glue",
    description: "Casein-based adhesive bonding the core to cedar slats.",
    receiptItems: [
      "Dairy farmers & their cows",
      "Milk trucking & refrigeration",
      "Casein extraction plant workers",
      "Chemical engineers (formulation)",
      "Industrial mixing equipment",
      "Adhesive quality testers",
      "Safety data sheet authors",
      "Storage temperature control",
      "Drum manufacturing (metal)",
      "Logistics & delivery drivers",
      "Hazardous-material licensing",
      "Animal feed for dairy herds",
      "Veterinary care for cattle",
      "Insurance on transport fleet",
    ],
  },
  {
    id: "cedar",
    label: "Cedar wood",
    description:
      "Incense cedar from California — split, grooved, and glued around the core.",
    receiptItems: [
      "Forest rangers & foresters",
      "Logging truck drivers",
      "Sawmill operators",
      "Kiln-drying technicians",
      "Slat-cutting machinery",
      "Groove-routing CNC programs",
      "Wood-grading inspectors",
      "Reforestation planting crews",
      "Rainfall & decades of sunlight",
      "Soil nutrients & mycorrhizae",
      "Fire-prevention infrastructure",
      "Timber land ownership rights",
      "Occupational safety training",
      "Export documentation clerks",
    ],
  },
  {
    id: "lacquer",
    label: "Lacquer",
    description:
      "Multiple coats of paint give the pencil its colour and smooth finish.",
    receiptItems: [
      "Petroleum refinery workers",
      "Chemical synthesisers (resin)",
      "Colour pigment manufacturers",
      "Spray-coating machine operators",
      "Ventilation & safety engineers",
      "UV-curing lamp technicians",
      "VOC emission regulation staff",
      "Colour-matching laboratories",
      "Solvent recovery systems",
      "Waste disposal contractors",
      "Industrial hygiene inspectors",
      "Branding & packaging designers",
      "Shelf-life testing labs",
      "Raw material price negotiators",
    ],
  },
  {
    id: "wax",
    label: "Wax",
    description: "A thin wax coating reduces friction and adds a slight sheen.",
    receiptItems: [
      "Petroleum or carnauba harvesters",
      "Wax refinery plant workers",
      "Carnauba palm farmers (Brazil)",
      "Tropical agricultural labour",
      "Shipping across the Atlantic",
      "Blending & emulsification labs",
      "Application roller technicians",
      "Machine cleaning & maintenance",
      "Quality-feel testing panelists",
      "Cosmetic-grade certification",
      "Agricultural export licensing",
      "Currency exchange (BRL/USD)",
      "Fumigation for customs entry",
      "Environmental impact studies",
    ],
  },
  {
    id: "ferrule",
    label: "Ferrule",
    description:
      "The aluminium band that clamps the eraser to the pencil body.",
    receiptItems: [
      "Bauxite miners (Guinea, Australia)",
      "Aluminium smelter workers",
      "Rolling mill operators",
      "Strip-cutting & stamping crews",
      "Crimp-press machine engineers",
      "Electroplating bath chemists",
      "Anti-corrosion coating staff",
      "Metal recycling infrastructure",
      "Energy grid for electrolysis",
      "Hydroelectric dam construction",
      "Tooling & die manufacturers",
      "Dimensional QA measurement",
      "Trade union wage negotiations",
      "Carbon offset scheme auditors",
    ],
  },
  {
    id: "eraser",
    label: "Eraser",
    description:
      "The plug eraser — vulcanised rubber crimped inside the ferrule.",
    receiptItems: [
      "Rubber tappers in Malaysia",
      "Rubber plantation owners",
      "Tropical deforestation offsets",
      "Vulcanisation chemical workers",
      "Sulphur mining & processing",
      "Pumice powder suppliers",
      "Abrasive-grade QA labs",
      "Colour pigment (pink dye)",
      "Extrusion machine operators",
      "Cutting & sizing machinery",
      "Eraser hardness-feel testers",
      "Shipping containers & cooling",
      "Import duty & customs filing",
      "Decades of agricultural trade",
    ],
  },
];

// ─── Hotspot positions ────────────────

const HOTSPOTS = [
  {
    id: "graphite",
    top: "3%",
    box: {
      y: 0.5,
      h: 17,
    },
  },
  {
    id: "cedar",
    top: "8%",
    box: {
      y: 17.5,
      h: 37,
    },
  },
  {
    id: "glue",
    top: "19%",
    box: {
      y: 54.5,
      h: 141,
    },
  },
  {
    id: "lacquer",
    top: "45%",
    box: {
      y: 195.5,
      h: 140,
    },
  },
  {
    id: "wax",
    top: "73%",
    box: {
      y: 335.5,
      h: 141,
    },
  },
  {
    id: "ferrule",
    top: "87%",
    box: {
      y: 476.5,
      h: 33,
    },
  },
  {
    id: "eraser",
    top: "93%",
    box: {
      y: 509.5,
      h: 16,
    },
  },
];

// ─── Pencil Illustration ──────────────────────────────────────────────────────

function PencilIllustration({
  activeId,
  onSelect,
}: {
  activeId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="relative flex flex-col items-center justify-center select-none max-h-screen">
      <Tabs.List className="contents">
        <svg className="h-full w-auto" viewBox="0 0 23 526">
          {/* Sharpened edge */}
          <path
            className={cn(
              "transition-all",
              activeId === "cedar"
                ? "fill-stone-200 stroke-stone-600"
                : "fill-yellow-100 stroke-yellow-600",
            )}
            d="M11.5 0.0998535L22.5 54.0999V62.0999H0.5V54.0999L11.5 0.0998535Z"
            vectorEffect="non-scaling-stroke"
          />

          {/* Graphite tip */}
          <path
            className={cn(
              "transition-all",
              activeId === "graphite"
                ? "fill-stone-600 stroke-stone-600"
                : "fill-yellow-600 stroke-yellow-600",
            )}
            d="M11.5 0.0998535L14.25 13.5999L11.5 17.0999L8.75 13.5999L11.5 0.0998535Z"
            vectorEffect="non-scaling-stroke"
          />

          {/* Body */}
          <g
            className={cn(
              "transition-all",
              activeId === "wax" ||
                activeId === "lacquer" ||
                activeId === "glue"
                ? "fill-stone-300 stroke-stone-600"
                : "fill-yellow-400 stroke-yellow-600",
            )}
          >
            <path
              d="M0.5 57.0998C0.5 55.443 1.84315 54.0999 3.5 54.0999V54.0999C5.15685 54.0999 6.5 55.443 6.5 57.0999V476.1H0.5V57.0998Z"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M6.5 59.5998C6.5 56.5623 8.96243 54.0999 12 54.0999V54.0999C15.0376 54.0999 17.5 56.5623 17.5 59.5999V476.1H6.5V59.5998Z"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d="M17.5 56.5999C17.5 55.2191 18.6193 54.0999 20 54.0999V54.0999C21.3807 54.0999 22.5 55.2191 22.5 56.5999V476.1H17.5V56.5999Z"
              vectorEffect="non-scaling-stroke"
            />
          </g>

          {/* Eraser */}
          <rect
            className={cn(
              "transition-all",
              activeId === "eraser"
                ? "fill-stone-500 stroke-stone-500"
                : "fill-yellow-600 stroke-yellow-600",
            )}
            x="2.5"
            y="503.1"
            width="18"
            height="22"
            rx="6"
            vectorEffect="non-scaling-stroke"
          />

          {/* Ferrule */}
          <g
            className={cn(
              "transition-all",
              activeId === "ferrule"
                ? "fill-stone-200 stroke-stone-600"
                : "fill-yellow-100 stroke-yellow-600",
            )}
          >
            <rect
              x="0.5"
              y="476.1"
              width="22"
              height="33"
              vectorEffect="non-scaling-stroke"
            />
            <rect
              x="0.5"
              y="480.1"
              width="22"
              height="25"
              vectorEffect="non-scaling-stroke"
            />
            <rect
              x="0.5"
              y="497.1"
              width="22"
              height="4"
              vectorEffect="non-scaling-stroke"
            />
            <rect
              x="7.5"
              y="497.1"
              width="17"
              height="8"
              transform="rotate(-90 7.5 497.1)"
              vectorEffect="non-scaling-stroke"
            />
          </g>

          {HOTSPOTS.map((hotspot) => (
            <Tabs.Tab
              key={hotspot.id}
              value={hotspot.id}
              className="cursor-pointer"
              render={
                <rect
                  className="outline-none opacity-0"
                  x="0.5"
                  y={hotspot.box.y}
                  width="22"
                  height={hotspot.box.h}
                />
              }
              nativeButton={false}
            />
          ))}
        </svg>
      </Tabs.List>

      <div className="absolute left-1/2 w-0 h-full">
        {HOTSPOTS.map((hs, i) => {
          const part = PENCIL_PARTS.find((p) => p.id === hs.id)!;
          const isActive = activeId === hs.id;
          const isMirrored = i % 2 === 0;

          return (
            <div
              key={hs.id}
              className={cn(
                "absolute group flex gap-2 items-center pointer-events-none",

                isMirrored ? "right-0" : "left-0",
              )}
              style={{ top: hs.top }}
            >
              <svg
                className={cn(
                  "w-24 h-px stroke-1 fill-none overflow-visible transition-colors",
                  isActive ? "stroke-stone-800" : "stroke-yellow-600",
                  isMirrored ? "order-2 -scale-x-100" : "",
                  part.id === "graphite" && "-scale-y-100",
                  part.id === "cedar" && "-scale-y-100",
                )}
                viewBox="0 0 120 1"
              >
                <path d="M0 40L40 0H120" vectorEffect="non-scaling-stroke" />
              </svg>

              <Button
                onClick={() => onSelect(hs.id)}
                className="cursor-pointer pointer-events-auto"
              >
                <span
                  className={cn(
                    "inline-block font-semibold text-base leading-none tracking-tight transition-all",
                    isActive ? "text-stone-800" : "text-yellow-600 font-normal",
                  )}
                >
                  {part.label}
                </span>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Receipt ──────────────────────────────────────────────────────────────────

const TIMESTAMP = {
  date: new Date()
    .toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    .toUpperCase(),
  time: new Date()
    .toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
    .toUpperCase(),
};

function Receipt({ part }: { part: PencilPart }) {
  return (
    <div className="flex flex-col max-h-screen">
      <AnimatePresence mode="wait">
        <motion.div
          key={part.id}
          role="tabpanel"
          initial={{ opacity: 0, y: 200, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: 1 }}
          exit={{ opacity: 0, y: -200, rotate: 2 }}
          transition={{ type: "spring", visualDuration: 0.3, bounce: 0 }}
          style={{
            WebkitMaskImage: `
              conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg),
              conic-gradient(from 135deg at top, #0000, #000 1deg 89deg, #0000 90deg)
            `,
            WebkitMaskSize: "24px 51%, 24px 51%",
            WebkitMaskPosition: "bottom, top",
            WebkitMaskRepeat: "repeat-x",
          }}
          className="relative bg-yellow-100 text-yellow-800 font-mono w-full flex flex-col h-full"
        >
          {/* Header Section */}
          <div className="flex flex-col items-center text-center pt-10 px-8">
            <p className="text-sm italic font-serif text-yellow-600 mb-4">
              Receipt
            </p>

            <p className="text-5xl font-black uppercase tracking-tighter font-sans mb-2">
              {part.label}
            </p>

            <p className="text-base font-sans mb-4  max-w-2xs">
              {part.description}
            </p>

            <div className="w-full h-12 bg-[repeating-linear-gradient(to_right,currentColor_0px,currentColor_1px,transparent_1px,transparent_6px)] text-yellow-500" />
          </div>

          {/* Items Section */}
          <div className="grow px-8 overflow-hidden relative my-6">
            <motion.ul
              animate={{ y: ["0%", "-50%"] }}
              transition={{
                ease: "linear",
                duration: part.receiptItems.length * 2,
                repeat: Infinity,
              }}
              className="space-y-1.5 min-h-max"
            >
              {[...part.receiptItems, ...part.receiptItems].map((item, i) => (
                <motion.li
                  key={item + i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: i * 0.03,
                    type: "spring",
                    visualDuration: 0.3,
                    bounce: 0,
                  }}
                  className="flex justify-between items-end text-[13px] uppercase tracking-wide gap-4"
                >
                  <span className="truncate">{item}</span>
                  <span className="shrink-0 text-yellow-600">¤ ?.??</span>
                </motion.li>
              ))}
            </motion.ul>
            <div className="absolute top-0 left-0 w-full h-8 bg-linear-to-b from-yellow-100 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-full h-8 bg-linear-to-t from-yellow-100 to-transparent pointer-events-none" />
          </div>

          {/* Footer Section */}
          <div
            className="px-8 pb-10 text-center text-xs tracking-widest leading-relaxed"
            suppressHydrationWarning
          >
            <div className="w-full h-12 bg-[repeating-linear-gradient(to_right,currentColor_0px,currentColor_1px,transparent_1px,transparent_6px)] text-yellow-500 mb-4" />
            {TIMESTAMP.date} – {TIMESTAMP.time}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function PencilPriceReceipt() {
  const [activeId, setActiveId] = useState<string>("graphite");
  const activePart =
    PENCIL_PARTS.find((p) => p.id === activeId) ?? PENCIL_PARTS[0];

  return (
    <div className="mx-16 max-w-6xl w-screen">
      <Tabs.Root
        value={activeId}
        onValueChange={(val) => val !== null && setActiveId(val)}
      >
        <div className="relative p-16 bg-yellow-300 grid grid-cols-2 gap-16 max-h-[120vh] overflow-hidden">
          <PipCorners />

          <PencilIllustration activeId={activeId} onSelect={setActiveId} />

          <Receipt part={activePart} />
        </div>
      </Tabs.Root>
    </div>
  );
}
