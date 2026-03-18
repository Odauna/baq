"use client"

import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { deleteUserAction } from "@/lib/zakat/user"
import { LoaderCircle } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export function UserDelete({
    u_id,
    u_name
} : {
    u_id: string
    u_name: string
}) {
    const [isProceed, setIsProceed] = useState(false)
    const {execute, result} = useAction(deleteUserAction)
    async function onSubmit(id: string) {
        try {
            setIsProceed(true)
            await execute({id: id})
        } catch (error) {
            console.error(error)
        } finally {
            setIsProceed(false)
        }
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
                <AlertDialogTitle>Hapus User</AlertDialogTitle>
                <AlertDialogDescription>Apakah Anda yakin ingin menghapus user {u_name}?</AlertDialogDescription>
                <AlertDialogDescription className="text-red-500">Jika Anda menekan tombol "Hapus", maka user tersebut akan terhapus secara permanen!</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel>Tutup</AlertDialogCancel>
                <AlertDialogAction onClick={() => onSubmit(u_id)} disabled={isProceed}>Hapus  {isProceed && <LoaderCircle className="animate-spin" />}</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    )
}