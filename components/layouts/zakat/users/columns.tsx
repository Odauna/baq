"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown, CheckCircle2, CircleX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog } from "@/components/ui/dialog"
import { AlertDialog } from "@/components/ui/alert-dialog"
import React, { useState } from "react"
import { Drawer } from "@/components/ui/drawer"
import { UserEdit } from "./edit"
import { UserEditPassword } from "./edit-pass"
import { UserAktivasi } from "./aktivasi"
import { UserDelete } from "./del"
import { useIsMobile } from "@/hooks/use-mobile"
import { Badge } from "@/components/ui/badge"

interface ActionCellProps {
    user: Users
}

function ActionCell({ user }: ActionCellProps) {
    const [isEditOpen, setIsEditOpen] = useState(false)
    const [isPassOpen, setIsPassOpen] = useState(false)
    const [isStatusOpen, setIsStatusOpen] = useState(false)
    const [isAlertDelOpen, setIsAlertDelOpen] = useState(false)
    const isMobile = useIsMobile()

    const EditButton = () => {
        if (isMobile) {
            return (
                <>
                <Drawer open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <UserEdit u_id={user._id} nama_u={user.nama} u_name={user.username} u_level={user.level} />
                </Drawer>
                <Drawer open={isPassOpen} onOpenChange={setIsPassOpen}>
                    <UserEditPassword u_id={user._id} u_name={user.username} />
                </Drawer>
                <Drawer open={isStatusOpen} onOpenChange={setIsStatusOpen}>
                    <UserAktivasi u_id={user._id} u_name={user.username} u_aktif={user.aktif} />
                </Drawer>
                </>
            )
        }
        return (
            <>
            <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                <UserEdit u_id={user._id} nama_u={user.nama} u_name={user.username} u_level={user.level} />
            </Dialog>
            <Dialog open={isPassOpen} onOpenChange={setIsPassOpen}>
                <UserEditPassword u_id={user._id} u_name={user.username} />
            </Dialog>
            <Dialog open={isStatusOpen} onOpenChange={setIsStatusOpen}>
                <UserAktivasi u_id={user._id} u_name={user.username} u_aktif={user.aktif} />
            </Dialog>
            </>
        )
    }

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
                <DropdownMenuItem onClick={() => setIsEditOpen(true)}>Ubah Profil</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsPassOpen(true)}>Ubah Password</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsStatusOpen(true)} >Ubah Status</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setIsAlertDelOpen(true)} >Hapus</DropdownMenuItem>
            </DropdownMenuContent>
            <EditButton />
            <AlertDialog open={isAlertDelOpen} onOpenChange={setIsAlertDelOpen}>
                <UserDelete u_id={user._id} u_name={user.username} />
            </AlertDialog>
        </DropdownMenu>
    )
}

export type Users = {
    _id: string
    nama: string
    username: string
    level: "Petugas" | "Distributor" | "Admin"
    akses: [string]
    aktif: "Ya" | "Tidak"
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
        header: "Level",
        cell: ({row}) => {
            const user = row.original
            if (user.level === "Admin") {
                return (
                    <Badge className="bg-purple-700 text-white">{user.level}</Badge>
                )
            } else if (user.level === "Distributor") {
                return (
                    <Badge className="bg-blue-700 text-white">{user.level}</Badge>
                )
            } else if (user.level === "Petugas") {
                return (
                    <Badge className="bg-emerald-700 text-white">{user.level}</Badge>
                )
            }
        }
    },
    {
        accessorKey: "aktif",
        header: "Aktif?",
        cell: ({row}) => {
            return (
                <div className="flex items-center justify-center">
                    {(row.original.aktif == "Ya") && (
                        <CheckCircle2 color="#00ff40" />
                    )}
                    {(row.original.aktif == "Tidak") && (
                        <CircleX color="#f00" />
                    )}                    
                </div>
            )
        }
    },
    {
        id: "aksi",
        cell: ({ row }) => <ActionCell user={row.original} />
    }
    
]