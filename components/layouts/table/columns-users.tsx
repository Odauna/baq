// @ts-nocheck
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import React, {useEffect, useState} from "react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { userSchema, type UserSchema } from "@/schemas/User"
import { fetchUserById } from "@/lib/data"
import { deleteUserAction, upUserAction } from "@/lib/user"
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"
import { EditPassword } from "../zakat/user/edit-pass"
import { Drawer } from "@/components/ui/drawer"
import { AktifUser } from "../zakat/drawer/aktif-user"
import { DeleteUser } from "../zakat/user/del-user"
import { FormEditUser } from "../zakat/user/edit-user"

export type Users = {
    _id: string
    nama: string
    username: string
    level: "Petugas" | "Distributor" | "Admin"
    aktif: "Ya" | "Belum"
}

export const columnsUsers: ColumnDef<Users>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <div className="h-4 w-4">
                <div className="flex items-center justify-center">
                    <Checkbox className="h-4 w-4 gap-2" checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
                </div>
            </div>
        ),
        enableSorting: false,
        enableHiding: false
    },
    {
        accessorKey: "nama",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Nama
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: "username",
        header: "Username"
    },
    {
        accessorKey: "level",
        header: "Level"
    },
    {
        accessorKey: "aktif",
        header: "Aktif?"
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original
            const [isDialogEditOpen, setIsDialogEditOpen] = useState(false)
            const [isDialogPassOpen, setIsDialogPassOpen] = useState(false)
            const [isDrawerStateOpen, setIsDrawerStateOpen] = useState(false)
            const [isAlertDelOpen, setIsAlertDelOpen] = useState(false)
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-6 w-8 p-0">
                            <span className="sr-only">Details</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setIsDialogEditOpen(true)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setIsDialogPassOpen(true)}>Ubah Password</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setIsDrawerStateOpen(true)} >Ubah Status</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setIsAlertDelOpen(true)} >Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                    <Dialog open={isDialogEditOpen} onOpenChange={setIsDialogEditOpen}>
                        <FormEditUser uid={user._id} namau={user.nama} uname={user.username} ulevel={user.level} />
                    </Dialog>
                    <Dialog open={isDialogPassOpen} onOpenChange={setIsDialogPassOpen}>
                        <EditPassword uid={user._id} uname={user.username} />
                    </Dialog>
                    <Drawer open={isDrawerStateOpen} onOpenChange={setIsDrawerStateOpen}>
                        <AktifUser id={user._id} proses={user.aktif} uname={user.username} />
                    </Drawer>
                    <AlertDialog open={isAlertDelOpen} onOpenChange={setIsAlertDelOpen}>
                        <DeleteUser uid={user._id} uname={user.username} />
                    </AlertDialog>
                </DropdownMenu>
            )
        }
    }
    
]