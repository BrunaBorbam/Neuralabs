'use client';

/**
 * Elemento 3D decorativo da demo CERNE — v2. A primeira versão (anéis de
 * crescimento concêntricos) foi substituída porque o mesmo motivo — "anéis
 * concêntricos reagindo ao mouse" — já tinha sido usado no site da própria
 * NEURALABS (esfera + anel) e na Villa Serena (ondulação em SVG). Ver
 * docs/IDENTIDADES-E-EFEITOS.md: esse motivo está marcado como esgotado.
 *
 * Nova assinatura: uma cadeira de encomenda em wireframe — um objeto real
 * do ofício da marcenaria, não uma forma abstrata. Lê como "planta técnica
 * flutuante", reforçando a mensagem de "projeto técnico antes do corte"
 * (ver seção "Processo" da própria página). Drift lento por mouse, sem
 * transmission. Só monta em desktop e só roda o frameloop quando visível —
 * mesmo padrão de HeroScene3D.tsx, adaptado à paleta Linho & Musgo.
 */

import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const LEG_POSITIONS: [number, number, number][] = [
  [0.46, -0.42, 0.46],
  [-0.46, -0.42, 0.46],
  [0.46, -0.42, -0.46],
  [-0.46, -0.42, -0.46],
];

const SLAT_X_OFFSETS = [-0.36, -0.12, 0.12, 0.36];

function WireframeChair() {
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
    // Giro lento e constante — "peça no torno" — mais o drift por mouse.
    group.current.rotation.y = t * 0.12 + target.current.x * 0.35;
    group.current.rotation.x += (-target.current.y * 0.12 - group.current.rotation.x) * 0.02;
  });

  const scale = Math.min(viewport.width / 3.6, 1.75);

  return (
    <group ref={group} scale={scale} rotation={[0.15, 0.5, 0]}>
      {/* Assento */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.05, 0.07, 1.0]} />
        <meshBasicMaterial color="#6B7A4E" wireframe />
      </mesh>
      {/* Encosto — réguas verticais, como o encosto ripado de uma cadeira
          de marcenaria real, não um painel liso */}
      {SLAT_X_OFFSETS.map((x) => (
        <mesh key={x} position={[x, 0.62, -0.46]}>
          <boxGeometry args={[0.09, 1.15, 0.06]} />
          <meshBasicMaterial color="#9CAE7A" wireframe />
        </mesh>
      ))}
      <mesh position={[0, 1.1, -0.46]}>
        <boxGeometry args={[1.0, 0.09, 0.07]} />
        <meshBasicMaterial color="#9CAE7A" wireframe />
      </mesh>
      {/* Pernas */}
      {LEG_POSITIONS.map((pos) => (
        <mesh key={pos.join(',')} position={pos}>
          <cylinderGeometry args={[0.035, 0.045, 0.85, 8]} />
          <meshBasicMaterial color="#576141" wireframe />
        </mesh>
      ))}
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
    <div ref={wrapperRef} aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-[0.6]">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
        frameloop={isVisible ? 'always' : 'never'}
      >
        <ambientLight intensity={0.8} />
        <WireframeChair />
      </Canvas>
    </div>
  );
};
