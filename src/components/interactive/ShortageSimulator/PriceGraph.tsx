import { useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Slider } from "@base-ui/react";
import { cn } from "@/lib/utils";

type Props = {
  value: number[];
  setValue: (v: number[]) => void;
  isCeilingEffective: boolean;
  isFloorEffective: boolean;
};

export default function PriceGraph({
  value,
  setValue,
  isCeilingEffective,
  isFloorEffective,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const floorVal = value[0];
  const ceilingVal = value[1];
  const floor = floorVal / 100;
  const ceiling = ceilingVal / 100;
  const ceilingSvgY = 100 - ceilingVal;
  const floorSvgY = 100 - floorVal;

  return (
    <div className="flex flex-col gap-px">
      <div className="flex flex-row gap-px">
        {/* Y legend*/}
        <div
          className={cn(
            "bg-yellow-300 p-4 pr-12 flex justify-between text-yellow-600 text-2xl font-extralight uppercase [writing-mode:vertical-rl] rotate-180 self-stretch",
          )}
        >
          <span>Low</span>
          <span>Price</span>
          <span>High</span>
        </div>
        <div
          ref={containerRef}
          className="relative w-full aspect-3/4 bg-yellow-300"
        >
          {/* Supply/demand curves + shortage/surplus markers */}
          <svg
            className="absolute inset-0 size-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <line
              x1="0"
              y1="100"
              x2="100"
              y2="0"
              vectorEffect="non-scaling-stroke"
              className="stroke-yellow-600"
            />
            <line
              x1="0"
              y1="0"
              x2="100"
              y2="100"
              vectorEffect="non-scaling-stroke"
              className="stroke-yellow-600"
            />

            {isCeilingEffective && (
              <polygon
                points={`50,50 ${100 - ceilingSvgY},${ceilingSvgY} ${ceilingSvgY},${ceilingSvgY}`}
                className="fill-stone-500"
                vectorEffect="non-scaling-stroke"
              />
            )}
            {isFloorEffective && (
              <polygon
                points={`50,50 ${100 - floorSvgY},${floorSvgY} ${floorSvgY},${floorSvgY}`}
                className="fill-yellow-700"
                vectorEffect="non-scaling-stroke"
              />
            )}
          </svg>

          <div
            className="absolute top-0 w-full bg-stone-500/20"
            style={{ height: `${100 - ceilingVal}%` }}
          />

          <div
            className="absolute bottom-0 w-full bg-yellow-700/20"
            style={{ height: `${floorVal}%` }}
          />

          <Slider.Root
            className="size-full"
            orientation="vertical"
            value={value}
            onValueChange={setValue}
            step={0.1}
            minStepsBetweenValues={80}
            thumbAlignment="edge-client-only"
          >
            <Slider.Control className="flex size-full touch-none items-center select-none">
              <Slider.Track className="size-full">
                <Slider.Thumb
                  index={0}
                  aria-label="Floor"
                  className={cn(
                    "w-full h-px bg-yellow-700 text-yellow-700 select-none has-focus-visible:outline-1 has-focus-visible:outline-yellow-700",
                    "flex justify-start items-end px-4",
                  )}
                >
                  <span className="font-mono text-xs uppercase tracking-widest leading-loose">
                    Floor{" "}
                    <Slider.Value>
                      {(formattedValues) => formattedValues[0]}
                    </Slider.Value>
                  </span>
                </Slider.Thumb>

                <Slider.Thumb
                  index={1}
                  aria-label="Ceiling"
                  className={cn(
                    "w-full h-px bg-stone-500 text-stone-500 select-none has-focus-visible:outline-1 has-focus-visible:outline-stone-500",
                    "flex justify-start items-start px-4",
                  )}
                >
                  <span className="font-mono text-xs uppercase tracking-widest leading-loose">
                    Ceiling{" "}
                    <Slider.Value>
                      {(formattedValues) => formattedValues[1]}
                    </Slider.Value>
                  </span>
                </Slider.Thumb>
              </Slider.Track>
            </Slider.Control>
          </Slider.Root>

          <span className="absolute top-12 right-10 -rotate-[52.5deg] text-sm leading-none text-yellow-600 select-none pointer-events-none">
            Supply
          </span>
          <span className="absolute top-1/2 left-1/2 -translate-y-1/2 translate-x-4 text-sm leading-none text-yellow-600 select-none pointer-events-none">
            Equilibrium
          </span>
          <span className="absolute bottom-12 right-10 rotate-[52.5deg] text-sm leading-none text-yellow-600 select-none pointer-events-none">
            Demand
          </span>

          <AnimatePresence>
            {ceilingSvgY > 63 && (
              <motion.span
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="absolute font-mono text-xs uppercase tracking-widest text-stone-200 select-none pointer-events-none -translate-x-1/2 -translate-y-full"
                style={{
                  left: "50%",
                  top: `${Math.max((1 - ceiling) * 100 - 2, 63)}%`,
                }}
              >
                Shortage
              </motion.span>
            )}
            {floorSvgY < 37 && (
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                className="absolute font-mono text-xs uppercase tracking-widest text-yellow-200 select-none pointer-events-none -translate-x-1/2"
                style={{
                  left: "50%",
                  top: `${Math.min((1 - floor) * 100 + 2, 37)}%`,
                }}
              >
                Surplus
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* X legend*/}
      <div className="grow flex gap-px">
        <div className="bg-yellow-300 w-24" />
        <div
          className={cn(
            "bg-yellow-300 grow flex justify-between p-4 items-start text-yellow-600 text-2xl font-extralight uppercase",
          )}
        >
          <span>0</span>
          <span>Quantity</span>
          <span>Max</span>
        </div>
      </div>
    </div>
  );
}
