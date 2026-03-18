import { z } from "zod"

export const pengumpulanSchema = z.object({
    tanggungan: z.coerce.number().int({message: 'Maaf, tidak boleh menggunakan koma atau angka pecahan.'}).gte(0, {message: 'Angka harus lebih besar dari atau sama dengan 0.'}),
    fitrah_beras: z.coerce.number().gte(0, {message: 'Angka harus lebih besar dari atau sama dengan 0.'}),
    fitrah_uang: z.coerce.number().int({message: 'Maaf, tidak boleh menggunakan koma atau angka pecahan.'}).gte(0, {message: 'Angka harus lebih besar dari atau sama dengan 0.'}),
    mal: z.coerce.number().int({message: 'Maaf, tidak boleh menggunakan koma atau angka pecahan.'}).gte(0, {message: 'Angka harus lebih besar dari atau sama dengan 0.'}),
    infak: z.coerce.number().gte(0, {message: 'Angka harus lebih besar dari atau sama dengan 0.'}),
    keterangan: z.string()
})

export type PengumpulanSchema = z.infer<typeof pengumpulanSchema>