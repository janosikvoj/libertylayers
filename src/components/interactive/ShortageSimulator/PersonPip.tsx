import { motion } from "motion/react";
import { Popover } from "@base-ui/react/popover";
import Pip from "@/components/brand/Pip";
import { cn } from "@/lib/utils";

export default function PersonPip({
  label,
  active,
  price,
  isSeller,
}: {
  label: string;
  active: boolean;
  price: number;
  isSeller: boolean;
}) {
  const ratio = 0.1 + (0.9 - 0.1) * (1 - price);

  return (
    <motion.div
      layout="position"
      layoutId={label}
      transition={{ type: "spring", visualDuration: 0.6, bounce: 0.1 }}
    >
      <Popover.Root>
        <Popover.Trigger
          openOnHover
          delay={1}
          className="group pointer-events-auto flex items-center justify-center p-1 data-popup-open:bg-yellow-100 rounded-full"
          nativeButton={false}
          render={
            <Pip
              ratio={ratio}
              className={cn(
                "h-8 rotate-45 transition-all duration-200 group-data-popup-open:scale-125",
                isSeller
                  ? cn("stroke-yellow-700", active && "fill-yellow-700")
                  : cn("stroke-stone-600", active && "fill-stone-600"),
              )}
            />
          }
        />
        <Popover.Portal>
          <Popover.Positioner sideOffset={8}>
            <Popover.Popup className="origin-(--transform-origin) bg-yellow-100 px-3 py-2 transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0">
              <Popover.Title className="text-base">{label}</Popover.Title>

              <p className="text-sm text-stone-400 tracking-wide">
                {isSeller ? "Min" : "Max"} price:{" "}
                <span className="text-stone-600">
                  {(price * 100).toFixed(0)}
                </span>
              </p>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
        {/*<Popover.Portal>
          <Popover.Positioner sideOffset={6}>
            <Popover.Popup className="origin-(--transform-origin) bg-yellow-100 px-3 py-2 transition-[transform,scale,opacity] data-ending-style:scale-90 data-ending-style:opacity-0 data-starting-style:scale-90 data-starting-style:opacity-0 z-50 flex flex-col gap-1">
              <Popover.Title className="font-mono text-[10px] uppercase tracking-[0.15em] text-stone-600">
                {label}
              </Popover.Title>
              <p className="font-mono text-[10px] text-stone-400 tracking-wide">
                {isSeller ? "Min" : "Max"} price:{" "}
                <span className="text-stone-600">
                  {(price * 100).toFixed(0)}
                </span>
              </p>
            </Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>*/}
      </Popover.Root>
    </motion.div>
  );
}
