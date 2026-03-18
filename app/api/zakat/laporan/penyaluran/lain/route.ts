import { dbConnect } from "@/lib/mongodb";
import Distribusi from "@/models/Distribusi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const area = searchParams.get('area')
    console.log(`area: ${area}`)
    const lain = []
    await dbConnect()
    const zfb = await Distribusi.aggregate([
        {
            $match: { area: `${area}`, jenis: 'Fitrah (Beras)', waktu: { $nin: [null, ""] }}
        },
        {
            $group: {
                _id: `ZFB`,
                jumlah_salur_zfb: { $sum: '$nominal'}
            }
        }
    ])
    lain.push(zfb)
    const zfu = await Distribusi.aggregate([
        {
            $match: { area: `${area}`, jenis: 'Fitrah (Uang)', waktu: { $nin: [null, ""] }}
        },
        {
            $group: {
                _id: `ZFU`,
                jumlah_salur_zfu: { $sum: '$nominal'}
            }
        }
    ])
    lain.push(zfu)
    const zm = await Distribusi.aggregate([
        {
            $match: { area: `${area}`, jenis: 'Mal', waktu: { $nin: [null, ""] }}
        },
        {
            $group: {
                _id: `ZM`,
                jumlah_salur_zm: { $sum: '$nominal'}
            }
        }
    ])
    lain.push(zm)
    const infq = await Distribusi.aggregate([
        {
            $match: { area: `${area}`, jenis: 'Infak', waktu: { $nin: [null, ""] }}
        },
        {
            $group: {
                _id: `Infak`,
                jumlah_salur_i: { $sum: '$nominal'}
            }
        }
    ])
    lain.push(infq)
    // const luar = await Distribusi.find({area: `${area}`, waktu: { $nin: [null, ""] }}).exec()
    // penyaluran.push(luar)
    // const amal_usaha = await Distribusi.find({area: 'Amal Usaha', waktu: { $nin: [null, ""] }}).exec()
    // penyaluran.push(amal_usaha)
    // const pengajuan_proposal = await Distribusi.find({area: 'Pengajuan Proposal', waktu: { $nin: [null, ""] }}).exec()
    // penyaluran.push(pengajuan_proposal)
    // const aktivis_masjid = await Distribusi.find({area: 'Aktivis Masjid', waktu: { $nin: [null, ""] }}).exec()
    // penyaluran.push(aktivis_masjid)
    // const amil = await Distribusi.find({area: 'Amil', waktu: { $nin: [null, ""] }}).exec()
    // penyaluran.push(amil)
    // const pengeluaran_infak = await Distribusi.find({area: 'Pengeluaran Infak', waktu: { $nin: [null, ""] }}).exec()
    // penyaluran.push(pengeluaran_infak)
    console.log(lain)
    return NextResponse.json(lain)
}