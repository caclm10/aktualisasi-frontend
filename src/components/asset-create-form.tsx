import { SaveIcon } from "lucide-react";

function AssetCreateForm() {
    const { createAsset } = useAsset();
    const { offices } = useOffice();

    const navigate = useNavigate();

    const formId = useId();

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<CreateAssetFormInput>({
        resolver: zodResolver(createAssetFormSchema),
        defaultValues: {
            roomId: "",
            registerCode: "",
            serialNumber: "",
            hostname: "",
            brand: "",
            model: "",
            condition: "baik",
            deploymentStatus: "in stock",
            complianceStatus: "belum dicek",
            ipVlan: "",
            vlan: "",
            portAcsVlan: "",
            portTrunk: "",
            portCapacity: "",
            osVersion: "",
            eosDate: "",
            purchaseYear: "",
            price: "",
        },
    });

    async function onSubmit(data: CreateAssetFormInput) {
        try {
            setIsLoading(true);

            // Convert string values to numbers for the API
            const payload: CreateAssetInput = {
                ...data,
                purchaseYear: data.purchaseYear
                    ? parseInt(data.purchaseYear, 10)
                    : null,
                price: data.price ? parseFloat(data.price) : null,
            };

            const newAssetId = await createAsset(payload);

            navigate(`/assets/${newAssetId}`);
        } catch (error) {
            setFormErrors(error, form.setError);

            setIsLoading(false);
        }
    }

    // Flatten offices and rooms for the select
    const roomOptions = useMemo(() => {
        if (!offices) return [];

        return offices.flatMap((office) =>
            (office.rooms ?? []).map((room) => ({
                value: room.id,
                label: `${room.name} - ${office.name}`,
                office: office.name,
                room: room.name,
            })),
        );
    }, [offices]);

    return (
        <Card>
            <CardHeader>
                <CardTitle>Registrasi Aset Baru</CardTitle>

                <CardDescription>
                    Lengkapi informasi aset jaringan yang akan didaftarkan
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        {/* Basic Information */}
                        <FieldSet>
                            <FieldLegend>Informasi Dasar</FieldLegend>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Controller
                                    control={form.control}
                                    name="hostname"
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel>Hostname</FieldLabel>
                                            <Input
                                                {...field}
                                                placeholder="SW-CORE-01"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                            />
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="serialNumber"
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel>
                                                Serial Number
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                placeholder="FOC1234ABCD"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                            />
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="registerCode"
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel>
                                                Kode Register
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                placeholder="REG-2024-001"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                            />
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="roomId"
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel>
                                                Lokasi (Ruangan)
                                            </FieldLabel>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem
                                                        value=""
                                                        key={"pilih-ruangan"}
                                                    >
                                                        Pilih ruangan
                                                    </SelectItem>
                                                    {roomOptions.map((room) => (
                                                        <SelectItem
                                                            key={room.value}
                                                            value={room.value}
                                                        >
                                                            {room.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />
                            </div>
                        </FieldSet>

                        <FieldSeparator />

                        {/* Device Information */}
                        <FieldSet>
                            <FieldLegend>Informasi Perangkat</FieldLegend>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Controller
                                    control={form.control}
                                    name="brand"
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel>Brand</FieldLabel>
                                            <Input
                                                {...field}
                                                placeholder="Cisco"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                            />
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="model"
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel>Model</FieldLabel>
                                            <Input
                                                {...field}
                                                placeholder="Catalyst 2960X"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                            />
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="condition"
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel>Kondisi</FieldLabel>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue data-placeholder="Pilih kondisi" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="baik">
                                                        Baik
                                                    </SelectItem>
                                                    <SelectItem value="rusak">
                                                        Rusak
                                                    </SelectItem>
                                                    <SelectItem value="rusak berat">
                                                        Rusak Berat
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="deploymentStatus"
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel>
                                                Status Deployment
                                            </FieldLabel>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue data-placeholder="Pilih status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="in stock">
                                                        In Stock
                                                    </SelectItem>
                                                    <SelectItem value="deployed">
                                                        Deployed
                                                    </SelectItem>
                                                    <SelectItem value="maintenance">
                                                        Maintenance
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />
                            </div>
                        </FieldSet>

                        <FieldSeparator />

                        {/* Network Information */}
                        <FieldSet>
                            <FieldLegend>Informasi Jaringan</FieldLegend>

                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <Controller
                                    control={form.control}
                                    name="ipVlan"
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel>IP VLAN</FieldLabel>
                                            <Input
                                                {...field}
                                                value={field.value ?? ""}
                                                placeholder="192.168.1.1"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                            />
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="vlan"
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel>VLAN</FieldLabel>
                                            <Input
                                                {...field}
                                                value={field.value ?? ""}
                                                placeholder="100"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                            />
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="portAcsVlan"
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel>
                                                Port ACS VLAN
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                value={field.value ?? ""}
                                                placeholder="Gi0/1"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                            />
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="portTrunk"
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel>Port Trunk</FieldLabel>
                                            <Input
                                                {...field}
                                                value={field.value ?? ""}
                                                placeholder="Gi0/24"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                            />
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="portCapacity"
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel>
                                                Kapasitas Port
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                value={field.value ?? ""}
                                                placeholder="24"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                            />
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="complianceStatus"
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel>
                                                Status Compliance
                                            </FieldLabel>
                                            <Select
                                                value={field.value}
                                                onValueChange={field.onChange}
                                            >
                                                <SelectTrigger>
                                                    <SelectValue data-placeholder="Pilih status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="sesuai">
                                                        Sesuai
                                                    </SelectItem>
                                                    <SelectItem value="tidak sesuai">
                                                        Tidak Sesuai
                                                    </SelectItem>
                                                    <SelectItem value="pengecualian">
                                                        Pengecualian
                                                    </SelectItem>
                                                    <SelectItem value="belum dicek">
                                                        Belum Dicek
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />
                            </div>
                        </FieldSet>

                        <FieldSeparator />

                        {/* Additional Information */}
                        <FieldSet>
                            <FieldLegend>Informasi Tambahan</FieldLegend>

                            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                <Controller
                                    control={form.control}
                                    name="osVersion"
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel>Versi OS</FieldLabel>
                                            <Input
                                                {...field}
                                                value={field.value ?? ""}
                                                placeholder="15.2(7)E3"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                            />
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="eosDate"
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel>Tanggal EOS</FieldLabel>
                                            <Input
                                                {...field}
                                                value={field.value ?? ""}
                                                type="date"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                            />
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="purchaseYear"
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel>
                                                Tahun Pembelian
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                value={field.value ?? ""}
                                                type="number"
                                                placeholder="2024"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                            />
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="price"
                                    render={({ field, fieldState }) => (
                                        <Field
                                            data-invalid={fieldState.invalid}
                                        >
                                            <FieldLabel>Harga (Rp)</FieldLabel>
                                            <Input
                                                {...field}
                                                value={field.value ?? ""}
                                                type="number"
                                                placeholder="10000000"
                                                aria-invalid={
                                                    fieldState.invalid
                                                }
                                            />
                                            {fieldState.invalid && (
                                                <FieldError
                                                    errors={[fieldState.error]}
                                                />
                                            )}
                                        </Field>
                                    )}
                                />
                            </div>
                        </FieldSet>
                    </FieldGroup>
                </form>
            </CardContent>

            <CardFooter>
                <Field orientation="horizontal" className="justify-end">
                    <Button type="submit" disabled={isLoading} form={formId}>
                        <SaveIcon />
                        Simpan Aset
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    );
}

export { AssetCreateForm };
