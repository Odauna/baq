"use server"

import Warga from "@/models/Warga"
import { dbConnect } from "./mongodb"

export async function totalZFBeras() {
    try {
        await dbConnect()
        const sum = Warga.aggregate([{
            $group: {
                _id: '0',
                amount: {$sum: "$pengumpulan.fitrah_beras"}
            }
        }])
        console.log(sum)
        return sum
    } catch (error) {
        console.error('Database Error: ', error)
    }
} 