"use client"

import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchUserById } from "@/lib/data"
import { upUserAction } from "@/lib/user"
import { userSchema, type UserSchema } from "@/schemas/User"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

declare enum Level {
    "Petugas", "Distributor", "Admin"
}

const formSchema = z.object({
    nama: z.string().min(8, {message: "Nama harus dari 8 atau lebih karakter."}),
    username: z.string().min(8, {message: "Username harus dari 8 atau lebih karakter."}),
    level: z.enum(["Petugas", "Distributor", "Admin"]),
})

export function FormEditUser({
    uid, 
    namau,
    uname,
    ulevel
} : {
    uid: string,
    namau: string,
    uname: string,
    ulevel: "Petugas" | "Distributor" | "Admin"
}) {
    
    // const values = {
    //     nama: namau,
    //     username: uname,
    //     password:'',
    //     level: ulevel,
    // }
    // console.log(values)
    const formed = useForm<z.infer<typeof formSchema>>({
        mode: "all",
        resolver: zodResolver(formSchema),
        defaultValues: {
            nama: namau,
            username: uname,
            level: ulevel
        },
        // values
    })
    const boundUpUserAction = upUserAction.bind(null, uid)
    const {executeAsync, result} = useAction(boundUpUserAction)
    async function onSubmit() {
        console.log(formed.getValues())
        await executeAsync(formed.getValues())
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
                <DialogTitle>Edit data user</DialogTitle>
                <DialogDescription>Cek ulang!</DialogDescription>
            </DialogHeader>
            <Form {...formed}>
                <form onSubmit={e => {
                    e.preventDefault()
                    formed.handleSubmit(onSubmit)()
                }} className="space-y-8">
                    <FormField control={formed.control} name="nama" render={({field}) => (
                        <FormItem>
                            <FormLabel>Nama</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={formed.control} name="username" render={({field}) => (
                        <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                                <Input type="text" {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                    <FormField control={formed.control} name="level" render={({field}) => (
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
                    <Button type="submit">Simpan</Button>
                </form>
            </Form>
        </DialogContent>
    )
}