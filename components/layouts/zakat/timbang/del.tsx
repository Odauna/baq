"use client"

import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { Separator } from "@/components/ui/separator"
import { deleteNominalTimbangan } from "@/lib/zakat/pengumpulan"
import { useAction } from "next-safe-action/hooks"
import { useEffect } from "react"
import { toast } from "sonner"

export function AlertDeleteTimbang({
    tid,
    twaktu,
    tnominal
} : {
    tid: string
    twaktu: string
    tnominal: number
}) {
    const {execute, result} = useAction(deleteNominalTimbangan)
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
                <div className="grid-rows-3">
                    <div>
                        <p className="font-semibold">Waktu Timbang</p>
                        <p>{twaktu}</p>
                    </div>
                    <Separator className="my-2" />
                    <div>
                        <p className="font-semibold">Nominal</p>
                        <p>{tnominal}</p>
                    </div>
                </div>
                <Separator />
                <AlertDialogDescription className="text-red-500">Jika Anda menekan tombol <b>Hapus</b>, maka data tersebut akan terhapus secara <b>permanen</b>!</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Batal</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDel(tid)}>Hapus</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>

    )
}