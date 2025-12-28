import { AlertTriangleIcon } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface EosWarningAlertProps {
    eosDate: string | null;
}

function EosWarningAlert({ eosDate }: EosWarningAlertProps) {
    if (!eosDate) return null;

    const now = new Date();
    const eos = new Date(eosDate);
    const twoYearsFromNow = new Date(
        now.getFullYear() + 2,
        now.getMonth(),
        now.getDate(),
    );

    if (eos > twoYearsFromNow) return null;

    const diffTime = eos.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30);

    let remainingText = "";
    let alertClass = "";

    if (diffDays <= 0) {
        remainingText = "sudah melewati End of Support";
        alertClass =
            "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950";
    } else if (diffDays <= 90) {
        remainingText = `akan mencapai End of Support dalam ${diffDays} hari`;
        alertClass =
            "border-red-200 bg-red-50 dark:border-red-900 dark:bg-red-950";
    } else if (diffMonths <= 12) {
        remainingText = `akan mencapai End of Support dalam ${diffMonths} bulan`;
        alertClass =
            "border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950";
    } else {
        const years = Math.floor(diffMonths / 12);
        const months = diffMonths % 12;
        remainingText = `akan mencapai End of Support dalam ${years} tahun${months > 0 ? ` ${months} bulan` : ""}`;
        alertClass =
            "border-yellow-200 bg-yellow-50 dark:border-yellow-900 dark:bg-yellow-950";
    }

    return (
        <Alert className={alertClass}>
            <AlertTriangleIcon className="size-4" />
            <AlertTitle>Peringatan EOS</AlertTitle>
            <AlertDescription>
                Aset ini {remainingText} (
                {eos.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                })}
                ).
            </AlertDescription>
        </Alert>
    );
}

export { EosWarningAlert };
