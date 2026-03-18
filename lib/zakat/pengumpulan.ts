"use server"

import { pengumpulanSchema } from "@/schemas/Pengumpulan"
import { actionClient } from "../safe-action"
import { flattenValidationErrors } from "next-safe-action"
import { dbConnect } from "../mongodb"
import Pengumpulan from "@/models/Pengumpulan"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { nominalTimbanganSchema } from "@/schemas/Timbang"
import Timbang from "@/models/Timbang"

const justIDSchema = z.object({
    id: z.string()
})

function currentTime() {
    const today = new Date()
    const hour = today.getHours()
    const minute = today.getMinutes()
    const second = today.getSeconds()

    return `${hour}:${minute}:${second}`
}

const time_now = await currentTime()
// Mengedit data pengumpulan zakat infak
export const savePZInAction = actionClient
    .schema(pengumpulanSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .bindArgsSchemas<[id: z.ZodString]>([
        z.string()
    ])
    // .bindArgsSchemas([z.string()], {
    //     handleBindArgsValidationErrorsShape: async (ve) => flattenBindArgsValidationErrors(ve)
    // })
    .action(async ({
        parsedInput: {tanggungan, fitrah_beras, fitrah_uang, mal, infak, keterangan},
        bindArgsParsedInputs: [id]
    }) => {
        // const data = {
        //     tanggungan: tanggungan,
        //     fitrah_beras: fitrah_beras,
        //     fitrah_uang: fitrah_uang,
        //     mal: mal,
        //     infak: infak,
        //     keterangan: keterangan,
        //     waktu: time_now,
        // }
        let data = {
            tanggungan: tanggungan,
        }   
        if (fitrah_beras > 0) {
            data = Object.assign({}, data, {fitrah_beras: fitrah_beras})
        }
        if (fitrah_uang > 0) {
            data = Object.assign({}, data, {fitrah_uang: fitrah_uang})
        }
        if (mal > 0) {
            data = Object.assign({}, data, {mal: mal})
        }
        if (infak > 0) {
            data = Object.assign({}, data, {infak: infak})
        }
        if (keterangan != '') {
            data = Object.assign({}, data, {keterangan: keterangan})
        }
        if (fitrah_beras > 0 || fitrah_uang > 0) {
            data = Object.assign({}, data, {waktu: time_now})
        }

        await dbConnect()
        // const wait_up = await Warga.findById(id)
        // console.log(`data: ${wait_up}`)
        // wait_up = {
        //     pengumpulan: {
        //         tanggungan: tanggungan,
        //         fitrah_beras: fitrah_beras,
        //         fitrah_uang: fitrah_uang,
        //         mal: mal,
        //         infak: infak,
        //         keterangan: keterangan,
        //         waktu: time_now,
        //     }
        // }
        // wait_up.pengumpulan.tanggungan = tanggungan
        // if (fitrah_beras > 0) {
        //     wait_up.pengumpulan.fitrah_beras = fitrah_beras
        // }
        // if (fitrah_uang > 0) {
        //     wait_up.pengumpulan.fitrah_uang = fitrah_uang
        // }
        // if (mal > 0) {
        //     wait_up.pengumpulan.mal = mal
        // }
        // if (infak > 0) {
        //     wait_up.pengumpulan.infak = infak
        // }
        // if (keterangan != '') {
        //     wait_up.pengumpulan.keterangan = keterangan
        // }
        // if (fitrah_beras > 0 || fitrah_uang > 0) {
        //     wait_up.pengumpulan.waktu = time_now
        // }
        // const up = await wait_up.save()
        const up = await Warga.findByIdAndUpdate(id, {pengumpulan: data})
        console.log(`dataup: ${up}`)
        if (up) {
            const msg = {message: "Berhasil memperbaharui data pengumpulan zakat dan infak.", type: "success"}
            revalidatePath(`/zakat/pengumpulan/${up.rt}`)
            return msg
        } else {
            const msg = {message: "Ups, Terjadi Kesalahan.", type: "error"}
            return msg
        }
    })
export const addNominalTimbangan = actionClient
    .schema(nominalTimbanganSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .action(async ({
        parsedInput: {nominal}
    }) => {
        const data = {
            waktu: time_now,
            nominal: nominal
        }

        await dbConnect()
        const newNominal = new Timbang(data)
        const add = await newNominal.save()

        if (add) {
            const msg = {message: "Berhasil menambahkan nominal timbangan beras!", type: "success"}
            revalidatePath('/zakat/pengumpulan/timbang')
            return msg
        } else {
            const msg = {message: "Ups, Terjadi Kesalahan!!!", type: "error"}
            return msg
        }
    })

export const upNominalTimbangan = actionClient
    .schema(nominalTimbanganSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .bindArgsSchemas<[id: z.ZodString]>([
        z.string()
    ])
    .action(async ({
        parsedInput: { nominal } ,
        bindArgsParsedInputs: [id]
    }) => {
        const data = {
            diperbarui: time_now,
            nominal: nominal
        }

        await dbConnect()
        const up = await Timbang.findByIdAndUpdate(id, data)
        if (up) {
            const msg = {message: "Berhasil memperbaharui data!", type: "success"}
            revalidatePath('/zakat/pengumpulan/timbang')
            return msg
        } else {
            const msg = {message: "Ups, Gagal memperbaharui data!!!", type: "error"}
            return msg
        }
    })

export const deleteNominalTimbangan = actionClient
    .schema(justIDSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .action(async ({
        parsedInput: { id }
    }) => {
        await dbConnect()
        const del = await Timbang.findByIdAndDelete(id)
        if (del) {
            const msg = {message: "Berhasil menghapus data!", type: "success"}
            revalidatePath('/zakat/pengumpulan/timbang')
            return msg
        } else {
            const msg = {message: "Ups, Gagal menghapus data!!!", type: "error"}
            return msg
        }
    })