import { z } from "zod"

export const distribusiSchema = z.object({
    // id: z.string(),
    atasnama: z.string().min(1, {message: 'Nama penerima harus lebih dari 1 huruf.'}),
    alamat: z.string().min(1, {message: 'Alamat tidak boleh kosong, setidaknya -'}),
    keterangan: z.string().min(1, {message: 'Alamat tidak boleh kosong, setidaknya -'}),
    jenis: z.enum(["Fitrah (Beras)", "Fitrah (Uang)", "Mal", "Infak"]).optional(),
    nominal: z.coerce.number().gte(0, {message: 'Angka harus lebih besar dari atau sama dengan 0.'}),
    catatan: z.string(),
})

export type DistribusiSchema = z.infer<typeof distribusiSchema>