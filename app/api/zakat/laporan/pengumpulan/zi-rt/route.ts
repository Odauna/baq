import { dbConnect } from "@/lib/mongodb"
import Warga from "@/models/Warga"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const rtw = searchParams.get('rt')
    await dbConnect()
    const sum = await Warga.aggregate([
        {
            $match: {rt: rtw}
        },
        {
            $group: {
                _id: `ZI_RT.${rtw}`,
                amount_zfb: {$sum: "$pengumpulan.fitrah_beras"},
                amount_zfu: {$sum: "$pengumpulan.fitrah_uang"},
                amount_zm: {$sum: "$pengumpulan.mal"},
                amount_i: {$sum: "$pengumpulan.infak"}
            }
        }
    ])
    return NextResponse.json(sum)
}