import { EyeIcon, ServerIcon } from "lucide-react";

interface AssetListTableProps {
    data?: Asset[];
}

function AssetListTable({ data = [] }: AssetListTableProps) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <ServerIcon className="text-muted-foreground size-5" />

                    <CardTitle>Daftar Aset</CardTitle>
                </div>
            </CardHeader>

            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow head>
                            <TableHead className="w-12">No</TableHead>
                            <TableHead>Hostname</TableHead>
                            <TableHead>Brand / Model</TableHead>
                            <TableHead>Serial Number</TableHead>
                            <TableHead>Lokasi</TableHead>
                            <TableHead>Kondisi</TableHead>
                            <TableHead className="w-20 pr-0 text-center">
                                Aksi
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {data.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={8}
                                    className="text-muted-foreground py-8 text-center"
                                >
                                    Tidak ada aset yang ditemukan
                                </TableCell>
                            </TableRow>
                        )}

                        {data.length > 0 &&
                            data.map((asset, index) => (
                                <TableRow key={asset.id} body>
                                    <TableCell className="text-muted-foreground text-sm">
                                        {index + 1}
                                    </TableCell>

                                    <TableCell>
                                        <span className="font-medium">
                                            {asset.hostname}
                                        </span>
                                    </TableCell>

                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span>{asset.brand}</span>
                                            <span className="text-muted-foreground text-xs">
                                                {asset.model}
                                            </span>
                                        </div>
                                    </TableCell>

                                    <TableCell>
                                        <code className="text-muted-foreground font-mono text-xs">
                                            {asset.serialNumber}
                                        </code>
                                    </TableCell>

                                    <TableCell>
                                        {asset.room ? (
                                            <div className="flex flex-col">
                                                <span>{asset.room.name}</span>
                                                <span className="text-muted-foreground text-xs">
                                                    {asset.room.office?.name}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-muted-foreground">
                                                -
                                            </span>
                                        )}
                                    </TableCell>

                                    <TableCell>
                                        <ConditionBadge
                                            condition={asset.condition}
                                        />
                                    </TableCell>

                                    <TableCell className="pr-0 text-center">
                                        <Link
                                            to={`/assets/${asset.id}`}
                                            title="Lihat Detail"
                                            className="text-muted-foreground hover:bg-muted hover:text-foreground inline-flex size-8 items-center justify-center rounded-md transition-colors"
                                        >
                                            <EyeIcon className="size-4" />
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
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

function DeploymentStatusBadge({ status }: { status: AssetDeploymentStatus }) {
    const variants: Record<AssetDeploymentStatus, string> = {
        "in stock":
            "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
        deployed:
            "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        maintenance:
            "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
    };

    const labels: Record<AssetDeploymentStatus, string> = {
        "in stock": "In Stock",
        deployed: "Deployed",
        maintenance: "Maintenance",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                variants[status],
            )}
        >
            {labels[status]}
        </span>
    );
}

export { AssetListTable, ConditionBadge, DeploymentStatusBadge };
