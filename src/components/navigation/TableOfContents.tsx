'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';

function TocDash({ level, active }: { level: number; active: boolean }) {
  const w = level === 3 ? 32 : 24;
  const tickSpacing = 3;
  const ticks = Math.floor(w / tickSpacing);

  return (
    <svg
      width={w}
      height={16}
      viewBox={`0 0 ${w} 16`}
      vectorEffect="non-scaling-stroke"
    >
      {/* Base line */}
      <motion.line
        x1={0}
        y1={8}
        x2={w}
        y2={8}
        strokeWidth={1}
        className="stroke-yellow-600 group-hover:stroke-yellow-800 origin-left"
        animate={{ scaleX: active ? 0 : 1 }}
        transition={{
          duration: 0.3,
          ease: [0.16, 1, 0.3, 1],
          delay: active ? 0 : 0.3,
        }}
        vectorEffect="non-scaling-stroke"
      />

      {/* Active ticks */}
      {Array.from({ length: ticks }).map((_, i) => {
        const x = i * tickSpacing + 2;
        return (
          <motion.line
            key={i}
            x1={x}
            y1={4}
            x2={x}
            y2={12}
            className="stroke-yellow-600 origin-bottom"
            animate={{
              scaleY: active ? 1 : 0,
            }}
            transition={{
              duration: 0.2,
              ease: [0.16, 1, 0.3, 1],
              delay: active ? i * 0.04 : (ticks - i) * 0.02,
            }}
            vectorEffect="non-scaling-stroke"
          />
        );
      })}
    </svg>
  );
}

export type TOC = { id: string; text: string; level: number };

interface TableOfContentsProps {
  expanded?: boolean;
}

export default function TableOfContents({
  expanded = true,
}: TableOfContentsProps) {
  const [toc, setToc] = useState<TOC[]>([]);
  const [activeId, setActiveId] = useState<string>('');

  // Extract headings from DOM after render
  useEffect(() => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3'));

    const items = headings.map((el) => ({
      id: el.id,
      text: el.textContent ?? '',
      level: Number(el.tagName[1]),
    }));

    // eslint-disable-next-line
    setToc((prev) =>
      JSON.stringify(prev) === JSON.stringify(items) ? prev : items,
    );
  }, []);

  // Track active heading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-10% 0px -80% 0px' },
    );

    document
      .querySelectorAll('h1, h2, h3')
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [toc]);

  return (
    <nav className="flex flex-col text-sm max-w-full">
      {toc.map(({ id, text, level }, i) => {
        const isActive = activeId === id;

        return (
          <a
            key={id}
            href={`#${id}`}
            data-active={isActive || undefined}
            className={cn(
              'group flex items-center gap-3 truncate py-0.75',
              'text-stone-600 origin-left transition-all',
              !isActive && 'hover:text-stone-900 hover:scale-97',
              isActive && 'text-yellow-600 font-medium',
            )}
          >
            <TocDash level={level} active={isActive} />

            <motion.span
              animate={{ opacity: expanded ? 1 : 0, x: expanded ? 0 : -4 }}
              transition={{
                duration: 0.2,
                ease: 'easeOut',
                delay: expanded ? 0.2 + 0.02 * i : 0.02 * i,
              }}
              className="max-w-(--nav-width) truncate"
            >
              {text}
            </motion.span>
          </a>
        );
      })}
    </nav>
  );
}
