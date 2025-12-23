import { SaveIcon } from "lucide-react";

interface RoomEditFormProps {
    officeId: string;
    initialData: Room;
}

function RoomEditForm({ officeId, initialData }: RoomEditFormProps) {
    const { updateRoom } = useOfficeDetail(officeId);

    const navigate = useNavigate();

    const formId = useId();
    const nameId = useId();
    const floorId = useId();
    const codeId = useId();

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<CreateRoomInput>({
        resolver: zodResolver(createRoomFormSchema),
        defaultValues: {
            name: initialData.name,
            floor: initialData.floor,
            code: initialData.code,
        },
    });

    useEffect(() => {
        form.reset({
            name: initialData.name,
            floor: initialData.floor,
            code: initialData.code,
        });
    }, [initialData, form]);

    async function onSubmit(data: CreateRoomInput) {
        try {
            setIsLoading(true);

            await updateRoom(initialData.id, data);

            navigate(`/offices/${officeId}`);
        } catch (error) {
            setIsLoading(false);

            setFormErrors(error, form.setError);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Edit Ruangan</CardTitle>

                <CardDescription>Perbarui informasi ruangan</CardDescription>
            </CardHeader>

            <CardContent>
                <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            control={form.control}
                            name="code"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={codeId}>
                                        Kode Ruangan
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        id={codeId}
                                        placeholder="R-101"
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
                            name="name"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={nameId}>
                                        Nama Ruangan
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        id={nameId}
                                        placeholder="Ruang Server Utama"
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
                            name="floor"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={floorId}>
                                        Lantai
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        id={floorId}
                                        placeholder="1"
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

export { RoomEditForm };
