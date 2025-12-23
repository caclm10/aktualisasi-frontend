import {
    Building2Icon,
    DoorOpenIcon,
    EditIcon,
    PhoneIcon,
    Trash2Icon,
    UserIcon,
} from "lucide-react";

function OfficeDetailView() {
    const { id } = useParams<{ id: string }>();
    const { office, isLoading, deleteOffice, deleteRoom } = useOfficeDetail(
        id!,
    );

    if (isLoading) {
        return (
            <>
                <BackButton to="/offices">Kembali ke Daftar Kantor</BackButton>
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
            <BackButton to="/offices">Kembali ke Daftar Kantor</BackButton>

            <PageHeader
                title={office.name}
                description="Detail informasi kantor"
                action={
                    <div className="flex items-center gap-2">
                        <Button
                            render={<Link to={`/offices/${id}/edit`} />}
                            variant="outline"
                            nativeButton={false}
                        >
                            <EditIcon />
                            Edit Kantor
                        </Button>

                        <AlertDialog>
                            <AlertDialogTrigger
                                render={
                                    <Button variant="destructive">
                                        <Trash2Icon />
                                        Hapus
                                    </Button>
                                }
                            />

                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>
                                        Hapus Kantor?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Tindakan ini tidak dapat dibatalkan.
                                        Kantor "{office.name}" beserta semua
                                        ruangan di dalamnya akan dihapus secara
                                        permanen.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                    <AlertDialogAction
                                        variant="destructive"
                                        onClick={deleteOffice}
                                    >
                                        Hapus
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                    </div>
                }
            />

            <div className="flex flex-col gap-6">
                {/* Office Information Card */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <Building2Icon className="text-muted-foreground size-5" />
                            <CardTitle>Informasi Kantor</CardTitle>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <div className="flex items-start gap-3">
                                <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
                                    <Building2Icon className="size-5" />
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">
                                        Nama Kantor
                                    </p>
                                    <p className="font-medium">{office.name}</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
                                    <UserIcon className="size-5" />
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">
                                        PIC
                                    </p>
                                    <p className="font-medium">
                                        {office.picName}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg">
                                    <PhoneIcon className="size-5" />
                                </div>
                                <div>
                                    <p className="text-muted-foreground text-sm">
                                        Kontak
                                    </p>
                                    <p className="font-medium">
                                        {office.picContact}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Rooms List Card */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <DoorOpenIcon className="text-muted-foreground size-5" />
                                <div>
                                    <CardTitle>Daftar Ruangan</CardTitle>
                                    <CardDescription>
                                        {office.rooms?.length ?? 0} ruangan
                                        terdaftar
                                    </CardDescription>
                                </div>
                            </div>

                            <Button
                                render={
                                    <Link to={`/offices/${id}/rooms/create`} />
                                }
                                size="sm"
                                variant="outline"
                                nativeButton={false}
                            >
                                Tambah Ruangan
                            </Button>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow head>
                                    <TableHead className="w-12">No</TableHead>
                                    <TableHead>Kode</TableHead>
                                    <TableHead>Nama Ruangan</TableHead>
                                    <TableHead>Lantai</TableHead>
                                    <TableHead className="w-24 pr-0 text-center">
                                        Aksi
                                    </TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {(!office.rooms ||
                                    office.rooms.length === 0) && (
                                    <TableRow>
                                        <TableCell
                                            colSpan={5}
                                            className="text-muted-foreground py-8 text-center"
                                        >
                                            Belum ada ruangan yang terdaftar
                                        </TableCell>
                                    </TableRow>
                                )}

                                {office.rooms &&
                                    office.rooms.length > 0 &&
                                    office.rooms.map((room, index) => (
                                        <TableRow key={room.id} body>
                                            <TableCell className="text-muted-foreground text-sm">
                                                {index + 1}
                                            </TableCell>

                                            <TableCell>
                                                <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-xs">
                                                    {room.code}
                                                </code>
                                            </TableCell>

                                            <TableCell>
                                                <span className="font-medium">
                                                    {room.name}
                                                </span>
                                            </TableCell>

                                            <TableCell>
                                                <span className="text-muted-foreground">
                                                    Lantai {room.floor}
                                                </span>
                                            </TableCell>

                                            <TableCell className="pr-0 text-center">
                                                <div className="flex items-center justify-center gap-1">
                                                    <Link
                                                        to={`/offices/${id}/rooms/${room.id}/edit`}
                                                        title="Edit Ruangan"
                                                        className="text-muted-foreground hover:bg-muted hover:text-foreground inline-flex size-8 items-center justify-center rounded-md transition-colors"
                                                    >
                                                        <EditIcon className="size-4" />
                                                    </Link>

                                                    <AlertDialog>
                                                        <AlertDialogTrigger
                                                            render={
                                                                <button
                                                                    type="button"
                                                                    title="Hapus Ruangan"
                                                                    className="text-muted-foreground hover:bg-destructive/10 hover:text-destructive inline-flex size-8 items-center justify-center rounded-md transition-colors"
                                                                >
                                                                    <Trash2Icon className="size-4" />
                                                                </button>
                                                            }
                                                        />

                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>
                                                                    Hapus
                                                                    Ruangan?
                                                                </AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    Tindakan ini
                                                                    tidak dapat
                                                                    dibatalkan.
                                                                    Ruangan "
                                                                    {room.name}"
                                                                    akan dihapus
                                                                    secara
                                                                    permanen.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>

                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>
                                                                    Batal
                                                                </AlertDialogCancel>
                                                                <AlertDialogAction
                                                                    variant="destructive"
                                                                    onClick={() =>
                                                                        deleteRoom(
                                                                            room.id,
                                                                        )
                                                                    }
                                                                >
                                                                    Hapus
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}

export { OfficeDetailView };
