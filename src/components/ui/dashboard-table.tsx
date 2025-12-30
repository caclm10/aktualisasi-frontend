function DashboardTable() {
    const { activities, isLoading } = useActivities();

    // Get latest 5 activities
    const recentActivities = activities?.slice(0, 5) ?? [];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Aktivitas Terbaru</CardTitle>
                <CardDescription>
                    5 aktivitas terakhir pada sistem
                </CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="text-muted-foreground">Memuat...</div>
                    </div>
                ) : recentActivities.length === 0 ? (
                    <div className="flex items-center justify-center py-8">
                        <div className="text-muted-foreground">
                            Belum ada aktivitas
                        </div>
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow head>
                                <TableHead>Tanggal</TableHead>
                                <TableHead>Aset</TableHead>
                                <TableHead>Kategori</TableHead>
                                <TableHead>Properti</TableHead>
                                <TableHead>User</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {recentActivities.map((activity) => (
                                <TableRow key={activity.id} body>
                                    <TableCell>
                                        {toDatetimeText(
                                            new Date(activity.performedAt),
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            to={`/assets/${activity.assetId}`}
                                            className="text-primary whitespace-nowrap hover:underline"
                                        >
                                            {activity.asset?.hostname ?? "-"}
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <span
                                            className={cn(
                                                "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                                                activity.category ===
                                                    "pemeliharaan"
                                                    ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                                                    : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
                                            )}
                                        >
                                            {activity.category ===
                                            "pemeliharaan"
                                                ? "Pemeliharaan"
                                                : "Perjalanan"}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {activityPropertiesLabel[
                                            activity.property
                                        ] ?? activity.property}
                                    </TableCell>
                                    <TableCell>
                                        {activity.user?.name ?? "-"}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    );
}

export { DashboardTable };
