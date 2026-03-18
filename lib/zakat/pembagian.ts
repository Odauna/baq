"use server"

import { pembagianSchema } from "@/schemas/Pembagian"
import { actionClient } from "../safe-action"
import { flattenValidationErrors } from "next-safe-action"
import { dbConnect } from "../mongodb"
import Pembagian from "@/models/Pembagian"
import { z } from "zod"



const justIDSchema = z.object({
    id: z.string()
})

export const saveAddPembagianBeras = actionClient
    .schema(pembagianSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .action(async ({
        parsedInput: {anggota, kondisi, nominal}
    }) => {
        const data = {
            anggota: anggota,
            kondisi: kondisi,
            nominal: nominal
        }

        await dbConnect()
        const newP = new Pembagian(data)
        const add = await newP.save()
        if (add) {
            const msg = {message: "Berhasil menambahkan kondisi pembagian zakat fitrah beras.", type: "success"}
            return msg
        } else {
            const msg = {message: "Ups, Terjadi Kesalahan.", type: "error"}
            return msg
        }
    })

export const saveUpPembagianBeras = actionClient
    .schema(pembagianSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .bindArgsSchemas<[id: z.ZodString]>([
        z.string()
    ])
    .action(async ({
        parsedInput: {anggota, kondisi, nominal},
        bindArgsParsedInputs: [id]
    }) => {
        const data = {
            anggota: anggota,
            kondisi: kondisi,
            nominal: nominal
        }
        await dbConnect()
        const up = await Pembagian.findByIdAndUpdate(id, data)
        if (up) {
            const msg = {message: "Berhasil memperbarui kondisi pembagian zakat fitrah beras.", type: "success"}
            return msg
        } else {
            const msg = {message: "Ups, Terjadi Kesalahan.", type: "error"}
            return msg
        }
    })

export const deletePembagianBeras = actionClient
    .schema(justIDSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .action(async ({
        parsedInput: {id}
    }) => {
        await dbConnect()
        const del = await Pembagian.findByIdAndDelete(id)
        if (del) {
            const msg = {message: "Berhasil menghapus data.", type: "success"}
            return msg
        } else {
            const msg = {message: "Ups, Terjadi Kesalahan.", type: "error"}
            return msg
        }
    })