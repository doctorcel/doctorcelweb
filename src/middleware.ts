// src/middleware.ts

import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  async function middleware(req) {
    const token = req.nextauth.token;

    const pathname = req.nextUrl.pathname;

    // Rutas que requieren autenticación
    const protectedRoutes = ['/dashboard'];

    // Rutas que requieren ser ADMIN
    const adminRoutes = [
      '/dashboard/clients',
      '/dashboard/productsmanagement',
      '/dashboard/admin',
      '/dashboard/users',
    ];

    // Verificar si la ruta es protegida
    if (protectedRoutes.some(route => pathname.startsWith(route))) {
      if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
      }
    }

    // Verificar si la ruta es admin-only
    if (adminRoutes.some(route => pathname.startsWith(route))) {
      if (token?.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/dashboard', req.url));
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: ['/dashboard/:path*'],
};
