import { SaveIcon } from "lucide-react";

interface RoomCreateFormProps {
    officeId: string;
}

function RoomCreateForm({ officeId }: RoomCreateFormProps) {
    const { createRoom } = useOfficeDetail(officeId);

    const navigate = useNavigate();

    const formId = useId();
    const nameId = useId();
    const floorId = useId();
    const codeId = useId();

    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<CreateRoomInput>({
        resolver: zodResolver(createRoomFormSchema),
        defaultValues: {
            name: "",
            floor: "",
            code: "",
        },
    });

    async function onSubmit(data: CreateRoomInput) {
        try {
            setIsLoading(true);

            await createRoom(data);

            navigate(`/offices/${officeId}`);
        } catch (error) {
            setIsLoading(false);

            setFormErrors(error, form.setError);
        }
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Tambah Ruangan</CardTitle>

                <CardDescription>
                    Lengkapi informasi ruangan baru yang akan didaftarkan
                </CardDescription>
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
                        Simpan Ruangan
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    );
}

export { RoomCreateForm };
