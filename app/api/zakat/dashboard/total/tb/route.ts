import { dbConnect } from "@/lib/mongodb"
import Lain from "@/models/Lain"
import Timbang from "@/models/Timbang"
import { NextResponse } from "next/server"

export async function GET() {
    await dbConnect()
    const timbangan = await Timbang.aggregate([{
        $group: {
            _id: 'total_timbangan_beras',
            amount: {$sum: "$nominal"}
        }
    }])
    console.log(timbangan)
    return NextResponse.json(timbangan)
}