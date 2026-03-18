"use client"

import React, { useEffect, useState } from "react"
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
import { fetchWargaById, fetchZIbyId } from "@/lib/data"
import { useAction } from "next-safe-action/hooks"
import { savePZInAction } from "@/lib/zakat/pengumpulan"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { ClipboardCheck, ClipboardX, Eraser, Minus, Plus, RefreshCw, ShieldCheck, ShieldX } from "lucide-react"
import { Textarea } from "@/components/ui/textarea"
import { InputAdornment } from "@/components/ui/input-adornment"
import { DialogAddDistribusi } from "../zakat/distribusi/add"
import { toast } from "sonner"
import { DialogAddUser } from "../zakat/user/form-add-user"
import { DrawerEditPengumpulan } from "../zakat/drawer/edit-pengumpulan"
import { StatusDistribusi } from "../zakat/drawer/status-distribusi"
import { AktifUser } from "../zakat/drawer/aktif-user"
import { useIsMobile } from "@/hooks/use-mobile"
import { DataZIAccordion } from "./mobile/data-zi-accordion"
import { DataSalurAccordion } from "./mobile/data-salur-accordion"
import { DialogAddLain } from "../zakat/lain/add"
import { DialogAddDistribusiInfak } from "../zakat/distribusi/infak-add"
import { Card } from "@/components/ui/card"
import { changeStatusWarga } from "@/lib/warga"

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

    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
    const [isProceed, setIsProceed] = React.useState(false)
    // Operasi Pengumpulan Zakat & Infak
    const [idwd, setIDWD] = React.useState('')
    async function onEdit(id: string) {
        // console.log(id)
        setIDWD(id)
        setIsProceed(true)
        setIsDrawerOpen(true)
    }
    function setCloseDrawer() {
        setIDWD("")
        setIsProceed(false)
        setIsDrawerOpen(false)
    }
    const [arrId, setArrId] = useState([])
    // let arrayid = {
    //     table.getFilteredSelectedRowModel().flatRows.map((row) => `{_id: ${JSON.stringify(row.id)}},`)
    // }
    const isMobile = useIsMobile()
    if (isMobile) {
        if (jenis === "pengumpulan") {
            return (
                <DataZIAccordion data={data} />
            )
        }
        if (jenis === "distribusi") {
            return (
                <DataSalurAccordion data={data} />
            )
        }
    } else {
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
                    {area === "pengeluaran-infak" ? (
                        <DialogAddDistribusiInfak />
                    ) : (
                        <DialogAddDistribusi area={area} />
                    )}
                </Dialog>
                ) : null}
                { jenis === "users" ? (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                        Tambah
                        </Button>
                    </DialogTrigger>
                    <DialogAddUser />
                </Dialog>
                ) : null }
                { jenis === "rekomendasi-fitrah" ? (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                        Tambah
                        </Button>
                    </DialogTrigger>
                    <DialogAddLain area="Rekomendasi" />
                </Dialog>
                ) : null }
                { jenis === "tambahan" ? (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                        Tambah
                        </Button>
                    </DialogTrigger>
                    <DialogAddLain area="Tambahan" />
                </Dialog>
                ) : null }
                { jenis === "warga" && (
                    <Card className="h-min">
                        <div className="flex grid-cols-3">
                            <p className="font-semibold">Mustahikt</p>
                            <Button className="ml-auto" onClick={async () => {
                                const data = table.getFilteredSelectedRowModel().flatRows.map((row) => row.id)
                                await changeStatusWarga(data, "Ya")
                                // data.map((data) => {
                                //     changeStatusWarga(data, "Ya")
                                // })

                            }}>Ya</Button>
                            <Button className="ml-auto"onClick={async () => {
                                const data = table.getFilteredSelectedRowModel().flatRows.map((row) => row.id)
                                await changeStatusWarga(data, "Tidak")
                            }}>Tidak</Button>
                        </div>
                    </Card>
                )}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Kolom
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
                                            <TableCell className="align-middle items-center justify-center" key={cell.id}>
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
                    {table.getFilteredSelectedRowModel().rows.length} dari {" "}
                    {table.getFilteredRowModel().rows.length} baris dipilih.
                </div>
                <div>
                    {/* {setArrId(table.getFilteredSelectedRowModel().flatRows.map((row) => `${JSON.stringify(row.id)},`))} */}
                </div>
                {/* <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                    Sebelumnya
                </Button>
                <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    Selanjutnya
                </Button> */}
            </div>
            {idwd != "" && (
                jenis === "pengumpulan" && (
                    <Drawer open={isDrawerOpen} onOpenChange={() => setCloseDrawer()}>
                        <DrawerEditPengumpulan id={idwd} proses={isProceed} />
                    </Drawer>
                )
            )}
            </>
        )
    }

}