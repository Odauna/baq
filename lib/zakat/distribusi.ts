"use server"

import { distribusiSchema } from "@/schemas/Distribusi"
import { actionClient } from "../safe-action"
import { flattenValidationErrors } from "next-safe-action"
import { dbConnect } from "../mongodb"
import Distribusi from "@/models/Distribusi"
import { z } from "zod"
import { cookies } from "next/headers"
import { revalidatePath } from "next/cache"
import Pembagian from "@/models/Pembagian"

function currentTime() {
    const today = new Date()
    const hour = today.getHours()
    const minute = today.getMinutes()
    const second = today.getSeconds()

    return `${hour}:${minute}:${second}`
}

const dusunSchema = z.object({
    keterangan: z.string().nullable(),
    jenis: z.enum(["Fitrah (Beras)", "Fitrah (Uang)", "Mal", "Infak"]).optional(),
    nominal: z.coerce.number().gte(0, {message: 'Angka harus lebih besar dari atau sama dengan 0.'}),
    catatan: z.string().nullable(),
})

const justIDSchema = z.object({
    id: z.string()
})
const statusSchema = z.object({
    // id: z.string(),
    diterima: z.enum(["Belum", "Sudah"])
})
// Menambah data distribusi
export const addDistribusi = actionClient
    .schema(distribusiSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .bindArgsSchemas<[area: z.ZodEnum<['Dusun','Luar Dusun','Amal Usaha','Pengajuan Proposal','Aktivis Masjid','Amil']>]>([
        z.enum(['Dusun','Luar Dusun','Amal Usaha','Pengajuan Proposal','Aktivis Masjid','Amil'])
    ])
    .action(async ({
        parsedInput: {atasnama, alamat, keterangan, jenis, nominal, catatan},
        bindArgsParsedInputs: [area]
    }) => {
        let data = {
            alamat: alamat,
            area: area,
        }
        console.log(`data: ${data}`)
        if (keterangan != '') {
            data = Object.assign({}, data, {keterangan: keterangan})
        }
        if (jenis != undefined) {
            data = Object.assign({}, data, {jenis: jenis})
            if (nominal >= 0) {
                data = Object.assign({}, data, {nominal: nominal})
            }
        }
        if (catatan != '' || null) {
            data = Object.assign({}, data, {catatan: catatan})
        }
        // try {
            await dbConnect()
            const newD = new Distribusi(data)
            // console.log(newD)
            newD.set('atasnama.nama', atasnama)
            const add = await newD.save()
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
        // } catch (error) {
        //     console.error("Gagal : ", error)
        // }
    })

export const addDistribusiInfak = actionClient
    .schema(distribusiSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .action(async ({
        parsedInput: {atasnama, alamat, keterangan, nominal, catatan}
    }) => {
        let data = {
            area: "Pengeluaran Infak",
            alamat: alamat,
            jenis: "Infak"
        }
        console.log(`data: ${data}`)
        if (keterangan != '') {
            data = Object.assign({}, data, {keterangan: keterangan})
        }
        if (nominal >= 0) {
            data = Object.assign({}, data, {nominal: nominal})
        }
        if (catatan != '' || null) {
            data = Object.assign({}, data, {catatan: catatan})
        }
        await dbConnect()
        const newD = new Distribusi(data)
        newD.set('atasnama.nama', atasnama)
        const add = await newD.save()
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

// Mengedit data distribusi khusus Dusun
export const upDusunDistribusi = actionClient
    .schema(dusunSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .bindArgsSchemas<[id: z.ZodString]>([
        z.string()
    ])
    .action(async ({
        parsedInput: {keterangan, jenis, nominal, catatan},
        bindArgsParsedInputs: [id]
    }) => {
        const data = {
            keterangan: keterangan,
            jenis: jenis,
            nominal: nominal,
            catatan: catatan
        }
        await dbConnect()
        const up = await Distribusi.findByIdAndUpdate(id, data)
        if (up) {
            const msg = {message: "Berhasil memperbaharui data.", type: "success"}
            revalidatePath('/zakat/distribusi/dusun')
            return msg
        } else {
            const msg = {message: "Ups, Terjadi Kesalahan.", type: "error"}
            return msg
        }
    })

// Mengedit data distribusi
export const upDistribusi = actionClient
    .schema(distribusiSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .bindArgsSchemas<[id: z.ZodString]>([
        z.string()
    ])
    // .bindArgsSchemas([z.string()], {
    //     handleBindArgsValidationErrorsShape: async (ve) => flattenBindArgsValidationErrors(ve)
    // })
    .action(async ({
        parsedInput: {atasnama, alamat, keterangan, jenis, nominal, catatan},
        bindArgsParsedInputs: [id]
    }) => {
        let data = {
            'atasnama.nama': atasnama,
            alamat: alamat,
            keterangan: keterangan,
            catatan: catatan
        }
        // if (keterangan != '') {
        //     data = Object.assign({}, data, {keterangan: keterangan})
        // }
        if (jenis != undefined) {
            data = Object.assign({}, data, {jenis: jenis})
            if (nominal >= 0) {
                data = Object.assign({}, data, {nominal: nominal})
            }
        }
        // if (catatan != '' || catatan != null) {
        //     data = Object.assign({}, data, {catatan: catatan})
        // }
        console.log(data)
        await dbConnect()
        const up = await Distribusi.findByIdAndUpdate(id, data)
        if (up) {
            const msg = {message: "Berhasil memperbaharui data.", type: "success"}
            revalidatePath(`/zakat/distribusi/${up.area}`)
            return msg
        } else {
            const msg = {message: "Ups, Terjadi Kesalahan.", type: "error"}
            return msg
        }
    })

export async function updateDistribusiDusun() {
    await dbConnect()
    const pembagianBeras = await Pembagian.find({}).exec()
    pembagianBeras.map(async (v) => {
        const data = {
            jenis: "Fitrah (Beras)",
            nominal: v.nominal
        }
        if (v.kondisi === "Sama dengan") {
            await Distribusi.find({'atasnama.ak': v.anggota}).updateMany(data)
        }
        if (v.kondisi === "Lebih dari sama dengan") {
            await Distribusi.find({'atasnama.ak': { $gte: v.anggota }}).updateMany(data)
        }
    })
}

// Mengubah status distribusi apakah sudah diterima atau belum
export async function changeStatusDiterima(id: string[], diterima: "Sudah" | "Belum") {
    console.log(id)
    const waktu_diterima = await currentTime()
    const data = {
        diterima: diterima,
        waktu: waktu_diterima
    }
    await dbConnect()
    id.map(async (id) => {
        const up = await Distribusi.findByIdAndUpdate(id, data)
        if (up) {
            const msg = {message: "Berhasil memperbaharui status.", type: "success"}
            revalidatePath(`/zakat/distribusi/${up.area}`)
            return msg
        } else {
            const msg = {message: "Ups, Terjadi Kesalahan.", type: "error"}
            return msg
        }
    })
}

export const changeStatusDistribusi = actionClient
    .schema(statusSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .bindArgsSchemas<[id: z.ZodString]>([
        z.string()
    ])
    .action(async ({
        parsedInput: {diterima},
        bindArgsParsedInputs: [id]
    }) => {
        const waktu_diterima = await currentTime()
        let data = {
            diterima: diterima,
        }
        if (diterima === "Sudah") {
            data = Object.assign({}, data, {waktu: waktu_diterima})
        }
        if (diterima === "Belum") {
            data = Object.assign({}, data, {waktu: ""})
        }
        await dbConnect()
        const upstate = await Distribusi.findByIdAndUpdate(id, data)
        if (upstate) {
            const msg = {message: "Berhasil memperbaharui data.", type: "success"}
            revalidatePath(`/zakat/distribusi/${upstate.area}`)
            return msg
        } else {
            const msg = {message: "Ups, Terjadi Kesalahan.", type: "error"}
            return msg
        }
    })

// Menghapus data distribusi
export const deleteDistribusi = actionClient
    .schema(justIDSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .action(async ({
        parsedInput: {id}
    }) => {
        await dbConnect()
        const del = await Distribusi.findByIdAndDelete(id)
        if (del) {
            const msg = {message: "Berhasil menghapus data.", type: "success"}
            return msg
        } else {
            const msg = {message: "Ups, Terjadi Kesalahan.", type: "error"}
            return msg
        }
    })