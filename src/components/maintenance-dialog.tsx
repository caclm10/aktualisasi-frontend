import { WrenchIcon } from "lucide-react";
import { useId, useState } from "react";
import { Controller } from "react-hook-form";

import { FieldInput, FieldInputSelect } from "@/components/field-input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

// Schema untuk maintenance form
const maintenanceFormSchema = z.object({
    updateOsVersion: z.boolean().default(false),
    updateCondition: z.boolean().default(false),
    updateComplianceStatus: z.boolean().default(false),
    osVersion: z.string().optional(),
    condition: z.enum(["baik", "rusak", "rusak berat"]).optional(),
    complianceStatus: z
        .enum(["sesuai", "tidak sesuai", "pengecualian", "belum dicek"])
        .optional(),
    remarks: z.string().optional(),
});

type MaintenanceFormInput = ZInfer<typeof maintenanceFormSchema>;

interface MaintenanceDialogProps {
    asset: Asset;
    onMaintenance: (data: {
        osVersion?: string;
        condition?: AssetCondition;
        complianceStatus?: AssetComplianceStatus;
        remarks?: string;
    }) => Promise<void>;
}

function MaintenanceDialog({ asset, onMaintenance }: MaintenanceDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const remarksId = useId();

    const form = useForm<MaintenanceFormInput>({
        resolver: zodResolver(maintenanceFormSchema),
        defaultValues: {
            updateOsVersion: false,
            updateCondition: false,
            updateComplianceStatus: false,
            osVersion: asset.osVersion ?? "",
            condition: asset.condition,
            complianceStatus: asset.complianceStatus,
            remarks: "",
        },
    });

    const watchUpdateOsVersion = form.watch("updateOsVersion");
    const watchUpdateCondition = form.watch("updateCondition");
    const watchUpdateComplianceStatus = form.watch("updateComplianceStatus");

    const hasNoSelection =
        !watchUpdateOsVersion &&
        !watchUpdateCondition &&
        !watchUpdateComplianceStatus;

    function resetForm() {
        form.reset({
            updateOsVersion: false,
            updateCondition: false,
            updateComplianceStatus: false,
            osVersion: asset.osVersion ?? "",
            condition: asset.condition,
            complianceStatus: asset.complianceStatus,
            remarks: "",
        });
    }

    async function onSubmit(data: MaintenanceFormInput) {
        if (hasNoSelection) {
            return;
        }

        setIsSubmitting(true);

        try {
            const payload: {
                osVersion?: string;
                condition?: AssetCondition;
                complianceStatus?: AssetComplianceStatus;
                remarks?: string;
            } = {};

            if (data.updateOsVersion && data.osVersion) {
                payload.osVersion = data.osVersion;
            }
            if (data.updateCondition && data.condition) {
                payload.condition = data.condition;
            }
            if (data.updateComplianceStatus && data.complianceStatus) {
                payload.complianceStatus = data.complianceStatus;
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
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-6 p-4"
                >
                    {/* Field Selection */}
                    <Field data-invalid={hasNoSelection}>
                        <FieldLabel>Pilih Data yang Akan Diubah</FieldLabel>

                        <div className="flex flex-col gap-3">
                            {/* OS Version Checkbox */}
                            <Controller
                                control={form.control}
                                name="updateOsVersion"
                                render={({ field }) => (
                                    <Field orientation="horizontal">
                                        <Checkbox
                                            id="field-osVersion"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                        <FieldLabel htmlFor="field-osVersion">
                                            Versi OS
                                        </FieldLabel>
                                    </Field>
                                )}
                            />

                            {/* Condition Checkbox */}
                            <Controller
                                control={form.control}
                                name="updateCondition"
                                render={({ field }) => (
                                    <Field orientation="horizontal">
                                        <Checkbox
                                            id="field-condition"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                        <FieldLabel htmlFor="field-condition">
                                            Kondisi
                                        </FieldLabel>
                                    </Field>
                                )}
                            />

                            {/* Compliance Status Checkbox */}
                            <Controller
                                control={form.control}
                                name="updateComplianceStatus"
                                render={({ field }) => (
                                    <Field orientation="horizontal">
                                        <Checkbox
                                            id="field-complianceStatus"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                        <FieldLabel htmlFor="field-complianceStatus">
                                            Status Compliance
                                        </FieldLabel>
                                    </Field>
                                )}
                            />
                        </div>

                        {hasNoSelection && (
                            <FieldError>
                                Pilih minimal satu data untuk diubah
                            </FieldError>
                        )}
                    </Field>

                    {/* Conditional Inputs */}
                    {!hasNoSelection && (
                        <div className="flex flex-col gap-4">
                            {watchUpdateOsVersion && (
                                <Controller
                                    control={form.control}
                                    name="osVersion"
                                    render={({ field, fieldState }) => (
                                        <FieldInput
                                            label="Versi OS"
                                            field={field}
                                            fieldState={fieldState}
                                            placeholder="Contoh: 15.2.1"
                                        />
                                    )}
                                />
                            )}

                            {watchUpdateCondition && (
                                <Controller
                                    control={form.control}
                                    name="condition"
                                    render={({ field, fieldState }) => (
                                        <FieldInputSelect
                                            label="Kondisi"
                                            field={field}
                                            fieldState={fieldState}
                                        >
                                            <SelectGroup>
                                                <SelectLabel>
                                                    Kondisi
                                                </SelectLabel>
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

                            {watchUpdateComplianceStatus && (
                                <Controller
                                    control={form.control}
                                    name="complianceStatus"
                                    render={({ field, fieldState }) => (
                                        <FieldInputSelect
                                            label="Status Compliance"
                                            field={field}
                                            fieldState={fieldState}
                                        >
                                            <SelectGroup>
                                                <SelectLabel>
                                                    Status Compliance
                                                </SelectLabel>
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
                        </div>
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
                            type="submit"
                            disabled={isSubmitting || hasNoSelection}
                        >
                            {isSubmitting ? "Menyimpan..." : "Simpan"}
                        </Button>
                    </SheetFooter>
                </form>
            </SheetContent>
        </Sheet>
    );
}

export { MaintenanceDialog };
