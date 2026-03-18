"use client"

import { DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { wargaSchema, WargaSchema } from "@/schemas/Warga"
import { addWargaAction } from "@/lib/zakat/warga"
import { useAction } from "next-safe-action/hooks"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LoaderCircle } from "lucide-react"

const formSchema = z.object({
    rt: z.enum(['01','02','03','04','05','06']),
    keluarga: z.string().min(1).max(255),
    anggota: z.coerce.number().int().gte(0).lte(100),
    mustahik: z.enum(['Tidak','Ya'])
})

export function DialogAddWarga({
    rt
} : {
    rt: '01' | '02' | '03' | '04' | '05' | '06'
}) {
    const form = useForm<WargaSchema>({
        mode: "all",
        resolver: zodResolver(wargaSchema),
        defaultValues: {
            rt: rt,
            keluarga: "",
            anggota: 0,
            mustahik: "Tidak"
        }
    })
    const [isMemuat, setIsMemuat] = useState(false)
    const {executeAsync, result} = useAction(addWargaAction)
    async function onAdd() {
        setIsMemuat(true)
        try {
            const add = await executeAsync(form.getValues())
            if (add) {form.reset()}
        } catch (error) {
            console.error(error)
        } finally {
            setIsMemuat(false)
        }
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
                    <DialogTitle>Formulir Tambah Warga RT.{rt}</DialogTitle>
                    <DialogDescription>Silahkan masukkan nama keluarga dan jumlah anggota KK!</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit(onAdd)()
                    }} className="space-y-4">
                        <FormField control={form.control} name="rt" render={({field}) => (
                            <Input type="text" {...field} value={rt} hidden />
                        )} />
                        <FormField control={form.control} name="keluarga" rules={{required: true}} render={({field}) => (
                            <FormItem>
                                <FormLabel>Nama Keluarga</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} aria-describedby="warga-error" />
                                </FormControl>
                                <FormMessage />
                                {/* <div id="warga-error" aria-live="polite" aria-atomic="true">
                                    {state?.errors?.keluarga && state?.errors.keluarga.map((error: string) => (
                                        <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                                    ))}
                                </div> */}
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="anggota" render={({field}) => (
                            <FormItem>
                                <FormLabel>Jumlah Anggota KK</FormLabel>
                                <FormControl>
                                    <Input type="number" {...field} aria-describedby="ak-error" />
                                </FormControl>
                                <FormMessage />
                                {/* <div id="ak-error" aria-live="polite" aria-atomic="true">
                                    {state?.errors?.anggota && state?.errors.anggota.map((error: string) => (
                                        <p className="mt-2 text-sm text-red-500" key={error}>{error}</p>
                                    ))}
                                </div> */}
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
                        <Button type="submit" className="items-center" disabled={isMemuat}>Simpan {isMemuat && <LoaderCircle className="animate-spin" />}</Button>
                    </form>
                </Form>
            </DialogContent>
    )
}