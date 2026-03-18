// @ts-nocheck
'use server'

import { FormState, SignUpFormSchema } from "@/lib/sign-up";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { dbConnect } from "./mongodb";
import { deleteSession } from "./auth/sessions";
import { redirect } from "next/navigation";

function currentTime() {
    const today = new Date()
    const hour = today.getHours()
    const minute = today.getMinutes()
    const second = today.getSeconds()

    return `${hour}:${minute}:${second}`
}

export async function signup(state: FormState, formData: FormData) {
    // 1. Validate form field
    const validatedFields = SignUpFormSchema.safeParse({
        name: formData.get('name'),
        password: formData.get('password')
    })

    // 2. Prepare data for insertion into database
    const { name, password } = validatedFields.data
    // e.g. Hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(password, 10)

    // 3. Insert the user into the database or call an Auth Library's API
    const data = {
        nama: name,
        username: 'x',
        password: hashedPassword,
        level: 'petugas',
        updated: currentTime()
    }
    await dbConnect
    const newU = new User(data)
    const newdata = await newU.save()
    // const data = await dbConnect
    //     .insert(users)
    //     .values({
    //         name,
    //         password: hashedPassword
    //     })
    //     .returning({ id: users.id })
    
    const user = newdata[0]

    if (!user) {
        return {
            message: 'An error occurred while creating your account.'
        }
    }

    // If any form field are invalid, return early
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }
}

export async function logout() {
    await deleteSession()
    redirect('/')
}