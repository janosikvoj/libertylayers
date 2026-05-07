"use client";
import AnarchyIsOrder from "@/components/brand/AnarchyIsOrder";
import LayersOfLiberty from "@/components/brand/LayersOfLiberty";
import { AnimatePresence, motion } from "motion/react";

const QUOTES = [
  {
    text: "Socialism is an alternative to capitalism as potassium cyanide is an alternative to water.",
    author: "Ludwig von Mises",
  },
  {
    text: "The state is that great fiction by which everyone tries to live at the expense of everyone else.",
    author: "Frederic Bastiat",
  },
  {
    text: "Human beings are born with different capacities. If they are free, they are not equal. And if they are equal, they are not free.",
    author: "Aleksandr Solzhenitsyn",
  },
  {
    text: "When plunder becomes a way of life for a group of men in a society, over the course of time they create for themselves a legal system that authorizes it and a moral code that glorifies it.",
    author: "Frédéric Bastiat",
  },
  {
    text: "As long as people believe in government, wars will never end.",
    author: "Larken Rose",
  },
  {
    text: 'I have never understood why it is "greed" to want to keep the money you have earned but not greed to want to take somebody elses money.',
    author: "Thomas Sowell",
  },
  {
    text: 'It is easy to be conspicuously "compassionate" if others are being forced to pay the cost.',
    author: "Murray N. Rothbard",
  },
  {
    text: "War is Mass Murder, Conscription is Slavery, Taxation is Robbery.",
    author: "Murray N. Rothbard",
  },
  {
    text: "Every step which leads from capitalism toward planning is necessarily a step nearer to absolutism and dictatorship.",
    author: "Ludwig von Mises",
  },
  {
    text: "As government expands, liberty contracts.",
    author: "Ronald Reagan",
  },
];

export default function LandingPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleQuoteComplete = () => {
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % QUOTES.length);
    }, 1500);
  };

  const currentQuote = QUOTES[currentIndex];

  return (
    <div className="flex flex-col h-full">
      <div className="absolute left-12 top-0 w-px h-full bg-yellow-500" />
      <div className="absolute right-12 top-0 w-px h-full bg-yellow-500" />
      <div className="absolute left-1/2 top-0 w-px h-full bg-yellow-500" />
      <div className="absolute left-0 top-1/2 w-full h-px bg-yellow-500" />
      <div className="absolute left-0 top-12 w-full h-px bg-yellow-500" />
      <div className="absolute left-0 bottom-12 w-full h-px bg-yellow-500" />

      {isReady && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <LayersOfLiberty
              className="absolute top-0 w-full max-h-full h-auto"
              fill="url(#stripes-horizontal)"
              preserveAspectRatio="xMinYMid meet"
            />
          </motion.div>

          <AnarchyIsOrder className="absolute fill-yellow-600 h-[50%] -right-22 -bottom-2 rotate-20 pointer-events-none" />

          <div className="pt-24 px-12 flex-3 flex flex-col items-center justify-center gap-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6 }}
                style={{ filter: "url(#stamp)" }}
                className="relative max-w-5xl text-6xl text-center font-semibold tracking-tighter text-balance text-stone-900"
              >
                <span
                  style={{ filter: "url(#stamp)" }}
                  className="absolute bottom-0 left-0 translate-y-full px-[0.1em] leading-none w-fit font-mono font-bold outline-6 uppercase text-6xl tracking-tighter -rotate-6 rounded-sm text-yellow-600 pointer-events-none"
                >
                  {`¤ ${currentIndex + 1}`}
                </span>

                <Censored onComplete={handleQuoteComplete}>
                  {currentQuote.text}
                </Censored>
              </motion.p>
            </AnimatePresence>
          </div>
          <div className="z-10 p-12 w-full flex-1 flex items-end">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="text-2xl text-stone-900 uppercase leading-none -mb-[0.1em]"
              >
                {currentQuote.author}
              </motion.p>
            </AnimatePresence>
          </div>
        </>
      )}
      <div className="fixed inset-0 bg-[url(/noise.png)] mix-blend-hard-light pointer-events-none" />
    </div>
  );
}

import React, { useState, useEffect } from "react";

interface CensoredProps {
  children: string;
  onComplete?: () => void;
}

const splitText = (text: string) => {
  return text.split(/(\s+)/);
};

const CensoredSegment: React.FC<{ segment: string; onReveal: () => void }> = ({
  segment,
  onReveal,
}) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handleHover = () => {
    if (!isRevealed) {
      setIsRevealed(true);
      onReveal();
    }
  };

  return (
    <span
      className="relative inline-block cursor-crosshair"
      onPointerEnter={handleHover}
    >
      <motion.span
        className="absolute inset-0 bg-stone-900 origin-left"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: isRevealed ? 0 : 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      {segment}
    </span>
  );
};

const Censored: React.FC<CensoredProps> = ({ children, onComplete }) => {
  const segments = splitText(children);
  const wordCount = segments.filter((s) => s.trim() !== "").length;

  const [revealedCount, setRevealedCount] = useState(0);

  // When the number of revealed words matches the total words, trigger completion
  useEffect(() => {
    if (wordCount > 0 && revealedCount === wordCount) {
      onComplete?.();
    }
  }, [revealedCount, wordCount, onComplete]);

  return (
    <>
      {segments.map((segment, i) => {
        if (segment.trim() === "") {
          return <span key={i}>{segment}</span>;
        }
        return (
          <CensoredSegment
            key={i}
            segment={segment}
            onReveal={() => setRevealedCount((prev) => prev + 1)}
          />
        );
      })}
    </>
  );
};
