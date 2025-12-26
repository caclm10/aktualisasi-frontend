import {
    AlertTriangleIcon,
    MapPinIcon,
    MonitorIcon,
    WrenchIcon,
} from "lucide-react";

function DashboardCards() {
    const { assets } = useAsset();
    const { activities } = useActivities();

    // Hitung statistik
    const totalAssets = assets?.length ?? 0;
    const totalMaintenanceActivities =
        activities?.filter((a) => a.category === "pemeliharaan").length ?? 0;
    const totalMutasiActivities =
        activities?.filter((a) => a.category === "perjalanan").length ?? 0;
    const assetsRusak =
        assets?.filter(
            (a) => a.condition === "rusak" || a.condition === "rusak berat",
        ).length ?? 0;

    return (
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Total Aset</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {totalAssets}
                    </CardTitle>
                    <CardAction>
                        <MonitorIcon className="text-muted-foreground size-5" />
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="text-muted-foreground">
                        Jumlah aset terdaftar
                    </div>
                </CardFooter>
            </Card>

            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Aktivitas Maintenance</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {totalMaintenanceActivities}
                    </CardTitle>
                    <CardAction>
                        <WrenchIcon className="text-muted-foreground size-5" />
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="text-muted-foreground">
                        Total aktivitas pemeliharaan
                    </div>
                </CardFooter>
            </Card>

            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Aktivitas Mutasi</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {totalMutasiActivities}
                    </CardTitle>
                    <CardAction>
                        <MapPinIcon className="text-muted-foreground size-5" />
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="text-muted-foreground">
                        Total perpindahan lokasi
                    </div>
                </CardFooter>
            </Card>

            <Card className="@container/card">
                <CardHeader>
                    <CardDescription>Aset Rusak</CardDescription>
                    <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                        {assetsRusak}
                    </CardTitle>
                    <CardAction>
                        <AlertTriangleIcon className="text-muted-foreground size-5" />
                    </CardAction>
                </CardHeader>
                <CardFooter className="flex-col items-start gap-1.5 text-sm">
                    <div className="text-muted-foreground">
                        Perlu perhatian segera
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}

export { DashboardCards };
