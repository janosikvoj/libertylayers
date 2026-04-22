'use client';

import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { GlossaryEntry } from '../_content/glossary';
import { cn } from '@/lib/utils';

const CATEGORY_STYLES: Record<GlossaryEntry['category'], string> = {
  economic: 'bg-yellow-400 text-stone-900',
  ethical: 'bg-stone-900 text-yellow-400',
  political: 'bg-stone-600 text-stone-100',
  technical: 'bg-yellow-200 text-stone-800',
};

export type GlossaryNodeData = {
  entry: GlossaryEntry;
  isSelected: boolean;
  isNeighbor: boolean;
  hasSelection: boolean;
};

export type GlossaryNodeType = Node<GlossaryNodeData, 'glossaryNode'>;

export function GlossaryNode({ data }: NodeProps<GlossaryNodeType>) {
  const { entry, isSelected, isNeighbor, hasSelection } = data;

  const dimmed = hasSelection && !isSelected && !isNeighbor;

  return (
    <>
      <div
        className={cn(
          'px-3 py-2 transition-all duration-300 cursor-pointer select-none',
          'font-semibold tracking-tight whitespace-nowrap',
          CATEGORY_STYLES[entry.category],
          isSelected && 'ring-1 ring-offset-2 ring-yellow-600',
          dimmed && 'bg-yellow-50 ring-1 ring-stone-200 text-stone-400',
        )}
      >
        ¤ {entry.term}
      </div>
      <Handle type="source" position={Position.Left} className="opacity-0" />
    </>
  );
}
