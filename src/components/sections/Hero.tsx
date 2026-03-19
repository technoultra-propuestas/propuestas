'use client'

import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

interface HeroProps {
  clientName: string;
  company: string;
  serviceType: string;
  customTitle?: string | null;
  customSubtitle?: string | null;
}

const backgrounds: Record<string, string> = {
  ecommerce: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1920&q=80',
  web: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80',
  app: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1920&q=80',
  marketing: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80',
}

export default function Hero({ clientName, company, serviceType, customTitle, customSubtitle }: HeroProps) {
  const bgImage = backgrounds[serviceType] || backgrounds['web'];

  const title = customTitle || `Propuesta Estratégica para ${company}`
  const subtitle = customSubtitle || `Preparada exclusivamente para ${clientName}`

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-neutral-900">
      {/* Background */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${bgImage}')` }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-black/60 to-[#0a0a0a]" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <div className="mb-8 inline-block">
            <span className="px-5 py-2,5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white/90 text-sm font-medium tracking-widest uppercase shadow-2xl">
              TECHNO<span className="text-brand">ULTRA</span> × {company}
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
            {title}
          </h1>
          
          <p className="text-xl md:text-2xl text-neutral-300 font-light max-w-3xl mx-auto mb-16">
            {subtitle}
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
          >
            <div className="animate-bounce flex justify-center">
              <a href="#about" className="p-5 rounded-full bg-white/5 hover:bg-brand border border-white/10 hover:border-brand transition-all duration-300 text-white shadow-lg backdrop-blur-md cursor-pointer">
                <ArrowDown size={24} />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
