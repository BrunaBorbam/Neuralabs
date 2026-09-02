'use client';

import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Sphere, Torus } from '@react-three/drei';
import * as THREE from 'three';

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

    group.current.position.y = Math.sin(t * 0.4) * 0.18;
    group.current.rotation.z = Math.sin(t * 0.25) * 0.12;
    group.current.rotation.y += (target.current.x * 0.4 - group.current.rotation.y) * 0.02;
    group.current.rotation.x += (-target.current.y * 0.25 - group.current.rotation.x) * 0.02;
  });

  // Sized to bleed past the mockup panel's edges (see Hero.tsx's bleed
  // container) rather than fill it — the panel's opaque card covers the
  // center, so only the sphere's rim shows, as an ambient accent instead
  // of a disc sitting on top of the villa photo.
  const scale = Math.min(viewport.width / 4.5, 1.85);

  return (
    <group ref={group} scale={scale}>
      <Sphere args={[1, 64, 64]}>
        <meshPhysicalMaterial
          color="#D8C2B8"
          roughness={0.2}
          metalness={0.05}
          transmission={0.95}
          opacity={0.35}
          transparent
        />
      </Sphere>
      <Torus args={[1.65, 0.01, 16, 100]} rotation={[Math.PI / 2.4, 0, 0]}>
        <meshStandardMaterial color="#FAF7F2" emissive="#A89084" emissiveIntensity={0.3} />
      </Torus>
    </group>
  );
}

export const HeroScene3D = () => {
  return (
    <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-80">
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
