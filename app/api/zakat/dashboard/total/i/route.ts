import { dbConnect } from "@/lib/mongodb";
import Warga from "@/models/Warga";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect()
    const sum = await Warga.aggregate([{
        $group: {
            _id: 'total_infak',
            amount: {$sum: "$pengumpulan.infak"}
        }
    }])
    console.log(sum)
    return NextResponse.json(sum)
}