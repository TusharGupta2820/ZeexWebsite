const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');

async function record({url='http://localhost:3001', duration=12, fps=15, outDir='artifacts/demo-frames', width=1920, height=768}){
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
  else {
    // clear existing frames
    fs.readdirSync(outDir).forEach(f => fs.unlinkSync(path.join(outDir,f)));
  }

  const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  console.log('Opening', url);
  await page.goto(url, { waitUntil: 'networkidle2' });

  // give page a small warm-up for animations
  await page.waitForTimeout(800);

  const interval = Math.round(1000 / fps);
  const frames = Math.floor((duration * 1000) / interval);
  console.log(`Recording ${frames} frames @ ${fps}fps (~${duration}s)`);

  for (let i = 0; i < frames; i++){
    const file = path.join(outDir, `frame-${String(i).padStart(5,'0')}.png`);
    await page.screenshot({ path: file, clip: { x:0,y:0,width,height } });
    if (i % 50 === 0) console.log(`Captured ${i}/${frames}`);
    await page.waitForTimeout(interval);
  }

  await browser.close();
  console.log('Frames saved to', outDir);
  console.log('Run: ffmpeg -framerate', fps, '-i', path.join(outDir,'frame-%05d.png'), '-c:v libx264 -pix_fmt yuv420p artifacts/demo.mp4');
}

const argv = require('minimist')(process.argv.slice(2));
record({
  url: argv.url || process.env.DEV_URL || 'http://localhost:3001',
  duration: Number(argv.duration || 12),
  fps: Number(argv.fps || 15),
  outDir: argv.outDir || 'artifacts/demo-frames',
  width: Number(argv.width || 1920),
  height: Number(argv.height || 768)
}).catch(err => { console.error(err); process.exit(1); });
