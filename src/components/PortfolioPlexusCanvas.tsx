import { useEffect, useRef } from "react";

/**
 * Ambient background canvas for the Portfolio page.
 *
 * A lighter sibling of LandingPlexusCanvas: no intro phases, no 3D sheets —
 * just a mouse-reactive plexus field (drifting nodes + proximity links),
 * soft bokeh orbs with scroll parallax, and slow-breathing background glows.
 * Honors prefers-reduced-motion by rendering a single static frame.
 */

type PlexusNode = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  ph: number;
  hue: number;
};

type BokehOrb = {
  x: number;
  y: number;
  r: number;
  a: number;
  vx: number;
  vy: number;
  ph: number;
  hue: number;
  /** parallax depth: 0 = far (moves least on scroll), 1 = near */
  depth: number;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Mostly cherry with occasional cool accents — matches the landing idle palette. */
function pickHue(): number {
  return Math.random() < 0.82 ? 348 + Math.random() * 12 : 195 + Math.random() * 15;
}

function initNodes(count: number, W: number, H: number): PlexusNode[] {
  const nodes: PlexusNode[] = [];
  for (let i = 0; i < count; i++) {
    nodes.push({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: 1 + Math.random() * 1.6,
      ph: Math.random() * Math.PI * 2,
      hue: pickHue(),
    });
  }
  return nodes;
}

function initBokeh(count: number, W: number, H: number): BokehOrb[] {
  const orbs: BokehOrb[] = [];
  for (let i = 0; i < count; i++) {
    orbs.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 20 + Math.random() * 46,
      a: 0.05 + Math.random() * 0.09,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      ph: Math.random() * Math.PI * 2,
      hue: pickHue(),
      depth: Math.random(),
    });
  }
  return orbs;
}

export function PortfolioPlexusCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const smoothMouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const nodesRef = useRef<PlexusNode[]>([]);
  const bokehRef = useRef<BokehOrb[]>([]);
  const sizeRef = useRef({ w: 1, h: 1 });
  const frameRef = useRef(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.max(window.innerWidth, 1);
      const h = Math.max(window.innerHeight, 1);
      sizeRef.current = { w, h };
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const nodeCount = w < 768 ? 55 : 105;
      nodesRef.current = initNodes(nodeCount, w, h);
      bokehRef.current = initBokeh(w < 768 ? 9 : 16, w, h);
    };

    resize();
    window.addEventListener("resize", resize);

    const drawFrame = (animate: boolean) => {
      const { w: W, h: H } = sizeRef.current;
      const t = frameRef.current;
      const nodes = nodesRef.current;
      const orbs = bokehRef.current;
      const scroll = scrollRef.current;

      const sm = smoothMouseRef.current;
      sm.x += (mouseRef.current.x - sm.x) * 0.1;
      sm.y += (mouseRef.current.y - sm.y) * 0.1;

      // Deep cherry backdrop with slow-breathing corner glows
      ctx.fillStyle = "hsl(352 68% 5%)";
      ctx.fillRect(0, 0, W, H);

      const breathe = animate ? 0.5 + Math.sin(t * 0.006) * 0.5 : 0.5;
      const glowA = ctx.createRadialGradient(W * 0.12, H * 0.08, 0, W * 0.12, H * 0.08, W * 0.55);
      glowA.addColorStop(0, `hsla(355, 75%, 45%, ${0.06 + breathe * 0.05})`);
      glowA.addColorStop(1, "transparent");
      ctx.fillStyle = glowA;
      ctx.fillRect(0, 0, W, H);

      const glowB = ctx.createRadialGradient(W * 0.9, H * 0.85, 0, W * 0.9, H * 0.85, W * 0.5);
      glowB.addColorStop(0, `hsla(200, 70%, 50%, ${0.04 + (1 - breathe) * 0.04})`);
      glowB.addColorStop(1, "transparent");
      ctx.fillStyle = glowB;
      ctx.fillRect(0, 0, W, H);

      // Bokeh orbs — drift, pulse, and parallax against scroll
      for (const b of orbs) {
        if (animate) {
          b.x += b.vx;
          b.y += b.vy;
          b.ph += 0.008;
          if (b.x < -b.r) b.x = W + b.r;
          if (b.x > W + b.r) b.x = -b.r;
          if (b.y < -b.r) b.y = H + b.r;
          if (b.y > H + b.r) b.y = -b.r;
        }
        const parallaxY = -scroll * lerp(0.02, 0.09, b.depth);
        const py = ((b.y + parallaxY) % (H + b.r * 2) + H + b.r * 2) % (H + b.r * 2) - b.r;
        const pulse = 0.65 + Math.sin(b.ph) * 0.35;
        const rad = b.r * pulse;
        if (rad < 1) continue;
        const g = ctx.createRadialGradient(b.x, py, 0, b.x, py, rad);
        g.addColorStop(0, `hsla(${b.hue}, 75%, 68%, ${b.a * pulse * 0.6})`);
        g.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(b.x, py, rad, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }

      // Plexus field — gentle mouse attraction with a tangential swirl
      const CONNECT_DIST = Math.min(110, Math.min(W, H) * 0.13);
      if (animate) {
        for (const n of nodes) {
          const dx = sm.x - n.x;
          const dy = sm.y - n.y;
          const d = Math.hypot(dx, dy) + 0.001;
          const inf = Math.min(1, 420 / d);
          n.vx += (dx / d) * 0.03 * inf * inf;
          n.vy += (dy / d) * 0.03 * inf * inf;
          const swirl = 0.022 * inf * inf * (1 - Math.min(d / 480, 1));
          n.vx += (-dy / d) * swirl;
          n.vy += (dx / d) * swirl;
          n.vx *= 0.985;
          n.vy *= 0.985;
          n.x += n.vx;
          n.y += n.vy;
          n.ph += 0.02;
          if (n.x < 0 || n.x > W) n.vx *= -1;
          if (n.y < 0 || n.y > H) n.vy *= -1;
          n.x = Math.min(Math.max(n.x, 0), W);
          n.y = Math.min(Math.max(n.y, 0), H);
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          if (Math.abs(dx) > CONNECT_DIST || Math.abs(dy) > CONNECT_DIST) continue;
          const d = Math.hypot(dx, dy);
          if (d >= CONNECT_DIST || d < 2) continue;
          const alpha = (1 - d / CONNECT_DIST) * 0.32;
          const g = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          g.addColorStop(0, `hsla(${a.hue}, 78%, 58%, ${alpha})`);
          g.addColorStop(1, `hsla(${b.hue}, 78%, 58%, ${alpha})`);
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = g;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        const pulse = Math.sin(n.ph) * 0.3;
        const halo = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5);
        halo.addColorStop(0, `hsla(${n.hue}, 82%, 62%, 0.2)`);
        halo.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = halo;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + pulse * 0.3, 0, Math.PI * 2);
        const core = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r + 1);
        core.addColorStop(0, "hsla(0, 0%, 100%, 0.85)");
        core.addColorStop(1, `hsla(${n.hue}, 80%, 58%, 0.7)`);
        ctx.fillStyle = core;
        ctx.fill();
      }

      // Vignette keeps card content readable at the edges
      const vig = ctx.createRadialGradient(W * 0.5, H * 0.4, H * 0.15, W * 0.5, H * 0.4, H * 1.15);
      vig.addColorStop(0, "rgba(0,0,0,0)");
      vig.addColorStop(1, "rgba(0,0,0,0.6)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);
    };

    if (reducedMotion) {
      drawFrame(false);
    } else {
      const tick = () => {
        if (!running) return;
        frameRef.current++;
        drawFrame(true);
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 h-[100svh] w-full pointer-events-none"
      aria-hidden
    />
  );
}
