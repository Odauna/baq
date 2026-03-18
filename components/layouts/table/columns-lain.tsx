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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { fetchSWDbyId } from "@/lib/data"
import { deleteSalurAction, saveUpSalurAction } from "@/lib/zakat/distribusi"
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"
import { AlertDeleteLain } from "../zakat/lain/del"
import { DialogEditLain } from "../zakat/lain/edit"

export type Lain = {
    _id: string
    keterangan: string
    // jenis: string
    nominal: number
}

const formSchema = z.object({
    // id: z.string(),
    keterangan: z.string(),
    jenis: z.enum(['Konversi','Tambahan']),
    nominal: z.coerce.number().gte(0, {message: 'Angka harus lebih besar dari atau sama dengan 0.'}),
})


export const columnsLain: ColumnDef<Lain>[] = [
    {
        accessorKey: "keterangan",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Keterangan
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        accessorKey: "nominal",
        header: "Nominal"
    },
    // {
    //     id: "actions",
    //     cell: ({ row }) => {
    //         const lain = row.original
    //         const [isDialogEditOpen, setIsDialogEditOpen] = useState(false)
    //         const [isAlertDelOpen, setIsAlertDelOpen] = useState(false)

    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button variant="ghost" className="h-8 w-8 p-0">
    //                         <span className="sr-only">Details</span>
    //                         <MoreHorizontal className="h-4 w-4" />
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align="end">
    //                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                     <DropdownMenuSeparator />
    //                     <DropdownMenuItem onClick={() => setIsDialogEditOpen(true)}>Edit</DropdownMenuItem>
    //                     <DropdownMenuItem onClick={() => setIsAlertDelOpen(true)} >Hapus</DropdownMenuItem>
    //                 </DropdownMenuContent>
    //                 <Dialog open={isDialogEditOpen} onOpenChange={setIsDialogEditOpen}>
    //                     <DialogEditLain lid={lain._id} keterangan={lain.keterangan} nominal={lain.nominal} />
    //                 </Dialog>
    //                 <AlertDialog open={isAlertDelOpen} onOpenChange={setIsAlertDelOpen}>
    //                     <DeleteLain lid={lain._id} keterangan={lain.keterangan} nominal={lain.nominal} />
    //                 </AlertDialog>
    //             </DropdownMenu>
    //         )
    //     }
    // }
    
]