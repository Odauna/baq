'use server'

import Warga from "@/models/Warga";
import { dbConnect } from "./mongodb";
import Pengumpulan from "@/models/Pengumpulan";
import Distribusi from "@/models/Distribusi";
import User from "@/models/User";
import Lain from "@/models/Lain";

export async function fetchZI() {
    try {
        await dbConnect()
        const data = await Pengumpulan.find().populate({path: "atasnama"}).exec()
        const dzi = JSON.parse(JSON.stringify(data))
        return dzi
    } catch (error) {
        console.error('Database Error: ', error)
        throw new Error('Gagal mendapatkan data!')
    }
}

export async function fetchWargaById(id: string) {
    try {
        await dbConnect()
        const data = await Warga.findById(id).exec()
        const warga = JSON.parse(JSON.stringify(data))
        console.log(warga)
        return warga
    } catch (error) {
        console.error('Database Error: ', error)
        throw new Error('Gagal mendapatkan data warga!')
    }
}

export async function fetchZIbyId(id: string) {
    try {
        await dbConnect()
        const data = await Pengumpulan.findById(id).populate({path: 'atasnama'}).exec()
        const ziw =JSON.parse(JSON.stringify(data))
        console.log(ziw)
        return ziw
    } catch (_error) {
        throw new Error("Ups, gagal mendapatkan data.")
    }
}

export async function fetchSWDbyId(id: string) {
    try {
        await dbConnect()
        const data = await Distribusi.findById(id).exec()
        const sdusun = JSON.parse(JSON.stringify(data))
        console.log(sdusun)
        return sdusun
    } catch (error) {
        console.error('Database Error: ', error)
        throw new Error("Ups, gagal mendapatkan data.")
    }
}

export async function fetchUserById(id: string) {
    try {
        await dbConnect()
        const data = await User.findById(id).exec()
        const duser = JSON.parse(JSON.stringify(data))
        console.log(duser)
        return duser
    } catch (error) {
        console.error('Database Error: ', error)
        throw new Error("Ups, gagal mendapatkan data user.")
    }
}

export async function fetchLainById(id: string) {
    try {
        await dbConnect()
        const data = await Lain.findById(id)
        const dlbid = JSON.parse(JSON.stringify(data))
        return dlbid
    } catch (error) {
        console.error('Database Error: ', error)
        throw new Error("Ups, gagal mendapatkan data.")
    }
}

export async function fetchRekomendasiFitrah() {
    try {
        await dbConnect()
        const data = await Lain.find({jenis: "Rekomendasi"}).exec()
        const drekomf = JSON.parse(JSON.stringify(data))
        return drekomf
    } catch (error) {
        console.error('Database Error: ', error)
        throw new Error("Ups, gagal.")
    }
}