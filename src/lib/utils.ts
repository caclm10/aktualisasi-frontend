import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as z from "zod";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

const datetTimeTextOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
};

function toDatetimeText(
    date: Date,
    options: Intl.DateTimeFormatOptions = datetTimeTextOptions,
) {
    let text = date.toLocaleString("id-ID", options);
    text = text.replace(".", ":").replace(" ", " ");

    return text;
}

function getLocalDateTimeString() {
    const now = new Date();
    const offset = now.getTimezoneOffset();
    const localDate = new Date(now.getTime() - offset * 60 * 1000);
    return localDate.toISOString().slice(0, 16);
}

export type ZInfer<T = any> = z.infer<T>;

export { cn, getLocalDateTimeString, toDatetimeText, z };
