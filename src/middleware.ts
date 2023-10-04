import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import jwt from "jsonwebtoken";

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname
    const isPublicPath = path === '/login' || path === '/signup' || path === '/reset-password'

    const token = request.cookies.get('token')?.value || ''

    request.cookies.set('token', token)

    // Если маршрут является общедоступным и у пользователя есть действительный токен, перенаправляем его на профиль
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/admin', request.nextUrl))
    }

    // Если маршрут не общедоступный и у пользователя нет токена и пользователь не на странице входа, перенаправляем его на страницу входа
    if (!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

}


// Сопоставление путей для промежуточного программного обеспечения
export const config = {
    matcher: [
        '/admin/:path*',
        '/login',
        '/signup',
        '/reset-password'
    ],
}
