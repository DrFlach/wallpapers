/* ╔══════════════════════════════════════════════════════╗
   ║  WallpaperHub — Canvas Wallpaper Generator          ║
   ║  Procedural generation of HD wallpapers using       ║
   ║  HTML5 Canvas API                                   ║
   ╚══════════════════════════════════════════════════════╝ */

class WallpaperGenerator {
  constructor() {
    this.seed = 0;
  }

  /* ── Pseudorandom seeded ── */
  random() {
    this.seed = (this.seed * 16807 + 0) % 2147483647;
    return (this.seed - 1) / 2147483646;
  }

  setSeed(s) {
    this.seed = s % 2147483647;
    if (this.seed <= 0) this.seed += 2147483646;
  }

  /* ── Main render ── */
  render(canvas, wallpaper, width, height) {
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    this.setSeed(wallpaper.id * 7919);

    const c = wallpaper.colors;

    switch (wallpaper.type) {
      case 'gradient':     this.drawGradient(ctx, wallpaper, width, height); break;
      case 'geometric':    this.drawGeometric(ctx, c, width, height); break;
      case 'waves':        this.drawWaves(ctx, c, width, height); break;
      case 'crystals':     this.drawCrystals(ctx, c, width, height); break;
      case 'neonLines':    this.drawNeonLines(ctx, c, width, height); break;
      case 'fractal':      this.drawFractal(ctx, c, width, height); break;
      case 'liquidMetal':  this.drawLiquidMetal(ctx, c, width, height); break;
      case 'milkyway':     this.drawMilkyway(ctx, c, width, height); break;
      case 'nebula':       this.drawNebula(ctx, c, width, height); break;
      case 'blackhole':    this.drawBlackhole(ctx, c, width, height); break;
      case 'starfield':    this.drawStarfield(ctx, c, width, height); break;
      case 'saturn':       this.drawSaturn(ctx, c, width, height); break;
      case 'solarFlare':   this.drawSolarFlare(ctx, c, width, height); break;
      case 'mountains':    this.drawMountains(ctx, c, width, height); break;
      case 'forest':       this.drawForest(ctx, c, width, height); break;
      case 'seashore':     this.drawSeashore(ctx, c, width, height); break;
      case 'sunrise':      this.drawSunrise(ctx, c, width, height); break;
      case 'flowers':      this.drawFlowers(ctx, c, width, height); break;
      case 'waterfall':    this.drawWaterfall(ctx, c, width, height); break;
      case 'circleLine':   this.drawCircleLine(ctx, c, width, height); break;
      case 'monochrome':   this.drawMonochrome(ctx, c, width, height); break;
      case 'dots':         this.drawDots(ctx, c, width, height); break;
      case 'zen':          this.drawZen(ctx, c, width, height); break;
      case 'pastelBlock':  this.drawPastelBlock(ctx, c, width, height); break;
      case 'lineRhythm':   this.drawLineRhythm(ctx, c, width, height); break;
      case 'carbon':       this.drawCarbon(ctx, c, width, height); break;
      case 'neonCity':     this.drawNeonCity(ctx, c, width, height); break;
      case 'darkSmoke':    this.drawDarkSmoke(ctx, c, width, height); break;
      case 'matrix':       this.drawMatrix(ctx, c, width, height); break;
      case 'granite':      this.drawGranite(ctx, c, width, height); break;
      case 'midnightBlue': this.drawMidnightBlue(ctx, c, width, height); break;
      default:             this.drawGradient(ctx, wallpaper, width, height);
    }
  }

  /* ══════════════════════════════════════
     GRADIENT WALLPAPERS
     ══════════════════════════════════════ */
  drawGradient(ctx, wp, w, h) {
    const c = wp.colors;
    let grad;
    if (wp.style === 'radial') {
      grad = ctx.createRadialGradient(w * 0.5, h * 0.5, 0, w * 0.5, h * 0.5, Math.max(w, h) * 0.7);
    } else {
      const angle = (wp.angle || 135) * Math.PI / 180;
      const cx = w / 2, cy = h / 2;
      const len = Math.max(w, h);
      grad = ctx.createLinearGradient(
        cx - Math.cos(angle) * len / 2, cy - Math.sin(angle) * len / 2,
        cx + Math.cos(angle) * len / 2, cy + Math.sin(angle) * len / 2
      );
    }
    c.forEach((color, i) => grad.addColorStop(i / (c.length - 1), color));
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Add subtle texture
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      const cx = this.random() * w;
      const cy = this.random() * h;
      const r = this.random() * Math.max(w, h) * 0.4 + 100;
      const radGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      radGrad.addColorStop(0, c[Math.floor(this.random() * c.length)] + '30');
      radGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = radGrad;
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  /* ══════════════════════════════════════
     ABSTRACT WALLPAPERS
     ══════════════════════════════════════ */
  drawGeometric(ctx, c, w, h) {
    ctx.fillStyle = c[3];
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < 30; i++) {
      ctx.save();
      const x = this.random() * w;
      const y = this.random() * h;
      const size = this.random() * Math.min(w, h) * 0.3 + 30;
      const rot = this.random() * Math.PI * 2;
      const color = c[Math.floor(this.random() * 3)];

      ctx.translate(x, y);
      ctx.rotate(rot);
      ctx.globalAlpha = this.random() * 0.4 + 0.1;

      const shape = Math.floor(this.random() * 3);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.lineWidth = 2;

      if (shape === 0) {
        ctx.beginPath();
        ctx.moveTo(0, -size / 2);
        ctx.lineTo(size / 2, size / 2);
        ctx.lineTo(-size / 2, size / 2);
        ctx.closePath();
        this.random() > 0.5 ? ctx.fill() : ctx.stroke();
      } else if (shape === 1) {
        this.random() > 0.5
          ? ctx.fillRect(-size / 2, -size / 2, size, size)
          : ctx.strokeRect(-size / 2, -size / 2, size, size);
      } else {
        ctx.beginPath();
        ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
        this.random() > 0.5 ? ctx.fill() : ctx.stroke();
      }
      ctx.restore();
    }

    // Glow overlay
    const glow = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.6);
    glow.addColorStop(0, c[0] + '20');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);
  }

  drawWaves(ctx, c, w, h) {
    const grad = ctx.createLinearGradient(0, 0, 0, h);
    grad.addColorStop(0, c[3]);
    grad.addColorStop(1, c[0] + '40');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    for (let layer = 0; layer < 6; layer++) {
      ctx.beginPath();
      const yBase = h * 0.2 + layer * h * 0.13;
      const amplitude = h * 0.06 + this.random() * h * 0.04;
      const freq = 0.003 + this.random() * 0.004;
      const phase = this.random() * Math.PI * 2;

      ctx.moveTo(0, h);
      for (let x = 0; x <= w; x += 4) {
        const y = yBase + Math.sin(x * freq + phase) * amplitude
                       + Math.sin(x * freq * 2.5 + phase * 1.5) * amplitude * 0.3;
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, h);
      ctx.closePath();

      const ci = layer % 3;
      ctx.fillStyle = c[ci] + (layer < 3 ? '25' : '15');
      ctx.fill();
    }
  }

  drawCrystals(ctx, c, w, h) {
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, c[3]);
    grad.addColorStop(1, c[0] + '30');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < 20; i++) {
      const cx = this.random() * w;
      const cy = this.random() * h;
      const sides = Math.floor(this.random() * 3) + 5;
      const r = this.random() * Math.min(w, h) * 0.15 + 30;

      ctx.beginPath();
      for (let j = 0; j <= sides; j++) {
        const angle = (j / sides) * Math.PI * 2 - Math.PI / 2;
        const pr = r * (0.7 + this.random() * 0.6);
        const px = cx + Math.cos(angle) * pr;
        const py = cy + Math.sin(angle) * pr;
        j === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();

      const ci = Math.floor(this.random() * 3);
      ctx.globalAlpha = this.random() * 0.25 + 0.05;
      ctx.fillStyle = c[ci];
      ctx.fill();
      ctx.globalAlpha = this.random() * 0.3 + 0.1;
      ctx.strokeStyle = c[ci];
      ctx.lineWidth = 1;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  drawNeonLines(ctx, c, w, h) {
    ctx.fillStyle = c[3];
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < 15; i++) {
      ctx.beginPath();
      const startX = this.random() * w;
      const startY = this.random() * h;
      ctx.moveTo(startX, startY);

      for (let j = 0; j < 6; j++) {
        const cp1x = this.random() * w;
        const cp1y = this.random() * h;
        const cp2x = this.random() * w;
        const cp2y = this.random() * h;
        const ex = this.random() * w;
        const ey = this.random() * h;
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, ex, ey);
      }

      const ci = Math.floor(this.random() * 3);
      ctx.strokeStyle = c[ci];
      ctx.lineWidth = this.random() * 3 + 1;
      ctx.globalAlpha = 0.6;
      ctx.shadowColor = c[ci];
      ctx.shadowBlur = 20;
      ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;
    }
  }

  drawFractal(ctx, c, w, h) {
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#0a0020');
    grad.addColorStop(1, c[3]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    const maxIter = 40;
    const step = Math.max(2, Math.floor(w / 300));

    for (let px = 0; px < w; px += step) {
      for (let py = 0; py < h; py += step) {
        let x0 = (px / w) * 3.5 - 2.5;
        let y0 = (py / h) * 2.4 - 1.2;
        let x = 0, y = 0, iter = 0;
        while (x * x + y * y <= 4 && iter < maxIter) {
          const xtemp = x * x - y * y + x0;
          y = 2 * x * y + y0;
          x = xtemp;
          iter++;
        }
        if (iter < maxIter) {
          const ci = iter % c.length;
          ctx.fillStyle = c[ci];
          ctx.globalAlpha = 0.5 + (iter / maxIter) * 0.5;
          ctx.fillRect(px, py, step, step);
        }
      }
    }
    ctx.globalAlpha = 1;
  }

  drawLiquidMetal(ctx, c, w, h) {
    ctx.fillStyle = c[3];
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < 12; i++) {
      const cx = this.random() * w;
      const cy = this.random() * h;
      const rx = this.random() * w * 0.5 + 100;
      const ry = this.random() * h * 0.3 + 80;

      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry));
      const ci = Math.floor(this.random() * 3);
      grad.addColorStop(0, c[ci] + 'AA');
      grad.addColorStop(0.5, c[ci] + '30');
      grad.addColorStop(1, 'transparent');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.ellipse(cx, cy, rx, ry, this.random() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }

    // Sheen lines
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      const y = this.random() * h;
      ctx.moveTo(0, y);
      ctx.lineTo(w, y + (this.random() - 0.5) * 100);
      ctx.strokeStyle = '#FFFFFF15';
      ctx.lineWidth = this.random() * 20 + 5;
      ctx.stroke();
    }
  }

  /* ══════════════════════════════════════
     SPACE WALLPAPERS
     ══════════════════════════════════════ */
  drawStars(ctx, w, h, count, maxSize) {
    for (let i = 0; i < count; i++) {
      const x = this.random() * w;
      const y = this.random() * h;
      const r = this.random() * maxSize;
      const brightness = this.random();
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${brightness * 0.8 + 0.2})`;
      ctx.fill();
    }
  }

  drawMilkyway(ctx, c, w, h) {
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, c[0]);
    grad.addColorStop(0.5, c[1]);
    grad.addColorStop(1, c[0]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Milky band
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.rotate(-0.4);
    for (let i = 0; i < 2000; i++) {
      const x = (this.random() - 0.5) * w * 1.5;
      const y = (this.random() - 0.5) * h * 0.25;
      const r = this.random() * 2;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      const bright = this.random();
      ctx.fillStyle = bright > 0.7 ? c[2] + 'CC' : `rgba(255,255,255,${bright})`;
      ctx.fill();
    }
    ctx.restore();

    // Background stars
    this.drawStars(ctx, w, h, 300, 1.5);

    // Nebula glow
    const nGrad = ctx.createRadialGradient(w * 0.4, h * 0.5, 0, w * 0.4, h * 0.5, w * 0.4);
    nGrad.addColorStop(0, c[2] + '20');
    nGrad.addColorStop(0.5, c[3] + '10');
    nGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = nGrad;
    ctx.fillRect(0, 0, w, h);
  }

  drawNebula(ctx, c, w, h) {
    ctx.fillStyle = c[3];
    ctx.fillRect(0, 0, w, h);

    this.drawStars(ctx, w, h, 400, 1.2);

    for (let layer = 0; layer < 8; layer++) {
      const cx = this.random() * w;
      const cy = this.random() * h;
      const r = this.random() * Math.max(w, h) * 0.5 + 100;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      const ci = Math.floor(this.random() * 3);
      grad.addColorStop(0, c[ci] + '40');
      grad.addColorStop(0.5, c[ci] + '15');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    }

    this.drawStars(ctx, w, h, 100, 2);
  }

  drawBlackhole(ctx, c, w, h) {
    ctx.fillStyle = c[0];
    ctx.fillRect(0, 0, w, h);
    this.drawStars(ctx, w, h, 300, 1);

    const cx = w / 2, cy = h / 2;
    const maxR = Math.min(w, h) * 0.35;

    // Accretion disk
    for (let i = 0; i < 200; i++) {
      const angle = this.random() * Math.PI * 2;
      const dist = maxR * 0.3 + this.random() * maxR * 0.4;
      const spread = (this.random() - 0.5) * maxR * 0.1;
      const x = cx + Math.cos(angle) * dist;
      const y = cy + Math.sin(angle) * dist * 0.35 + spread;
      const r = this.random() * 4 + 1;

      const t = (angle + Math.PI) / (Math.PI * 2);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = t < 0.5 ? c[1] : c[2];
      ctx.globalAlpha = this.random() * 0.7 + 0.3;
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Glow ring
    const ringGrad = ctx.createRadialGradient(cx, cy, maxR * 0.15, cx, cy, maxR * 0.6);
    ringGrad.addColorStop(0, 'transparent');
    ringGrad.addColorStop(0.4, c[1] + '40');
    ringGrad.addColorStop(0.6, c[2] + '30');
    ringGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = ringGrad;
    ctx.fillRect(0, 0, w, h);

    // Black center
    const bhGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR * 0.2);
    bhGrad.addColorStop(0, '#000000');
    bhGrad.addColorStop(0.8, '#000000');
    bhGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = bhGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, maxR * 0.2, 0, Math.PI * 2);
    ctx.fill();
  }

  drawStarfield(ctx, c, w, h) {
    const grad = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.7);
    grad.addColorStop(0, c[1]);
    grad.addColorStop(1, c[0]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    this.drawStars(ctx, w, h, 800, 2.5);

    // Bright stars with glow
    for (let i = 0; i < 20; i++) {
      const x = this.random() * w;
      const y = this.random() * h;
      const r = this.random() * 3 + 2;
      const sGrad = ctx.createRadialGradient(x, y, 0, x, y, r * 6);
      sGrad.addColorStop(0, '#FFFFFFCC');
      sGrad.addColorStop(0.3, c[3] + '40');
      sGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = sGrad;
      ctx.fillRect(x - r * 6, y - r * 6, r * 12, r * 12);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
    }
  }

  drawSaturn(ctx, c, w, h) {
    ctx.fillStyle = c[2];
    ctx.fillRect(0, 0, w, h);
    this.drawStars(ctx, w, h, 300, 1.2);

    const cx = w * 0.5, cy = h * 0.5;
    const planetR = Math.min(w, h) * 0.18;

    // Planet glow
    const pglow = ctx.createRadialGradient(cx, cy, planetR, cx, cy, planetR * 2.5);
    pglow.addColorStop(0, c[0] + '30');
    pglow.addColorStop(1, 'transparent');
    ctx.fillStyle = pglow;
    ctx.fillRect(0, 0, w, h);

    // Planet
    const pGrad = ctx.createRadialGradient(cx - planetR * 0.3, cy - planetR * 0.3, 0, cx, cy, planetR);
    pGrad.addColorStop(0, c[0]);
    pGrad.addColorStop(0.7, c[1]);
    pGrad.addColorStop(1, '#1a0a00');
    ctx.beginPath();
    ctx.arc(cx, cy, planetR, 0, Math.PI * 2);
    ctx.fillStyle = pGrad;
    ctx.fill();

    // Rings
    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(1, 0.3);
    for (let r = planetR * 1.4; r < planetR * 2.2; r += 3) {
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      const alpha = 0.1 + this.random() * 0.3;
      ctx.strokeStyle = `rgba(218,165,32,${alpha})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }
    ctx.restore();
  }

  drawSolarFlare(ctx, c, w, h) {
    ctx.fillStyle = c[3];
    ctx.fillRect(0, 0, w, h);

    const cx = w * 0.5, cy = h * 0.5;
    const sunR = Math.min(w, h) * 0.2;

    // Corona
    for (let i = 0; i < 60; i++) {
      const angle = this.random() * Math.PI * 2;
      const len = sunR + this.random() * sunR * 2;
      const x2 = cx + Math.cos(angle) * len;
      const y2 = cy + Math.sin(angle) * len;

      const fGrad = ctx.createLinearGradient(cx, cy, x2, y2);
      fGrad.addColorStop(0, c[2]);
      fGrad.addColorStop(0.5, c[0] + '80');
      fGrad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = fGrad;
      ctx.lineWidth = this.random() * 6 + 2;
      ctx.globalAlpha = this.random() * 0.4 + 0.1;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Glow
    const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, sunR * 2);
    glow.addColorStop(0, c[2]);
    glow.addColorStop(0.3, c[0] + '80');
    glow.addColorStop(0.6, c[1] + '30');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    // Sun
    const sGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, sunR);
    sGrad.addColorStop(0, '#FFFFFF');
    sGrad.addColorStop(0.4, c[2]);
    sGrad.addColorStop(1, c[0]);
    ctx.beginPath();
    ctx.arc(cx, cy, sunR, 0, Math.PI * 2);
    ctx.fillStyle = sGrad;
    ctx.fill();
  }

  /* ══════════════════════════════════════
     NATURE WALLPAPERS
     ══════════════════════════════════════ */
  drawMountains(ctx, c, w, h) {
    // Sky
    const sky = ctx.createLinearGradient(0, 0, 0, h * 0.6);
    sky.addColorStop(0, c[3]);
    sky.addColorStop(1, c[2] + '80');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // Stars
    this.drawStars(ctx, w, h * 0.4, 80, 1);

    // Mountain layers
    const layers = [
      { y: 0.4, color: c[0], opacity: 1 },
      { y: 0.5, color: c[1], opacity: 0.9 },
      { y: 0.6, color: c[1] + 'CC', opacity: 0.8 },
      { y: 0.75, color: c[0] + '80', opacity: 1 },
    ];

    layers.forEach((layer) => {
      ctx.beginPath();
      ctx.moveTo(0, h);
      for (let x = 0; x <= w; x += 8) {
        const baseY = h * layer.y;
        const peak = Math.sin(x * 0.005 + this.random()) * h * 0.15
                   + Math.sin(x * 0.01) * h * 0.08;
        ctx.lineTo(x, baseY - Math.abs(peak));
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fillStyle = layer.color;
      ctx.globalAlpha = layer.opacity;
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    // Fog
    const fog = ctx.createLinearGradient(0, h * 0.7, 0, h);
    fog.addColorStop(0, 'transparent');
    fog.addColorStop(1, c[2] + '40');
    ctx.fillStyle = fog;
    ctx.fillRect(0, 0, w, h);
  }

  drawForest(ctx, c, w, h) {
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, c[3] + '80');
    sky.addColorStop(0.5, c[1]);
    sky.addColorStop(1, c[0]);
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // Fog layers
    for (let layer = 0; layer < 5; layer++) {
      const fogY = h * (0.3 + layer * 0.12);
      const fogGrad = ctx.createLinearGradient(0, fogY - h * 0.1, 0, fogY + h * 0.1);
      fogGrad.addColorStop(0, 'transparent');
      fogGrad.addColorStop(0.5, c[3] + '25');
      fogGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = fogGrad;
      ctx.fillRect(0, fogY - h * 0.1, w, h * 0.2);
    }

    // Trees
    for (let layer = 3; layer >= 0; layer--) {
      const treeCount = 15 + layer * 8;
      const baseY = h * (0.4 + layer * 0.15);
      const treeH = h * (0.15 + layer * 0.05);
      const shade = layer * 20;
      const treeColor = `rgb(${27 - shade / 3},${67 - shade},${50 - shade / 2})`;

      for (let i = 0; i < treeCount; i++) {
        const tx = this.random() * w;
        const tw = 8 + this.random() * 12;
        const th = treeH * (0.5 + this.random() * 0.5);

        ctx.beginPath();
        ctx.moveTo(tx, baseY);
        ctx.lineTo(tx - tw, baseY);
        ctx.lineTo(tx - tw * 0.1, baseY - th);
        ctx.lineTo(tx + tw * 0.1, baseY - th);
        ctx.lineTo(tx + tw, baseY);
        ctx.closePath();
        ctx.fillStyle = treeColor;
        ctx.globalAlpha = 0.6 + layer * 0.1;
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }

  drawSeashore(ctx, c, w, h) {
    // Sky
    const sky = ctx.createLinearGradient(0, 0, 0, h * 0.5);
    sky.addColorStop(0, c[0]);
    sky.addColorStop(1, c[1]);
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // Sun
    const sunX = w * 0.7, sunY = h * 0.25;
    const sunGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, Math.min(w, h) * 0.15);
    sunGrad.addColorStop(0, c[2]);
    sunGrad.addColorStop(0.5, c[3] + '60');
    sunGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = sunGrad;
    ctx.fillRect(0, 0, w, h);

    // Water
    const waterY = h * 0.5;
    const waterGrad = ctx.createLinearGradient(0, waterY, 0, h * 0.8);
    waterGrad.addColorStop(0, c[1]);
    waterGrad.addColorStop(1, c[0]);
    ctx.fillStyle = waterGrad;
    ctx.fillRect(0, waterY, w, h * 0.3);

    // Waves
    for (let i = 0; i < 8; i++) {
      ctx.beginPath();
      const wy = waterY + i * h * 0.035;
      for (let x = 0; x <= w; x += 4) {
        const y = wy + Math.sin(x * 0.01 + i) * 8 + Math.sin(x * 0.03 + i * 2) * 3;
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.strokeStyle = '#FFFFFF20';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Sand
    const sandGrad = ctx.createLinearGradient(0, h * 0.78, 0, h);
    sandGrad.addColorStop(0, c[2]);
    sandGrad.addColorStop(1, c[3]);
    ctx.fillStyle = sandGrad;
    ctx.beginPath();
    ctx.moveTo(0, h);
    for (let x = 0; x <= w; x += 4) {
      const y = h * 0.8 + Math.sin(x * 0.005) * h * 0.02;
      ctx.lineTo(x, y);
    }
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fill();
  }

  drawSunrise(ctx, c, w, h) {
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, c[3]);
    sky.addColorStop(0.3, c[2]);
    sky.addColorStop(0.5, c[1]);
    sky.addColorStop(0.7, c[0]);
    sky.addColorStop(1, c[3]);
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // Sun glow
    const sunX = w * 0.5, sunY = h * 0.5;
    const glow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, w * 0.5);
    glow.addColorStop(0, '#FFFFFF60');
    glow.addColorStop(0.3, c[1] + '40');
    glow.addColorStop(1, 'transparent');
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    // Sun
    ctx.beginPath();
    ctx.arc(sunX, sunY, Math.min(w, h) * 0.08, 0, Math.PI * 2);
    ctx.fillStyle = '#FFFFFFdd';
    ctx.fill();

    // Clouds
    for (let i = 0; i < 6; i++) {
      const cx = this.random() * w;
      const cy = h * 0.15 + this.random() * h * 0.3;
      this.drawCloud(ctx, cx, cy, this.random() * 100 + 80, c[1] + '30');
    }

    // Ground
    ctx.beginPath();
    ctx.moveTo(0, h);
    for (let x = 0; x <= w; x += 8) {
      ctx.lineTo(x, h * 0.85 + Math.sin(x * 0.003) * h * 0.03);
    }
    ctx.lineTo(w, h);
    ctx.closePath();
    ctx.fillStyle = c[3];
    ctx.fill();
  }

  drawCloud(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      const cx = x + (this.random() - 0.5) * size;
      const cy = y + (this.random() - 0.5) * size * 0.3;
      const r = this.random() * size * 0.4 + size * 0.2;
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  drawFlowers(ctx, c, w, h) {
    // Sky
    const sky = ctx.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, '#87CEEB');
    sky.addColorStop(0.6, '#E0F0FF');
    sky.addColorStop(1, c[3]);
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h);

    // Ground
    ctx.fillStyle = c[3];
    ctx.fillRect(0, h * 0.55, w, h * 0.45);

    // Grass texture
    for (let i = 0; i < 500; i++) {
      const gx = this.random() * w;
      const gy = h * 0.55 + this.random() * h * 0.45;
      const gh = this.random() * 20 + 10;
      ctx.beginPath();
      ctx.moveTo(gx, gy);
      ctx.lineTo(gx + (this.random() - 0.5) * 6, gy - gh);
      ctx.strokeStyle = `rgba(34,139,34,${this.random() * 0.3 + 0.1})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Flowers
    for (let i = 0; i < 40; i++) {
      const fx = this.random() * w;
      const fy = h * 0.5 + this.random() * h * 0.4;
      const fs = this.random() * 12 + 6;
      const color = [c[0], c[1], c[2]][Math.floor(this.random() * 3)];

      // Stem
      ctx.beginPath();
      ctx.moveTo(fx, fy);
      ctx.lineTo(fx, fy + fs * 3);
      ctx.strokeStyle = '#228B22';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Petals
      for (let p = 0; p < 5; p++) {
        const angle = (p / 5) * Math.PI * 2;
        ctx.beginPath();
        ctx.ellipse(
          fx + Math.cos(angle) * fs * 0.6,
          fy + Math.sin(angle) * fs * 0.6,
          fs * 0.5, fs * 0.3, angle, 0, Math.PI * 2
        );
        ctx.fillStyle = color;
        ctx.globalAlpha = 0.8;
        ctx.fill();
      }
      // Center
      ctx.beginPath();
      ctx.arc(fx, fy, fs * 0.25, 0, Math.PI * 2);
      ctx.fillStyle = '#FFD700';
      ctx.globalAlpha = 1;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  drawWaterfall(ctx, c, w, h) {
    // Background cliffs
    ctx.fillStyle = c[0];
    ctx.fillRect(0, 0, w, h);

    const sky = ctx.createLinearGradient(0, 0, 0, h * 0.3);
    sky.addColorStop(0, '#87CEEB80');
    sky.addColorStop(1, c[0]);
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, w, h * 0.3);

    // Cliff sides
    ctx.fillStyle = c[3];
    ctx.fillRect(0, h * 0.15, w * 0.35, h * 0.85);
    ctx.fillRect(w * 0.65, h * 0.15, w * 0.35, h * 0.85);

    // Waterfall
    for (let i = 0; i < 100; i++) {
      const wx = w * 0.35 + this.random() * w * 0.3;
      const wy = h * 0.15 + this.random() * h * 0.7;
      const ww = this.random() * 4 + 1;
      const wh = this.random() * 30 + 20;

      ctx.fillStyle = `rgba(72,202,228,${this.random() * 0.3 + 0.1})`;
      ctx.fillRect(wx, wy, ww, wh);
    }

    // Mist at bottom
    const mist = ctx.createRadialGradient(w / 2, h * 0.85, 0, w / 2, h * 0.85, w * 0.4);
    mist.addColorStop(0, c[2] + '50');
    mist.addColorStop(1, 'transparent');
    ctx.fillStyle = mist;
    ctx.fillRect(0, 0, w, h);

    // Pool
    const pool = ctx.createLinearGradient(0, h * 0.85, 0, h);
    pool.addColorStop(0, c[1]);
    pool.addColorStop(1, c[0] + 'CC');
    ctx.fillStyle = pool;
    ctx.fillRect(0, h * 0.85, w, h * 0.15);
  }

  /* ══════════════════════════════════════
     MINIMAL WALLPAPERS
     ══════════════════════════════════════ */
  drawCircleLine(ctx, c, w, h) {
    ctx.fillStyle = c[3];
    ctx.fillRect(0, 0, w, h);

    const cx = w / 2, cy = h / 2;
    const r = Math.min(w, h) * 0.2;

    // Circle
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.strokeStyle = c[2];
    ctx.lineWidth = 3;
    ctx.stroke();

    // Horizontal line through circle
    ctx.beginPath();
    ctx.moveTo(w * 0.15, cy);
    ctx.lineTo(w * 0.85, cy);
    ctx.strokeStyle = c[1];
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Small dot
    ctx.beginPath();
    ctx.arc(cx + r * 0.7, cy - r * 0.7, 6, 0, Math.PI * 2);
    ctx.fillStyle = c[2];
    ctx.fill();
  }

  drawMonochrome(ctx, c, w, h) {
    ctx.fillStyle = c[0];
    ctx.fillRect(0, 0, w, h);

    // Grid pattern
    const step = Math.min(w, h) / 20;
    ctx.strokeStyle = c[3];
    ctx.lineWidth = 0.5;
    for (let x = 0; x < w; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += step) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    // Central shape
    const size = Math.min(w, h) * 0.25;
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.rotate(Math.PI / 4);
    ctx.strokeStyle = c[1];
    ctx.lineWidth = 2;
    ctx.strokeRect(-size / 2, -size / 2, size, size);
    ctx.restore();
  }

  drawDots(ctx, c, w, h) {
    ctx.fillStyle = c[0];
    ctx.fillRect(0, 0, w, h);

    const spacing = Math.min(w, h) / 25;
    for (let x = spacing; x < w; x += spacing) {
      for (let y = spacing; y < h; y += spacing) {
        const dist = Math.sqrt(Math.pow(x - w / 2, 2) + Math.pow(y - h / 2, 2));
        const maxDist = Math.sqrt(Math.pow(w / 2, 2) + Math.pow(h / 2, 2));
        const size = (1 - dist / maxDist) * spacing * 0.3 + 1;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = c[1];
        ctx.globalAlpha = 0.3 + (1 - dist / maxDist) * 0.7;
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
  }

  drawZen(ctx, c, w, h) {
    ctx.fillStyle = c[0];
    ctx.fillRect(0, 0, w, h);

    // Sand ripples
    const cx = w * 0.5, cy = h * 0.5;
    for (let r = 30; r < Math.min(w, h) * 0.45; r += 20) {
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.strokeStyle = c[1] + '30';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // Stones
    const stones = [
      { x: cx - 15, y: cy, r: 25 },
      { x: cx + 20, y: cy - 15, r: 18 },
      { x: cx + 5, y: cy + 20, r: 14 },
    ];
    stones.forEach(s => {
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = c[3];
      ctx.fill();
      ctx.strokeStyle = c[1] + '50';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Bamboo
    const bx = w * 0.8;
    ctx.beginPath();
    ctx.moveTo(bx, h);
    ctx.lineTo(bx, h * 0.1);
    ctx.strokeStyle = c[2];
    ctx.lineWidth = 4;
    ctx.stroke();

    for (let i = 0; i < 5; i++) {
      const ly = h * 0.15 + i * h * 0.12;
      ctx.beginPath();
      ctx.moveTo(bx, ly);
      ctx.quadraticCurveTo(bx + 40, ly - 20, bx + 60, ly + 5);
      ctx.strokeStyle = c[2] + 'AA';
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }

  drawPastelBlock(ctx, c, w, h) {
    ctx.fillStyle = '#FAFAFA';
    ctx.fillRect(0, 0, w, h);

    const blocks = [
      { x: 0, y: 0, w: 0.5, h: 0.6, color: c[0] },
      { x: 0.5, y: 0, w: 0.5, h: 0.4, color: c[1] },
      { x: 0.5, y: 0.4, w: 0.25, h: 0.6, color: c[2] },
      { x: 0.75, y: 0.4, w: 0.25, h: 0.6, color: c[3] },
      { x: 0, y: 0.6, w: 0.5, h: 0.4, color: c[2] + 'AA' },
    ];

    blocks.forEach(b => {
      ctx.fillStyle = b.color;
      ctx.fillRect(b.x * w, b.y * h, b.w * w, b.h * h);
    });

    // Subtle border lines
    ctx.strokeStyle = '#FFFFFF40';
    ctx.lineWidth = 2;
    blocks.forEach(b => {
      ctx.strokeRect(b.x * w, b.y * h, b.w * w, b.h * h);
    });
  }

  drawLineRhythm(ctx, c, w, h) {
    ctx.fillStyle = c[0];
    ctx.fillRect(0, 0, w, h);

    const lineCount = 40;
    const spacing = w / lineCount;

    for (let i = 0; i < lineCount; i++) {
      const x = i * spacing + spacing / 2;
      const amplitude = Math.sin(i / lineCount * Math.PI) * h * 0.3;
      const lineH = h * 0.1 + amplitude;
      const y = (h - lineH) / 2;

      ctx.fillStyle = i % 5 === 0 ? c[2] : c[1];
      ctx.globalAlpha = 0.3 + Math.sin(i / lineCount * Math.PI) * 0.7;
      ctx.fillRect(x, y, spacing * 0.4, lineH);
    }
    ctx.globalAlpha = 1;

    // Accent circle
    ctx.beginPath();
    ctx.arc(w * 0.7, h * 0.3, 30, 0, Math.PI * 2);
    ctx.fillStyle = c[3];
    ctx.fill();
  }

  /* ══════════════════════════════════════
     DARK WALLPAPERS
     ══════════════════════════════════════ */
  drawCarbon(ctx, c, w, h) {
    ctx.fillStyle = c[3];
    ctx.fillRect(0, 0, w, h);

    // Carbon fiber pattern
    const size = 8;
    for (let x = 0; x < w; x += size * 2) {
      for (let y = 0; y < h; y += size * 2) {
        // Light
        const gLight = ctx.createLinearGradient(x, y, x + size, y + size);
        gLight.addColorStop(0, c[1]);
        gLight.addColorStop(1, c[0]);
        ctx.fillStyle = gLight;
        ctx.fillRect(x, y, size, size);
        ctx.fillRect(x + size, y + size, size, size);

        // Dark
        const gDark = ctx.createLinearGradient(x + size, y, x + size * 2, y + size);
        gDark.addColorStop(0, c[2]);
        gDark.addColorStop(1, c[3]);
        ctx.fillStyle = gDark;
        ctx.fillRect(x + size, y, size, size);
        ctx.fillRect(x, y + size, size, size);
      }
    }

    // Vignette
    const vig = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h / 2, w * 0.8);
    vig.addColorStop(0, 'transparent');
    vig.addColorStop(1, '#00000080');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, w, h);
  }

  drawNeonCity(ctx, c, w, h) {
    ctx.fillStyle = c[0];
    ctx.fillRect(0, 0, w, h);

    // Sky glow
    const skyGlow = ctx.createLinearGradient(0, h, 0, 0);
    skyGlow.addColorStop(0, c[1] + '30');
    skyGlow.addColorStop(0.3, c[3] + '20');
    skyGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = skyGlow;
    ctx.fillRect(0, 0, w, h);

    // Buildings
    const buildingCount = 20;
    for (let i = 0; i < buildingCount; i++) {
      const bx = (i / buildingCount) * w;
      const bw = w / buildingCount * 0.85;
      const bh = this.random() * h * 0.5 + h * 0.15;
      const by = h - bh;

      ctx.fillStyle = '#0A0A12';
      ctx.fillRect(bx, by, bw, bh);

      // Windows
      const wSize = 4;
      const wGap = 8;
      for (let wx = bx + 4; wx < bx + bw - 4; wx += wGap) {
        for (let wy = by + 8; wy < h - 8; wy += wGap) {
          if (this.random() > 0.4) {
            const wColor = [c[1], c[2], c[3], '#FFFF00'][Math.floor(this.random() * 4)];
            ctx.fillStyle = wColor;
            ctx.globalAlpha = this.random() * 0.5 + 0.3;
            ctx.fillRect(wx, wy, wSize, wSize);
          }
        }
      }
    }
    ctx.globalAlpha = 1;

    // Neon signs
    for (let i = 0; i < 5; i++) {
      const nx = this.random() * w;
      const ny = h * 0.3 + this.random() * h * 0.4;
      const nw = this.random() * 60 + 30;
      const color = [c[1], c[2], c[3]][Math.floor(this.random() * 3)];

      ctx.shadowColor = color;
      ctx.shadowBlur = 20;
      ctx.fillStyle = color;
      ctx.fillRect(nx, ny, nw, 4);
      ctx.shadowBlur = 0;
    }

    // Rain
    ctx.strokeStyle = '#FFFFFF10';
    ctx.lineWidth = 1;
    for (let i = 0; i < 200; i++) {
      const rx = this.random() * w;
      const ry = this.random() * h;
      ctx.beginPath();
      ctx.moveTo(rx, ry);
      ctx.lineTo(rx - 1, ry + 15);
      ctx.stroke();
    }
  }

  drawDarkSmoke(ctx, c, w, h) {
    ctx.fillStyle = c[0];
    ctx.fillRect(0, 0, w, h);

    for (let i = 0; i < 15; i++) {
      const cx = this.random() * w;
      const cy = this.random() * h;
      const r = this.random() * Math.max(w, h) * 0.4 + 100;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      const ci = Math.floor(this.random() * 4);
      grad.addColorStop(0, c[ci] + '40');
      grad.addColorStop(0.5, c[ci] + '15');
      grad.addColorStop(1, 'transparent');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    }

    // Subtle noise
    const vig = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.7);
    vig.addColorStop(0, 'transparent');
    vig.addColorStop(1, '#000000AA');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, w, h);
  }

  drawMatrix(ctx, c, w, h) {
    ctx.fillStyle = c[0];
    ctx.fillRect(0, 0, w, h);

    const cols = Math.floor(w / 14);
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789';

    for (let col = 0; col < cols; col++) {
      const x = col * 14;
      const streamLen = Math.floor(this.random() * 30) + 10;
      const startY = this.random() * h;

      for (let row = 0; row < streamLen; row++) {
        const y = startY + row * 16;
        if (y > h) break;

        const charIdx = Math.floor(this.random() * chars.length);
        const char = chars[charIdx];
        const brightness = row === 0 ? 1 : (1 - row / streamLen);

        ctx.font = '14px monospace';
        if (row === 0) {
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = c[2];
          ctx.shadowBlur = 10;
        } else {
          ctx.fillStyle = c[2];
          ctx.shadowBlur = 0;
          ctx.globalAlpha = brightness * 0.8;
        }
        ctx.fillText(char, x, y);
        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }
    }
  }

  drawGranite(ctx, c, w, h) {
    ctx.fillStyle = c[0];
    ctx.fillRect(0, 0, w, h);

    // Granite texture via dots
    for (let i = 0; i < 20000; i++) {
      const x = this.random() * w;
      const y = this.random() * h;
      const r = this.random() * 2;
      const ci = Math.floor(this.random() * 4);
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fillStyle = c[ci];
      ctx.globalAlpha = this.random() * 0.3 + 0.05;
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Subtle vignette
    const vig = ctx.createRadialGradient(w / 2, h / 2, w * 0.2, w / 2, h / 2, w * 0.8);
    vig.addColorStop(0, 'transparent');
    vig.addColorStop(1, '#00000060');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, w, h);
  }

  drawMidnightBlue(ctx, c, w, h) {
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, c[0]);
    grad.addColorStop(0.5, c[1]);
    grad.addColorStop(1, c[0]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Glowing orbs
    for (let i = 0; i < 6; i++) {
      const ox = this.random() * w;
      const oy = this.random() * h;
      const or = this.random() * Math.min(w, h) * 0.3 + 80;
      const ci = Math.floor(this.random() * 2) + 2;
      const oGrad = ctx.createRadialGradient(ox, oy, 0, ox, oy, or);
      oGrad.addColorStop(0, c[ci] + '25');
      oGrad.addColorStop(0.5, c[ci] + '10');
      oGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = oGrad;
      ctx.fillRect(0, 0, w, h);
    }

    // Subtle stars
    this.drawStars(ctx, w, h, 100, 1);
  }

  /* ── Hero background ── */
  renderHeroBackground(canvas) {
    const w = canvas.width = window.innerWidth;
    const h = canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');

    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, '#0D0221');
    grad.addColorStop(0.3, '#190A3A');
    grad.addColorStop(0.6, '#0A0E27');
    grad.addColorStop(1, '#06060E');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    // Gradient orbs
    const orbs = [
      { x: w * 0.2, y: h * 0.3, r: w * 0.3, color: '#7B2FF720' },
      { x: w * 0.8, y: h * 0.6, r: w * 0.25, color: '#FF006E15' },
      { x: w * 0.5, y: h * 0.5, r: w * 0.4, color: '#00D4AA10' },
    ];

    orbs.forEach(orb => {
      const g = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
      g.addColorStop(0, orb.color);
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, w, h);
    });

    // Grid
    ctx.strokeStyle = '#FFFFFF06';
    ctx.lineWidth = 1;
    const gridSize = 60;
    for (let x = 0; x < w; x += gridSize) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSize) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // Stars
    this.setSeed(42);
    for (let i = 0; i < 120; i++) {
      const sx = this.random() * w;
      const sy = this.random() * h;
      const sr = this.random() * 1.5;
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${this.random() * 0.5})`;
      ctx.fill();
    }
  }
}

// Global instance
window.WallpaperGen = new WallpaperGenerator();
