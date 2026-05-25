"use client";
import { motion, useMotionValue } from "motion/react";
import { useEffect, useId, useMemo, useRef } from "react";
import { useBrush } from "./CensoredBrush";

function seededRandom(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return (Math.abs(hash) % 1000) / 1000;
}

const CensoredSegment = ({
  segment,
  id,
  index,
}: {
  segment: string;
  id: string;
  index: number;
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const { registerWord, unregisterWord, revealedIds, cursorX } = useBrush();
  const isRevealed = revealedIds.has(id);
  const originX = useMotionValue<"left" | "right">("left");

  const rotate = useMemo(() => (seededRandom(id + "r") - 0.5) * 3, [id]);
  const scaleY = useMemo(() => 0.85 + seededRandom(id + "s") * 0.3, [id]);
  const insetBlock = useMemo(() => seededRandom(id + "i") * 0.2, [id]);

  const wasRevealed = useRef(false);

  useEffect(() => {
    if (isRevealed && !wasRevealed.current && ref.current) {
      wasRevealed.current = true;
      const rect = ref.current.getBoundingClientRect();
      const wordCenterX = rect.left + rect.width / 2;
      originX.set(cursorX.get() < wordCenterX ? "right" : "left");
    }
  }, [isRevealed, cursorX, originX]);

  useEffect(() => {
    if (ref.current) registerWord(id, ref.current);
    return () => unregisterWord(id);
  }, [id, registerWord, unregisterWord]);

  return (
    <motion.span
      ref={ref}
      className="relative inline-block"
      animate={{ rotate: isRevealed ? 0 : rotate }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Redaction bar */}
      <motion.span
        className="absolute inset-x-0 bg-stone-900 origin-left"
        style={{
          scaleY,
          originX: originX,
          insetBlock: insetBlock + "em",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={
          isRevealed
            ? {
                scaleX: [1, 0.2, 0],
                opacity: [1, 1, 0],
              }
            : {
                scaleX: 1,
                opacity: 1,
                transition: {
                  delay: 0.1 + index * 0.02,
                  type: "spring",
                  stiffness: 400,
                  damping: 50,
                  mass: 1,
                },
              }
        }
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
          opacity: { delay: 0.2, duration: 0.2 },
        }}
      />
      {/* Hidden word */}
      <motion.span
        className="relative block"
        initial={{
          y: "0.15em",
          opacity: 0,
          scale: 0.97,
        }}
        animate={
          isRevealed
            ? {
                y: "0em",
                opacity: 1,
                scale: 1,
              }
            : {
                y: "0.15em",
                opacity: 0,
                scale: 0.97,
              }
        }
        transition={{
          visualDuration: 0.3,
          bounce: 0.5,
          type: "spring",
          delay: 0.1,
        }}
      >
        {segment}
      </motion.span>
    </motion.span>
  );
};

interface CensoredProps {
  children: string;
  onComplete?: () => void;
}

export function Censored({ children, onComplete }: CensoredProps) {
  const baseId = useId();
  const segments = children.split(/(\s+)/);
  const words = segments.filter((s) => s.trim() !== "");
  const wordIds = words.map((_, i) => `${baseId}-${i}`);
  const { revealedIds } = useBrush();

  const allRevealed = wordIds.every((id) => revealedIds.has(id));

  useEffect(() => {
    if (allRevealed && wordIds.length > 0) {
      onComplete?.();
    }
  }, [allRevealed, onComplete, wordIds.length]);

  let wordIndex = 0;
  return (
    <>
      {segments.map((segment, i) =>
        segment.trim() === "" ? (
          <span key={i}>{segment}</span>
        ) : (
          <CensoredSegment
            key={i}
            index={i}
            segment={segment}
            id={wordIds[wordIndex++]}
          />
        ),
      )}
    </>
  );
}
