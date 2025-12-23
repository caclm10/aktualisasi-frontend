import type { FieldValues, Path, UseFormSetError } from "react-hook-form";

/**
 * Helper untuk memparsing ValidationError dari backend
 * dan memasukkannya ke React Hook Form.
 */
export function setFormErrors<T extends FieldValues>(
    error: unknown,
    setError: UseFormSetError<T>,
) {
    // Cek apakah error tersebut adalah instance ValidationError kita
    // Kita asumsikan fields berbentuk Record<string, string[]>
    if (isValidationError<Record<string, string[]>>(error)) {
        const fields = error.fields;

        // Loop setiap field yang error
        Object.keys(fields).forEach((key) => {
            const messages = fields[key];

            // Pastikan ada pesan error
            if (messages && messages.length > 0) {
                // setError membutuhkan key yang sesuai dengan Path<T> (nama field di form)
                // Kita cast 'key' sebagai Path<T> karena kita percaya backend mengirim key yang valid
                setError(key as Path<T>, {
                    message: messages[0], // Ambil pesan pertama saja
                    type: "manual", // Tipe error manual (dari server)
                });
            }
        });
    }
}
