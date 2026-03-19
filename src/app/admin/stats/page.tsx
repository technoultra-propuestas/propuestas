import { supabase } from '@/lib/supabase'

export default async function StatsPage() {
  const { data: proposals, error } = await supabase
    .from('proposals')
    .select('*')

  if (error) {
    return <div className="p-8">Error al cargar estadísticas: {error.message}</div>
  }

  const total = proposals?.length || 0
  const approved = proposals?.filter(p => p.status === 'approved').length || 0
  const pending = proposals?.filter(p => p.status === 'pending').length || 0
  const rejected = proposals?.filter(p => p.status === 'rejected').length || 0
  
  const totalValue = proposals?.reduce((acc, p) => acc + Number(p.price || 0), 0) || 0
  const approvedValue = proposals?.filter(p => p.status === 'approved').reduce((acc, p) => acc + Number(p.price || 0), 0) || 0

  return (
    <div className="max-w-6xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Estadísticas de Negocio</h1>
        <p className="text-neutral-500 text-sm">Resumen general del rendimiento de tus propuestas comerciales.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
          <p className="text-sm text-neutral-500 font-medium mb-1">Total Propuestas</p>
          <p className="text-3xl font-bold tracking-tight">{total}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
          <p className="text-sm text-neutral-500 font-medium mb-1">Aprobadas</p>
          <p className="text-3xl font-bold tracking-tight text-green-600">{approved}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
          <p className="text-sm text-neutral-500 font-medium mb-1">Pendientes</p>
          <p className="text-3xl font-bold tracking-tight text-orange-500">{pending}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
          <p className="text-sm text-neutral-500 font-medium mb-1">Rechazadas</p>
          <p className="text-3xl font-bold tracking-tight text-red-600">{rejected}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full blur-[40px] -mr-16 -mt-16 pointer-events-none"></div>
          <p className="text-sm text-neutral-500 font-medium mb-2 relative z-10">Valor Total Cotizado (COP)</p>
          <p className="text-4xl font-black tracking-tighter relative z-10 text-neutral-900">${totalValue.toLocaleString('es-CO')}</p>
        </div>
        
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-full blur-[40px] -mr-16 -mt-16 pointer-events-none"></div>
          <p className="text-sm text-neutral-500 font-medium mb-2 relative z-10">Valor Total Cerrado (Aprobadas)</p>
          <p className="text-4xl font-black tracking-tighter relative z-10 text-green-700">${approvedValue.toLocaleString('es-CO')}</p>
        </div>
      </div>
    </div>
  )
}
