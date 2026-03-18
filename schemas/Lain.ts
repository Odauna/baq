import { z } from "zod";

export const lainSchema = z.object({
    keterangan: z.string(),
    nominal: z.coerce.number().gte(0, {message: 'Angka harus lebih besar dari atau sama dengan 0.'}),
})

export type LainSchema = z.infer<typeof lainSchema>