"use server"

import { wargaSchema } from "@/schemas/Warga";
import { actionClient } from "./safe-action";
import { flattenValidationErrors } from "next-safe-action";
import { z } from 'zod';
import { dbConnect } from "./mongodb";
import Warga from "@/models/Warga";
import { revalidatePath } from "next/cache";

// type ReturnType = {
//     message: string,
//     errors?: Record<string, unknown>
// }
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
            const msg = {message: "Berhasil menambah data warga.", type: "success"}
            return msg
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
            const dataKumpul = {
                tanggungan: anggota
            }
            // try {
                // Distribusi
                // const dD = new Distribusi()
                // const exS = dD.get('atasnama.w_id')
                const exS = await Distribusi.findOne({'atasnama.w_id': id})
                console.log(`id: ${exS}`)
                // up._id})
                // console.log(dD.get('atasnama.w_id', up._id))
                // console.log(`w_id: ${exS}`)
                if (mustahik === "Tidak") {
                    if (exS != null || exS != undefined) {
                        const dels = await Distribusi.findOneAndDelete({'atasnama.w_id': id})
                        // console.log(ds)
                        // const dels = await Distribusi.findByIdAndDelete(exS)
                        // const dels = await dD.delete('atasnama.w_id', up._id)
                        if (dels) {
                            // console.log("Berhasil menghapus dari data distribusi!")
                            return { message: "Data warga berhasil dihapus dari data distribusi.", type: "success" }
                        } else {
                            // console.log("Gagal menghapus dari data distribusi!")
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
                            // console.log("Berhasil mengedit data tersebut di data distribusi")
                            return { message: "Data warga berhasil diperbaharui, di data distribusi.", type: "success" }
                        } else {
                            // console.log("Gagal mengedit data tersebut di data distribusi")
                            return { message: "Gagal memperbaharui data warga di data distribusi.", type: "error" }
                        }
                    } else {
                        const dataSalur = {
                            alamat: `RT.${rt}`,
                            area: 'Dusun'
                        }
                        const newS = new Distribusi(dataSalur)
                        newS.set('atasnama.w_id', id)
                        newS.set('atasnama.nama', keluarga)
                        newS.set('atasnama.ak', anggota)
                        const addS = await newS.save()
                        if (addS) {
                            console.log("Berhasil menambahkan data tersebut ke data distribusi")
                            // return { message: "Data warga berhasil ditambahkan ke data distribusi.", type: "success" }
                        } else {
                            console.log("Gagal menambahkan data tersebut ke data distribusi")
                            // return { message: "Gagal menambahkan data warga ke data distribusi.", type: "error" }
                        }
                    }
                }
                // Pengumpulan
                // const newK = new Pengumpulan(dataKumpul)
                // const upK = await Pengumpulan.findOneAndUpdate({ 'atasnama': _id }, dataKumpul)
                // const newS = new Distribusi(dataSalur)
                // if (upK) {
                    // console.log("Berhasil mengedit data tersebut ke data pengumpulan")
                    // return { message: "Data warga berhasil diperbaharui di data pengumpulan zakat & infak.", type: "success" }
                // } else {
                    // console.log("Gagal mengedit data tersebut ke data pengumpulan")
                    // return { message: "Gagal memperbaharui data warga di data pengumpulan zakat & infak.", type: "error" }
                // }
            // } catch (error) {
            //     console.error("Gagal mengedit data warga ke data pengumpulan dan distribusi", error)
            // }
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
            const msg = {message: "Berhasil menghapus data.", type: "success"}
            return msg
        } else {
            const msg = {message: "Ups, Terjadi Kesalahan.", type: "error"}
            return msg
        }
    })