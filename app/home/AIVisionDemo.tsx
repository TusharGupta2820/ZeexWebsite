"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";

const INPUT_PATHS = ["/assets/input1.png", "/assets/input2.png", "/assets/input3.png"];

export default function AIVisionDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const threeMountRef = useRef<HTMLDivElement>(null);
  const camWrapRef = useRef<HTMLDivElement>(null);
  const beamLeftRef = useRef<HTMLDivElement>(null);
  const beamRightRef = useRef<HTMLDivElement>(null);
  const camStatusRef = useRef<HTMLDivElement>(null);
  const camLedRef = useRef<SVGCircleElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const dashVideoRef = useRef<HTMLVideoElement>(null);
  const dashVideoContainerRef = useRef<HTMLDivElement>(null);
  const feedBox0Ref = useRef<HTMLDivElement>(null);
  const feedBox1Ref = useRef<HTMLDivElement>(null);
  const feedBox2Ref = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgPreviewRef = useRef<HTMLImageElement>(null);
  const imgCanvasRef = useRef<HTMLCanvasElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const setModelFacingRef = useRef<(dir: string, opts?: { duration?: number }) => Promise<void>>(
    () => Promise.resolve()
  );
  const modelFacingReadyRef = useRef(false);

  const [selectedFeed, setSelectedFeed] = useState(0);

  const feedBoxRefs = [feedBox0Ref, feedBox1Ref, feedBox2Ref];

  // ── Three.js camera setup ──
  useEffect(() => {
    const mount = threeMountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 1.0, 3.2);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);
    scene.add(new THREE.AmbientLight(0xffffff, 0.45));

    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x0e2229,
      metalness: 0.3,
      roughness: 0.35,
    });
    const accentMat = new THREE.MeshStandardMaterial({
      color: 0x00bfe0,
      metalness: 0.1,
      roughness: 0.4,
      emissive: 0x003344,
      emissiveIntensity: 0.08,
    });
    const lensMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a5b86,
      metalness: 0.05,
      roughness: 0.05,
      clearcoat: 0.6,
      reflectivity: 0.6,
      ior: 1.3,
    });

    const group = new THREE.Group();
    let modelToAnimate: THREE.Object3D = group;

    const housing = new THREE.Mesh(new THREE.BoxGeometry(2.4, 1.0, 1.0, 4, 1, 1), bodyMat);
    housing.rotation.y = 0.03;
    group.add(housing);

    const stripe = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.06, 1.02), accentMat);
    stripe.position.set(0, -0.28, 0);
    group.add(stripe);

    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.14, 0.5), bodyMat);
    arm.position.set(-1.35, -0.4, 0);
    arm.rotation.z = -0.28;
    group.add(arm);

    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.95, 32), bodyMat);
    barrel.rotation.z = Math.PI / 2;
    barrel.position.set(1.0, 0, 0);
    group.add(barrel);

    const lens = new THREE.Mesh(new THREE.SphereGeometry(0.33, 32, 16), lensMat);
    lens.position.set(1.45, 0, 0);
    group.add(lens);

    scene.add(group);

    try {
      const loader = new GLTFLoader();
      loader.load(
        "/assets/surveillance-cctv-camera/source/surveillance_camera.glb",
        (gltf) => {
          try {
            scene.remove(group);
          } catch (e) {}
          const loaded = gltf.scene || (gltf.scenes && gltf.scenes[0]);
          if (loaded) {
            const box = new THREE.Box3().setFromObject(loaded);
            const size = new THREE.Vector3();
            box.getSize(size);
            const center = new THREE.Vector3();
            box.getCenter(center);
            const maxDim = Math.max(size.x, size.y, size.z) || 1;
            const desired = 1.8;
            const s = desired / maxDim;
            loaded.scale.setScalar(s);
            loaded.position.sub(center.multiplyScalar(s));
            scene.add(loaded);
            modelToAnimate = loaded;
            camera.position.set(0, Math.max(0.6, size.y * s), Math.max(1.8, maxDim * s * 1.6));
            camera.lookAt(new THREE.Vector3(0, 0, 0));
          }
        },
        undefined,
        (err) => {
          console.warn("GLTF load failed, using procedural model", err);
        }
      );
    } catch (e) {
      console.warn("GLTF loader not available", e);
    }

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableRotate = true;
    controls.autoRotate = false;
    controls.autoRotateSpeed = 0.6;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;

    if (camWrapRef.current) {
      camWrapRef.current.style.transformStyle = "preserve-3d";
      camWrapRef.current.style.perspective = "900px";
    }

    let time = 0;
    let animId: number;

    function onResize() {
      const rect = mount!.getBoundingClientRect();
      const w = Math.max(64, Math.floor(rect.width));
      const h = Math.max(48, Math.floor(rect.height));
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    }

    window.addEventListener("resize", onResize);
    onResize();

    function animate() {
      time += 0.01;
      if (modelToAnimate) {
        modelToAnimate.rotation.x = Math.sin(time * 0.35) * 0.02;
      }
      controls.update();
      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    }
    animate();

    const radToDeg = 180 / Math.PI;
    setModelFacingRef.current = (dir, opts = {}) => {
      let target = 0;
      if (dir === "right") target = 0.7;
      else if (dir === "left") target = -0.7;

      return new Promise<void>((resolve) => {
        if (!modelToAnimate) return resolve();
        gsap.to(modelToAnimate.rotation, {
          y: target,
          duration: opts.duration || 0.8,
          ease: "power2.out",
          onComplete: () => {
            try {
              if (camWrapRef.current) {
                camWrapRef.current.style.transform = `rotateY(${(target * radToDeg).toFixed(2)}deg)`;
              }
            } catch (e) {}
            resolve();
          },
        });
      });
    };
    modelFacingReadyRef.current = true;

    return () => {
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);
      controls.dispose();
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  // ── Particle helper ──
  const spawnParticles = useCallback(
    (n: number, fromRect: DOMRect, toRect: DOMRect, onComplete?: () => void) => {
      const container = particlesRef.current;
      if (!container) return;
      for (let i = 0; i < n; i++) {
        const p = document.createElement("div");
        p.className = "data-particle";
        p.style.left = fromRect.left + fromRect.width / 2 + "px";
        p.style.top = fromRect.top + fromRect.height / 2 + "px";
        p.style.opacity = "0";
        container.appendChild(p);

        const endX = toRect.left + 10 + Math.random() * 10;
        const endY = toRect.top + (Math.random() - 0.5) * 60 + toRect.height / 2;
        gsap.fromTo(
          p,
          { opacity: 0, x: 0, y: 0, scale: 1 },
          {
            opacity: 1,
            x: endX - (fromRect.left + fromRect.width / 2),
            y: endY - (fromRect.top + fromRect.height / 2),
            duration: 0.6 + Math.random() * 0.2,
            ease: "power2.in",
            delay: i * 0.08,
            onComplete: () => {
              gsap.to(p, {
                scale: 2.5,
                opacity: 0,
                duration: 0.36,
                onComplete: () => p.remove(),
              });
            },
          }
        );
      }
      if (onComplete) gsap.delayedCall(0.9 + n * 0.08, onComplete);
    },
    []
  );

  // ── Feed box interactions ──
  useEffect(() => {
    const cleanupFns: Array<() => void> = [];

    feedBoxRefs.forEach((ref, i) => {
      const fb = ref.current;
      if (!fb) return;

      const handleClick = () => {
        feedBoxRefs.forEach((r) => r.current?.classList.remove("selected"));
        fb.classList.add("selected");
        setSelectedFeed(i);
        fileInputRef.current?.click();
      };
      fb.addEventListener("click", handleClick);
      cleanupFns.push(() => fb.removeEventListener("click", handleClick));

      const btn = fb.querySelector(".useBtn") as HTMLElement | null;
      if (btn) {
        const handleBtn = (ev: Event) => {
          ev.stopPropagation();
          const img = fb.querySelector("img") as HTMLImageElement | null;
          if (img && imgPreviewRef.current) {
            imgPreviewRef.current.src = img.src;
          }
        };
        btn.addEventListener("click", handleBtn);
        cleanupFns.push(() => btn.removeEventListener("click", handleBtn));
      }
    });

    return () => cleanupFns.forEach((fn) => fn());
  }, []);

  // ── File upload ──
  useEffect(() => {
    const input = fileInputRef.current;
    if (!input) return;
    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const file = target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        const dataUrl = ev.target?.result as string;
        const box = feedBoxRefs[selectedFeed].current;
        if (box) {
          box.querySelector(".placeholder")?.remove();
          box.querySelector("img")?.remove();
          const thumb = document.createElement("img");
          thumb.src = dataUrl;
          box.appendChild(thumb);
          const btn = box.querySelector(".useBtn") as HTMLElement;
          if (btn) btn.classList.remove("hidden");
        }
      };
      reader.readAsDataURL(file);
      target.value = "";
    };
    input.addEventListener("change", handleChange);
    return () => input.removeEventListener("change", handleChange);
  }, [selectedFeed]);

  // ── Init thumbnails ──
  useEffect(() => {
    feedBoxRefs.forEach((ref, i) => {
      const fb = ref.current;
      if (!fb) return;
      fb.querySelector(".placeholder")?.remove();
      fb.querySelector("img")?.remove();
      const thumb = document.createElement("img");
      thumb.src = INPUT_PATHS[i];
      thumb.style.opacity = "1";
      fb.appendChild(thumb);
      const btn = fb.querySelector(".useBtn") as HTMLElement;
      if (btn) btn.classList.add("hidden");
    });
    feedBoxRefs[0].current?.classList.add("selected");
  }, []);

  // ── Auto cycle ──
  useEffect(() => {
    let cancelled = false;
    const dashVideo = dashVideoRef.current;

    async function sleep(ms: number) {
      return new Promise<void>((res) => setTimeout(res, ms));
    }

    async function faceTo(dir: string, duration = 0.8) {
      const degMap: Record<string, number> = { right: 35, left: -35, center: 0 };
      const camDeg = degMap[dir] ?? 0;
      const p1 = setModelFacingRef.current(dir, { duration });
      const p2 = new Promise<void>((res) => {
        if (camWrapRef.current) {
          gsap.to(camWrapRef.current, { rotationY: camDeg, duration, ease: "power2.out", onComplete: res });
        } else {
          res();
        }
      });
      await Promise.all([p1, p2]);
    }

    async function runAutoCycle() {
      while (!cancelled) {
        await faceTo("right", 0.7);
        if (camStatusRef.current) camStatusRef.current.textContent = "INGESTING...";

        for (let i = 0; i < feedBoxRefs.length; i++) {
          const fb = feedBoxRefs[i].current;
          if (!fb) continue;
          const img = fb.querySelector("img") as HTMLImageElement | null;
          if (!img) continue;
          const fromRect = fb.getBoundingClientRect();
          const camRect = camWrapRef.current?.getBoundingClientRect();
          if (camRect) spawnParticles(8, fromRect, camRect);
          gsap.to(img, { opacity: 0, scale: 0.9, duration: 0.6, ease: "power2.in" });
          await sleep(900);
          if (img && img.parentNode) img.parentNode.removeChild(img);
          await sleep(200);
        }

        if (camStatusRef.current) camStatusRef.current.textContent = "SENDING TO OUTPUT...";
        await faceTo("left", 0.7);
        if (camStatusRef.current) camStatusRef.current.textContent = "COMPLETE";

        const videoContainer = dashVideoContainerRef.current;
        if (videoContainer) {
          gsap.to(videoContainer, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" });
        }

        if (dashVideo) {
          try {
            dashVideo.muted = true;
            await dashVideo.play();
          } catch (e) {
            console.warn("Video play failed", e);
          }
          await new Promise<void>((res) => {
            dashVideo.onended = () => res();
          });
          dashVideo.pause();
          dashVideo.currentTime = 0;
          dashVideo.muted = false;
        } else {
          await sleep(1800);
        }

        if (videoContainer) {
          gsap.to(videoContainer, { opacity: 0, scale: 0.92, duration: 0.3 });
        }

        await faceTo("right", 0.7);
        if (camStatusRef.current) camStatusRef.current.textContent = "RELOAD INPUTS";
        feedBoxRefs.forEach((ref, i) => {
          const fb = ref.current;
          if (!fb) return;
          fb.querySelector("img")?.remove();
          const thumb = document.createElement("img");
          thumb.src = INPUT_PATHS[i];
          thumb.style.opacity = "1";
          fb.appendChild(thumb);
        });
        await sleep(800);
      }
    }

    async function startWhenReady() {
      const waitFor = async (checkFn: () => boolean, ms = 100, attempts = 50) => {
        for (let i = 0; i < attempts; i++) {
          if (checkFn()) return true;
          await sleep(ms);
        }
        return false;
      };
      const ready = await waitFor(() => modelFacingReadyRef.current, 100, 60);
      if (!ready) console.warn("setModelFacing did not become available");
      try {
        await runAutoCycle();
      } catch (e) {
        console.error("runAutoCycle error", e);
      }
    }

    startWhenReady();

    return () => {
      cancelled = true;
      gsap.killTweensOf("*");
    };
  }, [spawnParticles]);

  return (
    <div className="ai-vision-demo" ref={containerRef}>
      <div className="ai-vision-wrap">
        {/* Left – Dashboard */}
        <div className="ai-vision-col ai-vision-left">
          <div className="ai-vision-panel" id="dashPanel">
            <div id="dashHeader">
              <div className="pulse" id="dashPulse" />
            </div>
            <div id="dashVideoContainer" ref={dashVideoContainerRef} style={{ opacity: 0, transform: "scale(0.92)" }}>
              <video
                id="dashOutput"
                ref={dashVideoRef}
                playsInline
                preload="metadata"
                src="/assets/Dashboard.mp4"
                data-mode="video"
              >
                <source src="/assets/Dashboard.mp4" type="video/mp4" />
              </video>
            </div>
            <div id="detectionsList" style={{ display: "none" }} />
            <div id="statsBar" style={{ display: "none" }}>
              <div className="stat">
                <div className="num" id="statObjects">0</div>
                <div className="lbl">OBJECTS</div>
              </div>
              <div className="stat">
                <div className="num" id="statTime">0ms</div>
                <div className="lbl">PROC TIME</div>
              </div>
              <div className="stat">
                <div className="num" id="statAcc">0%</div>
                <div className="lbl">ACCURACY</div>
              </div>
            </div>
          </div>
        </div>

        {/* Center – Camera */}
        <div className="ai-vision-col ai-vision-center">
          <div
            className="ai-vision-panel"
            style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <div className="rings" aria-hidden>
              <div className="ring r1" />
              <div className="ring r2" />
              <div className="ring r3" />
            </div>
            <div id="camWrap" ref={camWrapRef}>
              <div
                id="cameraHolder"
                style={{
                  position: "relative",
                  width: "340px",
                  height: "270px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div id="camWrapInner" style={{ position: "relative" }}>
                  <div
                    id="camera3d"
                    ref={threeMountRef}
                    style={{ width: "340px", height: "270px", display: "flex", alignItems: "center", justifyContent: "center" }}
                  />
                </div>
                <div className="scan-beam beam-left" ref={beamLeftRef} style={{ left: "calc(50% - 170px)", width: 0 }} />
                <div className="scan-beam beam-right" ref={beamRightRef} style={{ left: "50%", width: 0 }} />
                <div className="scan-brackets">
                  <div className="bracket b-tl" />
                  <div className="bracket b-tr" />
                  <div className="bracket b-bl" />
                  <div className="bracket b-br" />
                </div>
                <div id="camStatus" ref={camStatusRef}>STANDBY</div>
                <svg width="14" height="14" style={{ position: "absolute", right: "8px", bottom: "8px" }}>
                  <circle id="camLed" ref={camLedRef} cx="7" cy="7" r="6" fill="#00ff88" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Right – Input */}
        <div className="ai-vision-col ai-vision-right">
          <div className="ai-vision-panel" id="inputPanel">
            <div className="feedRow" id="feedRow">
              <div className="feedBox" data-index="0" ref={feedBox0Ref}>
                <span className="placeholder">DROP IMAGE<br />OR CLICK</span>
                <button className="useBtn hidden" data-index="0">Use</button>
              </div>
              <div className="feedBox" data-index="1" ref={feedBox1Ref}>
                <span className="placeholder">DROP IMAGE<br />OR CLICK</span>
                <button className="useBtn hidden" data-index="1">Use</button>
              </div>
              <div className="feedBox" data-index="2" ref={feedBox2Ref}>
                <span className="placeholder">DROP IMAGE<br />OR CLICK</span>
                <button className="useBtn hidden" data-index="2">Use</button>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px 12px 0 12px" }}>
              <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
                Selected feed: <span>{selectedFeed + 1}</span>
              </div>
            </div>
            <input id="fileInput" type="file" accept="image/*" className="hidden" ref={fileInputRef} />
            <img id="imgPreview" alt="preview" ref={imgPreviewRef} />
            <canvas id="imgCanvas" ref={imgCanvasRef} />
          </div>
        </div>

        <div className="particles" ref={particlesRef} />
        <div className="thumbs" ref={thumbsRef} />
      </div>
    </div>
  );
}
