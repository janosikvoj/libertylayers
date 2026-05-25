"use client";
import { motion } from "motion/react";

interface ArrowIconProps {
  direction?: "left" | "right" | "up" | "down";
  className?: string;
}

const ROTATIONS = { right: 0, left: 180, down: 90, up: -90 };

export function ArrowIcon({ direction = "right", className }: ArrowIconProps) {
  return (
    <svg
      className={className}
      style={{ rotate: ROTATIONS[direction] + "deg" }}
      viewBox="0 0 158 56"
      fill="none"
      strokeWidth="1"
      vectorEffect="non-scaling-stroke"
    >
      <motion.circle
        cx="28"
        cy="28"
        r="25"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 0.25 }}
        transition={{ duration: 0.5 }}
        vectorEffect="non-scaling-stroke"
      />
      <motion.path
        initial={{
          d: "M28 53C41.8071 53 53 41.8071 53 28C53 14.1929 41.8071 3 28 3",
          opacity: 0,
        }}
        animate={{
          d: "M128 53C137 44 144 37 153 28C144 19 137 12 128 3",
          opacity: 1,
        }}
        transition={{ delay: 0.4 }}
        vectorEffect="non-scaling-stroke"
      />
      <motion.path
        initial={{ d: "M53 28H53" }}
        animate={{ d: "M53 28H153" }}
        transition={{ delay: 0.4 }}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
