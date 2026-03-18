import { dbConnect } from "@/lib/mongodb";
import Distribusi from "@/models/Distribusi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const param_ak = searchParams.get("ak")
    const param_nominal = searchParams.get("nominal")
    await dbConnect()
    // let d_fitrah_dusun = []
    // let bagian = 8
    const diterima = await Distribusi.aggregate([
        { 
            $match: {"area": "Dusun", "diterima": "Sudah", "atasnama.ak": param_ak} 
        }, 
        { 
            $group: {
                _id: param_ak,
                rt01kk: { $sum: { $cond: [{ $eq: ["$alamat", "RT.01"] }, 1, 0]} },
                rt01jumlah: { $sum: { $cond: [{ $eq: ["$alamat", "RT.01"] }, param_nominal, 0]} },
                rt02kk: { $sum: { $cond: [{ $eq: ["$alamat", "RT.02"] }, 1, 0]} },
                rt02jumlah: { $sum: { $cond: [{ $eq: ["$alamat", "RT.02"] }, param_nominal, 0]} },
                rt03kk: { $sum: { $cond: [{ $eq: ["$alamat", "RT.03"] }, 1, 0]} },
                rt03jumlah: { $sum: { $cond: [{ $eq: ["$alamat", "RT.03"] }, param_nominal, 0]} },
                rt04kk: { $sum: { $cond: [{ $eq: ["$alamat", "RT.04"] }, 1, 0]} },
                rt04jumlah: { $sum: { $cond: [{ $eq: ["$alamat", "RT.04"] }, param_nominal, 0]} },
                rt05kk: { $sum: { $cond: [{ $eq: ["$alamat", "RT.05"] }, 1, 0]} },
                rt05jumlah: { $sum: { $cond: [{ $eq: ["$alamat", "RT.05"] }, param_nominal, 0]} },
                rt06kk: { $sum: { $cond: [{ $eq: ["$alamat", "RT.06"] }, 1, 0]} }, 
                rt06jumlah: { $sum: { $cond: [{ $eq: ["$alamat", "RT.06"] }, param_nominal, 0]} },
                kk: { $sum: 1 },
                jumlah: { $sum: param_nominal }
            } 
        }
    ])
    // d_fitrah_dusun.push(diterima)
    // return NextResponse.json(d_fitrah_dusun)
    return NextResponse.json(diterima)
}