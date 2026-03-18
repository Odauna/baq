import { dbConnect } from "@/lib/mongodb";
import Warga from "@/models/Warga";
import { NextResponse } from "next/server";

// Total Zakat & Infak
export async function GET() {
    await dbConnect()
    const sum = await Warga.aggregate([{
        $group: {
            _id: 'total_zi',
            amount_zfb: {$sum: "$pengumpulan.fitrah_beras"},
            amount_zfu: {$sum: "$pengumpulan.fitrah_uang"},
            amount_zm: {$sum: "$pengumpulan.mal"},
            amount_i: {$sum: "$pengumpulan.infak"}
        }
    }])
    console.log(sum)
    return NextResponse.json(sum)
}