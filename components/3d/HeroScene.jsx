"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, OrbitControls, MeshDistortMaterial } from "@react-three/drei";

function LowPolySphere() {
  const ref = useRef(null);
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.25;
  });

  return (
    <Float rotationIntensity={0.6} floatIntensity={0.9} speed={1.1}>
      <mesh ref={ref} position={[0, 0, 0]}>
        <sphereGeometry args={[1.2, 16, 12]} />
        <MeshDistortMaterial color="#00d8ff" distort={0.22} speed={1.05} roughness={0.28} metalness={0.55} />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="hero-3d-scene" aria-hidden="true">
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 4], fov: 45 }}>
        <ambientLight intensity={0.45} />
        <directionalLight position={[4, 4, 2]} intensity={1.1} />
        <Suspense fallback={null}>
          <LowPolySphere />
        </Suspense>
        <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      </Canvas>
    </div>
  );
}
