"use client";

import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "motion/react";
import { Popover } from "@base-ui/react/popover";
import Pip, { PipCorners } from "../brand/Pip";
import { cn } from "@/lib/utils";
import { Slider } from "@base-ui/react";

// ─── Constants ────────────────────────────────────────────────────────────────

const EQUILIBRIUM = 0.5;

const SELLERS: { id: string; label: string; minPrice: number }[] = [
  { id: "s0", label: "Bakery on Korunní St", minPrice: 0.14 },
  { id: "s1", label: "Family farm, Moravia", minPrice: 0.19 },
  { id: "s2", label: "Mill cooperative", minPrice: 0.31 },
  { id: "s3", label: "Artisan baker", minPrice: 0.41 },
  { id: "s4", label: "Regional distributor", minPrice: 0.47 },
  { id: "s5", label: "Importer, Brno", minPrice: 0.58 },
  { id: "s6", label: "Supermarket chain", minPrice: 0.71 },
  { id: "s7", label: "Factory outlet", minPrice: 0.79 },
];

const BUYERS: { id: string; label: string; maxPrice: number }[] = [
  { id: "b0", label: "Hospital canteen", maxPrice: 0.88 },
  { id: "b1", label: "Restaurant owner", maxPrice: 0.76 },
  { id: "b2", label: "School cafeteria", maxPrice: 0.66 },
  { id: "b3", label: "Office worker", maxPrice: 0.61 },
  { id: "b4", label: "Young family", maxPrice: 0.53 },
  { id: "b5", label: "Night shift worker", maxPrice: 0.48 },
  { id: "b6", label: "Corner shop", maxPrice: 0.39 },
  { id: "b7", label: "Student, 22", maxPrice: 0.29 },
  { id: "b8", label: "Single mother, 2 kids", maxPrice: 0.22 },
  { id: "b9", label: "Retiree on fixed pension", maxPrice: 0.17 },
];

// ─── Types ────────────────────────────────────────────────────────────────────

type SellerState = "selling" | "surplus" | "under-produced" | "high-cost";
type BuyerState = "buying" | "shortage" | "budget-strained" | "low-value";

const PIP_COLOR: Record<SellerState | BuyerState, string> = {
  selling: "stroke-stone-700",
  buying: "stroke-yellow-600",
  surplus: "stroke-yellow-400",
  shortage: "stroke-stone-400",
  "budget-strained": "stroke-yellow-300",
  "under-produced": "stroke-stone-300",
  "high-cost": "stroke-stone-200",
  "low-value": "stroke-yellow-200",
};

const GROUP_META: Record<
  SellerState | BuyerState,
  { label: string; desc: string; accent: "stone" | "yellow" | false }
> = {
  selling: {
    label: "Selling",
    desc: "Min price met — matched with a buyer",
    accent: false,
  },
  surplus: {
    label: "Excess Supply",
    desc: "Willing at floor price but no buyer remains",
    accent: "yellow",
  },
  "under-produced": {
    label: "Under-Produced",
    desc: "Won't sell below ceiling — priced out",
    accent: "stone",
  },
  "high-cost": {
    label: "High-Cost Producer",
    desc: "Min price above effective price — not yet competitive",
    accent: false,
  },
  buying: {
    label: "Buying",
    desc: "Max price met — matched with a seller",
    accent: false,
  },
  shortage: {
    label: "Excess Demand",
    desc: "Willing to pay but no seller available",
    accent: "stone",
  },
  "budget-strained": {
    label: "Budget-Strained",
    desc: "Could afford equilibrium — floor pushed price too high",
    accent: "yellow",
  },
  "low-value": {
    label: "Low-Value Consumer",
    desc: "Max price below effective price — priced out",
    accent: false,
  },
};

// ─── PersonPip ────────────────────────────────────────────────────────────────

function PersonPip({
  label,
  state,
  price,
  priceLabel,
}: {
  label: string;
  state: SellerState | BuyerState;
  price: number;
  priceLabel: "min" | "max";
}) {
  return (
    <motion.div layout="position" layoutId={label}>
      <Popover.Root>
        <Popover.Trigger
          openOnHover
          className="group pointer-events-auto flex items-center justify-center p-1"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <Pip
            className={cn(
              "h-6 transition-colors duration-200 group-data-popup-open:scale-125",
              PIP_COLOR[state],
            )}
          />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner sideOffset={6}>
            <Popover.Popup className="origin-(--transform-origin) bg-yellow-100 px-3 py-2 transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 z-50 flex flex-col gap-1">
              <Popover.Title className="font-mono text-[10px] uppercase tracking-[0.15em] text-stone-600">
                {label}
              </Popover.Title>
              <p className="font-mono text-[10px] text-stone-400 tracking-wide">
                {priceLabel === "min" ? "Min price" : "Max price"}:{" "}
                <span className="text-stone-600">
                  {(price * 100).toFixed(0)}
                </span>
              </p>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </motion.div>
  );
}

// ─── Group ────────────────────────────────────────────────────────────────────

function Group({
  stateKey,
  items,
}: {
  stateKey: SellerState | BuyerState;
  items: {
    id: string;
    label: string;
    state: SellerState | BuyerState;
    price: number;
    priceLabel: "min" | "max";
  }[];
}) {
  const meta = GROUP_META[stateKey];
  if (!meta) return null;
  const { label, desc, accent } = meta;

  return (
    <div className="p-8 flex flex-col gap-2 bg-yellow-200">
      <div className="flex flex-col gap-0.5">
        <span
          className={cn(
            "font-mono text-[9px] uppercase tracking-[0.2em]",
            accent === "stone"
              ? "text-stone-500"
              : accent === "yellow"
                ? "text-yellow-600"
                : "text-stone-400",
          )}
        >
          {label}
          <span className="ml-2 opacity-50">{items.length}</span>
        </span>
        <span className="font-mono text-[9px] text-stone-400 tracking-wide">
          {desc}
        </span>
      </div>

      {/* Container always rendered — min-h keeps it visible when empty */}
      <div className="flex flex-wrap gap-1 min-h-8 rounded-sm transition-colors duration-300">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <PersonPip
              key={item.id}
              label={item.label}
              state={item.state}
              price={item.price}
              priceLabel={item.priceLabel}
            />
          ))}
        </AnimatePresence>
        {items.length === 0 && (
          <span className="font-mono text-[9px] text-stone-300 self-center">
            —
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function ShortageSimulator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasDragged, setHasDragged] = useState(false);

  const [value, setValue] = useState([20, 80]);

  const floorVal = value[0]; // 0–100
  const ceilingVal = value[1]; // 0–100
  const floor = floorVal / 100; // price 0–1
  const ceiling = ceilingVal / 100; // price 0–1

  const ceilingSvgY = 100 - ceilingVal;
  const floorSvgY = 100 - floorVal;

  // ── Economics ──────────────────────────────────────────────────────────────

  const isCeilingEffective = ceiling < EQUILIBRIUM;
  const isFloorEffective = floor > EQUILIBRIUM;

  const sellerGroups = useMemo(() => {
    const effectivePrice = isCeilingEffective
      ? ceiling
      : isFloorEffective
        ? floor
        : EQUILIBRIUM;
    const willing = SELLERS.filter((s) => s.minPrice <= effectivePrice);
    const willingBuyerCount = BUYERS.filter(
      (b) => b.maxPrice >= effectivePrice,
    ).length;
    const selling = willing.slice(0, willingBuyerCount);
    const surplus = willing.slice(willingBuyerCount);
    const notWilling = SELLERS.filter((s) => s.minPrice > effectivePrice);
    const underProduced = isCeilingEffective
      ? notWilling.filter((s) => s.minPrice <= EQUILIBRIUM)
      : [];
    const highCost = notWilling.filter(
      (s) => s.minPrice > EQUILIBRIUM && !underProduced.includes(s),
    );
    return { selling, surplus, underProduced, highCost };
  }, [ceiling, floor, isCeilingEffective, isFloorEffective]);

  const buyerGroups = useMemo(() => {
    const effectivePrice = isCeilingEffective
      ? ceiling
      : isFloorEffective
        ? floor
        : EQUILIBRIUM;
    const willing = BUYERS.filter((b) => b.maxPrice >= effectivePrice);
    const buying = willing.slice(0, sellerGroups.selling.length);
    const shortage = willing.slice(sellerGroups.selling.length);
    const budgetStrained = isFloorEffective
      ? BUYERS.filter((b) => b.maxPrice >= EQUILIBRIUM && b.maxPrice < floor)
      : [];
    const lowValue = BUYERS.filter(
      (b) => b.maxPrice < effectivePrice && !budgetStrained.includes(b),
    );
    return { buying, shortage, budgetStrained, lowValue };
  }, [
    ceiling,
    floor,
    isCeilingEffective,
    isFloorEffective,
    sellerGroups.selling.length,
  ]);

  return (
    <div className="mx-16 max-w-6xl w-screen">
      <div className="relative grid grid-cols-2">
        <PipCorners />

        {/* ── Left: Graph ── */}
        <div className="flex flex-col gap-2 bg-yellow-300 p-16 pr-8">
          <div className="flex flex-row gap-2">
            {/* Y legend*/}
            <div
              className={cn(
                "flex justify-between text-yellow-600 text-2xl font-extralight uppercase [writing-mode:vertical-rl] rotate-180 self-stretch",
              )}
            >
              <span>Low</span>
              <span>Price</span>
              <span>High</span>
            </div>
            <div ref={containerRef} className="relative w-full aspect-3/4">
              <div className="absolute inset-0 border-b border-l  border-yellow-600" />

              {/* Supply/demand curves + shortage/surplus markers */}
              <svg
                className="absolute inset-0 size-full pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <line
                  x1="0"
                  y1="100"
                  x2="100"
                  y2="0"
                  vectorEffect="non-scaling-stroke"
                  className="stroke-yellow-600"
                />
                <line
                  x1="0"
                  y1="0"
                  x2="100"
                  y2="100"
                  vectorEffect="non-scaling-stroke"
                  className="stroke-yellow-600"
                />

                {isCeilingEffective && (
                  <polygon
                    points={`50,50 ${100 - ceilingSvgY},${ceilingSvgY} ${ceilingSvgY},${ceilingSvgY}`}
                    className="fill-stone-500"
                    vectorEffect="non-scaling-stroke"
                  />
                )}
                {isFloorEffective && (
                  <polygon
                    points={`50,50 ${100 - floorSvgY},${floorSvgY} ${floorSvgY},${floorSvgY}`}
                    className="fill-yellow-700"
                    vectorEffect="non-scaling-stroke"
                  />
                )}
              </svg>

              <div
                className="absolute top-0 w-full bg-[repeating-linear-gradient(to_bottom,currentColor_0px,currentColor_1px,transparent_1px,transparent_6px)] text-stone-500/40"
                style={{ height: `${100 - ceilingVal}%` }}
              />

              <div
                className="absolute bottom-0 w-full bg-[repeating-linear-gradient(to_top,currentColor_0px,currentColor_1px,transparent_1px,transparent_6px)] text-yellow-700/40"
                style={{ height: `${floorVal}%` }}
              />

              <Slider.Root
                className="size-full"
                orientation="vertical"
                value={value}
                onValueChange={setValue}
                step={0.1}
                minStepsBetweenValues={80}
                thumbAlignment="edge-client-only"
              >
                <Slider.Control className="flex size-full touch-none items-center select-none">
                  <Slider.Track className="size-full">
                    <Slider.Thumb
                      index={0}
                      aria-label="Floor"
                      className={cn(
                        "w-full h-px bg-yellow-700 text-yellow-700 select-none has-focus-visible:outline-1 has-focus-visible:outline-yellow-700",
                        "flex justify-start items-end px-4",
                      )}
                    >
                      <span className="font-mono text-xs uppercase tracking-widest leading-loose">
                        Floor{" "}
                        <Slider.Value>
                          {(formattedValues) => formattedValues[0]}
                        </Slider.Value>
                      </span>
                    </Slider.Thumb>

                    <Slider.Thumb
                      index={1}
                      aria-label="Ceiling"
                      className={cn(
                        "w-full h-px bg-stone-500 text-stone-500 select-none has-focus-visible:outline-1 has-focus-visible:outline-stone-500",
                        "flex justify-start items-start px-4",
                      )}
                    >
                      <span className="font-mono text-xs uppercase tracking-widest leading-loose">
                        Ceiling{" "}
                        <Slider.Value>
                          {(formattedValues) => formattedValues[1]}
                        </Slider.Value>
                      </span>
                    </Slider.Thumb>
                  </Slider.Track>
                </Slider.Control>
              </Slider.Root>

              <span className="absolute top-12 right-10 -rotate-[52.5deg] text-sm leading-none text-yellow-600 select-none pointer-events-none">
                Supply
              </span>
              <span className="absolute top-1/2 left-1/2 -translate-y-1/2 translate-x-4 text-sm leading-none text-yellow-600 select-none pointer-events-none">
                Equilibrium
              </span>
              <span className="absolute bottom-12 right-10 rotate-[52.5deg] text-sm leading-none text-yellow-600 select-none pointer-events-none">
                Demand
              </span>

              <AnimatePresence>
                {ceilingSvgY > 63 && (
                  <motion.span
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute font-mono text-xs uppercase tracking-widest text-stone-200 select-none pointer-events-none -translate-x-1/2 -translate-y-full"
                    style={{
                      left: "50%",
                      top: `${Math.max((1 - ceiling) * 100 - 2, 63)}%`,
                    }}
                  >
                    Shortage
                  </motion.span>
                )}
                {floorSvgY < 37 && (
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute font-mono text-xs uppercase tracking-widest text-yellow-200 select-none pointer-events-none -translate-x-1/2"
                    style={{
                      left: "50%",
                      top: `${Math.min((1 - floor) * 100 + 2, 37)}%`,
                    }}
                  >
                    Surplus
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* X legend*/}
          <div
            className={cn(
              "flex justify-between pl-10 items-end text-yellow-600 text-2xl font-extralight uppercase",
            )}
          >
            <span>0</span>
            <span>Quantity</span>
            <span>Max</span>
          </div>
        </div>

        {/* ── Right: Sellers + Buyers ── */}
        {/* TODO: Change the layout to a grid with different colored blocks*/}
        <LayoutGroup>
          <div className="flex flex-col gap-8 p-8 bg-yellow-300">
            <div className="relative grid grid-cols-2 gap-px grow">
              <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold text-base tracking-tight text-stone-800 bg-yellow-300 px-2">
                Sellers
              </p>
              {(
                [
                  "selling",
                  "surplus",
                  "under-produced",
                  "high-cost",
                ] as SellerState[]
              ).map((key) => {
                const groupItems = {
                  selling: sellerGroups.selling,
                  surplus: sellerGroups.surplus,
                  "under-produced": sellerGroups.underProduced,
                  "high-cost": sellerGroups.highCost,
                }[key];
                return (
                  <Group
                    key={key}
                    stateKey={key}
                    items={groupItems.map((s) => ({
                      ...s,
                      state: key as SellerState,
                      price: s.minPrice,
                      priceLabel: "min" as const,
                    }))}
                  />
                );
              })}
            </div>

            <div className="relative grid grid-cols-2 gap-px grow">
              <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-semibold text-base tracking-tight text-stone-800 bg-yellow-300 px-2">
                Buyers
              </p>
              {(
                [
                  "buying",
                  "shortage",
                  "budget-strained",
                  "low-value",
                ] as BuyerState[]
              ).map((key) => {
                const groupItems = {
                  buying: buyerGroups.buying,
                  shortage: buyerGroups.shortage,
                  "budget-strained": buyerGroups.budgetStrained,
                  "low-value": buyerGroups.lowValue,
                }[key];
                return (
                  <Group
                    key={key}
                    stateKey={key}
                    items={groupItems.map((b) => ({
                      ...b,
                      state: key as BuyerState,
                      price: b.maxPrice,
                      priceLabel: "max" as const,
                    }))}
                  />
                );
              })}
            </div>
          </div>
        </LayoutGroup>
      </div>
    </div>
  );
}
