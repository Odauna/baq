"use client"

import { useRouter } from "next/router"
import React, { useState } from "react"
import { Dialog, DialogContent, DialogOverlay } from "../ui/dialog"
import { AlertConfirmation } from "./alert-confirmation"

export function Modal({
    children
} : {
    children: React.ReactNode
}) {
    const [showExitConfirmation, setShowExitConfirmation] = useState(false)
    const router = useRouter()

    const closeModal = () => {
        router.back()
    }

    const handleOpenChange = () => {
        const isWargaFormModified = localStorage.getItem("wargaFormModified")
        if (isWargaFormModified && JSON.parse(isWargaFormModified)) {
            setShowExitConfirmation(true)
        } else {
            router.back()
        }
    }

    return (
        <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange}>
            <DialogOverlay>
                <DialogContent className="overflow-y-hidden">
                    <AlertConfirmation
                        open={showExitConfirmation}
                        setOpen={setShowExitConfirmation}
                        confirmationAction={closeModal}
                        message="Anda belum menyimpan pengeditan Anda. Silahkan konfirmasi jika Anda ingin keluar tanpa menyimpan data yang Anda edit."
                    />
                    {children}
                </DialogContent>
            </DialogOverlay>
        </Dialog>
    )
}