// ─── Constants ────────────────────────────────────────────────────────────────

export const EQUILIBRIUM = 0.5;

export const SELLERS: { id: string; label: string; minPrice: number }[] = [
  { id: "s0", label: "Bakery on Korunní St", minPrice: 0.14 },
  { id: "s1", label: "Family farm, Moravia", minPrice: 0.19 },
  { id: "s2", label: "Mill cooperative", minPrice: 0.31 },
  { id: "s3", label: "Artisan baker", minPrice: 0.41 },
  { id: "s4", label: "Regional distributor", minPrice: 0.47 },
  { id: "s5", label: "Importer, Brno", minPrice: 0.58 },
  { id: "s6", label: "Supermarket chain", minPrice: 0.71 },
  { id: "s7", label: "Factory outlet", minPrice: 0.79 },
];

export const BUYERS: { id: string; label: string; maxPrice: number }[] = [
  { id: "b0", label: "Hospital canteen", maxPrice: 0.88 },
  { id: "b1", label: "Restaurant owner", maxPrice: 0.76 },
  { id: "b2", label: "School cafeteria", maxPrice: 0.66 },
  { id: "b3", label: "Office worker", maxPrice: 0.61 },
  { id: "b4", label: "Young family", maxPrice: 0.53 },
  { id: "b5", label: "Night shift worker", maxPrice: 0.48 },
  { id: "b6", label: "Corner shop", maxPrice: 0.39 },
  { id: "b7", label: "Student, 22", maxPrice: 0.29 },
  { id: "b8", label: "Single mother, 2 kids", maxPrice: 0.22 },
  { id: "b9", label: "Retiree on fixed pension", maxPrice: 0.17 },
];

// ─── Types ────────────────────────────────────────────────────────────────────

export type GroupMeta = { label: string; desc: string; active: boolean };
export type SellerState = "selling" | "surplus" | "underProduced" | "highCost";
export type BuyerState = "buying" | "shortage" | "budgetStrained" | "lowValue";

export const SELLER_META: Record<SellerState, GroupMeta> = {
  selling: {
    label: "Trading",
    desc: "Found a buyer at an acceptable price",
    active: true,
  },
  surplus: {
    label: "No Buyers Left",
    desc: "Willing to sell, but all buyers are already matched",
    active: false,
  },
  underProduced: {
    label: "Priced Out",
    desc: "The price cap is below what they need to cover costs",
    active: false,
  },
  highCost: {
    label: "Too Expensive",
    desc: "Their costs are too high to compete at the current price",
    active: false,
  },
};

export const BUYER_META: Record<BuyerState, GroupMeta> = {
  buying: {
    label: "Trading",
    desc: "Found a seller at an acceptable price",
    active: true,
  },
  shortage: {
    label: "No Sellers Left",
    desc: "Willing to buy, but all sellers are already matched",
    active: false,
  },
  budgetStrained: {
    label: "Priced Out",
    desc: "The price floor pushed the price above their budget",
    active: false,
  },
  lowValue: {
    label: "Can't Afford It",
    desc: "The price was always above what they're able to pay",
    active: false,
  },
};
