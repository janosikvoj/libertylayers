'use client';

import TableOfContents from '@/components/navigation/TableOfContents';
import { cn } from '@/lib/utils';
import { Button } from '@base-ui/react';
import { useState } from 'react';

export default function ArticlesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [navExpanded, setNavExpanded] = useState<boolean>(false);

  return (
    <div
      className={cn(
        'grid lg:grid-cols-[0rem_1fr] [--nav-width:0rem] lg:[--nav-width:20rem] transition-all duration-500 ease-in-out',
        navExpanded && 'lg:grid-cols-[var(--nav-width)_1fr]',
      )}
    >
      <Button
        onClick={() => {
          setNavExpanded(!navExpanded);
        }}
        className="absolute top-20 left-12"
      >
        TOC
      </Button>

      <div className="hidden lg:block bg-linear-90 from-yellow-100 min-h-screen min-w-10">
        <TableOfContents />
      </div>

      <main className="overflow-x-hidden flex flex-col items-center">
        <article
          className={cn(
            'px-12 max-w-[calc(100vw-var(--nav-width))] w-[65ch]',
            'prose prose-stone prose-lg',
            'prose-h2:tracking-tight prose-h2:font-semibold prose-h2:text-5xl prose-h2:text-balance prose-h2:text-yellow-900',
            'prose-h3:uppercase prose-h3:font-normal prose-h3:text-yellow-800',
            'prose-blockquote:[&>p::before]:content-none prose-blockquote:not-italic prose-blockquote:bg-yellow-100',
          )}
        >
          {children}
        </article>
      </main>
    </div>
  );
}
