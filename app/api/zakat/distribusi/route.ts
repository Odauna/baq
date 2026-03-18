import { dbConnect } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Distribusi from "@/models/Distribusi";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const area = searchParams.get('area')
    await dbConnect();
    const salur = await Distribusi.find({'area': area})
    // const salur = await Pengumpulan.find({'atasnama.rt': rtw}).exec();
    return NextResponse.json(salur);
}

