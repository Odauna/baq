import { dbConnect } from "@/lib/mongodb";
import Pembagian from "@/models/Pembagian";
import { NextResponse } from "next/server";


export async function GET() {
    await dbConnect()
    const pembagianBeras = await Pembagian.find({}).exec()
    return NextResponse.json(pembagianBeras)
}