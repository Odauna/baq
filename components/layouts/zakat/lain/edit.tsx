"use client"

import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { fetchLainById } from "@/lib/data"
import { saveAddLainAction, saveUpLainAction } from "@/lib/zakat/lain"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogTitle } from "@radix-ui/react-dialog"
import { Loader } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z.object({
    keterangan: z.string(),
    nominal: z.coerce.number().gte(0, {message: 'Angka harus lebih besar dari atau sama dengan 0.'}),
})

export function DialogEditLain({
    id,
    proses
} : {
    id: string
    proses: boolean
}) {
    const [stateproses] = useState(proses)
    const [isLoading, setIsLoading] = useState(false)
    const [ket, setKet] = useState('')
    const [nom, setNom] = useState(0)
    async function fetchData() {
        setIsLoading(true)
        try {
            const dl = await fetchLainById(id)
            if (dl) {
                setKet(dl.keterangan)
                setNom(dl.nominal)
            }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchData()
        // if (isLoading) {
        //     toast.loading('Memuat...')
        // }
    }, [stateproses])
    const values = {
        keterangan: ket,
        nominal: nom
    }
    const form = useForm<z.infer<typeof formSchema>>({
        mode: "all",
        resolver: zodResolver(formSchema),
        defaultValues: {
            keterangan: ket,
            nominal: nom
        },
        values
    })
    const boundSaveUpLainAction = saveUpLainAction.bind(null, id)
    const {executeAsync, result} = useAction(boundSaveUpLainAction)
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
        <>
        {isLoading ? (
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex">
                        <Loader className="animate-spin" /> 
                        <p className="pl-2">
                            Mohon tunggu sebentar, sedang memuat...
                        </p>
                    </DialogTitle>
                </DialogHeader>
            </DialogContent>

        ) : (
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Formulir Ubah Rekomendasi Nominal Zakat Fitrah</DialogTitle>
                    <DialogDescription>Pastikan nominal yang Anda masukkan benar dan sesuai!</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit(onSubmit)()
                    }} className="space-y-3">
                        <FormField control={form.control} name="keterangan" render={({field}) => (
                            <FormItem>
                                <FormLabel>Keterangan</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                                </FormControl>
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
                        <Button type="submit">Simpan</Button>
                    </form>
                </Form>
            </DialogContent>
        )}
        </>
    )
}
