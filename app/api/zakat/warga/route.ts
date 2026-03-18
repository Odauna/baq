import { dbConnect } from "@/lib/mongodb";
import Warga from "@/models/Warga";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { headers } from "next/headers";

export async function GET(request: NextRequest) {
    // const headerl = headers()
    // const rtw = (await headerl).get('param')
    const { searchParams } = new URL(request.url)
    const rtw = searchParams.get('rt')
    
    // const draft = await draftMode()
    // draft.enable()
    // const rtw = (await params).rt
    // const cookieStored = await cookies();
    // const rtw = cookieStored.get('parameter')?.value;
    await dbConnect();
    // const rtw = cookies().get('paramater')
    // let rtw = request.cookies.get("parameter")
    // console.log(rtw)
    // let rw = request.cookies.get('undefined')
    // console.log(rw)
    // const rtws = rtw?.value
    // console.log(rtws)
    const warga = await Warga.find({rt: rtw});
    // console.log(warga)
    return NextResponse.json(warga);
    // return warga;
}

