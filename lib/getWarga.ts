import Warga from "@/models/Warga";
import { createZodFetcher } from  "zod-fetch";

createZodFetcher()

export async function getWarga(id: string) {
    // const warga = await fetchWarga(
    //     wargaSchema,
    //     `http://192.168.0.107:3000/api/warga/${id}`,
    //     { cache: 'no-store' }
    // )
    const warga = await Warga.findById(id)
    // console.log(warga)
    return JSON.parse(JSON.stringify(warga))
}