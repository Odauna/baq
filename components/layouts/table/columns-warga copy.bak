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
import { deleteWarga, editWarga } from "@/lib/actions"
import { useParams, useRouter } from "next/navigation"
import { fetchWargaById } from "@/lib/data"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type DataWarga = {
    _id: string
    keluarga: string
    anggota: number
    mustahik: "Belum Tahu" | "Tidak" | "Ya"
}

const formSchema = z.object({
    keluarga: z.string().min(1).max(255),
    anggota: z.coerce.number().int().gte(0).lte(100),
    mustahik: z.enum(['Belum Tahu','Tidak','Ya'])
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
            <Checkbox checked={row.getIsSelected()} onCheckedChange={(value) => row.toggleSelected(!!value)} aria-label="Select row" />
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
            // const id = row.original._id
            const {rt} = useParams<{rt: string}>()
            const [dataKeluarga, setDataKeluarga] = useState('')
            const [dataAK, setDataAK] = useState('')
            const [dataStatus, setDataStatus] = useState('')
            async function onEdit(id: string) {
                const fw = await fetchWargaById(id)
                console.log(fw)
                setDataKeluarga(fw.keluarga)
                setDataAK(fw.anggota)
                setDataStatus(fw.mustahik)
                setIsDialogEditOpen(true)
            }
            const editWargaID = editWarga.bind(null, rt, warga._id)
            const form = useForm<z.infer<typeof formSchema>>({
                resolver: zodResolver(formSchema),
                defaultValues: {
                    keluarga: '',
                    anggota: 0
                }
            })
        
            function onSubmit(values: z.infer<typeof formSchema>) {
                console.log(values)
            }

            function onDelete(id: string) {
                deleteWarga(id, rt)
            }

            // const handleEdit = () => {
            //     router.push(`/zakat/warga/${rt}/edit/${warga._id}`)
            // }

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
                        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(warga._id)}>
                            Copy warga ID {warga._id}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => onEdit(warga._id)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setIsAlertDelOpen(true)} >Hapus</DropdownMenuItem>
                    </DropdownMenuContent>
                    <Dialog open={isDialogEditOpen} onOpenChange={setIsDialogEditOpen}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit data warga RT</DialogTitle>
                                <DialogDescription>Silahkan masukkan nama keluarga dan jumlah anggota kk!</DialogDescription>
                            </DialogHeader>
                            <Form {...form}>
                                <form action={editWargaID} className="space-y-8">
                                    <FormField control={form.control} name="keluarga" render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Nama Keluarga</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field} value={dataKeluarga} onChange={e => setDataKeluarga(e.target.value)} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="anggota" render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Jumlah Anggota KK</FormLabel>
                                            <FormControl>
                                                <Input type="number" {...field} value={dataAK} onChange={e => setDataAK(e.target.value)} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <FormField control={form.control} name="mustahik" render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Status Mustahik</FormLabel>
                                            <Select {...field} onValueChange={field.onChange} defaultValue={dataStatus} >
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Silahkan pilih status mustahik warga" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Belum Tahu">Belum Tahu</SelectItem>
                                                    <SelectItem value="Tidak">Tidak</SelectItem>
                                                    <SelectItem value="Ya">Ya</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <Button type="submit">Simpan</Button>
                                    <Button type="button" variant="destructive" onClick={() => form.reset()}>Reset</Button>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                    <AlertDialog open={isAlertDelOpen} onOpenChange={setIsAlertDelOpen}>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Apakah Anda yakin ingin menghapus data warga ini?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    <b>Nama Keluarga</b> : {warga.keluarga}
                                </AlertDialogDescription>
                                <AlertDialogDescription className="text-red-500">Jika Anda menekan tombol <b>Hapus wae</b>, maka data tersebut akan terhapus secara <b>permanen</b>!</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Ora sido</AlertDialogCancel>
                                <AlertDialogAction onClick={() => onDelete(warga._id)}>Hapus wae</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </DropdownMenu>
            )
        }
    }
    
]