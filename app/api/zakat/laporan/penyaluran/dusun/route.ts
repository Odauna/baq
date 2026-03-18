import { dbConnect } from "@/lib/mongodb"
import Distribusi from "@/models/Distribusi"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const rt = searchParams.get('rt')
    const salurdusun = []
    await dbConnect()
    const zfb = await Distribusi.aggregate([
        {
            $match: { area: 'Dusun', alamat: `RT.${rt}`, jenis: 'Fitrah (Beras)', waktu: { $nin: [null, ""] }}
        },
        {
            $group: {
                _id: `ZFBRT.${rt}`,
                jumlah_salur_zfb: { $sum: '$nominal'}
            }
        }
    ])
    salurdusun.push(zfb)
    const zfu = await Distribusi.aggregate([
        {
            $match: { area: 'Dusun', alamat: `RT.${rt}`, jenis: 'Fitrah (Uang)', waktu: { $nin: [null, ""] }}
        },
        {
            $group: {
                _id: `ZFBRT.${rt}`,
                jumlah_salur_zfu: { $sum: '$nominal'}
            }
        }
    ])
    salurdusun.push(zfu)
    const zm = await Distribusi.aggregate([
        {
            $match: { area: 'Dusun', alamat: `RT.${rt}`, jenis: 'Mal', waktu: { $nin: [null, ""] }}
        },
        {
            $group: {
                _id: `ZFBRT.${rt}`,
                jumlah_salur_zm: { $sum: '$nominal'}
            }
        }
    ])
    salurdusun.push(zm)
    const infq = await Distribusi.aggregate([
        {
            $match: { area: 'Dusun', alamat: `RT.${rt}`, jenis: 'Infak', waktu: { $nin: [null, ""] }}
        },
        {
            $group: {
                _id: `ZFBRT.${rt}`,
                jumlah_salur_i: { $sum: '$nominal'}
            }
        }
    ])
    salurdusun.push(infq)
    console.log(salurdusun)
    return NextResponse.json(salurdusun)
}