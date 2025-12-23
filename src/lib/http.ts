import axios, { isAxiosError } from "axios";

const http = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
    withCredentials: true,
    withXSRFToken: true,
    headers: {
        "X-Requested-With": "XMLHttpRequest",
    },
});

export interface HttpResponse<T> {
    message: string;
    responseCode: number;
    data: T;
}

export { http, isAxiosError as isHttpError };
