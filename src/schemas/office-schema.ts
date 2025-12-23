const createOfficeFormSchema = z.object({
    name: z.string().min(1),
    picName: z.string().min(1),
    picContact: z.string().min(1),
});

export type CreateOfficeInput = ZInfer<typeof createOfficeFormSchema>;

export { createOfficeFormSchema };
