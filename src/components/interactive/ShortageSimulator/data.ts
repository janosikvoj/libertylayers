// ─── Constants ────────────────────────────────────────────────────────────────

export const EQUILIBRIUM = 0.5;

export const SELLERS: { id: string; label: string; minPrice: number }[] = [
  { id: "s0", label: "Retired couple, spare room", minPrice: 0.12 },
  { id: "s1", label: "Small private landlord", minPrice: 0.18 },
  { id: "s2", label: "Converted family home", minPrice: 0.28 },
  { id: "s3", label: "Cooperative housing", minPrice: 0.38 },
  { id: "s4", label: "Mid-size property firm", minPrice: 0.46 },
  { id: "s5", label: "New-build developer", minPrice: 0.57 },
  { id: "s6", label: "Institutional investor", minPrice: 0.68 },
  { id: "s7", label: "Luxury conversion", minPrice: 0.78 },
];

export const BUYERS: { id: string; label: string; maxPrice: number }[] = [
  { id: "b0", label: "Tech company relocation", maxPrice: 0.91 },
  { id: "b1", label: "Dual-income couple", maxPrice: 0.79 },
  { id: "b2", label: "Young professional", maxPrice: 0.67 },
  { id: "b3", label: "Graduate student", maxPrice: 0.58 },
  { id: "b4", label: "Service worker, full-time", maxPrice: 0.51 },
  { id: "b5", label: "Part-time worker", maxPrice: 0.44 },
  { id: "b6", label: "Single parent, 1 child", maxPrice: 0.35 },
  { id: "b7", label: "Recent immigrant", maxPrice: 0.26 },
  { id: "b8", label: "Minimum wage worker", maxPrice: 0.19 },
  { id: "b9", label: "Retiree on pension", maxPrice: 0.13 },
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
