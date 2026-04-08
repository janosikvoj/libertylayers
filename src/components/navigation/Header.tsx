import { NavigationMenu } from '@base-ui/react/navigation-menu';
import Link from 'next/link';

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 z-50">
      <NavigationMenu.Root className="mx-12 my-4">
        <NavigationMenu.List className="flex gap-6">
          <NavigationMenu.Item className="font-semibold">
            <Link href="/">¤ Liberty Layers</Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <Link href="/articles">Articles</Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <Link href="/glossary">Glossary</Link>
          </NavigationMenu.Item>
          <NavigationMenu.Item>
            <Link href="/archive">Archive</Link>
          </NavigationMenu.Item>
        </NavigationMenu.List>
      </NavigationMenu.Root>
    </header>
  );
};
