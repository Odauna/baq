"use client"

import React, { useEffect } from "react"
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { DialogAddWarga } from "../zakat/warga/add"
import { useParams, usePathname } from "next/navigation"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer"
import { useForm } from "react-hook-form"
import { pengumpulanSchema } from "@/schemas/Pengumpulan"
import type { PengumpulanSchema } from "@/schemas/Pengumpulan"
import { zodResolver } from "@hookform/resolvers/zod"
import { fetchZIbyId } from "@/lib/data"
import { useAction } from "next-safe-action/hooks"
import { savePZInAction } from "@/lib/zakat/pengumpulan"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Eraser, Minus, Plus, RefreshCw } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { InputAdornment } from "@/components/ui/input-adornment"
import { DialogAddDistribusi } from "../zakat/distribusi/add"

interface DataTableProps<TData, TValue, TCat> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    jenis: TCat
}

interface GlobalFilter {
    globalFilter: any
}

export function DataTable<TData, TValue, TCat>({ columns, data, jenis } : DataTableProps<TData, TValue, TCat>) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    // const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [globalFilter, setGlobalFilter] = React.useState<any>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})
    const {rt, area} = useParams<{rt:string, area:string}>()
    const pathname = usePathname()

    const table = useReactTable({
        columns,
        data,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        // onColumnFiltersChange: setColumnFilters,
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        getRowId: row => row._id,
        state: {
            sorting,
            // columnFilters,
            globalFilter,
            columnVisibility,
            rowSelection
        },
    })

    // Operasi Pengumpulan Zakat & Infak
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
    const [idw, setIDW] = React.useState('')
    const [dt, setDT] = React.useState(0)
    const [dfb, setDFB] = React.useState(0)
    const [dfu, setDFU] = React.useState(0)
    const [dm, setDM] = React.useState(0)
    const [di, setDI] = React.useState(0)
    const [dk, setDK] = React.useState('')
    async function onEdit(id: string) {
        console.log(id)
        setIDW(id)
        const dw = await fetchZIbyId(id)
        setDT(dw.tanggungan)
        if (!isNaN(dw.fitrah_beras)) {
            setDFB(dw.fitrah_beras)
        }
        if (!isNaN(dw.fitrah_uang)) {
            setDFU(dw.fitrah_uang)
        }
        if (!isNaN(dw.mal)) {
            setDM(dw.mal)
        }
        if (!isNaN(dw.infak)) {
            setDI(dw.infak)
        }
        if (dw.keterangan != null) {
            setDK(dw.keterangan)
        }
        setIsDrawerOpen(true)
    }
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
    // const {executeAsync, result} = useAction(savePZInAction)
    async function onSubmit() {
        console.log('111')
        await console.log(form.getValues())
    }

    const beras = 2.5
    const uang = 37500

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
        <div className="flex items-center py-4">
            <Input placeholder="Search..." 
                value={globalFilter ?? ""} 
                onChange={(event) => table.setGlobalFilter(String(event.target.value))} 
                className="max-w-sm" 
            />
            { jenis === "warga" || jenis === "pengumpulan" ? (
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                    Tambah Warga
                    </Button>
                </DialogTrigger>
                <DialogAddWarga rt={rt} />
            </Dialog>
            ) : null }
            { jenis === "distribusi" && area !== "dusun" ? (
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                    Tambah
                    </Button>
                </DialogTrigger>
                <DialogAddDistribusi area={area} />
            </Dialog>
            ) : null }
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                        Columns
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    {table.getAllColumns().filter((column) => column.getCanHide()).map((column) => {
                        return (
                            <DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                                {column.id}
                            </DropdownMenuCheckboxItem>
                        )
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                )
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    { jenis === "pengumpulan" ? (
                        table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"} onClick={() => onEdit(row.id)}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-12 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )
                    ) : (
                        table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-12 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )
                    )}
                </TableBody>
            </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
                {table.getFilteredSelectedRowModel().rows.length} of {" "}
                {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
            <div>
                {table.getFilteredSelectedRowModel().flatRows.map((row) => JSON.stringify(row.id))}
            </div>
            <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                Previous
            </Button>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                Next
            </Button>
        </div>
        { jenis === "pengumpulan" && (
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerContent>
                    {/* <div className="mx-auto w-full"> */}
                        <DrawerHeader>
                            <DrawerTitle>Zakat & Infak Warga</DrawerTitle>
                            <DrawerDescription>Tolong pastikan bahwa data yang Anda masukkan benar dan sesuai.</DrawerDescription>
                        </DrawerHeader>
                        <Form {...form}>
                            <form onSubmit={(e) => {
                                e.preventDefault()
                                form.handleSubmit(onSubmit)()
                            }} className="space-y-3">
                                <div className="p-4 pb-0">
                                    <div className="md:flex items-center justify-center space-x-2">
                                        <div className="flex items-end px-2">
                                            <Button variant="outline" size="icon" className="shrink-0 rounded-full" onClick={() => onTClick(-1)} disabled={dt == 0}><Minus /></Button>
                                            <FormField control={form.control} name="tanggungan" render={({field}) => (
                                                <FormItem className="px-2">
                                                    <FormLabel>Tanggungan</FormLabel>
                                                    <FormControl>
                                                        <Input type="number" {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                            <Button variant="outline" size="icon" className="shrink-0 rounded-full" onClick={() => onTClick(+1)}><Plus /></Button>
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="flex items-end pb-4">
                                                <Button variant="ghost" size="icon" className="shrink-0 rounded-full" onClick={() => onRefFB()}><RefreshCw /></Button>
                                                <FormField control={form.control} name="fitrah_beras" render={({field}) => (
                                                    <FormItem className="px-2">
                                                        <FormLabel>Fitrah (Beras)</FormLabel>
                                                        <FormControl>
                                                            <InputAdornment endAdornment="Kg" type="number" {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                                <Button variant="destructive" size="icon" className="shrink-0 rounded-full"><Eraser /></Button>
                                            </div>
                                            <div className="flex items-end">
                                                <Button variant="ghost" size="icon" className="shrink-0 rounded-full" onClick={() => onRefFU()}><RefreshCw /></Button>
                                                <FormField control={form.control} name="fitrah_uang" render={({field}) => (
                                                    <FormItem className="px-2">
                                                        <FormLabel>Fitrah (Uang)</FormLabel>
                                                        <FormControl>
                                                            {/* <div className="relative flex items-center rounded-md border pl-2">
                                                            <span className="pr-2 text-muted-foreground">Rp</span> */}
                                                            <InputAdornment startAdornment="Rp" type="number" {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                                                            {/* </div> */}
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                                <Button variant="destructive" size="icon" className="shrink-0 rounded-full"><Eraser /></Button>
                                            </div>
                                        </div>
                                        <div className="grid gap-2">
                                            <div className="flex items-end pb-4">
                                                <FormField control={form.control} name="mal" render={({field}) => (
                                                    <FormItem className="pr-2">
                                                        <FormLabel>Mal</FormLabel>
                                                        <FormControl>
                                                            <InputAdornment startAdornment="Rp" type="number" {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                                <Button variant="destructive" size="icon" className="shrink-0 rounded-full"><Eraser /></Button>
                                            </div>
                                            <div className="flex items-end">
                                                <FormField control={form.control} name="infak" render={({field}) => (
                                                    <FormItem className="pr-2">
                                                        <FormLabel>Infak</FormLabel>
                                                        <FormControl>
                                                            <InputAdornment startAdornment="Rp" type="number" {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )} />
                                                <Button variant="destructive" size="icon" className="shrink-0 rounded-full"><Eraser /></Button>
                                            </div>
                                        </div>
                                        <div className="flex items-end px-2 py-1">
                                            <FormField control={form.control} name="keterangan" render={({field}) => (
                                                <FormItem className="pr-2">
                                                    <FormLabel>Keterangan</FormLabel>
                                                    <FormControl>
                                                        <Textarea rows={5} cols={25} {...field} value={field.value} onChange={e => field.onChange(e.target.value)} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                            <Button variant="destructive" className="w-9 h-30"><Eraser /></Button>
                                        </div>
                                    </div>
                                </div>
                                <DrawerFooter>
                                    <Button>Simpan</Button>
                                    <DrawerClose asChild>
                                        <Button variant="outline">Batal</Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </form>
                        </Form>
                    {/* </div> */}
                </DrawerContent>
            </Drawer>
        )}
        </>
    )
}