import { motion, AnimatePresence } from "motion/react";
import { Toggle } from "@base-ui/react";
import { cn } from "@/lib/utils";
import PersonPip from "./PersonPip";
import { BuyerState, GroupMeta, SellerState } from "./data";

const MotionToggle = motion.create(Toggle);

export default function Group({
  meta,
  value,
  setSelected,
  isSeller,
  items,
}: {
  meta: GroupMeta;
  value: SellerState | BuyerState;
  setSelected: (value: (SellerState | BuyerState)[]) => void;
  isSeller: boolean;
  items: { id: string; label: string; price: number }[];
}) {
  if (!meta) return null;
  const { label, desc } = meta;

  return (
    <MotionToggle
      value={value}
      onPointerEnter={() => setSelected([value])}
      layout
      className={cn(
        "group relative p-4 flex flex-col justify-between bg-yellow-200 overflow-hidden",
        isSeller ? "text-yellow-700" : "text-stone-500",
      )}
    >
      <motion.span
        layout
        className="text-base tracking-tight translate-y-0 group-data-pressed:-translate-y-4 group-data-pressed:opacity-0 duration-300 transition-all"
      >
        {label}
        <span className="ml-1.5 font-mono opacity-65">{items.length}</span>
      </motion.span>

      <div className="absolute top-0 inset-x-0 p-4 flex items-center">
        <span className="text-sm italic tracking-wide translate-y-4 group-data-pressed:translate-y-0 opacity-0 group-data-pressed:opacity-100 duration-300 transition-all">
          {desc}
        </span>
      </div>

      <motion.div
        layout
        className="grow flex flex-wrap content-center justify-center gap-1"
      >
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <PersonPip
              key={item.id}
              label={item.label}
              active={meta.active}
              price={item.price}
              isSeller={isSeller}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      {/*<div className="absolute inset-0 p-4 flex items-center bg-yellow-100 opacity-0 group-data-pressed:opacity-100 transition-opacity duration-700 group-data-pressed:duration-200">
        <p className="text-sm tracking-wide translate-y-4 group-data-pressed:translate-y-0 opacity-0 group-data-pressed:opacity-100 delay-100 duration-300 transition-all">
          {desc}
        </p>
      </div>*/}
    </MotionToggle>
  );
}
