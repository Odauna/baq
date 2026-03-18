import { dbConnect } from "@/lib/mongodb";
import { NextRequest, NextResponse } from "next/server";
import Pengumpulan from "@/models/Pengumpulan";
import Warga from "@/models/Warga";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const rtw = searchParams.get('rt')
    await dbConnect();
    console.log(rtw)
    const kumpul = await Warga.find({rt: rtw}).exec();
    // const kumpul = await Pengumpulan.find().populate({ path: 'atasnama', match: { rt: `${rtw}` } }).exec();
    // const kumpul = await Pengumpulan.find({'atasnama.rt': rtw}).exec();
    console.log(kumpul)
    return NextResponse.json(kumpul);
}

