'use client';

import TableOfContents from './TableOfContents';
import { useRef } from 'react';

interface SidebarProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ open, setOpen }) => {
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleMouseEnter() {
    hoverTimeout.current = setTimeout(() => setOpen(true), 150);
  }

  function handleMouseLeave() {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setOpen(false);
  }

  return (
    <aside
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="fixed z-40 h-screen top-0 left-0 hidden lg:block motion-preset-slide-right motion-delay-300"
    >
      <div className="h-full min-w-10 p-1 flex flex-col justify-end">
        <div
          onClick={() => setOpen(false)}
          className="grow flex flex-col justify-center"
        >
          <TableOfContents expanded={open} />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
