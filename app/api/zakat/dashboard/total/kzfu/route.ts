import { dbConnect } from "@/lib/mongodb";
import Lain from "@/models/Lain";
import Warga from "@/models/Warga";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect()
    const konversi_zfu = []
    const zfu = await Warga.aggregate([
        {
            $match: { "pengumpulan.fitrah_uang": { $nin: [null,"",0] } }
        },
        {
            $group: {
                _id: 'total_zakat_fitrah_uang',
                nominal: { $sum: "$pengumpulan.fitrah_uang" }
            }
        }
    ])
    konversi_zfu.push(zfu)
    const konversi_b = await Lain.findOne({"keterangan": "Beras"})
    konversi_zfu.push([konversi_b])
    const konversi_u = await Lain.findOne({"keterangan": "Uang"})
    konversi_zfu.push([konversi_u])
    const zfb = await Warga.aggregate([
        {
            $match: { "pengumpulan.fitrah_beras": { $nin: [null,"",0] } }
        },
        {
            $group: {
                _id: 'total_zakat_fitrah_beras',
                nominal: { $sum: "$pengumpulan.fitrah_beras" }
            }
        }
    ])
    konversi_zfu.push(zfb)
    console.log(konversi_zfu)

    return NextResponse.json(konversi_zfu)
}