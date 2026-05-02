Recording a demo video (automated)
=================================

This project includes a small Puppeteer script to capture an automated demo of the running Next.js site. The script captures a sequence of screenshots and you then convert them into a video using `ffmpeg`.

Steps
-----

1. Install dev dependencies (if you haven't already):

```bash
npm install
```

2. Start your dev server (default port 3001 used by the recorder):

```bash
npm run dev -- --hostname 0.0.0.0 --port 3001
```

3. Run the recorder (adjust duration/fps/URL as needed):

```bash
npm run record-demo -- --url=http://localhost:3001 --duration=12 --fps=15
```

This writes PNG frames to `artifacts/demo-frames`.

4. Convert frames to MP4 using `ffmpeg`:

```bash
ffmpeg -framerate 15 -i artifacts/demo-frames/frame-%05d.png -c:v libx264 -pix_fmt yuv420p artifacts/demo.mp4
```

Notes
-----
- Puppeteer will download a compatible Chromium. If you prefer to use your system Chrome, set `PUPPETEER_EXECUTABLE_PATH` environment variable.
- On Windows, run `npm install` in an elevated PowerShell if you hit permission issues.
- If you want a smoother / higher-res video, increase `fps` and `duration`.
