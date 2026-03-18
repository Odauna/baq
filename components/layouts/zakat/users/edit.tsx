"use client"

import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { upUserZakatAction } from "@/lib/zakat/user"
import { formUserSchema } from "@/schemas/Adds"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

declare enum Level {
    "Petugas", "Distributor", "Admin"
}

export function UserEdit({
    u_id, 
    nama_u,
    u_name,
    u_level
} : {
    u_id: string,
    nama_u: string,
    u_name: string,
    u_level: "Petugas" | "Distributor" | "Admin"
}) {

    const form = useForm<z.infer<typeof formUserSchema>>({
        mode: "all",
        resolver: zodResolver(formUserSchema),
        defaultValues: {
            nama: nama_u,
            username: u_name,
            level: u_level
        },
    })
    const [isProceed, setIsProceed] = useState(false)
    const bindUpUserZakatAction = upUserZakatAction.bind(null, u_id)
    const {executeAsync, result} = useAction(bindUpUserZakatAction)
    async function onSubmit() {
        try {
            setIsProceed(true)
            await executeAsync(form.getValues())
        } catch (error) {
            console.error(error)
        } finally {
            setIsProceed(false)
        }
    }
    useEffect(() => {
        if (result.data?.type == "success") {
            toast.success(result.data.message)
        }
        if (result.data?.type == "error") {
            toast.error(result.data.message)
        }
        // if (result.data?.type == "warning") {
        //     toast.warning(result.data.message)
        // }
    }, [result.data])
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Formulir Ubah Data Pengguna</DialogTitle>
                <DialogDescription>Silahkan cek ulang disimpan!</DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={e => {
                    e.preventDefault()
                    form.handleSubmit(onSubmit)()
                }} className="space-y-8">
                    <FormField control={form.control} name="nama" render={({field}) => (
                        <FormItem>
                            <FormLabel>Nama</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="username" render={({field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={form.control} name="level" render={({field}) => (
                        <FormItem>
                            <FormLabel>Level</FormLabel>
                            <Select {...field} defaultValue={field.value} onValueChange={field.onChange}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih jenis zakat" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Petugas">Petugas</SelectItem>
                                    <SelectItem value="Distributor">Distributor</SelectItem>
                                    <SelectItem value="Admin">Admin</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <Separator />
                    <Button type="submit" className="items-center w-full" disabled={isProceed}>Simpan {isProceed && <LoaderCircle className="animate-spin" />}</Button>
                </form>
            </Form>
        </DialogContent>
    )
}