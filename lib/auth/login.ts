"use server"

import { loginSchema } from "@/schemas/Login"
import { actionClient } from "../safe-action"
import { flattenValidationErrors } from "next-safe-action"
import { dbConnect } from "../mongodb"
import bcrypt from "bcryptjs"
import { redirect } from "next/navigation"
import { createSession, deleteSession } from "./sessions"
import User from "@/models/User"

export const loginAction = actionClient
    .schema(loginSchema, {
        handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors
    })
    .action(async ({
        parsedInput: {username, password}
    }) => {
        // const hashedPassword = await bcrypt.hashSync(password)
        const data = {
            username: username
        }
        await dbConnect()
        const cek_user = await User.findOne(data)
        console.log(`user ${cek_user}`)
        // console.log(cek_user.password)
        // const user_parse = JSON.parse(cek_user)
        // console.log(user_parse)
        // console.log(logged)
        
        if (cek_user != null) {
            if (cek_user.aktif == "Ya") {
                const logged = bcrypt.compareSync(password, cek_user.password)
                if (logged) {
                    console.log("logged")
                    await createSession(cek_user.id, cek_user.level, cek_user.aktif, cek_user.kegiatan)
                    // const msg = {message: `Selamat datang, ${cek_user.nama} :) !`, type: "success"}
                    if (cek_user.kegiatan == "Zakat") {
                        redirect('/zakat')
                    }
                    // return msg
                } else {
                    const msg = {message: "Ups, Gagal. Password salah", type: "error"}
                    return msg
                }
            } else {
                const msg = {message: "Ups, Gagal. User tidak aktif", type: "error"}
                return msg
            }
        } else {
            const msg = {message: "Ups, Gagal. Username salah", type: "error"}
            return msg
        }
    })

export async function logout() {
    await deleteSession()
    redirect('/')
}