"use client"

import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { upDusunDistribusi } from "@/lib/zakat/distribusi"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z.object({
    keterangan: z.string().nullable(),
    jenis: z.enum(["Fitrah (Beras)", "Fitrah (Uang)", "Mal", "Infak"]),
    nominal: z.coerce.number().gte(0, {message: 'Angka harus lebih besar dari atau sama dengan 0.'}),
    catatan: z.string().nullable(),
})

export enum JenisDistribusi {
    "Fitrah (Beras)" = "Fitrah (Beras)",
    "Fitrah (Uang)" = "Fitrah (Uang)",
    "Mal" = "Mal",
    "Infak" = "Infak"
}

export function DialogEditDistribusiDusun({
    d_id,
    d_nama,
    d_ak,
    d_alamat,
    d_keterangan,
    d_jenis,
    d_nominal,
    d_catatan
} : {
    d_id: string
    d_nama: string
    d_ak: number
    d_alamat: string
    d_keterangan: string
    d_jenis: "Fitrah (Beras)" | "Fitrah (Uang)" | "Mal" | "Infak"
    d_nominal: number
    d_catatan: string
}) {
    // const [ket, setKet] = useState('')
    // const [jns, setJns] = useState<"Fitrah (Beras)" | "Fitrah (Uang)" | "Mal" | "Infak">("Fitrah (Beras)")
    // const [nom, setNom] = useState(0)
    // const [catatan, setCatatan] = useState('')
    // if (d_keterangan != undefined || d_keterangan != null) {
    //     setKet(d_keterangan)
    // }
    // if (d_jenis != undefined || d_jenis != null) {
    //     setJns(d_jenis)
    // }
    // if (d_nominal > 0) {
    //     setNom(d_nominal)
    // }
    // if (d_catatan != undefined || d_catatan != null) {
    //     setCatatan(d_catatan)
    // }
    // const values = {
    //     keterangan: ket,
    //     jenis: jns,
    //     nominal: nom,
    //     catatan: catatan
    // }
    const values = {
        keterangan: d_keterangan,
        jenis: d_jenis,
        nominal: d_nominal,
        catatan: d_catatan
    }
    const form = useForm<z.infer<typeof formSchema>>({
        mode: 'all',
        resolver: zodResolver(formSchema),
        defaultValues: {
            keterangan: '',
            jenis: 'Fitrah (Beras)',
            nominal: 0,
            catatan: ''
        },
        values
    })
    const boundUpDusunDistribusi = upDusunDistribusi.bind(null, d_id)
    const {executeAsync, result} = useAction(boundUpDusunDistribusi)
    async function onSubmit() {
        await executeAsync(form.getValues())
    }
    useEffect(() => {
        if (result.data?.type == "success") {
            toast.success(result.data.message)
        }
        if (result.data?.type == "error") {
            toast.error(result.data.message)
        }
    }, [result.data])
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Formulir Ubah Data Distribusi Dusun</DialogTitle>
                <DialogDescription>!</DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    form.handleSubmit(onSubmit)()
                }} className="space-y-3">
                    <div className="flex grid-cols-5 gap-1">
                        <div className="w-full justify-center text-center">
                            <p className="font-semibold">Atas Nama</p>
                            <p>{d_nama}</p>
                        </div>
                        <div>
                            <Separator orientation="vertical" />
                        </div>
                        <div className="w-full justify-center text-center">
                            <p className="font-semibold">Anggota</p>
                            <p>{d_ak}</p>
                        </div>
                        <div>
                            <Separator orientation="vertical" />
                        </div>
                        <div className="w-full justify-center text-center">
                            <p className="font-semibold">Alamat</p>
                            <p>{d_alamat}</p>
                        </div>
                    </div>
                    <Separator />
                    <FormField control={form.control} name="keterangan" render={({field}) => (
                        <FormItem>
                            <FormLabel>Keterangan</FormLabel>
                            <FormControl>
                                <Textarea {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="jenis" render={({field}) => (
                            <FormItem>
                                <FormLabel>Jenis</FormLabel>
                                <Select {...field} defaultValue={field.value} onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih jenis zakat" />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        <SelectItem value="Fitrah (Beras)">Fitrah (Beras)</SelectItem>
                                        <SelectItem value="Fitrah (Uang)">Fitrah (Uang)</SelectItem>
                                        <SelectItem value="Mal">Mal</SelectItem>
                                        <SelectItem value="Infak">Infak</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="nominal" render={({field}) => (
                            <FormItem>
                                <FormLabel>Nominal</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <FormField control={form.control} name="catatan" render={({field}) => (
                        <FormItem>
                            <FormLabel>Catatan</FormLabel>
                            <FormControl>
                                <Textarea {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <Button type="submit">Simpan</Button>
                </form>
            </Form>
        </DialogContent>
    )
}