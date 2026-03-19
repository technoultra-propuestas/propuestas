'use client'

import { motion } from 'framer-motion'
import { FolderGit2 } from 'lucide-react'

interface RequirementsProps {
  customItems?: string[] | null;
  defaultItems: string[];
}

export default function Requirements({ customItems, defaultItems }: RequirementsProps) {
  const items = (customItems && customItems.length > 0) ? customItems : defaultItems;

  if (!items || items.length === 0) return null;

  return (
    <section className="py-24 bg-neutral-50 text-neutral-900 border-t border-neutral-200">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.6 }}
           className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
             <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-neutral-100 flex items-center justify-center text-brand">
               <FolderGit2 size={28} />
             </div>
             <div>
               <h2 className="text-3xl font-bold tracking-tight">Requerimientos Activos</h2>
               <p className="text-neutral-500 mt-1">Activos e información a proveer por el cliente.</p>
             </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-neutral-100"
        >
          <ul className="space-y-6">
            {items.map((item, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-start gap-5 group"
              >
                <div className="w-8 h-8 rounded-xl bg-orange-50 text-brand flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-brand group-hover:text-white transition-colors">
                  <span className="text-sm font-bold">{index + 1}</span>
                </div>
                <span className="text-lg text-neutral-700 leading-snug pt-1">{item}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
