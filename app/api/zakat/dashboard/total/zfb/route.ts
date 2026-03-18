import { dbConnect } from "@/lib/mongodb";
import Warga from "@/models/Warga";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect()
    const sum = await Warga.aggregate([{
        $group: {
            _id: 'total_zakat_fitrah_beras',
            amount: {$sum: "$pengumpulan.fitrah_beras"}
        }
    }])
    return NextResponse.json(sum)
}