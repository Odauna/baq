import { dbConnect } from "@/lib/mongodb"
import Lain from "@/models/Lain"
import Timbang from "@/models/Timbang"
import Warga from "@/models/Warga"
import { NextResponse } from "next/server"

export async function GET() {
    await dbConnect()
    const total = []
    const sum = await Warga.aggregate([{
        $group: {
            _id: 'total_zi',
            amount_zfb: {$sum: "$pengumpulan.fitrah_beras"},
            amount_zfu: {$sum: "$pengumpulan.fitrah_uang"},
            amount_zm: {$sum: "$pengumpulan.mal"},
            amount_i: {$sum: "$pengumpulan.infak"}
        }
    }])
    total.push(sum)
    const timbangan = await Timbang.aggregate([{
        $group: {
            _id: 'total_timbangan_beras',
            amount: {$sum: "$nominal"}
        }
    }])
    total.push(timbangan)
    const uang = [await Lain.findOne({keterangan: 'Uang'})]
    total.push(uang)
    const beras = [await Lain.findOne({keterangan: 'Beras'})]
    total.push(beras)
    const sudah_zakat_beras = await Warga.aggregate([
        {
            $match: {"pengumpulan.fitrah_beras": { $nin: [null,"",0] }, "pengumpulan.waktu": { $nin: [null,""] }}
        },
        {
            $group: {
                _id: 'sudah_fitrah_beras',
                jiwa: {$sum: "$pengumpulan.tanggungan"}
            }
        }
    ])
    total.push(sudah_zakat_beras)
    console.log(total)
    return NextResponse.json(total)
}