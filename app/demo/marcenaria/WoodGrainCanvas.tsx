'use client';

import { useEffect, useRef } from 'react';

export default function WoodGrainCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let time = 0;
    let animationFrameId: number;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = 1;
      
      const lines = 40; // Quantidade de "anéis"
      const spacing = height / lines;
      
      for (let i = 0; i < lines; i++) {
        ctx.beginPath();
        
        // Cor baseada na marca "Luxo Silencioso" da CERNE
        ctx.strokeStyle = `rgba(107, 122, 78, ${0.03 + (i / lines) * 0.05})`; 
        
        for (let x = 0; x < width; x += 20) {
          // Fórmula matemática complexa para simular anéis/veios de madeira cortados
          const nx = x * 0.002;
          const ny = i * 0.05;
          const noise = Math.sin(nx * 3 + time * 0.2) * Math.cos(ny * 2 + nx) * 50;
          const y = (i * spacing) + noise + (Math.sin(x * 0.001 + time * 0.1) * 20);
          
          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }
      
      time += 0.01;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="pointer-events-none absolute inset-0 z-0 h-full w-full mix-blend-multiply opacity-50" 
    />
  );
}
