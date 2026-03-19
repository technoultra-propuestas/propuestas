'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2 } from 'lucide-react'
import Image from 'next/image'

interface ChecklistItem {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  items: string[];
}

export default function Onboarding() {
  const [activeModal, setActiveModal] = useState<string | null>(null)

  const cards: ChecklistItem[] = [
    {
      id: 'brand',
      title: '1. Información de Marca',
      subtitle: 'Identidad corporativa y logos',
      image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=400',
      items: [
        'Nombre oficial de la tienda',
        'Logo en alta calidad (PNG con transparencia o SVG)',
        'Colores corporativos / Paleta de diseño (si aplica)'
      ]
    },
    {
      id: 'products',
      title: '2. Catálogo de Productos',
      subtitle: 'Inventario, precios y fotos',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=400',
      items: [
        'Por cada producto: Nombre, Descripción y Precio',
        'Fotografías en alta calidad (Fondo neutro recomendado)',
        'Variaciones (Tallas, Colores, Sabores)',
        'Stock / Inventario inicial disponible'
      ]
    },
    {
      id: 'payment',
      title: '3. Métodos de Pago',
      subtitle: 'Pasarelas y datos legales',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=400',
      items: [
        'Plataforma a utilizar (Wompi, MercadoPago, Bold, etc.)',
        'Credenciales de desarrollador o accesos administrativos',
        'Documentación legal requerida por la pasarela'
      ]
    },
    {
      id: 'shipping',
      title: '4. Logística y Envíos',
      subtitle: 'Zonas, tarifas y políticas',
      image: '/images/envios.jpg',
      items: [
        'Zonas de cobertura (Nacional, local)',
        'Tarifas de envío (Fijas, por peso, gratis)',
        'Políticas y tiempos de entrega estimada'
      ]
    },
    {
      id: 'domain',
      title: '5. Infraestructura y Dominio',
      subtitle: 'Accesos de red y DNS',
      image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=400',
      items: [
        'Dominio adquirido (.com, .co, etc.)',
        'Accesos al proveedor de dominio (GoDaddy, Namecheap, etc.)',
        'Autorización para configuraciones de DNS'
      ]
    },
    {
      id: 'legal',
      title: '6. Información Legal',
      subtitle: 'Términos y condiciones',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=400',
      items: [
        'Políticas de Privacidad',
        'Términos y Condiciones del servicio',
        'Políticas de Cambios y Devolución',
        '(De no contar con esto, se usará una plantilla base)'
      ]
    },
    {
      id: 'access',
      title: '7. Accesos Administrativos',
      subtitle: 'Cuentas y herramientas',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=400',
      items: [
        'Correos electrónicos para configuración de perfiles',
        'Plataformas externas complementarias'
      ]
    }
  ];

  const currentCard = cards.find(c => c.id === activeModal);

  return (
    <section id="onboarding" className="py-24 bg-[#FAFAFA] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-neutral-900 tracking-tight uppercase mb-4">
            Información Requerida
          </h2>
          <p className="text-neutral-500 max-w-xl mx-auto text-sm leading-relaxed">
            Para garantizar el inicio óptimo del proyecto, requerimos de tu apoyo con los siguientes insumos.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-800 px-4 py-2 rounded-xl text-xs font-semibold">
            <span>⚠️</span>
            <span>El proyecto no iniciará hasta contar con la totalidad de esta información.</span>
          </div>
        </div>

        {/* Componente Grid similar a la tarjeta de diseño adjunta */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
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
                <div className="absolute top-3 left-3 bg-brand/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  Requerido
                </div>
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

                  {/* Microcopy interactivo animado */}
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
        {activeModal && currentCard && (
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
              {/* Header Modal */}
              <div className="p-6 border-b border-neutral-100 flex justify-between items-center bg-neutral-50/50">
                <h3 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                  {currentCard.title}
                </h3>
                <button onClick={() => setActiveModal(null)} className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors">
                  <X size={18} />
                </button>
              </div>

              {/* Contenido Modal */}
              <div className="p-6 max-h-[60vh] overflow-y-auto">
                <p className="text-xs text-neutral-500 mb-4">{currentCard.subtitle}</p>
                <ul className="space-y-3">
                  {currentCard.items.map((item, index) => (
                    <li key={index} className="flex gap-3 text-neutral-600 text-sm items-start">
                      <CheckCircle2 size={16} className="text-brand shrink-0 mt-0.5" />
                      <span className="leading-tight">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer Modal */}
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
