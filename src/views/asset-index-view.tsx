import { PlusIcon } from "lucide-react";

function AssetIndexView() {
    return (
        <>
            <PageHeader
                title="Daftar Aset"
                description="Kelola dan pantau seluruh aset jaringan"
                action={
                    <Button
                        render={<Link to="/assets/create" />}
                        nativeButton={false}
                    >
                        <PlusIcon />
                        Tambah Aset
                    </Button>
                }
            />
        </>
    );
}

export { AssetIndexView };
