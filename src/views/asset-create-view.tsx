function AssetCreateView() {
    return (
        <>
            <BackButton to="/assets">Kembali ke Daftar Aset</BackButton>

            <PageHeader
                title="Registrasi Aset Baru"
                description="Tambahkan aset jaringan baru ke dalam sistem"
            />

            <AssetCreateForm />
        </>
    );
}

export { AssetCreateView };
