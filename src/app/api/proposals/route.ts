import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { randomUUID } from 'crypto'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')?.value
    
    // Autenticación Zero Trust en el backend explícita
    if (!token || token !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
    }

    const data = await request.json()
    
    // Generar un slug seguro y difícil de adivinar (Zero Trust)
    const rawUuid = randomUUID()
    const slug = rawUuid.replace(/-/g, '').substring(0, 16)
    
    const insertData = {
      client_name: data.client_name,
      company: data.company,
      service_type: data.service_type,
      price: data.price,
      timeline: data.timeline,
      custom_hero_title: data.custom_hero_title || null,
      custom_hero_subtitle: data.custom_hero_subtitle || null,
      custom_conditions: data.custom_conditions,
      theme_config: data.theme_config || {},
      slug,
      status: 'pending'
    }

    // Usar SERVICE ROLE KEY de forma segura en el servidor para esquivar RLS en inserción
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    let { data: result, error } = await supabaseAdmin
      .from('proposals')
      .insert([insertData])
      .select()
      .single()

    if (error) {
      // SI FALLA POR CACHÉ DE COLUMNA, REINTENTAR SIN THEME_CONFIG
      if (error.message.includes("theme_config")) {
        console.warn('Fallback: Reintentando inserción sin theme_config por error de caché de Postgres')
        const { theme_config, ...fallbackData } = insertData;
        
        const { data: retryResult, error: retryError } = await supabaseAdmin
          .from('proposals')
          .insert([fallbackData])
          .select()
          .single()

        if (retryError) {
            console.error('Supabase retry error:', retryError)
            return NextResponse.json({ error: retryError.message }, { status: 500 })
        }
        result = retryResult;
        error = null; // Limpiar para que continúe
      } else {
        console.error('Supabase error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true, data: result }, { status: 201 })
  } catch (err: any) {
    console.error('API error:', err)
    return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 })
  }
}
