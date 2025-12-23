import { PlusIcon } from "lucide-react";

function AssetIndexView() {
    const { assets } = useAsset();

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

            <div className="flex flex-col gap-6">
                <AssetListTable data={assets} />
            </div>
        </>
    );
}

export { AssetIndexView };
