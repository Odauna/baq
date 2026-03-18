"use client"

import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { deleteUserAction } from "@/lib/user"
import { useAction } from "next-safe-action/hooks"
import { useEffect } from "react"
import { toast } from "sonner"

export function DeleteUser({
    uid,
    uname
} : {
    uid: string
    uname: string
}) {
    const {execute, result} = useAction(deleteUserAction)
    async function onSubmit(id: string) {
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
                <AlertDialogTitle>Apakah Anda yakin ingin menghapus data user ini?</AlertDialogTitle>
                <AlertDialogDescription>
                    <b>Nama</b> : {uname}
                </AlertDialogDescription>
                <AlertDialogDescription className="text-red-500">Jika Anda menekan tombol <b>Hapus wae</b>, maka data tersebut akan terhapus secara <b>permanen</b>!</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Ora sido</AlertDialogCancel>
                <AlertDialogAction onClick={() => onSubmit(uid)}>Hapus wae</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    )
}