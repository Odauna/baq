"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog } from "@/components/ui/dialog"
import { AlertDialog } from "@/components/ui/alert-dialog"
import React, {useState} from "react"
import { DialogEditTimbang } from "../zakat/timbang/edit"
import { AlertDeleteTimbang } from "../zakat/timbang/del"

export type Timbang = {
    _id: string
    waktu: string
    diperbarui: string
    nominal: number
}

export const columnsTimbang: ColumnDef<Timbang>[] = [
    {
        accessorKey: "waktu",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Waktu Timbang
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: "diperbarui",
        header: "Diperbarui"
    },
    {
        accessorKey: "nominal",
        header: "Nominal"
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const t = row.original
            const [isDialogEditOpen, setIsDialogEditOpen] = useState(false)
            const [isAlertDelOpen, setIsAlertDelOpen] = useState(false)

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Details</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setIsDialogEditOpen(true)}>Ubah</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setIsAlertDelOpen(true)} >Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                    <Dialog open={isDialogEditOpen} onOpenChange={setIsDialogEditOpen}>
                        <DialogEditTimbang tid={t._id} twaktu={t.waktu} tnominal={t.nominal} />
                    </Dialog>
                    <AlertDialog open={isAlertDelOpen} onOpenChange={setIsAlertDelOpen}>
                        <AlertDeleteTimbang tid={t._id} twaktu={t.waktu} tnominal={t.nominal} />
                    </AlertDialog>
                </DropdownMenu>
            )
        }
    }
    
]