const createRoomFormSchema = z.object({
    name: z.string().min(1),
    floor: z.string().min(1),
    code: z.string().min(1),
});

export type CreateRoomInput = ZInfer<typeof createRoomFormSchema>;

export { createRoomFormSchema };
