'use client'

import { motion } from 'framer-motion'

interface PricingProps {
  price: number;
}

export default function Pricing({ price }: PricingProps) {
  return (
    <section className="py-32 bg-gradient-to-br from-brand to-[#e05d00] text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
           className="bg-white/10 backdrop-blur-md border border-white/20 p-6 md:p-12 rounded-3xl md:rounded-[3rem] shadow-2xl"
        >
          <h2 className="text-sm font-bold tracking-[0.2em] uppercase mb-8 text-white/90">Inversión Estimada</h2>
          <div className="flex items-baseline justify-center gap-1 sm:gap-3 mb-8 flex-wrap">
             <span className="text-3xl sm:text-5xl md:text-6xl font-light text-white/80">$</span>
             <span className="text-4xl sm:text-7xl md:text-9xl font-black tracking-tighter leading-none">{price.toLocaleString()}</span>
             <span className="text-lg sm:text-2xl md:text-3xl font-bold text-white/90">COP</span>
          </div>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto font-medium">
            Propuesta de valor integral, desarrollada bajo los más altos estándares tecnológicos para asegurar escalabilidad y retorno.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
