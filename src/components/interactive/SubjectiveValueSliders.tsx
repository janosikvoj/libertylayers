'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Slider } from '@base-ui/react/slider';
import { Popover } from '@base-ui/react/popover';
import Pip from '../brand/Pip';

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

function SliderRow({ item }: { item: (typeof ITEMS)[number] }) {
  const [revealed, setRevealed] = useState(false);

  return (
    <Slider.Root
      onValueChange={() => setRevealed(false)}
      onValueCommitted={() => setRevealed(true)}
      min={0}
      max={100}
      className="flex flex-col"
    >
      {/* Label */}
      <Slider.Label className="mb-8 text-center cursor-default font-semibold text-base tracking-tight">
        {item.label}
      </Slider.Label>

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
      <div className="flex justify-between text-yellow-600 select-none text-2xl font-extralight uppercase mt-1">
        <span>Worthless</span>
        <span>Invaluable</span>
      </div>
    </Slider.Root>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SubjectiveValueSliders() {
  return (
    <div className="mx-16 max-w-6xl w-screen">
      <div className="relative px-24 py-16 flex flex-col gap-12 bg-yellow-300">
        <Pip className="absolute left-0 top-0 stroke-yellow-500 h-4 rotate-45" />
        <Pip className="absolute left-0 bottom-0 stroke-yellow-500 h-4 rotate-45" />
        <Pip className="absolute right-0 top-0 stroke-yellow-500 h-4 rotate-45" />
        <Pip className="absolute right-0 bottom-0 stroke-yellow-500 h-4 rotate-45" />
        {ITEMS.map((item) => (
          <SliderRow key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
