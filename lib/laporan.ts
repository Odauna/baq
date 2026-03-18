import Warga from "@/models/Warga";
import { dbConnect } from "./mongodb";
import Lain from "@/models/Lain";
import Distribusi from "@/models/Distribusi";

// Pengumpulan
export async function PZIRT(rt: '01' | '02' | '03' | '04' | '05' | '06') {
    await dbConnect()
    const sum = await Warga.aggregate([
        {
            $match: {rt: rt}
        },
        {
            $group: {
                _id: `ZI_RT.${rt}`,
                amount_zfb: {$sum: "$pengumpulan.fitrah_beras"},
                amount_zfu: {$sum: "$pengumpulan.fitrah_uang"},
                amount_zm: {$sum: "$pengumpulan.mal"},
                amount_i: {$sum: "$pengumpulan.infak"}
            }
        }
    ])
    const data_pzirt = JSON.parse(JSON.stringify(sum[0]))
    return data_pzirt
}

export async function TotalTimbangan() {
    await dbConnect()
    const timbangan = await Lain.findById('67e4c7fd7b56880b42664e89')
    const total = JSON.parse(JSON.stringify(timbangan))
    return total
}


// Distribusi
export async function DZIDusun(rt: '01' | '02' | '03' | '04' | '05' | '06') {
    await dbConnect()
    await Distribusi.aggregate([
        {
            $match: {
                area: 'Dusun',
                alamat: `RT.${rt}`
            }
        },
        {
            $group: {
                _id: `DZIDusun_RT.${rt}`,
                amount_zfb: {$sum: "$nominal"},
                amount_zfu: {$sum: "$nominal"},
                amount_zm: {$sum: "$nominal"},
                amount_i: {$sum: "$nominal"}
            }
        }
    ])
}



