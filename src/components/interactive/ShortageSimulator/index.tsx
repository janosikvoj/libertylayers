"use client";
import { useState } from "react";
import { useMarketGroups } from "./useMarketGroups";
import { PipCorners } from "@/components/brand/Pip";
import { motion, MotionConfig, LayoutGroup } from "motion/react";
import PriceGraph from "./PriceGraph";
import { ToggleGroup } from "@base-ui/react";
import Group from "./Group";
import {
  BUYER_META,
  BuyerState,
  GroupMeta,
  SELLER_META,
  SellerState,
} from "./data";

export default function ShortageSimulator() {
  const [value, setValue] = useState([20, 80]);
  const [selected, setSelected] = useState<string[]>([]);

  const floor = value[0] / 100;
  const ceiling = value[1] / 100;
  const { sellerGroups, buyerGroups, isCeilingEffective, isFloorEffective } =
    useMarketGroups(floor, ceiling);

  return (
    <div className="mx-16 max-w-6xl w-screen">
      <div className="relative grid grid-cols-2 gap-px bg-yellow-600">
        <PipCorners className="z-10" />

        <PriceGraph
          value={value}
          setValue={setValue}
          isCeilingEffective={isCeilingEffective}
          isFloorEffective={isFloorEffective}
        />

        <MotionConfig
          transition={{ type: "spring", visualDuration: 0.2, bounce: 0.1 }}
        >
          <LayoutGroup>
            <ToggleGroup
              value={selected}
              onValueChange={setSelected}
              onPointerLeave={() => setSelected([])}
              className="flex flex-col gap-px"
            >
              {/* Sellers */}
              <motion.div layout className="grow flex gap-px">
                <motion.div layout className="grow grid grid-cols-2 gap-px">
                  {(
                    Object.entries(SELLER_META) as [SellerState, GroupMeta][]
                  ).map(([key, meta]) => (
                    <Group
                      key={key}
                      value={key}
                      setSelected={setSelected}
                      meta={meta}
                      isSeller={true}
                      items={sellerGroups[key].map((s) => ({
                        id: s.id,
                        label: s.label,
                        price: s.minPrice,
                      }))}
                    />
                  ))}
                </motion.div>
                <motion.div layout className="bg-yellow-200 p-4 pr-12">
                  <span className="text-yellow-700 text-2xl font-extralight uppercase [writing-mode:vertical-rl]">
                    Sellers
                  </span>
                </motion.div>
              </motion.div>

              {/* Buyers */}
              <div className="grow flex gap-px">
                <div className="grow grid grid-cols-2 gap-px">
                  {(
                    Object.entries(BUYER_META) as [BuyerState, GroupMeta][]
                  ).map(([key, meta]) => (
                    <Group
                      key={key}
                      value={key}
                      setSelected={setSelected}
                      meta={meta}
                      isSeller={false}
                      items={buyerGroups[key].map((b) => ({
                        id: b.id,
                        label: b.label,
                        price: b.maxPrice,
                      }))}
                    />
                  ))}
                </div>
                <motion.div layout className="bg-yellow-200 p-4 pr-12">
                  <span className="text-stone-500 text-2xl font-extralight uppercase [writing-mode:vertical-rl]">
                    Buyers
                  </span>
                </motion.div>
              </div>
            </ToggleGroup>
          </LayoutGroup>
        </MotionConfig>
      </div>
    </div>
  );
}
