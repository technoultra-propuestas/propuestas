import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Proteger todas las rutas bajo /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Permitir el acceso al formulario de login
    if (request.nextUrl.pathname === '/admin/login') {
      return NextResponse.next();
    }
    
    // Auth simple por cookies (Zero Trust concept base: no confía en frontend, valida el server)
    const token = request.cookies.get('admin_token')?.value;
    const envPassword = process.env.ADMIN_PASSWORD as string;
    
    if (!token || token.trim() !== envPassword?.trim()) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
