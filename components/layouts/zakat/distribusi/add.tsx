"use client"

import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { addDistribusi } from "@/lib/zakat/distribusi"
import { distribusiSchema, DistribusiSchema } from "@/schemas/Distribusi"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

export enum AreaDistribusi {
    "Luar Dusun" = "Luar Dusun",
    "Amal Usaha" = "Amal Usaha",
    "Pengajuan Proposal" = "Pengajuan Proposal",
    "Aktivis Masjid" = "Aktivis Masjid",
    "Amil" = "Amil"
}

export function DialogAddDistribusi({area} : {area: string}) {
    // let at: 'Luar Dusun' | 'Amal Usaha' | 'Pengajuan Proposal' | 'Aktivis Masjid' | 'Amil'
    let at
    if (area === 'luar-dusun') {
        at = 'Luar Dusun'
    }
    if (area ==='amal-usaha') {
        at = 'Amal Usaha'
    }
    if (area === 'proposal') {
        at = 'Pengajuan Proposal'
    }
    if (area === 'aktivis-masjid') {
        at = 'Aktivis Masjid'
    }
    if (area === 'amil') {
        at = 'Amil'
    }
    const boundAddDistribusi = addDistribusi.bind(null, at)
    const {executeAsync, result} = useAction(boundAddDistribusi)
    const form = useForm<DistribusiSchema>({
        mode: 'all',
        resolver: zodResolver(distribusiSchema),
        defaultValues: {
            atasnama: '',
            alamat: '',
            keterangan: '',
            nominal: 0,
            catatan: ''
        }
    })
    async function onSubmit() {
        await console.log(form.getValues())
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
                <DialogTitle>Formulir Tambah Distribusi Zakat</DialogTitle>
                <DialogDescription>Pastikan data sudah tepat & benar sebelum disimpan!</DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    form.handleSubmit(onSubmit)()
                }} className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="">
                            <FormField control={form.control} name="atasnama" render={({field}) => (
                                <FormItem className="pb-3">
                                    <FormLabel>Atas Nama</FormLabel>
                                    <FormControl>
                                        <Input type="text" {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="alamat" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Alamat</FormLabel>
                                    <FormControl>
                                        <Textarea cols={25} {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        <FormField control={form.control} name="keterangan" render={({field}) => (
                            <FormItem>
                                <FormLabel>Keterangan</FormLabel>
                                <FormControl>
                                    <Textarea rows={6} cols={25} {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
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