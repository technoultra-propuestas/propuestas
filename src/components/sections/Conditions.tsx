'use client'

import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

interface ConditionsProps {
  customItems?: string[] | null;
  defaultItems: string[];
}

export default function Conditions({ customItems, defaultItems }: ConditionsProps) {
  const items = (customItems && customItems.length > 0) ? customItems : defaultItems;

  if (!items || items.length === 0) return null;

  return (
    <section className="py-24 bg-white text-neutral-900">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
             <div className="w-12 h-12 rounded-xl flex items-center justify-center text-neutral-500 bg-neutral-100 border border-neutral-200">
               <AlertCircle size={24} />
             </div>
             <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">Consideraciones Generales</h2>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           {items.map((item, index) => (
             <motion.div
               key={index}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true, margin: "-50px" }}
               transition={{ duration: 0.5, delay: index * 0.1 }}
               className="flex items-start gap-4 p-6 bg-neutral-50 rounded-2xl border border-neutral-100 hover:bg-neutral-100/50 transition-colors"
             >
                <div className="w-2 h-2 rounded-full bg-neutral-300 mt-2 flex-shrink-0"></div>
                <p className="text-neutral-600 text-base leading-relaxed">{item}</p>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  )
}
