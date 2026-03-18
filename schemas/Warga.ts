import { z } from "zod"

export const wargaSchema = z.object({
    // _id: z.string(),
    rt: z.enum(['01','02','03','04','05','06'], {invalid_type_error: 'Silahkan pilih RT warga, misal 01.'}),
    keluarga: z.string().min(1, {message: 'Nama keluarga harus lebih dari 1 huruf.'}).max(255),
    anggota: z.coerce.number().int({message: 'Maaf, tidak boleh menggunakan koma atau angka pecahan.'}).gte(0, {message: 'Silahkan masukkan angka lebih besar dari atau sama dengan 0.'}),
    mustahik: z.enum(['Tidak','Ya'], {invalid_type_error: 'Silahkan pilih status mustahik warga.'})
})

export type WargaSchema = z.infer<typeof wargaSchema>