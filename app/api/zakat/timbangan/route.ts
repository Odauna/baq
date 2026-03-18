import { dbConnect } from "@/lib/mongodb";
import Lain from "@/models/Lain";
import Timbang from "@/models/Timbang";
import { NextResponse } from "next/server";


export async function GET() {
    await dbConnect()
    const timbangan = await Timbang.find({}).exec()
    return NextResponse.json(timbangan)
}