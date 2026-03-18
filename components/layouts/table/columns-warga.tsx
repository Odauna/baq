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
import { useAction } from "next-safe-action/hooks"
import { Input } from "@/components/ui/input"
import { deleteWarga, editWarga } from "@/lib/actions"
import { useParams, useRouter } from "next/navigation"
import { fetchWargaById } from "@/lib/data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { saveWargaAction } from "@/lib/warga"
import { toast } from "sonner"
import { AlertDeleteWarga } from "../zakat/warga/del"
import { DialogEditWarga } from "../zakat/warga/edit"

export type DataWarga = {
    _id: string
    keluarga: string
    rt: '01' | '02' | '03' | '04' | '05' | '06'
    anggota: number
    mustahik: "Tidak" | "Ya"
}

const formSchema = z.object({
    keluarga: z.string().min(1).max(255),
    anggota: z.coerce.number().int().gte(0).lte(100),
    mustahik: z.enum(['Tidak','Ya'])
})


export const columnsWarga: ColumnDef<DataWarga>[] = [
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
        accessorKey: "keluarga",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    a.n. Keluarga
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: "anggota",
        header: "Anggota KK"
    },
    {
        accessorKey: "mustahik",
        header: "Status Mustahik"
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const router = useRouter()
            const warga = row.original
            const [isDialogEditOpen, setIsDialogEditOpen] = useState(false)
            const [isAlertDelOpen, setIsAlertDelOpen] = useState(false)
            

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-6 w-8 p-0">
                            <span className="sr-only">Details</span>
                            <MoreHorizontal className="h-8 w-8" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        {/* <DropdownMenuItem onClick={() => navigator.clipboard.writeText(warga._id)}>
                            Copy warga ID {warga._id}
                        </DropdownMenuItem> */}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setIsDialogEditOpen(true)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setIsAlertDelOpen(true)} >Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                    <Dialog open={isDialogEditOpen} onOpenChange={setIsDialogEditOpen}>
                        <DialogEditWarga wid={warga._id} warga_rt={warga.rt} nama_keluarga={warga.keluarga} anggota_keluarga={warga.anggota} status_mustahik={warga.mustahik} />
                    </Dialog>
                    <AlertDialog open={isAlertDelOpen} onOpenChange={setIsAlertDelOpen}>
                        <AlertDeleteWarga wid={warga._id} nama_keluarga={warga.keluarga} anggota={warga.anggota} />
                    </AlertDialog>
                </DropdownMenu>
            )
        }
    }
    
]