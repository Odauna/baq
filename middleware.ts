// import NextAuth from "next-auth";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { decrypt, updateSession } from "./lib/auth/sessions";

// export { auth } from "@/auth"
const protectedRoutes = ['/kurban','/zakat']
const publicRoutes = ['login','/']

export default async function middleware(request: NextRequest) {
    let param = ''
    if (request.nextUrl.pathname.includes('01')) {
        param = '01'
    }
    if (request.nextUrl.pathname.includes('02')) {
        param = '02'
    }
    if (request.nextUrl.pathname.includes('03')) {
        param = '03'
    }
    if (request.nextUrl.pathname.includes('04')) {
        param = '04'
    }
    if (request.nextUrl.pathname.includes('05')) {
        param = '05'
    }
    if (request.nextUrl.pathname.includes('06')) {
        param = '06'
    }
    if (request.nextUrl.pathname.includes('timbangan')) {
        param = 'Timbangan'
    }
    if (request.nextUrl.pathname.includes('dusun')) {
        param = 'Dusun'
    }
    if (request.nextUrl.pathname.includes('luar-dusun')) {
        param = 'Luar Dusun'
    }
    if (request.nextUrl.pathname.includes('amal-usaha')) {
        param = 'Amal Usaha'
    }
    if (request.nextUrl.pathname.includes('proposal')) {
        param = 'Pengajuan Proposal'
    }
    if (request.nextUrl.pathname.includes('aktivis-masjid')) {
        param = 'Aktivis Masjid'
    }
    if (request.nextUrl.pathname.includes('amil')) {
        param = 'Amil'
    }
    if (request.nextUrl.pathname.includes('pengeluaran-infak')) {
        param = 'Pengeluaran Infak'
    }
    if (request.nextUrl.pathname.includes('rekomendasi')) {
        param = 'Rekomendasi'
    }
    if (request.nextUrl.pathname.includes('pembagian')) {
        param = 'Pembagian'
    }
    // let param = request.cookies.get('parameter')
    // let path_param = ''
    // if (request.nextUrl.pathname.match('/kurban')) {
    //     path_param = 'Dashboard'
    // }
    // if (request.nextUrl.pathname.match('/kurban/chat')) {
    //     path_param = 'Chat'
    // }
    // if (request.nextUrl.pathname.match('/kurban/aktivitas')) {
    //     path_param = 'Aktivitas Kurban'
    // }
    // if (request.nextUrl.pathname.startsWith('/kurban/aktivitas')) {
    //     path_param = 'Aktivitas Kurban'
    // }
    // if (request.nextUrl.pathname.match('/kurban/distribusi/koefisien')) {
    //     path_param = 'Koefisien'
    // }
    // if (request.nextUrl.pathname.match('/kurban/distribusi/rt')) {
    //     path_param = 'Distribusi Mustahik Dalam dan Luar'
    // }
    // if (request.nextUrl.pathname.match('/kurban/distribusi/masuk')) {
    //     path_param = 'Distribusi Masuk'
    // }
    // if (request.nextUrl.pathname.match('/kurban/distribusi/proposal')) {
    //     path_param = 'Distribusi Keluar'
    // }
    // if (request.nextUrl.pathname.match('/kurban/distribusi/tambahan')) {
    //     path_param = 'Distribusi Keluar'
    // }
    // if (request.nextUrl.pathname.match('/kurban/users')) {
    //     path_param = 'Users'
    // }
    // console.log(param)
    // request.cookies.delete('undefined')
    const response = NextResponse.next()
    response.cookies.set('parameter', param)
    // response.cookies.set('title', path_param)
    // request.cookies.delete('url')
    // response.cookies.set({
    //     name: 'parameter',
    //     value: param
    // })
    
    // harus login /
    const path = request.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)
    
    // if (isProtectedRoute && !session?.userId && !path.startsWith('/kurban')) {
    //     return NextResponse.redirect(new URL('/login', request.nextUrl))
    // }
    if (isProtectedRoute && !session?.userId && !path.startsWith('/zakat')) {
        console.log('login')
        return NextResponse.redirect(new URL('/login', request.nextUrl))
    }

    // if (isPublicRoute && session?.userId && !path.startsWith('/kurban')) {
    //     return NextResponse.redirect(new URL('/kurban', request.nextUrl))
    // }
    if (isPublicRoute && session?.userId && !path.startsWith('/zakat')) {
        console.log("zakat")
        return NextResponse.redirect(new URL('/zakat', request.nextUrl))
    }

    await updateSession()

    return response
    // const {rt} = useParams<{rt: string; area: string}>();
    // const headers = new Headers(request.headers);
    // headers.set("param", request.nextUrl.pathname);

    // return NextResponse.next({headers})
}

export const config = {
    matcher: ['/zakat/warga/:path*', '/zakat/pengumpulan/:path*', '/zakat/distribusi/:path*', '/zakat/penyesuaian-zakat-fitrah/:path', '/kurban:path*', '/((?!api|_next/static|_next/image|.*\\.png$).*)']
}