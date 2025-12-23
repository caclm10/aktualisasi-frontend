import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import * as z from "zod";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export type ZInfer<T = any> = z.infer<T>;

export { cn, z };
