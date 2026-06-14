"use client";

import {
  Annotated,
  Drawing,
} from "@/components/annotations/drawing-annotations";
import RattleSnake2 from "@/components/illustrations/RattleSnake2";
import { cn } from "@/lib/utils";
import Link from "next/link";

const ARTICLES = [
  {
    title: "Negative Rights",
    href: "/articles/negative-rights",
    desc: "Defined by the absence of aggression.",
    status: "wip",
  },
  {
    title: "Economic Calculation",
    href: "/articles/economic-calculation",
    desc: "Rational allocation is impossible without a price system.",
    status: "done",
  },
  {
    title: "Spontaneous Order",
    href: "/articles/spontaneous-order",
    desc: "Complex systems emerge without a designer.",
    status: "wip",
  },
];

export default function ArticlesPage() {
  return (
    <div className="relative bg-yellow-600 min-h-svh">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <RattleSnake2 className="absolute top-1/2 -translate-y-1/2 -right-[10%] h-[120vh] w-auto fill-yellow-700" />
      </div>

      <div className="relative z-10 px-6 pb-12 sm:px-12 sm:pb-24 h-screen flex flex-col items-end justify-end gap-4 max-w-5xl ml-auto">
        {ARTICLES.map((article, i) => (
          <Link
            key={article.href}
            href={article.href}
            className={cn(
              "group text-stone-100 text-right",
              "hover:scale-[99.5%] transition-all origin-right",
              "motion-preset-slide-down-sm motion-duration-1000",
              i === 0 && "motion-delay-100",
              i === 1 && "motion-delay-200",
              i === 2 && "motion-delay-300",
            )}
          >
            {article.status === "wip" ? (
              <Annotated
                annotation={
                  <Drawing
                    className="sm:scale-150 top-1/4 right-2 sm:right-6"
                    drawing="work-in-progress"
                  />
                }
              >
                <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter font-semibold filter-[url(#stamp)] mask-r-from-50%">
                  {article.title}
                </h2>
              </Annotated>
            ) : (
              <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter font-semibold filter-[url(#stamp)]">
                {article.title}
              </h2>
            )}
            <p
              className={cn(
                "text-base text-balance sm:text-lg md:translate-y-2 md:opacity-0",
                "transition-all duration-300 ease-in",
                "group-hover:translate-y-0 group-hover:opacity-100 group-hover:ease-out",
              )}
            >
              {article.desc}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
