import type { MDXComponents } from 'mdx/types';
import { Highlight, Underline } from '@/components/brand/inline-marks';
import { GlossaryTerm } from './components/navigation/GlossaryTerm';
import Link from 'next/link';

const components: MDXComponents = {
  h1: ({ children }) => (
    <div className="h-[90vh] flex items-center">
      <h1
        style={{ filter: 'url(#stamp)' }}
        id="economic-calculation"
        className="font-semibold text-8xl tracking-tight"
      >
        {children}
      </h1>
    </div>
  ),
  hr: () => (
    <div className="w-full h-12 bg-[repeating-linear-gradient(to_right,currentColor_0px,currentColor_1px,transparent_1px,transparent_6px)] text-yellow-500" />
  ),
  strong: ({ children }) => (
    <Highlight as="strong" tagClassName="font-[450]">
      {children}
    </Highlight>
  ),
  em: ({ children }) => <Underline as="em">{children}</Underline>,
  a: ({ href, children }) => {
    // Intercept glossary links
    const glossaryMatch = href?.match(/^\/glossary\/(.+)$/);
    if (glossaryMatch) {
      return <GlossaryTerm slug={glossaryMatch[1]}>{children}</GlossaryTerm>;
    }
    // Everything else: standard Next.js link
    return <Link href={href ?? '#'}>{children}</Link>;
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}
