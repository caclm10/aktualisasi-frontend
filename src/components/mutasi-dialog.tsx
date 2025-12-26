import { MoveIcon } from "lucide-react";
import { useState } from "react";

import { RoomSelectField } from "@/components/room-select-field";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
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

interface MutasiDialogProps {
    asset: Asset;
    onMutasi: (data: { roomId: string; remarks?: string }) => Promise<void>;
}

function MutasiDialog({ asset, onMutasi }: MutasiDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [selectedRoomId, setSelectedRoomId] = useState("");
    const [remarks, setRemarks] = useState("");
    const [error, setError] = useState<{ message?: string } | undefined>(
        undefined,
    );

    const formId = useId();

    function resetForm() {
        setSelectedRoomId("");
        setRemarks("");
        setError(undefined);
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!selectedRoomId) {
            setError({ message: "Ruangan tujuan harus dipilih" });
            return;
        }

        setIsSubmitting(true);

        try {
            const data: { roomId: string; remarks?: string } = {
                roomId: selectedRoomId,
            };

            if (remarks.trim()) {
                data.remarks = remarks.trim();
            }

            await onMutasi(data);
            setIsOpen(false);
            resetForm();
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
                        <MoveIcon />
                        Pindahkan
                    </Button>
                }
            />

            <SheetContent side="right">
                <SheetHeader>
                    <SheetTitle>Mutasi / Pindah Lokasi</SheetTitle>
                    <SheetDescription>
                        Pindahkan aset "{asset.hostname}" ke lokasi baru.
                    </SheetDescription>
                </SheetHeader>

                <form
                    id={formId}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-6 p-4"
                >
                    {/* Current Location Info */}
                    <div className="bg-muted rounded-lg p-3">
                        <p className="text-muted-foreground text-sm">
                            Lokasi Saat Ini
                        </p>
                        <p className="font-medium">
                            {asset.room
                                ? `${asset.room.office?.name} - ${asset.room.name} (Lantai ${asset.room.floor})`
                                : "-"}
                        </p>
                    </div>

                    {/* Room Selection using RoomSelectField */}
                    <RoomSelectField
                        name="roomId"
                        value={selectedRoomId}
                        onChange={setSelectedRoomId}
                        isInvalid={!!error}
                        error={error}
                    />

                    {/* Remarks */}
                    <div className="space-y-2">
                        <Label htmlFor="mutasi-remarks">
                            Catatan / Remarks
                        </Label>
                        <textarea
                            id="mutasi-remarks"
                            value={remarks}
                            onChange={(e) => setRemarks(e.target.value)}
                            placeholder="Catatan tambahan (opsional)"
                            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                        />
                    </div>
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
                        disabled={isSubmitting || !selectedRoomId}
                    >
                        {isSubmitting ? "Memindahkan..." : "Pindahkan"}
                    </Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export { MutasiDialog };
