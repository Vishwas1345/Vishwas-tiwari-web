/** Shared 400×400 viewBox graph — matches hero “neural canvas” reference (8 nodes, hub, partial mesh + dangling edge). */

export const NEURAL_VIEW = 400;

export type NeuralNode = { id: number; x: number; y: number; r: number };

/** Order: outer ring first, index 3 is the central hub (larger). */
export const NEURAL_NODES: NeuralNode[] = [
  { id: 0, x: 200, y: 100, r: 6 },
  { id: 1, x: 320, y: 140, r: 6 },
  { id: 2, x: 80, y: 120, r: 6 },
  { id: 3, x: 200, y: 200, r: 11 },
  { id: 4, x: 300, y: 260, r: 6 },
  { id: 5, x: 120, y: 240, r: 6 },
  { id: 6, x: 220, y: 240, r: 6 },
  { id: 7, x: 280, y: 280, r: 6 },
];

/** Line segments [x1,y1,x2,y2] in viewBox coords. Last segment is a dangling ray (lower-left energy). */
export const NEURAL_LINES: [number, number, number, number][] = [
  [80, 120, 200, 100],
  [200, 100, 320, 140],
  [120, 240, 200, 200],
  [200, 200, 300, 260],
  [100, 300, 220, 240],
  [320, 140, 280, 280],
  [100, 300, 48, 368],
];

function hashSeed(id: number): number {
  return ((id * 7919) ^ 104729) % 100000 / 100000;
}

/** Stable pseudo-random scatter per node id (for reproducible intro). */
export function scatterPositionForNode(nodeId: number): { x: number; y: number } {
  const a = hashSeed(nodeId);
  const b = hashSeed(nodeId + 17);
  const angle = a * Math.PI * 2;
  const radius = 80 + b * 220;
  return {
    x: 200 + Math.cos(angle) * radius + (b - 0.5) * 120,
    y: 200 + Math.sin(angle) * radius + (a - 0.5) * 120,
  };
}

export function scatterForExtraParticle(i: number): { x: number; y: number } {
  const a = hashSeed(i + 100);
  const b = hashSeed(i + 233);
  return {
    x: a * NEURAL_VIEW,
    y: b * NEURAL_VIEW,
  };
}
