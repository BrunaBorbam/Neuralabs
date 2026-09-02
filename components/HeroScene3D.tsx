'use client';

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { MeshDistortMaterial, Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Ambient 3D proof-of-capability piece for the main Neuralabs Hero.
 * Renders behind the existing HeroStudioMockup panel — a slow-drifting
 * glass sphere orbited by a thin ring, reacting subtly to the pointer.
 * Kept intentionally quiet (no bloom, no fast motion): the site sells a
 * "padrão de luxo", so this proves the 3D/motion capability without
 * competing with the copy or the CTA for attention.
 */

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function DriftingGlass() {
  const group = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      target.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      target.current.y = (event.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime();

    // Gentle continuous drift, independent of pointer input.
    group.current.position.y = Math.sin(t * 0.4) * 0.18;
    group.current.rotation.z = Math.sin(t * 0.25) * 0.12;

    // Soft parallax toward the pointer — eased, never snappy.
    group.current.rotation.y += (target.current.x * 0.4 - group.current.rotation.y) * 0.02;
    group.current.rotation.x += (-target.current.y * 0.25 - group.current.rotation.x) * 0.02;
  });

  const scale = Math.min(viewport.width / 6, 1.3);

  return (
    <group ref={group} scale={scale}>
      <Sphere args={[1, 64, 64]}>
        <MeshDistortMaterial
          color="#D8C2B8"
          roughness={0.15}
          metalness={0.1}
          transparent
          opacity={0.22}
          distort={0.28}
          speed={1.1}
        />
      </Sphere>
      <Torus args={[1.65, 0.012, 16, 100]} rotation={[Math.PI / 2.4, 0, 0]}>
        <meshBasicMaterial color="#FAF7F2" transparent opacity={0.35} />
      </Torus>
    </group>
  );
}

export const HeroScene3D = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(REDUCED_MOTION_QUERY);
    setEnabled(!mql.matches);
    const handleChange = () => setEnabled(!mql.matches);
    mql.addEventListener('change', handleChange);
    return () => mql.removeEventListener('change', handleChange);
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 opacity-80"
    >
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[3, 2, 4]} intensity={0.8} color="#D8C2B8" />
        <DriftingGlass />
      </Canvas>
    </div>
  );
};
