import { useMemo } from "react";
import { SELLERS, BUYERS, EQUILIBRIUM } from "./data";

export function useMarketGroups(floor: number, ceiling: number) {
  const isCeilingEffective = ceiling < EQUILIBRIUM;
  const isFloorEffective = floor > EQUILIBRIUM;

  const sellerGroups = useMemo(() => {
    const effectivePrice = isCeilingEffective
      ? ceiling
      : isFloorEffective
        ? floor
        : EQUILIBRIUM;
    const willing = SELLERS.filter((s) => s.minPrice <= effectivePrice);
    const willingBuyerCount = BUYERS.filter(
      (b) => b.maxPrice >= effectivePrice,
    ).length;
    const selling = willing.slice(0, willingBuyerCount);
    const surplus = willing.slice(willingBuyerCount);
    const notWilling = SELLERS.filter((s) => s.minPrice > effectivePrice);
    const underProduced = isCeilingEffective
      ? notWilling.filter((s) => s.minPrice <= EQUILIBRIUM)
      : [];
    const highCost = notWilling.filter(
      (s) => s.minPrice > EQUILIBRIUM && !underProduced.includes(s),
    );
    return { selling, surplus, underProduced, highCost };
  }, [ceiling, floor, isCeilingEffective, isFloorEffective]);

  const buyerGroups = useMemo(() => {
    const effectivePrice = isCeilingEffective
      ? ceiling
      : isFloorEffective
        ? floor
        : EQUILIBRIUM;
    const willing = BUYERS.filter((b) => b.maxPrice >= effectivePrice);
    const buying = willing.slice(0, sellerGroups.selling.length);
    const shortage = willing.slice(sellerGroups.selling.length);
    const budgetStrained = isFloorEffective
      ? BUYERS.filter((b) => b.maxPrice >= EQUILIBRIUM && b.maxPrice < floor)
      : [];
    const lowValue = BUYERS.filter(
      (b) => b.maxPrice < effectivePrice && !budgetStrained.includes(b),
    );
    return { buying, shortage, budgetStrained, lowValue };
  }, [
    ceiling,
    floor,
    isCeilingEffective,
    isFloorEffective,
    sellerGroups.selling.length,
  ]);

  return { sellerGroups, buyerGroups, isCeilingEffective, isFloorEffective };
}
