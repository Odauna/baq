import { dbConnect } from "@/lib/mongodb";
import Distribusi from "@/models/Distribusi";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect()
    const fitrah = []
    const sum_fbtd = await Distribusi.aggregate([
        {
            $match: { "jenis": "Fitrah (Beras)",  "waktu": { $nin: [null, ""] }}
        },
        {
            $group: {
                _id: 'total_zakat_fitrah_beras_terdistribusi',
                amount: { $sum: "nominal" }
            }
        }
    ])
    fitrah.push(sum_fbtd)
    const sum_futd = await Distribusi.aggregate([
        {
            $match: { "jenis": "Fitrah (Uang)", "waktu": { $nin: [null, ""] }}
        },
        {
            $group: {
                _id: 'total_zakat_fitrah_uang_terdistribusi',
                amount: { $sum: "nominal" }
            }
        }
    ])
    fitrah.push(sum_futd)
    
    return NextResponse.json(fitrah)
}