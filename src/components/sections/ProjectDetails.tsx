'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2 } from 'lucide-react'

interface TechDetails {
  exclusions: string[];
  deliverables: string[];
  dependencies: string[];
  revisions: string[];
}

interface DetailItem {
  id: keyof TechDetails;
  title: string;
  subtitle: string;
  image: string;
}

export default function ProjectDetails({ themeConfig }: { themeConfig: any }) {
  const [activeModal, setActiveModal] = useState<keyof TechDetails | null>(null)

  const details: TechDetails = themeConfig?.techDetails || {
    exclusions: ["Desarrollo a medida o programación personalizada", "Diseño UX/UI personalizado avanzado", "Branding o desarrollo de identidad corporativa", "Copywriting profesional", "Fotografía de productos", "Integraciones complejas o APIs externas", "Automatizaciones avanzadas", "Estrategias de marketing o publicidad", "SEO avanzado", "Mantenimiento continuo o soporte posterior"],
    deliverables: ["Tienda ecommerce funcional y operativa", "Accesos administrativos completos", "Configuración básica de pagos y envíos", "Estructura lista para gestión de productos"],
    dependencies: ["Entrega oportuna de información", "Disponibilidad para validaciones", "Accesos a plataformas"],
    revisions: ["Hasta dos (2) rondas de ajustes", "Cualquier ajuste adicional será considerado como un nuevo requerimiento y tendrá costo adicional."]
  }

  const cards: DetailItem[] = [
    { 
      id: 'exclusions', 
      title: 'Exclusiones', 
      subtitle: 'Lo que NO incluye el servicio', 
      image: '/images/exclusiones.jpg' 
    },
    { 
      id: 'deliverables', 
      title: 'Entregables', 
      subtitle: 'Lo que recibirás al finalizar', 
      image: '/images/entregables.jpg' 
    },
    { 
      id: 'dependencies', 
      title: 'Dependencias', 
      subtitle: 'Lo que necesitamos de ti', 
      image: '/images/dependencias.jpg' 
    },
    { 
      id: 'revisions', 
      title: 'Revisiones', 
      subtitle: 'Políticas de cambios y ajustes', 
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=500' 
    },
  ];

  const currentDetail = activeModal ? details[activeModal] : []

  return (
    <section id="details" className="py-24 bg-white relative">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-neutral-900 tracking-tight uppercase mb-4">
            Consideraciones del Servicio
          </h2>
          <p className="text-neutral-500 max-w-xl mx-auto text-sm leading-relaxed">
            Transparencia total para el éxito del proyecto.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {cards.map((card) => (
            <motion.div
              key={card.id}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.05), 0 10px 10px -5px rgba(0, 0, 0, 0.02)"
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActiveModal(card.id)}
              className="bg-white rounded-2xl overflow-hidden border border-neutral-100 shadow-sm cursor-pointer group flex flex-col h-full relative"
            >
              {/* Arrows indicadoras hover en esquina */}
              <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-10 border border-neutral-100">
                <span className="text-sm font-bold text-neutral-700">→</span>
              </div>

              {/* Imagen Superior */}
              <div className="relative h-44 w-full overflow-hidden bg-neutral-100">
                <img 
                  src={card.image} 
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Contenido Card */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-bold text-neutral-800 text-sm mb-1 group-hover:text-brand transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs text-neutral-400 mb-4 font-medium flex-1">
                  {card.subtitle}
                </p>
                
                <div className="border-t border-neutral-100 pt-3 mt-auto flex justify-between items-center">
                   <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Detalles</span>
                   
                   {/* Microcopy interactivo animado (Pulsar) */}
                   <div className="flex items-center gap-1 text-[11px] font-bold text-brand hover:scale-105 transition-transform">
                      <span>Ver detalles</span>
                      <motion.span
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 1.2, 
                          ease: "easeInOut" 
                        }}
                      >
                       →
                     </motion.span>
                   </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-neutral-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative z-10 overflow-hidden"
            >
              <div className="p-6 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
                <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                  {cards.find(c => c.id === activeModal)?.title}
                </h3>
                <button onClick={() => setActiveModal(null)} className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors">
                  <X size={18} />
                </button>
              </div>
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <ul className="space-y-3">
                  {currentDetail.map((item, index) => (
                    <li key={index} className="flex gap-3 text-neutral-600 text-sm items-start">
                      <CheckCircle2 size={16} className="text-brand shrink-0 mt-0.5" />
                      <span className="leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="p-6 pt-0 border-t border-neutral-50 mt-4">
                <button onClick={() => setActiveModal(null)} className="w-full py-3 bg-neutral-900 text-white rounded-xl font-medium hover:bg-black transition-colors text-sm">
                  Cerrar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
