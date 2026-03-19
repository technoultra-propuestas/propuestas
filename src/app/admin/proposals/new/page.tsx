'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import Link from 'next/link'

export default function NewProposalPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [displayPrice, setDisplayPrice] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    const data = {
      client_name: formData.get('client_name'),
      company: formData.get('company'),
      service_type: formData.get('service_type'),
      price: Number(formData.get('price')),
      timeline: formData.get('timeline'),
      custom_hero_title: formData.get('custom_hero_title') || null,
      custom_hero_subtitle: formData.get('custom_hero_subtitle') || null,
    }

    try {
      const response = await fetch('/api/proposals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || 'Error al guardar la propuesta')
      }

      router.push('/admin/proposals')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link 
          href="/admin/proposals"
          className="p-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors"
        >
          <ArrowLeft size={20} className="text-neutral-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Nueva Propuesta</h1>
          <p className="text-neutral-500 text-sm">Crea una propuesta personalizada para tu cliente.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
          <h2 className="text-lg font-semibold mb-6 pb-4 border-b border-neutral-100">Datos Principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Nombre del Cliente</label>
              <input type="text" name="client_name" required className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none" placeholder="Ej. Juan Pérez" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Empresa</label>
              <input type="text" name="company" required className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none" placeholder="Ej. ACME Corp" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Tipo de Servicio</label>
              <select name="service_type" required className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none bg-white">
                <option value="ecommerce">E-Commerce</option>
                <option value="web">Web Corporativa</option>
                <option value="app">Aplicación Móvil</option>
                <option value="marketing">Marketing Digital</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Inversión Estimada (COP)</label>
              <input 
                type="text" 
                value={displayPrice}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  setDisplayPrice(val ? Number(val).toLocaleString('es-CO') : '');
                }} 
                required 
                className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none" 
                placeholder="Ej. 1.500.000" 
              />
              <input type="hidden" name="price" value={displayPrice.replace(/\./g, '')} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-neutral-700 mb-2">Tiempo Estimado</label>
              <input type="text" name="timeline" required className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none" placeholder="Ej. 4 a 6 semanas" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
          <h2 className="text-lg font-semibold mb-6 pb-4 border-b border-neutral-100">Personalización (Opcional)</h2>
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Título Principal (Hero)</label>
              <input type="text" name="custom_hero_title" className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none" placeholder="Dejar en blanco para usar default" />
            </div>
            <div>
              <label className="block text-sm font-medium text-neutral-700 mb-2">Subtítulo (Hero)</label>
              <input type="text" name="custom_hero_subtitle" className="w-full px-4 py-2 rounded-xl border border-neutral-300 focus:ring-2 focus:ring-brand focus:border-brand outline-none" placeholder="Dejar en blanco para usar default" />
            </div>
            <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl text-sm text-orange-800">
              <p>Nota: Para configurar el esquema detallado, requerimientos y condiciones personalizadas, guarda esta propuesta y podrás utilizar el editor avanzado en la vista de edición.</p>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-600 rounded-xl border border-red-200 text-sm">
            {error}
          </div>
        )}

        <div className="flex justify-end gap-4">
          <Link 
            href="/admin/proposals"
            className="px-6 py-2.5 rounded-xl font-medium text-neutral-600 hover:bg-neutral-100 transition-colors"
          >
            Cancelar
          </Link>
          <button 
            type="submit"
            disabled={loading}
            className="bg-brand disabled:opacity-50 hover:bg-[#e05d00] text-white px-8 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-sm"
          >
            {loading ? 'Guardando...' : (
              <>
                <Save size={20} />
                Guardar Propuesta
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
