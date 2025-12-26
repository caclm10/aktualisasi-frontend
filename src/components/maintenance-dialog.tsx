import { WrenchIcon } from "lucide-react";
import { useId, useState } from "react";
import { Controller } from "react-hook-form";

import { FieldInput, FieldInputSelect } from "@/components/field-input";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { SelectGroup, SelectItem, SelectLabel } from "@/components/ui/select";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

// Tipe field yang bisa di-update
type MaintenanceFieldType = "osVersion" | "condition" | "baseline" | "";

// Schema untuk maintenance form
const maintenanceFormSchema = z.object({
    fieldToUpdate: z.enum(["osVersion", "condition", "baseline", ""]),
    osVersion: z.string(),
    condition: z.enum(["baik", "rusak", "rusak berat"]),
    baseline: z.enum(["sesuai", "tidak sesuai", "pengecualian", "belum dicek"]),
    remarks: z.string(),
});

type MaintenanceFormInput = ZInfer<typeof maintenanceFormSchema>;

interface MaintenanceDialogProps {
    asset: Asset;
    onMaintenance: (data: {
        osVersion?: string;
        condition?: AssetCondition;
        baseline?: AssetBaseline;
        remarks?: string;
    }) => Promise<void>;
}

const fieldOptions: { value: MaintenanceFieldType; label: string }[] = [
    { value: "osVersion", label: "Versi OS" },
    { value: "condition", label: "Kondisi" },
    { value: "baseline", label: "Baseline" },
];

function MaintenanceDialog({ asset, onMaintenance }: MaintenanceDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formId = useId();
    const remarksId = useId();

    const form = useForm<MaintenanceFormInput>({
        resolver: zodResolver(maintenanceFormSchema),
        defaultValues: {
            fieldToUpdate: "",
            osVersion: asset.osVersion ?? "",
            condition: asset.condition,
            baseline: asset.baseline,
            remarks: "",
        },
    });

    const watchFieldToUpdate = form.watch("fieldToUpdate");
    const hasNoSelection = !watchFieldToUpdate;

    function resetForm() {
        form.reset({
            fieldToUpdate: "",
            osVersion: asset.osVersion ?? "",
            condition: asset.condition,
            baseline: asset.baseline,
            remarks: "",
        });
    }

    async function onSubmit(data: MaintenanceFormInput) {
        if (!data.fieldToUpdate) {
            return;
        }

        setIsSubmitting(true);

        try {
            const payload: {
                osVersion?: string;
                condition?: AssetCondition;
                baseline?: AssetBaseline;
                remarks?: string;
            } = {};

            // Hanya kirim field yang dipilih
            if (data.fieldToUpdate === "osVersion") {
                payload.osVersion = data.osVersion;
            } else if (data.fieldToUpdate === "condition") {
                payload.condition = data.condition;
            } else if (data.fieldToUpdate === "baseline") {
                payload.baseline = data.baseline;
            }

            if (data.remarks?.trim()) {
                payload.remarks = data.remarks.trim();
            }

            await onMaintenance(payload);
            setIsOpen(false);
            resetForm();
        } catch (error) {
            setFormErrors(error, form.setError);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <Sheet
            open={isOpen}
            onOpenChange={(open) => {
                setIsOpen(open);
                if (!open) resetForm();
            }}
        >
            <SheetTrigger
                render={
                    <Button variant="outline">
                        <WrenchIcon />
                        Maintenance
                    </Button>
                }
            />

            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>Maintenance Aset</SheetTitle>
                    <SheetDescription>
                        Pilih data yang ingin diubah, lalu isi dengan nilai
                        baru.
                    </SheetDescription>
                </SheetHeader>

                <form
                    id={formId}
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-6 p-4"
                >
                    {/* Field Selection - Radio Button Style */}
                    <Controller
                        control={form.control}
                        name="fieldToUpdate"
                        render={({ field, fieldState }) => (
                            <FieldInputSelect
                                label="Pilih Data yang Akan Diubah"
                                field={field}
                                fieldState={fieldState}
                            >
                                <SelectGroup>
                                    <SelectLabel>Jenis Data</SelectLabel>
                                    {fieldOptions.map((option) => (
                                        <SelectItem
                                            key={option.value}
                                            value={option.value}
                                        >
                                            {option.label}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </FieldInputSelect>
                        )}
                    />

                    {/* Conditional Input based on selected field */}
                    {watchFieldToUpdate === "osVersion" && (
                        <Controller
                            control={form.control}
                            name="osVersion"
                            render={({ field, fieldState }) => (
                                <FieldInput
                                    label="Versi OS Baru"
                                    field={field}
                                    fieldState={fieldState}
                                    placeholder="Contoh: 15.2.1"
                                />
                            )}
                        />
                    )}

                    {watchFieldToUpdate === "condition" && (
                        <Controller
                            control={form.control}
                            name="condition"
                            render={({ field, fieldState }) => (
                                <FieldInputSelect
                                    label="Kondisi Baru"
                                    field={field}
                                    fieldState={fieldState}
                                >
                                    <SelectGroup>
                                        <SelectLabel>Kondisi</SelectLabel>
                                        <SelectItem value="baik">
                                            Baik
                                        </SelectItem>
                                        <SelectItem value="rusak">
                                            Rusak
                                        </SelectItem>
                                        <SelectItem value="rusak berat">
                                            Rusak Berat
                                        </SelectItem>
                                    </SelectGroup>
                                </FieldInputSelect>
                            )}
                        />
                    )}

                    {watchFieldToUpdate === "baseline" && (
                        <Controller
                            control={form.control}
                            name="baseline"
                            render={({ field, fieldState }) => (
                                <FieldInputSelect
                                    label="Baseline Baru"
                                    field={field}
                                    fieldState={fieldState}
                                >
                                    <SelectGroup>
                                        <SelectLabel>Baseline</SelectLabel>
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
                    )}

                    {/* Remarks */}
                    <Controller
                        control={form.control}
                        name="remarks"
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={remarksId}>
                                    Catatan / Remarks
                                </FieldLabel>
                                <textarea
                                    id={remarksId}
                                    {...field}
                                    placeholder="Catatan tambahan (opsional)"
                                    className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                {fieldState.invalid && (
                                    <FieldError errors={[fieldState.error]} />
                                )}
                            </Field>
                        )}
                    />
                </form>

                <SheetFooter>
                    <SheetClose
                        render={
                            <Button
                                type="button"
                                variant="outline"
                                disabled={isSubmitting}
                            />
                        }
                    >
                        Batal
                    </SheetClose>
                    <Button
                        form={formId}
                        type="submit"
                        disabled={isSubmitting || hasNoSelection}
                    >
                        {isSubmitting ? "Menyimpan..." : "Simpan"}
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export { MaintenanceDialog };
