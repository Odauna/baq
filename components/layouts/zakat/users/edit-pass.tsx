"use client"

import { Button } from "@/components/ui/button"
import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useIsMobile } from "@/hooks/use-mobile"
import { upPassAction } from "@/lib/zakat/user"
import { cn } from "@/lib/utils"
import { formPassSchema } from "@/schemas/Adds"
import { zodResolver } from "@hookform/resolvers/zod"
import { LoaderCircle } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

export function UserEditPassword({
    u_id,
    u_name
} : {
    u_id: string
    u_name: string
}) {
    const form_pass = useForm<z.infer<typeof formPassSchema>>({
        mode: "onSubmit",
        resolver: zodResolver(formPassSchema),
        defaultValues: {
            password: ''
        },
    })
    const isMobile = useIsMobile()
    const [isProceed, setIsProceed] = useState(false)
    const bindUpPassAction = upPassAction.bind(null, u_id)
    const {executeAsync, result} = useAction(bindUpPassAction)
    async function onPass() {
        try {
            setIsProceed(true)
            await executeAsync(form_pass.getValues())
        } catch (error) {
            console.error(error)
        } finally {
            setIsProceed(true)
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
                <DialogTitle>Ubah Password User <b>{u_name}</b></DialogTitle>
                <DialogDescription>Pastikan Anda mengingat atau mencatat password-nya</DialogDescription>
            </DialogHeader>
            <Form {...form_pass}>
                <form onSubmit={e => {
                    e.preventDefault()
                    form_pass.handleSubmit(onPass)()
                }} className="space-y-8">
                    <FormField control={form_pass.control} name="password" render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input type="password" {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                            </FormControl>
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