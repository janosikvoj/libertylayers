"use client";

import { parseAsString, useQueryState } from "nuqs";
import { Suspense, useState } from "react";
import { GLOSSARY } from "./_content/glossary";
import { cn } from "@/lib/utils";
import { ReactFlowProvider } from "@xyflow/react";
import GlossaryGraph from "./_components/GlossaryGraph";
import { Drawer } from "@base-ui/react";
import Pip from "@/components/brand/Pip";

const CATEGORY_BADGE: Record<string, string> = {
  economic: "bg-yellow-500 text-stone-900 fill-yellow-500 stroke-yellow-500",
  ethical: "bg-stone-900 text-yellow-400 fill-stone-900 stroke-stone-900",
  political: "bg-stone-600 text-stone-100 fill-stone-600 stroke-stone-600",
  technical: "bg-yellow-300 text-stone-800 fill-yellow-300 stroke-yellow-300",
};

export default function GlossaryPage() {
  return (
    <Suspense>
      <GlossaryPageInner />
    </Suspense>
  );
}

function GlossaryPageInner() {
  const [selected, setSelected] = useQueryState("term", parseAsString);
  const [drawerOpen, setDrawerOpen] = useState(() => !!selected);
  const entry = selected ? GLOSSARY[selected] : null;

  function handleSelect(slug: string | null) {
    if (!slug || slug === selected) {
      setDrawerOpen(false);
      setSelected(null);
      return;
    }

    if (drawerOpen && slug !== selected) {
      setDrawerOpen(false);
      setTimeout(() => {
        setSelected(slug);
        setDrawerOpen(true);
      }, 150);
    } else {
      setSelected(slug);
      setDrawerOpen(true);
    }
  }

  return (
    <div className="h-screen">
      <ReactFlowProvider>
        <GlossaryGraph selected={selected} onSelect={handleSelect} />
      </ReactFlowProvider>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-6 pointer-events-none">
        {(Object.entries(CATEGORY_BADGE) as [string, string][]).map(
          ([category, colors]) => (
            <div key={category} className="flex items-center gap-2">
              <Pip
                className={cn(
                  "rotate-45 h-4 fill-current stroke-current",
                  colors,
                  "bg-transparent",
                )}
              />
              <span className="capitalize text-base leading-none tracking-tight font-normal text-stone-600">
                {category}
              </span>
            </div>
          ),
        )}
      </div>

      <Drawer.Root
        open={drawerOpen}
        onOpenChange={(open) => {
          setDrawerOpen(open);
          if (!open) setSelected(null);
        }}
        swipeDirection="right"
        modal={false}
        disablePointerDismissal
      >
        <Drawer.Portal>
          <Drawer.Viewport className="fixed inset-0 flex justify-end pointer-events-none">
            <Drawer.Popup
              className={cn(
                "[--bleed:3rem] pointer-events-auto w-md -mr-12 bg-yellow-200 overflow-y-auto overscroll-contain outline-none",
                "transform-[translateX(var(--drawer-swipe-movement-x))] transition-[transform] duration-450 ease-[cubic-bezier(0.32,0.72,0,1)] ",
                "data-swiping:select-none data-starting-style:transform-[translateX(calc(100%-var(--bleed)+2px))] data-ending-style:transform-[translateX(calc(100%-var(--bleed)+2px))] data-ending-style:duration-[calc(var(--drawer-swipe-strength)*400ms)]",
              )}
            >
              <div className="absolute top-0 left-0 w-4 h-full bg-[repeating-linear-gradient(to_bottom,currentColor_0px,currentColor_1px,transparent_1px,transparent_6px)] text-yellow-600" />
              {entry && (
                <div className="p-12 pl-16 flex flex-col gap-6 w-sm">
                  {/* Category badge */}
                  <span
                    className={cn(
                      "self-start font-mono text-xs leading-none uppercase tracking-[0.2em] px-2 py-1",
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
                    <div className="w-full h-4 mt-2 bg-[repeating-linear-gradient(to_bottom,currentColor_0px,currentColor_1px,transparent_1px,transparent_6px)] text-yellow-600" />
                  </div>

                  {/* Term + desc */}
                  <div>
                    <h2 className="text-2xl font-semibold tracking-tight text-stone-900 mb-3">
                      {entry.term}
                    </h2>
                    <p className="text-stone-700 leading-relaxed">
                      {entry.desc}
                    </p>
                  </div>

                  {/* Related terms */}
                  {entry.related && entry.related.length > 0 && (
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.2em] text-yellow-600 mb-3">
                        Related
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {entry.related.map((slug) => {
                          const rel = GLOSSARY[slug];
                          if (!rel) return null;
                          return (
                            <button
                              key={slug}
                              onClick={() => handleSelect(slug)}
                              className={cn(
                                "font-mono text-xs px-2 py-1 transition-colors",
                                CATEGORY_BADGE[rel.category],
                                "hover:opacity-80",
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
              )}
            </Drawer.Popup>
          </Drawer.Viewport>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}
