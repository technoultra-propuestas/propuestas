import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')?.value
    
    // Autenticación Zero Trust en el backend explícita
    if (!token || token !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const data = await request.json()
    
    // Validar datos mínimos
    if (!data.client_name || !data.company || !data.service_type || !data.price || !data.timeline) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 })
    }

    const updateData = {
      client_name: data.client_name,
      company: data.company,
      service_type: data.service_type,
      price: data.price,
      timeline: data.timeline,
      custom_hero_title: data.custom_hero_title,
      custom_hero_subtitle: data.custom_hero_subtitle,
      custom_about: data.custom_about,
      custom_scope: data.custom_scope,
      custom_results: data.custom_results,
      custom_process: data.custom_process,
      custom_requirements: data.custom_requirements,
      custom_conditions: data.custom_conditions,
      theme_config: data.theme_config,
      status: data.status,
    }

    // Usar SERVICE ROLE KEY de forma segura en el servidor para actualizar sin restricciones RLS
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    let { data: result, error } = await supabaseAdmin
      .from('proposals')
      .update(updateData)
      .eq('id', resolvedParams.id)
      .select()
      .single()

    if (error) {
      if (error.message.includes("theme_config")) {
         console.warn('Fallback PUT: Reintentando actualización sin theme_config por caché de postgres');
         const { theme_config, ...fallbackUpdate } = updateData;
         
         const { data: retryResult, error: retryError } = await supabaseAdmin
           .from('proposals')
           .update(fallbackUpdate)
           .eq('id', resolvedParams.id)
           .select()
           .single()

         if (retryError) throw retryError;
         result = retryResult;
      } else {
        throw error;
      }
    }

    return NextResponse.json(result)
  } catch (err: any) {
    console.error('Error al actualizar propuesta:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')?.value
    
    // Autenticación Zero Trust en el backend explícita
    if (!token || token !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    // Usar SERVICE ROLE KEY
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { error } = await supabaseAdmin
      .from('proposals')
      .delete()
      .eq('id', resolvedParams.id)

    if (error) throw error

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Error al eliminar propuesta:', err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
