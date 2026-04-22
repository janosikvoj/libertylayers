'use client';

import { useState } from 'react';
import { GLOSSARY } from './_content/glossary';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'motion/react';
import { ReactFlowProvider } from '@xyflow/react';
import GlossaryGraph from './_components/GlossaryGraph';

const CATEGORY_BADGE: Record<string, string> = {
  economic: 'bg-yellow-400 text-stone-900',
  ethical: 'bg-stone-900 text-yellow-400',
  political: 'bg-stone-600 text-stone-100',
  technical: 'bg-yellow-200 text-stone-800',
};

export default function GlossaryPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const entry = selected ? GLOSSARY[selected] : null;

  return (
    <div className="h-screen flex">
      {/* Graph */}
      <div className="flex-1 min-w-0">
        <ReactFlowProvider>
          <GlossaryGraph selected={selected} onSelect={setSelected} />
        </ReactFlowProvider>
      </div>

      {/* Detail sidebar */}
      <AnimatePresence>
        {entry && (
          <motion.aside
            key={entry.slug}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 360, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0 overflow-hidden border-l border-stone-200 bg-stone-50 flex flex-col"
          >
            <div className="p-8 flex flex-col gap-6 w-[360px]">
              {/* Category badge */}
              <span
                className={cn(
                  'self-start font-mono text-[10px] uppercase tracking-[0.2em] px-2 py-1',
                  CATEGORY_BADGE[entry.category],
                )}
              >
                {entry.category}
              </span>

              {/* Spelling + pos */}
              <div>
                <p className="font-serif text-yellow-600 text-sm tracking-wide flex gap-2 justify-between">
                  {entry.spelling}
                  <span className="italic">{entry.partOfSpeech}</span>
                </p>
                <div className="w-full h-px bg-yellow-300 mt-2 mb-1" />
                <div className="w-full h-px bg-yellow-300 mb-1" />
                <div className="w-full h-px bg-yellow-300" />
              </div>

              {/* Term + desc */}
              <div>
                <h2 className="text-2xl font-semibold tracking-tight text-stone-900 mb-3">
                  {entry.term}
                </h2>
                <p className="text-stone-700 leading-relaxed">{entry.desc}</p>
              </div>

              {/* Related terms */}
              {entry.related && entry.related.length > 0 && (
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-3">
                    Related
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {entry.related.map((slug) => {
                      const rel = GLOSSARY[slug];
                      if (!rel) return null;
                      return (
                        <button
                          key={slug}
                          onClick={() => setSelected(slug)}
                          className={cn(
                            'font-mono text-xs px-2 py-1 transition-colors',
                            CATEGORY_BADGE[rel.category],
                            'hover:opacity-80',
                          )}
                        >
                          ¤ {rel.term}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </div>
  );
}
