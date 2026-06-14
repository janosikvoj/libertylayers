"use client";

import { ScrollArea } from "@base-ui/react";
import { Book, CATEGORY_COLORS } from "../_content/books";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { motion } from "motion/react";
import Pip from "@/components/brand/Pip";
import ExternalLink from "@/components/navigation/ExternalLink";

const spineWidthFromPages = (pages: number) => {
  const min = 32,
    max = 96;
  const clamp = Math.min(Math.max(pages, 30), 1000);
  return Math.round(min + ((clamp - 30) / (1000 - 30)) * (max - min));
};

const bookHeightFromTitle = (title: string) => {
  const hash = [...title].reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const heights = ["18rem", "20rem", "22rem", "24rem"];
  return heights[hash % heights.length];
};

function Bookshelf({ books }: { books: Book[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(2);

  return (
    <>
      <ScrollArea.Root>
        <ScrollArea.Viewport className="outline-none">
          <ScrollArea.Content>
            <div className="flex justify-center items-end px-12 mt-4">
              {books.map((book, i) => {
                const isActive = activeIndex === i;
                const spineWidth = spineWidthFromPages(book.pages);
                const bookHeight = bookHeightFromTitle(book.title);
                const colors = CATEGORY_COLORS[book.category];

                return (
                  <motion.div
                    key={book.title + i}
                    onClick={() => setActiveIndex(i)}
                    initial="idle"
                    animate={isActive ? "active" : "idle"}
                    whileHover="hovered"
                    variants={{
                      idle: {
                        width: spineWidth,
                        x: spineWidth,
                        marginInline: 0,
                      },
                      active: { width: 256, x: 0, marginInline: "2rem" },
                      hovered: {
                        width: isActive ? 256 : spineWidth + 16,
                        x: isActive ? 0 : spineWidth,
                        marginInline: isActive ? "2rem" : "0.5rem",
                      },
                    }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    style={{ height: bookHeight }}
                    className="relative shrink-0 cursor-pointer perspective-midrange perspective-origin-bottom-left"
                  >
                    <motion.div
                      variants={{
                        idle: { rotateY: 90 },
                        active: { rotateY: 0 },
                        hovered: { rotateY: isActive ? 0 : 85 },
                      }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full h-full origin-left relative transform-3d"
                    >
                      {/* FRONT COVER */}
                      <ExternalLink
                        href={book.href}
                        className={cn(
                          "absolute top-0 left-0 w-64 h-full flex flex-col gap-4 justify-between p-4",
                          !isActive && "pointer-events-none",
                          colors.cover,
                          colors.text,
                        )}
                      >
                        <div>
                          <h3 className="text-3xl font-bold tracking-tight leading-none">
                            {book.title}
                          </h3>
                          <p className="font-mono text-xs mt-2 uppercase tracking-widest opacity-60">
                            {book.author || "Author Name"}
                          </p>
                        </div>

                        <div>
                          <div
                            style={{ height: spineWidth }}
                            className="w-full bg-[repeating-linear-gradient(to_bottom,currentColor_0px,currentColor_1px,transparent_1px,transparent_6px)]"
                          />
                          <span className="font-mono text-lg font-medium">
                            {book.year}
                          </span>
                        </div>
                      </ExternalLink>

                      {/* SPINE */}
                      <div
                        className={cn(
                          "absolute top-0 h-full origin-right flex flex-col items-center justify-between py-4",
                          colors.spine,
                          colors.spineText,
                        )}
                        style={{
                          width: spineWidth,
                          left: -spineWidth,
                          transform: "rotateY(-90deg)",
                        }}
                      >
                        <span className="font-mono text-xs font-semibold">
                          {book.year}
                        </span>
                        <h3 className="[writing-mode:vertical-rl] rotate-180 text-xl font-medium tracking-tight whitespace-nowrap truncate max-h-50">
                          {book.title}
                        </h3>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
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

      <div className="flex justify-center gap-6 mt-8 flex-wrap">
        {(
          Object.entries(CATEGORY_COLORS) as [
            Book["category"],
            (typeof CATEGORY_COLORS)[Book["category"]],
          ][]
        ).map(([category, colors]) => (
          <div key={category} className="flex items-center gap-2">
            <Pip
              className={cn(
                "rotate-45 h-4 fill-current stroke-current",
                colors.palette,
              )}
            />
            <span className="capitalize text-base leading-none tracking-tight font-normal text-stone-600">
              {category}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

export default Bookshelf;
