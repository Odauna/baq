import { dbConnect } from "@/lib/mongodb";
import Distribusi from "@/models/Distribusi";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect()
    const infq = await Distribusi.aggregate([
        {
            $match: { area: 'Pengeluaran Infak', jenis: 'Infak', waktu: { $nin: [null, ""] }}
        },
        {
            $group: {
                _id: `Infak`,
                jumlah_salur_i: { $sum: '$nominal'}
            }
        }
    ])
    return NextResponse.json(infq)
}