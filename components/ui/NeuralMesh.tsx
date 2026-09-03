/**
 * Very low-opacity synapse/node mesh — a literal (but restrained) echo of
 * "neurociência" behind the Hero text. Static, no animation: the site's
 * own design philosophy elsewhere is "luxury reads as restraint, not
 * spectacle", so this stays a faint texture, never a focal illustration.
 * Pure SVG, no deps, safe to render behind text (aria-hidden, no pointer
 * events).
 */
const NODES = [
  { x: 60, y: 60 }, { x: 180, y: 40 }, { x: 300, y: 90 }, { x: 420, y: 50 },
  { x: 120, y: 160 }, { x: 260, y: 190 }, { x: 380, y: 150 }, { x: 40, y: 260 },
  { x: 200, y: 280 }, { x: 340, y: 260 }, { x: 460, y: 220 }, { x: 100, y: 360 },
  { x: 280, y: 380 }, { x: 420, y: 350 },
];

const EDGES: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [0, 4], [1, 4], [1, 5], [2, 5], [2, 6], [3, 6],
  [4, 5], [5, 6], [4, 7], [4, 8], [5, 8], [5, 9], [6, 9], [6, 10],
  [7, 8], [8, 9], [9, 10], [7, 11], [8, 11], [8, 12], [9, 12], [9, 13], [10, 13],
  [11, 12], [12, 13],
];

export const NeuralMesh = ({ className = '' }: { className?: string }) => (
  <svg
    aria-hidden="true"
    className={className}
    viewBox="0 0 500 420"
    preserveAspectRatio="xMidYMid slice"
    fill="none"
  >
    {EDGES.map(([a, b], i) => (
      <line
        key={i}
        x1={NODES[a].x}
        y1={NODES[a].y}
        x2={NODES[b].x}
        y2={NODES[b].y}
        stroke="#D8C2B8"
        strokeWidth="1"
        strokeOpacity="0.35"
      />
    ))}
    {NODES.map((n, i) => (
      <circle key={i} cx={n.x} cy={n.y} r="2.5" fill="#EFE8DE" fillOpacity="0.6" />
    ))}
  </svg>
);
