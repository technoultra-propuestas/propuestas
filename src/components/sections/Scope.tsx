'use client'

import { motion } from 'framer-motion'
import * as LucideIcons from 'lucide-react'

interface ScopeItem {
  icon?: string;
  title: string;
  subtitle?: string;
}

interface ScopeProps {
  customItems?: (ScopeItem | string)[] | null;
  defaultItems: (ScopeItem | string)[];
}

// Helper to safely render dynamic Lucide Icons
const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
  // @ts-ignore - Lucide doesn't export a mapping object by default, but we can index it like this
  const IconComponent = LucideIcons[name] as React.ElementType || LucideIcons.CheckCircle;
  return <IconComponent className={className} />;
};

export default function Scope({ customItems, defaultItems }: ScopeProps) {
  // If customItems comes from old DB format (array of strings), map it to ScopeItem format dynamically,
  // though the new DB saves it as an array of objects.
  const itemsToRender = customItems !== null && customItems !== undefined
    ? customItems.map((item: any) => typeof item === 'string' ? { title: item, icon: 'CheckCircle' } : item)
    : defaultItems.map((item: any) => typeof item === 'string' ? { title: item, icon: 'CheckCircle' } : item);

  return (
    <section id="scope" className="py-24 bg-[#FAFAFA]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black text-[#1F2937] tracking-tight uppercase mb-4">
            Alcance del Servicio
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {itemsToRender.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow border border-neutral-100 flex items-center gap-5"
            >
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-500 flex items-center justify-center flex-shrink-0">
                 <DynamicIcon name={item.icon || 'CheckCircle'} className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-semibold text-neutral-900 leading-tight">
                  {item.title}
                </h4>
                {item.subtitle && (
                  <p className="text-sm text-neutral-500 mt-1 leading-snug">{item.subtitle}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-neutral-400 font-medium">
            Servicio enfocado en implementación optimizada sobre infraestructura existente
          </p>
        </div>
      </div>
    </section>
  )
}
