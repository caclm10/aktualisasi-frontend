import { EyeIcon, EyeOffIcon, LogInIcon, NetworkIcon } from "lucide-react";

function LoginForm() {
    const { login } = useAuth({ middleware: "guest" });

    const formId = useId();
    const emailId = useId();
    const passwordId = useId();
    const rememberId = useId();

    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const form = useForm<LoginInput>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
            remember: false,
        },
    });

    async function onSubmit(data: LoginInput) {
        try {
            setIsLoading(true);

            await login(data);
        } catch (error) {
            setFormErrors(error, form.setError);

            form.resetField("password");

            setIsLoading(false);
        }
    }

    return (
        <Card>
            <CardHeader className="flex flex-col items-center text-center">
                <div className="bg-primary text-primary-foreground flex size-16 items-center justify-center rounded-2xl shadow-md">
                    <NetworkIcon className="size-8" />
                </div>

                <CardTitle
                    render={<h1 />}
                    className="mt-4 text-2xl font-bold tracking-tight"
                >
                    SIM-JARI
                </CardTitle>

                <CardDescription className="text-sm">
                    Sistem Informasi Manajemen Jaringan & Inventaris
                </CardDescription>
            </CardHeader>

            <CardContent>
                <form id={formId} onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            control={form.control}
                            name="email"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={emailId}>
                                        Email address
                                    </FieldLabel>

                                    <Input
                                        {...field}
                                        id={emailId}
                                        placeholder="youremail@example.com"
                                        aria-invalid={fieldState.invalid}
                                        className="h-11"
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
                            name="password"
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={passwordId}>
                                        Password
                                    </FieldLabel>

                                    <div className="relative">
                                        <Input
                                            {...field}
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            id={passwordId}
                                            placeholder="**************"
                                            aria-invalid={fieldState.invalid}
                                            className="h-11"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2 transition-colors"
                                            tabIndex={-1}
                                        >
                                            {showPassword ? (
                                                <EyeOffIcon className="size-5" />
                                            ) : (
                                                <EyeIcon className="size-5" />
                                            )}
                                        </button>
                                    </div>

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
                            name="remember"
                            render={({ field, fieldState }) => (
                                <FieldSet data-invalid={fieldState.invalid}>
                                    <FieldGroup>
                                        <Field orientation="horizontal">
                                            <Checkbox
                                                id={rememberId}
                                                name={field.name}
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />

                                            <FieldLabel
                                                htmlFor={rememberId}
                                                className="font-normal"
                                            >
                                                Remember Me?
                                            </FieldLabel>
                                        </Field>
                                    </FieldGroup>
                                </FieldSet>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Field>
                    <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        form={formId}
                    >
                        <LogInIcon />
                        Masuk Aplikasi
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    );
}

export { LoginForm };
