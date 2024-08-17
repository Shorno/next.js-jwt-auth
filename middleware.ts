import {NextRequest, NextResponse} from 'next/server';
import {jwtVerify} from "jose"

export async function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('auth_token')?.value;
    const JWT_SECRET = process.env.JWT_SECRET;
    const jwt_unit8Array = new TextEncoder().encode(JWT_SECRET);

    const publicRoutes = ['/', '/login', '/signup'];
    const isPublicRoute = publicRoutes.includes(path);

    if (!token) {
        if (isPublicRoute) {
            return NextResponse.next();
        }
        return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
        await jwtVerify(token, jwt_unit8Array)
        if (path === '/login' || path === '/signup') {
            return NextResponse.redirect(new URL('/', request.url));
        }
        return NextResponse.next();
    } catch (error) {
        console.error('Token verification failed:', error);
        const response = NextResponse.redirect(new URL('/login', request.url));
        response.cookies.delete('auth_token');
        return response;
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};