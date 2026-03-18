"use client"

import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { InputAdornment } from "@/components/ui/input-adornment"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { saveAddLainAction } from "@/lib/zakat/lain"
import { saveAddPembagianBeras } from "@/lib/zakat/pembagian"
import { pembagianSchema, PembagianSchema } from "@/schemas/Pembagian"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogTitle } from "@radix-ui/react-dialog"
import { useAction } from "next-safe-action/hooks"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

export function DialogAddPembagianBeras() {
    const form = useForm<PembagianSchema>({
        mode: "all",
        resolver: zodResolver(pembagianSchema),
        defaultValues: {
            anggota: 0,
            kondisi: 'Sama dengan',
            nominal: 0
        }
    })
    const {executeAsync, result} = useAction(saveAddPembagianBeras)
    async function onAdd() {
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
                <DialogTitle>Formulir Tambah Kondisi Pembagian Beras Zakat Fitrah</DialogTitle>
                <DialogDescription>Apabila jumlah anggota keluarga Kondisi Jumlah Anggota Keluarga, maka mereka menerima beras zakat fitrah Nominal kg.</DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    form.handleSubmit(onAdd)()
                }} className="space-y-3">
                    <div className="w-full flex">
                        <div className="pr-2">
                            <p className="pb-2">Jumlah Anggota Keluarga</p>
                            <div className="flex gap-2 w-full">
                                <FormField control={form.control} name="kondisi" render={({field}) => (
                                    <FormItem>
                                        {/* <FormLabel>Kondisi</FormLabel> */}
                                        <Select {...field} defaultValue={field.value} onValueChange={field.onChange}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Pilih kondisi!" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Sama dengan">Sama dengan</SelectItem>
                                                <SelectItem value="Lebih dari sama dengan">Lebih dari sama dengan</SelectItem>
                                                <SelectItem value="Kurang dari sama dengan">Kurang dari sama dengan</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="anggota" render={({field}) => (
                                    <FormItem>
                                        {/* <FormLabel>Jumlah Anggota Keluarga</FormLabel> */}
                                        <FormControl>
                                            <Input type="number" placeholder="0" {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            </div>
                        </div>
                        <div className="flex items-end pr-2 pb-2">
                            <p>menerima</p>
                        </div>
                        <div className="w-3/12">
                            <p className="pb-2">Nominal</p>
                            <FormField control={form.control} name="nominal" render={({field}) => (
                                <FormItem>
                                    {/* <FormLabel className="font-semibold">Nominal Timbangan Beras</FormLabel> */}
                                        <FormControl>
                                            <InputAdornment endAdornment="Kg" type="number" placeholder="0" {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                                        </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                    </div>
                    <Button type="submit">Simpan</Button>
                </form>
            </Form>
        </DialogContent>
    )
}
