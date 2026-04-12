'use client';

import { Button } from '@base-ui/react';
import TableOfContents from './TableOfContents';
import { motion } from 'motion/react';

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  return (
    <aside className="fixed z-40 h-screen top-0 left-0 hidden lg:block bg-radial-[at_0%_50%] from-yellow-200 motion-preset-slide-right motion-delay-300 overflow-hidden">
      <div className="h-full min-w-10 w-(--nav-width) p-1 flex flex-col justify-end">
        <div className="grow flex flex-col justify-center">
          <TableOfContents />
        </div>
        <Button
          onClick={() => {
            setOpen(!open);
          }}
          className="mb-4 py-2 hover:cursor-pointer flex justify-between w-full min-w-fit"
        >
          <svg
            className="h-auto w-8 stroke-1 stroke-stone-500 fill-none"
            viewBox="0 0 158 56"
          >
            <circle cx="28" cy="28" r="25" vectorEffect="non-scaling-stroke" />
            <motion.path
              animate={{
                d: open
                  ? 'M28 53C41.8071 53 53 41.8071 53 28C53 14.1929 41.8071 3 28 3'
                  : 'M128 53C137 44 144 37 153 28C144 19 137 12 128 3',
                opacity: open ? 0 : 1,
              }}
              d="M128 53L153 28L128 3"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              animate={{
                d: open ? 'M53 28H53' : 'M53 28H153',
              }}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <svg
            className="h-auto w-8 stroke-1 stroke-stone-500 fill-none rotate-180"
            viewBox="0 0 158 56"
          >
            <circle cx="28" cy="28" r="25" vectorEffect="non-scaling-stroke" />
            <motion.path
              animate={{
                d: !open
                  ? 'M28 53C41.8071 53 53 41.8071 53 28C53 14.1929 41.8071 3 28 3'
                  : 'M128 53C137 44 144 37 153 28C144 19 137 12 128 3',
                opacity: !open ? 0 : 1,
              }}
              d="M128 53L153 28L128 3"
              vectorEffect="non-scaling-stroke"
            />
            <motion.path
              animate={{
                d: !open ? 'M53 28H53' : 'M53 28H153',
              }}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
