"use client"

import { AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { AlertDialogCancel } from "@radix-ui/react-alert-dialog"
import { useAction } from "next-safe-action/hooks"
import { deleteWargaAction } from "@/lib/zakat/warga"
import { useEffect } from "react"
import { toast } from "sonner"

export function AlertDeleteWarga({
    wid,
    nama_keluarga,
    anggota
} : {
    wid: string
    nama_keluarga: string
    anggota: number
}) {
    const {execute, result} = useAction(deleteWargaAction)
    async function onDelete(id: string) {
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
                <AlertDialogTitle>Apakah Anda Yakin Ingin Menghapus Data Warga Ini?</AlertDialogTitle>
                <AlertDialogDescription>
                        Nama Keluarga : <b>{nama_keluarga}</b> dengan anggota {anggota} orang.
                </AlertDialogDescription>
                <AlertDialogDescription className="text-red-500">Jika Anda menekan tombol <b>Hapus</b>, maka data tersebut akan terhapus secara <b>permanen</b>!</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Keluar</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(wid)}>Hapus</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    )
}