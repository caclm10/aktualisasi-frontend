function DashboardView() {
    return (
        <>
            <PageHeader
                title="Dashboard"
                description="Ringkasan aktivitas dan statistik aset"
            />

            <div className="flex flex-col gap-6">
                {/* Statistics Cards */}
                <DashboardCards />

                <DashboardChart />

                {/* Chart and Table Grid */}
                <div className="grid gap-6 lg:grid-cols-2">
                    <DashboardEosWarning />
                    <DashboardTable />
                </div>
            </div>
        </>
    );
}

export { DashboardView };
