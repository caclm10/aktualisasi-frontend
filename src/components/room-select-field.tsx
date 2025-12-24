interface RoomSelectFieldProps {
    name: string;
    value: string;
    isInvalid: boolean;
    error?: { message?: string };
    onChange: (...event: any[]) => void;
}

function RoomSelectField({
    name,
    value,
    isInvalid,
    error,
    onChange,
}: RoomSelectFieldProps) {
    const { offices } = useOffice();

    const roomFieldId = useId();

    const options = useMemo(() => {
        const base = [{ value: "", label: "Pilih Ruangan" }];

        if (!offices) return base;

        return offices.flatMap((office) => {
            if (!office.rooms) return base;

            const rooms = office.rooms.map((room) => ({
                value: room.id,
                label: `${office.name} - ${room.name}`,
            }));

            return [...base, ...rooms];
        });
    }, [offices]);

    return (
        <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={roomFieldId}>Lokasi (Ruangan)</FieldLabel>

            <Select
                name={name}
                value={value}
                items={options}
                onValueChange={onChange}
            >
                <SelectTrigger id={roomFieldId}>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {isInvalid && <FieldError errors={[error]} />}
        </Field>
    );
}

export { RoomSelectField };
