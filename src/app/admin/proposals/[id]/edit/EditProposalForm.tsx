'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save, Plus, Trash2, LayoutTemplate, BriefcaseIcon, FileText, CheckSquare } from 'lucide-react'
import Link from 'next/link'

export default function EditProposalForm({ initialData }: { initialData: any }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'basic' | 'scope' | 'process' | 'tech'>('basic')
  
  const [themeConfig, setThemeConfig] = useState(
    initialData.theme_config || { primaryColor: '#FF6A00', aboutPreTitle: 'QUIÉNES SOMOS', aboutTitle: 'No desarrollamos páginas. Construimos sistemas digitales que generan resultados.' }
  )

  const [techDetails, setTechDetails] = useState(
    initialData.theme_config?.techDetails || {
      exclusions: ["Desarrollo a medida o programación personalizada", "Diseño UX/UI personalizado avanzado", "Branding o desarrollo de identidad corporativa", "Copywriting profesional", "Fotografía de productos", "Integraciones complejas o APIs externas", "Automatizaciones avanzadas", "Estrategias de marketing o publicidad", "SEO avanzado", "Mantenimiento continuo o soporte posterior"],
      deliverables: ["Tienda ecommerce funcional y operativa", "Accesos administrativos completos", "Configuración básica de pagos y envíos", "Estructura lista para gestión de productos"],
      dependencies: ["Entrega oportuna de información", "Disponibilidad para validaciones", "Accesos a plataformas"],
      revisions: ["Hasta dos (2) rondas de ajustes", "Cualquier ajuste adicional será considerado como un nuevo requerimiento y tendrá costo adicional."]
    }
  )

  const [displayPrice, setDisplayPrice] = useState(
    initialData.price ? Number(initialData.price).toLocaleString('es-CO') : ''
  )

  const getFallbackScope = () => {
    switch (initialData.service_type) {
      case 'ecommerce': return [{title:"Configuración de tienda", icon:"Store"}, {title:"Implementación de plantilla", icon:"LayoutTemplate"}, {title:"Carga de hasta cien (100) productos", icon:"Package"}, {title:"Métodos de pago", icon:"CreditCard"}, {title:"Configuración mínima de envíos", icon:"Truck"}, {title:"Conexión de dominio", icon:"Globe"}];
      case 'web': return [{title:"Desarrollo Frontend", icon:"Code"}, {title:"CMS Autogestionable", icon:"Database"}, {title:"SEO Técnico", icon:"Search"}, {title:"Diseño UI/UX", icon:"PenTool"}];
      case 'app': return [{title:"Desarrollo Nativo", icon:"Smartphone"}, {title:"Panel Cloud", icon:"Cloud"}, {title:"Push Notifications", icon:"Bell"}, {title:"Publicación Store", icon:"Store"}];
      default: return [{title:"Auditoría de Mercado", icon:"TrendingUp"}, {title:"Pauta Digital", icon:"Megaphone"}, {title:"Dashboard", icon:"PieChart"}];
    }
  }

  const fallbackResults = [
    { title: "Plataforma lista para vender", subtitle: "Experiencia optimizada" },
    { title: "Base escalable", subtitle: "Estructura profesional" }
  ];

  const fallbackProcess = [
    { title: "Inicio", subtitle: "Kick-off del proyecto y definición principal." },
    { title: "Información", subtitle: "Recolección de activos y requerimientos." },
    { title: "Desarrollo", subtitle: "Construcción bajo los más altos estándares." },
    { title: "Revisión", subtitle: "QA y pruebas rigorosas de performance." },
    { title: "Entrega", subtitle: "Despliegue a producción y capacitación." }
  ];

  const defaultScopeList = initialData.custom_scope 
    ? initialData.custom_scope.map((item: any) => typeof item === 'string' ? { title: item, subtitle: '', icon: 'CheckCircle' } : item)
    : getFallbackScope();
  const [scopeItems, setScopeItems] = useState<{title: string, subtitle: string, icon: string}[]>(defaultScopeList);

  const defaultResultsList = initialData.custom_results
    ? initialData.custom_results.map((item: any) => typeof item === 'string' ? { title: item, subtitle: '' } : item)
    : fallbackResults;
  const [resultItems, setResultItems] = useState<{title: string, subtitle: string}[]>(defaultResultsList);

  const defaultProcessList = initialData.custom_process
    ? initialData.custom_process.map((item: any) => typeof item === 'string' ? { title: item, subtitle: '' } : item)
    : fallbackProcess;
  const [processItems, setProcessItems] = useState<{title: string, subtitle: string}[]>(defaultProcessList);

  const handleDynamicUpdate = (setter: any, state: any[], i: number, field: string, value: string) => {
    const updated = [...state];
    updated[i] = { ...updated[i], [field]: value };
    setter(updated);
  }

  const handleTechUpdate = (category: keyof typeof techDetails, i: number, value: string) => {
    const updatedCategory = [...techDetails[category]];
    updatedCategory[i] = value;
    setTechDetails({ ...techDetails, [category]: updatedCategory });
  }

  const addTechItem = (category: keyof typeof techDetails) => {
    setTechDetails({ ...techDetails, [category]: [...techDetails[category], ""] });
  }

  const removeTechItem = (category: keyof typeof techDetails, i: number) => {
    setTechDetails({ ...techDetails, [category]: techDetails[category].filter((_: any, index: number) => index !== i) });
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const formData = new FormData(e.currentTarget)
    
    const finalThemeConfig = {
      ...themeConfig,
      techDetails
    };

    const data = {
      client_name: formData.get('client_name'),
      company: formData.get('company'),
      service_type: formData.get('service_type'),
      price: Number(displayPrice.replace(/\./g, '')),
      timeline: formData.get('timeline'),
      custom_hero_title: formData.get('custom_hero_title') || null,
      custom_hero_subtitle: formData.get('custom_hero_subtitle') || null,
      custom_about: formData.get('custom_about') || null,
      custom_scope: scopeItems,
      custom_results: resultItems,
      custom_process: processItems,
      status: formData.get('status'),
      theme_config: finalThemeConfig
    }

    try {
      const response = await fetch(`/api/proposals/${initialData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Error al actualizar la propuesta')

      router.push('/admin/proposals')
      router.refresh()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto pb-12">
      <div className="flex items-center gap-4 mb-8">
        <Link href="/admin/proposals" className="p-2 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-colors">
          <ArrowLeft size={20} className="text-neutral-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Editor Avanzado de Propuesta</h1>
          <p className="text-neutral-500 text-sm">Personalización dinámica para: {initialData.company}</p>
        </div>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        <button onClick={() => setActiveTab('basic')} className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'basic' ? 'bg-brand text-white' : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'}`}>
          <LayoutTemplate size={16} /> Básicos & Diseño
        </button>
        <button onClick={() => setActiveTab('scope')} className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'scope' ? 'bg-brand text-white' : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'}`}>
          <BriefcaseIcon size={16} /> Alcance & Resultados
        </button>
        <button onClick={() => setActiveTab('process')} className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'process' ? 'bg-brand text-white' : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'}`}>
          <CheckSquare size={16} /> Proceso
        </button>
        <button onClick={() => setActiveTab('tech')} className={`px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 whitespace-nowrap transition-colors ${activeTab === 'tech' ? 'bg-brand text-white' : 'bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50'}`}>
          <FileText size={16} /> Detalles Técnicos & Legales
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* TAB 1: BASIC & DESIGN */}
        <div className={activeTab === 'basic' ? 'block space-y-6' : 'hidden'}>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
            <h2 className="text-lg font-semibold mb-6 pb-4 border-b border-neutral-100">Datos Principales</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div><label className="block text-sm font-medium mb-2">Cliente</label><input type="text" name="client_name" defaultValue={initialData.client_name} required className="w-full px-4 py-2 rounded-xl border" /></div>
              <div><label className="block text-sm font-medium mb-2">Empresa</label><input type="text" name="company" defaultValue={initialData.company} required className="w-full px-4 py-2 rounded-xl border" /></div>
              <div>
                <label className="block text-sm font-medium mb-2">Tipo de Servicio</label>
                <select name="service_type" defaultValue={initialData.service_type} className="w-full px-4 py-2 rounded-xl border">
                  <option value="ecommerce">E-Commerce</option>
                  <option value="web">Web Corporativa</option>
                  <option value="app">App</option>
                  <option value="marketing">Marketing</option>
                </select>
              </div>
              <div><label className="block text-sm font-medium mb-2">Inversión (COP)</label><input type="text" value={displayPrice} onChange={(e) => setDisplayPrice(e.target.value.replace(/\D/g, '') ? Number(e.target.value.replace(/\D/g, '')).toLocaleString('es-CO') : '')} className="w-full px-4 py-2 rounded-xl border" /></div>
              <div><label className="block text-sm font-medium mb-2">Tiempo Estimado</label><input type="text" name="timeline" defaultValue={initialData.timeline} className="w-full px-4 py-2 rounded-xl border" /></div>
              <div>
                <label className="block text-sm font-medium mb-2">Estado</label>
                <select name="status" defaultValue={initialData.status} className="w-full px-4 py-2 rounded-xl border">
                  <option value="pending">Pendiente</option>
                  <option value="approved">Aprobada</option>
                  <option value="rejected">Rechazada</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
            <h2 className="text-lg font-semibold mb-6 pb-4 border-b border-neutral-100">Diseño Visual y "Quiénes Somos"</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div><label className="block text-sm font-medium mb-2">Color Brand (Acento)</label><input type="color" value={themeConfig.primaryColor || '#FF6A00'} onChange={(e) => setThemeConfig({...themeConfig, primaryColor: e.target.value})} className="h-10 w-full rounded cursor-pointer" /></div>
              <div><label className="block text-sm font-medium mb-2">Pre-título de Sección</label><input type="text" value={themeConfig.aboutPreTitle} onChange={(e) => setThemeConfig({...themeConfig, aboutPreTitle: e.target.value})} className="w-full px-4 py-2 rounded-xl border" /></div>
            </div>
            <div className="mb-6"><label className="block text-sm font-medium mb-2">Texto Destacado</label><input type="text" value={themeConfig.aboutTitle} onChange={(e) => setThemeConfig({...themeConfig, aboutTitle: e.target.value})} className="w-full px-4 py-2 rounded-xl border" /></div>
            <div><label className="block text-sm font-medium mb-2">Descripción Completa (Párrafo)</label><textarea name="custom_about" defaultValue={initialData.custom_about || ''} className="w-full px-4 py-2 rounded-xl border h-24"></textarea></div>
          </div>
        </div>

        {/* TAB 2: SCOPE & RESULTS */}
        <div className={activeTab === 'scope' ? 'block space-y-6' : 'hidden'}>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-100">
               <h2 className="text-lg font-semibold">Alcance del Servicio</h2>
               <button type="button" onClick={() => setScopeItems([...scopeItems, { title: '', subtitle: '', icon: 'CheckCircle' }])} className="text-sm bg-neutral-100 px-3 py-1.5 flex gap-1 hover:bg-neutral-200 rounded-lg"><Plus size={16}/> Agregar</button>
            </div>
            <div className="grid grid-cols-1 gap-4">
               {scopeItems.map((item, i) => (
                  <div key={i} className="flex gap-4 items-start bg-neutral-50 p-4 rounded-xl border">
                     <div className="flex-1 space-y-3">
                       <input type="text" value={item.title} onChange={(e) => handleDynamicUpdate(setScopeItems, scopeItems, i, 'title', e.target.value)} placeholder="Título (Ej: Configuración de tienda)" className="w-full px-3 py-2 border rounded text-sm" />
                       <input type="text" value={item.subtitle} onChange={(e) => handleDynamicUpdate(setScopeItems, scopeItems, i, 'subtitle', e.target.value)} placeholder="Subtítulo opcional" className="w-full px-3 py-2 border rounded text-sm" />
                       <input type="text" value={item.icon || 'CheckCircle'} onChange={(e) => handleDynamicUpdate(setScopeItems, scopeItems, i, 'icon', e.target.value)} placeholder="Nombre ícono Lucide" className="w-full px-3 py-2 border rounded text-sm font-mono" />
                     </div>
                     <button type="button" onClick={() => setScopeItems(scopeItems.filter((_, index) => index !== i))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button>
                  </div>
               ))}
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-100">
               <h2 className="text-lg font-semibold">Resultados Esperados</h2>
               <button type="button" onClick={() => setResultItems([...resultItems, { title: '', subtitle: '' }])} className="text-sm bg-neutral-100 px-3 py-1.5 flex gap-1 hover:bg-neutral-200 rounded-lg"><Plus size={16}/> Agregar</button>
            </div>
            <div className="grid gap-4">
               {resultItems.map((item, i) => (
                  <div key={i} className="flex gap-2 items-center bg-neutral-50 p-3 rounded-xl border">
                     <div className="flex-1 space-y-2">
                       <input type="text" value={item.title} onChange={(e) => handleDynamicUpdate(setResultItems, resultItems, i, 'title', e.target.value)} placeholder="Resultado" className="w-full px-3 py-2 border rounded text-sm" />
                       <input type="text" value={item.subtitle} onChange={(e) => handleDynamicUpdate(setResultItems, resultItems, i, 'subtitle', e.target.value)} placeholder="Subtítulo" className="w-full px-3 py-2 border rounded text-sm" />
                     </div>
                     <button type="button" onClick={() => setResultItems(resultItems.filter((_, index) => index !== i))} className="p-2 text-red-500 hover:bg-red-50 rounded"><Trash2 size={18}/></button>
                  </div>
               ))}
            </div>
          </div>
        </div>

        {/* TAB 3: PROCESS */}
        <div className={activeTab === 'process' ? 'block space-y-6' : 'hidden'}>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-neutral-100">
               <h2 className="text-lg font-semibold">Proceso de Trabajo</h2>
               <button type="button" onClick={() => setProcessItems([...processItems, { title: '', subtitle: '' }])} className="text-sm bg-neutral-100 px-3 py-1.5 flex gap-1 hover:bg-neutral-200 rounded-lg"><Plus size={16}/> Agregar</button>
            </div>
            <div className="space-y-4">
               {processItems.map((item, i) => (
                  <div key={i} className="flex gap-4 items-center bg-neutral-50 p-4 rounded-xl border">
                     <div className="w-8 h-8 flex-shrink-0 bg-neutral-200 text-neutral-600 font-bold rounded-full flex items-center justify-center text-sm">{i+1}</div>
                     <div className="flex-1 space-y-2">
                       <input type="text" value={item.title} onChange={(e) => handleDynamicUpdate(setProcessItems, processItems, i, 'title', e.target.value)} placeholder="Título" className="w-full px-3 py-2 border rounded text-sm font-medium" />
                       <input type="text" value={item.subtitle} onChange={(e) => handleDynamicUpdate(setProcessItems, processItems, i, 'subtitle', e.target.value)} placeholder="Descripción breve" className="w-full px-3 py-2 border rounded text-sm" />
                     </div>
                     <button type="button" onClick={() => setProcessItems(processItems.filter((_, index) => index !== i))} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button>
                  </div>
               ))}
            </div>
          </div>
        </div>

        {/* TAB 4: TECH DETAILS & LEGAL (MODALS) */}
        <div className={activeTab === 'tech' ? 'block space-y-6' : 'hidden'}>
           <div className="bg-blue-50 border border-blue-200 text-blue-800 p-4 rounded-xl text-sm mb-6 flex gap-2">
             <span>ℹ️</span>
             <span>Esta información se renderizará automáticamente en la propuesta como <b>Modales Emergentes</b> para ahorrar scroll al cliente.</span>
           </div>

           {/* EXCLUSIONES */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
             <div className="flex justify-between items-center mb-4 pb-4 border-b border-neutral-100">
               <h2 className="text-lg font-semibold text-red-600">Exclusiones (No incluye)</h2>
               <button type="button" onClick={() => addTechItem('exclusions')} className="text-sm bg-neutral-100 px-3 py-1.5 flex gap-1 hover:bg-neutral-200 rounded-lg"><Plus size={16}/> Agregar</button>
             </div>
             <div className="space-y-2">
               {techDetails.exclusions.map((item: string, i: number) => (
                 <div key={i} className="flex items-center gap-2">
                   <input type="text" value={item} onChange={(e) => handleTechUpdate('exclusions', i, e.target.value)} className="flex-1 px-3 py-2 border rounded text-sm" />
                   <button type="button" onClick={() => removeTechItem('exclusions', i)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={16}/></button>
                 </div>
               ))}
             </div>
           </div>

           {/* ENTREGABLES */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
             <div className="flex justify-between items-center mb-4 pb-4 border-b border-neutral-100">
               <h2 className="text-lg font-semibold text-green-600">Entregables Principales</h2>
               <button type="button" onClick={() => addTechItem('deliverables')} className="text-sm bg-neutral-100 px-3 py-1.5 flex gap-1 hover:bg-neutral-200 rounded-lg"><Plus size={16}/> Agregar</button>
             </div>
             <div className="space-y-2">
               {techDetails.deliverables.map((item: string, i: number) => (
                 <div key={i} className="flex items-center gap-2">
                   <input type="text" value={item} onChange={(e) => handleTechUpdate('deliverables', i, e.target.value)} className="flex-1 px-3 py-2 border rounded text-sm" />
                   <button type="button" onClick={() => removeTechItem('deliverables', i)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={16}/></button>
                 </div>
               ))}
             </div>
           </div>

           {/* DEPENDENCIAS */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
             <div className="flex justify-between items-center mb-4 pb-4 border-b border-neutral-100">
               <h2 className="text-lg font-semibold text-orange-600">Dependencias del Cliente</h2>
               <button type="button" onClick={() => addTechItem('dependencies')} className="text-sm bg-neutral-100 px-3 py-1.5 flex gap-1 hover:bg-neutral-200 rounded-lg"><Plus size={16}/> Agregar</button>
             </div>
             <div className="space-y-2">
               {techDetails.dependencies.map((item: string, i: number) => (
                 <div key={i} className="flex items-center gap-2">
                   <input type="text" value={item} onChange={(e) => handleTechUpdate('dependencies', i, e.target.value)} className="flex-1 px-3 py-2 border rounded text-sm" />
                   <button type="button" onClick={() => removeTechItem('dependencies', i)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={16}/></button>
                 </div>
               ))}
             </div>
           </div>

           {/* REVISIONES */}
           <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
             <div className="flex justify-between items-center mb-4 pb-4 border-b border-neutral-100">
               <h2 className="text-lg font-semibold text-blue-600">Consideraciones y Revisiones</h2>
               <button type="button" onClick={() => addTechItem('revisions')} className="text-sm bg-neutral-100 px-3 py-1.5 flex gap-1 hover:bg-neutral-200 rounded-lg"><Plus size={16}/> Agregar</button>
             </div>
             <div className="space-y-2">
               {techDetails.revisions.map((item: string, i: number) => (
                 <div key={i} className="flex items-center gap-2">
                   <input type="text" value={item} onChange={(e) => handleTechUpdate('revisions', i, e.target.value)} className="flex-1 px-3 py-2 border rounded text-sm" />
                   <button type="button" onClick={() => removeTechItem('revisions', i)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={16}/></button>
                 </div>
               ))}
             </div>
           </div>
        </div>

        <div className="flex justify-end gap-4 shadow-sm bg-white p-4 rounded-xl border border-neutral-200 sticky bottom-4 z-50">
          <button type="submit" disabled={loading} className="w-full md:w-auto bg-brand hover:opacity-90 disabled:opacity-50 text-white px-8 py-3 rounded-xl font-medium flex items-center justify-center gap-2 transition-all">
            {loading ? 'Guardando...' : <><Save size={20} /> Guardar Toda la Configuración</>}
          </button>
        </div>
      </form>
    </div>
  )
}
