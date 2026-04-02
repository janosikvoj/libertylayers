import { cn } from '@/lib/utils';
import React from 'react';

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  heading: string;
}

const Section: React.FC<SectionProps> = ({ children, className, ...props }) => {
  return (
    <section id="" className={cn('', className)} {...props}>
      {children}
    </section>
  );
};

export default Section;
