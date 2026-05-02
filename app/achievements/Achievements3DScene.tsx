"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingShape({
  geometry,
  position,
  color,
  scale = 1,
  speed = 1,
  distort = 0.2,
  floatIntensity = 0.6,
  rotationSpeed = 0.3,
}: {
  geometry: React.ReactNode;
  position: [number, number, number];
  color: string;
  scale?: number;
  speed?: number;
  distort?: number;
  floatIntensity?: number;
  rotationSpeed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x += delta * rotationSpeed * 0.5;
      ref.current.rotation.y += delta * rotationSpeed;
    }
  });

  return (
    <Float
      speed={speed}
      rotationIntensity={0.4}
      floatIntensity={floatIntensity}
      floatingRange={[-0.3, 0.3]}
    >
      <mesh ref={ref} position={position} scale={scale}>
        {geometry}
        <MeshDistortMaterial
          color={color}
          distort={distort}
          speed={speed * 1.5}
          roughness={0.25}
          metalness={0.5}
          transparent
          opacity={0.75}
        />
      </mesh>
    </Float>
  );
}

function AwardTrophy() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
    }
  });

  return (
    <group ref={groupRef} position={[2.2, 0.3, -1.5]} scale={0.55}>
      {/* Trophy cup body - inverted cone */}
      <Float speed={1.2} floatIntensity={0.5} rotationIntensity={0.2}>
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.35, 0.15, 0.6, 8]} />
          <MeshDistortMaterial color="#00e5ff" distort={0.15} speed={1.8} roughness={0.2} metalness={0.6} transparent opacity={0.8} />
        </mesh>
      </Float>
      {/* Trophy handles */}
      <Float speed={1.4} floatIntensity={0.4} rotationIntensity={0.15}>
        <mesh position={[-0.45, 0.7, 0]} rotation={[0, 0, Math.PI / 6]}>
          <torusGeometry args={[0.18, 0.04, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#4a90e8" roughness={0.3} metalness={0.7} transparent opacity={0.75} />
        </mesh>
      </Float>
      <Float speed={1.4} floatIntensity={0.4} rotationIntensity={0.15}>
        <mesh position={[0.45, 0.7, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <torusGeometry args={[0.18, 0.04, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#4a90e8" roughness={0.3} metalness={0.7} transparent opacity={0.75} />
        </mesh>
      </Float>
      {/* Trophy base */}
      <Float speed={1} floatIntensity={0.3} rotationIntensity={0.1}>
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.25, 0.3, 0.25, 8]} />
          <meshStandardMaterial color="#ffc832" roughness={0.25} metalness={0.65} transparent opacity={0.85} />
        </mesh>
      </Float>
      {/* Star on top */}
      <Float speed={2} floatIntensity={0.8} rotationIntensity={0.6}>
        <mesh position={[0, 1.15, 0]}>
          <octahedronGeometry args={[0.15, 0]} />
          <MeshDistortMaterial color="#ffd700" distort={0.3} speed={2} roughness={0.15} metalness={0.8} emissive="#ffd700" emissiveIntensity={0.3} />
        </mesh>
      </Float>
    </group>
  );
}

function FloatingParticles() {
  const count = 60;
  const meshRef = useRef<THREE.InstancedMesh>(null!);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 6 - 3,
        ] as [number, number, number],
        scale: Math.random() * 0.04 + 0.01,
        speed: Math.random() * 0.3 + 0.1,
        phase: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.elapsedTime;
    particles.forEach((p, i) => {
      dummy.position.set(
        p.position[0] + Math.sin(t * p.speed + p.phase) * 0.3,
        p.position[1] + Math.cos(t * p.speed * 0.7 + p.phase) * 0.2,
        p.position[2]
      );
      dummy.scale.setScalar(p.scale * (1 + Math.sin(t * 2 + p.phase) * 0.3));
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial color="#00e5ff" transparent opacity={0.35} emissive="#00e5ff" emissiveIntensity={0.5} />
    </instancedMesh>
  );
}

function OrbitRings() {
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);
  const ring3 = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    if (ring1.current) ring1.current.rotation.x += delta * 0.15;
    if (ring1.current) ring1.current.rotation.y += delta * 0.25;
    if (ring2.current) ring2.current.rotation.x -= delta * 0.2;
    if (ring2.current) ring2.current.rotation.z += delta * 0.15;
    if (ring3.current) ring3.current.rotation.y -= delta * 0.18;
    if (ring3.current) ring3.current.rotation.x += delta * 0.12;
  });

  return (
    <group position={[-3, 0.5, -2]}>
      <mesh ref={ring1}>
        <torusGeometry args={[1.6, 0.008, 8, 64]} />
        <meshStandardMaterial color="#00e5ff" transparent opacity={0.25} emissive="#00e5ff" emissiveIntensity={0.4} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[1.3, 0.006, 8, 48]} />
        <meshStandardMaterial color="#4a90e8" transparent opacity={0.2} emissive="#4a90e8" emissiveIntensity={0.3} />
      </mesh>
      <mesh ref={ring3} rotation={[0, Math.PI / 4, Math.PI / 6]}>
        <torusGeometry args={[2.0, 0.005, 8, 48]} />
        <meshStandardMaterial color="#a078ff" transparent opacity={0.15} emissive="#a078ff" emissiveIntensity={0.25} />
      </mesh>
    </group>
  );
}

export default function Achievements3DScene() {
  return (
    <div className="ach-3d-scene" aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 4, 2]} intensity={0.9} color="#ffffff" />
        <pointLight position={[-2, 3, 1]} intensity={0.5} color="#00e5ff" />
        <pointLight position={[2, -2, -1]} intensity={0.3} color="#4a90e8" />

        <FloatingShape
          geometry={<icosahedronGeometry args={[0.6, 0]} />}
          position={[-3.5, 1.2, -1]}
          color="#00e5ff"
          scale={0.9}
          speed={0.8}
          distort={0.25}
          floatIntensity={0.5}
          rotationSpeed={0.4}
        />
        <FloatingShape
          geometry={<octahedronGeometry args={[0.5, 0]} />}
          position={[3.2, -0.8, -2]}
          color="#4a90e8"
          scale={1.1}
          speed={1.1}
          distort={0.18}
          floatIntensity={0.7}
          rotationSpeed={0.5}
        />
        <FloatingShape
          geometry={<torusGeometry args={[0.35, 0.12, 8, 24]} />}
          position={[-1.5, -1.5, -1.5]}
          color="#a078ff"
          scale={0.8}
          speed={0.9}
          distort={0.15}
          floatIntensity={0.4}
          rotationSpeed={0.6}
        />
        <FloatingShape
          geometry={<tetrahedronGeometry args={[0.45, 0]} />}
          position={[1.8, 1.5, -0.5]}
          color="#00d4aa"
          scale={0.7}
          speed={1.3}
          distort={0.3}
          floatIntensity={0.8}
          rotationSpeed={0.7}
        />
        <FloatingShape
          geometry={<dodecahedronGeometry args={[0.4, 0]} />}
          position={[-2.8, -0.5, -2.5]}
          color="#64c8ff"
          scale={0.6}
          speed={1.0}
          distort={0.2}
          floatIntensity={0.5}
          rotationSpeed={0.35}
        />
        <FloatingShape
          geometry={<sphereGeometry args={[0.3, 16, 16]} />}
          position={[0.5, 2.0, -1.8]}
          color="#ffc832"
          scale={1.0}
          speed={1.5}
          distort={0.35}
          floatIntensity={0.9}
          rotationSpeed={0.2}
        />

        <AwardTrophy />
        <FloatingParticles />
        <OrbitRings />
      </Canvas>
    </div>
  );
}
