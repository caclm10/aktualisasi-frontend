import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type {
    ControllerFieldState,
    ControllerRenderProps,
    FieldPath,
    FieldValues,
} from "react-hook-form";

interface FieldInputProps<
    TFieldValues extends FieldValues = any,
    TName extends FieldPath<TFieldValues> = any,
> extends React.ComponentProps<typeof Input> {
    field: ControllerRenderProps<TFieldValues, TName>;
    fieldState: ControllerFieldState;
    label: string;
}

function FieldInput({ field, fieldState, label, ...props }: FieldInputProps) {
    const inputId = useId();

    return (
        <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
            <Input
                {...field}
                id={inputId}
                aria-invalid={fieldState.invalid}
                {...props}
            />
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    );
}

interface FieldInputSelectProps<
    TFieldValues extends FieldValues = any,
    TName extends FieldPath<TFieldValues> = any,
> extends React.ComponentProps<typeof Select> {
    field: ControllerRenderProps<TFieldValues, TName>;
    fieldState: ControllerFieldState;
    label: string;
}

function FieldInputSelect({
    field,
    fieldState,
    label,
    children,
    ...props
}: FieldInputSelectProps) {
    const inputId = useId();

    return (
        <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
            <Select
                value={field.value}
                onValueChange={field.onChange}
                {...props}
            >
                <SelectTrigger id={inputId}>
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>{children}</SelectContent>
            </Select>
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
        </Field>
    );
}

export { FieldInput, FieldInputSelect };
