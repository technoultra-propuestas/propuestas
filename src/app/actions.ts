'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function loginAction(formData: FormData) {
  const password = formData.get('password') as string;
  const envPassword = process.env.ADMIN_PASSWORD as string;
  
  if (password?.trim() === envPassword?.trim()) {
    const cookieStore = await cookies()
    cookieStore.set('admin_token', password.trim(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 1 semana
    })
    
    redirect('/admin/proposals')
  } else {
    const isLoaded = !!process.env.ADMIN_PASSWORD;
    const length = process.env.ADMIN_PASSWORD?.length || 0;
    
    return { 
      error: `Contraseña incorrecta. (Diagnóstico Vercel: Configurada=${isLoaded ? 'SÍ' : 'NO'}, Largo=${length})` 
    }
  }
}
