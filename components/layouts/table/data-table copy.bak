"use client"

import React from "react"
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { DialogAddWarga } from "../zakat/warga/add"
import { useParams, usePathname } from "next/navigation"

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

    return (
        <>
        <div className="flex items-center py-4">
            <Input placeholder="Search..." 
                value={globalFilter ?? ""} 
                onChange={(event) => table.setGlobalFilter(String(event.target.value))} 
                className="max-w-sm" 
            />
            { jenis === "warga" && (
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                    Tambah Warga
                    </Button>
                </DialogTrigger>
                <DialogAddWarga rt={rt} />
            </Dialog>
            )}
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
                    {table.getRowModel().rows?.length ? (
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
        </>
    )
}