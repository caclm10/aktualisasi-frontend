import { HistoryIcon } from "lucide-react";

function ActivityIndexView() {
    const { activities, isLoading } = useActivities();

    return (
        <>
            <PageHeader
                title="Riwayat Aktivitas"
                description="Lihat seluruh riwayat aktivitas aset"
            />

            <div className="flex flex-col gap-6">
                <Card>
                    <CardContent>
                        {isLoading ? (
                            <div className="flex items-center justify-center py-8">
                                <div className="text-muted-foreground">
                                    Memuat aktivitas...
                                </div>
                            </div>
                        ) : !activities || activities.length === 0 ? (
                            <div className="flex flex-col items-center justify-center gap-3 py-12">
                                <HistoryIcon className="text-muted-foreground size-12" />
                                <div className="text-muted-foreground">
                                    Belum ada aktivitas
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow head>
                                            <TableHead>Tanggal</TableHead>
                                            <TableHead>Aset</TableHead>
                                            <TableHead>Kategori</TableHead>
                                            <TableHead>Properti</TableHead>
                                            <TableHead>Nilai Lama</TableHead>
                                            <TableHead>Nilai Baru</TableHead>
                                            <TableHead>Catatan</TableHead>
                                            <TableHead>User</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {activities.map((activity) => (
                                            <TableRow key={activity.id} body>
                                                <TableCell>
                                                    {new Date(
                                                        activity.createdAt,
                                                    ).toLocaleDateString(
                                                        "id-ID",
                                                        {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric",
                                                        },
                                                    )}
                                                </TableCell>
                                                <TableCell>
                                                    <Link
                                                        to={`/assets/${activity.assetId}`}
                                                        className="text-primary hover:underline"
                                                    >
                                                        {activity.asset
                                                            ?.hostname ?? "-"}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>
                                                    <CategoryBadge
                                                        category={
                                                            activity.category
                                                        }
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    {
                                                        activityPropertiesLabel[
                                                            activity.property
                                                        ]
                                                    }
                                                </TableCell>
                                                <TableCell>
                                                    {activity.old || "-"}
                                                </TableCell>
                                                <TableCell>
                                                    {activity.new || "-"}
                                                </TableCell>
                                                <TableCell>
                                                    {activity.remarks ?? "-"}
                                                </TableCell>
                                                <TableCell>
                                                    {activity.user?.name ?? "-"}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </>
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

export { ActivityIndexView };
