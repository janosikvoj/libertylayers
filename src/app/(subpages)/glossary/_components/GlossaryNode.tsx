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

const CATEGORY_HANDLE: Record<GlossaryEntry['category'], string> = {
  economic: '!bg-yellow-600',
  ethical: '!bg-yellow-400',
  political: '!bg-stone-400',
  technical: '!bg-stone-400',
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
          'font-semibold tracking-tight text-sm whitespace-nowrap',
          CATEGORY_STYLES[entry.category],
          isSelected && 'ring-2 ring-offset-2 ring-yellow-500',
          dimmed && 'opacity-20',
        )}
      >
        ¤ {entry.term}
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="!w-0 !h-0 !border-none !bg-transparent !opacity-0"
        style={{ top: '50%', transform: 'translateY(-50%)' }}
      />
    </>
  );
}
