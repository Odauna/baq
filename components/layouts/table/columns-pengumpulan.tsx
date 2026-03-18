"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import React, {useState} from "react"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"

export type Pengumpulan = {
    id: string
    keluarga: string
    anggota: number
    pengumpulan: {
        tanggungan: number
        fitrah_beras: number
        fitrah_uang: number
        mal: number
        infak: number
        keterangan: string
        waktu: string
    }
}

const formSchema = z.object({
    keluarga: z.string().min(1).max(255),
    anggota: z.coerce.number().int().gte(0).lte(100)
})

const i = 0

export const columnsPengumpulan: ColumnDef<Pengumpulan>[] = [
    // {
    //     id: "select",
    //     header: ({ table }) => (
    //         <Checkbox checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
    //             onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)} aria-label="Select all"
    //         />
    //     ),
    //     cell: ({ row }) => (
    //         <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" className="justify-self-center" />
    //     ),
    //     enableSorting: false,
    //     enableHiding: false
    // },
    // {
    //     header: 'No',
    //     id: 'no',
    //     cell: i + 1
    // },
    {
        accessorKey: "keluarga",
        header: ({ column }) => {
            return (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    a.n.
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        }
    },
    {
        id: "Anggota",
        accessorKey: "anggota",
        // header: "Tanggungan"
        header: "@"
    },
    {
        id: "Tanggungan",
        accessorKey: "pengumpulan.tanggungan",
        header: () => {
            return (
                <div className="text-center">Tanggungan</div>
            )
        },
        cell: ({row}) => {
            return (
                <p className="text-center font-bold">{row.original.pengumpulan.tanggungan}</p>
            )
        }
        // header: "@"
    },
    {
        id: "Fitrah (Beras)",
        accessorKey: "pengumpulan.fitrah_beras",
        header: "Fitrah (Beras)"
    },
    {
        id: "Fitrah (Uang)",
        accessorKey: "pengumpulan.fitrah_uang",
        header: "Fitrah (Uang)"
    },
    {
        id: "Mal",
        accessorKey: "pengumpulan.mal",
        header: "Mal"
    },
    {
        id: "Infak",
        accessorKey: "pengumpulan.infak",
        header: "Infak"
    },
    {
        id: "Keterangan",
        accessorKey: "pengumpulan.keterangan",
        header: "Keterangan"
    },
    {
        id: "Waktu",
        accessorKey: "pengumpulan.waktu",
        header: "Waktu"
    },
    // {
    //     id: "actions",
    //     cell: ({ row }) => {
    //         const warga = row.original
    //         const [isDialogEditOpen, setIsDialogEditOpen] = useState(false)
    //         const [isAlertDelOpen, setIsAlertDelOpen] = useState(false)
    //         const form = useForm<z.infer<typeof formSchema>>({
    //             resolver: zodResolver(formSchema),
    //             defaultValues: {
    //                 keluarga: "",
    //                 anggota: 0
    //             }
    //         })
        
    //         function onSubmit(values: z.infer<typeof formSchema>) {
    //             console.log(values)
    //         }

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
    //                     <DropdownMenuItem onClick={() => navigator.clipboard.writeText(warga.id)}>
    //                         Copy warga ID {warga.id}
    //                     </DropdownMenuItem>
    //                     <DropdownMenuSeparator />
    //                     <DropdownMenuItem onClick={() => setIsDialogEditOpen(true)}>Edit</DropdownMenuItem>
    //                     <DropdownMenuItem onClick={() => setIsAlertDelOpen(true)} >Hapus</DropdownMenuItem>
    //                 </DropdownMenuContent>
    //                 <Dialog open={isDialogEditOpen} onOpenChange={setIsDialogEditOpen}>
    //                     <DialogContent>
    //                         <DialogHeader>
    //                             <DialogTitle>Edit data warga RT</DialogTitle>
    //                             <DialogDescription>Silahkan masukkan nama keluarga dan jumlah anggota kk!</DialogDescription>
    //                         </DialogHeader>
    //                         <Form {...form}>
    //                             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
    //                                 <FormField control={form.control} name="keluarga" render={({field}) => (
    //                                     <FormItem>
    //                                         <FormLabel>Nama Keluarga</FormLabel>
    //                                         <FormControl>
    //                                             <Input type="text" {...field} />
    //                                         </FormControl>
    //                                         <FormMessage />
    //                                     </FormItem>
    //                                 )} />
    //                                 <FormField control={form.control} name="anggota" render={({field}) => (
    //                                     <FormItem>
    //                                         <FormLabel>Jumlah Anggota KK</FormLabel>
    //                                         <FormControl>
    //                                             <Input type="number" {...field} />
    //                                         </FormControl>
    //                                         <FormMessage />
    //                                     </FormItem>
    //                                 )} />
    //                                 <Button type="submit">Simpan</Button>
    //                             </form>
    //                         </Form>
    //                     </DialogContent>
    //                 </Dialog>
    //                 <AlertDialog open={isAlertDelOpen} onOpenChange={setIsAlertDelOpen}>
    //                     <AlertDialogContent>
    //                         <AlertDialogHeader>
    //                             <AlertDialogTitle>Apakah Anda yakin ingin menghapus data warga ini?</AlertDialogTitle>
    //                             <AlertDialogDescription>
    //                                 <b>Nama Keluarga</b> :
    //                             </AlertDialogDescription>
    //                             <AlertDialogDescription className="text-red-500">Jika Anda menekan tombol <b>Hapus wae</b>, maka data tersebut akan terhapus secara <b>permanen</b>!</AlertDialogDescription>
    //                         </AlertDialogHeader>
    //                         <AlertDialogFooter>
    //                             <AlertDialogCancel>Ora sido</AlertDialogCancel>
    //                             <AlertDialogAction>Hapus wae</AlertDialogAction>
    //                         </AlertDialogFooter>
    //                     </AlertDialogContent>
    //                 </AlertDialog>
    //             </DropdownMenu>
    //         )
    //     }
    // }
    
]