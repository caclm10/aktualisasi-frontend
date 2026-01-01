const createAssetFormSchema = z.object({
    room: z.string().min(1, "Ruangan harus dipilih"),
    registerCode: z.string().min(1, "Kode register wajib diisi."),
    serialNumber: z.string().min(1, "Serial number wajib diisi."),
    hostname: z.string().min(1, "Hostname wajib diisi."),
    brand: z.string().min(1, "Brand wajib diisi."),
    model: z.string().min(1, "Model wajib diisi."),
    condition: z.enum(["baik", "rusak", "rusak berat"]),
    ipVlan: z.string().nullish(),
    vlan: z.string().nullish(),
    portAcsVlan: z.string().nullish(),
    portTrunk: z.string().nullish(),
    portCapacity: z.string().nullish(),
    baseline: z.enum(["sesuai", "tidak sesuai", "pengecualian", "belum dicek"]),
    osVersion: z.string().nullish(),
    eosDate: z.string().nullish(),
    purchaseYear: z.string().nullish(),
    price: z.string().nullish(),
});

export type CreateAssetFormInput = ZInfer<typeof createAssetFormSchema>;

export { createAssetFormSchema };
