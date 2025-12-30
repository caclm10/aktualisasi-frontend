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
    HistoryIcon,
    SearchIcon,
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

interface ActivityListTableProps {
    data?: Activity[];
    isLoading?: boolean;
    showAssetColumn?: boolean;
}

const columns: ColumnDef<Activity>[] = [
    {
        id: "date",
        accessorFn: (row) => row.performedAt,
        header: "Tanggal",
        cell: ({ row }) => toDatetimeText(new Date(row.original.performedAt)),
        enableSorting: true,
    },
    {
        id: "asset",
        accessorFn: (row) => row.asset?.hostname || "",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Aset
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => (
            <Link
                to={`/assets/${row.original.assetId}`}
                className="text-primary whitespace-nowrap hover:underline"
            >
                {row.original.asset?.hostname ?? "-"}
            </Link>
        ),
    },
    {
        id: "category",
        accessorFn: (row) => row.category,
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Kategori
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => <CategoryBadge category={row.original.category} />,
    },
    {
        id: "property",
        accessorFn: (row) => row.property,
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                Properti
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) =>
            activityPropertiesLabel[row.original.property] ||
            row.original.property,
    },
    {
        id: "oldValue",
        accessorKey: "old",
        header: "Nilai Lama",
        cell: ({ row }) => row.original.old || "-",
    },
    {
        id: "newValue",
        accessorKey: "new",
        header: "Nilai Baru",
        cell: ({ row }) => row.original.new || "-",
    },
    {
        id: "remarks",
        accessorKey: "remarks",
        header: "Catatan",
        cell: ({ row }) => row.original.remarks ?? "-",
    },
    {
        id: "user",
        accessorFn: (row) => row.user?.name || "",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() === "asc")
                }
            >
                User
                <ArrowUpDown />
            </Button>
        ),
        cell: ({ row }) => row.original.user?.name ?? "-",
    },
];

function ActivityListTable({
    data = [],
    isLoading,
    showAssetColumn = true,
}: ActivityListTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({
            asset: showAssetColumn,
        });
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
            const assetHostname =
                row.original.asset?.hostname?.toLowerCase() || "";
            const category = row.original.category?.toLowerCase() || "";
            const categoryLabel =
                category === "perjalanan"
                    ? "perjalanan"
                    : category === "pemeliharaan"
                      ? "pemeliharaan"
                      : "";
            const property = row.original.property?.toLowerCase() || "";
            const propertyLabel =
                activityPropertiesLabel[row.original.property]?.toLowerCase() ||
                "";
            const userName = row.original.user?.name?.toLowerCase() || "";

            return (
                assetHostname.includes(search) ||
                category.includes(search) ||
                categoryLabel.includes(search) ||
                property.includes(search) ||
                propertyLabel.includes(search) ||
                userName.includes(search)
            );
        },
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            globalFilter,
        },
    });

    if (isLoading) {
        return (
            <Card>
                <CardContent>
                    <div className="flex items-center justify-center py-8">
                        <div className="text-muted-foreground">
                            Memuat aktivitas...
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    if (data.length === 0) {
        return (
            <Card>
                <CardContent>
                    <div className="flex flex-col items-center justify-center gap-3 py-12">
                        <HistoryIcon className="text-muted-foreground size-12" />
                        <div className="text-muted-foreground">
                            Belum ada aktivitas
                        </div>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <HistoryIcon className="text-muted-foreground size-5" />
                    <CardTitle>Riwayat Aktivitas</CardTitle>
                </div>
            </CardHeader>

            <CardContent>
                <div className="w-full">
                    <div className="flex items-center gap-4 py-4">
                        <div className="relative max-w-sm flex-1">
                            <SearchIcon className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                            <Input
                                placeholder="Cari aset, kategori, properti, user..."
                                value={globalFilter}
                                onChange={(event) =>
                                    setGlobalFilter(event.target.value)
                                }
                                className="pl-9"
                            />
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger
                                render={
                                    <Button
                                        variant="outline"
                                        className="ml-auto"
                                    />
                                }
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
                                            date: "Tanggal",
                                            asset: "Aset",
                                            category: "Kategori",
                                            property: "Properti",
                                            oldValue: "Nilai Lama",
                                            newValue: "Nilai Baru",
                                            remarks: "Catatan",
                                            user: "User",
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
                                            <TableHead key={header.id}>
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
                                                    <TableCell key={cell.id}>
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
                                            Tidak ada aktivitas yang ditemukan
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                    <div className="flex items-center justify-end space-x-2 py-4">
                        <div className="text-muted-foreground flex-1 text-sm">
                            {table.getFilteredRowModel().rows.length} aktivitas
                            ditemukan
                        </div>
                        {table.getPageCount() > 1 && (
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
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

function CategoryBadge({ category }: { category: ActivityCategory }) {
    const variants: Record<ActivityCategory, string> = {
        perjalanan:
            "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        pemeliharaan:
            "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
    };

    const labels: Record<ActivityCategory, string> = {
        perjalanan: "Perjalanan",
        pemeliharaan: "Pemeliharaan",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                variants[category],
            )}
        >
            {labels[category]}
        </span>
    );
}

export { ActivityListTable, CategoryBadge };
