"use client";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import React, { ComponentProps } from "react";

type PipBaseProps = ComponentProps<typeof motion.svg>;

type PipProps = PipBaseProps & {
  children?: React.ReactNode;
  spokes?: number;
  ratio?: number;
};

const Pip: React.FC<PipProps> = ({
  className,
  children,
  viewBox,
  spokes = 4,
  ratio = 0.5,
  ...props
}) => {
  const r = 50 * (1 - ratio);

  const spokePaths = Array.from({ length: spokes }, (_, i) => {
    const angle = (360 / spokes) * i;
    return (
      <line
        key={i}
        x1={50 + r}
        y1={50}
        x2={100}
        y2={50}
        transform={`rotate(${angle} 50 50)`}
        vectorEffect="non-scaling-stroke"
      />
    );
  });

  return (
    <motion.svg
      className={cn(
        "h-6 w-auto stroke-1 fill-none stroke-yellow-600",
        className,
      )}
      viewBox={viewBox ?? "0 0 100 100"}
      {...props}
    >
      {ratio < 1 && (
        <circle cx="50" cy="50" r={r} vectorEffect="non-scaling-stroke" />
      )}
      {ratio > 0 && spokePaths}
      {children}
    </motion.svg>
  );
};

export const PipCorners = ({ className }: { className?: string }) => (
  <>
    <Pip
      className={cn(
        "absolute left-0 top-0 stroke-yellow-500 h-4 rotate-45",
        className,
      )}
    />
    <Pip
      className={cn(
        "absolute left-0 bottom-0 stroke-yellow-500 h-4 rotate-45",
        className,
      )}
    />
    <Pip
      className={cn(
        "absolute right-0 top-0 stroke-yellow-500 h-4 rotate-45",
        className,
      )}
    />
    <Pip
      className={cn(
        "absolute right-0 bottom-0 stroke-yellow-500 h-4 rotate-45",
        className,
      )}
    />
  </>
);

export default Pip;
