'use client';

import { useState } from 'react';
import { ShoppingCart, Heart, Star, Check, Zap, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Orbita() {
  const [cart, setCart] = useState(0);
  const [liked, setLiked] = useState({});

  const products = [
    { id: 1, name: 'Fone Bluetooth Premium', price: 299, original: 499, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop', rating: 4.8, reviews: 342, stock: 5, badge: 'Últimas unidades' },
    { id: 2, name: 'Smartwatch Elite', price: 199, original: 399, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop', rating: 4.9, reviews: 518, stock: 3, badge: 'Só 3 restantes' },
    { id: 3, name: 'Câmera Instant', price: 89, original: 149, image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop', rating: 4.7, reviews: 267, stock: 12, badge: 'Promoção' }
  ];

  const addToCart = (id) => setCart(cart + 1);

  return (
    <div className="bg-slate-950 text-white min-h-screen">
      <header className="fixed top-0 z-50 w-full border-b border-slate-900 bg-slate-950/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-black hover:text-cyan-500 transition">Neuralabs</Link>
          <div className="flex items-center gap-6">
            <motion.div className="text-sm text-slate-400" initial={{ scale: 1 }} animate={cart > 0 ? { scale: [1, 1.2, 1] } : {}} transition={{ duration: 0.3 }}>
              Carrinho: <span className="font-bold text-cyan-500">{cart}</span>
            </motion.div>
            <Link href="/#trabalhos" className="text-sm text-slate-400 hover:text-white transition">← Voltar</Link>
          </div>
        </div>
      </header>

      <section className="pt-24 pb-12 px-4 bg-gradient-to-b from-cyan-900/20 via-slate-950 to-slate-950 text-center">
        <motion.div className="max-w-4xl mx-auto" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div className="mb-6 inline-block animate-pulse">
            <Zap className="w-12 h-12 text-cyan-500" />
          </motion.div>
          <motion.h1 className="text-5xl md:text-6xl font-black mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <span className="text-cyan-500">Órbita</span> - Gadgets que Vendem
          </motion.h1>
          <motion.p className="text-xl text-slate-300 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            Loja enxuta, 3 produtos, foco total em decisão rápida e conversão. Cada detalhe aplica neuromarketing.
          </motion.p>
          <motion.div className="flex justify-center gap-4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            {[{ text: 'Entrega em 24h' }, { text: 'Garantia 1 ano' }, { text: 'Devolução grátis' }].map((item, i) => (
              <motion.div key={i} className="text-sm text-green-400 flex items-center gap-2" whileHover={{ scale: 1.1 }}>
                <Check className="w-4 h-4" /> {item.text}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6 bg-slate-900/50 rounded-lg border border-slate-800 mb-12 flex items-center justify-center gap-8 text-center">
        {[{ label: 'Clientes satisfeitos', value: '1.247' }, { label: 'Avaliação média', value: '4.8★' }, { label: 'Avaliações', value: '+2.100' }].map((stat, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} viewport={{ once: true }}>
            <p className="text-2xl font-black text-cyan-500">{stat.value}</p>
            <p className="text-xs text-slate-400">{stat.label}</p>
          </motion.div>
        ))}
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-12 text-center">Produtos em Destaque</h2>

        <motion.div className="grid md:grid-cols-3 gap-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          {products.map((product, i) => (
            <motion.div key={product.id} className="group relative" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }} viewport={{ once: true }} whileHover={{ y: -10 }}>
              <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800 hover:border-cyan-600 transition transform h-full flex flex-col">
                <div className="relative overflow-hidden h-64 bg-slate-800">
                  <motion.div className="w-full h-full bg-cover bg-center group-hover:scale-110 transition duration-300" style={{ backgroundImage: `url("${product.image}")` }} whileHover={{ scale: 1.1 }}></motion.div>

                  <motion.div className="absolute top-4 left-4 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                    {product.badge}
                  </motion.div>

                  <motion.button onClick={() => setLiked({ ...liked, [product.id]: !liked[product.id] })} className="absolute top-4 right-4 bg-black/50 hover:bg-black/75 p-2 rounded-full transition" whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                    <Heart className={`w-5 h-5 transition ${liked[product.id] ? 'fill-red-500 text-red-500' : 'text-white'}`} />
                  </motion.button>

                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                    <p className="text-sm text-red-400 line-through">{product.original} R$</p>
                    <p className="text-2xl font-bold text-cyan-500">
                      {product.price} R$
                      <span className="text-xs text-red-400 ml-2">-{Math.round((1 - product.price / product.original) * 100)}%</span>
                    </p>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-bold mb-2">{product.name}</h3>

                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} className={`w-3 h-3 ${j < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}`} />
                      ))}
                    </div>
                    <span className="text-xs text-slate-400">({product.reviews})</span>
                  </div>

                  <div className={`text-xs font-bold mb-4 ${product.stock <= 5 ? 'text-red-400' : 'text-green-400'}`}>
                    {product.stock <= 5 ? `⚠️ Apenas ${product.stock} em estoque` : `✓ Em estoque`}
                  </div>

                  <motion.button onClick={() => addToCart(product.id)} className="mt-auto w-full px-4 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-bold transition flex items-center justify-center gap-2 group" whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(34, 211, 238, 0.5)' }} whileTap={{ scale: 0.95 }}>
                    <ShoppingCart className="w-4 h-4 group-hover:animate-bounce" />
                    Comprar Agora
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Como Vendemos Mais</h2>

        <motion.div className="grid md:grid-cols-2 gap-8" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          {[
            { title: '1. Escassez', desc: '"Apenas 5 em estoque" reduz procrastinação. Cada produto tem quantidade real.' },
            { title: '2. Prova Social', desc: '1.247 clientes + 4.8★ com 2.100 reviews cria ancoragem social forte.' },
            { title: '3. Desconto Visível', desc: 'Mostrar preço original + % off ativa gatilho de "ganho" e urgência.' },
            { title: '4. Redução de Fricção', desc: '3 produtos apenas. CTA óbvio. Garantia visível. Checkout direto = mais vendas.' },
            { title: '5. Micro-interactions', desc: 'Hover effects, animações de botão e like button criam sensação de controle.' },
            { title: '6. Garantias & Confiança', desc: 'Entrega 24h, garantia 1 ano, devolução grátis reduz medo da decisão.' }
          ].map((item, i) => (
            <motion.div key={i} className="p-8 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-cyan-600 transition" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08, duration: 0.5 }} viewport={{ once: true }} whileHover={{ scale: 1.05, borderColor: '#06b6d4' }}>
              <h3 className="text-lg font-bold text-cyan-500 mb-3">{item.title}</h3>
              <p className="text-slate-300 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="max-w-2xl mx-auto px-4 py-20">
        <motion.div className="bg-gradient-to-r from-cyan-600/20 to-slate-900 border-2 border-cyan-600 rounded-lg p-12 text-center" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className="text-3xl font-bold mb-4">Pronto para comprar?</h2>
          <p className="text-slate-300 mb-8">Aproveite os preços especiais agora. Estoque limitado!</p>
          <motion.button className="px-8 py-4 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-bold transition" whileHover={{ scale: 1.1, boxShadow: '0 0 30px rgba(34, 211, 238, 0.6)' }} whileTap={{ scale: 0.95 }}>
            Ir para Carrinho ({cart} itens)
          </motion.button>
          <p className="text-xs text-slate-400 mt-6">Entrega garantida em 24h | Frete grátis em compras acima de R$ 150</p>
        </motion.div>
      </section>

      <footer className="border-t border-slate-800 px-4 py-8 text-center text-slate-500 text-sm">
        <p>© 2026 Órbita. Gadgets que vendem porque aplicamos neuromarketing.</p>
        <p className="mt-2 text-xs">Case study Neuralabs - Conversão através de gatilhos psicológicos</p>
      </footer>
    </div>
  );
}
