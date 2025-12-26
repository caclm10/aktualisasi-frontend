import { SaveIcon } from "lucide-react";

interface AssetEditFormProps {
    assetId: string;
    initialData: Asset;
}

function AssetEditForm({ assetId, initialData }: AssetEditFormProps) {
    const { updateAsset } = useAssetDetail(assetId);

    const navigate = useNavigate();

    const formId = useId();

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<CreateAssetFormInput>({
        resolver: zodResolver(createAssetFormSchema),
        defaultValues: {
            room: initialData.roomId,
            registerCode: initialData.registerCode,
            serialNumber: initialData.serialNumber,
            hostname: initialData.hostname,
            brand: initialData.brand,
            model: initialData.model,
            condition: initialData.condition,
            baseline: initialData.baseline,
            ipVlan: initialData.ipVlan ?? "",
            vlan: initialData.vlan ?? "",
            portAcsVlan: initialData.portAcsVlan ?? "",
            portTrunk: initialData.portTrunk ?? "",
            portCapacity: initialData.portCapacity ?? "",
            osVersion: initialData.osVersion ?? "",
            eosDate: initialData.eosDate
                ? initialData.eosDate.split("T")[0]
                : "",
            purchaseYear: initialData.purchaseYear?.toString() ?? "",
            price: initialData.price?.toString() ?? "",
        },
    });

    useEffect(() => {
        form.reset({
            room: initialData.roomId,
            registerCode: initialData.registerCode,
            serialNumber: initialData.serialNumber,
            hostname: initialData.hostname,
            brand: initialData.brand,
            model: initialData.model,
            condition: initialData.condition,
            baseline: initialData.baseline,
            ipVlan: initialData.ipVlan ?? "",
            vlan: initialData.vlan ?? "",
            portAcsVlan: initialData.portAcsVlan ?? "",
            portTrunk: initialData.portTrunk ?? "",
            portCapacity: initialData.portCapacity ?? "",
            osVersion: initialData.osVersion ?? "",
            eosDate: initialData.eosDate
                ? initialData.eosDate.split("T")[0]
                : "",
            purchaseYear: initialData.purchaseYear?.toString() ?? "",
            price: initialData.price?.toString() ?? "",
        });
    }, [initialData, form]);

    async function onSubmit(data: CreateAssetFormInput) {
        try {
            setIsLoading(true);

            // Convert string values to numbers for the API
            const payload: AssetInput = {
                ...data,
                purchaseYear: data.purchaseYear
                    ? parseInt(data.purchaseYear, 10)
                    : null,
                price: data.price ? parseFloat(data.price) : null,
            };

            await updateAsset(payload);

            navigate(`/assets/${assetId}`);
        } catch (error) {
            setFormErrors(error, form.setError);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Card>
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
                                        <FieldInput
                                            label="Hostname"
                                            field={field}
                                            fieldState={fieldState}
                                            placeholder="SW-CORE-01"
                                        />
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="serialNumber"
                                    render={({ field, fieldState }) => (
                                        <FieldInput
                                            label="Serial Number"
                                            field={field}
                                            fieldState={fieldState}
                                            placeholder="FOC1234ABCD"
                                        />
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="registerCode"
                                    render={({ field, fieldState }) => (
                                        <FieldInput
                                            label="Kode Register"
                                            field={field}
                                            fieldState={fieldState}
                                            placeholder="REG-2024-001"
                                        />
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="room"
                                    render={({ field, fieldState }) => (
                                        <RoomSelectField
                                            name={field.name}
                                            value={field.value}
                                            onChange={field.onChange}
                                            isInvalid={fieldState.invalid}
                                            error={fieldState.error}
                                        />
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
                                        <FieldInput
                                            label="Brand"
                                            field={field}
                                            fieldState={fieldState}
                                            placeholder="Cisco"
                                        />
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="model"
                                    render={({ field, fieldState }) => (
                                        <FieldInput
                                            label="Model"
                                            field={field}
                                            fieldState={fieldState}
                                            placeholder="Catalyst 2960X"
                                        />
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="condition"
                                    render={({ field, fieldState }) => (
                                        <FieldInputSelect
                                            field={field}
                                            fieldState={fieldState}
                                            label="Kondisi"
                                        >
                                            <SelectItem value="baik">
                                                Baik
                                            </SelectItem>
                                            <SelectItem value="rusak">
                                                Rusak
                                            </SelectItem>
                                            <SelectItem value="rusak berat">
                                                Rusak Berat
                                            </SelectItem>
                                        </FieldInputSelect>
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
                                        <FieldInput
                                            label="IP VLAN"
                                            field={field}
                                            fieldState={fieldState}
                                            placeholder="192.168.1.1"
                                        />
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="vlan"
                                    render={({ field, fieldState }) => (
                                        <FieldInput
                                            label="VLAN"
                                            field={field}
                                            fieldState={fieldState}
                                            placeholder="100"
                                        />
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="portAcsVlan"
                                    render={({ field, fieldState }) => (
                                        <FieldInput
                                            label="Port ACS VLAN"
                                            field={field}
                                            fieldState={fieldState}
                                            placeholder="Gi0/1"
                                        />
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="portTrunk"
                                    render={({ field, fieldState }) => (
                                        <FieldInput
                                            label="Port Trunk"
                                            field={field}
                                            fieldState={fieldState}
                                            placeholder="Gi0/24"
                                        />
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="portCapacity"
                                    render={({ field, fieldState }) => (
                                        <FieldInput
                                            label="Port Capacity"
                                            field={field}
                                            fieldState={fieldState}
                                            placeholder="24"
                                        />
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="baseline"
                                    render={({ field, fieldState }) => (
                                        <FieldInputSelect
                                            label="Baseline"
                                            field={field}
                                            fieldState={fieldState}
                                        >
                                            <SelectGroup>
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
                                            </SelectGroup>
                                        </FieldInputSelect>
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
                                        <FieldInput
                                            label="Versi OS"
                                            field={field}
                                            fieldState={fieldState}
                                            placeholder="15.2(7)E3"
                                        />
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="eosDate"
                                    render={({ field, fieldState }) => (
                                        <FieldInput
                                            label="Tanggal EOS"
                                            field={field}
                                            fieldState={fieldState}
                                            placeholder="Gi0/24"
                                            type="date"
                                        />
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="purchaseYear"
                                    render={({ field, fieldState }) => (
                                        <FieldInput
                                            label="Tahun Pembelian"
                                            field={field}
                                            fieldState={fieldState}
                                            placeholder="2024"
                                            type="number"
                                        />
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="price"
                                    render={({ field, fieldState }) => (
                                        <FieldInput
                                            label="Harga (Rp)"
                                            field={field}
                                            fieldState={fieldState}
                                            placeholder="10000000"
                                            type="number"
                                        />
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
                        Simpan Perubahan
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    );
}

export { AssetEditForm };
