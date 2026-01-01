const createOfficeFormSchema = z.object({
    name: z.string().min(1, "Nama ruangan wajib diisi."),
    picName: z.string().min(1, "Nama PIC wajib diisi."),
    picContact: z.string().min(1, "Kontak PIC wajib diisi."),
});

export type CreateOfficeInput = ZInfer<typeof createOfficeFormSchema>;

export { createOfficeFormSchema };
