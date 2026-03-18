"use client"

import { Button } from "@/components/ui/button";
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { saveWargaAction } from "@/lib/zakat/warga";
import { wargaSchema, WargaSchema } from "@/schemas/Warga";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export function DialogEditWarga({
    wid,
    warga_rt,
    nama_keluarga,
    anggota_keluarga,
    status_mustahik
} : {
    wid: string
    warga_rt: '01' | '02' | '03' | '04' | '05' | '06'
    nama_keluarga: string
    anggota_keluarga: number
    status_mustahik: "Ya" | "Tidak"
}) {
    const form = useForm<WargaSchema>({
        mode: 'all',
        resolver: zodResolver(wargaSchema),
        defaultValues: {
            rt: warga_rt,
            keluarga: nama_keluarga,
            anggota: anggota_keluarga,
            mustahik: status_mustahik
        }
    })
    const boundSaveWargaAction = saveWargaAction.bind(null,wid)
    const {executeAsync, result} = useAction(boundSaveWargaAction)
    async function onSubmit() {
        await executeAsync(form.getValues())
    }
    useEffect(() => {
        console.log(result.data)
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
                <DialogTitle>Formulir Ubah Data Warga RT {warga_rt}</DialogTitle>
                <DialogDescription>Silahkan masukkan nama keluarga dan jumlah anggota KK!</DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    form.handleSubmit(onSubmit)()
                }} className="space-y-8">
                    <FormField control={form.control} name="keluarga" render={({field}) => (
                        <FormItem>
                            <FormLabel>Nama Keluarga</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} value={field.value} onChange={e => {field.onChange(e.target.value)}} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="anggota" render={({field}) => (
                        <FormItem>
                            <FormLabel>Jumlah Anggota KK</FormLabel>
                            <FormControl>
                                <Input type="number" {...field} value={field.value} onChange={e => {field.onChange(e.target.value)}} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="mustahik" render={({field}) => (
                        <FormItem>
                            <FormLabel>Status Mustahik</FormLabel>
                            <Select {...field} onValueChange={field.onChange} defaultValue={field.value} >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Silahkan pilih status mustahik warga" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Tidak">Tidak</SelectItem>
                                    <SelectItem value="Ya">Ya</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <div className="flex gap-2">
                        <Button type="submit">Simpan</Button>
                        <Button type="button" variant="destructive" onClick={() => form.reset()}>Reset</Button>
                    </div>
                </form>
            </Form>
        </DialogContent>
    )
}