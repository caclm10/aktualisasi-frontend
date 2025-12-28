function ActivityIndexView() {
    const { activities, isLoading } = useActivities();

    return (
        <>
            <PageHeader
                title="Riwayat Aktivitas"
                description="Lihat seluruh riwayat aktivitas aset"
            />

            <div className="flex flex-col gap-6">
                <ActivityListTable data={activities} isLoading={isLoading} />
            </div>
        </>
    );
}

export { ActivityIndexView };
