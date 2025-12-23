function AssetEditView() {
    const { id } = useParams<{ id: string }>();
    const { asset, isLoading } = useAssetDetail(id!);

    if (isLoading) {
        return (
            <>
                <BackButton to={`/assets/${id}`}>
                    Kembali ke Detail Aset
                </BackButton>
                <div className="flex items-center justify-center py-12">
                    <div className="text-muted-foreground">Memuat data...</div>
                </div>
            </>
        );
    }

    if (!asset) {
        return (
            <>
                <BackButton to="/assets">Kembali ke Daftar Aset</BackButton>
                <div className="flex items-center justify-center py-12">
                    <div className="text-muted-foreground">
                        Aset tidak ditemukan
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <BackButton to={`/assets/${id}`}>Kembali ke Detail Aset</BackButton>

            <PageHeader
                title="Edit Aset"
                description={`Perbarui informasi ${asset.hostname}`}
            />

            <AssetEditForm assetId={id!} initialData={asset} />
        </>
    );
}

export { AssetEditView };
