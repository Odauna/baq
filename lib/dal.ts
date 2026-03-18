import 'server-only'

import { cookies } from 'next/headers'
import { decrypt } from './auth/sessions'
import { redirect } from 'next/navigation'
import { cache } from 'react'
import { dbConnect } from './mongodb'
import User from '@/models/User'

export const verifySession = cache(async () => {
    const cookieStore = await cookies()
    const cookie = cookieStore.get('session')?.value
    const session = await decrypt(cookie)
    // console.log(session)

    if (!session?.userId) {
        redirect('/login')
    }
    if (session?.userAktif !== "Ya") {
        redirect('/login')
    }

    return { isAuth: true, userId: session.userId, userLevel: session.userLevel }
})

export const getUser = cache(async () => {
    const session = await verifySession()
    if (!session) return null

    try {
        await dbConnect()
        // console.log(session.userId)
        const data = await User.findById(session.userId, "nama level username akses kegiatan").exec()
        const user = data
        // if (user.aktif == "Ya") {
        return JSON.stringify(user)
        // } else {
        //     return null
        // }
        // console.log(user)
        // return user.json()
    } catch (_error) {
        console.log('Failed to fetch user')
        return null
    }
})