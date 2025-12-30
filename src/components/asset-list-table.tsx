"use client";

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    type ColumnDef,
    type ColumnFiltersState,
    type SortingState,
    type VisibilityState,
} from "@tanstack/react-table";
import {
    ArrowUpDown,
    ChevronDown,
    EyeIcon,
    SearchIcon,
    ServerIcon,
} from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface AssetListTableProps {
    data?: Asset[];
}

const columns: ColumnDef<Asset>[] = [
    {
        id: "no",
        header: "No",
        cell: ({ row }) => (
            <span className="text-muted-foreground text-sm">
                {row.index + 1}
            </span>
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "hostname",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Hostname
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => (
            <span className="font-medium">{row.getValue("hostname")}</span>
        ),
    },
    {
        id: "brandModel",
        accessorFn: (row) => `${row.brand} ${row.model}`,
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Brand / Model
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => (
            <div className="flex flex-col">
                <span>{row.original.brand}</span>
                <span className="text-muted-foreground text-xs">
                    {row.original.model}
                </span>
            </div>
        ),
    },
    {
        accessorKey: "serialNumber",
        header: "Serial Number",
        cell: ({ row }) => (
            <code className="text-muted-foreground font-mono text-xs">
                {row.getValue("serialNumber")}
            </code>
        ),
    },
    {
        id: "location",
        accessorFn: (row) =>
            row.room ? `${row.room.name} ${row.room.office?.name || ""}` : "",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Lokasi
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => {
            const asset = row.original;
            return asset.room ? (
                <div className="flex flex-col">
                    <span>
                        {asset.room.name} (Lantai {asset.room.floor})
                    </span>
                    <span className="text-muted-foreground text-xs">
                        {asset.room.office?.name}
                    </span>
                </div>
            ) : (
                <span className="text-muted-foreground">-</span>
            );
        },
    },
    {
        accessorKey: "condition",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Kondisi
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => (
            <ConditionBadge condition={row.getValue("condition")} />
        ),
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id));
        },
    },
    {
        id: "actions",
        header: "Aksi",
        enableHiding: false,
        cell: ({ row }) => {
            const asset = row.original;
            return (
                <Link
                    to={`/assets/${asset.id}`}
                    title="Lihat Detail"
                    className="text-muted-foreground hover:bg-muted hover:text-foreground inline-flex size-8 items-center justify-center rounded-md transition-colors"
                >
                    <EyeIcon className="size-4" />
                </Link>
            );
        },
    },
];

function AssetListTable({ data = [] }: AssetListTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [globalFilter, setGlobalFilter] = React.useState("");

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: (row, _columnId, filterValue) => {
            const search = filterValue.toLowerCase();
            const hostname = row.original.hostname?.toLowerCase() || "";
            const brand = row.original.brand?.toLowerCase() || "";
            const model = row.original.model?.toLowerCase() || "";
            const serialNumber = row.original.serialNumber?.toLowerCase() || "";
            const roomName = row.original.room?.name?.toLowerCase() || "";
            const officeName =
                row.original.room?.office?.name?.toLowerCase() || "";

            return (
                hostname.includes(search) ||
                brand.includes(search) ||
                model.includes(search) ||
                serialNumber.includes(search) ||
                roomName.includes(search) ||
                officeName.includes(search)
            );
        },
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            globalFilter,
        },
    });

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <ServerIcon className="text-muted-foreground size-5" />
                    <CardTitle>Daftar Aset</CardTitle>
                </div>
            </CardHeader>

            <CardContent>
                <div className="w-full">
                    <div className="flex flex-col gap-4 py-4 sm:flex-row sm:flex-wrap sm:items-center">
                        <div className="relative flex-1 grow">
                            <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                            <Input
                                placeholder="Cari hostname, brand, model, serial number, lokasi..."
                                value={globalFilter}
                                onChange={(event) =>
                                    setGlobalFilter(event.target.value)
                                }
                                className="max-w-sm pl-9"
                            />
                        </div>

                        <DropdownMenu>
                            <DropdownMenuTrigger
                                render={<Button variant="outline" />}
                            >
                                Kondisi
                                <ChevronDown />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="start">
                                {(
                                    ["baik", "rusak", "rusak berat"] as const
                                ).map((condition) => {
                                    const filterValue =
                                        (table
                                            .getColumn("condition")
                                            ?.getFilterValue() as
                                            | string[]
                                            | undefined) ?? [];
                                    const isChecked =
                                        filterValue.includes(condition);
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={condition}
                                            checked={isChecked}
                                            onCheckedChange={(checked) => {
                                                const newValue = checked
                                                    ? [
                                                          ...filterValue,
                                                          condition,
                                                      ]
                                                    : filterValue.filter(
                                                          (v) =>
                                                              v !== condition,
                                                      );
                                                table
                                                    .getColumn("condition")
                                                    ?.setFilterValue(
                                                        newValue.length
                                                            ? newValue
                                                            : undefined,
                                                    );
                                            }}
                                        >
                                            <ConditionBadge
                                                condition={condition}
                                            />
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DropdownMenu>
                            <DropdownMenuTrigger
                                render={<Button variant="outline" />}
                            >
                                Kolom <ChevronDown />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                {table
                                    .getAllColumns()
                                    .filter((column) => column.getCanHide())
                                    .map((column) => {
                                        const columnLabels: Record<
                                            string,
                                            string
                                        > = {
                                            hostname: "Hostname",
                                            brandModel: "Brand / Model",
                                            serialNumber: "Serial Number",
                                            location: "Lokasi",
                                            condition: "Kondisi",
                                        };
                                        return (
                                            <DropdownMenuCheckboxItem
                                                key={column.id}
                                                checked={column.getIsVisible()}
                                                onCheckedChange={(value) =>
                                                    column.toggleVisibility(
                                                        !!value,
                                                    )
                                                }
                                            >
                                                {columnLabels[column.id] ||
                                                    column.id}
                                            </DropdownMenuCheckboxItem>
                                        );
                                    })}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="overflow-hidden">
                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id} head>
                                        {headerGroup.headers.map((header) => (
                                            <TableHead
                                                key={header.id}
                                                className={
                                                    header.column.id ===
                                                    "actions"
                                                        ? "w-20 pr-0 text-center"
                                                        : header.column.id ===
                                                            "no"
                                                          ? "w-12"
                                                          : ""
                                                }
                                            >
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext(),
                                                      )}
                                            </TableHead>
                                        ))}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow key={row.id} body>
                                            {row
                                                .getVisibleCells()
                                                .map((cell) => (
                                                    <TableCell
                                                        key={cell.id}
                                                        className={
                                                            cell.column.id ===
                                                            "actions"
                                                                ? "pr-0 text-center"
                                                                : ""
                                                        }
                                                    >
                                                        {flexRender(
                                                            cell.column
                                                                .columnDef.cell,
                                                            cell.getContext(),
                                                        )}
                                                    </TableCell>
                                                ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="text-muted-foreground h-24 text-center"
                                        >
                                            Tidak ada aset yang ditemukan
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex items-center justify-end space-x-2 py-4">
                        <div className="text-muted-foreground flex-1 text-sm">
                            {table.getFilteredRowModel().rows.length} aset
                            ditemukan
                        </div>
                        <div className="space-x-2">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                Sebelumnya
                            </Button>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                Selanjutnya
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function ConditionBadge({ condition }: { condition: AssetCondition }) {
    const variants: Record<AssetCondition, string> = {
        baik: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        rusak: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        "rusak berat":
            "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
    };

    const labels: Record<AssetCondition, string> = {
        baik: "Baik",
        rusak: "Rusak",
        "rusak berat": "Rusak Berat",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                variants[condition],
            )}
        >
            {labels[condition]}
        </span>
    );
}

export { AssetListTable, ConditionBadge };
