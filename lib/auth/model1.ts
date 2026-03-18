// @ts-nocheck
"use server"

import { loginSchema } from "@/schemas/Login";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        Credentials({
            credentials: {
                username: {},
                password: {},
            },
            authorize: async (credentials) => {
                try {
                    const user = null
                    const { username, password } = await loginSchema.parseAsync(credentials)
                    const pwHash = await bcrypt.hashSync(password)
                } catch (error) {
                    
                }
            },
        }),
    ],
})