import { z } from "zod"

export const pembagianSchema = z.object({
    anggota: z.coerce.number().int().gte(0, {message: 'Angka harus lebih besar dari atau sama dengan 0.'}),
    kondisi: z.enum(["Sama dengan", "Lebih dari sama dengan", "Kurang dari sama dengan"]),
    nominal: z.coerce.number().gte(0, {message: 'Angka harus lebih besar dari atau sama dengan 0.'}),
})

export type PembagianSchema = z.infer<typeof pembagianSchema>