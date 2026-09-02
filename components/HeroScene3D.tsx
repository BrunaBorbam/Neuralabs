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

  const scale = Math.min(viewport.width / 6, 1.3);

  return (
    <group ref={group} scale={scale}>
      <Sphere args={[1, 64, 64]}>
        <meshPhysicalMaterial
          color="#D8C2B8"
          roughness={0.15}
          metalness={0.1}
          transmission={0.9}
          opacity={0.7}
        />
      </Sphere>
      <Torus args={[1.65, 0.012, 16, 100]} rotation={[Math.PI / 2.4, 0, 0]}>
        <meshStandardMaterial color="#FAF7F2" emissive="#A89084" emissiveIntensity={0.4} />
      </Torus>
    </group>
  );
}

export const HeroScene3D = () => {
  return (
    <div
      className="absolute inset-0 z-10 pointer-events-none"
      style={{ background: 'radial-gradient(circle at 50% 50%, rgba(216,194,184,0.15) 0%, transparent 70%)' }}
    >
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={1.0} />
        <pointLight position={[3, 2, 4]} intensity={1.5} color="#D8C2B8" />
        <pointLight position={[-3, -2, 2]} intensity={0.8} color="#FAF7F2" />
        <DriftingGlass />
      </Canvas>
    </div>
  );
};
