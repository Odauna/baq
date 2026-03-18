import { dbConnect } from "@/lib/mongodb";
import Warga from "@/models/Warga";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect()
    const sum = await Warga.aggregate([{
        $group: {
            _id: 'total_zakat_fitrah_uang',
            amount: {$sum: "$pengumpulan.fitrah_uang"}
        }
    }])
    console.log(sum)
    return NextResponse.json(sum)
}