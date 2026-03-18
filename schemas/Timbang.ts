import { z } from "zod"

export const nominalTimbanganSchema = z.object({
    nominal: z.coerce.number().gte(0, {message: 'Angka harus lebih besar dari atau sama dengan 0.'})
})

export type NominalTimbanganSchema = z.infer<typeof nominalTimbanganSchema>