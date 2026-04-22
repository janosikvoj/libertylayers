'use client';

import { cn } from '@/lib/utils';
import { NavigationMenu } from '@base-ui/react/navigation-menu';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  {
    title: '¤ Liberty Layers',
    href: '/',
  },
  {
    title: 'Articles',
    href: '/articles',
  },
  {
    title: 'Glossary',
    href: '/glossary',
  },
  {
    title: 'Archive',
    href: '/archive',
  },
];

interface HeaderProps {
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ className }) => {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <header
      className={cn(
        'fixed top-0 left-0 z-50',
        'transition-colors duration-500',
        'text-stone-800',
        className,
      )}
    >
      <NavigationMenu.Root className="mx-12 my-4">
        <NavigationMenu.List className="flex gap-6">
          {LINKS.map((item, i) => (
            <NavigationMenu.Item key={item.title}>
              <Link
                href={item.href}
                className={cn('group relative', i === 0 && 'font-semibold')}
              >
                <span className="relative z-10 block">{item.title}</span>
                <span
                  className={cn(
                    'block absolute bottom-0 w-0 h-full -mx-2 bg-[repeating-linear-gradient(to_right,currentColor_0px,currentColor_1px,transparent_1px,transparent_3px)] transition-all ease-in-out duration-300 text-yellow-400',
                    !isActive(item.href) && 'group-hover:w-4',
                    isActive(item.href) && 'w-[calc(100%+1rem)]',
                  )}
                />
              </Link>
            </NavigationMenu.Item>
          ))}
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </header>
  );
};
