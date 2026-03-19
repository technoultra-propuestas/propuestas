'use client'

import { motion } from 'framer-motion'
import { Rocket, FileText, Code2, Eye, CheckCircle2, Clock } from 'lucide-react'

interface ProcessItem {
  title: string;
  subtitle?: string;
}

interface TimelineProps {
  customItems?: (ProcessItem | string)[] | null;
  defaultItems: (ProcessItem | string)[];
  estimatedTime?: string;
}

const stepIcons = [Rocket, FileText, Code2, Eye, CheckCircle2];

export default function Timeline({ customItems, defaultItems, estimatedTime }: TimelineProps) {
  const itemsToRender = customItems !== null && customItems !== undefined
    ? customItems.map(item => (typeof item === 'string' ? { title: item } : item))
    : defaultItems.map(item => (typeof item === 'string' ? { title: item } : item));

  return (
    <section id="timeline" className="py-24 bg-[#FAFAFA] relative">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* TIEMPO DE IMPLEMENTACIÓN */}
        <div className="text-center mb-16">
           <h2 className="text-sm font-bold tracking-widest text-[#1F2937] uppercase mb-8">
              Tiempo de <span className="text-neutral-500">Implementación</span>
           </h2>
           
           <motion.div 
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="inline-block bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] py-8 px-16 border border-neutral-100"
           >
             <h3 className="text-4xl font-black text-neutral-900 mb-2">
               {estimatedTime || 'Depende del alcance'}
             </h3>
             <p className="text-sm text-neutral-400 font-medium mt-4">
               El proyecto inicia cuando toda la información ha sido entregada correctamente.
             </p>
           </motion.div>
        </div>

        {/* PROCESO DE TRABAJO */}
        <div className="text-center mt-32 mb-16">
          <h2 className="text-xl font-black text-[#1F2937] uppercase tracking-widest">
            Proceso de Trabajo
          </h2>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Línea conectora horizontal (Desktop) */}
          <div className="hidden md:block absolute top-[28px] left-[5%] right-[5%] h-[2px] border-t-2 border-dashed border-neutral-300 z-0"></div>

          <div className="flex flex-col md:flex-row justify-between relative z-10 gap-8 md:gap-4">
            {itemsToRender.map((step, index) => {
              const IconComponent = stepIcons[index] || Clock;
              
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  className="flex flex-col items-center flex-1 text-center group"
                >
                  <div className="w-14 h-14 rounded-full bg-white border-4 border-white shadow-[0_4px_15px_rgba(255,106,0,0.2)] bg-brand text-white flex items-center justify-center mb-6 z-10 transition-transform group-hover:scale-110">
                    <IconComponent size={24} className="text-brand" />
                  </div>
                  <h4 className="font-bold text-neutral-800 text-sm leading-tight mb-2">
                    {step.title}
                  </h4>
                  {step.subtitle && (
                    <p className="text-xs text-neutral-500 font-medium px-2 leading-snug">
                      {step.subtitle}
                    </p>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

      </div>
    </section>
  )
}
