import { cn } from '@/lib/utils';
import React from 'react';

interface BleedProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

const Bleed: React.FC<BleedProps> = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        'relative w-screen max-w-[calc(100vw-var(--nav-width))] left-1/2 -translate-x-1/2 not-prose',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Bleed;
