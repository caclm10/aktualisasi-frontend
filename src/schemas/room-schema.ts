const createRoomFormSchema = z.object({
    name: z.string().min(1, "Nama ruangan wajib diisi."),
    floor: z.string().min(1, "Lantai wajib diisi."),
    code: z.string().min(1, "Kode ruangan wajib diisi."),
});

export type CreateRoomInput = ZInfer<typeof createRoomFormSchema>;

export { createRoomFormSchema };
