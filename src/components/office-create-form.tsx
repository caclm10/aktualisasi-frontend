import { SaveIcon } from "lucide-react";

function OfficeCreateForm() {
    const { createOffice } = useOffice();

    const formId = useId();
    const nameId = useId();
    const picNameId = useId();
    const picContactId = useId();

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<CreateOfficeInput>({
        resolver: zodResolver(createOfficeFormSchema),
        defaultValues: {
            name: "",
            picName: "",
            picContact: "",
        },
    });

    async function onSubmit(data: CreateOfficeInput) {
        try {
            setIsLoading(true);

            await createOffice(data);
        } catch (error) {
            setFormErrors(error, form.setError);

            setIsLoading(false);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tambah Kantor</CardTitle>

                <CardDescription>
                    Lengkapi informasi kantor baru yang akan didaftarkan
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            control={form.control}
                            name="name"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={nameId}>
                                        Nama Kantor
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        id={nameId}
                                        placeholder="KPKNL Jakarta"
                                        aria-invalid={fieldState.invalid}
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
                            name="picName"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={picNameId}>
                                        Nama PIC
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        id={picNameId}
                                        placeholder="Budi Santoso"
                                        aria-invalid={fieldState.invalid}
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
                            name="picContact"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={picContactId}>
                                        Kontak PIC
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        id={picContactId}
                                        placeholder="081234567890"
                                        aria-invalid={fieldState.invalid}
                                    />

                                    {fieldState.invalid && (
                                        <FieldError
                                            errors={[fieldState.error]}
                                        />
                                    )}
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>

            <CardFooter>
                <Field orientation="horizontal" className="justify-end">
                    <Button type="submit" disabled={isLoading} form={formId}>
                        <SaveIcon />
                        Simpan Kantor
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    );
}

export { OfficeCreateForm };
