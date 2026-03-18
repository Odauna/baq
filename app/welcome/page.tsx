import { getUser } from "@/lib/dal"
import { redirect } from "next/navigation"

export default async function Page() {
    const user = await getUser()
    if (JSON.parse(JSON.parse(JSON.stringify(user))).kegiatan == "Kurban") {
        redirect('/kurban')
    }
    return (
        <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm space-y-4">
                    <h2>Selamat datang, !</h2>
                    <p>Mohon tunggu, sedang memuat...</p>
                </div>
            </div>
        </div>
    )
}