import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Scope from '@/components/sections/Scope'
import Results from '@/components/sections/Results'
import Timeline from '@/components/sections/Timeline'
import Onboarding from '@/components/sections/Onboarding'
import ProjectDetails from '@/components/sections/ProjectDetails'
import Pricing from '@/components/sections/Pricing'
import { defaultContent } from '@/config/defaultContent'
import Link from 'next/link'
import { Check } from 'lucide-react'

export const dynamic = 'force-dynamic'

// Prevén indexación de motores de búsqueda para proteger las URL de propuestas
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Propuesta Estratégica | TECHNOULTRA',
    robots: {
      index: false,
      follow: false,
    },
  }
}

export default async function ProposalPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  
  const { data: proposal, error } = await supabase
    .from('proposals')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .single()

  if (error || !proposal) {
    notFound()
  }

  // Definición de Alcance dinámico según el tipo de servicio por defecto
  const defaultScope = proposal.service_type === 'ecommerce' 
    ? ["Plataforma de E-Commerce Escalable", "Pasarelas de Pago Integradas", "Gestión de Inventario", "Diseño Orientado a Conversión"]
    : proposal.service_type === 'web'
    ? ["Desarrollo Frontend Optimizado", "CMS Autogestionable", "SEO Técnico On-Page", "Diseño UI/UX Premium"]
    : proposal.service_type === 'app'
    ? ["Desarrollo Nativo / Híbrido", "Panel Administrativo Cloud", "Notificaciones Push", "Publicación en Stores"]
    : ["Auditoría de Mercado", "Estrategia de Pauta Digital (Ads)", "Funnels de Conversión", "Dashboard de Analítica"];

  const defaultResults = [
    "Aumento en Retención de Usuarios",
    "Optimización de Tiempos de Carga",
    "Adquisición de Clientes Automatizada",
    "Infraestructura Segura (Zero Trust)"
  ];

  return (
    <main 
      className="bg-neutral-50 font-sans selection:bg-brand selection:text-white"
      style={{
        '--brand-color': proposal.theme_config?.primaryColor || '#FF6A00'
      } as React.CSSProperties}
    >
      <Hero 
        clientName={proposal.client_name}
        company={proposal.company}
        serviceType={proposal.service_type}
        customTitle={proposal.custom_hero_title}
        customSubtitle={proposal.custom_hero_subtitle}
      />
      
      
      <About 
        content={proposal.custom_about}
        defaultContent={defaultContent.about}
        themeConfig={proposal.theme_config}
      />
      
      <Scope 
        customItems={proposal.custom_scope}
        defaultItems={defaultScope}
      />

      <Results 
        customItems={proposal.custom_results}
        defaultItems={defaultResults}
      />

      <Timeline 
        customItems={proposal.custom_process}
        defaultItems={defaultContent.process}
        estimatedTime={proposal.timeline}
      />

      <Onboarding />

      <ProjectDetails 
        themeConfig={proposal.theme_config}
      />

      <Pricing 
        price={Number(proposal.price)}
      />

      {/* CTA Final */}
      <section className="py-24 bg-white text-center border-t border-neutral-200 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="max-w-3xl mx-auto px-6 relative z-10">
          <h2 className="text-4xl font-bold mb-6 tracking-tight text-neutral-900">¿Listo para transformar su operación?</h2>
          <p className="text-xl text-neutral-500 mb-12">
            Al aprobar esta propuesta, daremos inicio a la orquestación técnica. Validaremos la seguridad, alcance y tiempos.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <a 
               href="https://wa.me/573183943465?text=aprobado%20empecemos%20con%20el%20proyecto" 
               target="_blank" 
               rel="noopener noreferrer" 
               className="w-full sm:w-auto bg-brand hover:bg-[#e05d00] text-white px-8 py-4 rounded-xl font-bold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3"
             >
               <Check size={24} />
               Activar Propuesta
             </a>
             <Link href="https://wa.me/573007296067" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto bg-neutral-100 hover:bg-neutral-200 text-neutral-800 px-8 py-4 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2">
               Contactar Asesor
             </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
