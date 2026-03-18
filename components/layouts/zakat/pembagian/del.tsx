"use client"

import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Separator } from "@/components/ui/separator"
import { deleteLainAction } from "@/lib/zakat/lain"
import { deletePembagianBeras } from "@/lib/zakat/pembagian"
import { useAction } from "next-safe-action/hooks"
import { useEffect } from "react"
import { toast } from "sonner"

export function AlertDeletePembagianBeras({
    bid,
    banggota,
    bkondisi,
    bnominal
} : {
    bid: string
    banggota: number
    bkondisi: string
    bnominal: number
}) {
    const {execute, result} = useAction(deletePembagianBeras)
    async function onDel(id: string) {
        await execute({id: id})
    }
    useEffect(() => {
        if (result.data?.type == "success") {
            toast.success(result.data.message)
        }
        if (result.data?.type == "error") {
            toast.error(result.data.message)
        }
    }, [result.data])
    
    return (
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Apakah Anda yakin ingin menghapusnya?</AlertDialogTitle>
                <div className="px-4">
                    <div>
                        <p>Apabila jumlah anggota keluarga <b>{bkondisi}</b> {banggota}, maka menerima zakat fitrah beras <b>{bnominal}</b>kg. </p>
                    </div>
                </div>
                <Separator />
                <AlertDialogDescription className="text-red-500">Jika Anda menekan tombol <b>Hapus</b>, maka data tersebut akan terhapus secara <b>permanen</b>!</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Keluar</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDel(bid)}>Hapus</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>

    )
}