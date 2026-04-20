'use client';

import Sidebar from '@/components/navigation/Sidebar';
import { cn } from '@/lib/utils';
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
        'relative flex [--nav-width:0rem] lg:[--nav-width:2.5rem] transition-[--nav-width] duration-500 ease-in-out',
        navExpanded && 'lg:[--nav-width:20rem]',
      )}
    >
      <Sidebar open={navExpanded} setOpen={setNavExpanded} />

      <div className="w-(--nav-width)" />

      <main className="grow overflow-x-hidden flex flex-col items-center">
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
