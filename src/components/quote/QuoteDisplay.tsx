"use client";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Censored } from "./Censored";
import { CensoredBrush } from "./CensoredBrush";
import { QUOTES } from "@/components/quote/quotes";
import { Underline } from "../annotations/inline-marks";
import { Button } from "@base-ui/react";
import { ArrowIcon } from "../brand/ArrowIcon";

const READ_DELAY = 6000;

export function QuoteDisplay() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentQuote = QUOTES[currentIndex];

  const goTo = (index: number) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCurrentIndex((index + QUOTES.length) % QUOTES.length);
    setIsRevealed(false);
  };

  const handleQuoteComplete = () => {
    setIsRevealed(true);
    timerRef.current = setTimeout(
      () => goTo(currentIndex + 1),
      READ_DELAY + 1000,
    );
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <motion.div layout className="flex flex-col items-center">
      <AnimatePresence mode="wait">
        <motion.span
          layout="position"
          key={currentIndex}
          initial={{ opacity: 0, x: "4rem", scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: "-4rem", scale: 0.9 }}
          transition={{ duration: 0.4, ease: [0.165, 0.84, 0.44, 1] }}
          className="text-yellow-800 relative text-2xl font-extralight uppercase mb-12 isolate inline-block"
        >
          <Underline delay={0.4} duration={2}>
            {currentQuote.author}
          </Underline>
          <span className="absolute top-0 -right-1 translate-x-full text-sm font-normal text-yellow-600">{`${currentIndex + 1}/${QUOTES.length}`}</span>
        </motion.span>
      </AnimatePresence>
      <CensoredBrush>
        <motion.p
          key={currentIndex}
          style={{ filter: "url(#stamp)" }}
          className="relative max-w-5xl text-2xl sm:text-4xl lg:text-6xl text-center font-semibold tracking-tighter text-balance text-stone-900 p-8 -my-8"
        >
          <Censored onComplete={handleQuoteComplete}>
            {currentQuote.text}
          </Censored>
        </motion.p>
      </CensoredBrush>
      <motion.div
        className="flex flex-col md:flex-row text-yellow-800 tracking-tight mt-24 gap-x-8 gap-y-4 motion-preset-slide-up motion-delay-500"
        layout="position"
      >
        <div className="md:contents order-last flex gap-8">
          <Button
            className="group flex gap-2 hover:text-stone-800 hover:cursor-pointer transition-all hover:gap-3"
            onClick={() => goTo(currentIndex - 1)}
          >
            <ArrowIcon direction="left" className="h-auto w-8 stroke-current" />
            Previous
          </Button>

          <Button
            className="group flex gap-2 hover:text-stone-800 hover:cursor-pointer transition-all hover:gap-3 order-last"
            onClick={() => goTo(currentIndex + 1)}
          >
            Next
            <ArrowIcon className="h-auto w-8 stroke-current" />
          </Button>
        </div>

        <div className="min-w-40 h-6 flex items-center justify-center bg-yellow-800">
          <AnimatePresence mode="wait">
            {isRevealed ? (
              <motion.div
                key="bar"
                className="w-full h-full bg-checker text-yellow-400 origin-right"
                initial={{ opacity: 0, clipPath: "inset(0 0 0 100%)" }}
                animate={{ opacity: 1, clipPath: "inset(0 0 0 0%)" }}
                exit={{ opacity: 0, clipPath: "inset(0 0 0 100%)" }}
                transition={{ duration: 1, ease: [0.165, 0.84, 0.44, 1] }}
              >
                <motion.div
                  className="h-full bg-yellow-800 origin-left"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: READ_DELAY / 1000,
                    ease: "linear",
                    delay: 1,
                  }}
                />
              </motion.div>
            ) : (
              <motion.p
                key="hint"
                className="text-yellow-400 px-1.5"
                initial={{ opacity: 0, y: "0.5rem" }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: "0.5rem" }}
              >
                Brush to reveal
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}
