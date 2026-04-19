'use client';

import AnarchyIsOrder from '@/components/brand/AnarchyIsOrder';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';

type Phase = 'idle' | 'opening' | 'expanding' | 'revealed';

export default function LandingPage() {
  const [phase, setPhase] = useState<Phase>('idle');

  useEffect(() => {
    if (phase !== 'opening') return;
    const toExpanding = setTimeout(() => setPhase('expanding'), 800);
    return () => clearTimeout(toExpanding);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'expanding') return;
    const toRevealed = setTimeout(() => setPhase('revealed'), 2400);
    return () => clearTimeout(toRevealed);
  }, [phase]);

  return (
    <main className="relative h-screen overflow-hidden bg-stone-950 text-neutral-100 flex items-center justify-center">
      <p className="absolute top-0 right-0 z-50">Phase: {phase}</p>
      {/* ── Stage 0 & 1: The Dossier & The Fall ── */}
      <motion.button
        onClick={() => setPhase('opening')}
        className={cn(
          'relative outline-none',
          phase === 'idle' ? 'cursor-pointer pointer-events-auto' : '',
        )}
        aria-label="Open classified file"
        whileHover={phase === 'idle' ? 'open' : undefined}
        initial="closed"
        animate={phase === 'idle' ? undefined : 'falling'}
      >
        <motion.div
          variants={{
            open: { y: 4 },
          }}
          className="relative w-2xs aspect-99/70"
        >
          {/* 1. Folder back */}
          <motion.div
            variants={{
              falling: {
                y: '100vh',
                rotateZ: -12,
                transition: { duration: 0.7, ease: 'easeIn' },
              },
            }}
            className="absolute inset-0 bg-stone-400"
          />

          {/* 2. Loose yellow page */}
          <AnimatePresence>
            {phase === 'idle' && (
              <motion.div
                layoutId="inner-yellow-page"
                variants={{
                  closed: { y: '1rem', rotateZ: 0, opacity: 1 },
                  open: { y: '-1rem', rotateZ: -2, opacity: 1 },
                  falling: { y: '0', rotateZ: 0, opacity: 1 },
                }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-[calc(100%-1rem)] h-[calc(100%-1rem)] bg-yellow-300 text-stone-800 flex justify-end p-2"
              >
                <p className="leading-none font-medium">¤ Liberty Layers</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 3. Front cover — flips open */}
          <motion.div
            variants={{
              closed: {
                rotateX: 0,
                skewX: 0,
                background:
                  'linear-gradient(0deg,var(--color-stone-300) 0%, var(--color-stone-200) 0%)',
              },
              open: {
                rotateX: 30,
                skewX: 8,
                background:
                  'linear-gradient(0deg,var(--color-stone-300) 0%, var(--color-stone-200) 90%)',
                transition: {
                  type: 'spring',
                  visualDuration: 0.3,
                  bounce: 0.5,
                },
              },
              falling: {
                rotateX: 0,
                skewX: 0,
                background:
                  'linear-gradient(0deg,var(--color-stone-300) 0%, var(--color-stone-200) 0%)',
                y: '100vh',
                rotateZ: -12,
                transition: { duration: 0.7, ease: 'easeIn' },
              },
            }}
            transition={{
              type: 'spring',
              visualDuration: 0.5,
              bounce: 0,
            }}
            style={{
              transformOrigin: 'bottom center',
              transformStyle: 'preserve-3d',
              zIndex: 2,
            }}
            className="absolute inset-0 text-stone-800 p-4"
          >
            {/* File tab */}
            <svg
              aria-hidden="true"
              className="absolute left-0 top-px -translate-y-full w-20 h-4 fill-stone-200"
              viewBox="0 0 64 16"
              preserveAspectRatio="none"
            >
              <path d="M12.8 0H51.2L64 16H0L12.8 0Z" />
            </svg>

            <div className="absolute inset-0 overflow-hidden">
              <AnarchyIsOrder className="absolute fill-stone-300 h-[120%] -right-4 -bottom-2 rotate-12 pointer-events-none" />
              <div
                style={{ filter: 'url(#stamp)' }}
                className="absolute left-4 bottom-8 px-[0.1em] leading-none w-fit font-mono font-bold outline-4 uppercase text-4xl tracking-tighter -rotate-6"
              >
                Classified
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          variants={{
            open: { y: -4 },
            falling: { opacity: 0 },
          }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="-z-10 mt-8 text-center font-mono text-[0.6rem] uppercase tracking-widest leading-loose text-neutral-600"
        >
          <p>Ref: LL-2026-ALPHA</p>
          <p>Clearance: Public dissemination</p>
          <motion.p
            variants={{
              closed: { color: 'var(--color-stone-600)' },
              open: { color: 'var(--color-stone-50)' },
            }}
          >
            Action: Click to open
          </motion.p>
        </motion.div>
      </motion.button>

      {/* ── Stage 2: The Expanding Page ── */}
      <AnimatePresence>
        {phase !== 'idle' && (
          <motion.div
            initial={false}
            layoutId="inner-yellow-page"
            className="fixed inset-0 z-30 bg-yellow-300 pointer-events-auto flex flex-col p-8"
            transition={{
              layout: {
                delay: 0.4,
                duration: 1,
                ease: [0.645, 0.045, 0.355, 1],
              },
            }}
          >
            <motion.div className="absolute top-4 right-4 text-stone-800">
              <span className="leading-none font-medium">¤ Liberty Layers</span>
            </motion.div>

            <div className="flex h-full w-full items-end">
              <h1 className="text-[13vw] leading-none font-semibold tracking-[-0.06em] text-yellow-800 md:text-[11vw]">
                Anarchy is order
              </h1>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
