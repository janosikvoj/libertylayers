'use client';

import { useEffect, useMemo } from 'react';
import {
  ReactFlow,
  useNodesState,
  useEdgesState,
  type Edge,
  NodeTypes,
  ConnectionMode,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import * as d3 from 'd3-force';

import { GLOSSARY } from '../_content/glossary';
import { GlossaryNode, GlossaryNodeType } from './GlossaryNode';

const NODE_TYPES: NodeTypes = { glossaryNode: GlossaryNode };

// ── Build raw nodes + edges from glossary data ─────────────────────────────

function buildGraph() {
  const nodes: GlossaryNodeType[] = Object.values(GLOSSARY).map((entry) => ({
    id: entry.slug,
    type: 'glossaryNode',
    position: { x: 0, y: 0 }, // overridden by layout
    data: {
      entry,
      isSelected: false,
      isNeighbor: false,
      hasSelection: false,
    },
  }));

  const seen = new Set<string>();
  const edges: Edge[] = Object.values(GLOSSARY).flatMap((entry) =>
    (entry.related ?? []).flatMap((rel) => {
      const id = [entry.slug, rel].sort().join('--');
      if (seen.has(id) || !GLOSSARY[rel]) return [];
      seen.add(id);
      return [{ id, source: entry.slug, target: rel }];
    }),
  );

  return { nodes, edges };
}

// ── d3-force layout (one‑time) ─────────────────────────────────────────────

type SimNode = d3.SimulationNodeDatum & { id: string };
type SimEdge = d3.SimulationLinkDatum<SimNode>;

function applyForceLayout(
  nodes: GlossaryNodeType[],
  edges: Edge[],
): GlossaryNodeType[] {
  const simNodes: SimNode[] = nodes.map((n) => ({ id: n.id }));
  const simEdges: SimEdge[] = edges.map((e) => ({
    source: e.source,
    target: e.target,
  }));

  const simulation = d3
    .forceSimulation<SimNode>(simNodes)
    .force(
      'link',
      d3
        .forceLink<SimNode, SimEdge>(simEdges)
        .id((d) => d.id)
        .distance(160)
        .strength(0.8),
    )
    .force('charge', d3.forceManyBody<SimNode>().strength(-600))
    .force('center', d3.forceCenter(0, 0))
    .force('collision', d3.forceCollide<SimNode>(100))
    .stop();

  for (let i = 0; i < 300; i++) simulation.tick();

  const positions = new Map(
    simNodes.map((n) => [n.id, { x: n.x ?? 0, y: n.y ?? 0 }]),
  );

  return nodes.map((n) => ({
    ...n,
    position: positions.get(n.id) ?? { x: 0, y: 0 },
  }));
}

// ── GlossaryGraph ─────────────────────────

function GlossaryGraph({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (slug: string | null) => void;
}) {
  const { nodes: rawNodes, edges: rawEdges } = useMemo(() => buildGraph(), []);

  // One‑time layout: graph is stable from first render
  const initialNodes = useMemo(
    () => applyForceLayout(rawNodes, rawEdges),
    [rawNodes, rawEdges],
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(rawEdges);

  const neighbors = useMemo(() => {
    if (!selected) return new Set<string>();
    return new Set(
      rawEdges.flatMap((e) => {
        if (e.source === selected) return [e.target];
        if (e.target === selected) return [e.source];
        return [];
      }),
    );
  }, [selected, rawEdges]);

  // Selection styling
  useEffect(() => {
    setNodes((nds) =>
      nds.map((n) => ({
        ...n,
        data: {
          ...n.data,
          isSelected: n.id === selected,
          isNeighbor: neighbors.has(n.id),
          hasSelection: selected !== null,
        },
      })),
    );
  }, [selected, neighbors, setNodes]);

  useEffect(() => {
    const styledEdges = rawEdges.map((e) => {
      const active = e.source === selected || e.target === selected;
      const dimmed = selected !== null && !active;
      return {
        ...e,
        style: {
          stroke: active
            ? 'var(--color-yellow-600)'
            : dimmed
              ? 'var(--color-stone-200)'
              : 'var(--color-stone-300)',
        },
        type: 'simplebezier',
      };
    });
    setEdges(styledEdges);
  }, [selected, rawEdges, setEdges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={NODE_TYPES}
      connectionMode={ConnectionMode.Loose}
      onNodeClick={(_, node) => onSelect(node.id === selected ? null : node.id)}
      onPaneClick={() => onSelect(null)}
      fitView
      fitViewOptions={{ padding: 0.2 }}
      minZoom={0.5}
      maxZoom={2}
      proOptions={{ hideAttribution: true }}
    />
  );
}

export default GlossaryGraph;
