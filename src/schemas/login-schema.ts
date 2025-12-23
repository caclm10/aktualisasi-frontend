const loginFormSchema = z.object({
    email: z.string(),
    password: z.string().min(6).max(20),
    remember: z.boolean(),
});
export type LoginInput = ZInfer<typeof loginFormSchema>;

export interface LoginSuccess {
    id: string | number;
    name: string;
    email: string;
}

export interface LoginValidationError {
    email?: string[];
    password?: string[];
}

export interface LoginResponse<T> {
    message: string;
    responseCode: number;
    data: T;
}

export { loginFormSchema };
