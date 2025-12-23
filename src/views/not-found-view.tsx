import { FileQuestionIcon } from "lucide-react";

function NotFoundView() {
    return (
        <div className="bg-background flex min-h-screen flex-col items-center justify-center px-4">
            <div className="flex flex-col items-center text-center">
                <div className="bg-muted mb-6 flex h-24 w-24 items-center justify-center rounded-full">
                    <FileQuestionIcon className="text-muted-foreground h-12 w-12" />
                </div>

                <h1 className="text-foreground mb-2 text-6xl font-bold tracking-tight">
                    404
                </h1>

                <h2 className="text-foreground mb-4 text-xl font-semibold">
                    Halaman Tidak Ditemukan
                </h2>

                <p className="text-muted-foreground mb-8 max-w-md">
                    Maaf, halaman yang Anda cari tidak ada atau telah
                    dipindahkan. Silakan periksa kembali URL atau kembali ke
                    halaman utama.
                </p>

                <div className="flex gap-4">
                    <Button
                        variant="outline"
                        onClick={() => window.history.back()}
                    >
                        Kembali
                    </Button>
                    <Button render={<Link to="/dashboard" />}>Dashboard</Button>
                </div>
            </div>
        </div>
    );
}

export { NotFoundView };
