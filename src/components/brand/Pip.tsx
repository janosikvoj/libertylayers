'use client';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import React, { ComponentProps } from 'react';

type PipBaseProps = ComponentProps<typeof motion.svg>;

type PipProps = PipBaseProps & {
  children?: React.ReactNode;
};

const Pip: React.FC<PipProps> = ({ className, children, viewBox }) => {
  return (
    <motion.svg
      className={cn(
        'h-6 w-auto stroke-1 fill-none stroke-yellow-600',
        className,
      )}
      viewBox={viewBox ?? '0 0 100 100'}
    >
      <circle cx="50" cy="50" r="25" vectorEffect="non-scaling-stroke" />
      <path d="M100 50C95 50 80 50 75 50" vectorEffect="non-scaling-stroke" />
      <path d="M25 50C20 50 5 50 0 50" vectorEffect="non-scaling-stroke" />
      <path d="M50 0C50 5 50 20 50 25" vectorEffect="non-scaling-stroke" />
      <path d="M50 75C50 80 50 95 50 100" vectorEffect="non-scaling-stroke" />
      {children}
    </motion.svg>
  );
};

export const PipCorners = () => (
  <>
    <Pip className="absolute left-0 top-0 stroke-yellow-500 h-4 rotate-45" />
    <Pip className="absolute left-0 bottom-0 stroke-yellow-500 h-4 rotate-45" />
    <Pip className="absolute right-0 top-0 stroke-yellow-500 h-4 rotate-45" />
    <Pip className="absolute right-0 bottom-0 stroke-yellow-500 h-4 rotate-45" />
  </>
);

export default Pip;
