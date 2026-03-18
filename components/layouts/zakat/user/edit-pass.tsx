"use client"

import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { upPassAction } from "@/lib/user"
import { userSchema, UserSchema } from "@/schemas/User"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const passSchema = z.object({
    password: z.string().min(8, {message: "Password harus dari 8 atau lebih karakter."}),
})

export function UserEditPassword({
    uid,
    uname
} : {
    uid: string
    uname: string
}) {
    const formpass = useForm<z.infer<typeof passSchema>>({
        mode: "onBlur",
        resolver: zodResolver(passSchema),
        defaultValues: {
            password: ''
        },
    })
    const boundUpPassAction = upPassAction.bind(null, uid)
    const {executeAsync, result} = useAction(boundUpPassAction)
    async function onPass() {
        console.log(formpass.getValues())
        await executeAsync(formpass.getValues())
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
                <DialogTitle>Ubah Password User <b>{uname}</b></DialogTitle>
                <DialogDescription>Pastikan Anda mengingat atau mencatat <b>password</b>nya</DialogDescription>
            </DialogHeader>
            <Form {...formpass}>
                <form onSubmit={e => {
                    e.preventDefault()
                    formpass.handleSubmit(onPass)()
                }} className="space-y-8">
                    <FormField control={formpass.control} name="password" render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
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