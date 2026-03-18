import { z } from "zod"

export const userSchema = z.object({
    nama: z.string().min(8, {message: "Nama harus dari 8 atau lebih karakter."}),
    username: z.string().min(8, {message: "Username harus dari 8 atau lebih karakter."}),
    password: z.string().min(8, {message: "Password harus dari 8 atau lebih karakter."}),
    level: z.enum(["Petugas", "Distributor", "Admin"]),
})

export type UserSchema = z.infer<typeof userSchema>