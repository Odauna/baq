import 'server-only'
import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'


const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: Record<string, unknown>) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('1d')
        .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
    try {
        const { payload } = await jwtVerify(session, encodedKey, {
            algorithms: ['HS256']
        })
        return payload
    } catch (_error) {
        console.error('Failed to verify session')
        deleteSession()
    }
}

export async function createSession(userId: string, userLevel: 'Petugas'|'Distributor'|'Admin', userAktif: 'Ya'|'Tidak', userKegiatan: 'Kurban'|'Zakat') {

    const expiresAt = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)
    const session = await encrypt({ userId, userLevel, userAktif, userKegiatan,  expiresAt })
    const cookieStore = await cookies()

    cookieStore.set('session', session, {
        httpOnly: true,
        // secure: true,
        expires: expiresAt,
        sameSite: 'lax',
        path: '/'
    })
}

export async function updateSession() {
    const session = (await cookies()).get('session')?.value
    const payload = await decrypt(session)

    if (!session || !payload) {
        return null
    }

    const expires = new Date(Date.now() + 1 * 24 * 60 * 60 * 1000)

    const cookieStore = await cookies()
    cookieStore.set('session', session, {
        httpOnly: true,
        // secure: true,
        expires: expires,
        sameSite: 'lax',
        path: '/'
    })
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete('session')
}