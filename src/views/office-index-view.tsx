import { PlusIcon } from "lucide-react";

function OfficeIndexView() {
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
        </>
    );
}

export { OfficeIndexView };
