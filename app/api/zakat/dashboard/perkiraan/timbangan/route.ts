import { dbConnect } from "@/lib/mongodb"
import Timbang from "@/models/Timbang"
import Warga from "@/models/Warga"
import { NextResponse } from "next/server"

export async function GET() {
    const beras = []
    await dbConnect()
    const timbangan_b = await Timbang.aggregate([{
        $group: {
            _id: 'total timbangan beras',
            nominal: { $sum: "$nominal" }
        }
    }])
    beras.push(timbangan_b)
    const terkumpul_b = await Warga.aggregate([
        {
            $group: {
                _id: 'total_zakat_fitrah_beras',
                nominal: { $sum: "$pengumpulan.fitrah_beras" }
            }
        }
    ])
    beras.push(terkumpul_b)

    return NextResponse.json(beras)
}