import { PlusIcon } from "lucide-react";

function OfficeIndexView() {
    const { offices } = useOffice();

    return (
        <>
            <PageHeader
                title="Daftar Kantor"
                description="Kelola data kantor"
                action={
                    <Button
                        render={<Link to="/offices/create" />}
                        nativeButton={false}
                    >
                        <PlusIcon />
                        Tambah Kantor
                    </Button>
                }
            />

            <div className="flex flex-col gap-6">
                <OfficeListTable data={offices} />
            </div>
        </>
    );
}

export { OfficeIndexView };
