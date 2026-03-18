import { dbConnect } from "@/lib/mongodb";
import Lain from "@/models/Lain";
import { NextResponse } from "next/server";


export async function GET() {
    await dbConnect()
    const konversi = await Lain.find({jenis: "Rekomendasi"}).exec()
    return NextResponse.json(konversi)
}