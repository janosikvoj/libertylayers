"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type TOC = { id: string; text: string; level: number };

export default function TableOfContents() {
  const [toc, setToc] = useState<TOC[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  // Extract headings from DOM after render
  useEffect(() => {
    const headings = Array.from(document.querySelectorAll("h1, h2, h3"));
    setToc(
      headings.map((el) => ({
        id: el.id,
        text: el.textContent ?? "",
        level: Number(el.tagName[1]),
      })),
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
      { rootMargin: "-10% 0px -80% 0px" },
    );

    document
      .querySelectorAll("h1, h2, h3")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [toc]);

  return (
    <nav className="sticky top-32 mt-[calc(100vh+var(--spacing)*32)] flex flex-col gap-1.5 text-sm pl-2 max-w-full">
      {toc.map(({ id, text, level }) => (
        <a
          key={id}
          href={`#${id}`}
          data-active={activeId === id}
          className={cn(
            "group flex items-center gap-3 text-stone-400 hover:text-stone-500 transition-all",
            "data-[active=true]:text-yellow-600 data-[active=true]:font-medium",
            "truncate mask-r-from-90%",
          )}
        >
          <span
            className={cn(
              "h-px bg-stone-400 transition-colors shrink-0",
              level === 3 ? "w-9" : "w-6",
              "origin-left transition-all",
              "group-data-[active=true]:bg-yellow-600 group-data-[active=true]:scale-y-125",
            )}
          />
          {text}
        </a>
      ))}
    </nav>
  );
}
