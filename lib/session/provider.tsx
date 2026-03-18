// @ts-nocheck
"use client"

import React from "react"
// import { SessionContext } from "./context"
export const SessionContext = React.createContext({nama: '', level: '', username: '', avatar: ''})

export default function SessionProvider({user, children} : {user: Record<string, unknown>, children: React.ReactNode}){
    return <SessionContext value={user}>{children}</SessionContext>
}