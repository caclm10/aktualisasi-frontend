function RoomCreateView() {
    const { id } = useParams<{ id: string }>();
    const { office, isLoading } = useOfficeDetail(id!);

    if (isLoading) {
        return (
            <>
                <BackButton to={`/offices/${id}`}>
                    Kembali ke Detail Kantor
                </BackButton>
                <div className="flex items-center justify-center py-12">
                    <div className="text-muted-foreground">Memuat data...</div>
                </div>
            </>
        );
    }

    return (
        <>
            <BackButton to={`/offices/${id}`}>
                Kembali ke Detail Kantor
            </BackButton>

            <PageHeader
                title="Tambah Ruangan"
                description={`Tambahkan ruangan baru ke ${office?.name ?? "kantor"}`}
            />

            <RoomCreateForm officeId={id!} />
        </>
    );
}

export { RoomCreateView };
