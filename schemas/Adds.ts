import { z } from "zod"

export const justIDSchema = z.object({
    id: z.string()
})

export const terdistribusiSchema = z.object({
    status: z.enum(['Sudah','Belum'])
})

export const jumlahSchema = z.object({
    jumlah: z.coerce.number()
})

export const waktuSchema = z.object({
    waktu: z.string()
})

export const statusSchema = z.object({
    status: z.enum(['Pending','Execute','Done'])
})

export const aktifSchema = z.object({
    status: z.enum(["Aktif","NonAktif"])
})

export const formAksesSchema = z.object({
    // akses: z.array(z.string()).refine((value) => value.some((type) => type))
    akses: z.array(z.string())
})

export const formUserSchema = z.object({
    nama: z.string().min(5, {message: "Nama harus dari 5 atau lebih karakter."}),
    username: z.string().min(8, {message: "Username harus dari 8 atau lebih karakter."}),
    level: z.enum(["Petugas", "Distributor", "Admin"]),
})

export const formPassSchema = z.object({
    password: z.string().min(8, {message: "Password harus dari 8 atau lebih karakter."}),
})

export const timbangSchema = z.object({
    massa: z.array(z.object({
        timbang: z.number({message: "Harus berupa angka"}).min(0, {message: "Angka >= 0"})
    }))
})

export type Waktu = {
    time: string
    total: number
}