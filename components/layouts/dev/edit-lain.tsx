// @ts-nocheck
"use client"

import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { saveAddLainAction, saveUpLainAction } from "@/lib/lain"
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

export function DialogEditLain({
    lid,
    keterangan,
    nominal
} : {
    lid: string
    keterangan: string
    nominal: number
}) {
    const form = useForm<z.infer<typeof formSchema>>({
        mode: "all",
        resolver: zodResolver(formSchema),
        defaultValues: {
            keterangan: keterangan,
            nominal: nominal
        }
    })
    const boundSaveUpLainAction = saveUpLainAction.bind(null, lid)
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
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Form edit</DialogTitle>
                <DialogDescription>!</DialogDescription>
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
                                <Textarea rows={6} cols={25} {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
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
    )
}
