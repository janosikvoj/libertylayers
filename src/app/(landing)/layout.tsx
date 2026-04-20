'use client';

import AnarchyIsOrder from '@/components/brand/AnarchyIsOrder';
import { Header } from '@/components/navigation/Header';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

export default function LandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isRevealed, setIsRevealed] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  return (
    <div className="relative h-screen overflow-hidden bg-stone-950 text-neutral-100">
      {!isRevealed && (
        <motion.button
          aria-label="Open classified file"
          onClick={() => setIsRevealed(true)}
          onHoverStart={() => !isRevealed && setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className={cn(
            'absolute inset-1/3 outline-none z-40',
            !isRevealed && 'cursor-pointer',
          )}
        />
      )}

      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center motion-preset-slide-up-sm motion-duration-1000 motion-delay-500"
        initial="closed"
        animate={isRevealed ? 'revealed' : isHovered ? 'open' : 'closed'}
      >
        {/* Folder back */}
        <AnimatePresence>
          {!isRevealed && (
            <motion.div
              exit={{
                y: '100vh',
                rotateZ: -12,
                transition: { duration: 0.7, ease: 'easeIn' },
              }}
              className="w-2xs aspect-99/70 absolute bg-stone-400"
            />
          )}
        </AnimatePresence>

        {/* Yellow page */}
        <motion.main
          variants={{
            open: { y: '-1rem', rotateZ: -2 },
            revealed: {
              y: ['-1rem', '10rem', '0'],
              width: '100%',
              height: '100%',
              transition: {
                duration: 2,
                ease: 'easeInOut',
              },
            },
          }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            'relative w-2xs aspect-99/70 bg-yellow-400 text-stone-800 overflow-hidden',
            isRevealed && 'pointer-events-auto',
          )}
        >
          <Header
            className={cn(
              'absolute opacity-0 transition-opacity delay-700 duration-700',
              isRevealed && 'opacity-100',
            )}
          />
          <p
            className={cn(
              'absolute top-2 font-semibold text-nowrap right-4 transition-all duration-700',
              isRevealed && 'top-4 right-[calc(100%-3rem)] translate-x-full',
            )}
          >
            ¤ Liberty Layers
          </p>

          {isRevealed && children}
        </motion.main>

        {/* Front cover */}
        <AnimatePresence>
          {!isRevealed && (
            <motion.div
              variants={{
                closed: {
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
              }}
              exit={{
                background:
                  'linear-gradient(0deg,var(--color-stone-300) 0%, var(--color-stone-200) 0%)',
                y: '100vh',
                rotateZ: -12,
                transition: { duration: 0.7, ease: 'easeIn' },
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
              className="w-2xs aspect-99/70 absolute text-stone-800 p-4"
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
                <AnarchyIsOrder className="absolute fill-stone-600 h-[120%] -right-4 -bottom-2 rotate-12 pointer-events-none" />
                <div
                  style={{ filter: 'url(#stamp)' }}
                  className="absolute left-4 bottom-8 px-[0.1em] leading-none w-fit font-mono font-bold outline-4 uppercase text-4xl tracking-tighter -rotate-6 rounded-sm"
                >
                  Classified
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <div
        className={cn(
          'absolute bottom-0 w-full mb-8 pointer-events-auto',
          'text-center font-mono text-[0.6rem] uppercase tracking-widest leading-loose text-neutral-600',
          !isRevealed &&
            'motion-preset-slide-up motion-duration-1000 motion-delay-300',
          isRevealed && 'motion-translate-y-out-100 motion-opacity-out-0',
        )}
      >
        <p>Ref: LL-2026-ALPHA</p>
        <p>Clearance: Public dissemination</p>
        <p className={cn('transition-colors', isHovered && 'text-neutral-300')}>
          Action: Click to open
        </p>
      </div>
    </div>
  );
}
