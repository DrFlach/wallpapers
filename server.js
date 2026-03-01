const express = require('express');
const compression = require('compression');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(compression());
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d',
  etag: true
}));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API: wallpaper data
app.get('/api/wallpapers', (req, res) => {
  res.json(getWallpapers());
});

function getWallpapers() {
  return [
    // ── Gradients ──
    { id: 1,  title: 'Ocean Sunset',         category: 'gradients', tags: ['warm','orange','sunset'],           colors: ['#FF6B35','#F7931E','#FDB813','#1A1A2E'], type: 'gradient', style: 'linear', angle: 135 },
    { id: 2,  title: 'Northern Lights',      category: 'gradients', tags: ['cold','green','aurora'],            colors: ['#0B3D0B','#00D4AA','#7B2FF7','#0D0221'], type: 'gradient', style: 'radial' },
    { id: 3,  title: 'Pink Clouds',          category: 'gradients', tags: ['pink','soft','clouds'],             colors: ['#FFB6C1','#FF69B4','#C71585','#2D1B69'], type: 'gradient', style: 'linear', angle: 180 },
    { id: 4,  title: 'Deep Ocean',           category: 'gradients', tags: ['blue','ocean','deep'],              colors: ['#0077B6','#023E8A','#03045E','#CAF0F8'], type: 'gradient', style: 'linear', angle: 180 },
    { id: 5,  title: 'Lavender Fields',      category: 'gradients', tags: ['lavender','purple','fields'],       colors: ['#E6E6FA','#9B59B6','#6C3483','#1A1A2E'], type: 'gradient', style: 'linear', angle: 160 },
    { id: 6,  title: 'Golden Hour',          category: 'gradients', tags: ['golden','yellow','warm'],           colors: ['#FFD700','#FFA500','#FF6347','#2C1810'], type: 'gradient', style: 'radial' },

    // ── Abstract ──
    { id: 7,  title: 'Light Geometry',       category: 'abstract',  tags: ['geometry','light','shapes'],        colors: ['#00F5D4','#00BBF9','#9B5DE5','#0D0221'], type: 'geometric' },
    { id: 8,  title: 'Wave Flow',            category: 'abstract',  tags: ['waves','flow','dynamic'],           colors: ['#FF006E','#FB5607','#FFBE0B','#1A0A2E'], type: 'waves' },
    { id: 9,  title: 'Crystals',             category: 'abstract',  tags: ['crystal','facets','ice'],           colors: ['#48CAE4','#90E0EF','#ADE8F4','#03045E'], type: 'crystals' },
    { id: 10, title: 'Neon Lines',           category: 'abstract',  tags: ['neon','lines','glow'],              colors: ['#FF00FF','#00FFFF','#FF006E','#0A0A0A'], type: 'neonLines' },
    { id: 11, title: 'Fractal Pattern',      category: 'abstract',  tags: ['fractal','pattern','math'],         colors: ['#7400B8','#6930C3','#5390D9','#48BFE3'], type: 'fractal' },
    { id: 12, title: 'Liquid Metal',         category: 'abstract',  tags: ['metal','liquid','chrome'],          colors: ['#C0C0C0','#808080','#A9A9A9','#2F2F2F'], type: 'liquidMetal' },

    // ── Space ──
    { id: 13, title: 'Milky Way',            category: 'space',     tags: ['stars','galaxy','night'],           colors: ['#0D0221','#190A3A','#7B2FF7','#C471F5'], type: 'milkyway' },
    { id: 14, title: 'Nebula',               category: 'space',     tags: ['nebula','cosmos','color'],          colors: ['#FF006E','#8338EC','#3A86FF','#0B0020'], type: 'nebula' },
    { id: 15, title: 'Black Hole',           category: 'space',     tags: ['black hole','gravity','ring'],      colors: ['#000000','#FF6B00','#FFD700','#1A0500'], type: 'blackhole' },
    { id: 16, title: 'Star Field',           category: 'space',     tags: ['stars','field','deep'],             colors: ['#0D0221','#1A0A3E','#FFFFFF','#4CC9F0'], type: 'starfield' },
    { id: 17, title: 'Saturn',               category: 'space',     tags: ['planet','rings','saturn'],          colors: ['#DAA520','#CD853F','#0D0221','#191970'], type: 'saturn' },
    { id: 18, title: 'Solar Flare',          category: 'space',     tags: ['sun','flare','fire'],               colors: ['#FF4500','#FF6347','#FFD700','#0A0A0A'], type: 'solarFlare' },

    // ── Nature ──
    { id: 19, title: 'Mountain Ridge',       category: 'nature',    tags: ['mountains','ridge','landscape'],    colors: ['#2D3436','#636E72','#DFE6E9','#74B9FF'], type: 'mountains' },
    { id: 20, title: 'Misty Forest',         category: 'nature',    tags: ['forest','fog','trees'],             colors: ['#1B4332','#2D6A4F','#40916C','#B7E4C7'], type: 'forest' },
    { id: 21, title: 'Seashore',             category: 'nature',    tags: ['sea','shore','waves'],              colors: ['#0077B6','#48CAE4','#F4D35E','#EE6C4D'], type: 'seashore' },
    { id: 22, title: 'Sunrise',              category: 'nature',    tags: ['sunrise','morning','sky'],          colors: ['#FF7E5F','#FEB47B','#86A8E7','#1A1A2E'], type: 'sunrise' },
    { id: 23, title: 'Flower Field',         category: 'nature',    tags: ['flowers','field','spring'],         colors: ['#FF69B4','#FFB347','#77DD77','#2E8B57'], type: 'flowers' },
    { id: 24, title: 'Waterfall',            category: 'nature',    tags: ['waterfall','water','rocks'],        colors: ['#1B4332','#48CAE4','#FFFFFF','#2D3436'], type: 'waterfall' },

    // ── Minimal ──
    { id: 25, title: 'Circle & Line',        category: 'minimal',   tags: ['circle','line','simplicity'],       colors: ['#FFFFFF','#000000','#E63946','#F1FAEE'], type: 'circleLine' },
    { id: 26, title: 'Monochrome',           category: 'minimal',   tags: ['black-white','monochrome','clean'], colors: ['#FAFAFA','#333333','#666666','#CCCCCC'], type: 'monochrome' },
    { id: 27, title: 'Dots',                 category: 'minimal',   tags: ['dots','pattern','rhythm'],          colors: ['#F8F9FA','#212529','#6C757D','#ADB5BD'], type: 'dots' },
    { id: 28, title: 'Zen',                  category: 'minimal',   tags: ['zen','calm','balance'],             colors: ['#F5F5DC','#8B4513','#228B22','#4A4A4A'], type: 'zen' },
    { id: 29, title: 'Pastel Blocks',        category: 'minimal',   tags: ['pastel','blocks','soft'],           colors: ['#FFDDD2','#E29578','#006D77','#83C5BE'], type: 'pastelBlock' },
    { id: 30, title: 'Line Rhythm',          category: 'minimal',   tags: ['lines','rhythm','pattern'],         colors: ['#F8F9FA','#1D3557','#E63946','#A8DADC'], type: 'lineRhythm' },

    // ── Dark ──
    { id: 31, title: 'Carbon Fiber',         category: 'dark',      tags: ['carbon','texture','dark'],          colors: ['#1A1A1A','#2D2D2D','#404040','#0D0D0D'], type: 'carbon' },
    { id: 32, title: 'Neon City',            category: 'dark',      tags: ['neon','city','night'],              colors: ['#0A0A0A','#FF006E','#00FFFF','#7B2FF7'], type: 'neonCity' },
    { id: 33, title: 'Dark Smoke',           category: 'dark',      tags: ['smoke','dark','mystic'],            colors: ['#0D0D0D','#1A1A2E','#4A4A8A','#2D2D4E'], type: 'darkSmoke' },
    { id: 34, title: 'Matrix',               category: 'dark',      tags: ['matrix','code','green'],            colors: ['#000000','#003B00','#00FF41','#008F11'], type: 'matrix' },
    { id: 35, title: 'Dark Granite',         category: 'dark',      tags: ['granite','stone','texture'],        colors: ['#1C1C1C','#2E2E2E','#3D3D3D','#4F4F4F'], type: 'granite' },
    { id: 36, title: 'Midnight Blues',       category: 'dark',      tags: ['midnight','blue','jazz'],           colors: ['#0A0E27','#141B41','#1B2CC1','#0D47A1'], type: 'midnightBlue' },
  ];
}

app.listen(PORT, () => {
  console.log(`\n  WallpaperHub is running\n  http://localhost:${PORT}\n`);
});
