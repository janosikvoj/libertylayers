"use client";
import {
  createContext,
  useContext,
  useRef,
  useState,
  useCallback,
} from "react";
import { MotionValue, useMotionValue } from "motion/react";

const BRUSH_RADIUS = 24;
const BRUSH_RADIUS_CLICK = BRUSH_RADIUS * 4;

interface BrushContextType {
  registerWord: (id: string, el: HTMLElement) => void;
  unregisterWord: (id: string) => void;
  revealedIds: Set<string>;
  cursorX: MotionValue<number>;
}

const BrushContext = createContext<BrushContextType | null>(null);
export const useBrush = () => useContext(BrushContext)!;

export function CensoredBrush({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<Map<string, HTMLElement>>(new Map());
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());

  const cursorX = useMotionValue(-999);
  const cursorY = useMotionValue(-999);

  const checkIntersections = useCallback((x: number, y: number, r: number) => {
    setRevealedIds((prev) => {
      const next = new Set(prev);
      wordsRef.current.forEach((el, id) => {
        if (next.has(id)) return;
        const rect = el.getBoundingClientRect();
        if (
          rect.top - r < y &&
          y < rect.bottom + r &&
          rect.left - r < x &&
          x < rect.right + r
        )
          next.add(id);
      });
      return next;
    });
  }, []);

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      cursorX.set(x);
      cursorY.set(y);
      checkIntersections(x, y, BRUSH_RADIUS);
    },
    [checkIntersections, cursorX, cursorY],
  );

  const handleClick = useCallback(
    (e: React.PointerEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      cursorX.set(x);
      cursorY.set(y);
      checkIntersections(x, y, BRUSH_RADIUS_CLICK);
    },
    [checkIntersections, cursorX, cursorY],
  );

  const registerWord = useCallback((id: string, el: HTMLElement) => {
    wordsRef.current.set(id, el);
  }, []);

  const unregisterWord = useCallback((id: string) => {
    wordsRef.current.delete(id);
  }, []);

  return (
    <BrushContext.Provider
      value={{ registerWord, unregisterWord, revealedIds, cursorX }}
    >
      <div
        ref={containerRef}
        className="relative contents select-none"
        onPointerMove={handlePointerMove}
        onPointerDown={handleClick}
      >
        {children}
      </div>
    </BrushContext.Provider>
  );
}
