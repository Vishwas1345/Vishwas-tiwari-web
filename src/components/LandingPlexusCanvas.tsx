import { useContext, useEffect, useRef, useState } from "react";
import { IntroContext } from "@/contexts/IntroContext";
import {
  NEURAL_LINES,
  NEURAL_NODES,
  NEURAL_VIEW,
  scatterForExtraParticle,
  scatterPositionForNode,
} from "@/lib/neuralCanvasLayout";

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

const TSTART = 320;
const TDUR = 220;

const COLS = 18;
const ROWS = 9;
const COLS2 = 16;
const ROWS2 = 8;

const CAM = { x: -120, y: 180, z: -600 };
const FOV = 520;

const PARTICLE_COUNT = 76;

const SCATTER_MS = 900;
const CONVERGE_MS = 3600;

/** Only scatter → converge → idle canvas; hero name + copy animate in together on top (see Hero.tsx). */
type IntroPhase = "scatter" | "converge" | "idle";

type IntroParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  nSx: number;
  nSy: number;
  nTx: number;
  nTy: number;
  r: number;
  ph: number;
};

type SheetPt = {
  bx: number;
  by: number;
  bz: number;
  wave: number;
  waveAmp: number;
  waveFreq: number;
  waveSpeed: number;
  colorFn: (u: number, v: number, tp: number) => number;
  u: number;
  v: number;
};

type Bokeh3 = {
  wx: number;
  wy: number;
  wz: number;
  r: number;
  a: number;
  ph: number;
  vph: number;
  hueBase: number;
};

type Node2 = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  ph: number;
  born: number;
};

type Bokeh2 = {
  x: number;
  y: number;
  r: number;
  a: number;
  vx: number;
  vy: number;
  ph: number;
};

function makeSheet(
  colCount: number,
  rowCount: number,
  baseY: number,
  spread: number,
  offsetX: number,
  offsetZ: number,
  waveAmp: number,
  waveFreq: number,
  waveSpeed: number,
  colorFn: (u: number, v: number, tp: number) => number
): SheetPt[][] {
  const pts: SheetPt[][] = [];
  for (let r = 0; r < rowCount; r++) {
    const row: SheetPt[] = [];
    for (let c = 0; c < colCount; c++) {
      const u = c / (colCount - 1);
      const v = r / (rowCount - 1);
      row.push({
        bx: offsetX + (u - 0.5) * spread * 1.4 + v * spread * 0.5,
        by: baseY + v * 90,
        bz: offsetZ + v * 480 + u * 60,
        wave: Math.random() * Math.PI * 2,
        waveAmp,
        waveFreq,
        waveSpeed,
        colorFn,
        u,
        v,
      });
    }
    pts.push(row);
  }
  return pts;
}

function project(wx: number, wy: number, wz: number, W: number, H: number) {
  const rx = wx - CAM.x;
  const ry = wy - CAM.y;
  const rz = wz - CAM.z;
  const cosY = Math.cos(0.38);
  const sinY = Math.sin(0.38);
  const rx2 = rx * cosY - rz * sinY;
  const rz2 = rx * sinY + rz * cosY;
  const cosX = Math.cos(-0.22);
  const sinX = Math.sin(-0.22);
  const ry2 = ry * cosX - rz2 * sinX;
  const rz3 = ry * sinX + rz2 * cosX;
  if (rz3 <= 0) return null;
  const scale = FOV / rz3;
  return {
    sx: rx2 * scale + W * 0.28,
    sy: ry2 * scale + H * 0.52,
    scale,
    depth: rz3,
  };
}

function dofAlpha(depth: number, baseAlpha: number): number {
  const blur = Math.max(0, (depth - 550) / 500);
  return baseAlpha * (1 - Math.min(blur, 0.85));
}

function dofRadius(depth: number, baseR: number): number {
  const blur = Math.max(0, (depth - 500) / 600);
  return baseR + blur * 4;
}

function bandHue(x: number, y: number, progress: number, W: number, H: number): number {
  const band = (x + y * 0.6) / (W + H * 0.6);
  const hues = [185, 210, 140, 30, 5];
  const idx = Math.floor(band * hues.length) % hues.length;
  const h = hues[idx];
  const cherryH = 355;
  return h + (cherryH - h) * progress;
}

function bandSat(progress: number): number {
  return 70 + progress * 25;
}

function bandLight(progress: number): number {
  return 55 + progress * 10;
}

function buildSheetA() {
  return makeSheet(COLS, ROWS, -160, 560, -80, 50, 22, 1.2, 0.018, (u, v, tpp) => {
    const hBase = 120 - u * 110;
    return lerp(hBase, 355, tpp);
  });
}

function buildSheetB() {
  return makeSheet(COLS2, ROWS2, -40, 500, -120, 80, 28, 0.9, 0.014, (u, v, tpp) => {
    const hBase = 190 - u * 40;
    return lerp(hBase, 355, tpp);
  });
}

function buildBokeh3(): Bokeh3[] {
  const BOKEH: Bokeh3[] = [];
  for (let i = 0; i < 22; i++) {
    BOKEH.push({
      wx: (Math.random() - 0.3) * 700 - 100,
      wy: -80 + Math.random() * 300,
      wz: 400 + Math.random() * 600,
      r: 14 + Math.random() * 32,
      a: 0.12 + Math.random() * 0.15,
      ph: Math.random() * Math.PI * 2,
      vph: 0.005 + Math.random() * 0.008,
      hueBase: Math.random() > 0.5 ? 195 : 350,
    });
  }
  return BOKEH;
}

function initNodes2(N: number, W: number, H: number): Node2[] {
  const nodes: Node2[] = [];
  for (let i = 0; i < N; i++) {
    const band = Math.floor(Math.random() * 3);
    let bx: number;
    let by: number;
    if (band === 0) {
      bx = Math.random() * W * 0.7;
      by = Math.random() * H * 0.5;
    } else if (band === 1) {
      bx = Math.random() * W * 0.85;
      by = H * 0.25 + Math.random() * H * 0.5;
    } else {
      bx = Math.random() * W * 0.6;
      by = H * 0.4 + Math.random() * H * 0.6;
    }
    nodes.push({
      x: bx,
      y: by,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 2 + 1,
      ph: Math.random() * Math.PI * 2,
      born: Math.random() * 30,
    });
  }
  return nodes;
}

function initBokeh2(W: number, H: number): Bokeh2[] {
  const BOKEH: Bokeh2[] = [];
  for (let i = 0; i < 18; i++) {
    BOKEH.push({
      x: Math.random() * W,
      y: Math.random() * H,
      r: 18 + Math.random() * 40,
      a: 0.04 + Math.random() * 0.08,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      ph: Math.random() * Math.PI * 2,
    });
  }
  return BOKEH;
}

function buildIntroParticles(W: number, H: number): IntroParticle[] {
  const margin = 0.06;
  const region = 1 - 2 * margin;

  const mapNorm = (nx: number, ny: number) => ({
    nTx: margin + (nx / NEURAL_VIEW) * region,
    nTy: margin + (ny / NEURAL_VIEW) * region,
  });

  const list: IntroParticle[] = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    let nTx: number;
    let nTy: number;
    if (i < NEURAL_NODES.length) {
      const node = NEURAL_NODES[i];
      const m = mapNorm(node.x, node.y);
      nTx = m.nTx;
      nTy = m.nTy;
    } else {
      const edge = NEURAL_LINES[i % NEURAL_LINES.length];
      const s = ((i * 0.271) % 1000) / 1000;
      const x = edge[0] + (edge[2] - edge[0]) * s;
      const y = edge[1] + (edge[3] - edge[1]) * s;
      const m = mapNorm(x, y);
      nTx = m.nTx;
      nTy = m.nTy;
    }

    const sc = i < NEURAL_NODES.length ? scatterPositionForNode(i) : scatterForExtraParticle(i);
    const nSx = sc.x / NEURAL_VIEW;
    const nSy = sc.y / NEURAL_VIEW;

    list.push({
      x: nSx * W,
      y: nSy * H,
      vx: (Math.random() - 0.5) * 1.2,
      vy: (Math.random() - 0.5) * 1.2,
      nSx,
      nSy,
      nTx,
      nTy,
      r: i === 3 ? 2.4 : 1.1 + Math.random() * 0.75,
      ph: Math.random() * Math.PI * 2,
    });
  }
  return list;
}

export function LandingPlexusCanvas() {
  const { setIntroComplete } = useContext(IntroContext);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const frameRef = useRef(0);
  const timeRef = useRef(TSTART + TDUR + 1);
  const sheetARef = useRef<SheetPt[][]>(buildSheetA());
  const sheetBRef = useRef<SheetPt[][]>(buildSheetB());
  const bokeh3Ref = useRef<Bokeh3[]>(buildBokeh3());
  const nodesRef = useRef<Node2[]>([]);
  const bokeh2Ref = useRef<Bokeh2[]>([]);
  const frameHRef = useRef(0);
  const sizeRef = useRef({ w: 1, h: 1 });

  const introParticlesRef = useRef<IntroParticle[]>([]);
  const phaseRef = useRef<IntroPhase>("scatter");
  const introStartedRef = useRef(0);
  const skipIntroRef = useRef(false);

  const [uiPhase, setUiPhase] = useState<IntroPhase>("scatter");
  const uiSyncRef = useRef<IntroPhase>("scatter");

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    skipIntroRef.current = rm;
  }, []);

  useEffect(() => {
    const active = uiPhase !== "idle";
    document.body.style.overflow = active ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [uiPhase]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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

      introParticlesRef.current = buildIntroParticles(w, h);
      const N = w < 768 ? 96 : 140;
      nodesRef.current = initNodes2(N, w, h);
      bokeh2Ref.current = initBokeh2(w, h);
    };

    resize();
    window.addEventListener("resize", resize);

    introStartedRef.current = performance.now();
    uiSyncRef.current = "scatter";
    if (skipIntroRef.current) {
      phaseRef.current = "idle";
      uiSyncRef.current = "idle";
      setUiPhase("idle");
      setIntroComplete(true);
    }

    const seedCherryNodesFromIntro = () => {
      const intro = introParticlesRef.current;
      const nodes = nodesRef.current;
      if (!intro.length || !nodes.length) return;
      for (let i = 0; i < nodes.length; i++) {
        const src = intro[i % intro.length];
        nodes[i].x = src.x;
        nodes[i].y = src.y;
        nodes[i].vx = src.vx * 0.35;
        nodes[i].vy = src.vy * 0.35;
        nodes[i].ph = src.ph;
        nodes[i].born = 0;
        nodes[i].r = Math.min(2.4, Math.max(1, src.r * 0.5));
      }
    };

    const goIdle = () => {
      if (phaseRef.current === "idle") return;
      seedCherryNodesFromIntro();
      phaseRef.current = "idle";
      uiSyncRef.current = "idle";
      setUiPhase("idle");
      setIntroComplete(true);
    };

    const skipToIdle = () => {
      if (phaseRef.current === "idle") return;
      skipIntroRef.current = true;
      goIdle();
    };

    const getIntroTimings = () => {
      const rm = skipIntroRef.current;
      return {
        scatter: rm ? 0 : SCATTER_MS,
        converge: rm ? 400 : CONVERGE_MS,
      };
    };

    const getPos = (pt: SheetPt, frameH: number) => {
      const wx = pt.bx;
      const wy =
        pt.by +
        Math.sin(pt.wave + frameH * pt.waveSpeed + pt.bx * pt.waveFreq * 0.012) * pt.waveAmp +
        Math.sin(pt.wave * 1.3 + frameH * pt.waveSpeed * 0.7 + pt.bz * 0.008) * pt.waveAmp * 0.5;
      const wz = pt.bz;
      return { wx, wy, wz };
    };

    const drawSheet = (
      sheet: SheetPt[][],
      colCount: number,
      rowCount: number,
      W: number,
      H: number,
      tp: number,
      frameH: number
    ) => {
      const proj: ({ sx: number; sy: number; scale: number; depth: number } | null)[][] = [];
      for (let r = 0; r < rowCount; r++) {
        proj.push([]);
        for (let c = 0; c < colCount; c++) {
          const pt = sheet[r][c];
          const { wx, wy, wz } = getPos(pt, frameH);
          proj[r].push(project(wx, wy, wz, W, H));
        }
      }

      for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < colCount; c++) {
          const A = proj[r][c];
          if (!A) continue;
          const pt = sheet[r][c];
          const h = pt.colorFn(pt.u, pt.v, tp);
          const sat = lerp(75, 80, tp);
          const lit = lerp(58, 55, tp);
          const neighbors: NonNullable<(typeof proj)[0][0]>[] = [];
          if (c + 1 < colCount && proj[r][c + 1]) neighbors.push(proj[r][c + 1]!);
          if (r + 1 < rowCount && proj[r + 1][c]) neighbors.push(proj[r + 1][c]!);
          if (r + 1 < rowCount && c + 1 < colCount && proj[r + 1][c + 1]) neighbors.push(proj[r + 1][c + 1]!);
          if (r + 1 < rowCount && c > 0 && proj[r + 1][c - 1]) neighbors.push(proj[r + 1][c - 1]!);

          for (const B of neighbors) {
            const aA = dofAlpha(A.depth, 0.65);
            const aB = dofAlpha(B.depth, 0.65);
            const alpha = (aA + aB) / 2;
            if (alpha < 0.02) continue;
            const g = ctx.createLinearGradient(A.sx, A.sy, B.sx, B.sy);
            g.addColorStop(0, `hsla(${h},${sat}%,${lit}%,${aA})`);
            g.addColorStop(1, `hsla(${h},${sat}%,${lit}%,${aB})`);
            ctx.beginPath();
            ctx.moveTo(A.sx, A.sy);
            ctx.lineTo(B.sx, B.sy);
            ctx.strokeStyle = g;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      for (let r = 0; r < rowCount; r++) {
        for (let c = 0; c < colCount; c++) {
          const p = proj[r][c];
          if (!p) continue;
          const pt = sheet[r][c];
          const h = pt.colorFn(pt.u, pt.v, tp);
          const sat = lerp(80, 90, tp);
          const lit = lerp(60, 58, tp);
          const alpha = dofAlpha(p.depth, 0.9);
          if (alpha < 0.05) continue;
          const r2 = dofRadius(p.depth, (1.2 + Math.sin(pt.wave + frameH * 0.04) * 0.3) * p.scale * 2.8);
          if (r2 < 0.2) continue;

          const gRad = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, r2 * 4);
          gRad.addColorStop(0, `hsla(${h},${sat}%,${lit + 15}%,${alpha * 0.4})`);
          gRad.addColorStop(1, `hsla(${h},${sat}%,${lit}%,0)`);
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, r2 * 4, 0, Math.PI * 2);
          ctx.fillStyle = gRad;
          ctx.fill();

          const gc = ctx.createRadialGradient(p.sx, p.sy, 0, p.sx, p.sy, r2);
          gc.addColorStop(0, `rgba(255,255,255,${alpha * 0.95})`);
          gc.addColorStop(0.5, `hsla(${h},${sat}%,${lit + 10}%,${alpha * 0.7})`);
          gc.addColorStop(1, `hsla(${h},${sat}%,${lit}%,0)`);
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, r2, 0, Math.PI * 2);
          ctx.fillStyle = gc;
          ctx.fill();
        }
      }
    };

    const drawCherryOverlay = (W: number, H: number, tp: number, t: number, mx: number, my: number) => {
      const nodes = nodesRef.current;
      const BOKEH = bokeh2Ref.current;
      const CONNECT_DIST = Math.min(90, Math.min(W, H) * 0.11);

      ctx.save();
      ctx.globalAlpha = 0.92;

      for (const b of BOKEH) {
        b.x += b.vx;
        b.y += b.vy;
        b.ph += 0.01;
        if (b.x < -b.r) b.x = W + b.r;
        if (b.x > W + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = H + b.r;
        if (b.y > H + b.r) b.y = -b.r;
        const pulse = 0.6 + Math.sin(b.ph) * 0.4;
        const bh = lerp(200, 355, tp);
        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r * pulse);
        grad.addColorStop(0, `hsla(${bh},80%,70%,${b.a * pulse * 0.55})`);
        grad.addColorStop(1, `hsla(${bh},80%,70%,0)`);
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r * pulse, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      for (const n of nodes) {
        const dxm = mx - n.x;
        const dym = my - n.y;
        const dm = Math.sqrt(dxm * dxm + dym * dym);
        if (dm < 240 && dm > 0.001) {
          n.vx += (dxm / dm) * 0.012;
          n.vy += (dym / dm) * 0.012;
        }
        n.vx *= 0.98;
        n.vy *= 0.98;
        n.x += n.vx;
        n.y += n.vy;
        n.ph += 0.018;
        if (n.x < 0) {
          n.x = 0;
          n.vx *= -1;
        }
        if (n.x > W) {
          n.x = W;
          n.vx *= -1;
        }
        if (n.y < 0) {
          n.y = 0;
          n.vy *= -1;
        }
        if (n.y > H) {
          n.y = H;
          n.vy *= -1;
        }
      }

      for (let i = 0; i < nodes.length; i++) {
        if (t < nodes[i].born) continue;
        const na = nodes[i];
        const neighbors: { j: number; d: number }[] = [];
        for (let j = 0; j < nodes.length; j++) {
          if (i === j || t < nodes[j].born) continue;
          const dx = na.x - nodes[j].x;
          const dy = na.y - nodes[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) neighbors.push({ j, d });
        }
        neighbors.sort((a, b) => a.d - b.d);
        const limit = Math.min(neighbors.length, 5);
        for (let k = 0; k < limit; k++) {
          const nb = nodes[neighbors[k].j];
          const d = neighbors[k].d;
          const alpha = (1 - d / CONNECT_DIST) * 0.42;
          const hA = bandHue(na.x, na.y, tp, W, H);
          const hB = bandHue(nb.x, nb.y, tp, W, H);
          const s = bandSat(tp);
          const l = bandLight(tp);
          const grad = ctx.createLinearGradient(na.x, na.y, nb.x, nb.y);
          grad.addColorStop(0, `hsla(${hA},${s}%,${l}%,${alpha})`);
          grad.addColorStop(1, `hsla(${hB},${s}%,${l}%,${alpha})`);
          ctx.beginPath();
          ctx.moveTo(na.x, na.y);
          ctx.lineTo(nb.x, nb.y);
          ctx.strokeStyle = grad;
          ctx.lineWidth = 0.65;
          ctx.stroke();
        }
      }

      for (const n of nodes) {
        if (t < n.born) continue;
        const h = bandHue(n.x, n.y, tp, W, H);
        const s = bandSat(tp);
        const l = bandLight(tp);
        const pulse = Math.sin(n.ph) * 0.35;
        const gRad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 5 + pulse);
        gRad.addColorStop(0, `hsla(${h},${s}%,${l + 18}%,0.22)`);
        gRad.addColorStop(1, `hsla(${h},${s}%,${l}%,0)`);
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r * 5, 0, Math.PI * 2);
        ctx.fillStyle = gRad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + pulse * 0.25, 0, Math.PI * 2);
        const coreGrad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r + 1);
        coreGrad.addColorStop(0, "hsla(0,0%,100%,0.88)");
        coreGrad.addColorStop(1, `hsla(${h},${s}%,${l}%,0.75)`);
        ctx.fillStyle = coreGrad;
        ctx.fill();
      }

      ctx.restore();
    };

    const updateIntroParticles = (
      W: number,
      H: number,
      mx: number,
      my: number,
      convergeProg: number,
      scatterPhase: boolean
    ) => {
      const parts = introParticlesRef.current;
      const mouseStrength = 0.038;
      const spring = scatterPhase ? 0.085 : 0.055 + convergeProg * 0.06;

      for (const p of parts) {
        const tx = p.nTx * W;
        const ty = p.nTy * H;
        const sx = p.nSx * W;
        const sy = p.nSy * H;
        const desiredX = lerp(sx, tx, convergeProg);
        const desiredY = lerp(sy, ty, convergeProg);

        let fx = (desiredX - p.x) * spring;
        let fy = (desiredY - p.y) * spring;

        const dx = mx - p.x;
        const dy = my - p.y;
        const d = Math.sqrt(dx * dx + dy * dy) + 0.001;
        const falloff = Math.min(200 / d, 2.8);
        fx += (dx / d) * mouseStrength * falloff;
        fy += (dy / d) * mouseStrength * falloff;

        if (scatterPhase) {
          fx += (Math.random() - 0.5) * 0.45;
          fy += (Math.random() - 0.5) * 0.45;
        }

        p.vx = (p.vx + fx) * 0.86;
        p.vy = (p.vy + fy) * 0.86;
        p.x += p.vx;
        p.y += p.vy;
        p.ph += 0.03;
      }
    };

    const drawIntroParticles = (W: number, H: number, convergeProg: number) => {
      const parts = introParticlesRef.current;
      const connectBase = Math.min(W, H) * 0.14;
      const connectDist = connectBase * (1 - convergeProg * 0.42);

      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const a = parts[i];
          const b = parts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < connectDist && d > 2) {
            const alpha = (1 - d / connectDist) * (0.18 + convergeProg * 0.28);
            const h = 355;
            ctx.strokeStyle = `hsla(${h},82%,58%,${alpha})`;
            ctx.lineWidth = 0.65;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const p of parts) {
        const pulse = Math.sin(p.ph) * 0.25;
        const rad = p.r + pulse * 0.35;
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad * 6);
        grd.addColorStop(0, `hsla(355,90%,62%,0.35)`);
        grd.addColorStop(1, "transparent");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad * 5, 0, Math.PI * 2);
        ctx.fill();

        const cg = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, rad + 1);
        cg.addColorStop(0, "rgba(255,255,255,0.95)");
        cg.addColorStop(1, `hsla(355,82%,58%,0.82)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, rad, 0, Math.PI * 2);
        ctx.fillStyle = cg;
        ctx.fill();
      }
    };

    const tick = () => {
      if (!running) return;
      const { w: W, h: H } = sizeRef.current;
      frameRef.current++;
      timeRef.current++;
      frameHRef.current++;

      const rect = canvas.getBoundingClientRect();
      const mx = mouseRef.current.x - rect.left;
      const my = mouseRef.current.y - rect.top;

      const now = performance.now();
      const elapsed = now - introStartedRef.current;
      const tim = getIntroTimings();

      if (phaseRef.current === "idle") {
        const time = timeRef.current;
        let tp = Math.min((time - TSTART) / TDUR, 1);
        if (time < TSTART) tp = 0;

        ctx.fillStyle = `hsl(${lerp(245, 355, tp)},${lerp(60, 70, tp)}%,${lerp(4, 6, tp)}%)`;
        ctx.fillRect(0, 0, W, H);

        const vig = ctx.createRadialGradient(W * 0.35, H * 0.45, H * 0.1, W * 0.35, H * 0.45, H * 1.1);
        vig.addColorStop(0, "rgba(0,0,0,0)");
        vig.addColorStop(1, "rgba(0,0,0,0.72)");
        ctx.fillStyle = vig;
        ctx.fillRect(0, 0, W, H);

        for (const b of bokeh3Ref.current) {
          b.ph += b.vph;
          const pr = project(b.wx, b.wy, b.wz, W, H);
          if (!pr || pr.depth < 100) continue;
          const bh = lerp(b.hueBase, 355, tp);
          const pulse = 0.7 + Math.sin(b.ph) * 0.3;
          const br = b.r * pr.scale * 3 * pulse;
          const ba = dofAlpha(pr.depth, b.a) * pulse;
          if (ba < 0.01 || br < 1) continue;
          const g = ctx.createRadialGradient(pr.sx, pr.sy, 0, pr.sx, pr.sy, br);
          g.addColorStop(0, `hsla(${bh},70%,75%,${ba * 0.55})`);
          g.addColorStop(0.4, `hsla(${bh},65%,65%,${ba * 0.35})`);
          g.addColorStop(1, `hsla(${bh},60%,60%,0)`);
          ctx.beginPath();
          ctx.arc(pr.sx, pr.sy, br, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }

        const fh = frameHRef.current;
        drawSheet(sheetBRef.current, COLS2, ROWS2, W, H, tp, fh);
        drawSheet(sheetARef.current, COLS, ROWS, W, H, tp, fh);

        const flareH = lerp(190, 355, tp);
        const fg = ctx.createRadialGradient(W * 0.2, H * 0.45, 0, W * 0.2, H * 0.45, W * 0.35);
        fg.addColorStop(0, `hsla(${flareH},60%,55%,${0.05 + tp * 0.04})`);
        fg.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = fg;
        ctx.fillRect(0, 0, W, H);

        drawCherryOverlay(W, H, tp, frameRef.current, mx, my);

        raf = requestAnimationFrame(tick);
        return;
      }

      const tEnd = tim.scatter + tim.converge;
      if (elapsed >= tEnd) {
        goIdle();
        raf = requestAnimationFrame(tick);
        return;
      }

      let convergeProg = 0;
      let scatterPhase = false;

      if (elapsed < tim.scatter) {
        phaseRef.current = "scatter";
        scatterPhase = true;
        convergeProg = 0;
      } else {
        phaseRef.current = "converge";
        const raw = tim.converge > 0 ? (elapsed - tim.scatter) / tim.converge : 1;
        convergeProg = easeOutCubic(Math.min(1, raw));
      }

      if (uiSyncRef.current !== phaseRef.current) {
        uiSyncRef.current = phaseRef.current;
        setUiPhase(phaseRef.current);
      }

      ctx.fillStyle = "hsl(355 70% 5%)";
      ctx.fillRect(0, 0, W, H);

      const vigg = ctx.createRadialGradient(W * 0.5, H * 0.45, H * 0.08, W * 0.5, H * 0.45, H * 1.05);
      vigg.addColorStop(0, "rgba(80,10,20,0.15)");
      vigg.addColorStop(1, "rgba(0,0,0,0.65)");
      ctx.fillStyle = vigg;
      ctx.fillRect(0, 0, W, H);

      updateIntroParticles(W, H, mx, my, convergeProg, scatterPhase);
      drawIntroParticles(W, H, convergeProg);

      raf = requestAnimationFrame(tick);
    };

    (window as unknown as { __skipLandingIntro?: () => void }).__skipLandingIntro = skipToIdle;

    raf = requestAnimationFrame(tick);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      delete (window as unknown as { __skipLandingIntro?: () => void }).__skipLandingIntro;
    };
  }, [setIntroComplete]);

  const showSkip = uiPhase !== "idle";

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[0] h-[100svh] w-full pointer-events-none"
        aria-hidden
      />
      {showSkip && (
        <button
          type="button"
          className="fixed bottom-8 right-6 z-[101] font-label text-[10px] uppercase tracking-[0.2em] text-muted-foreground/90 transition-colors hover:text-primary px-4 py-2 rounded-lg border border-white/10 bg-black/50 backdrop-blur-md pointer-events-auto"
          onClick={() => {
            const w = window as unknown as { __skipLandingIntro?: () => void };
            w.__skipLandingIntro?.();
          }}
        >
          Skip intro
        </button>
      )}
    </>
  );
}
