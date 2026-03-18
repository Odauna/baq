"use server"

import { lainSchema } from "@/schemas/Lain"
import { actionClient } from "../safe-action"
import { flattenValidationErrors } from "next-safe-action"
import { z } from "zod"
import { dbConnect } from "../mongodb"
import Lain from "@/models/Lain"

const justIDSchema = z.object({
    id: z.string()
})

export const saveAddLainAction = actionClient
    .schema(lainSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .bindArgsSchemas<[jenis: z.ZodEnum<['Rekomendasi','Tambahan']>]>([
        z.enum(['Rekomendasi','Tambahan'])
    ])
    .action(async ({
        parsedInput: {keterangan, nominal},
        bindArgsParsedInputs: [jenis]
    }) => {
        const data = {
            keterangan: keterangan,
            jenis: jenis,
            nominal: nominal
        }
        await dbConnect()
        const newL = new Lain(data)
        const add = await newL.save()
        console.log(add)
        if (add) {
            const msg = {message: "Berhasil menambahkan data.", type: "success"}
            console.log('berhasil')
            return msg
        } else {
            const msg = {message: "Ups, Terjadi Kesalahan.", type: "error"}
            console.log('gagal')
            return msg
        }
    })

export const saveUpLainAction = actionClient
    .schema(lainSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .bindArgsSchemas<[id: z.ZodString]>([
        z.string()
    ])
    .action(async ({
        parsedInput: {keterangan, nominal},
        bindArgsParsedInputs: [id]
    }) => {
        const data = {
            keterangan: keterangan,
            nominal: nominal
        }
        await dbConnect()
        const up = await Lain.findByIdAndUpdate(id, data)
        console.log(up)
            if (up) {
                const msg = {message: "Berhasil memperbaharui data.", type: "success"}
                console.log('berhasil')
                return msg
            } else {
                const msg = {message: "Ups, Terjadi Kesalahan.", type: "error"}
                console.log('gagal')
                return msg
            }
    })

export const deleteLainAction = actionClient
    .schema(justIDSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .action(async ({
        parsedInput: {id}
    }) => {
        await dbConnect()
        const del = await Lain.findByIdAndDelete(id)
        console.log(del)
            if (del) {
                const msg = {message: "Berhasil menghapus data.", type: "success"}
                console.log('berhasil')
                return msg
            } else {
                const msg = {message: "Ups, Terjadi Kesalahan.", type: "error"}
                console.log('gagal')
                return msg
            }
    })