"use client";

import { useState, useRef, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  LayoutGroup,
  MotionConfig,
} from "motion/react";
import { Popover } from "@base-ui/react/popover";
import Pip, { PipCorners } from "../brand/Pip";
import { cn } from "@/lib/utils";
import { Radio, RadioGroup, Slider } from "@base-ui/react";

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

type GroupMeta = { label: string; desc: string; active: boolean };
type SellerState = "selling" | "surplus" | "underProduced" | "highCost";
type BuyerState = "buying" | "shortage" | "budgetStrained" | "lowValue";

const SELLER_META: Record<SellerState, GroupMeta> = {
  selling: {
    label: "Trading",
    desc: "Found a buyer at an acceptable price",
    active: true,
  },
  surplus: {
    label: "No Buyers Left",
    desc: "Willing to sell, but all buyers are already matched",
    active: false,
  },
  underProduced: {
    label: "Priced Out",
    desc: "The price cap is below what they need to cover costs",
    active: false,
  },
  highCost: {
    label: "Too Expensive",
    desc: "Their costs are too high to compete at the current price",
    active: false,
  },
};

const BUYER_META: Record<BuyerState, GroupMeta> = {
  buying: {
    label: "Trading",
    desc: "Found a seller at an acceptable price",
    active: true,
  },
  shortage: {
    label: "No Sellers Left",
    desc: "Willing to buy, but all sellers are already matched",
    active: false,
  },
  budgetStrained: {
    label: "Priced Out",
    desc: "The price floor pushed the price above their budget",
    active: false,
  },
  lowValue: {
    label: "Can't Afford It",
    desc: "The price was always above what they're able to pay",
    active: false,
  },
};

// ─── PersonPip ────────────────────────────────────────────────────────────────

function PersonPip({
  label,
  active,
  price,
  isSeller,
}: {
  label: string;
  active: boolean;
  price: number;
  isSeller: boolean;
}) {
  const ratio = 0.1 + (0.9 - 0.1) * (1 - price);

  return (
    <motion.div
      layout="position"
      layoutId={label}
      transition={{ type: "spring", visualDuration: 0.6, bounce: 0.1 }}
    >
      <Popover.Root>
        <Popover.Trigger
          openOnHover
          className="group pointer-events-auto flex items-center justify-center p-1"
          onPointerDown={(e) => e.stopPropagation()}
          nativeButton={false}
          render={
            <Pip
              ratio={ratio}
              className={cn(
                "h-8 transition-all duration-200 group-data-popup-open:scale-125",
                isSeller
                  ? cn("stroke-yellow-700", active && "fill-yellow-700")
                  : cn("stroke-stone-600", active && "fill-stone-600"),
              )}
            />
          }
        />
        <Popover.Portal>
          <Popover.Positioner sideOffset={6}>
            <Popover.Popup className="origin-(--transform-origin) bg-yellow-100 px-3 py-2 transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 z-50 flex flex-col gap-1">
              <Popover.Title className="font-mono text-[10px] uppercase tracking-[0.15em] text-stone-600">
                {label}
              </Popover.Title>
              <p className="font-mono text-[10px] text-stone-400 tracking-wide">
                {isSeller ? "Min" : "Max"} price:{" "}
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

const MotionRadioRoot = motion(Radio.Root);

function Group({
  meta,
  value,
  setSelected,
  isSeller,
  items,
}: {
  meta: GroupMeta;
  value: SellerState | BuyerState;
  setSelected: (value: SellerState | BuyerState) => void;
  isSeller: boolean;
  items: { id: string; label: string; price: number }[];
}) {
  if (!meta) return null;
  const { label, desc } = meta;

  return (
    <MotionRadioRoot
      value={value}
      onHoverStart={() => setSelected(value)}
      layout
      className={cn(
        "group relative p-4 flex flex-col justify-between bg-yellow-200 overflow-hidden",
        isSeller ? "text-yellow-700" : "text-stone-500",
      )}
    >
      <motion.span layout className="text-base tracking-tight">
        {label}
        <span className="ml-1.5 font-mono opacity-65">{items.length}</span>
      </motion.span>

      <motion.div
        layout
        className="z-10 grow flex flex-wrap content-center justify-center gap-1"
      >
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <PersonPip
              key={item.id}
              label={item.label}
              active={meta.active}
              price={item.price}
              isSeller={isSeller}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <div className="absolute top-0 left-0 w-full min-h-2/3 p-4 bg-linear-0 to-yellow-100 via-yellow-100 opacity-0 group-data-checked:opacity-100 -translate-y-4 group-data-checked:translate-y-0 transition-all duration-700 group-data-checked:duration-200">
        <p className="text-sm tracking-wide">{desc}</p>
      </div>
    </MotionRadioRoot>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function ShortageSimulator() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState([20, 80]);
  const [selected, setSelected] = useState<string>("selling");

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
      <div className="relative grid grid-cols-2 gap-px bg-yellow-600">
        <PipCorners className="z-10" />

        {/* ── Left: Graph ── */}
        <div className="flex flex-col gap-px">
          <div className="flex flex-row gap-px">
            {/* Y legend*/}
            <div
              className={cn(
                "bg-yellow-300 p-4 pr-12 flex justify-between text-yellow-600 text-2xl font-extralight uppercase [writing-mode:vertical-rl] rotate-180 self-stretch",
              )}
            >
              <span>Low</span>
              <span>Price</span>
              <span>High</span>
            </div>
            <div
              ref={containerRef}
              className="relative w-full aspect-3/4 bg-yellow-300"
            >
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
                className="absolute top-0 w-full bg-stone-500/20"
                style={{ height: `${100 - ceilingVal}%` }}
              />

              <div
                className="absolute bottom-0 w-full bg-yellow-700/20"
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
                  <Slider.Track className="size-full hover:cursor-pointer">
                    <Slider.Thumb
                      index={0}
                      aria-label="Floor"
                      className={cn(
                        "w-full h-px hover:cursor-pointer bg-yellow-700 text-yellow-700 select-none has-focus-visible:outline-1 has-focus-visible:outline-yellow-700",
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
                        "w-full h-px hover:cursor-pointer bg-stone-500 text-stone-500 select-none has-focus-visible:outline-1 has-focus-visible:outline-stone-500",
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
          <div className="grow flex gap-px">
            <div className="bg-yellow-300 w-24" />
            <div
              className={cn(
                "bg-yellow-300 grow flex justify-between p-4 items-start text-yellow-600 text-2xl font-extralight uppercase",
              )}
            >
              <span>0</span>
              <span>Quantity</span>
              <span>Max</span>
            </div>
          </div>
        </div>

        {/* ── Right: Sellers + Buyers ── */}
        <MotionConfig
          transition={{ type: "spring", visualDuration: 0.2, bounce: 0.1 }}
        >
          <LayoutGroup>
            <RadioGroup
              value={selected}
              onValueChange={setSelected}
              className="flex flex-col gap-px"
            >
              {/* Sellers */}
              <motion.div layout className="grow flex gap-px">
                <motion.div layout className="grow grid grid-cols-2 gap-px">
                  {(
                    Object.entries(SELLER_META) as [SellerState, GroupMeta][]
                  ).map(([key, meta]) => (
                    <Group
                      key={key}
                      value={key}
                      setSelected={setSelected}
                      meta={meta}
                      isSeller={true}
                      items={sellerGroups[key].map((s) => ({
                        id: s.id,
                        label: s.label,
                        price: s.minPrice,
                      }))}
                    />
                  ))}
                </motion.div>
                <motion.div layout className="bg-yellow-200 p-4 pr-12">
                  <span className="text-yellow-700 text-2xl font-extralight uppercase [writing-mode:vertical-rl]">
                    Sellers
                  </span>
                </motion.div>
              </motion.div>

              {/* Buyers */}
              <div className="grow flex gap-px">
                <div className="grow grid grid-cols-2 gap-px">
                  {(
                    Object.entries(BUYER_META) as [BuyerState, GroupMeta][]
                  ).map(([key, meta]) => (
                    <Group
                      key={key}
                      value={key}
                      setSelected={setSelected}
                      meta={meta}
                      isSeller={false}
                      items={buyerGroups[key].map((b) => ({
                        id: b.id,
                        label: b.label,
                        price: b.maxPrice,
                      }))}
                    />
                  ))}
                </div>
                <motion.div layout className="bg-yellow-200 p-4 pr-12">
                  <span className="text-stone-500 text-2xl font-extralight uppercase [writing-mode:vertical-rl]">
                    Buyers
                  </span>
                </motion.div>
              </div>
            </RadioGroup>
          </LayoutGroup>
        </MotionConfig>
      </div>
    </div>
  );
}
