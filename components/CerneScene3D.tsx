'use client';

/**
 * Elemento 3D decorativo da demo CERNE — dois anéis concêntricos remetendo
 * aos anéis de crescimento da madeira ("cerne" = núcleo da árvore). Drift
 * lento por mouse, sem transmission (custo de GPU alto por pouco ganho
 * visual aqui). Só monta em desktop e só roda o frameloop quando visível —
 * mesmo padrão de HeroScene3D.tsx, adaptado à paleta Linho & Musgo.
 */

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Torus } from '@react-three/drei';
import * as THREE from 'three';

function GrowthRings() {
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
    group.current.rotation.z = t * 0.035;
    group.current.rotation.y += (target.current.x * 0.3 - group.current.rotation.y) * 0.02;
    group.current.rotation.x += (-target.current.y * 0.18 - group.current.rotation.x) * 0.02;
  });

  const scale = Math.min(viewport.width / 3.2, 1.6);

  return (
    <group ref={group} scale={scale}>
      <Torus args={[1.4, 0.012, 16, 120]} rotation={[Math.PI / 2.2, 0, 0]}>
        <meshStandardMaterial color="#6B7A4E" emissive="#6B7A4E" emissiveIntensity={0.35} />
      </Torus>
      <Torus args={[1.02, 0.012, 16, 120]} rotation={[Math.PI / 2.2, 0.15, 0]}>
        <meshStandardMaterial color="#9CAE7A" emissive="#9CAE7A" emissiveIntensity={0.3} />
      </Torus>
      <Torus args={[0.66, 0.01, 16, 100]} rotation={[Math.PI / 2.2, -0.1, 0]}>
        <meshStandardMaterial color="#576141" emissive="#576141" emissiveIntensity={0.25} />
      </Torus>
    </group>
  );
}

export const CerneScene3D = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: '100% 0px 100% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-[0.55]">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
        frameloop={isVisible ? 'always' : 'never'}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[3, 2, 4]} intensity={0.6} color="#6B7A4E" />
        <GrowthRings />
      </Canvas>
    </div>
  );
};
