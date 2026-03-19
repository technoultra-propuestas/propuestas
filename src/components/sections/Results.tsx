'use client'

import { motion } from 'framer-motion'

interface ResultItem {
  title: string;
  subtitle?: string;
}

interface ResultsProps {
  customItems?: (ResultItem | string)[] | null;
  defaultItems: (ResultItem | string)[];
}

export default function Results({ customItems, defaultItems }: ResultsProps) {
  const itemsToRender = customItems !== null && customItems !== undefined
    ? customItems.map(item => (typeof item === 'string' ? { title: item } : item))
    : defaultItems.map(item => (typeof item === 'string' ? { title: item } : item));

  return (
    <section id="results" className="py-24 relative overflow-hidden bg-[#111111]">
      {/* Fondo decorativo (idealmente una imagen emborronada, simulado con gradientes) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-brand/10 rounded-full blur-[120px]"></div>
      </div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-widest uppercase mb-4">
            Resultado Esperado
          </h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
          {itemsToRender.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex-1 min-w-[200px] max-w-[280px] hover:bg-white/10 transition-colors"
            >
              <div className="flex items-start gap-2">
                <span className="text-brand font-bold mt-1 text-lg leading-none">+</span>
                <div>
                  <h4 className="font-semibold text-white/90 leading-tight">
                    {item.title}
                  </h4>
                  {item.subtitle && (
                    <p className="text-xs text-neutral-400 mt-2 font-medium">
                      {item.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center flex items-center justify-center gap-2 text-neutral-500 text-xs font-medium">
          <span className="w-4 h-4 rounded-full border border-neutral-600 flex items-center justify-center text-[10px]">i</span>
          Servicio enfocado en implementación optimada sobre infraestructura dual-system.
        </div>
      </div>
    </section>
  )
}
