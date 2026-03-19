'use client'

import { motion } from 'framer-motion'

interface AboutProps {
  content?: string | null;
  defaultContent: string;
  themeConfig?: any;
}

export default function About({ content, defaultContent, themeConfig }: AboutProps) {
  const textToShow = content || defaultContent;
  const preTitle = themeConfig?.aboutPreTitle || 'QUIÉNES SOMOS';
  const title = themeConfig?.aboutTitle || 'No desarrollamos páginas. Construimos sistemas digitales que generan resultados.';

  return (
    <section id="about" className="py-24 relative overflow-hidden bg-white">
      {/* Background Image Area (Represented with a soft gradient for now, can be an actual image if needed) */}
      <div className="absolute top-0 left-0 w-full h-[60%] bg-gradient-to-b from-neutral-100 to-white z-0"></div>
      
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8 md:p-14 border border-neutral-100"
        >
          <div className="text-neutral-900 font-bold tracking-widest text-sm uppercase mb-6">
            {preTitle}
          </div>
          
          <p className="text-neutral-600 text-lg md:text-xl font-light leading-relaxed mb-6">
            {textToShow}
          </p>

          <h3 className="text-xl md:text-2xl font-bold text-neutral-900 leading-tight">
            {title}
          </h3>
        </motion.div>
      </div>
    </section>
  )
}
