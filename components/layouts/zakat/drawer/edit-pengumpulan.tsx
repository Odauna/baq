"use client"

import React, { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { fetchRekomendasiFitrah, fetchWargaById } from "@/lib/data"
import { type PengumpulanSchema, pengumpulanSchema } from "@/schemas/Pengumpulan"
import { toast } from "sonner"
import { savePZInAction } from "@/lib/zakat/pengumpulan"
import { useAction } from "next-safe-action/hooks"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { InputAdornment } from "@/components/ui/input-adornment"
import { Textarea } from "@/components/ui/textarea"
import { Eraser, Loader, LoaderCircle, Minus, Plus, RefreshCw } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function DrawerEditPengumpulan({
    id,
    proses
} : {
    id: string,
    proses: boolean
}) {
    const [isLoading, setIsLoading] = useState(false)
    const [isMemuat, setIsMemuat] = useState(false)
    const [idw, setIDW] = useState(id)
    const [stateproses] = useState(proses)
    // const idw = id
    const [nama, setNama] = useState('')
    const [dt, setDT] = useState(0)
    const [dfb, setDFB] = useState(0)
    const [dfu, setDFU] = useState(0)
    const [dm, setDM] = useState(0)
    const [di, setDI] = useState(0)
    const [dk, setDK] = useState('')
    const [beras, setBeras] = useState(0)
    const [uang, setUang] = useState(0)
    async function fetchData() {
        console.log(`id warga: ${idw}`)
        try {
            setIsLoading(true)
            const dw = await fetchWargaById(idw)
            const drf = await fetchRekomendasiFitrah()
            setNama(dw.keluarga)
            if (dw.pengumpulan.tanggungan !== null || dw.pengumpulan.tanggungan !== undefined) {
                setDT(dw.pengumpulan.tanggungan)
            } else {
                setDT(dw.anggota)
            }
            if (dw.pengumpulan !== undefined) {
                if (!isNaN(dw.pengumpulan.fitrah_beras)) {
                    setDFB(dw.pengumpulan.fitrah_beras)
                }
                if (!isNaN(dw.pengumpulan.fitrah_uang)) {
                    setDFU(dw.pengumpulan.fitrah_uang)
                }
                if (!isNaN(dw.pengumpulan.mal)) {
                    setDM(dw.pengumpulan.mal)
                }
                if (!isNaN(dw.pengumpulan.infak)) {
                    setDI(dw.pengumpulan.infak)
                }
                if (dw.pengumpulan.keterangan != null) {
                    setDK(dw.pengumpulan.keterangan)
                }
            }
            if (drf) {
                drf.map((data: { keterangan: string; nominal: React.SetStateAction<number> }) => {
                    if (data.keterangan === "Beras") {
                        setBeras(data.nominal)
                    }
                    if (data.keterangan === "Uang") {
                        setUang(data.nominal)
                    }
                })
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        fetchData()
    },[stateproses])
    const values = {
        tanggungan: dt,
        fitrah_beras: dfb,
        fitrah_uang: dfu,
        mal: dm,
        infak: di,
        keterangan: dk
    }
    const form = useForm<PengumpulanSchema>({
        mode: 'all',
        resolver: zodResolver(pengumpulanSchema),
        defaultValues: {
            tanggungan: dt,
            fitrah_beras: dfb,
            fitrah_uang: dfu,
            mal: dm,
            infak: di,
            keterangan: dk
        },
        values
    })

    const boundSavePZInAction = savePZInAction.bind(null, id)
    const {executeAsync, result} = useAction(boundSavePZInAction)
    async function onSubmit() {
        try {
            setIsMemuat(true)
            await executeAsync(form.getValues())
        } catch (error) {
            console.error(error)
        } finally {
            setIsMemuat(false)
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

    // operasi Zakat Fitrah
    function onTClick(adjustment: number) {
        setDT(dt + adjustment)
    }
    function onRefFB() {
        setDFB(dt * beras)
        setDFU(0)
    }
    function onRefFU() {
        setDFU(dt * uang)
        setDFB(0)
    }

    return (
        <>
        {isLoading ? (
            <Dialog defaultOpen={true}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex">
                            <Loader className="animate-spin" /> 
                            <p className="pl-2">
                                Mohon tunggu sebentar, sedang memuat...
                            </p>
                        </DialogTitle>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
            // <Loader className="animate-spin" />
        ) : (
        <DrawerContent>
            <div className="mx-auto w-full overflow-auto">
                <DrawerHeader>
                    <DrawerTitle>Formulir Zakat & Infak Warga</DrawerTitle>
                    <DrawerDescription>Tolong pastikan bahwa data yang Anda masukkan benar & tepat!</DrawerDescription>
                </DrawerHeader>
                <Separator />
                <Form {...form}>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit(onSubmit)()
                    }} className="space-y-3">
                        <div className="p-4">
                            <div className="md:flex items-center justify-center space-x-2">
                                <div className="grid grid-rows-2 gap-4 pb-4 justify-center">
                                    <div className="text-5xl text-center font-bold tracking-tighter">
                                        {nama}
                                    </div>
                                    <div className="flex items-end px-2 w-full">
                                        {/* <Button type="button" variant="outline" size="icon" className="shrink-0 rounded-full" onClick={() => onTClick(-1)} disabled={dt == 0}><Minus /></Button> */}
                                        <FormField control={form.control} name="tanggungan" render={({field}) => (
                                            <FormItem className="px-2">
                                                <FormLabel className="font-semibold pl-12" htmlFor="tanggungan">Tanggungan</FormLabel>
                                                <FormControl>
                                                    <div className="flex px-2 gap-1 w-full">
                                                        <Button type="button" variant="outline" size="icon" className="shrink-0 rounded-full" onClick={() => field.onChange(field.value - 1)} disabled={dt == 0}><Minus /></Button>
                                                            <Input id="tanggungan" type="number" {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                                                        <Button type="button" variant="outline" size="icon" className="shrink-0 rounded-full" onClick={() => field.onChange(field.value + 1)}><Plus /></Button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        {/* <Button type="button" variant="outline" size="icon" className="shrink-0 rounded-full" onClick={() => onTClick(+1)}><Plus /></Button> */}
                                    </div>
                                </div>
                                <div className="grid grid-rows-2 gap-4 pb-4 justify-center">
                                    <div className="flex items-end">
                                        {/* <Button variant="ghost" size="icon" className="shrink-0 rounded-full" onClick={() => onRefFB()}><RefreshCw /></Button> */}
                                        <FormField control={form.control} name="fitrah_beras" render={({field}) => (
                                            <FormItem className="px-2">
                                                <FormLabel className="font-semibold" htmlFor="fitrahberas">Fitrah (Beras)</FormLabel>
                                                <FormControl>
                                                    <InputAdornment id="fitrahberas" endAdornment="Kg" type="number" placeholder="0" {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <Button type="button" variant="destructive" size="icon" className="shrink-0 rounded-full" onClick={() => form.resetField("fitrah_beras")}><RefreshCw /></Button>
                                    </div>
                                    <div className="flex items-end">
                                        {/* <Button variant="ghost" size="icon" className="shrink-0 rounded-full" onClick={() => onRefFU()}><RefreshCw /></Button> */}
                                        <FormField control={form.control} name="fitrah_uang" render={({field}) => (
                                            <FormItem className="px-2">
                                                <FormLabel className="font-semibold" htmlFor="fitrahuang">Fitrah (Uang)</FormLabel>
                                                <FormControl>
                                                    {/* <div className="relative flex items-center rounded-md border pl-2">
                                                    <span className="pr-2 text-muted-foreground">Rp</span> */}
                                                    <InputAdornment id="fitrahuang" startAdornment="Rp" type="number" placeholder="0" {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                                                    {/* </div> */}
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <Button type="button" variant="destructive" size="icon" className="shrink-0 rounded-full" onClick={() => form.resetField("fitrah_uang")}><RefreshCw /></Button>
                                    </div>
                                </div>
                                <div className="grid grid-rows-2 gap-4 pb-4 pl-4 pr-4 justify-center">
                                    <div className="flex items-end">
                                        <FormField control={form.control} name="mal" render={({field}) => (
                                            <FormItem className="pr-2">
                                                <FormLabel className="font-semibold" htmlFor="mal">Mal</FormLabel>
                                                <FormControl>
                                                    <InputAdornment id="mal" startAdornment="Rp" type="number" {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <Button type="button" variant="destructive" size="icon" className="shrink-0 rounded-full" onClick={() => form.resetField("mal")}><RefreshCw /></Button>
                                    </div>
                                    <div className="flex items-end">
                                        <FormField control={form.control} name="infak" render={({field}) => (
                                            <FormItem className="pr-2">
                                                <FormLabel className="font-semibold" htmlFor="infak">Infak</FormLabel>
                                                <FormControl>
                                                    <InputAdornment id="infak" startAdornment="Rp" type="number" {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )} />
                                        <Button type="button" variant="destructive" size="icon" className="shrink-0 rounded-full" onClick={() => form.resetField("infak")}><RefreshCw /></Button>
                                    </div>
                                </div>
                                <div className="flex px-2 w-100 h-45 pb-8">
                                    <FormField control={form.control} name="keterangan" render={({field}) => (
                                        <FormItem className="pr-2 w-full">
                                            <FormLabel className="font-semibold" htmlFor="keterangan">Keterangan</FormLabel>
                                            <FormControl>
                                                <Textarea id="keterangan" rows={15} cols={25} {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )} />
                                    <div className="flex items-end">
                                        <Button type="button" variant="destructive" className="w-9 h-24" onClick={() => form.resetField("keterangan")}><RefreshCw /></Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Separator />
                        <DrawerFooter>
                            <Button type="submit" disabled={isMemuat}>Simpan {isMemuat && <LoaderCircle className="animate-spin" />}</Button>
                            <DrawerClose asChild>
                                <Button variant="outline" disabled={isMemuat}>Tutup</Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </form>
                </Form>
            </div>
        </DrawerContent>
        )}
        </>
    )
}