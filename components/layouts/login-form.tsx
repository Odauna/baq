'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { loginSchema, LoginSchema } from "@/schemas/Login"
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react"
import { useAction } from "next-safe-action/hooks"
import { loginAction } from "@/lib/auth/login"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { LoaderCircle } from "lucide-react"
import { toast } from "sonner"

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
    const form = useForm<LoginSchema>({
        mode: "all",
        resolver: zodResolver(loginSchema),
        defaultValues: {
            username: '',
            password: ''
        }
    })
    const [isLoading, setIsLoading] = useState(false)
    const {executeAsync, result} = useAction(loginAction)
    async function onLogin() {
        try {
            setIsLoading(true)
            const login = await executeAsync(form.getValues())
            if (login) {form.reset(form.getValues())}
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
    }, [result.data])
    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>Masukan username dan password Anda untuk login ke akun Anda!</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit(onLogin)()
                        }}>
                            <div className="flex flex-col gap-6">
                                <FormField control={form.control} name="username" render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} placeholder="misalnya, petugas1" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="password" render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <Button type="submit" disabled={isLoading} className="w-full">
                                    Login {isLoading && <LoaderCircle className="animate-spin" />}
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
