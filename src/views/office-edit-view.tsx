function OfficeEditView() {
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

    if (!office) {
        return (
            <>
                <BackButton to="/offices">Kembali ke Daftar Kantor</BackButton>
                <div className="flex items-center justify-center py-12">
                    <div className="text-muted-foreground">
                        Kantor tidak ditemukan
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
                title="Edit Kantor"
                description={`Perbarui informasi ${office.name}`}
            />

            <OfficeEditForm officeId={id!} initialData={office} />
        </>
    );
}

export { OfficeEditView };
