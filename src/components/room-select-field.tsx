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

    const inputId = useId();

    const options = useMemo(() => {
        if (!offices) return [];

        const rooms = offices.flatMap((office) => {
            const _rooms = office.rooms;

            if (!_rooms) return [];

            return _rooms.map((room) => ({
                value: room.id,
                label: `${office.name} - ${room.name} (Lantai ${room.floor})`,
            }));
        });

        return rooms;
    }, [offices]);

    return (
        <Field data-invalid={isInvalid}>
            <FieldLabel htmlFor={inputId}>Lokasi (Ruangan)</FieldLabel>

            <Select name={name} value={value} onValueChange={onChange}>
                <SelectTrigger id={inputId}>
                    <SelectValue placeholder="Pilih Ruangan" />
                </SelectTrigger>

                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Ruangan</SelectLabel>
                        {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>

            {isInvalid && <FieldError errors={[error]} />}
        </Field>
    );
}

export { RoomSelectField };
