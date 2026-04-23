'use client';

import { useState, useCallback, useRef, useMemo } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  MotionValue,
} from 'motion/react';
import { Popover } from '@base-ui/react/popover';
import Pip, { PipCorners } from '../brand/Pip';
import { cn } from '@/lib/utils';

// ─── Constants ────────────────────────────────────────────────────────────────

const EQUILIBRIUM = 0.5;

const SELLERS: { id: string; label: string; minPrice: number }[] = [
  { id: 's0', label: 'Bakery on Korunní St', minPrice: 0.18 },
  { id: 's1', label: 'Family farm, Moravia', minPrice: 0.25 },
  { id: 's2', label: 'Mill cooperative', minPrice: 0.32 },
  { id: 's3', label: 'Artisan baker', minPrice: 0.38 },
  { id: 's4', label: 'Regional distributor', minPrice: 0.44 },
  { id: 's5', label: 'Importer, Brno', minPrice: 0.56 },
  { id: 's6', label: 'Small grocery', minPrice: 0.62 },
  { id: 's7', label: 'Market stall', minPrice: 0.68 },
  { id: 's8', label: 'Supermarket chain', minPrice: 0.75 },
  { id: 's9', label: 'Factory outlet', minPrice: 0.82 },
];

const BUYERS: { id: string; label: string; maxPrice: number }[] = [
  { id: 'b0', label: 'Hospital canteen', maxPrice: 0.82 },
  { id: 'b1', label: 'Restaurant owner', maxPrice: 0.75 },
  { id: 'b2', label: 'School cafeteria', maxPrice: 0.68 },
  { id: 'b3', label: 'Office worker', maxPrice: 0.62 },
  { id: 'b4', label: 'Young family', maxPrice: 0.56 },
  { id: 'b5', label: 'Night shift worker', maxPrice: 0.44 },
  { id: 'b6', label: 'Corner shop', maxPrice: 0.38 },
  { id: 'b7', label: 'Student, 22', maxPrice: 0.32 },
  { id: 'b8', label: 'Single mother, 2 kids', maxPrice: 0.25 },
  { id: 'b9', label: 'Retiree on fixed pension', maxPrice: 0.18 },
];

// ─── Types ────────────────────────────────────────────────────────────────────

type SellerState = 'selling' | 'surplus' | 'under-produced' | 'high-cost';
type BuyerState = 'buying' | 'shortage' | 'budget-strained' | 'low-value';

const PIP_COLOR: Record<SellerState | BuyerState, string> = {
  selling: 'stroke-stone-600',
  buying: 'stroke-yellow-600',
  surplus: 'stroke-blue-400',
  shortage: 'stroke-red-400',
  'budget-strained': 'stroke-blue-300',
  'under-produced': 'stroke-red-300',
  'high-cost': 'stroke-stone-300',
  'low-value': 'stroke-yellow-200',
};

const GROUP_META: Record<
  SellerState | BuyerState,
  { label: string; desc: string; accent: false | 'red' | 'blue' }
> = {
  selling: {
    label: 'Selling',
    desc: 'Min price met — matched with a buyer',
    accent: false,
  },
  surplus: {
    label: 'Excess Supply',
    desc: 'Willing at floor price but no buyer remains',
    accent: 'blue',
  },
  'under-produced': {
    label: 'Under-Produced',
    desc: "Min price above ceiling — won't sell at a loss",
    accent: 'red',
  },
  'high-cost': {
    label: 'High-Cost Producer',
    desc: 'Min price above current effective price — not yet competitive',
    accent: false,
  },
  buying: {
    label: 'Buying',
    desc: 'Max price met — matched with a seller',
    accent: false,
  },
  shortage: {
    label: 'Excess Demand',
    desc: 'Willing to pay but no seller available',
    accent: 'red',
  },
  'budget-strained': {
    label: 'Budget-Strained',
    desc: 'Could afford equilibrium — floor pushed price too high',
    accent: 'blue',
  },
  'low-value': {
    label: 'Low-Value Consumer',
    desc: 'Max price below current effective price — priced out',
    accent: false,
  },
};

// ─── PersonPip ────────────────────────────────────────────────────────────────

function PersonPip({
  label,
  state,
  index,
}: {
  label: string;
  state: SellerState | BuyerState;
  index: number;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        delay: index * 0.03,
        type: 'spring',
        visualDuration: 0.4,
        bounce: 0.15,
      }}
    >
      <Popover.Root>
        <Popover.Trigger
          openOnHover
          className="group pointer-events-auto flex items-center justify-center p-1"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <Pip
            className={cn(
              'h-6 transition-colors duration-200 group-data-popup-open:scale-125',
              PIP_COLOR[state],
            )}
          />
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Positioner sideOffset={6}>
            <Popover.Popup className="origin-(--transform-origin) bg-yellow-200 px-3 py-2 transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 z-50">
              <Popover.Title className="font-mono text-[10px] uppercase tracking-[0.15em] text-stone-600">
                {label}
              </Popover.Title>
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
  items: { id: string; label: string; state: SellerState | BuyerState }[];
}) {
  if (items.length === 0) return null;
  const meta = GROUP_META[stateKey];
  if (!meta) return null;
  const { label, desc, accent } = meta;

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col gap-3"
    >
      <div className="flex flex-col gap-0.5">
        <span
          className={cn(
            'font-mono text-[9px] uppercase tracking-[0.2em]',
            accent === 'red'
              ? 'text-red-500'
              : accent === 'blue'
                ? 'text-blue-400'
                : 'text-stone-500',
          )}
        >
          {label}
          <span className="ml-2 text-stone-400">{items.length}</span>
        </span>
        <span className="font-mono text-[9px] text-stone-400 tracking-wide">
          {desc}
        </span>
      </div>
      <div className="flex flex-wrap gap-1 min-h-8">
        <AnimatePresence mode="popLayout">
          {items.map((item, i) => (
            <PersonPip
              key={item.id}
              label={item.label}
              state={item.state}
              index={i}
            />
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── useDraggableLine ─────────────────────────────────────────────────────────

function useDraggableLine(
  containerRef: React.RefObject<HTMLDivElement | null>,
  initialPct: number,
) {
  const motionY = useMotionValue(initialPct);
  const [value, setValue] = useState(
    parseFloat((1 - initialPct / 100).toFixed(3)),
  );
  const isDragging = useRef(false);

  const update = useCallback(
    (clientY: number) => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const pct = Math.max(
        2,
        Math.min(98, ((clientY - rect.top) / rect.height) * 100),
      );
      motionY.set(pct);
      setValue(parseFloat((1 - pct / 100).toFixed(3)));
    },
    [containerRef, motionY],
  );

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isDragging.current = true;
      update(e.clientY);
      const move = (me: MouseEvent) => {
        if (isDragging.current) update(me.clientY);
      };
      const up = () => {
        isDragging.current = false;
        window.removeEventListener('mousemove', move);
        window.removeEventListener('mouseup', up);
      };
      window.addEventListener('mousemove', move);
      window.addEventListener('mouseup', up);
    },
    [update],
  );

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      update(e.touches[0].clientY);
      const move = (te: TouchEvent) => {
        te.preventDefault();
        if (te.touches[0]) update(te.touches[0].clientY);
      };
      const end = () => {
        window.removeEventListener('touchmove', move);
        window.removeEventListener('touchend', end);
      };
      window.addEventListener('touchmove', move, { passive: false });
      window.addEventListener('touchend', end);
    },
    [update],
  );

  const reset = useCallback(() => {
    motionY.set(initialPct);
    setValue(parseFloat((1 - initialPct / 100).toFixed(3)));
  }, [motionY, initialPct]);

  return { motionY, value, onMouseDown, onTouchStart, reset };
}

// ─── DraggableLine ────────────────────────────────────────────────────────────

function DraggableLine({
  motionY,
  label,
  color,
  onMouseDown,
  onTouchStart,
}: {
  motionY: MotionValue<number>;
  label: string;
  color: 'red' | 'blue';
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
}) {
  const top = useTransform(motionY, (v) => `${v}%`);
  const dashColor = color === 'red' ? '#ef4444' : '#60a5fa';
  const textCn = color === 'red' ? 'text-red-500' : 'text-blue-400';
  const pipCn = color === 'red' ? 'stroke-red-500' : 'stroke-blue-400';

  return (
    <motion.div
      className="absolute left-0 right-0 z-20"
      style={{ top }}
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
    >
      <div className="absolute inset-x-0 -top-3 -bottom-3 cursor-ns-resize" />
      <div
        className="w-full h-px"
        style={{
          background: `repeating-linear-gradient(to right, ${dashColor} 0px, ${dashColor} 4px, transparent 4px, transparent 7px)`,
        }}
      />
      <div className="absolute left-0 top-0 -translate-y-full pb-0.5">
        <span
          className={cn(
            'font-mono text-[9px] uppercase tracking-[0.15em]',
            textCn,
          )}
        >
          {label}
        </span>
      </div>
      <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 cursor-ns-resize">
        <Pip className={cn('h-3 stroke-1', pipCn)} />
      </div>
    </motion.div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function ShortageSimulator() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasDragged, setHasDragged] = useState(false);

  const ceilingLine = useDraggableLine(containerRef, 28);
  const floorLine = useDraggableLine(containerRef, 72);

  const ceiling = ceilingLine.value;
  const floor = floorLine.value;

  const isCeilingEffective = ceiling < EQUILIBRIUM;
  const isFloorEffective = floor > EQUILIBRIUM;

  const sellerGroups = useMemo(() => {
    const effectivePrice = isCeilingEffective
      ? ceiling
      : isFloorEffective
        ? floor
        : EQUILIBRIUM;

    // Sellers willing to sell at effective price (minPrice ≤ effectivePrice)
    const willing = SELLERS.filter((s) => s.minPrice <= effectivePrice);
    const willingBuyerCount = BUYERS.filter(
      (b) => b.maxPrice >= effectivePrice,
    ).length;

    const selling = willing.slice(0, willingBuyerCount);
    const surplus = willing.slice(willingBuyerCount);

    // Not willing at effectivePrice — classify the rest
    const notWilling = SELLERS.filter((s) => s.minPrice > effectivePrice);

    // Blocked by floor: would sell at equilibrium (minPrice ≤ EQUILIBRIUM)
    // but floor is above equilibrium and still below their minPrice,
    // so they can't legally meet buyers at equilibrium anymore — actually
    // "blocked" means they WANT to sell at below-floor prices but can't.
    // minPrice < floor AND minPrice ≤ EQUILIBRIUM — floor prevents the deal.
    const blockedByFloor = isFloorEffective
      ? SELLERS.filter(
          (s) =>
            s.minPrice < floor &&
            s.minPrice <= EQUILIBRIUM &&
            !willing.includes(s),
        )
      : [];

    // Under-produced: ceiling actively cuts out sellers viable at equilibrium
    const underProduced = isCeilingEffective
      ? notWilling.filter((s) => s.minPrice <= EQUILIBRIUM)
      : [];

    // High-cost: minPrice above EQUILIBRIUM and above effectivePrice (not helped by floor)
    const highCost = notWilling.filter(
      (s) => s.minPrice > EQUILIBRIUM && !underProduced.includes(s),
    );

    return { selling, surplus, blockedByFloor, underProduced, highCost };
  }, [ceiling, floor, isCeilingEffective, isFloorEffective]);

  const buyerGroups = useMemo(() => {
    const effectivePrice = isCeilingEffective
      ? ceiling
      : isFloorEffective
        ? floor
        : EQUILIBRIUM;

    const willing = BUYERS.filter((b) => b.maxPrice >= effectivePrice);
    const supplyCount = sellerGroups.selling.length;

    const buying = willing.slice(0, supplyCount);
    const shortage = willing.slice(supplyCount);

    // Budget-strained: could afford equilibrium but floor priced them out
    const budgetStrained = isFloorEffective
      ? BUYERS.filter((b) => b.maxPrice >= EQUILIBRIUM && b.maxPrice < floor)
      : [];

    // Low-value: maxPrice below EQUILIBRIUM and below effectivePrice
    const lowValue = BUYERS.filter(
      (b) =>
        b.maxPrice < EQUILIBRIUM &&
        b.maxPrice < effectivePrice &&
        !budgetStrained.includes(b),
    );

    return { buying, shortage, budgetStrained, lowValue };
  }, [
    ceiling,
    floor,
    isCeilingEffective,
    isFloorEffective,
    sellerGroups.selling.length,
  ]);

  const reset = useCallback(() => {
    ceilingLine.reset();
    floorLine.reset();
    setHasDragged(false);
  }, [ceilingLine, floorLine]);

  const hasDistortion = isCeilingEffective || isFloorEffective;

  return (
    <div className="mx-16 max-w-6xl w-screen">
      <div className="relative bg-yellow-300 px-8 py-8 flex flex-col gap-10">
        <PipCorners />

        {/* Header */}
        <div className="flex items-baseline justify-between">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-600">
            Price Control Simulator
          </p>
          <AnimatePresence>
            {hasDragged && (
              <motion.button
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 8 }}
                onClick={reset}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500 hover:text-stone-800 transition-colors"
              >
                ↺ Reset
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* ── Graph ── */}
        <div className="flex gap-3">
          <div className="flex flex-col justify-between py-1 shrink-0">
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-stone-400">
              High
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-stone-400 [writing-mode:vertical-rl] rotate-180 self-center">
              Price
            </span>
            <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-stone-400">
              Low
            </span>
          </div>
          <div className="flex flex-col gap-1 flex-1 min-w-0">
            <div
              ref={containerRef}
              className="relative w-full aspect-[3/2] overflow-visible"
            >
              <div className="absolute inset-0 border-b border-l border-yellow-500/60" />
              <svg
                className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <line
                  x1="0"
                  y1="100"
                  x2="100"
                  y2="0"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="2 1.5"
                  className="text-stone-500"
                  vectorEffect="non-scaling-stroke"
                />
                <line
                  x1="0"
                  y1="0"
                  x2="100"
                  y2="100"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="2 1.5"
                  className="text-yellow-600"
                  vectorEffect="non-scaling-stroke"
                />
                {isCeilingEffective && (
                  <line
                    x1={ceiling * 100}
                    y1={(1 - ceiling) * 100 + 5}
                    x2={(1 - ceiling) * 100}
                    y2={(1 - ceiling) * 100 + 5}
                    stroke="#ef4444"
                    strokeWidth="0.5"
                    vectorEffect="non-scaling-stroke"
                  />
                )}
                {isFloorEffective && (
                  <line
                    x1={(1 - floor) * 100}
                    y1={(1 - floor) * 100 - 5}
                    x2={floor * 100}
                    y2={(1 - floor) * 100 - 5}
                    stroke="#60a5fa"
                    strokeWidth="0.5"
                    vectorEffect="non-scaling-stroke"
                  />
                )}
              </svg>
              <span className="absolute top-1 right-2 font-mono text-[10px] tracking-wide text-stone-500 pointer-events-none">
                supply ↗
              </span>
              <span className="absolute bottom-1 right-2 font-mono text-[10px] tracking-wide text-yellow-600 pointer-events-none">
                demand ↘
              </span>
              <AnimatePresence>
                {isCeilingEffective && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute font-mono text-[9px] uppercase tracking-[0.15em] text-red-500 pointer-events-none -translate-x-1/2"
                    style={{ left: '50%', top: `${(1 - ceiling) * 100 + 8}%` }}
                  >
                    shortage
                  </motion.span>
                )}
                {isFloorEffective && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute font-mono text-[9px] uppercase tracking-[0.15em] text-blue-400 pointer-events-none -translate-x-1/2"
                    style={{ left: '50%', top: `${(1 - floor) * 100 - 12}%` }}
                  >
                    surplus
                  </motion.span>
                )}
              </AnimatePresence>
              <div
                className={cn(
                  'absolute size-2.5 rounded-full -translate-x-1/2 -translate-y-1/2 transition-colors duration-300',
                  hasDistortion
                    ? 'bg-stone-300 border border-stone-400'
                    : 'bg-yellow-500 border border-yellow-700',
                )}
                style={{ left: '50%', top: '50%' }}
              />
              <DraggableLine
                motionY={ceilingLine.motionY}
                label="ceiling"
                color="red"
                onMouseDown={(e) => {
                  setHasDragged(true);
                  ceilingLine.onMouseDown(e);
                }}
                onTouchStart={(e) => {
                  setHasDragged(true);
                  ceilingLine.onTouchStart(e);
                }}
              />
              <DraggableLine
                motionY={floorLine.motionY}
                label="floor"
                color="blue"
                onMouseDown={(e) => {
                  setHasDragged(true);
                  floorLine.onMouseDown(e);
                }}
                onTouchStart={(e) => {
                  setHasDragged(true);
                  floorLine.onTouchStart(e);
                }}
              />
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-stone-400">
                0
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-stone-400">
                Quantity
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-stone-400">
                max
              </span>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {!hasDragged && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-mono text-[9px] uppercase tracking-[0.2em] text-stone-400 text-center"
            >
              ↕ drag either line — ceiling down for shortage, floor up for
              surplus
            </motion.p>
          )}
        </AnimatePresence>

        {/* ── People ── */}
        <div className="border-t border-yellow-400 pt-8 grid grid-cols-2 gap-x-12 gap-y-8">
          <div className="flex flex-col gap-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-600">
              Sellers
            </p>
            <AnimatePresence>
              <Group
                key="selling"
                stateKey="selling"
                items={sellerGroups.selling.map((s) => ({
                  ...s,
                  state: 'selling' as SellerState,
                }))}
              />
              <Group
                key="surplus"
                stateKey="surplus"
                items={sellerGroups.surplus.map((s) => ({
                  ...s,
                  state: 'surplus' as SellerState,
                }))}
              />
              <Group
                key="under-produced"
                stateKey="under-produced"
                items={sellerGroups.underProduced.map((s) => ({
                  ...s,
                  state: 'under-produced' as SellerState,
                }))}
              />
              <Group
                key="high-cost"
                stateKey="high-cost"
                items={sellerGroups.highCost.map((s) => ({
                  ...s,
                  state: 'high-cost' as SellerState,
                }))}
              />
            </AnimatePresence>
          </div>
          <div className="flex flex-col gap-6">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-600">
              Buyers
            </p>
            <AnimatePresence>
              <Group
                key="buying"
                stateKey="buying"
                items={buyerGroups.buying.map((b) => ({
                  ...b,
                  state: 'buying' as BuyerState,
                }))}
              />
              <Group
                key="shortage"
                stateKey="shortage"
                items={buyerGroups.shortage.map((b) => ({
                  ...b,
                  state: 'shortage' as BuyerState,
                }))}
              />
              <Group
                key="budget-strained"
                stateKey="budget-strained"
                items={buyerGroups.budgetStrained.map((b) => ({
                  ...b,
                  state: 'budget-strained' as BuyerState,
                }))}
              />
              <Group
                key="low-value"
                stateKey="low-value"
                items={buyerGroups.lowValue.map((b) => ({
                  ...b,
                  state: 'low-value' as BuyerState,
                }))}
              />
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence>
          {hasDistortion && (
            <motion.p
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={cn(
                'font-mono text-[9px] uppercase tracking-[0.2em] text-right',
                isCeilingEffective ? 'text-red-500' : 'text-blue-400',
              )}
            >
              {isCeilingEffective
                ? 'A price decree cannot create the supply it suppresses.'
                : 'A price floor produces what no one is willing to buy.'}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
