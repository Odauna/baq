import { dbConnect } from "@/lib/mongodb"
import Lain from "@/models/Lain"
import Warga from "@/models/Warga"
import { NextResponse } from "next/server"

export async function GET() {
    const twszf_b = []
    await dbConnect()
    const sum_fitrah = await Warga.aggregate([
        {
            $match: {"pengumpulan.fitrah_beras": { $nin: [null, "", 0]}}
        },
        {
            $group: {
                _id: 'total_zakat_fitrah_beras',
                nominal: {$sum: "$pengumpulan.fitrah_beras"},
                jiwa: { $sum: "$pengumpulan.tanggungan" }
            }
        }
    ])
    twszf_b.push(sum_fitrah)
    const ketentuan = await Lain.findOne({"keterangan": "Beras"})
    twszf_b.push([ketentuan])
    console.log(twszf_b)
    return NextResponse.json(twszf_b)
}