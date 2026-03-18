'use server'

import { cookies } from "next/headers"

export async function setCookie(data: any) {
    const cookieStore = await cookies()
    cookieStore.set('parameter',data)
}