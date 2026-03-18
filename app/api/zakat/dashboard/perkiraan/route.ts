import { dbConnect } from "@/lib/mongodb";
import Warga from "@/models/Warga";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect()
    const perkiraan = []
    const sudah_zakat = await Warga.aggregate([
        {
            $match: { "pengumpulan.waktu": { $nin: [null, ""] } }
        },
        {
            $group: {
                _id: 'JumlahBelumZakat',
                amount_sudah_zakat: {$sum: 1}
            }
        }
    ])
    perkiraan.push(sudah_zakat)
    const belum_zakat = await Warga.aggregate([
        {
            $match: { "pengumpulan.waktu": { $in: [null, ""] } }
        },
        {
            $group: {
                _id: 'JumlahBelumZakat',
                amount_belum_zakat: {$sum: 1}
            }
        }
    ])
    perkiraan.push(belum_zakat)
    const rt01 = await Warga.aggregate([
        {
            $match: { rt: '01', "pengumpulan.waktu": { $nin: [null, ""] } }
        },
        {
            $group: {
                _id: `RT.01`,
                amount_tanggungan: {$sum: "$pengumpulan.tanggungan"},
                amount_anggota: {$sum: "$anggota"},
                amount_kk: {$sum: 1}
            }
        }
    ])
    perkiraan.push(rt01)
    const rt01bzf = await Warga.aggregate([
        {
            $match: { rt: '01', "pengumpulan.waktu": { $in: [null, ""] } }
        },
        {
            $group: {
                _id: `RT.01 yang Belum Zakat Fitrah`,
                amount_anggota: {$sum: "$anggota"},
                amount_kk: {$sum: 1}
            }
        }
    ])
    perkiraan.push(rt01bzf)
    const rt02 = await Warga.aggregate([
        {
            $match: { rt: '02', "pengumpulan.waktu": { $nin: [null, ""] } }
        },
        {
            $group: {
                _id: `RT.02`,
                amount_tanggungan: {$sum: "$pengumpulan.tanggungan"},
                amount_anggota: {$sum: "$anggota"},
                amount_kk: {$sum: 1}
            }
        }
    ])
    perkiraan.push(rt02)
    const rt02bzf = await Warga.aggregate([
        {
            $match: { rt: '02', "pengumpulan.waktu": { $in: [null, ""] } }
        },
        {
            $group: {
                _id: `RT.02 yang Belum Zakat Fitrah`,
                amount_anggota: {$sum: "$anggota"},
                amount_kk: {$sum: 1}
            }
        }
    ])
    perkiraan.push(rt02bzf)
    const rt03 = await Warga.aggregate([
        {
            $match: { rt: '03', "pengumpulan.waktu": { $nin: [null, ""] } }
        },
        {
            $group: {
                _id: `RT.03`,
                amount_tanggungan: {$sum: "$pengumpulan.tanggungan"},
                amount_anggota: {$sum: "$anggota"},
                amount_kk: {$sum: 1}
            }
        }
    ])
    perkiraan.push(rt03)
    const rt03bzf = await Warga.aggregate([
        {
            $match: { rt: '03', "pengumpulan.waktu": { $in: [null, ""] } }
        },
        {
            $group: {
                _id: `RT.03 yang Belum Zakat Fitrah`,
                amount_anggota: {$sum: "$anggota"},
                amount_kk: {$sum: 1}
            }
        }
    ])
    perkiraan.push(rt03bzf)
    const rt04 = await Warga.aggregate([
        {
            $match: { rt: '04', "pengumpulan.waktu": { $nin: [null, ""] } }
        },
        {
            $group: {
                _id: `RT.04`,
                amount_tanggungan: {$sum: "$pengumpulan.tanggungan"},
                amount_anggota: {$sum: "$anggota"},
                amount_kk: {$sum: 1}
            }
        }
    ])
    perkiraan.push(rt04)
    const rt04bzf = await Warga.aggregate([
        {
            $match: { rt: '04', "pengumpulan.waktu": { $in: [null, ""] } }
        },
        {
            $group: {
                _id: `RT.04 yang Belum Zakat Fitrah`,
                amount_anggota: {$sum: "$anggota"},
                amount_kk: {$sum: 1}
            }
        }
    ])
    perkiraan.push(rt04bzf)
    const rt05 = await Warga.aggregate([
        {
            $match: { rt: '05', "pengumpulan.waktu": { $nin: [null, ""] } }
        },
        {
            $group: {
                _id: `RT.05`,
                amount_tanggungan: {$sum: "$pengumpulan.tanggungan"},
                amount_anggota: {$sum: "$anggota"},
                amount_kk: {$sum: 1}
            }
        }
    ])
    perkiraan.push(rt05)
    const rt05bzf = await Warga.aggregate([
        {
            $match: { rt: '05', "pengumpulan.waktu": { $in: [null, ""] } }
        },
        {
            $group: {
                _id: `RT.05 yang Belum Zakat Fitrah`,
                amount_anggota: {$sum: "$anggota"},
                amount_kk: {$sum: 1}
            }
        }
    ])
    perkiraan.push(rt05bzf)
    const rt06 = await Warga.aggregate([
        {
            $match: { rt: '06', "pengumpulan.waktu": { $nin: [null, ""] } }
        },
        {
            $group: {
                _id: `RT.06`,
                amount_tanggungan: {$sum: "$pengumpulan.tanggungan"},
                amount_anggota: {$sum: "$anggota"},
                amount_kk: {$sum: 1}
            }
        }
    ])
    perkiraan.push(rt06)
    const rt06bzf = await Warga.aggregate([
        {
            $match: { rt: '06', "pengumpulan.waktu": { $in: [null, ""] } }
        },
        {
            $group: {
                _id: `RT.06 yang Belum Zakat Fitrah`,
                amount_anggota: {$sum: "$anggota"},
                amount_kk: {$sum: 1}
            }
        }
    ])
    perkiraan.push(rt06bzf)
    return NextResponse.json(perkiraan)
}