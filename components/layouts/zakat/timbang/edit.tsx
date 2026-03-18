"use client"

import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { InputAdornment } from "@/components/ui/input-adornment"
import { upNominalTimbangan } from "@/lib/zakat/pengumpulan"
import { nominalTimbanganSchema, NominalTimbanganSchema } from "@/schemas/Timbang"
import { zodResolver } from "@hookform/resolvers/zod"
import { Eraser } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export function DialogEditTimbang({
    tid,
    twaktu,
    tnominal
} : {
    tid: string,
    twaktu: string,
    tnominal: number
}) {
    const values = {
        nominal: tnominal
    }
    const form = useForm<NominalTimbanganSchema>({
        mode: "onChange",
        resolver: zodResolver(nominalTimbanganSchema),
        defaultValues: {
            nominal: tnominal,
        },
        values
    })
    const boundUpNominalTimbangan = upNominalTimbangan.bind(null, tid)
    const {executeAsync, result} = useAction(boundUpNominalTimbangan)
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
                <DialogTitle>Formulir Ubah Nominal Timbangan Pengumpulan Zakat Beras Jam {twaktu}</DialogTitle>
                <DialogDescription>Jangan lupa cek ulang sebelum disimpan!</DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    form.handleSubmit(onSubmit)()
                }} className="space-y-3">
                    <div className="grid grid-cols-2 gap-4">
                        <FormField control={form.control} name="nominal" render={({field}) => (
                            <FormItem className="px-2">
                                <FormLabel className="font-semibold">Nominal Timbangan Beras</FormLabel>
                                <FormControl>
                                    <InputAdornment endAdornment="Kg" type="number" placeholder="0" {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <Button variant="destructive" size="icon" className="shrink-0 rounded-full"><Eraser /></Button>
                    </div>
                    <Button type="submit">Simpan</Button>
                </form>
            </Form>
        </DialogContent>
    )
}