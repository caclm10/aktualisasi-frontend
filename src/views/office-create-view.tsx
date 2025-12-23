function OfficeCreateView() {
    return (
        <>
            <BackButton to="/offices">Kembali ke Daftar Kantor</BackButton>

            <PageHeader
                title="Registrasi Kantor Baru"
                description="Tambahkan kantor baru ke dalam sistem"
            />

            <OfficeCreateForm />
        </>
    );
}

export { OfficeCreateView };
