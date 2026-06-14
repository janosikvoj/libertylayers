"use client";

import Sidebar from "@/components/navigation/Sidebar";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Link from "next/link";

export default function ArticlesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [navExpanded, setNavExpanded] = useState<boolean>(false);

  return (
    <>
      <div
        className={cn(
          "relative flex [--nav-width:0rem] lg:[--nav-width:2.5rem] transition-[--nav-width] duration-500 ease-in-out",
          navExpanded && "lg:[--nav-width:20rem]",
        )}
      >
        <Sidebar open={navExpanded} setOpen={setNavExpanded} />

        <div className="w-(--nav-width)" />

        <main className="grow overflow-x-hidden flex flex-col items-center">
          <article
            className={cn(
              "px-6 sm:px-12 max-w-[calc(100vw-var(--nav-width))] w-[65ch]",
              "prose prose-stone prose-lg",
              "prose-h2:tracking-tight prose-h2:font-semibold prose-h2:text-4xl sm:prose-h2:text-5xl prose-h2:text-balance prose-h2:text-yellow-900",
              "prose-h3:uppercase prose-h3:font-normal prose-h3:text-yellow-800",
              "prose-blockquote:[&>p::before]:content-none prose-blockquote:not-italic prose-blockquote:bg-yellow-100",
            )}
          >
            {children}
          </article>
        </main>
      </div>
      <footer className="px-6 sm:px-12 mt-48 grid grid-cols-3 gap-px bg-yellow-100 border border-yellow-100">
        {[
          { name: "Articles", url: "/articles", type: "More reading" },
          { name: "Glossary", url: "/glossary", type: "Term definitions" },
          { name: "Archive", url: "/archive", type: "External resources" },
        ].map((resource) => (
          <Link
            key={resource.name}
            href={resource.url}
            className="group relative bg-yellow-600 p-3 sm:p-6 hover:pl-10 flex flex-col justify-between gap-8 hover:bg-yellow-400 transition-all duration-200 overflow-hidden text-ellipsis"
          >
            <div className="absolute top-0 left-0 w-0 h-full bg-[repeating-linear-gradient(to_bottom,currentColor_0px,currentColor_1px,transparent_1px,transparent_6px)] text-yellow-600 transition-all delay-100 duration-300 group-hover:w-4" />

            <span className="font-mono text-xs uppercase tracking-[0.2em] text-yellow-800 group-hover:text-stone-800  overflow-hidden text-ellipsis">
              {resource.type}
            </span>
            <div className="flex items-end justify-between gap-2">
              <span className="font-semibold text-stone-800 group-hover:text-stone-900 leading-tight">
                {resource.name}
              </span>

              <svg
                className="shrink-0 w-3 h-3 text-yellow-800 group-hover:text-stone-700 transition-colors"
                viewBox="0 0 12 12"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M2 10L10 2M10 2H4M10 2v6" />
              </svg>
            </div>
          </Link>
        ))}
        <div className="bg-yellow-600 h-48" />
        <div className="bg-yellow-600 h-48" />
        <div className="bg-yellow-600 h-48" />
      </footer>
    </>
  );
}
