'use client';

import Link from 'next/link';
import { Popover } from '@base-ui/react';
import { cn } from '@/lib/utils';
import { GLOSSARY } from '@/app/(subpages)/glossary/_content/glossary';
import { motion } from 'motion/react';

export function GlossaryTerm({
  slug,
  children,
}: {
  slug: string;
  children: React.ReactNode;
}) {
  const entry = GLOSSARY[slug];
  if (!entry) return <span>{children}</span>;

  return (
    <Popover.Root>
      <Popover.Trigger
        openOnHover
        delay={300}
        className={cn(
          'underline decoration-1 decoration-inherit underline-offset-3',
          'cursor-help text-yellow-600 hover:text-yellow-800 transition-all',
        )}
      >
        ¤ {children}
      </Popover.Trigger>

      <Popover.Portal>
        <Popover.Positioner sideOffset={8} side="top" align="start">
          <Popover.Popup
            className={cn(
              'z-50 w-3xs bg-yellow-200 px-3 py-2 text-base',
              'origin-(--transform-origin) transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0',
            )}
          >
            {/* Spelling + part of speech */}
            <p className="font-serif text-yellow-600 text-sm mb-0.5 tracking-wide flex gap-2 justify-between">
              {entry.spelling}
              <span className="italic">{entry.partOfSpeech}</span>
            </p>

            {/* Divider */}
            <div className="w-full h-px bg-yellow-300 mb-1" />
            <div className="w-full h-px bg-yellow-300 mb-1" />
            <div className="w-full h-px bg-yellow-300 mb-3" />

            {/* Term name */}
            <h4 className="font-semibold text-stone-900 tracking-tight mb-2">
              {entry.term}
            </h4>

            {/* Definition */}
            <p className="text-stone-700 leading-snug mb-3">{entry.desc}</p>

            {/* Read more */}
            <Link
              href={`/glossary/?term=${entry.slug}`}
              className="text-sm italic font-serif text-yellow-600 stroke-yellow-600 hover:text-yellow-700 hover:stroke-yellow-700 transition-colors flex gap-2 justify-between"
            >
              Glossary
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
                    d: 'M28 53C41.8071 53 53 41.8071 53 28C53 14.1929 41.8071 3 28 3',
                    opacity: 0,
                  }}
                  animate={{
                    d: 'M128 53C137 44 144 37 153 28C144 19 137 12 128 3',
                    opacity: 1,
                  }}
                  transition={{ delay: 0.4 }}
                  vectorEffect="non-scaling-stroke"
                />
                <motion.path
                  initial={{
                    d: 'M53 28H53',
                  }}
                  animate={{
                    d: 'M53 28H153',
                  }}
                  transition={{ delay: 0.4 }}
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </Link>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}
