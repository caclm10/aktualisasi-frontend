import { AlertTriangleIcon, CalendarIcon } from "lucide-react";

function DashboardEosWarning() {
    const { assets } = useAsset();

    // Filter assets with EOS date within 2 years
    const assetsNearEos = useMemo(() => {
        if (!assets) return [];

        const now = new Date();
        const twoYearsFromNow = new Date(
            now.getFullYear() + 2,
            now.getMonth(),
            now.getDate(),
        );

        return assets
            .filter((asset) => {
                if (!asset.eosDate) return false;
                const eosDate = new Date(asset.eosDate);
                return eosDate <= twoYearsFromNow && eosDate >= now;
            })
            .sort((a, b) => {
                const dateA = new Date(a.eosDate!);
                const dateB = new Date(b.eosDate!);
                return dateA.getTime() - dateB.getTime();
            });
    }, [assets]);

    if (assetsNearEos.length === 0) {
        return null;
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <AlertTriangleIcon className="size-5 text-amber-500" />
                    <CardTitle>Peringatan EOS</CardTitle>
                </div>
                <CardDescription>
                    Aset dengan End of Support dalam 2 tahun ke depan
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow head>
                            <TableHead>Hostname</TableHead>
                            <TableHead>Brand / Model</TableHead>
                            <TableHead>Tanggal EOS</TableHead>
                            <TableHead>Sisa Waktu</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {assetsNearEos.map((asset) => {
                            const eosDate = new Date(asset.eosDate!);
                            const now = new Date();
                            const diffTime = eosDate.getTime() - now.getTime();
                            const diffDays = Math.ceil(
                                diffTime / (1000 * 60 * 60 * 24),
                            );
                            const diffMonths = Math.floor(diffDays / 30);

                            let remainingText = "";
                            let urgencyClass = "";

                            if (diffDays <= 0) {
                                remainingText = "Sudah EOS";
                                urgencyClass =
                                    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
                            } else if (diffDays <= 90) {
                                remainingText = `${diffDays} hari`;
                                urgencyClass =
                                    "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
                            } else if (diffMonths <= 12) {
                                remainingText = `${diffMonths} bulan`;
                                urgencyClass =
                                    "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
                            } else {
                                const years = Math.floor(diffMonths / 12);
                                const months = diffMonths % 12;
                                remainingText =
                                    months > 0
                                        ? `${years} tahun ${months} bulan`
                                        : `${years} tahun`;
                                urgencyClass =
                                    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
                            }

                            return (
                                <TableRow key={asset.id} body>
                                    <TableCell>
                                        <Link
                                            to={`/assets/${asset.id}`}
                                            className="text-primary font-medium hover:underline"
                                        >
                                            {asset.hostname}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        {asset.brand} {asset.model}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1.5">
                                            <CalendarIcon className="text-muted-foreground size-4" />
                                            {eosDate.toLocaleDateString(
                                                "id-ID",
                                                {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                },
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={cn(
                                                "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                                                urgencyClass,
                                            )}
                                        >
                                            {remainingText}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}

export { DashboardEosWarning };
