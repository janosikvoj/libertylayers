"use client";
import AnarchyIsOrder from "@/components/brand/AnarchyIsOrder";
import { QuoteDisplay } from "@/components/quote/QuoteDisplay";

export default function LandingPage() {
  return (
    <div className="flex flex-col h-full items-center justify-center">
      <AnarchyIsOrder className="absolute fill-yellow-600 h-[50%] -right-22 -bottom-2 rotate-20 pointer-events-none motion-preset-fade" />

      <QuoteDisplay />

      <div className="fixed inset-0 bg-[url(/noise.png)] mix-blend-hard-light pointer-events-none" />
    </div>
  );
}
