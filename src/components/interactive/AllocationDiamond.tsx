"use client";

import { useRef, useCallback } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  MotionValue,
} from "motion/react";
import Pip, { PipCorners } from "../brand/Pip";
import { cn } from "@/lib/utils";

// ─── Math ─────────────────────────────────────────────────────────────────────

function fmt(v: number) {
  return Math.round(v * 100);
}

// ─── Corner Label ─────────────────────────────────────────────────────────────

function CornerLabel({
  label,
  val,
  corner,
}: {
  label: string;
  val: MotionValue<number>;
  corner: "tl" | "tr" | "bl" | "br";
}) {
  const indicatorHeightVal = useTransform(val, (v) => `${v * 1.41}%`);
  const fontWeight = useTransform(val, [0, 100], [100, 700]);
  return (
    <div
      className={cn(
        "absolute size-1/2 select-none pointer-events-none overflow-hidden",
        corner === "tl" && "top-0 left-0",
        corner === "tr" && "top-0 right-0",
        corner === "bl" && "bottom-0 left-0",
        corner === "br" && "bottom-0 right-0",
      )}
    >
      <motion.div
        className={cn(
          "absolute w-[141%] text-yellow-600",

          corner === "tl" &&
            "origin-bottom right-0 bottom-0 -rotate-45 translate-x-1/2 bg-[repeating-linear-gradient(to_top,currentColor_0px,currentColor_1px,transparent_1px,transparent_6px)]",
          corner === "tr" &&
            "origin-bottom left-0 bottom-0 rotate-45 -translate-x-1/2 bg-[repeating-linear-gradient(to_top,currentColor_0px,currentColor_1px,transparent_1px,transparent_6px)]",
          corner === "bl" &&
            "origin-top right-0 top-0 rotate-45 translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,currentColor_0px,currentColor_1px,transparent_1px,transparent_6px)]",
          corner === "br" &&
            "origin-top left-0 top-0 -rotate-45 -translate-x-1/2 bg-[repeating-linear-gradient(to_bottom,currentColor_0px,currentColor_1px,transparent_1px,transparent_6px)]",
        )}
        style={{
          height: indicatorHeightVal,
        }}
      />
      <span
        className={cn(
          "absolute text-stone-800 m-6 sm:m-12 font-semibold text-base tracking-tight",
          corner === "tl" && "top-0 left-0",
          corner === "tr" && "top-0 right-0",
          corner === "bl" && "bottom-0 left-0",
          corner === "br" && "bottom-0 right-0",
        )}
      >
        {label + " "}
      </span>
      <motion.span
        className={cn(
          "absolute text-yellow-600 font-mono text-6xl sm:text-7xl md:text-8xl m-4 sm:m-8 mx-6 sm:mx-10",
          corner === "tl" && "bottom-0 right-0",
          corner === "tr" && "bottom-0 left-0",
          corner === "bl" && "top-0 right-0",
          corner === "br" && "top-0 left-0",
        )}
        style={{ fontWeight: fontWeight }}
      >
        {val}
      </motion.span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AllocationDiamond() {
  const padRef = useRef<HTMLDivElement>(null);

  // Raw normalized position [0, 1]
  const nx = useMotionValue<number>(0.5);
  const ny = useMotionValue<number>(0.5);

  // Derive weights reactively — always sum to 1
  const homes = useTransform([nx, ny], ([x, y]: number[]) =>
    fmt((1 - x) * (1 - y)),
  );
  const factories = useTransform([nx, ny], ([x, y]: number[]) =>
    fmt(x * (1 - y)),
  );
  const hospitals = useTransform([nx, ny], ([x, y]: number[]) =>
    fmt((1 - x) * y),
  );
  const transport = useTransform([nx, ny], ([x, y]: number[]) => fmt(x * y));

  // Cursor pixel position derived from spring values
  const cursorLeft = useTransform(nx, (v) => `${v * 100}%`);
  const cursorTop = useTransform(ny, (v) => `${v * 100}%`);

  const updateFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const pad = padRef.current;
      if (!pad) return;
      const rect = pad.getBoundingClientRect();
      nx.set(Math.max(0, Math.min(1, (clientX - rect.left) / rect.width)));
      ny.set(Math.max(0, Math.min(1, (clientY - rect.top) / rect.height)));
    },
    [nx, ny],
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      updateFromPointer(e.clientX, e.clientY);
      const move = (me: MouseEvent) =>
        updateFromPointer(me.clientX, me.clientY);
      const up = () => {
        window.removeEventListener("mousemove", move);
        window.removeEventListener("mouseup", up);
      };
      window.addEventListener("mousemove", move);
      window.addEventListener("mouseup", up);
    },
    [updateFromPointer],
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      if (!touch) return;
      updateFromPointer(touch.clientX, touch.clientY);
      const move = (te: TouchEvent) => {
        te.preventDefault();
        if (te.touches[0]) {
          updateFromPointer(te.touches[0].clientX, te.touches[0].clientY);
        }
      };
      const end = () => {
        window.removeEventListener("touchmove", move);
        window.removeEventListener("touchend", end);
      };
      window.addEventListener("touchmove", move, { passive: false });
      window.addEventListener("touchend", end);
    },
    [updateFromPointer],
  );

  return (
    <div className="sm:mx-16 max-w-6xl w-screen">
      <div className="relative flex flex-col items-center gap-6 bg-yellow-300">
        <PipCorners />

        {/* Subtle grid lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-0 right-0 h-px bg-yellow-600" />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-yellow-600" />
        </div>

        {/* Pad */}
        <div
          ref={padRef}
          className="relative w-full max-w-[75vh] aspect-square cursor-crosshair select-none"
          style={{ touchAction: "none" }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* Corner labels */}
          <CornerLabel label="Homes" val={homes} corner="tl" />
          <CornerLabel label="Factories" val={factories} corner="tr" />
          <CornerLabel label="Hospitals" val={hospitals} corner="bl" />
          <CornerLabel label="Transport" val={transport} corner="br" />

          {/* Cursor */}
          <motion.div
            className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2"
            style={{ left: cursorLeft, top: cursorTop }}
          >
            <Pip className="stroke-yellow-600 size-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
