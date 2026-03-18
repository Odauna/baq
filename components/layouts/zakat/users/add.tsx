"use client"

import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { addUserZakatAction } from "@/lib/zakat/user"
import { userSchema, UserSchema } from "@/schemas/User"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export function DialogAddUser() {
    const form = useForm<UserSchema>({
        mode: "all",
        resolver: zodResolver(userSchema),
        defaultValues: {
            nama: '',
            level: 'Petugas',
            username: '',
            password: '',
        }
    })
    const [isLoading, setIsLoading] = useState(false)
    const {executeAsync, result} = useAction(addUserZakatAction)
    async function onSubmit() {
        try {
            setIsLoading(true)
            const add = await executeAsync(form.getValues())
            if (add) { form.reset() }
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        if (result.data?.type == "success") {
            toast.success(result.data.message)
        }
        if (result.data?.type == "error") {
            toast.error(result.data.message)
        }
        if (result.data?.type == "warning") {
            toast.warning(result.data.message)
        }
    }, [result.data])
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Form Tambah Pengguna</DialogTitle>
                <DialogDescription>Jangan lupa cek ulang sebelum disimpan!</DialogDescription>
            </DialogHeader>
            <Form {...form}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    form.handleSubmit(onSubmit)()
                }} className="space-y-4">
                    <FormField control={form.control} name="nama" render={({field}) => (
                        <FormItem>
                            <FormLabel>Nama</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <div className="flex space-x-4">
                        <FormField control={form.control} name="level" render={({field}) => (
                            <FormItem>
                                <FormLabel>Level</FormLabel>
                                <Select {...field} defaultValue={field.value} onValueChange={field.onChange}>
                                    <FormControl>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih level user." />
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
                        <FormField control={form.control} name="username" render={({field}) => (
                            <FormItem className="w-full">
                                <FormLabel>Username</FormLabel>
                                <FormControl>
                                    <Input type="text" {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                    </div>
                    <FormField control={form.control} name="password" render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <Separator />
                    <Button type="submit" className="items-center w-full" disabled={isLoading}>Simpan  {isLoading && <LoaderCircle className="animate-spin" />}</Button>
                </form>
            </Form>
        </DialogContent>
    )
}