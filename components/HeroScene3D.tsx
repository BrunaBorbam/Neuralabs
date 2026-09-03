'use client';

import { useEffect, useRef, useState } from 'react';
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
      {/* No `transmission`: real-time refraction is the single most expensive
          effect a WebGL scene can do (it forces a render-to-texture pass of
          everything behind the sphere, every frame, forever, for as long as
          this Canvas is mounted). Only the sphere's rim is ever actually
          visible — the opaque mockup panel covers the center — so a plain
          transparent material reads the same to the eye at a fraction of
          the GPU cost. */}
      <Sphere args={[1, 64, 64]}>
        <meshPhysicalMaterial
          color="#D8C2B8"
          roughness={0.25}
          metalness={0.05}
          opacity={0.22}
          transparent
        />
      </Sphere>
      <Torus args={[1.65, 0.01, 16, 100]} rotation={[Math.PI / 2.4, 0, 0]}>
        <meshStandardMaterial color="#FAF7F2" emissive="#A89084" emissiveIntensity={0.4} />
      </Torus>
    </group>
  );
}

export const HeroScene3D = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Without this, R3F's Canvas defaults to frameloop="always": a
  // requestAnimationFrame loop that renders this WebGL scene 60x/second
  // forever, for as long as the component stays mounted — including every
  // second the visitor has scrolled the Hero (and this sphere) far out of
  // view to read Pricing or fill out Contato. Gate it on actual visibility
  // instead: rootMargin gives it a viewport-height of lead-in so it's
  // already rendering by the time the Hero scrolls back into view, not
  // popping in a frame late.
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
    <div ref={wrapperRef} aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-80">
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 40 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
        frameloop={isVisible ? 'always' : 'never'}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[3, 2, 4]} intensity={0.8} color="#D8C2B8" />
        <DriftingGlass />
      </Canvas>
    </div>
  );
};
