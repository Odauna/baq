'use server'

import User from "@/models/User"
import { dbConnect } from "./mongodb"
import bcrypt from "bcryptjs"

export async function getUserLogin(username: string, password: string) {
    await dbConnect()
    const data = {
        username: username
    }
    const cekuser = await User.findOne(data)
    const log = await bcrypt.compareSync(password, cekuser.password)
    if (log) {
        return cekuser
    }
}
