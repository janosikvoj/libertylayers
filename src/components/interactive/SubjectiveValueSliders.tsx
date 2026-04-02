"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {RiBreadFill, RiCoinFill, RiShapeFill, RiTimeFill} from "@remixicon/react"
import { Slider } from '@base-ui/react/slider';

// ─── Data ────────────────────────────────────────────────────────────────────

const ITEMS = [
  {
    id: "bread",
    icon: RiBreadFill,
    label: "A loaf of bread",
  },
  {
    id: "hour",
    icon: RiTimeFill,
    label: "One free hour",
  },
  {
    id: "copper",
    icon: RiCoinFill,
    label: "1 kg of copper",
  },
  {
    id: "land",
    icon: RiShapeFill,
    label: "100 m² of land",
  },
];

const OTHERS_VALUES: Record<string, { mean: number; spread: number[]; insight: string }> = {
  bread: {
    mean: 71,
    spread: [12, 28, 45, 55, 68, 71, 74, 82, 90, 95],
    insight: "Farmers valued it at 20. City workers at 90. The same object, radically different worth.",
  },
  hour: {
    mean: 84,
    spread: [30, 55, 70, 78, 84, 88, 92, 95, 97, 99],
    insight: "Retirees averaged 40. Parents of newborns averaged 97. Time's value depends entirely on circumstance.",
  },
  copper: {
    mean: 38,
    spread: [5, 10, 15, 22, 35, 42, 58, 70, 80, 92],
    insight: "Most people ignored it. Electricians and engineers scored it above 75. Knowledge changes value.",
  },
  land: {
    mean: 62,
    spread: [20, 35, 48, 55, 60, 65, 72, 80, 88, 95],
    insight: "A developer saw a building. A farmer saw a harvest. An artist saw a studio. Same land, different worlds.",
  },
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function SliderRow({
  item,
  value,
  onChange,
  disabled = false,
}: {
  item: (typeof ITEMS)[number];
  value: number;
  onChange?: (v: number) => void;
  disabled?: boolean;
}) {
  return (
    <Slider.Root
      value={value}
      onValueChange={(v) => onChange?.(v as number)}
      disabled={disabled}
      min={0}
      max={100}
      className="flex flex-col"
    >
      {/* Header row — label */}
      <Slider.Label className="flex items-baseline gap-2 cursor-default">
        <item.icon className="translate-y-0.5" size={16}/>
        <div>
          <span className="font-semibold text-base tracking-tight">{item.label}</span>
        </div>
      </Slider.Label>

      {/* Track */}
      <Slider.Control className="relative h-8">
        <Slider.Track className="size-full bg-[repeating-linear-gradient(to_right,currentColor_0px,currentColor_1px,transparent_1px,transparent_6px)] text-yellow-600">
          
        <Slider.Indicator className="absolute top-1/2 left-0 -translate-y-1/2 bg-yellow-600" >
          <Slider.Value className="absolute top-0 right-0 text-yellow-300 z-10 font-mono mr-2" />
        </Slider.Indicator>

        </Slider.Track>
      </Slider.Control>

      {/* Min / max labels */}
      <div className="flex justify-between text-yellow-900 select-none text-sm font-medium uppercase mt-1">
        <span>Worthless</span>
        <span>Invaluable</span>
      </div>
    </Slider.Root>
  );
}

function OthersBar({
  spread,
  userValue,
  mean,
  insight,
}: {
  spread: number[];
  userValue: number;
  mean: number;
  insight: string;
}) {
  return (
    <div className="flex flex-col gap-2 pt-1">
      {/* Distribution dots */}
      <div className="relative h-2 w-full">
        <div className="absolute inset-y-0 left-0 right-0 flex items-center">
          <div className="w-full h-[1px] bg-neutral-200 dark:bg-neutral-700" />
        </div>
        {spread.map((v, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04, type: "spring", stiffness: 400, damping: 20 }}
            className="absolute w-2 h-2 rounded-full bg-neutral-400 dark:bg-neutral-500 -translate-y-1/2 top-1/2"
            style={{ left: `calc(${v}% - 4px)` }}
          />
        ))}
        {/* Mean marker */}
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
          className="absolute w-[2px] h-4 bg-neutral-800 dark:bg-neutral-200 -translate-y-1/2 top-1/2 -mt-1"
          style={{ left: `${mean}%` }}
        />
        {/* User marker */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, type: "spring" }}
          className="absolute w-3 h-3 rounded-full border-2 border-blue-500 bg-blue-100 dark:bg-blue-900 -translate-y-1/2 top-1/2"
          style={{ left: `calc(${userValue}% - 6px)` }}
          title="Your value"
        />
      </div>

      <div className="flex justify-between items-center text-[10px] text-neutral-400">
        <span>0</span>
        <span className="text-neutral-500 dark:text-neutral-400 text-center italic max-w-[60%]">
          {insight}
        </span>
        <span>100</span>
      </div>

      {/* Legend */}
      <div className="flex gap-4 text-[10px] text-neutral-500">
        <span className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-neutral-400" /> Others
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-[2px] h-3 bg-neutral-800 dark:bg-neutral-200" /> Avg
        </span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-2.5 h-2.5 rounded-full border-2 border-blue-500 bg-blue-100 dark:bg-blue-900" /> You
        </span>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SubjectiveValueSliders() {
  const [values, setValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(ITEMS.map((item) => [item.id, 50]))
  );
  const [revealed, setRevealed] = useState(false);
  const allMoved = ITEMS.every((item) => values[item.id] !== 50);

  const handleChange = useCallback((id: string, v: number) => {
    if (revealed) return;
    setValues((prev) => ({ ...prev, [id]: v }));
  }, [revealed]);

  return (
    <div className="mx-16 max-w-250 w-screen">
      {/* ── Part 1: User sliders ── */}
      <div className="">
        <div className="px-24 py-20 flex flex-col gap-8 bg-yellow-300">
          {ITEMS.map((item) => (
            <SliderRow
              key={item.id}
              item={item}
              value={values[item.id]}
              onChange={(v) => handleChange(item.id, v)}
              disabled={revealed}
            />
          ))}
        </div>

        {!revealed && (
            <button
              onClick={() => setRevealed(true)}
              disabled={!allMoved}
              className={`w-full py-2.5 text-sm font-medium transition-all duration-200
                ${allMoved
                  ? "bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 hover:opacity-90 cursor-pointer"
                  : "bg-stone-100 dark:bg-stone-800 text-stone-400 cursor-not-allowed"
                }`}
            >
              {allMoved ? "See how others valued these →" : "Move all sliders to continue"}
            </button>
        )}
      </div>

      {/* ── Part 2: Reveal ── */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-6 py-6 flex flex-col gap-10 bg-yellow-200">
              {ITEMS.map((item, i) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4, ease: "easeOut" }}
                  className="flex flex-col gap-3"
                >
                  {/* Others distribution */}
                  <OthersBar
                    spread={OTHERS_VALUES[item.id].spread}
                    userValue={values[item.id]}
                    mean={OTHERS_VALUES[item.id].mean}
                    insight={OTHERS_VALUES[item.id].insight}
                  />
                </motion.div>
              ))}
            </div>

            <div className="px-6 pb-6 pt-2">
              <p className="text-xs text-stone-400 italic border-t border-stone-200 pt-4">
                Value is not a property of objects. It is a judgment made by individuals — and no
                central authority can know, aggregate, or replace those judgments.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}