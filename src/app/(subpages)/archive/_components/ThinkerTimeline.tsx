"use client";

import { useState } from "react";
import { Thinker } from "../_content/thinkers";
import { cn } from "@/lib/utils";
import { Radio, RadioGroup, ScrollArea } from "@base-ui/react";
import { AnimatePresence, motion } from "motion/react";
import ExternalLink from "@/components/navigation/ExternalLink";

const CURRENT_YEAR = new Date().getFullYear();
const TIMELINE_START = 1800;
const TIMELINE_END = CURRENT_YEAR + 5;
const TIMELINE_SPAN = TIMELINE_END - TIMELINE_START;

const toPercent = (year: number) =>
  ((year - TIMELINE_START) / TIMELINE_SPAN) * 100;

function ThinkerRow({
  thinker,
  activeThinker,
}: {
  thinker: Thinker;
  activeThinker: string;
}) {
  const birthPct = toPercent(thinker.birth);
  const deathPct = toPercent(thinker.death ?? CURRENT_YEAR);
  const isAlive = thinker.death === null;

  const isActive = thinker.name === activeThinker;

  return (
    <Radio.Root
      value={thinker.name}
      render={
        <motion.div
          layout
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      }
      className={cn(
        "group block w-full relative cursor-pointer",
        "data-checked:bg-yellow-100 hover:bg-stone-200 transition-colors",
      )}
    >
      <div
        className="py-4 flex flex-col gap-2 items-start"
        style={{
          marginLeft: `${birthPct}%`,
          width: `${deathPct - birthPct}%`,
        }}
      >
        <div className="w-full flex gap-2 justify-between items-baseline">
          {/* Name label */}
          <motion.h4 className="leading-none font-semibold tracking-tight whitespace-nowrap">
            <AnimatePresence>
              {isActive && (
                <motion.span
                  initial={{ opacity: 0, width: 0, scaleX: 0.9, x: "-2rem" }}
                  animate={{
                    opacity: 1,
                    width: "auto",
                    scaleX: 1,
                    x: 0,
                    transition: {
                      opacity: { delay: 0.2 },
                    },
                  }}
                  exit={{
                    opacity: 0,
                    width: 0,
                    scaleX: 0.9,
                    x: "-2rem",
                    transition: { ease: [0.645, 0.045, 0.355, 1] },
                  }}
                  transition={{
                    duration: 0.7,
                    ease: [0.19, 1, 0.22, 1],
                  }}
                  className="inline-block text-yellow-900 origin-left"
                >
                  {thinker.name.split(" ").slice(0, -1).join(" ")}
                </motion.span>
              )}
            </AnimatePresence>

            <motion.span
              layout="position"
              className={cn(
                "transition-all duration-700",
                "text-stone-800 group-hover:text-stone-900 group-data-checked:text-yellow-900 group-data-checked:pl-1",
              )}
            >
              ¤ {thinker.name.split(" ").at(-1)}
            </motion.span>
          </motion.h4>

          <AnimatePresence>
            {isActive && (
              <motion.span
                initial={{
                  opacity: 0,
                  y: "-1rem",
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { ease: [0.215, 0.61, 0.355, 1] },
                }}
                exit={{
                  opacity: 0,
                  x: "1rem",
                  transition: { ease: [0.55, 0.055, 0.675, 0.19] },
                }}
                className={cn(
                  "font-mono text-xs uppercase tracking-[0.2em] leading-none",
                  "text-stone-600 group-data-checked:text-yellow-600",
                )}
              >
                {thinker.birth}–{thinker.death ?? "present"}
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        {/* Life span bar */}
        <div
          className={cn(
            "relative h-4 w-full transition-all duration-200 bg-[repeating-linear-gradient(to_right,transparent_0px,transparent_1px,currentColor_1px,currentColor_6px)]",
            "text-stone-500 group-hover:text-stone-600",
            "group-data-checked:text-yellow-600 group-data-checked:h-6",
          )}
        >
          {/* Dashed extension if still alive */}
          {isAlive && (
            <div
              className={cn(
                "absolute top-0 h-full w-8 right-0 translate-x-full bg-[repeating-linear-gradient(to_right,currentColor_0px,currentColor_1px,transparent_1px,transparent_6px)] text-yellow-400",
                "text-stone-500 group-hover:text-stone-600",
                "group-data-checked:text-yellow-600",
              )}
            />
          )}
        </div>

        <motion.div
          initial={false}
          animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ overflow: "hidden" }}
        >
          <p className="text-stone-700 leading-snug text-sm">{thinker.role}</p>
          <p className="text-stone-800 leading-snug mt-4 max-w-md">
            {thinker.bio}
          </p>

          <ExternalLink
            href={`#`}
            className="mt-4 text-sm italic font-serif text-yellow-600 stroke-yellow-600 hover:text-yellow-700 hover:stroke-yellow-700 transition-colors flex gap-2 justify-between"
          >
            Wikipedia
            {isActive && (
              <svg
                className="h-auto w-8 stroke-1 fill-none"
                viewBox="0 0 158 56"
              >
                <motion.circle
                  pathLength={1}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 0.25 }}
                  transition={{ duration: 0.5 }}
                  cx="28"
                  cy="28"
                  r="25"
                  vectorEffect="non-scaling-stroke"
                />
                <motion.path
                  initial={{
                    d: "M28 53C41.8071 53 53 41.8071 53 28C53 14.1929 41.8071 3 28 3",
                    opacity: 0,
                  }}
                  animate={{
                    d: "M128 53C137 44 144 37 153 28C144 19 137 12 128 3",
                    opacity: 1,
                  }}
                  transition={{ delay: 0.4 }}
                  vectorEffect="non-scaling-stroke"
                />
                <motion.path
                  initial={{
                    d: "M53 28H53",
                  }}
                  animate={{
                    d: "M53 28H153",
                  }}
                  transition={{ delay: 0.4 }}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            )}
          </ExternalLink>
        </motion.div>
      </div>
    </Radio.Root>
  );
}

function ThinkerTimeline({ thinkers }: { thinkers: Thinker[] }) {
  const [activeThinker, setActiveThinker] = useState<string>(thinkers[0].name);

  return (
    <div className="mt-12">
      <ScrollArea.Root>
        <ScrollArea.Viewport className="outline-none">
          <ScrollArea.Content>
            {/* Year axis labels */}
            <div className="relative h-6 mb-1 min-w-4xl">
              {[1850, 1900, 1950, 2000, CURRENT_YEAR].map((year) => (
                <span
                  key={year}
                  className={cn(
                    "absolute font-mono text-[10px] uppercase tracking-[0.2em] text-stone-400 -translate-x-1/2",
                    year === CURRENT_YEAR && "text-yellow-500",
                  )}
                  style={{ left: `${toPercent(year)}%` }}
                >
                  {year}
                </span>
              ))}
            </div>

            {/* Timeline track + thinker rows */}
            <div className="relative isolate">
              <RadioGroup
                value={activeThinker}
                onValueChange={(value) => setActiveThinker(value)}
              >
                {thinkers.map((thinker) => (
                  <ThinkerRow
                    key={thinker.name}
                    thinker={thinker}
                    activeThinker={activeThinker}
                  />
                ))}
              </RadioGroup>
              <div className="absolute inset-0 pointer-events-none -z-10">
                {[1850, 1900, 1950, 2000, CURRENT_YEAR].map((year) => (
                  <div
                    key={year}
                    className={cn(
                      "absolute top-0 bottom-0 w-px bg-stone-300",
                      CURRENT_YEAR === year && "bg-yellow-500",
                    )}
                    style={{ left: `${toPercent(year)}%` }}
                  />
                ))}
              </div>
            </div>
          </ScrollArea.Content>
        </ScrollArea.Viewport>
        <div className="w-full h-4 bg-[repeating-linear-gradient(to_right,currentColor_0px,currentColor_1px,transparent_1px,transparent_6px)] text-yellow-500" />
        <ScrollArea.Scrollbar
          orientation="horizontal"
          className="mx-12 flex h-4"
        >
          <ScrollArea.Thumb className="h-full bg-yellow-500" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  );
}

export default ThinkerTimeline;
