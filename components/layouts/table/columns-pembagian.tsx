"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog } from "@/components/ui/dialog"
import { AlertDialog } from "@/components/ui/alert-dialog"
import React, {useState} from "react"
import { DialogEditPembagianBeras } from "../zakat/pembagian/edit"
import { AlertDeletePembagianBeras } from "../zakat/pembagian/del"

export type PembagianBeras = {
    _id: string
    anggota: number
    kondisi: "Sama dengan" | "Lebih dari sama dengan" | "Kurang dari sama dengan"
    nominal: number
}

export const columnsPembagianBeras: ColumnDef<PembagianBeras>[] = [
    {
        accessorKey: "kondisi",
        header: "Kondisi"
    },
    {
        accessorKey: "anggota",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Jumlah Anggota Keluarga
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: "nominal",
        header: "Nominal"
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const pb = row.original
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
                        <DropdownMenuItem onClick={() => setIsDialogEditOpen(true)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setIsAlertDelOpen(true)} >Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                    <Dialog open={isDialogEditOpen} onOpenChange={setIsDialogEditOpen}>
                        <DialogEditPembagianBeras bid={pb._id} banggota={pb.anggota} bkondisi={pb.kondisi} bnominal={pb.nominal} />
                    </Dialog>
                    <AlertDialog open={isAlertDelOpen} onOpenChange={setIsAlertDelOpen}>
                        <AlertDeletePembagianBeras bid={pb._id} banggota={pb.anggota} bkondisi={pb.kondisi} bnominal={pb.nominal} />
                    </AlertDialog>
                </DropdownMenu>
            )
        }
    }
    
]