import { supabase } from '@/lib/supabase'
import Link from 'next/link'
import { Plus, Edit, Copy, ExternalLink, FileText } from 'lucide-react'

// Asegura que la página no se cachee de forma estática, siempre traiga lo último
export const dynamic = 'force-dynamic'

export default async function ProposalsPage() {
  const { data: proposals, error } = await supabase
    .from('proposals')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Error cargando propuestas:", error)
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Propuestas Comerciales</h1>
          <p className="text-neutral-500 mt-1">Administra y crea nuevas propuestas para clientes.</p>
        </div>
        <Link 
          href="/admin/proposals/new"
          className="bg-brand hover:bg-[#e05d00] text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-colors shadow-sm"
        >
          <Plus size={20} />
          Nueva Propuesta
        </Link>
      </div>

      {error ? (
        <div className="p-6 bg-red-50 text-red-600 rounded-xl border border-red-200">
          Error al cargar propuestas: {error.message}. Verifica la conexión a Supabase y que la tabla exista.
        </div>
      ) : proposals && proposals.length > 0 ? (
        <div className="bg-white border text-sm border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 font-medium">
                <th className="p-4">Cliente / Empresa</th>
                <th className="p-4">Servicio</th>
                <th className="p-4">Inversión</th>
                <th className="p-4">Estado</th>
                <th className="p-4">Fecha</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200">
              {proposals.map((prop) => (
                <tr key={prop.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="p-4">
                    <div className="font-semibold text-neutral-900">{prop.client_name}</div>
                    <div className="text-neutral-500">{prop.company}</div>
                  </td>
                  <td className="p-4 capitalize">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                      {prop.service_type}
                    </span>
                  </td>
                  <td className="p-4 font-medium">${Number(prop.price).toLocaleString()} COP</td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      prop.status === 'approved' ? 'bg-green-50 text-green-700' :
                      prop.status === 'rejected' ? 'bg-red-50 text-red-700' :
                      'bg-orange-50 text-orange-700'
                    }`}>
                      {prop.status === 'pending' ? 'Pendiente' : prop.status === 'approved' ? 'Aprobada' : 'Rechazada'}
                    </span>
                  </td>
                  <td className="p-4 text-neutral-500">
                    {new Date(prop.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <div className="flex justify-end gap-2">
                      <Link 
                        href={`/admin/proposals/${prop.id}/edit`}
                        className="p-2 text-neutral-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Editar"
                      >
                        <Edit size={18} />
                      </Link>
                      <button 
                        className="p-2 text-neutral-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Duplicar"
                      >
                        <Copy size={18} />
                      </button>
                      <Link 
                        href={`/proposal/${prop.slug}`}
                        target="_blank"
                        className="p-2 text-neutral-400 hover:text-brand hover:bg-orange-50 rounded-lg transition-colors"
                        title="Ver Propuesta"
                      >
                        <ExternalLink size={18} />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-16 bg-white border border-dashed border-neutral-300 rounded-2xl">
          <FileText size={48} className="mx-auto text-neutral-300 mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-1">Aún no hay propuestas</h3>
          <p className="text-neutral-500 mb-6 max-w-sm mx-auto">
            Crea tu primera propuesta comercial increíble y sorprende a tu cliente.
          </p>
          <Link 
            href="/admin/proposals/new"
            className="inline-flex items-center gap-2 bg-brand hover:bg-[#e05d00] text-white px-5 py-2.5 rounded-xl font-medium transition-colors"
          >
            <Plus size={20} />
            Crear Propuesta
          </Link>
        </div>
      )}
    </div>
  )
}
