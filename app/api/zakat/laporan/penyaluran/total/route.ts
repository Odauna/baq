import { dbConnect } from "@/lib/mongodb";
import Distribusi from "@/models/Distribusi";
import Warga from "@/models/Warga";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const total = []
    await dbConnect()
    // penyaluran
    const zfb = await Distribusi.aggregate([
        {
            $match: { jenis: 'Fitrah (Beras)', waktu: { $nin: [null, ""] }}
        },
        {
            $group: {
                _id: `ZFB`,
                jumlah_salur_zfb: { $sum: '$nominal'}
            }
        }
    ])
    total.push(zfb)
    const zfu = await Distribusi.aggregate([
        {
            $match: { jenis: 'Fitrah (Uang)', waktu: { $nin: [null, ""] }}
        },
        {
            $group: {
                _id: `ZFU`,
                jumlah_salur_zfu: { $sum: '$nominal'}
            }
        }
    ])
    total.push(zfu)
    const zm = await Distribusi.aggregate([
        {
            $match: { jenis: 'Mal', waktu: { $nin: [null, ""] }}
        },
        {
            $group: {
                _id: `ZM`,
                jumlah_salur_zm: { $sum: '$nominal'}
            }
        }
    ])
    total.push(zm)
    const infq = await Distribusi.aggregate([
        {
            $match: { jenis: 'Infak', waktu: { $nin: [null, ""] }}
        },
        {
            $group: {
                _id: `Infak`,
                jumlah_salur_i: { $sum: '$nominal'}
            }
        }
    ])
    total.push(infq)
    // pengumpulan
    const sum = await Warga.aggregate([{
        $group: {
            _id: 'total_zi',
            amount_zfb: {$sum: "$pengumpulan.fitrah_beras"},
            amount_zfu: {$sum: "$pengumpulan.fitrah_uang"},
            amount_zm: {$sum: "$pengumpulan.mal"},
            amount_i: {$sum: "$pengumpulan.infak"}
        }
    }])
    total.push(sum)
    // const timbangan = [await Lain.findById('67e4c7fd7b56880b42664e89')]
    // total.push(timbangan)
    console.log(total)
    return NextResponse.json(total)
}