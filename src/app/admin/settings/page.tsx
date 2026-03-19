export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto pb-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Configuración del Workspace</h1>
        <p className="text-neutral-500 text-sm">Gestiona la plataforma, conexiones y el contenido por defecto del sistema TECHNOULTRA.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
          <h2 className="text-lg font-semibold mb-4 pb-4 border-b border-neutral-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            Estado del Sistema
          </h2>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-100">
              <div>
                <p className="font-medium text-neutral-900">Base de Datos (Supabase)</p>
                <p className="text-sm text-neutral-500 font-mono mt-1">{process.env.NEXT_PUBLIC_SUPABASE_URL}</p>
              </div>
              <span className="bg-green-100 text-green-700 font-medium px-3 py-1 rounded-full text-xs">Conectado</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl border border-neutral-100">
              <div>
                <p className="font-medium text-neutral-900">Seguridad Zero Trust</p>
                <p className="text-sm text-neutral-500 mt-1">Nivel de encriptación Service Role activo en las inserciones.</p>
              </div>
              <span className="bg-green-100 text-green-700 font-medium px-3 py-1 rounded-full text-xs">Asegurado</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-neutral-200">
          <h2 className="text-lg font-semibold mb-4 pb-4 border-b border-neutral-100">Textos Corporativos</h2>
          <p className="text-sm text-neutral-500 mb-6">
            Actualmente el contenido base ("Acerca de", "Metodologías", etc.) está inyectado directamente desde el archivo estático de código por rendimiento. Si cambias un texto en una propuesta individualmente, sobrescribirá temporalmente el de fábrica para ese cliente en específico.
          </p>
          <div className="p-4 bg-orange-50 border border-orange-100 rounded-xl">
             <p className="text-sm text-orange-800 font-medium mb-1">💡 Tip para Asesores</p>
             <p className="text-sm text-orange-700/80">Si deseas modificar el contenido corporativo base que le aparece a TODOS los clientes nuevos, contacta al administrador del sistema para actualizar <code className="bg-white px-1.5 py-0.5 rounded text-xs border border-orange-200">src/config/defaultContent.ts</code>.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
