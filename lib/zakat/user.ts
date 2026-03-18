"use server"

import { flattenValidationErrors } from "next-safe-action"
import { z } from "zod"
import bcrypt from "bcryptjs"
import { revalidatePath } from "next/cache"
import { actionClient } from "../safe-action"
import { dbConnect } from "../mongodb"
// import UserKurban from "@/models/kurban/UserKurban"
import { currentTime } from "../adds"
// import { aktifSchema, formAksesSchema, formPassSchema, formUserSchema, justIDSchema } from "@/schemas/kurban/Adds"
import { userSchema } from "@/schemas/User"
import User from "@/models/User"
import { aktifSchema, formAksesSchema, formPassSchema, formUserSchema, justIDSchema } from "@/schemas/Adds"

export const addUserZakatAction = actionClient
    .schema(userSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .action(async ({
        parsedInput: {nama, username, password, level}
    }) => {
        // const session = await verifySession()
        // const userLevel = session?.userLevel
        // if (!session) {
        //     const msg = {message: `401, User tidak terautentikasi!`, type: "warning"}
        //     return msg
        // }
        // if (userLevel != 'Admin') {
        //     const msg = {message: `403, Anda tidak memiliki perizinan yang sesuai!`, type: "warning"}
        //     return msg
        // }
        const time = await currentTime()
        const hashedPassword = await bcrypt.hashSync(password)
        const data = {
            kegiatan: 'Zakat',
            level: level,
            nama: nama,
            username: username,
            password: hashedPassword,
            akses: [''],
            updated_at: time,
            aktif: 'Tidak'
        }
        await dbConnect()
        const newU = new User(data)
        const add = await newU.save()
        if (add) {
            const msg = {message: "Berhasil menambahkan user.", type: "success"}
            revalidatePath('/zakat/users')
            return msg
        } else {
            const msg = {message: "Ups, gagal!", type: "error"}
            return msg
        }
    })


export const upUserZakatAction = actionClient
    .schema(formUserSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .bindArgsSchemas<[id: z.ZodString]>([
        z.string()
    ])
    .action(async ({
        parsedInput: {nama, username, level},
        bindArgsParsedInputs: [id]
    }) => {
        // const session = await verifySession()
        // const userLevel = session?.userLevel
        // if (!session) {
        //     const msg = {message: `401, User tidak terautentikasi!`, type: "warning"}
        //     return msg
        // }
        // if (userLevel != 'Admin') {
        //     const msg = {message: `403, Anda tidak memiliki perizinan yang sesuai!`, type: "warning"}
        //     return msg
        // }
        const data = {
            level: level,
            nama: nama,
            username: username,
            updated_at: await currentTime()
        }
        await dbConnect()
        const up = await User.findByIdAndUpdate(id, data)
        if (up) {
            const msg = {message: `Berhasil memperbaharui data user ${username}.`, type: "success"}
            revalidatePath('/zakat/users')
            return msg
        } else {
            const msg = {message: "Ups, gagal!", type: "error"}
            return msg
        }
    })

export const upPassAction = actionClient
    .schema(formPassSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .bindArgsSchemas<[id: z.ZodString]>([
        z.string()
    ])
    .action(async ({
        parsedInput: {password},
        bindArgsParsedInputs: [id]
    }) => {
        // const session = await verifySession()
        // const userLevel = session?.userLevel
        // if (!session) {
        //     const msg = {message: `401, User tidak terautentikasi!`, type: "warning"}
        //     return msg
        // }
        // if (userLevel != 'Admin') {
        //     const msg = {message: `403, Anda tidak memiliki perizinan yang sesuai!`, type: "warning"}
        //     return msg
        // }
        const time = await currentTime()
        const hashedPassword = await bcrypt.hashSync(password)
        const data = {
            password: hashedPassword,
            updated_at: time
        }
        await dbConnect()
        const up = await User.findByIdAndUpdate(id, data)
        if (up) {
            const msg = {message: "Berhasil memperbaharui password.", type: "success"}
            revalidatePath('/zakat/users')
            return msg
        } else {
            const msg = {message: "Ups, gagal!", type: "error"}
            return msg
        }
    })

export const upAksesAction = actionClient
    .schema(formAksesSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .bindArgsSchemas<[id: z.ZodString]>([
        z.string()
    ])
    .action(async ({
        parsedInput: {akses},
        bindArgsParsedInputs: [id]
    }) => {
        // const session = await verifySession()
        // const userLevel = session?.userLevel
        // if (!session) {
        //     const msg = {message: `401, User tidak terautentikasi!`, type: "warning"}
        //     return msg
        // }
        // if (userLevel != 'Admin') {
        //     const msg = {message: `403, Anda tidak memiliki perizinan yang sesuai!`, type: "warning"}
        //     return msg
        // }
        const time = await currentTime()
        const data = {
            akses: akses,
            updated_at: time
        }
        await dbConnect()
        const up = await User.findByIdAndUpdate(id, data)
        if (up) {
            const msg = {message: "Berhasil memperbaharui akses user.", type: "success"}
            revalidatePath('/zakat/users')
            return msg
        } else {
            const msg = {message: "Ups, gagal!", type: "error"}
            return msg
        }
    })

export const activateUserAction = actionClient
    .schema(aktifSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .bindArgsSchemas<[id: z.ZodString]>([
        z.string()
    ])
    .action(async ({
        parsedInput: {status},
        bindArgsParsedInputs: [id]
    }) => {
        // const session = await verifySession()
        // const userLevel = session?.userLevel
        // if (!session) {
        //     const msg = {message: `401, User tidak terautentikasi!`, type: "warning"}
        //     return msg
        // }
        // if (userLevel != 'Admin') {
        //     const msg = {message: `403, Anda tidak memiliki perizinan yang sesuai!`, type: "warning"}
        //     return msg
        // }
        const waktu = await currentTime()
        let data = {
            updated_at: waktu,
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
            const msg = {message: "Ups, gagal!", type: "error"}
            return msg
        }
    })

export const deleteUserAction = actionClient
    .schema(justIDSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .action(async ({
        parsedInput: {id}
    }) => {
        // const session = await verifySession()
        // const userLevel = session?.userLevel
        // if (!session) {
        //     const msg = {message: `401, User tidak terautentikasi!`, type: "warning"}
        //     return msg
        // }
        // if (userLevel != 'Admin') {
        //     const msg = {message: `403, Anda tidak memiliki perizinan yang sesuai!`, type: "warning"}
        //     return msg
        // }
        await dbConnect()
        const del = await User.findByIdAndDelete(id)
        if (del) {
            const msg = {message: "Berhasil menghapus user.", type: "success"}
            revalidatePath('/zakat/users')
            return msg
        } else {
            const msg = {message: "Ups, gagal!", type: "error"}
            return msg
        }
    })

export async function changeStatusAktifAction(id: string[], aktif: "Aktif" | "NonAktif") {
    // const session = await verifySession()
    // const userLevel = session?.userLevel
    // if (!session) {
    //     const msg = {message: `401, User tidak terautentikasi!`, type: "warning"}
    //     return msg
    // }
    // if (userLevel != 'Admin') {
    //     const msg = {message: `403, Anda tidak memiliki perizinan yang sesuai!`, type: "warning"}
    //     return msg
    // }
    const waktu = await currentTime()
    let data = {
        updated_at: waktu,
    }
    if (aktif === "Aktif") {
        data = Object.assign({}, data, {aktif: "Ya"})
    }
    if (aktif === "NonAktif") {
        data = Object.assign({}, data, {aktif: "Tidak"})
    }
    await dbConnect()
    id.map(async (id) => {
        const up = await User.findByIdAndUpdate(id, data)
        if (up) {
            const msg = {message: "Berhasil memperbaharui status aktif user.", type: "success"}
            revalidatePath(`/zakat/users`)
            return msg
        } else {
            const msg = {message: "Ups, Terjadi Kesalahan.", type: "error"}
            return msg
        }
    })
}
