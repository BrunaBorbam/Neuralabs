'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Zap, Package, RefreshCcw } from 'lucide-react';
import { Inter } from 'next/font/google';

const sans = Inter({ subsets: ['latin'], weight: ['400', '700', '900'] });

const SNEAKER_IMAGE = '/images/hero-studio/ecommerce.jpg';

// Marquee Text para o topo
const MARQUEE_TEXT = [
  'FREE WORLDWIDE SHIPPING',
  '30-DAY RETURNS',
  'LIFETIME WARRANTY',
  'SECURE CHECKOUT',
  '100% AUTHENTIC',
];

export default function EcommerceDemo() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className={`relative min-h-screen w-full bg-[#F4F4F0] text-black ${sans.className} overflow-x-hidden selection:bg-[#FF3B00] selection:text-white`}>
      
      {/* Top Bar - Neuralabs Attribution */}
      <div className="flex items-center justify-between gap-4 border-b-4 border-black bg-black px-5 py-2 text-[11px] tracking-widest text-[#F4F4F0] uppercase font-bold">
        <span>
          <span className="text-[#D4FF00]">✦</span> Demonstração por{' '}
          <span className="text-white">NEURALABS Studio</span>
        </span>
        <Link href="/" className="hover:text-[#FF3B00] transition-colors">
          ← Sair
        </Link>
      </div>

      {/* Marquee Brutalista */}
      <div className="w-full bg-[#FF3B00] border-b-4 border-black overflow-hidden flex whitespace-nowrap py-3">
        <motion.div 
          className="text-black font-black text-xl md:text-3xl uppercase tracking-tighter"
          animate={{ x: [0, -1500] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
        >
          {[...MARQUEE_TEXT, ...MARQUEE_TEXT, ...MARQUEE_TEXT].join(' • ')}
        </motion.div>
      </div>

      {/* Hero Header */}
      <header className="border-b-4 border-black flex justify-between items-center px-6 md:px-12 py-6 bg-[#D4FF00]">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
          Kicks<br/>Drop
        </h1>
        <div className="flex gap-4">
          <button className="hidden md:flex border-4 border-black bg-white px-6 py-3 font-bold uppercase hover:bg-black hover:text-white transition-colors items-center gap-2">
            Catalog
          </button>
          <button className="border-4 border-black bg-[#FF3B00] text-black px-6 py-3 font-black uppercase hover:bg-black hover:text-[#FF3B00] transition-colors flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" /> Cart (2)
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 border-b-4 border-black min-h-[70vh]">
        
        {/* Left: Product Image */}
        <div className="border-b-4 md:border-b-0 md:border-r-4 border-black relative bg-white flex items-center justify-center p-12 group overflow-hidden">
          {/* Fundo que reage ao mouse */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(212,255,0,0.5)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
          
          <motion.div 
            className="relative w-full max-w-lg aspect-square"
            whileHover={{ scale: 1.1, rotate: -5 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
          >
            <Image 
              src={SNEAKER_IMAGE}
              alt="Sneaker Concept"
              fill
              className="object-cover border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] grayscale group-hover:grayscale-0 transition-all duration-300"
            />
          </motion.div>
          
          <div className="absolute top-6 left-6 border-4 border-black bg-[#D4FF00] px-4 py-2 font-black uppercase text-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            Vol. 04
          </div>
        </div>

        {/* Right: Copy & Buy */}
        <div className="flex flex-col">
          <div className="p-8 md:p-12 border-b-4 border-black bg-[#F4F4F0] flex-1">
            <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-6">
              Aura<br/>Max 90
            </h2>
            <p className="text-xl md:text-2xl font-bold mb-8 max-w-md uppercase leading-tight">
              Design anti-gravidade para as ruas. Edição limitada.
            </p>
            
            {/* Price */}
            <div className="flex items-end gap-4 mb-8">
              <span className="text-7xl font-black tracking-tighter">$249</span>
              <span className="text-2xl font-bold line-through text-gray-400 mb-2">$320</span>
            </div>

            {/* Sizes */}
            <div className="mb-8">
              <p className="font-bold uppercase mb-3">Select Size (US)</p>
              <div className="flex flex-wrap gap-3">
                {[8, 8.5, 9, 9.5, 10, 10.5, 11].map(size => (
                  <button key={size} className="border-4 border-black w-14 h-14 flex items-center justify-center font-bold hover:bg-black hover:text-white transition-colors bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]">
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Buy Button */}
            <motion.button 
              className="w-full bg-[#FF3B00] border-4 border-black text-black py-6 text-3xl font-black uppercase tracking-tighter shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex justify-center items-center gap-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98, x: 8, y: 8, boxShadow: '0px 0px 0px 0px rgba(0,0,0,1)' }}
            >
              Add to Cart <Zap className="w-8 h-8 fill-current" />
            </motion.button>
          </div>
          
          {/* Trust Badges */}
          <div className="grid grid-cols-2">
            <div className="p-6 border-r-4 border-black bg-white flex flex-col items-center justify-center text-center">
              <Package className="w-8 h-8 mb-2" />
              <p className="font-bold uppercase text-sm">Next Day Delivery</p>
            </div>
            <div className="p-6 bg-white flex flex-col items-center justify-center text-center">
              <RefreshCcw className="w-8 h-8 mb-2" />
              <p className="font-bold uppercase text-sm">Free Returns</p>
            </div>
          </div>
        </div>
      </section>

      {/* Floating Back Button */}
      <Link
        href="/"
        className="fixed bottom-6 left-6 z-50 inline-flex items-center gap-2 border-4 border-black bg-white px-5 py-4 text-sm font-black uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-[#D4FF00] transition-colors"
      >
        <ArrowLeft className="h-5 w-5" />
        Voltar para a Neuralabs
      </Link>
      
    </main>
  );
}
