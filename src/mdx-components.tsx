import type { MDXComponents } from 'mdx/types';
import { Highlight, Underline } from '@/components/brand/inline-marks';

const components: MDXComponents = {
  h1: ({ children }) => (
    <div className="h-[90vh] flex items-center">
      <h1
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
};

export function useMDXComponents(): MDXComponents {
  return components;
}
