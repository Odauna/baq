"use client"

import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { saveAddLainAction } from "@/lib/zakat/lain"
import { zodResolver } from "@hookform/resolvers/zod"
import { DialogTitle } from "@radix-ui/react-dialog"
import { useAction } from "next-safe-action/hooks"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z.object({
    keterangan: z.string(),
    nominal: z.coerce.number().gte(0, {message: 'Angka harus lebih besar dari atau sama dengan 0.'}),
})

export function DialogAddLain({area} : {area: "Rekomendasi" | "Tambahan"}) {
    const form = useForm<z.infer<typeof formSchema>>({
        mode: "all",
        resolver: zodResolver(formSchema),
        defaultValues: {
            keterangan: '',
            nominal: 0
        }
    })
    const boundSaveAddLainAction = saveAddLainAction.bind(null, area)
    const {executeAsync, result} = useAction(boundSaveAddLainAction)
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
                <DialogTitle>Formulir Tambah</DialogTitle>
                <DialogDescription>!</DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    form.handleSubmit(onAdd)()
                }} className="space-y-3">
                    <FormField control={form.control} name="keterangan" render={({field}) => (
                        <FormItem>
                            <FormLabel>Keterangan</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="nominal" render={({field}) => (
                        <FormItem>
                            <FormLabel>Nominal</FormLabel>
                            <FormControl>
                                <Input type="number" step=".1" {...field} />
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
