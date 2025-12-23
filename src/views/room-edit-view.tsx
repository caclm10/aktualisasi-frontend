function RoomEditView() {
    const { id, roomId } = useParams<{ id: string; roomId: string }>();
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

    const room = office?.rooms?.find((r) => r.id === roomId);

    if (!office || !room) {
        return (
            <>
                <BackButton to={`/offices/${id}`}>
                    Kembali ke Detail Kantor
                </BackButton>
                <div className="flex items-center justify-center py-12">
                    <div className="text-muted-foreground">
                        Ruangan tidak ditemukan
                    </div>
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
                title="Edit Ruangan"
                description={`Perbarui informasi ${room.name} di ${office.name}`}
            />

            <RoomEditForm officeId={id!} initialData={room} />
        </>
    );
}

export { RoomEditView };
