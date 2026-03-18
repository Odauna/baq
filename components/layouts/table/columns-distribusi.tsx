"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertDeleteDistribusi } from "../zakat/distribusi/del"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import React, {useEffect, useState} from "react"
import { DialogEditDistribusi } from "../zakat/distribusi/edit"
import { Drawer } from "@/components/ui/drawer"
import { StatusDistribusi } from "../zakat/drawer/status-distribusi"


export type Distribusi = {
    _id: string
    atasnama: {
        nama: string
        ak: number
    }
    alamat: string
    keterangan: string
    jenis: "Fitrah (Beras)" | "Fitrah (Uang)" | "Mal" | "Infak"
    nominal: number
    catatan: string
    diterima: "Belum" | "Sudah"
    waktu: string
}

export const columnsDistribusi: ColumnDef<Distribusi>[] = [
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
        accessorKey: "atasnama.nama",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Atas Nama
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: "alamat",
        header: "Alamat"
    },
    {
        accessorKey: "keterangan",
        header: "Keterangan"
    },
    {
        accessorKey: "jenis",
        header: "Jenis"
    },
    {
        accessorKey: "nominal",
        header: "Nominal"
    },
    {
        accessorKey: "catatan",
        header: "Catatan"
    },
    {
        accessorKey: "diterima",
        header: "Diterima"
    },
    {
        accessorKey: "waktu",
        header: "Waktu"
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const distribusi = row.original
            const [isDialogEditOpen, setIsDialogEditOpen] = useState(false)
            const [isAlertDelOpen, setIsAlertDelOpen] = useState(false)
            const [isDrawerStateOpen, setIsDrawerStateOpen] = useState(false)
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
                        <DropdownMenuItem onClick={() => setIsDrawerStateOpen(true)}>Status Diterima</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setIsAlertDelOpen(true)} >Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                    <Dialog open={isDialogEditOpen} onOpenChange={setIsDialogEditOpen}>
                        <DialogEditDistribusi d_id={distribusi._id} d_nama={distribusi.atasnama.nama} d_alamat={distribusi.alamat} d_keterangan={distribusi.keterangan} d_jenis={distribusi.jenis} d_nominal={distribusi.nominal} d_catatan={distribusi.catatan} />
                    </Dialog>
                    <Drawer open={isDrawerStateOpen} onOpenChange={setIsDrawerStateOpen}>
                        <StatusDistribusi d_id={distribusi._id} d_status={distribusi.diterima} />
                    </Drawer>
                    <AlertDialog open={isAlertDelOpen} onOpenChange={setIsAlertDelOpen}>
                        <AlertDeleteDistribusi d_id={distribusi._id} d_nama={distribusi.atasnama.nama} d_alamat={distribusi.alamat} d_keterangan={distribusi.keterangan} d_jenis={distribusi.jenis} d_nominal={distribusi.nominal} d_catatan={distribusi.catatan} />
                    </AlertDialog>
                </DropdownMenu>
            )
        }
    }
    
]