"use client"

import { cn } from "@/lib/utils";
import React, { useActionState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { authenticate } from "@/lib/actions";
import { Circle } from "lucide-react";
import { signIn } from "@/auth";

const loginSchema = z.object({
    username: z.string({required_error: "Username dibutuhkan"})
        .min(8, {message: "Username harus dari 8 atau lebih karakter."}),
    password: z.string({required_error: "Password dibutuhkan"})
        .min(8, {message: "Password harus dari 8 atau lebih karakter."}),
})

export function LoginnForm({
    className,
    ...props
} : React.ComponentPropsWithoutRef<"div">) {
    // const searchParams = useSearchParams()
    // const callbackUrl = searchParams.get('callbackUrl') || '/zakat'
    // const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined)
    // const form = useForm<z.infer<typeof loginSchema>>({
    //     mode: "onBlur",
    //     resolver: zodResolver(loginSchema),
    //     defaultValues: {
    //         username: '',
    //         password: ''
    //     }
    // })
    return (
        <div className="flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>Masukkan Username dan Password Anda untuk login ke akun Anda</CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="username">Username</Label>
                                <Input id="username" name="username" type="text" placeholder="User123" required />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="username">Password</Label>
                                <Input id="password" name="password" type="password" required />
                            </div>
                            <input type="hidden" name="redirectTo" 
                            // value={callbackUrl} 
                            />
                            <Button type="submit" className="w-full" 
                            // aria-disabled={isPending}
                            >
                                Login
                            </Button>
                        </div>
                        <div className="flex h-8 items-end space-x-1" aria-live="polite" aria-atomic="true">
                            {/* {errorMessage && (
                                <>
                                    <Circle className="h-5 w-5 text-red-500" />
                                    <p className="text-sm text-red-5000">{errorMessage}</p>
                                </>
                            )} */}
                        </div>
                        <div className="mt-4 text-center text-sm">
                            <a href="/" className="underline underline-offset-4">Kembali</a>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}