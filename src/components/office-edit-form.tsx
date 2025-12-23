import { SaveIcon } from "lucide-react";

interface OfficeEditFormProps {
    officeId: string;
    initialData: Office;
}

function OfficeEditForm({ officeId, initialData }: OfficeEditFormProps) {
    const { updateOffice } = useOfficeDetail(officeId);

    const formId = useId();
    const nameId = useId();
    const picNameId = useId();
    const picContactId = useId();

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<CreateOfficeInput>({
        resolver: zodResolver(createOfficeFormSchema),
        defaultValues: {
            name: initialData.name,
            picName: initialData.picName,
            picContact: initialData.picContact,
        },
    });

    useEffect(() => {
        form.reset({
            name: initialData.name,
            picName: initialData.picName,
            picContact: initialData.picContact,
        });
    }, [initialData, form]);

    async function onSubmit(data: CreateOfficeInput) {
        try {
            setIsLoading(true);

            await updateOffice(data);
        } catch (error) {
            setIsLoading(false);

            setFormErrors(error, form.setError);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Kantor</CardTitle>

                <CardDescription>Perbarui informasi kantor</CardDescription>
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
                        Simpan Perubahan
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    );
}

export { OfficeEditForm };
