'use client';

import RattleSnake2 from '@/components/illustrations/RattleSnake2';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const ARTICLES = [
  {
    title: 'Negative Rights',
    href: '/articles/negative-rights',
    desc: 'The only rights that require nothing but to be left alone.',
  },
  {
    title: 'Economic Calculation',
    href: '/articles/economic-calculation',
    desc: 'Why the central planner is permanently flying blind.',
  },
  {
    title: 'Spontaneous Order',
    href: '/articles/spontaneous-order',
    desc: 'Complex systems emerge without a designer.',
  },
];

export default function ArticlesPage() {
  return (
    <div className="relative bg-yellow-600 min-h-screen">
      <div className="absolute inset-0 overflow-hidden">
        <RattleSnake2 className="absolute top-1/2 -translate-y-1/2 -right-[10%] h-[120vh] w-auto pointer-events-none fill-yellow-700" />
      </div>

      <div className="relative z-10 px-12 pb-24 h-screen flex flex-col items-end justify-end gap-4 max-w-5xl ml-auto">
        {ARTICLES.map((article, i) => (
          <Link
            key={article.href}
            href={article.href}
            className={cn(
              'group motion-preset-slide-down-sm motion-duration-1000',
              i === 0 && 'motion-delay-100',
              i === 1 && 'motion-delay-200',
              i === 2 && 'motion-delay-300',
            )}
          >
            <h2 className="text-stone-100 text-8xl tracking-tighter font-semibold filter-[url(#stamp)] origin-right group-hover:scale-[99.5%] transition-all">
              {article.title}
            </h2>
            <p
              className={cn(
                'text-lg text-right text-stone-100 translate-y-2 opacity-0',
                'transition-all duration-300 ease-in',
                'group-hover:translate-y-0 group-hover:opacity-100 group-hover:ease-out',
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
