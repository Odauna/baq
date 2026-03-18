// @ts-nocheck
"use server"

import { wargaSchema } from "@/schemas/Warga";
import { actionClient } from "../safe-action";
import { flattenValidationErrors } from "next-safe-action";
import { z } from 'zod';
import { dbConnect } from "../mongodb";
import Warga from "@/models/Warga";
import { revalidatePath } from "next/cache";

// type ReturnType = {
//     message: string,
//     errors?: Record<string, unknown>
// }
const bindArgsSchemas = [
    z.string(),
    // z.enum(['01','02','03','04','05','06'], {invalid_type_error: 'Silahkan pilih RT warga, misal 01.'})
] as const;

const justIDSchema = z.object({
    id: z.string()
})

export const addWargaAction = actionClient
    .schema(wargaSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .action(async ({
        parsedInput: {rt, keluarga, anggota, mustahik}
    }) => {
        const data = {
            rt: rt,
            keluarga: keluarga,
            anggota: anggota,
            mustahik: mustahik,
            pengumpulan: {}
        }
        await dbConnect()
        const newW = new Warga(data)
        const add = await newW.save()
        if (add) {
            if (mustahik === "Ya") {
                const dataSalur = {
                    alamat: `RT.${add.rt}`,
                    area: 'Dusun',
                    keterangan: '',
                    nominal: 0,
                    catatan: ''
                }
                const newS = new Distribusi(dataSalur)
                newS.set('atasnama.w_id', add.id)
                newS.set('atasnama.nama', add.keluarga)
                newS.set('atasnama.ak', add.anggota)
                const addS = await newS.save()
                if (addS) {
                    return { message: "Warga berhasil ditambahkan ke data warga dan distribusi.", type: "success" }
                } else {
                    return { message: "Berhasil menambahkan warga ke data warga, namun gagal ke data distribusi.", type: "error" }
                }
            }
            return { message: "Warga berhasil ditambahkan ke data warga", type: "success" }
        } else {
            const msg = {message: "Ups, Terjadi Kesalahan.", type: "error"}
            return msg
        }
    })

export const saveWargaAction = actionClient
    .schema(wargaSchema, {
        handleValidationErrorsShape: async (ve, utils) => flattenValidationErrors(ve).fieldErrors
    })
    .bindArgsSchemas<[id: z.ZodString]>([
        z.string()
    ])
    .action(async ({
        parsedInput: {rt, keluarga, anggota, mustahik}, 
        bindArgsParsedInputs: [id]
    }) => {
        const data = {
            keluarga: keluarga,
            anggota: anggota,
            mustahik: mustahik
        }
        console.log(data)
        await dbConnect()
        const up = await Warga.findByIdAndUpdate(id, data)
        if (up) {
            console.log("Data warga berhasil diperbaharui.")
            const exS = await Distribusi.findOne({'atasnama.w_id': id})
            console.log(`id: ${exS}`)
            if (mustahik === "Tidak") {
                if (exS != null || exS != undefined) {
                    const dels = await Distribusi.findOneAndDelete({'atasnama.w_id': id})
                    if (dels) {
                        return { message: "Data warga berhasil dihapus dari data distribusi.", type: "success" }
                    } else {
                        return { message: "Gagal menghapus data warga dari data distribusi.", type: "error" }
                    }
                }
            }
            if (mustahik === "Ya") {
                if (exS != null || exS != undefined) {
                    // const updS = new Distribusi()
                    // updS.set('nama.keluarga', up.keluarga)
                    // updS.set('nama.ak', up.anggota)
                    // updS.set('nama.mustahik', up.mustahik)
                    const upS = await Distribusi.findOneAndUpdate({'atasnama.w_id': id}, {$set: {'atasnama.nama': keluarga, 'atasnama.ak': anggota}})
                    if (upS) {
                        return { message: "Data warga berhasil diperbaharui, di data distribusi.", type: "success" }
                    } else {
                        return { message: "Gagal memperbaharui data warga di data distribusi.", type: "error" }
                    }
                } else {
                    const dataSalur = {
                        alamat: `RT.${rt}`,
                        area: 'Dusun',
                        keterangan: '',
                        nominal: 0,
                        catatan: ''
                    }
                    const newS = new Distribusi(dataSalur)
                    newS.set('atasnama.w_id', id)
                    newS.set('atasnama.nama', keluarga)
                    newS.set('atasnama.ak', anggota)
                    const addS = await newS.save()
                    if (addS) {
                        return { message: "Data warga berhasil ditambahkan ke data distribusi.", type: "success" }
                    } else {
                        return { message: "Gagal menambahkan data warga ke data distribusi.", type: "error" }
                    }
                }
            }
            return { message: "Data warga berhasil diperbaharui.", type: "success" }
        } else {
            return { message: "Gagal memperbaharui data warga.", type: "error" }
        }
    })

export async function changeStatusWarga(id: string[], mustahik: "Ya" | "Tidak") {
    console.log(id)
    await dbConnect()
    // const up = await Warga.findByIdAndUpdate(id, {mustahik: mustahik})
    id.map( async (data) => {
        console.log(data)
        const up = await Warga.findByIdAndUpdate(data, {mustahik: mustahik})
        if (up) {
            const exS = await Distribusi.findOne({'atasnama.w_id': up._id})
            if (mustahik === "Tidak") {
                if (exS != null || exS != undefined) {
                    const dels = await Distribusi.findOneAndDelete({'atasnama.w_id': up._id})
                    if (dels) {
                        return { message: "Data warga berhasil dihapus dari data distribusi.", type: "success" }
                    } else {
                        return { message: "Gagal menghapus data warga dari data distribusi.", type: "error" }
                    }
                }
            }
            else if (mustahik === "Ya") {
                if (exS != null || exS != undefined) {
                    const upS = await Distribusi.findOneAndUpdate({'atasnama.w_id': up._id}, {$set: {'atasnama.nama': up.keluarga, 'atasnama.ak': up.anggota}})
                    if (upS) {
                        return { message: "Data warga berhasil diperbaharui, di data distribusi.", type: "success" }
                    } else {
                        return { message: "Gagal memperbaharui data warga di data distribusi.", type: "error" }
                    }
                } else {
                    const dataSalur = {
                        alamat: `RT.${up.rt}`,
                        area: 'Dusun',
                        keterangan: '',
                        nominal: 0,
                        catatan: ''
                    }
                    const newS = new Distribusi(dataSalur)
                    newS.set('atasnama.w_id', up._id)
                    newS.set('atasnama.nama', up.keluarga)
                    newS.set('atasnama.ak', up.anggota)
                    const addS = await newS.save()
                    if (addS) {
                        return { message: "Data warga berhasil ditambahkan ke data distribusi.", type: "success" }
                    } else {
                        return { message: "Gagal menambahkan data warga ke data distribusi.", type: "error" }
                    }
                }
            }
            return { message: "Berhasil mengubah Status.", type: "success" }
        } else {
            return { message: "Ups, gagal.", type: "error" }
        }
    })
}

export const deleteWargaAction = actionClient
    .schema(justIDSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .action(async ({
        parsedInput: {id}
    }) => {
        await dbConnect()
        const del = await Warga.findByIdAndDelete(id)
        if (del) {
            const exS = await Distribusi.findOne({'atasnama.w_id': id})
            if (exS != null || exS != undefined) {
                const dels = await Distribusi.findOneAndDelete({'atasnama.w_id': id})
                if (dels) {
                    revalidatePath(`/zakat/distribusi/dusun`)
                    return { message: "Data warga berhasil dihapus dari data distribusi.", type: "success" }
                } else {
                    return { message: "Gagal menghapus data warga dari data distribusi.", type: "error" }
                }
            }
            const msg = {message: "Berhasil menghapus data.", type: "success"}
            return msg
        } else {
            const msg = {message: "Ups, Terjadi Kesalahan.", type: "error"}
            return msg
        }
    })