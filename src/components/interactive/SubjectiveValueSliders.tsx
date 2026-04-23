'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Slider } from '@base-ui/react/slider';
import { Popover } from '@base-ui/react/popover';
import Pip, { PipCorners } from '../brand/Pip';

// ─── Data ────────────────────────────────────────────────────────────────────

type Persona = {
  value: number;
  label: string;
};

type Item = {
  id: string;
  label: string;
  others: Persona[];
};

const ITEMS: Item[] = [
  {
    id: 'coffee',
    label: 'A cup of coffee',
    others: [
      { value: 8, label: 'Farmer, Ethiopia' },
      { value: 35, label: 'Retiree, 83' },
      { value: 67, label: 'Night shift nurse' },
      { value: 85, label: 'New parent, 6 weeks in' },
      { value: 97, label: 'Stranded traveller' },
    ],
  },
  {
    id: 'hour',
    label: 'One free hour',
    others: [
      { value: 11, label: 'Retired academic' },
      { value: 40, label: 'Gap year, backpacking' },
      { value: 68, label: 'Freelance designer' },
      { value: 88, label: 'PhD student, 3 days to deadline' },
      { value: 97, label: 'Palliative care patient' },
    ],
  },
  {
    id: 'silence',
    label: 'Ten minutes of silence',
    others: [
      { value: 5, label: 'Meditation teacher' },
      { value: 28, label: 'Open-plan office worker' },
      { value: 55, label: 'Parent of three under five' },
      { value: 80, label: 'Chronic tinnitus sufferer' },
      { value: 96, label: 'Frontline soldier' },
    ],
  },
  {
    id: 'stranger',
    label: 'A kind word from a stranger',
    others: [
      { value: 4, label: 'Popular influencer' },
      { value: 22, label: 'Confident extrovert' },
      { value: 58, label: 'Long-haul trucker, day 9' },
      { value: 83, label: 'Grieving widow, first outing' },
      { value: 99, label: 'Survivor, day of discharge' },
    ],
  },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function PersonaPip({ persona, index }: { persona: Persona; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{
        opacity: 0,
        y: -16,
        transition: {
          delay: index * 0.02,
          type: 'spring',
          visualDuration: 0.2,
          bounce: 0,
        },
      }}
      transition={{
        delay: index * 0.04,
        type: 'spring',
        visualDuration: 0.5,
        bounce: 0.2,
      }}
      className="absolute bg-yellow-500 bottom-0"
      style={{ left: `${persona.value}%` }}
    >
      <Popover.Root>
        <Popover.Trigger
          openOnHover
          className="group absolute bottom-0 pointer-events-auto -translate-x-1/2 h-8 flex items-end"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <Pip
            viewBox="0 0 100 300"
            className="stroke-stone-600 overflow-visible h-12 origin-bottom transition-transform group-data-popup-open:scale-125"
          >
            <path
              d="M50 75C50 80 50 95 50 300"
              vectorEffect="non-scaling-stroke"
            />
          </Pip>
        </Popover.Trigger>

        <Popover.Portal>
          <Popover.Positioner sideOffset={8}>
            <Popover.Popup className="origin-(--transform-origin) bg-yellow-200 px-3 py-2 transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0">
              <Popover.Title className="text-base">
                {persona.label}
              </Popover.Title>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    </motion.div>
  );
}

function SliderRow({
  item,
  onCommit,
}: {
  item: (typeof ITEMS)[number];
  onCommit?: () => void;
}) {
  const [revealed, setRevealed] = useState(false);

  return (
    <Slider.Root
      onValueChange={() => setRevealed(false)}
      onValueCommitted={() => {
        setRevealed(true);
        onCommit?.();
      }}
      min={0}
      step={0.1}
      max={100}
      className="flex flex-col"
    >
      {/* Label */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          type: 'spring',
          visualDuration: 0.55,
          bounce: 0.1,
        }}
      >
        <Slider.Label className="mb-8 text-center cursor-default font-semibold text-base tracking-tight">
          {item.label}
        </Slider.Label>
      </motion.div>

      {/* Track */}
      <Slider.Control className="relative h-8">
        <Slider.Track className="size-full bg-[repeating-linear-gradient(to_right,currentColor_0px,currentColor_1px,transparent_1px,transparent_6px)] text-yellow-600">
          <Slider.Indicator className="absolute top-1/2 left-0 -translate-y-1/2 bg-[repeating-linear-gradient(to_right,currentColor_0px,currentColor_1px,var(--color-yellow-600)_1px,var(--color-yellow-600)_6px)] text-yellow-300" />
          <Slider.Thumb className="relative h-full">
            <Pip
              viewBox="0 0 100 300"
              className="absolute bottom-0 stroke-yellow-600 overflow-visible h-12 -translate-x-1/2"
            >
              <path
                d="M50 75C50 80 50 95 50 300"
                vectorEffect="non-scaling-stroke"
              />
            </Pip>
          </Slider.Thumb>
        </Slider.Track>

        {/* Others display */}
        <AnimatePresence>
          {revealed && (
            <div className="relative w-full pointer-events-none">
              {item.others.map((persona, i) => (
                <PersonaPip key={persona.label} persona={persona} index={i} />
              ))}
            </div>
          )}
        </AnimatePresence>
      </Slider.Control>

      {/* Min / max labels */}
      <div className="flex justify-between text-yellow-600 select-none text-2xl font-extralight uppercase mt-2">
        <span>Worthless</span>
        <span>Invaluable</span>
      </div>
    </Slider.Root>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SubjectiveValueSliders() {
  const [unlockedCount, setUnlockedCount] = useState(1);

  return (
    <div className="mx-16 max-w-6xl w-screen">
      <motion.div
        layout
        transition={{ type: 'spring', visualDuration: 0.5, bounce: 0.15 }}
        className="relative px-24 py-16 flex flex-col gap-12 bg-yellow-300"
      >
        <PipCorners />
        {ITEMS.slice(0, unlockedCount).map((item, index) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, clipPath: 'inset(0% -20% 100% -20%)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% -20% 0% -20%)' }}
            transition={{
              type: 'spring',
              visualDuration: 0.55,
              bounce: 0.1,
              opacity: { duration: 0.5 },
            }}
          >
            <SliderRow
              item={item}
              onCommit={
                index === unlockedCount - 1 && unlockedCount < ITEMS.length
                  ? () => setUnlockedCount((n) => n + 1)
                  : undefined
              }
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
