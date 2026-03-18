"use client"

import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Separator } from "@/components/ui/separator"
import { deleteDistribusi } from "@/lib/zakat/distribusi"
import { useAction } from "next-safe-action/hooks"
import { useEffect } from "react"
import { toast } from "sonner"

export function AlertDeleteDistribusi({
    d_id,
    d_nama,
    d_alamat,
    d_keterangan,
    d_jenis,
    d_nominal,
    d_catatan
} : {
    d_id: string
    d_nama: string
    d_alamat: string
    d_keterangan: string
    d_jenis: "Fitrah (Beras)" | "Fitrah (Uang)" | "Mal" | "Infak"
    d_nominal: number
    d_catatan: string
}) {
    const {execute, result} = useAction(deleteDistribusi)
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
                <AlertDialogTitle>Apakah Anda yakin ingin menghapus data distribusi ini?</AlertDialogTitle>
                <div className="flex grid-cols-3 gap-1">
                    <div className="w-full">
                        <p className="font-semibold">Atas Nama</p>
                        <p>{d_nama}</p>
                    </div>
                    <Separator orientation="vertical" />
                    <div className="w-full">
                        <p className="font-semibold">Alamat</p>
                        <p>{d_alamat}</p>
                    </div>
                </div>
                <Separator />
                <div className="w-full">
                    <p className="font-semibold">Keterangan</p>
                    <p>{d_keterangan}</p>
                </div>
                <Separator />
                <div className="flex grid-cols-3 gap-1">
                    <div className="w-full">
                        <p className="font-semibold">Jenis</p>
                        <p>{d_jenis}</p>
                    </div>
                    <Separator orientation="vertical" />
                    <div className="w-full">
                        <p className="font-semibold">Nominal</p>
                        <p>{d_nominal}</p>
                    </div>
                </div>
                <Separator />
                <div className="w-full">
                    <p className="font-semibold">Catatan</p>
                    <p>{d_catatan}</p>
                </div>
                <Separator />
                <AlertDialogDescription className="text-red-500">Jika Anda menekan tombol <b>Hapus</b>, maka data tersebut akan terhapus secara <b>permanen</b>!</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDel(d_id)}>Hapus</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    )
}