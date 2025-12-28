import {
    CalendarIcon,
    CpuIcon,
    EditIcon,
    ImageIcon,
    NetworkIcon,
    ServerIcon,
    Trash2Icon,
    UploadIcon,
} from "lucide-react";

function AssetDetailView() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const {
        asset,
        isLoading,
        deleteAsset,
        updateImage,
        deleteImage,
        maintenanceAsset,
        mutasiAsset,
    } = useAssetDetail(id!);
    const { activities, isLoading: isLoadingActivities } = useAssetActivities(
        id!,
    );

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [isUploadingImage, setIsUploadingImage] = useState(false);

    if (isLoading) {
        return (
            <>
                <BackButton to="/assets">Kembali ke Daftar Aset</BackButton>
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

    async function handleDeleteAsset() {
        await deleteAsset();
        navigate("/assets");
    }

    async function handleImageUpload() {
        if (!imageFile) return;

        try {
            setIsUploadingImage(true);
            await updateImage(imageFile);
            setImageFile(null);
        } finally {
            setIsUploadingImage(false);
        }
    }

    async function handleDeleteImage() {
        await deleteImage();
    }

    return (
        <>
            <BackButton to="/assets">Kembali ke Daftar Aset</BackButton>

            <PageHeader
                title={asset.hostname}
                description="Detail informasi aset jaringan"
                action={
                    <div className="flex flex-wrap items-center gap-2">
                        <MaintenanceDialog
                            asset={asset}
                            onMaintenance={maintenanceAsset}
                        />
                        <MutasiDialog asset={asset} onMutasi={mutasiAsset} />
                        <Button
                            render={<Link to={`/assets/${id}/edit`} />}
                            variant="outline"
                            nativeButton={false}
                        >
                            <EditIcon />
                            Edit Aset
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
                                        Hapus Aset?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Tindakan ini tidak dapat dibatalkan.
                                        Aset "{asset.hostname}" akan dihapus
                                        secara permanen.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>

                                <AlertDialogFooter>
                                    <AlertDialogCancel>Batal</AlertDialogCancel>
                                    <AlertDialogAction
                                        variant="destructive"
                                        onClick={handleDeleteAsset}
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
                {/* EOS Warning Alert */}
                <EosWarningAlert eosDate={asset.eosDate} />

                {/* Asset Image Card */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <ImageIcon className="text-muted-foreground size-5" />
                            <CardTitle>Gambar Aset</CardTitle>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <div className="flex flex-col items-center gap-4 sm:flex-row">
                            <div className="bg-muted flex h-48 w-48 items-center justify-center overflow-hidden rounded-lg">
                                {asset.imageUrl ? (
                                    <img
                                        src={`${import.meta.env.VITE_BACKEND_URL || ""}${asset.imageUrl}`}
                                        alt={asset.hostname}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    <ServerIcon className="text-muted-foreground size-16" />
                                )}
                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            setImageFile(
                                                e.target.files?.[0] ?? null,
                                            )
                                        }
                                        className="max-w-xs"
                                    />
                                    <Button
                                        onClick={handleImageUpload}
                                        disabled={
                                            !imageFile || isUploadingImage
                                        }
                                        size="sm"
                                    >
                                        <UploadIcon />
                                        Upload
                                    </Button>
                                </div>

                                {asset.imageUrl && (
                                    <AlertDialog>
                                        <AlertDialogTrigger
                                            render={
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="w-fit"
                                                >
                                                    <Trash2Icon />
                                                    Hapus Gambar
                                                </Button>
                                            }
                                        />

                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>
                                                    Hapus Gambar?
                                                </AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Gambar aset akan dihapus
                                                    secara permanen.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>

                                            <AlertDialogFooter>
                                                <AlertDialogCancel>
                                                    Batal
                                                </AlertDialogCancel>
                                                <AlertDialogAction
                                                    variant="destructive"
                                                    onClick={handleDeleteImage}
                                                >
                                                    Hapus
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Basic Information Card */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <ServerIcon className="text-muted-foreground size-5" />
                            <CardTitle>Informasi Dasar</CardTitle>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <InfoItem label="Hostname" value={asset.hostname} />
                            <InfoItem
                                label="Serial Number"
                                value={asset.serialNumber}
                                mono
                            />
                            <InfoItem
                                label="Kode Register"
                                value={asset.registerCode}
                                mono
                            />
                            <InfoItem
                                label="Lokasi"
                                value={
                                    asset.room
                                        ? `${asset.room.name} - ${asset.room.office?.name} (Lantai ${asset.room.floor})`
                                        : "-"
                                }
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Device Information Card */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <CpuIcon className="text-muted-foreground size-5" />
                            <CardTitle>Informasi Perangkat</CardTitle>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <InfoItem label="Brand" value={asset.brand} />
                            <InfoItem label="Model" value={asset.model} />
                            <div>
                                <p className="text-muted-foreground text-sm">
                                    Kondisi
                                </p>
                                <ConditionBadge condition={asset.condition} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Network Information Card */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <NetworkIcon className="text-muted-foreground size-5" />
                            <CardTitle>Informasi Jaringan</CardTitle>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            <InfoItem
                                label="IP VLAN"
                                value={asset.ipVlan}
                                mono
                            />
                            <InfoItem label="VLAN" value={asset.vlan} mono />
                            <InfoItem
                                label="Port ACS VLAN"
                                value={asset.portAcsVlan}
                                mono
                            />
                            <InfoItem
                                label="Port Trunk"
                                value={asset.portTrunk}
                                mono
                            />
                            <InfoItem
                                label="Kapasitas Port"
                                value={asset.portCapacity}
                            />
                            <div>
                                <p className="text-muted-foreground text-sm">
                                    Baseline
                                </p>
                                <BaselineBadge status={asset.baseline} />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Additional Information Card */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <CalendarIcon className="text-muted-foreground size-5" />
                            <CardTitle>Informasi Tambahan</CardTitle>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                            <InfoItem
                                label="Versi OS"
                                value={asset.osVersion}
                                mono
                            />
                            <InfoItem
                                label="Tanggal EOS"
                                value={
                                    asset.eosDate
                                        ? new Date(
                                              asset.eosDate,
                                          ).toLocaleDateString("id-ID")
                                        : null
                                }
                            />
                            <InfoItem
                                label="Tahun Pembelian"
                                value={asset.purchaseYear?.toString()}
                            />
                            <InfoItem
                                label="Harga"
                                value={
                                    asset.price
                                        ? `Rp ${asset.price.toLocaleString("id-ID")}`
                                        : null
                                }
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Activity History */}
                <ActivityListTable
                    data={activities}
                    isLoading={isLoadingActivities}
                    showAssetColumn={false}
                />
            </div>
        </>
    );
}

function InfoItem({
    label,
    value,
    mono = false,
}: {
    label: string;
    value: string | null | undefined;
    mono?: boolean;
}) {
    return (
        <div>
            <p className="text-muted-foreground text-sm">{label}</p>
            <p className={cn("font-medium", mono && "font-mono text-sm")}>
                {value ?? "-"}
            </p>
        </div>
    );
}

function BaselineBadge({ status }: { status: AssetBaseline }) {
    const variants: Record<AssetBaseline, string> = {
        sesuai: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        "tidak sesuai":
            "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
        pengecualian:
            "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400",
        "belum dicek":
            "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400",
    };

    const labels: Record<AssetBaseline, string> = {
        sesuai: "Sesuai",
        "tidak sesuai": "Tidak Sesuai",
        pengecualian: "Pengecualian",
        "belum dicek": "Belum Dicek",
    };

    return (
        <span
            className={cn(
                "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                variants[status],
            )}
        >
            {labels[status]}
        </span>
    );
}

export { AssetDetailView, BaselineBadge };
