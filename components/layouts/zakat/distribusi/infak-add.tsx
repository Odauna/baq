"use client"

import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { addDistribusiInfak } from "@/lib/zakat/distribusi"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z.object({
    atasnama: z.string(),
    alamat: z.string(),
    keterangan: z.string(),
    jenis: z.enum(["Fitrah (Beras)", "Fitrah (Uang)", "Mal", "Infak"]).optional(),
    nominal: z.coerce.number().gte(0),
    catatan: z.string(),
})

export function DialogAddDistribusiInfak() {
    const {executeAsync, result} = useAction(addDistribusiInfak)
    // const {executeAsync, result} = useAction(saveAddSalurAction)
    const form = useForm<z.infer<typeof formSchema>>({
        mode: 'all',
        resolver: zodResolver(formSchema),
        defaultValues: {
            atasnama: '',
            alamat: '',
            keterangan: '',
            jenis: 'Infak',
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
                <DialogTitle>Formulir Tambah Distribusi Infak</DialogTitle>
                <DialogDescription>!</DialogDescription>
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
                                        <Input type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="alamat" render={({field}) => (
                                <FormItem>
                                    <FormLabel>Alamat</FormLabel>
                                    <FormControl>
                                        <Textarea cols={25} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        </div>
                        <FormField control={form.control} name="keterangan" render={({field}) => (
                            <FormItem>
                                <FormLabel>Keterangan</FormLabel>
                                <FormControl>
                                    <Textarea rows={6} cols={25} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="jenis" render={({field}) => (
                            <FormItem>
                                <FormLabel>Jenis</FormLabel>
                                <Select {...field}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
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
                                    <Input type="number" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <FormField control={form.control} name="catatan" render={({field}) => (
                        <FormItem>
                            <FormLabel>Catatan</FormLabel>
                            <FormControl>
                                <Textarea {...field} />
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