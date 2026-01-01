export function useOffice() {
    const {
        data: offices,
        error,
        isLoading,
        mutate,
    } = useSWR("/api/offices", () =>
        http.get("/api/offices").then((res) => res.data.data as Office[]),
    );

    async function createOffice(data: CreateOfficeInput) {
        try {
            const response = await http.post<{ data: { id: string } }>(
                "/api/offices",
                {
                    name: data.name,
                    picName: data.picName,
                    picContact: data.picContact,
                },
            );

            await mutate();

            toast.success("Kantor berhasil ditambahkan");

            return response.data.data.id;
        } catch (error) {
            if (isHttpError(error) && error.response?.status === 422) {
                throw new ValidationError(error.response.data.data);
            }

            throw error;
        }
    }

    return {
        offices,
        error,
        isLoading,
        createOffice,
        mutate,
    };
}

export function useOfficeDetail(id: string) {
    const {
        data: office,
        error,
        isLoading,
        mutate,
    } = useSWR(`/api/offices/${id}`, () =>
        http.get(`/api/offices/${id}`).then((res) => res.data.data as Office),
    );

    async function createRoom(data: CreateRoomInput) {
        try {
            await http.post(`/api/offices/${id}/rooms`, {
                name: data.name,
                floor: data.floor,
                code: data.code,
            });

            await mutate();

            toast.success("Ruangan berhasil ditambahkan");
        } catch (error) {
            if (isHttpError(error) && error.response?.status === 422) {
                throw new ValidationError(error.response?.data.data);
            }

            throw error;
        }
    }

    async function updateOffice(data: CreateOfficeInput) {
        try {
            await http.put(`/api/offices/${id}`, {
                name: data.name,
                picName: data.picName,
                picContact: data.picContact,
            });

            await mutate();

            toast.success("Kantor berhasil diperbarui");
        } catch (error) {
            if (isHttpError(error) && error.response?.status === 422) {
                throw new ValidationError(error.response?.data.data);
            }

            throw error;
        }
    }

    async function deleteOffice() {
        try {
            await http.delete(`/api/offices/${id}`);

            toast.success("Kantor berhasil dihapus");
        } catch (error) {
            if (isHttpError(error)) {
                toast.error(error.response?.data.message);
            }

            throw error;
        }
    }

    async function updateRoom(roomId: string, data: CreateRoomInput) {
        try {
            await http.put(`/api/offices/${id}/rooms/${roomId}`, {
                name: data.name,
                floor: data.floor,
                code: data.code,
            });

            await mutate();

            toast.success("Ruangan berhasil diperbarui");
        } catch (error) {
            if (isHttpError(error) && error.response?.status === 422) {
                throw new ValidationError(error.response?.data.data);
            }

            throw error;
        }
    }

    async function deleteRoom(roomId: string) {
        try {
            await http.delete(`/api/offices/${id}/rooms/${roomId}`);

            await mutate();

            toast.success("Ruangan berhasil dihapus");
        } catch (error) {
            if (isHttpError(error)) {
                toast.error(error.response?.data.message);
            }

            throw error;
        }
    }

    return {
        office,
        error,
        isLoading,
        createRoom,
        updateRoom,
        deleteRoom,
        updateOffice,
        deleteOffice,
        mutate,
    };
}
