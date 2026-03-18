import { cookies } from "next/headers"
import { decrypt } from "./auth/sessions"


export async function useSession() {
    const cookie = (await cookies()).get('session')?.value
    const session = await decrypt(cookie)
    const getId = session?.userId
    return getId
}