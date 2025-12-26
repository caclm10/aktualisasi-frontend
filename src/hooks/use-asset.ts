export function useAsset() {
    const {
        data: assets,
        error,
        isLoading,
        mutate,
    } = useSWR("/api/assets", () =>
        http.get("/api/assets").then((res) => res.data.data as Asset[]),
    );

    async function createAsset(data: AssetInput) {
        try {
            const response = await http.post<{ data: { id: string } }>(
                "/api/assets",
                data,
            );

            await mutate();

            toast.success("Aset berhasil ditambahkan");

            return response.data.data.id;
        } catch (error) {
            if (isHttpError(error) && error.response?.status === 422) {
                throw new ValidationError(error.response.data.errors);
            }

            throw error;
        }
    }

    return {
        assets,
        error,
        isLoading,
        createAsset,
        mutate,
    };
}

export function useAssetDetail(id: string) {
    const { mutate: globalMutate } = useSWRConfig();

    const {
        data: asset,
        error,
        isLoading,
        mutate,
    } = useSWR(`/api/assets/${id}`, () =>
        http.get(`/api/assets/${id}`).then((res) => res.data.data as Asset),
    );

    async function updateAsset(data: AssetInput) {
        try {
            await http.put(`/api/assets/${id}`, data);

            await mutate();

            toast.success("Aset berhasil diperbarui");
        } catch (error) {
            if (isHttpError(error) && error.response?.status === 422) {
                throw new ValidationError(error.response?.data.errors);
            }

            throw error;
        }
    }

    async function deleteAsset() {
        try {
            await http.delete(`/api/assets/${id}`);

            toast.success("Aset berhasil dihapus");
        } catch (error) {
            if (isHttpError(error)) {
                toast.error(error.response?.data.message);
            }

            throw error;
        }
    }

    async function updateImage(file: File) {
        try {
            const formData = new FormData();
            formData.append("image", file);

            await http.post(`/api/assets/${id}/image`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            await mutate();

            toast.success("Gambar aset berhasil diperbarui");
        } catch (error) {
            if (isHttpError(error)) {
                if (error.response?.status === 422) {
                    toast.error(error.response?.data.data.image[0]);
                } else {
                    toast.error(error.response?.data.message);
                }
            }

            throw error;
        }
    }

    async function deleteImage() {
        try {
            await http.delete(`/api/assets/${id}/image`);

            await mutate();

            toast.success("Gambar aset berhasil dihapus");
        } catch (error) {
            if (isHttpError(error)) {
                toast.error(error.response?.data.message);
            }

            throw error;
        }
    }

    async function maintenanceAsset(data: {
        property: string;
        new: string;
        remarks?: string;
    }) {
        try {
            await http.post(`/api/assets/${id}/maintenance`, data);

            await mutate();
            await globalMutate(`/api/assets/${id}/activities`);

            toast.success("Maintenance aset berhasil dilakukan");
        } catch (error) {
            if (isHttpError(error)) {
                if (error.response?.status === 422) {
                    throw new ValidationError(error.response?.data.errors);
                }
                toast.error(error.response?.data.message);
            }

            throw error;
        }
    }

    async function mutasiAsset(data: { roomId: string; remarks?: string }) {
        try {
            await http.post(`/api/assets/${id}/mutasi`, data);

            await mutate();
            await globalMutate(`/api/assets/${id}/activities`);

            toast.success("Aset berhasil dipindahkan");
        } catch (error) {
            if (isHttpError(error)) {
                if (error.response?.status === 422) {
                    throw new ValidationError(error.response?.data.errors);
                }
                toast.error(error.response?.data.message);
            }

            throw error;
        }
    }

    return {
        asset,
        error,
        isLoading,
        updateAsset,
        deleteAsset,
        updateImage,
        deleteImage,
        maintenanceAsset,
        mutasiAsset,
        mutate,
    };
}
