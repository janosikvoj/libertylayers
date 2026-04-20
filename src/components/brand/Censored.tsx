'use client';

import React from 'react';
import { motion } from 'motion/react';

interface CensoredProps {
  children: string;
}

const splitText = (text: string) => {
  return text.split(/(\s+)/);
};

const getDelay = (index: number) => ((index * 7) % 13) / 20;
const getMargin = (index: number) => ((index * 11) % 120) + 40;

const CensoredSegment: React.FC<{ segment: string; index: number }> = ({
  segment,
  index,
}) => {
  return (
    <span className="relative">
      <motion.span
        className="absolute inset-0 bg-stone-900 origin-left"
        initial={{ scaleX: 1 }}
        whileInView={{ scaleX: 0 }}
        viewport={{
          margin: `100px 0px -${getMargin(index)}px 0px`,
          once: true,
        }}
        transition={{
          duration: 1 / segment.length,
          type: 'tween',
          ease: [0.42, 0, 0.58, 1],
          delay: getDelay(index),
        }}
      />
      {segment}
    </span>
  );
};

const Censored: React.FC<CensoredProps> = ({ children }) => {
  const segments = splitText(children);

  return segments.map((segment, i) => {
    if (segment.trim() === '') {
      return <span key={i}>{segment}</span>;
    }
    return <CensoredSegment index={i} key={i} segment={segment} />;
  });
};

export default Censored;
