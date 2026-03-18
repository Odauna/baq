import { dbConnect } from "@/lib/mongodb";
import Warga from "@/models/Warga";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect()
    const sum = await Warga.aggregate([
        {
            $match: {"pengumpulan.waktu": { $nin: [null, ""] }}
        },
        {
            $group: {
                _id: 'total_jiwa_sudah_zakat_fitrah',
                amount: {$sum: "$pengumpulan.tanggungan"}
            }
        }
    ])
    return NextResponse.json(sum)
}