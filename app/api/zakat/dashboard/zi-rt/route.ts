import { dbConnect } from "@/lib/mongodb";
import Lain from "@/models/Lain";
import Warga from "@/models/Warga";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)
    const rt = searchParams.get('rt')
    const rtl = searchParams.get('rtl')
    const czi = []
    await dbConnect()
    const warga = await Warga.aggregate([
        {
            $match: { $or: [{rt: rt}, {rt: rtl}] }
        },
        {
            $group: {
                _id: `RT.${rt}&RT.${rtl}`,
                amount_anggota: {$sum: "$anggota"},
                amount_tanggungan: {$sum: "$pengumpulan.tanggungan"},
                amount_kk: {$sum: 1}
            }
        }
    ])
    czi.push(warga)
    const mustahik = await Warga.aggregate([
        {
            $match: { $or: [{rt: rt}, {rt: rtl}], mustahik: 'Ya' }
        },
        {
            $group: {
                _id: 'JumlahMustahik',
                amount_mustahik: {$sum: 1},
                amount_m: { $sum: "$anggota" }
            }
            // $count: "amount_mustahik"
        }
    ])
    czi.push(mustahik)
    const belum_zakat = await Warga.aggregate([
        {
            $match: { $or: [{rt: rt}, {rt: rtl}] , "pengumpulan.waktu": { $in: [null, ""] } }
        },
        {
            $group: {
                _id: 'JumlahBelumZakat',
                amount_belum_zakat: {$sum: 1}
            }
            // $count: "amount_belum_zakat"
        }
    ])
    czi.push(belum_zakat)
    const fitrah_beras = await Warga.aggregate([
        {
            $match: { $or: [{rt: rt}, {rt: rtl}], "pengumpulan.fitrah_beras": { $nin: [null, ""] }}
        },
        {
            $group: {
                _id: `RT.${rt}&RT.${rtl}`,
                amount_tanggungan_zfb: {$sum: "$pengumpulan.tanggungan"},
                amount_zfb: {$sum: "$pengumpulan.fitrah_beras"}
            }
        }
    ])
    czi.push(fitrah_beras)
    const fitrah_uang = await Warga.aggregate([
        {
            $match: { $or: [{rt: rt}, {rt: rtl}], "pengumpulan.fitrah_uang": { $nin: [null, ""] }}
        },
        {
            $group: {
                _id: `RT.${rt}&RT.${rtl}`,
                amount_tanggungan_zfu: {$sum: "$pengumpulan.tanggungan"},
                amount_zfu: {$sum: "$pengumpulan.fitrah_uang"}
            }
        }
    ])
    czi.push(fitrah_uang)
    const mal = await Warga.aggregate([
        {
            $match: { $or: [{rt: rt}, {rt: rtl}], "pengumpulan.mal": { $nin: [null, ""] }}
        },
        {
            $group: {
                _id: `RT.${rt}&RT.${rtl}`,
                amount_kk: {$sum: 1},
                amount_tanggungan_zm: {$sum: "$pengumpulan.tanggungan"},
                amount_zm: {$sum: "$pengumpulan.mal"}
            }
        }
    ])
    czi.push(mal)
    const infak = await Warga.aggregate([
        {
            $match: { $or: [{rt: rt}, {rt: rtl}], "pengumpulan.infak": { $nin: [null, ""] }}
        },
        {
            $group: {
                _id: `RT.${rt}&RT.${rtl}`,
                amount_i: {$sum: "$pengumpulan.infak"},
            }
        }
    ])
    czi.push(infak)
    const jiwa_belum_zakat = await Warga.aggregate([
        {
            $match: { $or: [{rt: rt}, {rt: rtl}] , "pengumpulan.waktu": { $in: [null, ""] } }
        },
        {
            $group: {
                _id: 'JumlahBelumZakat',
                amount_jiwa_belum_zakat: {$sum: "$anggota"}
            }
        }
    ])
    czi.push(jiwa_belum_zakat)
    const beras = await Lain.findOne({"keterangan": "Beras"})
    czi.push([beras])
    console.log(czi)
    return NextResponse.json(czi)
}