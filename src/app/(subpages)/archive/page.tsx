'use client';
import { BOOKS } from './_content/books';
import { RESOURCES } from './_content/resources';
import { THINKERS } from './_content/thinkers';
import Bookshelf from './_components/Bookshelf';
import ThinkerTimeline from './_components/ThinkerTimeline';
import Link from 'next/link';

export default function ArchivePage() {
  return (
    <div className="bg-stone-100 min-h-screen pt-24">
      <div className="max-w-screen-2xl mx-auto space-y-48">
        <section className="">
          <h2 className="px-12 mb-12 text-5xl font-semibold tracking-tight">
            Reading List
          </h2>
          <Bookshelf books={BOOKS} />
        </section>

        <section className="px-12">
          <h2 className="text-5xl font-semibold tracking-tight">
            Key Thinkers
          </h2>
          <ThinkerTimeline thinkers={THINKERS} />
        </section>

        <section>
          <h2 className="px-12 mb-12 text-5xl font-semibold tracking-tight">
            External Resources
          </h2>

          <div className="px-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-stone-300 border border-stone-300">
            {RESOURCES.map((resource) => (
              <Link
                key={resource.name}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-stone-100 p-6 hover:pl-10 flex flex-col justify-between gap-8 hover:bg-yellow-400 transition-all duration-200"
              >
                <div className="absolute top-0 left-0 w-0 h-full bg-[repeating-linear-gradient(to_bottom,currentColor_0px,currentColor_1px,transparent_1px,transparent_6px)] text-yellow-600 transition-all delay-100 duration-300 group-hover:w-4" />

                <span className="font-mono text-xs uppercase tracking-[0.2em] text-stone-400 group-hover:text-stone-600">
                  {resource.type}
                </span>

                <div className="flex items-end justify-between gap-2">
                  <span className="font-semibold text-stone-800 group-hover:text-stone-900 leading-tight">
                    {resource.name}
                  </span>

                  <svg
                    className="shrink-0 w-3 h-3 text-stone-300 group-hover:text-stone-700 transition-colors"
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
            <div className="bg-stone-100 h-48" />
            <div className="bg-stone-100 h-48" />
            <div className="bg-stone-100 h-48" />
            <div className="bg-stone-100 h-48" />
          </div>
        </section>
      </div>
    </div>
  );
}
