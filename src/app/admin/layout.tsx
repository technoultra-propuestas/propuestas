import Link from 'next/link'
import { FileText, LayoutDashboard, LogOut, Settings } from 'lucide-react'

export const metadata = {
  title: 'Admin | TECHNOULTRA',
  description: 'Panel de control para generador de propuestas',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-neutral-50 font-sans text-neutral-900">
      {/* Sidebar - Oculto/Superior en mobile, fijo en desktop */}
      <aside className="w-full md:w-64 bg-white border-b md:border-b-0 md:border-r border-neutral-200 static md:fixed h-auto md:h-full flex flex-col z-20">
        <div className="p-4 md:p-6 border-b border-neutral-200 flex justify-between md:block items-center">
          <div>
            <h1 className="text-xl font-bold tracking-tight">TECHNO<span className="text-brand">ULTRA</span></h1>
            <p className="hidden md:block text-xs text-neutral-500 mt-1 uppercase tracking-widest">Workspace</p>
          </div>
          <div className="md:hidden">
            <span className="text-xs bg-orange-100 text-brand px-2 py-1 rounded font-bold">ADMIN</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
          <Link 
            href="/admin/proposals" 
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-orange-50 text-brand font-medium transition-colors"
          >
            <FileText size={20} />
            Propuestas
          </Link>
          <Link 
            href="#" 
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors"
          >
            <LayoutDashboard size={20} />
            Estadísticas
          </Link>
          <Link 
             href="#" 
             className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-neutral-600 hover:bg-neutral-100 transition-colors"
          >
            <Settings size={20} />
            Configuración
          </Link>
        </nav>

        <div className="p-4 border-t border-neutral-200 hidden md:block">
          <form action="/api/auth/logout" method="POST">
             <button type="submit" className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-neutral-600 hover:bg-red-50 hover:text-red-600 transition-colors">
               <LogOut size={20} />
               Cerrar Sesión
             </button>
          </form>
        </div>
      </aside>

      {/* Solo en desktop hay margin-left debido a que fixed solo aplica ahí */}
      <main className="flex-1 md:ml-64 p-4 md:p-8 w-full max-w-[100vw] overflow-x-hidden">
        {children}
      </main>
    </div>
  )
}
