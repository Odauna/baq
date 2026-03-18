"use server"

import { revalidatePath } from "next/cache"
import { dbConnect } from "./mongodb"
import Warga from "@/models/Warga"
import { z } from "zod"
import Pengumpulan from "@/models/Pengumpulan"
import Distribusi from "@/models/Distribusi"
import { AuthError } from "next-auth"
import { signIn } from "@/auth"

const formSchema = z.object({
    rt: z.enum(['01','02','03','04','05','06'], {invalid_type_error: 'Silahkan pilih RT warga, misal 01.'}),
    keluarga: z.string().min(1, {message: 'Nama keluarga harus lebih dari 1 huruf.'}).max(255),
    anggota: z.coerce.number().int({message: 'Maaf, tidak boleh menggunakan koma atau angka pecahan.'}).gte(0, {message: 'Silahkan masukkan angka lebih besar dari atau sama dengan 0.'}),
    mustahik: z.enum(['Belum Tahu','Tidak','Ya'], {invalid_type_error: 'Silahkan pilih status mustahik warga.'})
})

export type State = {
    errors?: {
        rt?: string[]
        keluarga?: string[]
        anggota?: string[]
        mustahik?: string[]
    }
    message?: string | null
}

export async function addWarga(prevState: State, formData: FormData) {
    const validatedFields = formSchema.safeParse({
        rt: formData.get('rt'),
        keluarga: formData.get('keluarga'),
        anggota: formData.get('anggota'),
        mustahik: formData.get('mustahik')
    })

    console.log(validatedFields.data)

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: 'Bagian tidak ditemukan: Gagal menambahkan warga.'
        }
    }

    // console.log(validatedFields)
    await dbConnect()
    const newWarga = new Warga(validatedFields.data)
    const add = await newWarga.save()

    if (add) {
        console.log("Data Warga berhasil ditambahkan.")
        const dataWarga = {
            w_id: add._id,
            keluarga: add.keluarga,
            anggota: add.anggota
        }
        const dataKumpul = {
            atasnama: add._id,
            tanggungan: add.anggota
        }
        // const dataKumpul = {
        //     atasnama: [{
        //         w_id: add._id,
        //         rt: add.rt,
        //         keluarga: add.keluarga,
        //         anggota: add.anggota
        //     }],
        //     tanggungan: add.anggota
        // }
        const dataSalur = {
            alamat: 'RT.' + add.rt,
            area: 'Dusun'
        }
        try {
            const newK = new Pengumpulan(dataKumpul)
            const addK = await newK.save()
            const newS = new Distribusi(dataSalur)
            newS.set('atasnama.w_id', add._id)
            newS.set('atasnama.nama', add.keluarga)
            newS.set('atasnama.ak', add.anggota)
            newS.set('atasnama.mustahik', add.mustahik)
            const addS = await newS.save()
            if (addK) {
                console.log("Berhasil menambahkan data tersebut ke data pengumpulan")
            }
            if (addS) {
                console.log("Berhasil menambahkan data tersebut ke data distribusi")
            }
        } catch (error) {
            console.error("Gagal menambahkan data warga ke data pengumpulan dan distribusi", error)
        }

    //     Msg('success', 'Data warga berhasil ditambahkan.')
    // } else {
    //     Msg('error', 'Gagal menambahkan data warga!')
    }
    
    revalidatePath('/zakat/warga/' + validatedFields.data.rt)
    // redirect('/zakat/warga/' + rawFormData.rt)
}

const EditWarga = formSchema.omit({ rt: true })

export async function editWarga(rtw: string, id: string, formData: FormData) {
    const rawFormData = EditWarga.parse({
        keluarga: formData.get('keluarga'),
        anggota: formData.get('anggota'),
        mustahik: formData.get('mustahik')
    })

    await dbConnect()
    // const upWarga = new Warga(rawFormData)
    const up = await Warga.findByIdAndUpdate(id, rawFormData)
    if (up) {
        console.log("Data Warga berhasil ditambahkan.")
        const dataKumpul = {
            atasnama: up.keluarga,
            tanggungan: up.anggota
        }
        const dataSalur = {
            nama: up.keluarga
        }
        try {
            // const newK = new Pengumpulan(dataKumpul)
            const upK = await Pengumpulan.findOneAndUpdate({ w_id: up._id }, dataKumpul)
            // const newS = new Distribusi(dataSalur)
            const upS = await Distribusi.findOneAndUpdate({ rt: rtw, nama: rawFormData.keluarga}, dataSalur)
            if (upK && upS) {
                console.log("Berhasil mengedit data tersebut ke data pengumpulan dan distribusi")
            }
        } catch (error) {
            console.error("Gagal mengedit data warga ke data pengumpulan dan distribusi", error)
        }
    }

    revalidatePath('/zakat/warga/' + rtw)
}

export async function deleteWarga(id: string, rt: string) {
    await dbConnect()
    const w = await Warga.findByIdAndDelete(id)
    const k = await Pengumpulan.findOneAndDelete({'atasnama': id})
    const s = await Distribusi.findOneAndDelete({'nama.w_id': id})
    if (w) {
        console.log("Berhapus menghapus dari data Warga")
    }
    if (k) {
        console.log("Berhapus menghapus dari data Pengumpulan")
    }
    if (s) {
        console.log("Berhapus menghapus dari data Distribusi")
    }

}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
) {
    try {
        await signIn('credentials', formData)
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid Credentials.'
                default:
                    return 'Something went wrong.'
            }
        }
        throw error
    }
}