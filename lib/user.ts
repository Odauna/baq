"use server"

import { userSchema } from "@/schemas/User"
import { actionClient } from "./safe-action"
import { flattenValidationErrors } from "next-safe-action"
import { dbConnect } from "./mongodb"
import User from "@/models/User"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"

function currentTime() {
    const today = new Date()
    const hour = today.getHours()
    const minute = today.getMinutes()
    const second = today.getSeconds()

    return `${hour}:${minute}:${second}`
}
const justIDSchema = z.object({
    id: z.string()
})
const aktifSchema = z.object({
    // id: z.string()
    status: z.enum(["Aktif","NonAktif"])
})
const upUSchema = z.object({
    nama: z.string().min(8, {message: "Nama harus dari 8 atau lebih karakter."}),
    username: z.string().min(8, {message: "Username harus dari 8 atau lebih karakter."}),
    level: z.enum(["Petugas", "Distributor", "Admin"]),
})

const passSchema = z.object({
    password: z.string().min(8, {message: "Password harus dari 8 atau lebih karakter."}),
})

// Menambahkan user
export const saveAddUserAction = actionClient
    .schema(userSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .action(async ({
        parsedInput: {nama, username, password, level}
    }) => {
        const hashedPassword = await bcrypt.hashSync(password)
        const data = {
            nama: nama,
            username: username,
            password: hashedPassword,
            level: level,
            updated: currentTime()
        }
        console.log(data)
        await dbConnect()
        const newU = new User(data)
        const add = await newU.save()
        if (add) {
            const msg = {message: "Berhasil menambahkan user.", type: "success"}
            revalidatePath('/zakat/users')
            return msg
        } else {
            const msg = {message: "Ups, Terjadi Kesalahan.", type: "error"}
            return msg
        }
    })

// Mengedit data user
export const upUserAction = actionClient
    .schema(upUSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .bindArgsSchemas<[id: z.ZodString]>([
        z.string()
    ])
    // .bindArgsSchemas([z.string()], {
    //     handleBindArgsValidationErrorsShape: async (ve) => flattenBindArgsValidationErrors(ve)
    // })
    .action(async ({
        parsedInput: {nama, username, level},
        bindArgsParsedInputs: [id]
    }) => {
        const data = {
            nama: nama,
            username: username,
            level: level,
            updated: currentTime()
        }
        console.log(data)
        await dbConnect()
        const up = await User.findByIdAndUpdate(id, data)
        if (up) {
            const msg = {message: "Berhasil memperbaharui data.", type: "success"}
            revalidatePath('/zakat/users')
            return msg
        } else {
            const msg = {message: "Ups, Terjadi Kesalahan.", type: "error"}
            return msg
        }
    })

// Mengedit password user
export const upPassAction = actionClient
    .schema(passSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    // .bindArgsSchemas([z.string()], {
    //     handleBindArgsValidationErrorsShape: async (ve) => flattenBindArgsValidationErrors(ve)
    // })
    .bindArgsSchemas<[id: z.ZodString]>([
        z.string()
    ])
    .action(async ({
        parsedInput: {password},
        bindArgsParsedInputs: [id]
    }) => {
        const hashedPassword = await bcrypt.hashSync(password)
        const data = {
            password: hashedPassword,
            updated: currentTime()
        }
        await dbConnect()
        const up = await User.findByIdAndUpdate(id, data)
        if (up) {
            const msg = {message: "Berhasil memperbaharui password.", type: "success"}
            revalidatePath('/zakat/users')
            return msg
        } else {
            const msg = {message: "Ups, Terjadi Kesalahan.", type: "error"}
            return msg
        }
    })

// Mengaktifkan user
export const activateAction = actionClient
    .schema(aktifSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    // .bindArgsSchemas([z.string()], {
    //     handleBindArgsValidationErrorsShape: async (ve) => flattenBindArgsValidationErrors(ve)
    // })
    .bindArgsSchemas<[id: z.ZodString]>([
        z.string()
    ])
    .action(async ({
        parsedInput: {status},
        bindArgsParsedInputs: [id]
    }) => {
        const waktu = await currentTime()
        let data = {
            updated: waktu,
        }
        if (status === "Aktif") {
            data = Object.assign({}, data, {aktif: "Ya"})
        }
        if (status === "NonAktif") {
            data = Object.assign({}, data, {aktif: "Tidak"})
        }
        await dbConnect()
        const up = await User.findByIdAndUpdate(id, data)
        if (up) {
            const msg = status === "Aktif" ? {message: "Berhasil mengaktifasi user.", type: "success"} : {message: "Berhasil menonaktifkan user.", type: "success"}
            revalidatePath('/zakat/users')
            return msg
        } else {
            const msg = {message: "Ups, Terjadi Kesalahan.", type: "error"}
            return msg
        }
    })

// Menghapus user
export const deleteUserAction = actionClient
    .schema(justIDSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .action(async ({
        parsedInput: {id}
    }) => {
        await dbConnect()
        const del = await User.findByIdAndDelete(id)
        if (del) {
            const msg = {message: "Berhasil menghapus user.", type: "success"}
            revalidatePath('/zakat/users')
            return msg
        } else {
            const msg = {message: "Ups, Terjadi Kesalahan.", type: "error"}
            return msg
        }
    })